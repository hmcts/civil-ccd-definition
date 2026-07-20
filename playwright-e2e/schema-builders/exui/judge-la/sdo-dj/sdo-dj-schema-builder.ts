import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import SdoDJType from '../../../../constants/ccd-events/sdo-dj/sdo-dj-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import sdoDJSchemaBuilderComponents from './sdo-dj-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class SdoDJSchemaBuilder extends BaseSchemaBuilder {
  async build(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission });
  }

  async buildTrial(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission, sdoDJType: SdoDJType.TRIAL });
  }

  async buildDisposalHearing(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({
      caseDataBeforeSubmission,
      sdoDJType: SdoDJType.DISPOSAL_HEARING,
    });
  }

  protected async buildSchema({
    caseDataBeforeSubmission,
    sdoDJType = SdoDJType.DISPOSAL_HEARING,
  }: {
    caseDataBeforeSubmission?: CCDCaseData;
    sdoDJType?: SdoDJType;
  } = {}): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...sdoDJSchemaBuilderComponents.caseManagementOrder(sdoDJType),
      ...sdoDJSchemaBuilderComponents.disposalHearing(sdoDJType),
      ...sdoDJSchemaBuilderComponents.trailHearing(sdoDJType),
      ...sdoDJSchemaBuilderComponents.orderPreview,
    });
  }
}
