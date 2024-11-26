import preferredCourts from '../../../../../config/preferred-courts';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../enums/claim-track';
import PartyType from '../../../../../enums/party-type';
import CaseDataHelper from '../../../../../helpers/case-data-helper';

const references = {
  References: {
    CaseAccessCategory: 'UNSPEC_CLAIM',
    solicitorReferences: {
      applicantSolicitor1Reference: 'Claimant Solicitor Reference',
      respondentSolicitor1Reference: 'Defendant Solicitor Reference',
    },
  },
};

const claimantCourt = {
  Court: {
    courtLocation: {
      applicantPreferredCourtLocationList: {
        list_items: [CaseDataHelper.setCodeToData(preferredCourts.claimant)],
        value: CaseDataHelper.setCodeToData(preferredCourts.claimant),
      },
      applicant1DQRemoteHearing: {
        remoteHearingRequested: 'Yes',
        reasonForRemoteHearing: 'No reason',
      },
    },
  },
};

const claimant1 = (partyType: PartyType) => {
  return {
    Claimant: {
      applicant1: CaseDataHelper.buildClaimantOrDefData('Claimant1', partyType),
    },
    ClaimantLitigationFriendRequired: {
      applicant1LitigationFriendRequired: 'No',
    },
    AddAnotherClaimant: {
      addApplicant2: 'No',
    },
  };
};

const claimant1LitigationFriend = {
  ClaimantLitigationFriendRequired: {
    applicant1LitigationFriendRequired: 'Yes',
  },
  ClaimantLitigationFriend: {
    applicant1LitigationFriend: {
      firstName: 'Bob',
      lastName: 'Litigation',
      emailAddress: 'bobthelitigant@litigants.com',
      phoneNumber: '07123456789',
      hasSameAddressAsLitigant: 'No',
      primaryAddress: CaseDataHelper.buildAddressData('Litigation1'),
    },
  },
};

const claimant2 = (partyType: PartyType) => ({
  AddAnotherClaimant: {
    addApplicant2: 'Yes',
  },
  SecondClaimant: {
    applicant2: CaseDataHelper.buildClaimantOrDefData('Claimant2', partyType),
  },
  SecondClaimantLitigationFriendRequired: {
    applicant2LitigationFriendRequired: 'No',
  },
});

const claimant2LitigationFriend = {
  SecondClaimantLitigationFriendRequired: {
    applicant2LitigationFriendRequired: 'Yes',
  },
  SecondClaimantLitigationFriend: {
    applicant2LitigationFriend: {
      firstName: 'Paul',
      lastName: 'Litigation',
      emailAddress: 'paulthelitigant@litigants.com',
      phoneNumber: '07123456789',
      hasSameAddressAsLitigant: 'No',
      primaryAddress: CaseDataHelper.buildAddressData('Litigation2'),
    },
  },
};

const claimantSolicitor1 = {
  Notifications: {
    applicantSolicitor1CheckEmail: {
      email: claimantSolicitorUser.email,
      correct: 'No',
    },
  },
  ClaimantSolicitorOrganisation: {
    applicant1OrganisationPolicy: {
      OrgPolicyReference: 'Claimant policy reference',
      OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
      Organisation: {
        OrganisationID: claimantSolicitorUser.orgId,
      },
    },
  },
  ClaimantSolicitorServiceAddress: {
    applicantSolicitor1ServiceAddressRequired: 'No',
  },
};

const claimantSolicitor1ServiceAddress = {
  ClaimantSolicitorServiceAddress: {
    applicantSolicitor1ServiceAddressRequired: 'Yes',
    applicantSolicitor1ServiceAddress: CaseDataHelper.buildAddressData('ClaimantService'),
  },
};

const defendant1 = (partyType: PartyType) => ({
  Defendant: {
    respondent1: CaseDataHelper.buildClaimantOrDefData('Defendant1', partyType),
  },
  LegalRepresentation: {
    respondent1Represented: 'No',
  },
  AddAnotherDefendant: {
    addRespondent2: 'No',
  },
});

