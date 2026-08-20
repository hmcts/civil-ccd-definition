import preferredCourts from '../../../../../config/preferred-courts';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../config/users/exui-users';
import partys from '../../../../../constants/users/partys';
import ClaimTypeUnspec from '../../../../../constants/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../../constants/ccd-events/create-claim/personal-injury-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import { ClaimantDefendantPartyType } from '../../../../../models/users/claimant-defendant-party-types';
import CivilServiceRequests from '../../../../../requests/civil-service-requests';
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
        list_items: [CaseDataHelper.setCodeToData(preferredCourts[partys.CLAIMANT_SOLICITOR_1.key].default)],
        value: CaseDataHelper.setCodeToData(preferredCourts[partys.CLAIMANT_SOLICITOR_1.key].default),
      },
    },
    applicant1DQRemoteHearing: {
      remoteHearingRequested: 'Yes',
      reasonForRemoteHearing: 'No reason',
    },
  },
};

const claimant1 = async (
  partyType: ClaimantDefendantPartyType,
  civilServiceRequests: CivilServiceRequests,
) => {
  const certificateOfSuitability =
    await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

  return {
    Claimant: {
      applicant1: CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_1, partyType),
    },
    ClaimantLitigationFriendRequired: {
      applicant1LitigationFriendRequired: 'Yes',
    },
    ClaimantLitigationFriend: {
      applicant1LitigationFriend: {
        ...CaseDataHelper.buildLitigationFriendData(
          partys.CLAIMANT_1_LITIGATION_FRIEND,
        ),
        partyName: undefined,
        certificateOfSuitability: [CaseDataHelper.setIdToData({document: certificateOfSuitability})],
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
    applicantSolicitor1ServiceAddress: CaseDataHelper.buildAddressData(partys.CLAIMANT_SOLICITOR_1),
  },
};

const claimant2 = async (
  claimType: ClaimType,
  partyType: ClaimantDefendantPartyType,
  civilServiceRequests: CivilServiceRequests,
) => {
  if (ClaimTypeHelper.isClaimant2(claimType)) {
    const certificateOfSuitability =
      await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      AddAnotherClaimant: {
        addApplicant2: 'Yes',
      },
      SecondClaimant: {
        applicant2: CaseDataHelper.buildClaimantAndDefendantData(partys.CLAIMANT_2, partyType),
      },
      SecondClaimantLitigationFriendRequired: {
        applicant2LitigationFriendRequired: 'Yes',
      },
      SecondClaimantLitigationFriend: {
        applicant2LitigationFriend: {
          ...CaseDataHelper.buildLitigationFriendData(
            partys.CLAIMANT_2_LITIGATION_FRIEND,
          ),
          partyName: undefined,
          certificateOfSuitability: [CaseDataHelper.setIdToData({document: certificateOfSuitability})],
        },
      },
    };
  }
  return {
    AddAnotherClaimant: {
      addApplicant2: 'No',
    },
  };
};

const defendant1 = (partyType: ClaimantDefendantPartyType) => ({
  Defendant: {
    respondent1: CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_1, partyType),
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
        respondentSolicitor1ServiceAddress: CaseDataHelper.buildAddressData(
          partys.DEFENDANT_SOLICITOR_1,
        ),
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

const defendant2 = (claimType: ClaimType, partyType: ClaimantDefendantPartyType) => {
  if (ClaimTypeHelper.isDefendant2(claimType))
    return {
      AddAnotherDefendant: {
        addRespondent2: 'Yes',
      },
      SecondDefendant: {
        respondent2: {
          ...CaseDataHelper.buildClaimantAndDefendantData(partys.DEFENDANT_2, partyType),
        },
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
        respondentSolicitor2ServiceAddress: CaseDataHelper.buildAddressData(
          partys.DEFENDANT_SOLICITOR_2,
        ),
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

const claimTypeUnspec = (claimTypeUnSpec: ClaimTypeUnspec, personalInjuryType?: PersonalInjuryType) => {

  if (claimTypeUnSpec === ClaimTypeUnspec.PERSONAL_INJURY) {
    return {
      ClaimType: {
        claimTypeUnSpec: claimTypeUnSpec,
      },
      PersonalInjuryType: {
        personalInjuryType: personalInjuryType,
        personalInjuryTypeOther: personalInjuryType === PersonalInjuryType.PERSONAL_INJURY_OTHER ? 'Personal injury other description' : undefined,
      },
    }
  }

  if ((claimTypeUnSpec as ClaimTypeUnspec) === ClaimTypeUnspec.OTHER) {
    return {
      ClaimType: {
        claimTypeUnSpec: claimTypeUnSpec as ClaimTypeUnspec,
        claimTypeOther: 'Other claim type description',
      }
    }
  }

  return {
    ClaimType: {
      claimTypeUnSpec,
    },
  };
};

const otherRemedy = (claimTypeUnSpec: ClaimTypeUnspec) => {
  if(
    claimTypeUnSpec === ClaimTypeUnspec.HOUSING_DISREPAIR ||
    claimTypeUnSpec === ClaimTypeUnspec.DAMAGES_AND_OTHER_REMEDY
  ) {
    return {
      ClaimDeclaration: {
        isClaimDeclarationAdded: 'Yes',
        claimDeclarationDescription: 'Claim declaration description',
      },
      HumanRightsAct: {
        isHumanRightsActIssues: 'Yes',
      }
    };
  }

  return {};
};

const details = {
  Details: {
    detailsOfClaim: 'Test details of claim',
  },
};

const uploadParticularsOfClaim = {
  uploadParticularsOfClaim: {
    uploadParticularsOfClaim: 'No',
  },
};

const claimValue = (claimTrack: ClaimTrack) => {
  return {
    ClaimValue: {
      claimValue: {
        statementOfValueInPennies: `${CaseDataHelper.getClaimValue(claimTrack) * 100}`,
      },
    },
  };
};

const pbaNumber = {
  PbaNumber: {},
};

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
  claimTypeUnspec,
  details,
  uploadParticularsOfClaim,
  claimValue,
  pbaNumber,
  otherRemedy,
  statementOfTruth,
};

export default createClaimData;
