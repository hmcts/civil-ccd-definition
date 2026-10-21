import moment from 'moment/moment';
import yesNo from '../../../../../enums/yesNo.ts';
import Timeline from '../../../../../enums/timeline.ts';
import { partyDetails } from '../../../../../fixtures/partyDetails.ts';
import { legalRepresentatives } from '../../../../../fixtures/legalRepresentatives.ts';
import { claimantSolicitorCredentials } from '../../../../../civilConfig.ts';
import { Fee } from '../../../../../helpers/FeesHelper.ts';
import { ClaimantShape, DefendantShape } from '../../../createClaimShape.ts';
import { specClaimAmountInPounds, specClaimText } from '../../../createSpecifiedCase.ts';
import { InterestType, SpecifiedConfig } from '../../../../journey/specified/specifiedConfig.ts';
import { party } from './createClaimPayload.ts';

// The case data for CREATE_CLAIM_SPEC, as XUI submits it after every page of the event has been filled in the way
// createSpecifiedCase.ts fills them (taken from the body XUI sends). startCaseData is the case data CCD returned when
// the event was started. The parties follow the claim's shape (createClaimShape.ts), as they do in the UI.
//
// Some pages' mid event callbacks work out values in the UI: the totals, the claim fee and the list of airlines. They
// are not run, so the payload sets those values itself. What has to be looked up or uploaded first is passed in.
export interface CreateClaimSpecLookups {
  claimFee: Fee;
  timelineDocument?: Record<string, string>;
}

// The interest the claim includes when it is submitted, in pounds. A broken down total is entered as it is. Interest
// at a rate is claimed from the date the claim is submitted, so none has built up yet.
export function specInterestInPounds(c: SpecifiedConfig): number {
  return c.interestRequired === yesNo.YES && c.interestType === InterestType.BREAK_DOWN ? Number(c.interestRate) : 0;
}

export function buildCreateClaimSpecPayload(
  c: SpecifiedConfig,
  startCaseData: Record<string, any>,
  lookups: CreateClaimSpecLookups,
): Record<string, any> {
  const { claimants, defendants } = c.claimShape;

  return {
    ...startCaseData,
    ...references(defendants[0]),
    ...claimantsData(claimants),
    ...claimantSolicitor(),
    ...defendantsData(claimants, defendants),
    ...flightDelay(c),
    detailsOfClaim: specClaimText.details,
    ...timeline(c, lookups),
    ...evidence(),
    ...claimAmount(c, lookups),
    ...interest(c),
    ...fixedCommencementCosts(c),
    ...statementOfTruth(),
  };
}

// References. Defendant 1's solicitor's reference is only given when they have their own solicitor.
function references(defendant1: DefendantShape) {
  return {
    CaseAccessCategory: 'SPEC_CLAIM',
    solicitorReferences: {
      applicantSolicitor1Reference: specClaimText.reference,
      ...(defendant1.solicitor === 'own' ? { respondentSolicitor1Reference: specClaimText.respondent1Reference } : {}),
    },
  };
}

// Claimant, Add another claimant and Second claimant
function claimantsData(claimants: ClaimantShape[]) {
  return {
    applicant1: party(claimants[0].type, partyDetails.claimant1, true),
    addApplicant2: claimants.length === 2 ? yesNo.YES : yesNo.NO,
    ...(claimants.length === 2 ? { applicant2: party(claimants[1].type, partyDetails.claimant2, true) } : {}),
  };
}

// Notifications, Claimant solicitor organisation and the claimant solicitor's correspondence address
function claimantSolicitor() {
  return {
    applicantSolicitor1CheckEmail: { email: claimantSolicitorCredentials.username, correct: yesNo.YES },
    applicant1OrganisationPolicy: {
      OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
      Organisation: { OrganisationID: claimantSolicitorCredentials.orgId },
    },
    specApplicantCorrespondenceAddressRequired: yesNo.NO,
  };
}

// Defendant, Legal representation and the defendant's solicitor's pages, then Add another defendant (only asked when
// there is one claimant), Second defendant, its legal representation, Same legal representative (only asked when both
// defendants have a solicitor) and the second defendant's solicitor's pages
function defendantsData(claimants: ClaimantShape[], defendants: DefendantShape[]) {
  const data: Record<string, any> = {};
  if (claimants.length === 1) {
    data.addRespondent2 = defendants.length === 2 ? yesNo.YES : yesNo.NO;
  }
  for (const [index, defendant] of defendants.entries()) {
    const number = index + 1;
    data[`respondent${number}`] = party(defendant.type, number === 1 ? partyDetails.defendant1 : partyDetails.defendant2, false);
    data[`specRespondent${number}Represented`] = defendant.solicitor === 'none' ? yesNo.NO : yesNo.YES;
    if (number === 2 && defendant.solicitor !== 'none' && defendants[0].solicitor !== 'none') {
      data.respondent2SameLegalRepresentative = defendant.solicitor === 'sameAsDefendant1' ? yesNo.YES : yesNo.NO;
    }
    if (defendant.solicitor === 'own') {
      Object.assign(data, defendantSolicitor(number, defendant.organisation.orgId));
    }
  }
  return data;
}

