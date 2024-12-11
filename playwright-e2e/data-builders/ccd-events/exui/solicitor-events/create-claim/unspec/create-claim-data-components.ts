import preferredCourts from '../../../../../../config/preferred-courts';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../../enums/claim-track';
import ClaimType from '../../../../../../enums/claim-type';
import PartyType from '../../../../../../enums/party-type';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ClaimTypeHelper from '../../../../../../helpers/claim-type-helper';
import { UploadDocumentValue } from '../../../../../../models/ccd/ccd-case-data';

const references = {
  References: {
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
    },
    applicant1DQRemoteHearing: {
      remoteHearingRequested: 'Yes',
      reasonForRemoteHearing: 'No reason',
    },
  },
};

const claimant1 = (partyType: PartyType) => {
  return {
    Claimant: {
      applicant1: CaseDataHelper.buildClaimantOrDefData('Claimant1', partyType),
    },
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
};

const claimantSolicitor1 = {
  Notifications: {
    applicantSolicitor1CheckEmail: {
      email: claimantSolicitorUser.email,
      correct: 'No',
    },
    applicantSolicitor1UserDetails: {
      email: claimantSolicitorUser.email,
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
    applicantSolicitor1ServiceAddressRequired: 'Yes',
    applicantSolicitor1ServiceAddress: CaseDataHelper.buildAddressData('ClaimantService'),
  },
};

const claimant2 = (claimType: ClaimType, partyType: PartyType) => {
  if (ClaimTypeHelper.isClaimant2(claimType))
    return {
      AddAnotherClaimant: {
        addApplicant2: 'Yes',
      },
      SecondClaimant: {
        applicant2: CaseDataHelper.buildClaimantOrDefData('Claimant2', partyType),
      },
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
  return {
    AddAnotherClaimant: {
      addApplicant2: 'No',
    },
  };
};

const defendant1 = (partyType: PartyType) => ({
  Defendant: {
    respondent1: CaseDataHelper.buildClaimantOrDefData('Defendant1', partyType),
  },
});

const defendantSolicitor1 = (claimType: ClaimType) => {
  if (ClaimTypeHelper.isDefendant1Represented(claimType))
    return {
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
        respondentSolicitor1ServiceAddressRequired: 'Yes',
        respondentSolicitor1ServiceAddress: CaseDataHelper.buildAddressData('DefendantService'),
      },
      DefendantSolicitorEmail: {
        respondentSolicitor1EmailAddress: defendantSolicitor1User.email,
      },
    };
  return {
    LegalRepresentation: {
      respondent1Represented: 'No',
    },
  };
};

const defendant2 = (claimType: ClaimType, partyType: PartyType) => {
  if (ClaimTypeHelper.isDefendant2(claimType))
    return {
      AddAnotherDefendant: {
        addRespondent2: 'Yes',
      },
      SecondDefendant: {
        respondent2: CaseDataHelper.buildClaimantOrDefData('Defendant2', partyType),
      },
    };
  return {
    AddAnotherDefendant: {
      addRespondent2: 'No',
    },
  };
};

const defendant2Represented = (claimType: ClaimType) => {
  if (ClaimTypeHelper.isDefendant2Represented(claimType))
    return {
      SecondDefendantLegalRepresentation: {
        respondent2Represented: 'Yes',
      },
    };
  else if (ClaimTypeHelper.isDefendant2Unrepresented(claimType)) {
    return {
      SecondDefendantLegalRepresentation: {
        respondent2Represented: 'No',
      },
    };
  }
  return {};
};

const defendant2SameSolicitor = (claimType: ClaimType) => {
  if (claimType === ClaimType.ONE_VS_TWO_SAME_SOL)
    return {
      SameLegalRepresentative: {
        respondent2SameLegalRepresentative: 'Yes',
      },
    };
  else if (claimType === ClaimType.ONE_VS_TWO_DIFF_SOL)
    return {
      SameLegalRepresentative: {
        respondent2SameLegalRepresentative: 'No',
      },
    };
  return {};
};

const defendantSolicitor2 = (claimType: ClaimType) => {
  if (ClaimTypeHelper.isDefendant2RepresentedNotSame(claimType))
    return {
      SecondDefendantSolicitorOrganisation: {
        respondent2OrgRegistered: 'Yes',
        respondent2OrganisationPolicy: {
          OrgPolicyReference: 'Defendant policy reference 2',
          OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORTWO]',
          Organisation: { OrganisationID: defendantSolicitor2User.orgId },
        },
      },
      SecondDefendantSolicitorServiceAddress: {
        respondentSolicitor2ServiceAddressRequired: 'Yes',
        respondentSolicitor2ServiceAddress: CaseDataHelper.buildAddressData('Defendant2Service'),
      },
      SecondDefendantSolicitorReference: {
        respondentSolicitor2Reference: 'Defendant Solicitor Reference',
      },
      SecondDefendantSolicitorEmail: {
        respondentSolicitor2EmailAddress: defendantSolicitor2User.email,
      },
    };
  return {};
};

const claimDetails = (claimTrack: ClaimTrack, particularsOfClaimDocument: UploadDocumentValue) => ({
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
      particularsOfClaimDocument: [CaseDataHelper.setIdToData(particularsOfClaimDocument)],
    },
  },
  ClaimValue: {
    claimValue: {
      statementOfValueInPennies: `${CaseDataHelper.getClaimValue(claimTrack) * 100}`,
    },
  },
  PbaNumber: {},
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
  claimant2,
  claimantSolicitor1,
  defendant1,
  defendantSolicitor1,
  defendant2,
  defendant2Represented,
  defendant2SameSolicitor,
  defendantSolicitor2,
  claimDetails,
  statementOfTruth,
};

export default createClaimData;
