import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import queryManagementRespondSchemaBuilderComponents from './query-management-respond-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class QueryManagementRespondSchemaBuilder extends BaseSchemaBuilder {
  async buildQueryCtsc(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildQueryHearingCentreAdmin(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    collectionField = 'queries',
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...queryManagementRespondSchemaBuilderComponents.queryCollection(collectionField),
      ...queryManagementRespondSchemaBuilderComponents.qmLatestQuery,
    });
  }
}
