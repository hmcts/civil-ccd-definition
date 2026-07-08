import CaseDataHelper from '../../../../../helpers/case-data-helper.ts';
import {ClaimantDefendantPartyType} from "../../../../../models/users/claimant-defendant-party-types.ts";
import partys from "../../../../../constants/users/partys.ts";
import preferredCourts from "../../../../../config/preferred-courts.ts";
const selectedHearingLocation = CaseDataHelper.setCodeToData(
  preferredCourts[partys.DEFENDANT_1.key].default,
);

const defendantDetails = (defendant1Party : ClaimantDefendantPartyType) => ({
  defendantDetails: {
    defendantDetails: {
      list_items: [CaseDataHelper.setCodeToData(CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1Party).partyName)],
      value: CaseDataHelper.setCodeToData(CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, defendant1Party).partyName),
    }
  },
});

const showCertifyStatement = () => ({
  showCertifyStatement: {
    CPRAcceptance: {
      acceptance: ['CERTIFIED'],
    }
  },
});

const hearingTypeTrialHearing = () => ({
  hearingType: {
    hearingSelection : 'TRIAL_HEARING',
    detailsOfDirection:  'Test draft order',
  },
});

const hearingTypeDisposalHearing = () => ({
  hearingType: {
    hearingSelection : 'DISPOSAL_HEARING',
    detailsOfDirection:  'Test draft order',
  },
});

const hearingSupportRequirementsFieldDJ = (
  locationName: string = 'Civil National Business Centre',
  hearingType: string = 'IN_PERSON',
  hearingLocation: { code: string; label: string } = {
    code: 'e43bbb8a-9915-42c8-be70-4642a3bc843f-424213',
    label: 'Nottingham County Court And Family Court - Canal Street - NG1 7EJ',
  },
  telephoneNumber: string = '07777777777',
  email: string = 'Test@Test.com',
) => ({
  hearingSupportRequirements: {
    locationName,
    hearingSupportRequirementsDJ: {
      hearingType,
      hearingTemporaryLocation: {
        value: CaseDataHelper.setCodeToData(hearingLocation.label),
        list_items: [CaseDataHelper.setCodeToData(hearingLocation.label)],
      },
      hearingPreferredTelephoneNumber1: telephoneNumber,
      hearingPreferredEmail: email,
      hearingUnavailableDates: 'No',
      hearingSupportQuestion: 'No',
    },
  },
});

const requestDefaultJudgementBuilderComponents = {
  defendantDetails,
  showCertifyStatement,
  hearingTypeTrialHearing,
  hearingSupportRequirementsFieldDJ
};

export default requestDefaultJudgementBuilderComponents;
