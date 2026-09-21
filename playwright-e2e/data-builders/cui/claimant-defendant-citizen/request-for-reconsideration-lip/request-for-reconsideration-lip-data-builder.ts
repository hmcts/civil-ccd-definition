import BaseDataBuilder from '../../../../base/base-data-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import requestForReconsiderationLipDataBuilderComponents from './request-for-reconsideration-lip-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class RequestForReconsiderationLipDataBuilder extends BaseDataBuilder {
  async build(): Promise<CCDCaseData> {
    return this.buildData();
  }

  async buildClaimant(): Promise<CCDCaseData> {
    return this.buildData({ party: partys.CLAIMANT_1 });
  }

  async buildDefendant(): Promise<CCDCaseData> {
    return this.buildData({ party: partys.DEFENDANT_1 });
  }

  protected async buildData({
    party = partys.CLAIMANT_1,
  }: {
    party?: Party;
  } = {}): Promise<CCDCaseData> {
    return requestForReconsiderationLipDataBuilderComponents.requestForReviewComments(party);
  }
}