const defendantSolicitor1 = {
  LegalRepresentation: {
    respondent1Represented: 'Yes',
  },
  DefendantSolicitorOrganisation: {
    respondent1OrgRegistered: 'Yes',
    respondent1OrganisationPolicy: {
      OrgPolicyReference: 'Defendant policy reference',
      OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONE]',
      Organisation: {
        OrganisationID: defendantSolicitor1User.orgId,
      },
    },
  },
  DefendantSolicitorServiceAddress: {
    respondentSolicitor1ServiceAddressRequired: 'No',
  },
  DefendantSolicitorEmail: {
    respondentSolicitor1EmailAddress: defendantSolicitor1User.email,
  },
};

const defendantSolicitor1ServiceAddress = {
  DefendantSolicitorServiceAddress: {
    respondentSolicitor1ServiceAddressRequired: 'Yes',
    respondentSolicitor1ServiceAddress: CaseDataHelper.buildAddressData('ClaimantService'),
  },
};

const defendant2 = (partyType: PartyType) => ({
  AddAnotherDefendant: {
    addRespondent2: 'Yes',
  },
  SecondDefendantLegalRepresentation: {
    respondent2Represented: 'No',
  },
  SecondDefendant: {
    respondent2: CaseDataHelper.buildClaimantOrDefData('Defendant2', partyType),
  },
});

const sameSolicitor = {
  SecondDefendantLegalRepresentation: {
    respondent2Represented: 'Yes',
  },
  SameLegalRepresentative: {
    respondent2SameLegalRepresentative: 'Yes',
  },
};

const defendantSolicitor2 = {
  SecondDefendantLegalRepresentation: {
    respondent2Represented: 'Yes',
  },
  SecondDefendantSolicitorOrganisation: {
    respondent2OrgRegistered: 'Yes',
    respondent2OrganisationPolicy: {
      OrgPolicyReference: 'Defendant policy reference 2',
      OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORTWO]',
      Organisation: { OrganisationID: defendantSolicitor2User.orgId },
    },
  },
  SecondDefendantSolicitorServiceAddress: {
    respondentSolicitor2ServiceAddressRequired: 'No',
  },
  SecondDefendantSolicitorReference: {
    respondentSolicitor2Reference: 'Defendant Solicitor Reference',
  },
  SecondDefendantSolicitorEmail: {
    respondentSolicitor2EmailAddress: defendantSolicitor2User.email,
  },
};

const defendantSolicitor2ServiceAddress = {
  SecondDefendantSolicitorServiceAddress: {
    respondentSolicitor2ServiceAddressRequired: 'Yes',
    respondentSolicitor2ServiceAddress: CaseDataHelper.buildAddressData('Defendant2Service'),
  },
};

const claimDetails = (claimTrack: ClaimTrack) => ({
  ClaimTypeUnSpec: {
    claimTypeUnSpec: 'PERSONAL_INJURY',
  },
  ClaimType: {
    claimTypeUnSpec: 'PERSONAL_INJURY',
  },
  PersonalInjuryType: {
    personalInjuryType: 'ROAD_ACCIDENT',
  },
  Details: {
    detailsOfClaim: 'Test details of claim',
  },
  Upload: {
    servedDocumentFiles: {
      particularsOfClaimDocument: [
        CaseDataHelper.setIdToData({
          document_url: '${TEST_DOCUMENT_URL}',
          document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
          document_filename: '${TEST_DOCUMENT_FILENAME}',
        }),
      ],
    },
  },
  ClaimValue: {
    claimValue: {
      statementOfValueInPennies: CaseDataHelper.getClaimValue(claimTrack) * 100,
    },
  },
});

const statementOfTruth = {
  StatementOfTruth: {
    uiStatementOfTruth: {
      name: claimantSolicitorUser.name,
      role: 'Solicitor',
    },
  },
};

const createClaimData = {
  references,
  claimantCourt,
  claimant1,
  claimant1LitigationFriend,
  claimant2,
  claimant2LitigationFriend,
  claimantSolicitor1,
  claimantSolicitor1ServiceAddress,
  defendant1,
  defendantSolicitor1,
  defendantSolicitor1ServiceAddress,
  defendant2,
  sameSolicitor,
  defendantSolicitor2,
  defendantSolicitor2ServiceAddress,
  claimDetails,
  statementOfTruth,
};

export default createClaimData;