// The defendant's solicitor's organisation (registered with HMCTS), email and correspondence address
function defendantSolicitor(defendantNumber: number, orgId: string) {
  const solicitor = defendantNumber === 1 ? legalRepresentatives.legalRepresentative1 : legalRepresentatives.legalRepresentative2;
  const first = defendantNumber === 1;
  return {
    [`respondent${defendantNumber}OrgRegistered`]: yesNo.YES,
    [`respondent${defendantNumber}OrganisationPolicy`]: {
      OrgPolicyCaseAssignedRole: first ? '[RESPONDENTSOLICITORONE]' : '[RESPONDENTSOLICITORTWO]',
      Organisation: { OrganisationID: orgId },
    },
    [`respondentSolicitor${defendantNumber}EmailAddress`]: solicitor.email,
    [first ? 'specRespondentCorrespondenceAddressRequired' : 'specRespondent2CorrespondenceAddressRequired']: yesNo.NO,
  };
}

// Whether the claim is for a delayed flight, and if so its airline, flight number and date. The list of airlines is
// made by the page's mid event callback, which is not run, so the list holds only the chosen airline.
function flightDelay(c: SpecifiedConfig) {
  if (c.airlineClaim === yesNo.NO) {
    return { isFlightDelayClaim: yesNo.NO };
  }
  const jet2 = { code: 'Jet2.com', label: 'Jet2.com' };
  return {
    isFlightDelayClaim: yesNo.YES,
    flightDelayDetails: {
      airlineList: { list_items: [jet2], value: jet2 },
      flightNumber: 'ABC1234',
      scheduledDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    },
  };
}

// Whether the timeline is typed in or uploaded, then the timeline itself
function timeline(c: SpecifiedConfig, lookups: CreateClaimSpecLookups) {
  if (c.timeline === Timeline.UPLOAD) {
    if (!lookups.timelineDocument) {
      throw new Error('The timeline is uploaded, so a document must be uploaded first');
    }
    return { specClaimTimelineList: Timeline.UPLOAD, specClaimTemplateDocumentFiles: lookups.timelineDocument };
  }
  return {
    specClaimTimelineList: Timeline.MANUAL,
    timelineOfEvents: [{
      value: {
        timelineDate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        timelineDescription: specClaimText.timeline,
      },
    }],
  };
}

function evidence() {
  return {
    speclistYourEvidenceList: [{
      value: { evidenceType: 'STATEMENT_OF_ACCOUNT', statementOfTruthEvidence: specClaimText.evidence },
    }],
  };
}

// The amount claimed, its total and the claim fee. The breakdown's amount is in pence, the total in pounds.
function claimAmount(c: SpecifiedConfig, lookups: CreateClaimSpecLookups) {
  const amountInPounds = specClaimAmountInPounds(c.track);
  return {
    claimAmountBreakup: [{
      value: { claimReason: specClaimText.amountReason, claimAmount: String(amountInPounds * 100) },
    }],
    totalClaimAmount: String(amountInPounds),
    claimFee: lookups.claimFee,
  };
}

// Whether interest is claimed, and if it is, how it is worked out and that it is claimed from the date the claim is
// submitted (so the claim is not asked until when)
function interest(c: SpecifiedConfig) {
  if (c.interestRequired === yesNo.NO) {
    return { claimInterest: yesNo.NO, totalInterest: '0' };
  }
  const howWorkedOut = c.interestType === InterestType.SAME_RATE
    ? {
      sameRateInterestSelection: c.interestRate === '8'
        ? { sameRateInterestType: 'SAME_RATE_INTEREST_8_PC' }
        : {
          sameRateInterestType: 'SAME_RATE_INTEREST_DIFFERENT_RATE',
          differentRate: c.interestRate,
          differentRateReason: specClaimText.interestRateReason,
        },
    }
    : { breakDownInterestTotal: c.interestRate, breakDownInterestDescription: specClaimText.interestBreakdown };
  return {
    claimInterest: yesNo.YES,
    interestClaimOptions: c.interestType,
    ...howWorkedOut,
    interestClaimFrom: 'FROM_CLAIM_SUBMIT_DATE',
    totalInterest: String(specInterestInPounds(c)),
  };
}

// Fixed commencement costs, in pence
function fixedCommencementCosts(c: SpecifiedConfig) {
  return {
    fixedCosts: {
      claimFixedCosts: c.fixedCommencementCosts,
      ...(c.fixedCommencementCosts === yesNo.YES ? { fixedCostAmount: String(specClaimText.fixedCommencementCostsInPounds * 100) } : {}),
    },
  };
}

function statementOfTruth() {
  const solicitor = legalRepresentatives.legalRepresentative1;
  return {
    uiStatementOfTruth: {
      name: `${solicitor.firstName} ${solicitor.lastName}`,
      role: solicitor.role,
    },
  };
}
