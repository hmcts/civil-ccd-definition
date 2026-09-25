import config from '../../../config/config';
import { claimants, defendants } from '../../../config/users/cui-users';
import { hasClaimantCitizenEmail, hasDefendantCitizenEmail } from '../../../config/users/user-utils';
import { test as teardown } from '../../../playwright-fixtures/index';

if (config.runCuiUserSetup) {
  teardown.describe(`Deleting citizen users for ${config.playwright.workers} worker(s)`, () => {
    teardown.describe.configure({ mode: 'parallel' });

    teardown('Intentional teardown failure', async () => {
      throw new Error('Intentional failure: validating the nightly Playwright teardown stage');
    });

    if (!hasClaimantCitizenEmail()) {
      teardown('Claimant(s)', async ({ IdamApiSteps }) => {
        await IdamApiSteps.DeleteCuiUsers(claimants);
      });
    }

    if (!hasDefendantCitizenEmail()) {
      teardown('Defendant(s)', async ({ IdamApiSteps }) => {
        await IdamApiSteps.DeleteCuiUsers(defendants);
      });
    }
  });
}
