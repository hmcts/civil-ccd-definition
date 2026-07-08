import BaseDataBuilder from '../../../../../base/base-data-builder.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import requestDefaultJudgementSpecBuilderComponents from "./request-default-judgement-spec-data-builder-components.ts";

@AllMethodsStep()
export default class RequestDefaultJudgementSpecDataBuilder extends BaseDataBuilder {
  async buildData() {
    return {
      ...requestDefaultJudgementSpecBuilderComponents.defendantDetailsSpec(this.defendant1PartyType),
      ...requestDefaultJudgementSpecBuilderComponents.showCertifyStatementSpec(),
      ...requestDefaultJudgementSpecBuilderComponents.claimPartialPayment(),
      ...requestDefaultJudgementSpecBuilderComponents.fixedCostsOnEntryYesOption(),
      ...requestDefaultJudgementSpecBuilderComponents.paymentBreakdown,
      ...requestDefaultJudgementSpecBuilderComponents.paymentType(),
    };
  }
}
