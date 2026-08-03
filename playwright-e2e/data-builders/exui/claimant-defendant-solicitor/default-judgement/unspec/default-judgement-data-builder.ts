import BaseDataBuilder from '../../../../../base/base-data-builder.ts';
import ClaimType from '../../../../../constants/cases/claim-type.ts';
import DJHearingType from '../../../../../constants/ccd-events/default-judgement/dj-hearing-type.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import requestDefaultJudgementBuilderComponents from './default-judgement-data-builder-components.ts';

@AllMethodsStep()
export default class DefaultJudgementDataBuilder extends BaseDataBuilder {
  async build1v1() {
    return this.buildData();
  }

  async build1v2SS() {
    return this.buildData({claimType: ClaimType.ONE_VS_TWO_SAME_SOL});
  }

  async build1v2DS() {
    return this.buildData({claimType: ClaimType.ONE_VS_TWO_DIFF_SOL});
  }

  async build1v1OtherRemedy() {
    return this.buildData({ isOtherRemedy: true });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    djHearingType = DJHearingType.DISPOSAL_HEARING,
    isOtherRemedy = false,
  } : {
    claimType?: ClaimType,
    djHearingType?: DJHearingType,
    isOtherRemedy?: boolean;
  } = {}) {
    return {
      ...requestDefaultJudgementBuilderComponents.defendantDetails(claimType, this.defendant1PartyType!),
      ...requestDefaultJudgementBuilderComponents.showCertifyStatement(),
      ...(isOtherRemedy ? requestDefaultJudgementBuilderComponents.otherRemedyAbandoned() : {}),
      ...requestDefaultJudgementBuilderComponents.hearingType(djHearingType),
      ...requestDefaultJudgementBuilderComponents.hearingSupportRequirementsFieldDJ(this.claimant1PartyType!),
    };
  }
}
