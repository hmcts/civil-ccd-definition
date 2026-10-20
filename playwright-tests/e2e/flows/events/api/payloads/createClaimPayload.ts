import { randomUUID } from 'node:crypto';
import claimantDefendantTypes from '../../../../../enums/claimantDefendantTypes.ts';
import unspecClaimTypes from '../../../../../enums/unspecClaimTypes.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import { courts } from '../../../../../fixtures/courts.ts';
import { partyDetails } from '../../../../../fixtures/partyDetails.ts';
import { legalRepresentatives } from '../../../../../fixtures/legalRepresentatives.ts';
import { claimantSolicitorCredentials } from '../../../../../civilConfig.ts';
import { claimAmountInPounds } from '../../../createUnspecifiedCase.ts';
import { ClaimantShape, DefendantShape } from '../../../createClaimShape.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';

// The case data for CREATE_CLAIM, as XUI would submit it after every page of the event had been filled in the way
// createUnspecifiedCase.ts fills them. startCaseData is the case data CCD returned when the event was started, which
// holds what the event's about to start callback filled in (the organisation policies' roles). The parties follow the
// claim's shape (createClaimShape.ts), as they do in the UI.
//
// certificateOfSuitability is the uploaded document a claimant's litigation friend needs. It is only needed when a
// claimant has a litigation friend.
export function buildCreateClaimPayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  certificateOfSuitability?: Record<string, string>,
): Record<string, any> {
  const { claimants, defendants } = c.claimShape;

  return {
    ...startCaseData,
    ...references(defendants[0]),
    ...court(),
    ...claimantsData(claimants, certificateOfSuitability),
    ...claimantSolicitor(),
    ...defendantsData(claimants, defendants),
    ...claimDetails(c),
    ...claimValue(c),
    ...statementOfTruth(),
  };
}

// References. Defendant 1's solicitor's reference is only asked for when they have their own solicitor.
function references(defendant1: DefendantShape) {
  return {
    CaseAccessCategory: 'UNSPEC_CLAIM',
    solicitorReferences: {
      applicantSolicitor1Reference: 'ApplicantSolicitorReference',
      ...(defendant1.solicitor === 'own' ? { respondentSolicitor1Reference: 'RespondentSolicitor1Reference' } : {}),
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

type PartyDetails = (typeof partyDetails)['claimant1'];

// A party's details for their type, as the Claimant and Defendant pages ask for them. Only a claimant is asked for a
// date of birth, and a defendant is only asked for a phone number when they are an individual or a sole trader.
function party(type: string, details: PartyDetails, isClaimant: boolean) {
  const dateOfBirth = `${details.DOB_year}-${details.DOB_month}-${details.DOB_day}`;
  const nameAndPhone = (() => {
    switch (type) {
      case claimantDefendantTypes.COMPANY:
        return { companyName: details.companyName };
      case claimantDefendantTypes.ORGANISATION:
        return { organisationName: details.organisationName };
      case claimantDefendantTypes.SOLETRADER:
        return {
          soleTraderTitle: details.title,
          soleTraderFirstName: details.firstName,
          soleTraderLastName: details.lastName,
          soleTraderTradingAs: details.soleTraderTradingAs,
          ...(isClaimant ? { soleTraderDateOfBirth: dateOfBirth } : {}),
          partyPhone: details.phone,
        };
      default:
        return {
          individualTitle: details.title,
          individualFirstName: details.firstName,
          individualLastName: details.lastName,
          ...(isClaimant ? { individualDateOfBirth: dateOfBirth } : {}),
          partyPhone: details.phone,
        };
    }
  })();
  return { type, ...nameAndPhone, partyEmail: details.email, primaryAddress: address(details.address) };
}

// A claimant's litigation friend, who lives at the claimant's address
function litigationFriend(claimantNumber: number, certificateOfSuitability: Record<string, string>) {
  const details = claimantNumber === 1 ? partyDetails.claimant1LitigantFriend : partyDetails.claimant2LitigantFriend;
  return {
    firstName: details.firstname,
    lastName: details.lastname,
    emailAddress: details.email,
    phoneNumber: details.phone,
    hasSameAddressAsLitigant: yesNo.YES,
    certificateOfSuitability: [{ id: randomUUID(), value: { document: certificateOfSuitability } }],
  };
}

// Claimant, Claimant litigation friend, Add another claimant, Second claimant and Second claimant litigation friend
function claimantsData(claimants: ClaimantShape[], certificateOfSuitability?: Record<string, string>) {
  const data: Record<string, any> = { addApplicant2: claimants.length === 2 ? yesNo.YES : yesNo.NO };
  for (const [index, claimant] of claimants.entries()) {
    const number = index + 1;
    data[`applicant${number}`] = party(claimant.type, number === 1 ? partyDetails.claimant1 : partyDetails.claimant2, true);
    data[`applicant${number}LitigationFriendRequired`] = claimant.litigationFriend;
    if (claimant.litigationFriend === yesNo.YES) {
      if (!certificateOfSuitability) {
        throw new Error(`Claimant ${number} has a litigation friend, so a certificate of suitability must be uploaded first`);
      }
      data[`applicant${number}LitigationFriend`] = litigationFriend(number, certificateOfSuitability);
    }
  }
  return data;
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

// Defendant, Legal representation, the defendant's solicitor's pages, Add another defendant, Second defendant and Same
// legal representative. A claim with two claimants is not asked whether there is another defendant.
function defendantsData(claimants: ClaimantShape[], defendants: DefendantShape[]) {
  const data: Record<string, any> = {};
  if (claimants.length === 1) {
    data.addRespondent2 = defendants.length === 2 ? yesNo.YES : yesNo.NO;
  }
  for (const [index, defendant] of defendants.entries()) {
    const number = index + 1;
    data[`respondent${number}`] = party(defendant.type, number === 1 ? partyDetails.defendant1 : partyDetails.defendant2, false);
    data[`respondent${number}Represented`] = defendant.solicitor === 'none' ? yesNo.NO : yesNo.YES;
    // Defendant 2 is only asked whether they have the same solicitor as Defendant 1 when both have one
    if (number === 2 && defendant.solicitor !== 'none' && defendants[0].solicitor !== 'none') {
      data.respondent2SameLegalRepresentative = defendant.solicitor === 'sameAsDefendant1' ? yesNo.YES : yesNo.NO;
    }
    if (defendant.solicitor === 'own') {
      Object.assign(data, defendantSolicitor(number, defendant.organisation.orgId));
    }
  }
  return data;
}

// Defendant solicitor organisation, service address, reference (only asked for Defendant 2 here, Defendant 1's is on
// the References page) and email
function defendantSolicitor(defendantNumber: number, orgId: string) {
  const solicitor = defendantNumber === 1 ? legalRepresentatives.legalRepresentative1 : legalRepresentatives.legalRepresentative2;
  const role = defendantNumber === 1 ? '[RESPONDENTSOLICITORONE]' : '[RESPONDENTSOLICITORTWO]';
  return {
    [`respondent${defendantNumber}OrgRegistered`]: yesNo.YES,
    [`respondent${defendantNumber}OrganisationPolicy`]: {
      OrgPolicyCaseAssignedRole: role,
      Organisation: { OrganisationID: orgId },
    },
    [`respondentSolicitor${defendantNumber}ServiceAddressRequired`]: yesNo.NO,
    ...(defendantNumber === 2 ? { respondentSolicitor2Reference: 'RespondentSolicitor2Reference' } : {}),
    [`respondentSolicitor${defendantNumber}EmailAddress`]: solicitor.email,
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
