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

const references = {
  References: {
    solicitorReferences: {
      applicantSolicitor1Reference: 'Claimant Solicitor Reference',
      respondentSolicitor1Reference: 'Defendant Solicitor Reference',
    },
  },
};

const claimant1 = (partyType: PartyType) => {
  return {
    Claimant: {
      applicant1: CaseDataHelper.buildClaimantOrDefData('Claimant1', partyType),
    },
  };
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
    };
  return {
    AddAnotherClaimant: {
      addApplicant2: 'No',
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
  SpecCorrespondenceAddress: {
    specApplicantCorrespondenceAddressRequired: 'Yes',
    specApplicantCorrespondenceAddressdetails: CaseDataHelper.buildAddressData('ClaimantService'),
  },
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
        specRespondent1Represented: 'Yes',
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
      DefendantSolicitorEmail: {
        respondentSolicitor1EmailAddress: defendantSolicitor1User.email,
      },
      SpecRespondentCorrespondenceAddress: {
        specRespondentCorrespondenceAddressRequired: 'Yes',
        specRespondentCorrespondenceAddressdetails:
          CaseDataHelper.buildAddressData('Defendant2Service'),
      },
    };
  return {
    LegalRepresentation: {
      specRespondent1Represented: 'No',
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
      LegalRepresentationRespondent2: {
        specRespondent2Represented: 'Yes',
      },
    };
  else if (ClaimTypeHelper.isDefendant2Unrepresented(claimType)) {
    return {
      LegalRepresentationRespondent2: {
        specRespondent2Represented: 'No',
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
      SecondDefendantSolicitorEmail: {
        respondentSolicitor2EmailAddress: defendantSolicitor2User.email,
      },
      SpecRespondent2CorrespondenceAddress: {
        specRespondent2CorrespondenceAddressRequired: 'Yes',
        specRespondent2CorrespondenceAddressdetails:
          CaseDataHelper.buildAddressData('Defendant2Service'),
      },
    };
  return {};
};

const claimDetails = (claimTrack: ClaimTrack) => ({
  FlightDelayClaim: {
    isFlightDelayClaim: 'No',
  },
  Details: {
    detailsOfClaim: 'Test details of claim',
  },
  ClaimTimeline: {
    timelineOfEvents: [
      {
        value: {
          timelineDate: '2021-02-01',
          timelineDescription: 'event 1',
        },
      },
    ],
  },
  EvidenceList: {
    speclistYourEvidenceList: [
      {
        value: {
          evidenceType: 'CONTRACTS_AND_AGREEMENTS',
          contractAndAgreementsEvidence: 'evidence details',
        },
      },
    ],
  },
  ClaimAmount: {
    claimAmountBreakup: [
      {
        value: {
          claimReason: 'amount reason',
          claimAmount: `${CaseDataHelper.getClaimValue(claimTrack) * 100}`,
        },
      },
    ],
  },
  ClaimAmountDetails: {
    totalClaimAmount: `${CaseDataHelper.getClaimValue(claimTrack) * 100}`,
  },
  ClaimInterest: {
    claimInterest: 'No',
  },
  InterestSummary: {},
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

const createClaimSpecData = {
  references,
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

export default createClaimSpecData;