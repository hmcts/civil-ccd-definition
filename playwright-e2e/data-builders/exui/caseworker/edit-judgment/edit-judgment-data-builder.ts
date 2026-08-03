import BaseDataBuilder from '../../../../base/base-data-builder';
import JoPaymentPlan from '../../../../constants/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/record-edit-judgment/judgment-record-reason';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import editJudgmentDataBuilderComponents from './edit-judgment-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class EditJudgmentDataBuilder extends BaseDataBuilder {
  async buildDeterMeansSetDate() {
    return this.buildData({
      joPaymentPlan: JoPaymentPlan.SET_DATE
    });
  }

  protected async buildData({
    judgmentRecordReason = JudgmentRecordReason.DETERMINATION_OF_MEANS,
    joPaymentPlan = JoPaymentPlan.IMMEDIATELY,
  }: {
    judgmentRecordReason?: JudgmentRecordReason,
    joPaymentPlan?: JoPaymentPlan,
  } = {}) {
    return {
      ...editJudgmentDataBuilderComponents.editJudgment(
        judgmentRecordReason,
        joPaymentPlan,
        this.ccdCaseData.fixedCosts?.fixedCostAmount!,
        this.ccdCaseData.totalClaimAmount!,
      ),
    };
  }
}
