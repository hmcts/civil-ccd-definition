import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import CourtPermissionNeeded from '../../../../../constants/ccd-events/discontinue-claim/court-permission-needed';
import DiscontinuanceType from '../../../../../constants/ccd-events/discontinue-claim/discontinuance-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import discontinueClaimSchemaBuilderComponents from './discontinue-claim-schema-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DiscontinueClaimSchemaBuilder extends BaseSchemaBuilder {
  async buildFull(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission);
  }

  async buildFull1v2(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO,
    });
  }

  async buildFull2v1(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission?: CCDCaseData,
    {
      claimType = ClaimType.ONE_VS_ONE,
      courtPermissionNeeded = CourtPermissionNeeded.YES,
      discontinuanceType = DiscontinuanceType.FULL_DISCONTINUANCE,
    }: {
      claimType?: ClaimType,
      discontinuanceType?: DiscontinuanceType,
      courtPermissionNeeded?: CourtPermissionNeeded,
    } = {},
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...discontinueClaimSchemaBuilderComponents.multipleClaimant(claimType),
      ...discontinueClaimSchemaBuilderComponents.courtPermission(courtPermissionNeeded),
      ...discontinueClaimSchemaBuilderComponents.permissionGranted(courtPermissionNeeded),
      ...discontinueClaimSchemaBuilderComponents.discontinuingAgainstDefendants(claimType),
      ...discontinueClaimSchemaBuilderComponents.discontinuanceType(discontinuanceType),
    });
  }
}
