import BaseDataBuilder from '../../../../base/base-data-builder';
import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import recordJudgmentDataBuilderComponents from './record-judgment-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class RecordJudgmentDataBuilder extends BaseDataBuilder {
  async buildDeterMeansImmediately() {
    return this.buildData();
  }

  protected async buildData({
    judgmentRecordReason = JudgmentRecordReason.DETERMINATION_OF_MEANS,
    joPaymentPlan = JoPaymentPlan.IMMEDIATELY,
  }: {
    judgmentRecordReason?: JudgmentRecordReason,
    joPaymentPlan?: JoPaymentPlan,
  } = {}) {
    return {
      ...recordJudgmentDataBuilderComponents.recordJudgment(
        judgmentRecordReason,
        joPaymentPlan,
        this.ccdCaseData.fixedCosts?.fixedCostAmount!,
        this.ccdCaseData.totalClaimAmount!,
      ),
    };
  }
}
