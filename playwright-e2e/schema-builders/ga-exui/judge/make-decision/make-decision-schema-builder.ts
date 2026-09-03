import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import JudicialDecision from '../../../../constants/ccd-events/ga-ccd-events/make-decision/judicial-decision';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import makeDecisionSchemaBuilderComponents from './make-decision-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class MakeDecisionSchemaBuilder extends BaseSchemaBuilder {
  async buildAddInfo(gaCaseDataBeforeSubmission?: GaCCDCaseData) {
    return this.buildSchema(gaCaseDataBeforeSubmission);
  }

  async buildListHearing(gaCaseDataBeforeSubmission?: GaCCDCaseData) {
    return this.buildSchema(gaCaseDataBeforeSubmission, {
      judicialDecision: JudicialDecision.LIST_FOR_A_HEARING,
    });
  }

  protected async buildSchema(
    gaCaseDataBeforeSubmission?: GaCCDCaseData,
    {
      judicialDecision = JudicialDecision.REQUEST_MORE_INFO,
    }: {
      judicialDecision?: JudicialDecision;
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(gaCaseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...makeDecisionSchemaBuilderComponents.judicialDecision(judicialDecision),
      ...makeDecisionSchemaBuilderComponents.judicialDecisionRequestMoreInfo(judicialDecision),
      ...makeDecisionSchemaBuilderComponents.judicialListForHearing(judicialDecision),
      ...makeDecisionSchemaBuilderComponents.hearingDetails(judicialDecision),
    });
  }
}
