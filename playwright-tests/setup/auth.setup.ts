import {test as setup, expect, test, request} from "@playwright/test";
import { envUrl } from '../civilConfig.ts';
import {IdamPage} from '../e2e/page-objects/pages/idam.po';
import { SessionUtils } from '../e2e/utils/session.utils.ts';
import { saveSession, sessionUsers, signedInToXui, signInWithoutBrowser } from '../helpers/SessionHelper.ts';
import { sessionUsersForRun } from '../e2e/journey/sessionUsersForRun.ts';

const authCookieName = "__auth__";
const tokenValidityBufferSeconds = 60 * 60;

let idamPage: IdamPage;

test.beforeEach(async ({ page }) => {
    idamPage = new IdamPage(page);
});

// The token in a saved session can look unexpired while XUI has already dropped the session,
// so only reuse it if XUI still accepts the saved cookies. This asks XUI's user details API
// (200 when the session is accepted, 401 when not) rather than loading the case list page.
async function isSavedSessionAccepted(authFile: string): Promise<boolean> {
  if (!SessionUtils.isSessionValid(authFile, authCookieName, tokenValidityBufferSeconds)) {
    return false;
  }

  const apiContext = await request.newContext({ baseURL: envUrl, storageState: authFile });
  try {
    const response = await apiContext.get('/api/user/details', { maxRedirects: 0, timeout: 15000 });
    if (!response.ok()) {
      console.log(`Saved session in ${authFile} is no longer accepted by XUI (status ${response.status()}). Logging in again.`);
    }
    return response.ok();
  } catch (error) {
    console.log(`Could not check saved session in ${authFile}: ${error instanceof Error ? error.message : error}. Logging in again.`);
    return false;
  } finally {
    await apiContext.dispose();
  }
}

// Signs in everyone who runs a step in the run's scenarios (see sessionUsersForRun), reusing a saved session XUI still
// accepts. Users are signed in over HTTP (see XuiSignInHelper), and through the browser only if that fails.
for (const key of sessionUsersForRun()) {
  const { credentials, authFile } = sessionUsers[key];
  setup(`Authenticate ${credentials.name}`, async ({ page }) => {
    setup.skip(await isSavedSessionAccepted(authFile), "Reusing existing valid session");
    const state = await signInWithoutBrowser(key);
    if (state) {
      saveSession(authFile, state);
      return;
    }
    await page.goto(envUrl);
    await idamPage.login(credentials);
    // Solicitors land on the case list and judges and court staff on their work list, so the navigation is checked
    await expect(signedInToXui(page)).toBeVisible();
    await page.context().storageState({ path: authFile });
  });
}
