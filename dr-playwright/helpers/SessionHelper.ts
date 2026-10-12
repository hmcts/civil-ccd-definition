import { expect, Page } from '@playwright/test';
import {
  envUrl,
  claimantSolicitorCredentials,
  respondent1SolicitorCredentials,
  respondent2SolicitorCredentials,
} from '../civilConfig.ts';
import { IdamPage } from '../e2e/page-objects/pages/idam.po.ts';
import { PageHelper } from './PageHelper.ts';
import { SessionEndedError } from './SessionEndedError.ts';

// Each solicitor's saved session file (used by test.use storageState) and who to sign in as when it ends
export const sessionUsers = {
  claimantSolicitor: { credentials: claimantSolicitorCredentials, authFile: './dr-playwright/e2e/.auth/ClaimantSolicitorUser.json' },
  respondent1Solicitor: { credentials: respondent1SolicitorCredentials, authFile: './dr-playwright/e2e/.auth/Respondent1SolicitorUser.json' },
  respondent2Solicitor: { credentials: respondent2SolicitorCredentials, authFile: './dr-playwright/e2e/.auth/Respondent2SolicitorUser.json' },
};

export type SessionUserKey = keyof typeof sessionUsers;

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
    await expect(this.page.getByRole('heading', { level: 1, name: 'Case list' })).toBeVisible();
    await this.page.context().storageState({ path: authFile });
  }

  // Runs an action, and if the user's session ends part way through, signs them in again, reopens the page at
  // reopenUrl and runs the action again from the start. A session ending is only noticed when a page is opened and
  // on Continue, both before an event is submitted, so the event has not been saved when it is restarted.
  // With no user (a test not run as one of the saved sessions) the action is just run.
  async runWithSessionRecovery(userKey: SessionUserKey | undefined, reopenUrl: string, action: () => Promise<void>) {
    const attempts = 2;
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        await action();
        return;
      } catch (error) {
        if (!(error instanceof SessionEndedError) || userKey === undefined || attempt === attempts) {
          throw error;
        }
        console.log(`${sessionUsers[userKey].credentials.name}'s session ended (${error.message}). Signing in again and starting again from ${reopenUrl}`);
        await this.signInAgain(userKey);
        await new PageHelper(this.page).gotoAndWaitForXui(reopenUrl);
      }
    }
  }
}
