import fs from 'node:fs';
import path from 'node:path';
import { expect, Page } from '@playwright/test';
import {
  envUrl,
  claimantSolicitorCredentials,
  respondent1SolicitorCredentials,
  respondent2SolicitorCredentials,
  judgeCredentials,
  hearingCentreAdminCredentials,
  legalAdviserCredentials,
  newClaimantSolicitorCredentials,
  newDefendantSolicitorCredentials,
} from '../civilConfig.ts';
import { IdamPage } from '../e2e/page-objects/pages/idam.po.ts';
import { PageHelper } from './PageHelper.ts';
import { SessionEndedError, setSessionUser } from './SessionEndedError.ts';
import { signInToXuiOverHttp, XuiStorageState } from './XuiSignInHelper.ts';

// Sessions are saved in a folder per environment, named after its XUI host (e.g. manage-case.aat.platform.hmcts.net, or
// one per preview PR), so runs against different environments at the same time don't overwrite each other's sessions
const authDir = `./playwright-tests/e2e/.auth/${envHost()}`;

// The XUI host, or "no-url" when URL is not set, so importing this file never fails
function envHost(): string {
  try {
    return new URL(envUrl).host;
  } catch {
    return 'no-url';
  }
}

// Each solicitor's saved session file (used by test.use storageState) and who to sign in as when it ends
export const sessionUsers = {
  claimantSolicitor: { credentials: claimantSolicitorCredentials, authFile: `${authDir}/ClaimantSolicitorUser.json` },
  respondent1Solicitor: { credentials: respondent1SolicitorCredentials, authFile: `${authDir}/Respondent1SolicitorUser.json` },
  respondent2Solicitor: { credentials: respondent2SolicitorCredentials, authFile: `${authDir}/Respondent2SolicitorUser.json` },
  judge: { credentials: judgeCredentials, authFile: `${authDir}/JudgeUser.json` },
  hearingCentreAdmin: { credentials: hearingCentreAdminCredentials, authFile: `${authDir}/HearingCentreAdminUser.json` },
  legalAdviser: { credentials: legalAdviserCredentials, authFile: `${authDir}/LegalAdviserUser.json` },
  // The solicitors who take over a represented party with a notice of change (NOTICE_OF_CHANGE)
  newClaimantSolicitor: { credentials: newClaimantSolicitorCredentials, authFile: `${authDir}/NewClaimantSolicitorUser.json` },
  newDefendantSolicitor: { credentials: newDefendantSolicitorCredentials, authFile: `${authDir}/NewDefendantSolicitorUser.json` },
};

// Shown on every XUI page once a user is signed in. Solicitors land on the case list and judges and court staff on their work list,
// so the navigation is used rather than a page heading.
export const signedInToXui = (page: Page) =>
  page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Case list' });

export type SessionUserKey = keyof typeof sessionUsers;

// Saves a session file. It is written to a temporary file and then renamed, so a test starting on another worker never
// reads a half-written one.
export function saveSession(authFile: string, state: XuiStorageState) {
  // The environment's folder does not exist until its first session is saved
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  const tempFile = `${authFile}.${process.pid}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(state, null, 2));
  fs.renameSync(tempFile, authFile);
}

// Signs the user in to XUI over HTTP (see XuiSignInHelper), which is much quicker than through the browser. Returns
// undefined, after logging why, if that fails, so the caller can sign in through the browser instead.
export async function signInWithoutBrowser(userKey: SessionUserKey): Promise<XuiStorageState | undefined> {
  const { credentials } = sessionUsers[userKey];
  const started = Date.now();
  try {
    const state = await signInToXuiOverHttp(credentials);
    console.log(`${credentials.name} signed in to XUI over HTTP in ${((Date.now() - started) / 1000).toFixed(1)}s`);
    return state;
  } catch (error) {
    console.warn(`Signing ${credentials.name} in to XUI over HTTP failed, so signing in through the browser: ${error instanceof Error ? error.message : error}`);
    return undefined;
  }
}

// Finds the user a test runs as from its storageState, or undefined if it is not one of the saved sessions
export function sessionUserFor(storageState: unknown): SessionUserKey | undefined {
  return (Object.keys(sessionUsers) as SessionUserKey[]).find((key) => sessionUsers[key].authFile === storageState);
}

// XUI's session can end while a run is in progress even though the saved IDAM token still has hours left, as XUI
// keeps its own session on the server. When that happens part way through an event, the event is restarted with a
// new session rather than failing the test.
export class SessionHelper {
  constructor(public page: Page) {}

  // Signs the user in again in this browser and saves the new session, so later tests also use it. The new session
  // is made over HTTP and its cookies put into the browser; if that fails the user signs in through the browser.
  async signInAgain(userKey: SessionUserKey) {
    const { credentials, authFile } = sessionUsers[userKey];
    const context = this.page.context();
    await context.clearCookies();
    const state = await signInWithoutBrowser(userKey);
    if (state) {
      await context.addCookies(state.cookies);
      await this.page.goto(envUrl);
    } else {
      await this.page.goto(envUrl);
      await new IdamPage(this.page).login(credentials);
    }
    await expect(signedInToXui(this.page)).toBeVisible();
    saveSession(authFile, await context.storageState());
  }

  // Runs an action, and if the user's session ends part way through, signs them in again, reopens the page at
  // reopenUrl and runs the action again from the start. A session ending is noticed when a page is opened, on
  // Continue and on Submit. At Submit, PageHelper.submitEvent checks CCD's event history first: if the event was
  // saved it is not run again, as that would submit it twice.
  // With no user (a test not run as one of the saved sessions) the action is just run.
  async runWithSessionRecovery(userKey: SessionUserKey | undefined, reopenUrl: string, action: () => Promise<void>) {
    if (userKey !== undefined) {
      setSessionUser(this.page, sessionUsers[userKey].credentials);
    }
    const attempts = 2;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        await action();
        return;
      } catch (error) {
        if (!(error instanceof SessionEndedError) || userKey === undefined || attempt === attempts) {
          throw error;
        }
        const name = sessionUsers[userKey].credentials.name;
        if (error.eventSaved) {
          console.log(`${name}'s session ended (${error.message}). Signing in again and opening ${reopenUrl}, without submitting the event again`);
          await this.signInAgain(userKey);
          await new PageHelper(this.page).gotoAndWaitForXui(reopenUrl);
          return;
        }
        console.log(`${name}'s session ended (${error.message}). Signing in again and starting again from ${reopenUrl}`);
        await this.signInAgain(userKey);
        await new PageHelper(this.page).gotoAndWaitForXui(reopenUrl);
      }
    }
  }
}
