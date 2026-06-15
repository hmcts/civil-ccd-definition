import { z } from 'zod';
import BaseSchemaBuilder from '../../../../base/base-schema-builder';
import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ZodHelper from '../../../../helpers/zod-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import createSdoSchemaBuilderComponents from './create-sdo-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class CreateSdoSchemaBuilder extends BaseSchemaBuilder {
  async buildSmallTrackNoSumSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission, sdoType: SdoType.SMALL_TRACK_NO_SUM });
  }

  async buildSmallTrackSumSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission, sdoType: SdoType.SMALL_TRACK_SUM });
  }

  async buildFastTrackSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission, sdoType: SdoType.FAST_TRACK });
  }

  async buildTrailSdo(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema({ caseDataBeforeSubmission, sdoType: SdoType.TRAIL });
  }

  protected async buildSchema(
    {
      caseDataBeforeSubmission,
      sdoType = SdoType.SMALL_TRACK_NO_SUM,
    }: {
      caseDataBeforeSubmission?: CCDCaseData,
      sdoType?: SdoType,
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...createSdoSchemaBuilderComponents.sdo(sdoType),
      ...createSdoSchemaBuilderComponents.claimsTrack(sdoType),
      ...createSdoSchemaBuilderComponents.orderType(sdoType),
      ...createSdoSchemaBuilderComponents.fastTrack(sdoType),
      ...createSdoSchemaBuilderComponents.smallClaims(sdoType),
      ...createSdoSchemaBuilderComponents.orderPreview,
    });
  }
}
