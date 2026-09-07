import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import editJudgmentSchemaBuilderComponents from './edit-judgment-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class EditJudgmentSchemaBuilder extends BaseSchemaBuilder {
  async buildDeterMeansSetDate(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(
      caseDataBeforeSubmission, 
      {
        joPaymentPlan: JoPaymentPlan.SET_DATE
      }
    );
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      judgmentRecordReason = JudgmentRecordReason.DETERMINATION_OF_MEANS,
      joPaymentPlan = JoPaymentPlan.IMMEDIATELY,
    }: {
      judgmentRecordReason?: JudgmentRecordReason,
      joPaymentPlan?: JoPaymentPlan,
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...editJudgmentSchemaBuilderComponents.editJudgment(
        judgmentRecordReason,
        joPaymentPlan,
      ),
    });
  }
}
