import BaseDataBuilder from '../../../../../base/base-data-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import acknowledgeClaimDataBuilderComponents from './acknowledge-claim-data-builder-components';

@AllMethodsStep()
export default class AcknowledgeClaimDataBuilder extends BaseDataBuilder {
  async buildData1v1FullDefence() {
    return this.buildData();
  }

  protected async buildData(
    {
      claimType = ClaimType.ONE_VS_ONE, 
      defendantResponseType = DefendantResponseType.FULL_DEFENCE
    } : {
      claimType?: ClaimType, 
      defendantResponseType?: DefendantResponseType
    } = {}
  ) {
    return {
      ...acknowledgeClaimDataBuilderComponents.confirmNameAddress(this.ccdCaseData),
      ...acknowledgeClaimDataBuilderComponents.responseIntention,
      ...acknowledgeClaimDataBuilderComponents.solicitorReferences(this.ccdCaseData),
    };
  }
}
