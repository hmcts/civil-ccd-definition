import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../../enums/claim-track';
import PartyType from '../../../../../../enums/party-type';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';

const references = {
  References: {
    CaseAccessCategory: 'UNSPEC_CLAIM',
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
    AddAnotherClaimant: {
      addApplicant2: 'No',
    },
  };
};

const claimant2 = (partyType: PartyType) => ({
  AddAnotherClaimant: {
    addApplicant2: 'Yes',
  },
  SecondClaimant: {
    applicant2: CaseDataHelper.buildClaimantOrDefData('Claimant2', partyType),
  },
});

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
  SpecCorrespondenceAddress: {
    specApplicantCorrespondenceAddressRequired: 'No',
  },
};

const claimantSolicitor1CorrespondenceAddress = {
  SpecCorrespondenceAddress: {
    specApplicantCorrespondenceAddressRequired: 'Yes',
    specApplicantCorrespondenceAddressdetails: CaseDataHelper.buildAddressData('Claimant1Service'),
  },
};

const defendant1 = (partyType: PartyType) => ({
  Defendant: {
    respondent1: CaseDataHelper.buildClaimantOrDefData('Defendant1', partyType),
  },
  LegalRepresentation: {
    specRespondent1Represented: 'No',
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
  DefendantSolicitorEmail: {
    respondentSolicitor1EmailAddress: defendantSolicitor1User.email,
  },
  SpecRespondentCorrespondenceAddress: {
    specRespondentCorrespondenceAddressRequired: 'No',
  },
};

const defendantSolicitor1CorrespondenceAddress = {
  SpecCorrespondenceAddress: {
    specRespondentCorrespondenceAddressRequired: 'Yes',
    specRespondentCorrespondenceAddressdetails:
      CaseDataHelper.buildAddressData('Defendant2Service'),
  },
};

const defendant2 = (partyType: PartyType) => ({
  AddAnotherDefendant: {
    addRespondent2: 'Yes',
  },
  LegalRepresentationRespondent2: {
    specRespondent2Represented: 'No',
  },
  SecondDefendant: {
    respondent2: CaseDataHelper.buildClaimantOrDefData('Defendant2', partyType),
  },
});

const sameSolicitor = {
  LegalRepresentationRespondent2: {
    respondent2Represented: 'Yes',
  },
  SameLegalRepresentative: {
    respondent2SameLegalRepresentative: 'Yes',
  },
};

const defendantSolicitor2 = {
  SecondDefendantLegalRepresentation: {
    respondent2ORepresented: 'Yes',
  },
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
  SpecSecondRespondentCorrespondenceAddress: {
    respondentSolicitor2ServiceAddressRequired: 'No',
  },
};

const defendantSolicitor2CorrespondenceAddress = {
  SpecCorrespondenceAddress: {
    specRespondent2CorrespondenceAddressRequired: 'Yes',
    specRespondent2CorrespondenceAddressdetails:
      CaseDataHelper.buildAddressData('Defendant2Service'),
  },
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
          claimAmount: CaseDataHelper.getClaimValue(claimTrack) * 100,
        },
      },
    ],
  },
  ClaimInterest: {
    userInput: {
      claimInterest: 'No',
    },
  },
  InterestSummary: {},
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
  claimantSolicitor1CorrespondenceAddress,
  defendant1,
  defendantSolicitor1,
  defendantSolicitor1CorrespondenceAddress,
  defendant2,
  sameSolicitor,
  defendantSolicitor2,
  defendantSolicitor2CorrespondenceAddress,
  claimDetails,
  statementOfTruth,
};

export default createClaimSpecData;
