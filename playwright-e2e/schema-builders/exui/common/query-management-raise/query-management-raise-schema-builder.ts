import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import queryManagementRaiseSchemaBuilderComponents from './query-management-raise-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class QueryManagementRaiseSchemaBuilder extends BaseSchemaBuilder {
  async buildRaiseQuery(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildFollowUpQuery(caseDataBeforeSubmission?: CCDCaseData) {
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
      ...queryManagementRaiseSchemaBuilderComponents.queryCollection(collectionField),
      ...queryManagementRaiseSchemaBuilderComponents.qmLatestQuery,
    });
  }
}
