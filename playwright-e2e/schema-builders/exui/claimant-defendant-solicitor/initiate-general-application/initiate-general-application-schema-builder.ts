import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import initiateGeneralApplicationSchemaBuilderComponents from './initiate-general-application-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class InitiateGeneralApplicationSchemaBuilder extends BaseSchemaBuilder {
  async buildCS1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildDS1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildDS2(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(caseDataBeforeSubmission?: CCDCaseData): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      applicant1: (baseSchema.shape.applicant1 as z.ZodObject<any>).extend({
        unavailableDates: z.array(z.looseObject({})).optional(),
      }),
      respondent1: (baseSchema.shape.respondent1 as z.ZodObject<any>).extend({
        unavailableDates: z.array(z.looseObject({})).optional(),
      }),
      ...initiateGeneralApplicationSchemaBuilderComponents.generalApplications,
      ...initiateGeneralApplicationSchemaBuilderComponents.claimantGaAppDetails,
      ...initiateGeneralApplicationSchemaBuilderComponents.gaDocuments,
    });
  }
}
