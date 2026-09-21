import { test as teardown } from '../../../playwright-fixtures/index';
import { solicitorUsers } from '../../../config/users/exui-users';
import config from '../../../config/config';

if (config.unassignCases) {
  teardown.describe('Unassigning case roles for exui users', () => {
    teardown.describe.configure({ mode: 'parallel' });

    for (const solicitorUser of solicitorUsers) {
      teardown(solicitorUser.name, async ({ CaseRoleAssignmentApiSteps }) => {
        if(process.env.RUN_FAILING_TEARDOWN_TESTS === 'true') {
          throw new Error('This test is currently failing and is being skipped. Please check the test and fix it before enabling it again.');
        }
        await CaseRoleAssignmentApiSteps.UnassignCases(solicitorUser);
      });
    }
  });
} else {
  console.log('Skipping case role unassignment for exui users');
}
