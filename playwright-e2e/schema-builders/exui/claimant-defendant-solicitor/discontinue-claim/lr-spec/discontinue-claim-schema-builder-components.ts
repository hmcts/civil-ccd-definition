import { z } from 'zod';
import CourtPermissionNeeded from '../../../../../constants/ccd-events/discontinue-claim/court-permission-needed';
import DiscontinuanceType from '../../../../../constants/ccd-events/discontinue-claim/discontinuance-type';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';

const nonEmptyString = z.string().min(1);

const multipleClaimant = (claimType: ClaimType) => {
  if (claimType === ClaimType.TWO_VS_ONE) {
    return {
      claimantWhoIsDiscontinuing: z.looseObject({
        list_items: z.array(z.looseObject({})).min(1),
        value: z.looseObject({}),
      }),
    };
  }

  return {};
};

const courtPermission = (courtPermissionNeeded: CourtPermissionNeeded) => {
  if (courtPermissionNeeded === CourtPermissionNeeded.YES) {
    return {
      courtPermissionNeeded: z.literal('YES'),
    };
  } else if (courtPermissionNeeded === CourtPermissionNeeded.NO) {
    return {
      courtPermissionNeeded: z.literal('NO'),
      courtPermissionNeededChecked: z.array(nonEmptyString).min(1),
    };
  }

  return {};
};

const permissionGranted = (courtPermissionNeeded: CourtPermissionNeeded) => {
  if (courtPermissionNeeded === CourtPermissionNeeded.YES) {
    return {
      isPermissionGranted: z.literal('YES'),
      permissionGrantedComplex: z.looseObject({
        permissionGrantedJudge: nonEmptyString,
        permissionGrantedDate: nonEmptyString,
      }),
    };
  }

  return {};
};

const discontinuingAgainstDefendants = (claimType: ClaimType) => {
  if (ClaimTypeHelper.isDefendant2Represented(claimType)) {
    return {
      isDiscontinuingAgainstBothDefendants: nonEmptyString,
    };
  }

  return {};
};

const discontinuanceType = (discontinuanceType: DiscontinuanceType) => {
  if (discontinuanceType === DiscontinuanceType.FULL_DISCONTINUANCE) {
    return {
      typeOfDiscontinuance: z.literal(DiscontinuanceType.FULL_DISCONTINUANCE),
    };
  } else if (discontinuanceType === DiscontinuanceType.PART_DISCONTINUANCE) {
    return {
      typeOfDiscontinuance: z.literal(DiscontinuanceType.PART_DISCONTINUANCE),
      partDiscontinuanceDetails: nonEmptyString,
    };
  }

  return {};
};

const discontinueClaimSchemaBuilderComponents = {
  multipleClaimant,
  courtPermission,
  permissionGranted,
  discontinuingAgainstDefendants,
  discontinuanceType,
};

export default discontinueClaimSchemaBuilderComponents;
