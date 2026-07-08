import BaseDataBuilder from '../../../../../base/base-data-builder.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import requestDefaultJudgementBuilderComponents from "./request-default-judgement-data-builder-components.ts";

@AllMethodsStep()
export default class RequestDefaultJudgementDataBuilder extends BaseDataBuilder {
  async buildData() {
    return {
      ...requestDefaultJudgementBuilderComponents.defendantDetails(this.defendant1PartyType),
      ...requestDefaultJudgementBuilderComponents.showCertifyStatement(),
      ...requestDefaultJudgementBuilderComponents.hearingTypeTrialHearing(),
      ...requestDefaultJudgementBuilderComponents.hearingSupportRequirementsFieldDJ(),
    };
  }
}
