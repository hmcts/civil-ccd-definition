import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import recordJudgmentSchemaBuilderComponents from './record-judgment-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class RecordJudgmentSchemaBuilder extends BaseSchemaBuilder {
  async buildDeterMeansImmediately(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildData(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
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
      ...recordJudgmentSchemaBuilderComponents.recordJudgment(
        judgmentRecordReason,
        joPaymentPlan,
      ),
    });
  }
}
