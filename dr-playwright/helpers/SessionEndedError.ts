import { Page } from '@playwright/test';

// Thrown when XUI shows that the user's session has ended: CCD returns 401 for a page, or opening a page sends the
// user to the sign in page. SessionHelper.runWithSessionRecovery signs the user in again and restarts the event,
// unless eventSaved is true: the session ended at Submit after CCD had already saved the event, so the event must not
// be submitted again.
export class SessionEndedError extends Error {
  constructor(message: string, public readonly eventSaved: boolean = false) {
    super(message);
    this.name = 'SessionEndedError';
  }
}

// The user a page is being used as, so Submit can check the case's event history with that user's own API token.
// Set by SessionHelper.runWithSessionRecovery.
export type SessionUser = { name: string; username: string; password: string };
const sessionUsersByPage = new WeakMap<Page, SessionUser>();

export function setSessionUser(page: Page, user: SessionUser) {
  sessionUsersByPage.set(page, user);
}

export function sessionUserOf(page: Page): SessionUser | undefined {
  return sessionUsersByPage.get(page);
}
