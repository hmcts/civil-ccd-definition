import ClaimType from '../../../../../constants/cases/claim-type';
import CourtPermissionNeeded from '../../../../../constants/ccd-events/discontinue-claim/court-permission-needed';
import DiscontinuanceType from '../../../../../constants/ccd-events/discontinue-claim/discontinuance-type';
import partys from '../../../../../constants/users/partys';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import DateHelper from '../../../../../helpers/date-helper';

const multipleClaimant = (claimType: ClaimType) => {
  if (claimType === ClaimType.TWO_VS_ONE) {
    return {
      MultipleClaimant: {
        claimantWhoIsDiscontinuing: {
          list_items: [CaseDataHelper.setCodeToData('Both')],
          value: CaseDataHelper.setCodeToData('Both'),
        },
      },
    };
  }

  return {};
};

const courtPermission = (courtPermissionNeeded: CourtPermissionNeeded) => {
  if (courtPermissionNeeded === CourtPermissionNeeded.YES) {
    return {
      CourtPermission: {
        courtPermissionNeeded: 'YES',
      },
    };
  } else if (courtPermissionNeeded === CourtPermissionNeeded.NO) {
    return {
      CourtPermission: {
        courtPermissionNeeded: 'NO',
        courtPermissionNeededChecked: [
          'CourtPermissionNeededCheck',
        ],
      },
    };
  }

  return {};
};

const permissionGranted = (courtPermissionNeeded: CourtPermissionNeeded) => {
  if (courtPermissionNeeded === CourtPermissionNeeded.YES) {
    return {
      PermissionGranted: {
        isPermissionGranted: 'YES',
        permissionGrantedComplex: {
          permissionGrantedJudge: `Judge's Name - ${partys.CLAIMANT_1.key}`,
          permissionGrantedDate: DateHelper.formatDateToString(DateHelper.getToday(), {
            outputFormat: 'YYYY-MM-DD',
          }),
        },
      },
    };
  }

  return {};
};

const discontinuingAgainstDefendants = (claimType: ClaimType) => {
  if (ClaimTypeHelper.isDefendant2Represented(claimType)) {
    return {
      DiscontinuingAgainstDefendants: {
        isDiscontinuingAgainstBothDefendants: 'YES',
      },
    };
  }

  return {};
};

const discontinuanceType = (discontinuanceType: DiscontinuanceType) => {
  if (discontinuanceType === DiscontinuanceType.FULL_DISCONTINUANCE) {
    return {
      DiscontinuanceType: {
        typeOfDiscontinuance: discontinuanceType,
      },
    };
  } else if (discontinuanceType === DiscontinuanceType.PART_DISCONTINUANCE) {
    return {
      DiscontinuanceType: {
        typeOfDiscontinuance: discontinuanceType,
        partDiscontinuanceDetails: `Details of part discontinuance - ${partys.CLAIMANT_1.key}`,
      },
    };
  }

  return {};
};

const discontinueClaimDataBuilderComponents = {
  multipleClaimant,
  courtPermission,
  permissionGranted,
  discontinuingAgainstDefendants,
  discontinuanceType,
};

export default discontinueClaimDataBuilderComponents;
