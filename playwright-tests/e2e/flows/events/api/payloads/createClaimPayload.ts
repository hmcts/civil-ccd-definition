import { randomUUID } from 'node:crypto';
import claimTypes from '../../../../../enums/claim-types.ts';
import claimantDefendantTypes from '../../../../../enums/claimantDefendantTypes.ts';
import unspecClaimTypes from '../../../../../enums/unspecClaimTypes.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import { courts } from '../../../../../fixtures/courts.ts';
import { partyDetails } from '../../../../../fixtures/partyDetails.ts';
import { legalRepresentatives } from '../../../../../fixtures/legalRepresentatives.ts';
import {
  claimantSolicitorCredentials,
  respondent1SolicitorCredentials,
} from '../../../../../civilConfig.ts';
import { claimAmountInPounds } from '../../../createUnspecifiedCase.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';

// The case data for CREATE_CLAIM, as XUI would submit it after every page of the event had been filled in the way
// createUnspecifiedCase.ts fills them. startCaseData is the case data CCD returned when the event was started, which
// holds what the event's about to start callback filled in (the organisation policies' roles).
//
// Only a 1v1 claim with both parties represented and individuals as the parties is coded so far.
export function buildCreateClaimPayload(c: UnspecifiedConfig, startCaseData: Record<string, any>): Record<string, any> {
  if (c.claimType !== claimTypes.ONE_VS_ONE) {
    throw new Error(`Creating a ${c.claimType} claim through the API is not coded yet (only 1v1)`);
  }
  if (c.claimantType !== claimantDefendantTypes.INDIVIDUAL || c.defendantType !== claimantDefendantTypes.INDIVIDUAL) {
    throw new Error('Creating a claim through the API is only coded for individuals as the claimant and defendant so far');
  }
  if (c.claimant1LitigantFriend === yesNo.YES) {
    throw new Error('Creating a claim with a claimant litigation friend through the API is not coded yet');
  }

  return {
    ...startCaseData,
    ...references(),
    ...court(),
    ...claimant(),
    ...claimantSolicitor(),
    ...defendant(),
    ...defendantSolicitor(),
    ...claimDetails(c),
    ...claimValue(c),
    ...statementOfTruth(),
  };
}

// References
function references() {
  return {
    CaseAccessCategory: 'UNSPEC_CLAIM',
    solicitorReferences: {
      applicantSolicitor1Reference: 'ApplicantSolicitorReference',
      respondentSolicitor1Reference: 'RespondentSolicitor1Reference',
    },
  };
}

// Court. The list of courts is made by the References page's mid event callback, which is not run, so the list holds
// only the chosen court. civil-service finds the court by its label; the code is made up each time the list is made.
function court() {
  const clerkenwell = { code: randomUUID(), label: courts.clerkenwell.longAddress };
  return {
    courtLocation: {
      applicantPreferredCourtLocationList: { list_items: [clerkenwell], value: clerkenwell },
      reasonForHearingAtSpecificCourt: 'Test description for reasons',
    },
    applicant1DQRemoteHearing: { remoteHearingRequested: yesNo.NO },
  };
}

function address(details: { addressLine1: string; addressLine2: string; addressLine3: string; postTown: string; county: string; country: string; postcode: string }) {
  return {
    AddressLine1: details.addressLine1,
    AddressLine2: details.addressLine2,
    AddressLine3: details.addressLine3,
    PostTown: details.postTown,
    County: details.county,
    Country: details.country,
    PostCode: details.postcode,
  };
}

// Claimant, Claimant litigation friend and Add another claimant
function claimant() {
  const details = partyDetails.claimant1;
  return {
    applicant1: {
      type: claimantDefendantTypes.INDIVIDUAL,
      individualTitle: details.title,
      individualFirstName: details.firstName,
      individualLastName: details.lastName,
      individualDateOfBirth: `${details.DOB_year}-${details.DOB_month}-${details.DOB_day}`,
      partyPhone: details.phone,
      primaryAddress: address(details.address),
    },
    applicant1LitigationFriendRequired: yesNo.NO,
    addApplicant2: yesNo.NO,
  };
}

// Notifications, Claimant solicitor organisation and Claimant solicitor service address
function claimantSolicitor() {
  return {
    applicantSolicitor1CheckEmail: {
      email: claimantSolicitorCredentials.username,
      correct: yesNo.YES,
    },
    applicant1OrganisationPolicy: {
      OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
      Organisation: { OrganisationID: claimantSolicitorCredentials.orgId },
    },
    applicantSolicitor1ServiceAddressRequired: yesNo.NO,
  };
}

// Defendant and Add another defendant
function defendant() {
  const details = partyDetails.defendant1;
  return {
    respondent1: {
      type: claimantDefendantTypes.INDIVIDUAL,
      individualTitle: details.title,
      individualFirstName: details.firstName,
      individualLastName: details.lastName,
      partyPhone: details.phone,
      partyEmail: details.email,
      primaryAddress: address(details.address),
    },
    addRespondent2: yesNo.NO,
  };
}

// Legal representation, Defendant solicitor organisation, service address and email
function defendantSolicitor() {
  return {
    respondent1Represented: yesNo.YES,
    respondent1OrgRegistered: yesNo.YES,
    respondent1OrganisationPolicy: {
      OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONE]',
      Organisation: { OrganisationID: respondent1SolicitorCredentials.orgId },
    },
    respondentSolicitor1ServiceAddressRequired: yesNo.NO,
    respondentSolicitor1EmailAddress: legalRepresentatives.legalRepresentative1.email,
  };
}

// Type of claim, Personal injury type, Details and Upload particulars of claim
function claimDetails(c: UnspecifiedConfig) {
  return {
    claimTypeUnSpec: c.typeOfClaim,
    ...(c.typeOfClaim === unspecClaimTypes.PERSONAL_INJURY ? { personalInjuryType: c.typeOfClaimSubType } : {}),
    detailsOfClaim: 'Test description of claim',
    uploadParticularsOfClaim: yesNo.NO,
  };
}

// Claim value and the fee for it, which the Claim value page's mid event callback would work out
function claimValue(c: UnspecifiedConfig) {
  const amountInPounds = Number(claimAmountInPounds(c.track, c.typeOfClaim));
  return {
    claimValue: { statementOfValueInPennies: String(amountInPounds * 100) },
    claimFee: claimFee(amountInPounds),
    paymentTypePBA: 'PBAv3',
    claimIssuedPaymentDetails: { customerReference: 'ApplicantSolicitorReference' },
  };
}

// The claim issue fee from the fees register. Only the band from £10,000 to £200,000 (5% of the claim) is coded so far.
function claimFee(amountInPounds: number) {
  if (amountInPounds > 10000 && amountInPounds <= 200000) {
    return { calculatedAmountInPence: String(amountInPounds * 5), code: 'FEE0209', version: '3' };
  }
  throw new Error(`The claim fee for £${amountInPounds} is not coded yet (only £10,000 to £200,000)`);
}

// Statement of truth
function statementOfTruth() {
  const solicitor = legalRepresentatives.legalRepresentative1;
  return {
    uiStatementOfTruth: {
      name: `${solicitor.firstName} ${solicitor.lastName}`,
      role: solicitor.role,
    },
  };
}
