import { test } from '../../../playwright-fixtures/index';

test.describe(
  '1v1 fast case offline api journey',
  
  async () => {
    test('1v1 case offline', async ({
      ClaimantSolicitorApiSteps,
      CaseworkerApiSteps,
    }) => {
      await ClaimantSolicitorApiSteps.CreateClaimFast1v1();
      await CaseworkerApiSteps.CaseProceedsInCaseman();
    });
  },
);
