import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';

@AllMethodsStep()
export default class CaseProceedsInCasemanDataBuilder extends BaseDataBuilder {
  async buildData() {
    return {
      ClaimProceedsInCaseman: {
        claimProceedsInCaseman: {
          date: '2025-01-01',
          reason: 'OTHER',
          other: 'Other Reason',
        },
      },
    };
  }
}
