import BaseDataBuilder from '../../../../../base/base-data-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import CourtPermissionNeeded from '../../../../../constants/ccd-events/discontinue-claim/court-permission-needed';
import DiscontinuanceType from '../../../../../constants/ccd-events/discontinue-claim/discontinuance-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import discontinueClaimDataBuilderComponents from './discontinue-claim-data-builder-components';

@AllMethodsStep()
export default class DiscontinueClaimDataBuilder extends BaseDataBuilder {
  async buildFull() {
    return this.buildData();
  }

  async buildFull1v2() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO });
  }

  async buildFull2v1() {
    return this.buildData({ claimType: ClaimType.TWO_VS_ONE });
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE,
    courtPermissionNeeded = CourtPermissionNeeded.YES,
    discontinuanceType = DiscontinuanceType.FULL_DISCONTINUANCE,
  }: {
    claimType?: ClaimType,
    discontinuanceType?: DiscontinuanceType,
    courtPermissionNeeded?: CourtPermissionNeeded,
  } = {}) {
    return {
      ...discontinueClaimDataBuilderComponents.multipleClaimant(claimType),
      ...discontinueClaimDataBuilderComponents.courtPermission(courtPermissionNeeded),
      ...discontinueClaimDataBuilderComponents.permissionGranted(courtPermissionNeeded),
      ...discontinueClaimDataBuilderComponents.discontinuingAgainstDefendants(claimType),
      ...discontinueClaimDataBuilderComponents.discontinuanceType(discontinuanceType),
    };
  }
}
