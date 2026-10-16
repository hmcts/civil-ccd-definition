import fs from 'node:fs';
import { expect, Page } from '@playwright/test';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import claimTypes from '../enums/claim-types.ts';
import {
  envUrl,
  claimantSolicitorCredentials,
  respondent1SolicitorCredentials,
  respondent2SolicitorCredentials,
  judgeCredentials,
  hearingCentreAdminCredentials,
} from '../civilConfig.ts';
import { IdamPage } from '../e2e/page-objects/pages/idam.po.ts';
import { PageHelper } from './PageHelper.ts';
import { SessionEndedError, setSessionUser } from './SessionEndedError.ts';

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
};

// Shown on every XUI page once a user is signed in. Solicitors land on the case list and judges and court staff on their work list,
// so the navigation is used rather than a page heading.
export const signedInToXui = (page: Page) =>
  page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Case list' });

export type SessionUserKey = keyof typeof sessionUsers;

// The claim type this run is for (CLAIM_TYPE, default 1v1), which decides who has to sign in before the tests start
export const runClaimType: claimTypes = cleanEnv({
  CLAIM_TYPE: enums({
    values: [claimTypes.ONE_VS_ONE_LIP, claimTypes.TWO_VS_ONE_LIP, claimTypes.ONE_VS_TWO_LIPS, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL] as const,
    default: claimTypes.ONE_VS_ONE,
  }),
}).CLAIM_TYPE;
// Claim types where the second defendant has their own solicitor
export const respondent2ClaimTypes = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_LIP_LR];
// Claim types where the journey goes on to the claimant's response, the judge's directions order and the hearing notice
export const judgeClaimTypes = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL];

// The saved session users this run's claim type needs
export function sessionUsersForRun(): SessionUserKey[] {
  const keys: SessionUserKey[] = ['claimantSolicitor', 'respondent1Solicitor'];
  if (respondent2ClaimTypes.includes(runClaimType)) {
    keys.push('respondent2Solicitor');
  }
  if (judgeClaimTypes.includes(runClaimType)) {
    keys.push('judge', 'hearingCentreAdmin');
  }
  return keys;
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

  // Signs the user in again in this browser and saves the new session, so later tests also use it
  async signInAgain(userKey: SessionUserKey) {
    const { credentials, authFile } = sessionUsers[userKey];
    await this.page.context().clearCookies();
    await this.page.goto(envUrl);
    await new IdamPage(this.page).login(credentials);
    await expect(signedInToXui(this.page)).toBeVisible();
    // Saved to a temporary file and then renamed, so a test starting on another worker never reads a half-written one
    const tempFile = `${authFile}.${process.pid}.tmp`;
    await this.page.context().storageState({ path: tempFile });
    fs.renameSync(tempFile, authFile);
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
