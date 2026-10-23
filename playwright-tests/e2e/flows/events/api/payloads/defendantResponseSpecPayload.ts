import claimTypes from '../../../../../enums/claim-types.ts';
import Timeline from '../../../../../enums/timeline.ts';
import Track from '../../../../../enums/track.ts';
import RespondentResponses from '../../../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../../../enums/admissionPaymentRoute.ts';
import { courts } from '../../../../../fixtures/courts.ts';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../../civilConfig.ts';
import { SpecifiedConfig } from '../../../../journey/specified/specifiedConfig.ts';

type Document = Record<string, string>;

// The documents the response uploads: the timeline (when it is uploaded rather than typed in) and the draft directions
// (intermediate and multi track claims)
export interface DefendantResponseSpecDocuments {
  timeline: Document;
  draftDirections: Document;
}

// The amount a defendant who admits part of the claim admits, and their suggested monthly repayment, in pennies (the UI
// enters £1000 and £100)
const partAdmittedPennies = '100000';
const monthlyRepaymentPennies = '10000';

// Who the solicitor answers for and what they answer, which decides the pages and the values the mid event callbacks
// set:
//  - defendantNumber, respondent and suffix: Defendant 1's fields (respondent1, no suffix) unless the solicitor is
//    Defendant 2's own (respondent2, suffix 2). A solicitor representing both defendants answers in Defendant 1's.
//  - own: the response in those fields (a solicitor representing both who gives one each answers Defendant 2's too)
//  - disputes: the response is a full defence or a part admission, which asks why, the timeline and the directions
//    questionnaire; admits: it is a full or part admission, which asks when it will be paid
interface Answering {
  defendantNumber: 1 | 2;
  respondent: string;
  suffix: string;
  own: RespondentResponses;
  sameSolicitorDifferentResponses: boolean;
  disputes: boolean;
  admits: boolean;
}

function answering(c: SpecifiedConfig, defendantNumber: 1 | 2): Answering {
  const own = defendantNumber === 1 ? c.respondent1Response : c.respondent2Response;
  const sameSolicitorDifferentResponses = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL && c.respondent1Response !== c.respondent2Response;
  const responses = sameSolicitorDifferentResponses ? [c.respondent1Response, c.respondent2Response] : [own];
  return {
    defendantNumber,
    respondent: `respondent${defendantNumber}`,
    suffix: defendantNumber === 1 ? '' : '2',
    own,
    sameSolicitorDifferentResponses,
    disputes: responses.some((response) => response === RespondentResponses.FULL_DEFENCE || response === RespondentResponses.PART_ADMISSION),
    admits: own === RespondentResponses.FULL_ADMISSION || own === RespondentResponses.PART_ADMISSION,
  };
}

// The case data for DEFENDANT_RESPONSE_SPEC, as the UI's RespondToClaimSpec submits it for one defendant's solicitor:
// a full defence, a full or part admission, or a counterclaim. startCaseData is the case data CCD returned when the
// event was started, which holds the parties, the copies of them the about to submit callback restores from, and the
// list of courts.
//
// XUI also sends the values the event's mid event callbacks set as the pages are answered (showConditionFlags, the
// generic response type, the claim's track, and so on), which a single API submit does not run, so they are set here as
// those callbacks set them (see civil-service's SetGenericResponseTypeFlag).
export function buildDefendantResponseSpecPayload(
  c: SpecifiedConfig,
  startCaseData: Record<string, any>,
  defendantNumber: 1 | 2,
  documents: DefendantResponseSpecDocuments,
): Record<string, any> {
  const differentResponsesToClaimants = c.claimType === claimTypes.TWO_VS_ONE && c.respondent1Response !== c.respondent2Response;
  if (differentResponsesToClaimants) {
    return responsesToEachClaimant(c, startCaseData, documents);
  }
  const a = answering(c, defendantNumber);
  return {
    ...keptFromStart(c, startCaseData, defendantNumber),
    ...midEventValues(c, startCaseData, a),
    ...confirmAddresses(c, defendantNumber),
    ...responseTypes(c, a),
    ...(a.own === RespondentResponses.FULL_DEFENCE || (a.sameSolicitorDifferentResponses && c.respondent1Response === RespondentResponses.FULL_DEFENCE)
      ? { [`defenceRouteRequired${a.suffix}`]: 'DISPUTES_THE_CLAIM' }
      : {}),
    ...(a.admits ? admission(c, a) : {}),
    ...(a.disputes ? disputedClaim(c, startCaseData, a, documents) : {}),
    ...(counterclaimForDefendant1(a) ? counterclaim(c, startCaseData) : {}),
    uiStatementOfTruth: {
      name: (defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials).name,
      role: 'Solicitor',
    },
  };
}

// A 2v1 defendant giving each claimant a different response. Only a full defence to one of them is supported: the
// pages are then those of a full defence, with each claimant's response given separately, and the mid event callbacks
// leave out the generic response type, the track and the admission flags.
function responsesToEachClaimant(c: SpecifiedConfig, startCaseData: Record<string, any>, documents: DefendantResponseSpecDocuments) {
  if (![c.respondent1Response, c.respondent2Response].includes(RespondentResponses.FULL_DEFENCE)) {
    throw new Error('DEFENDANT_RESPONSE_SPEC through the API only gives 2v1 claimants different responses when one is a full defence; use the UI');
  }
  const asFullDefence = buildDefendantResponseSpecPayload({ ...c, respondent1Response: RespondentResponses.FULL_DEFENCE, respondent2Response: RespondentResponses.FULL_DEFENCE }, startCaseData, 1, documents);
  const leftOut = [
    'respondent1ClaimResponseTypeForSpec', 'respondentClaimResponseTypeForSpecGeneric', 'responseClaimTrack', 'specFullDefenceOrPartAdmission',
    'specFullDefenceOrPartAdmission1V1', 'specPaidLessAmountOrDisputesOrPartAdmission', 'specFullAdmissionOrPartAdmission',
  ];
  const payload: Record<string, any> = Object.fromEntries(Object.entries(asFullDefence).filter(([field]) => !leftOut.includes(field)));
  return {
    ...payload,
    defendantSingleResponseToBothClaimants: 'No',
    claimant1ClaimResponseTypeForSpec: c.respondent1Response,
    claimant2ClaimResponseTypeForSpec: c.respondent2Response,
  };
}

// The parties as they are, the hidden copies of them the about to start callback makes, the solicitor references and
// who the parties are, which XUI sends back with the event. Each defendant's details are only on the page for their own
// solicitor (both for a solicitor representing both defendants). Defendant 2's own solicitor responds after Defendant 1,
// whose response date and answers to the questions both share XUI also sends back.
function keptFromStart(c: SpecifiedConfig, startCaseData: Record<string, any>, defendantNumber: 1 | 2) {
  const answersForDefendant2 = defendantNumber === 2 || c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL;
  const fields = [
    'respondent1Copy', 'respondent2Copy', 'respondent1OrganisationPolicy', 'respondent2OrganisationPolicy',
    'solicitorReferences', 'addApplicant2', 'addRespondent2', 'respondent2SameLegalRepresentative',
    ...(defendantNumber === 1 ? ['respondent1'] : ['respondent1ResponseDate', 'respondent1DQRemoteHearingLRspec', 'respondent1DQVulnerabilityQuestions']),
    ...(answersForDefendant2 ? ['respondent2'] : []),
  ];
  const kept: Record<string, any> = {};
  for (const field of fields) {
    if (startCaseData[field] !== undefined) {
      kept[field] = startCaseData[field];
    }
  }
  return kept;
}

// The response types: one solicitor for both defendants gives one response for both when they are the same and one each
// otherwise, and a 2v1 defendant gives one response to both claimants
function responseTypes(c: SpecifiedConfig, a: Answering) {
  if (c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL) {
    return {
      respondentResponseIsSame: a.sameSolicitorDifferentResponses ? 'No' : 'Yes',
      respondent1ClaimResponseTypeForSpec: c.respondent1Response,
      ...(a.sameSolicitorDifferentResponses ? { respondent2ClaimResponseTypeForSpec: c.respondent2Response } : {}),
    };
  }
  return {
    ...(c.claimType === claimTypes.TWO_VS_ONE ? { defendantSingleResponseToBothClaimants: 'Yes' } : {}),
    [`${a.respondent}ClaimResponseTypeForSpec`]: a.own,
  };
}

// What the mid event callbacks set: who is answering, the flags the following pages are shown by, the generic response
// type, and the claim's track and totals
function midEventValues(c: SpecifiedConfig, startCaseData: Record<string, any>, a: Answering) {
  const sameSolicitor = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL;
  const differentSolicitors = c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL;
  // The responses in the case data once this one is entered: Defendant 2's own solicitor responds after Defendant 1
  const respondent1 = a.defendantNumber === 1 || differentSolicitors ? c.respondent1Response : undefined;
  const respondent2 = a.defendantNumber === 2 || a.sameSolicitorDifferentResponses ? c.respondent2Response : undefined;
  const defendingOrPartAdmitting = (response?: RespondentResponses) =>
    response === RespondentResponses.FULL_DEFENCE || response === RespondentResponses.PART_ADMISSION;
  const fullDefenceResponder = a.own === RespondentResponses.FULL_DEFENCE || (a.sameSolicitorDifferentResponses && c.respondent1Response === RespondentResponses.FULL_DEFENCE);
  const total = Number(startCaseData.totalClaimAmount);
  const flags = multiPartyResponseTypeFlags(c, a, respondent1, respondent2);
  return {
    isRespondent1: a.defendantNumber === 1 ? 'Yes' : 'No',
    isRespondent2: a.defendantNumber === 2 ? 'Yes' : 'No',
    isApplicant1: 'No',
    ...(sameSolicitor || differentSolicitors ? { sameSolicitorSameResponse: sameSolicitor && !a.sameSolicitorDifferentResponses ? 'Yes' : 'No' } : {}),
    showConditionFlags: showConditionFlags(c, a),
    showCarmFields: 'Yes',
    neitherCompanyNorOrganisation: individualDefendant(c) ? 'Yes' : 'No',
    multiPartyResponseTypeFlags: flags,
    // A solicitor giving each defendant a different response is treated as defending if either does
    respondentClaimResponseTypeForSpecGeneric: a.sameSolicitorDifferentResponses && [c.respondent1Response, c.respondent2Response].includes(RespondentResponses.FULL_DEFENCE)
      ? RespondentResponses.FULL_DEFENCE
      : a.sameSolicitorDifferentResponses ? c.respondent1Response : a.own,
    // Defendant 2's own solicitor responds after Defendant 1, whose response the callback copies
    ...(a.defendantNumber === 2 ? { respondent1ClaimResponseTestForSpec: c.respondent1Response } : {}),
    ...(a.defendantNumber === 2 && a.disputes && flags !== 'COUNTER_ADMIT_OR_ADMIT_PART' ? { showHowToAddTimeLinePage: 'Yes' } : {}),
    ...(fullDefenceResponder ? { respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY' } : {}),
    defenceAdmitPartPaymentTimeRouteGeneric: a.admits ? c.admissionPaymentRoute : AdmissionPaymentRoute.IMMEDIATELY,
    specFullDefenceOrPartAdmission: defendingOrPartAdmitting(respondent1) || defendingOrPartAdmitting(respondent2) ? 'Yes' : 'No',
    ...(defendingOrPartAdmitting(respondent1) ? { specFullDefenceOrPartAdmission1V1: 'Yes' } : {}),
    ...(a.disputes ? { specDisputesOrPartAdmission: 'Yes' } : {}),
    ...(counterclaimForDefendant1(a) ? {} : { specPaidLessAmountOrDisputesOrPartAdmission: a.own === RespondentResponses.FULL_ADMISSION ? 'No' : 'Yes' }),
    specFullAdmissionOrPartAdmission: a.admits ? 'Yes' : 'No',
    partAdmittedByEitherRespondents: 'No',
    fullAdmissionAndFullAmountPaid: 'No',
    // Set by the callback on the defence route and admission pages, which Defendant 1's counterclaim does not reach
    ...(counterclaimForDefendant1(a) ? {} : { responseClaimTrack: c.track }),
    totalClaimAmount: String(total),
    totalClaimAmountPlusInterest: String(total),
    totalClaimAmountPlusInterestString: total.toFixed(2),
    totalClaimAmountPlusInterestAdmitPart: String(total),
    totalClaimAmountPlusInterestAdmitPartString: total.toFixed(2),
  };
}

// The response type flag set-generic-response-type-flag ends with: a full defence anywhere makes it FULL_DEFENCE, but
// Defendant 2 admitting or counterclaiming makes it COUNTER_ADMIT_OR_ADMIT_PART. Otherwise a 1v1 full admission or
// counterclaim, a 1v2DS part admission, or one response for both defendants that defends or counterclaims sets it, and
// anything else is NOT_FULL_DEFENCE.
function multiPartyResponseTypeFlags(c: SpecifiedConfig, a: Answering, respondent1?: RespondentResponses, respondent2?: RespondentResponses) {
  const admitsOrCounterclaims = [RespondentResponses.FULL_ADMISSION, RespondentResponses.PART_ADMISSION, RespondentResponses.COUNTER_CLAIM];
  if (respondent2 !== undefined && admitsOrCounterclaims.includes(respondent2)) {
    return 'COUNTER_ADMIT_OR_ADMIT_PART';
  }
  if (respondent1 === RespondentResponses.FULL_DEFENCE || respondent2 === RespondentResponses.FULL_DEFENCE) {
    return 'FULL_DEFENCE';
  }
  if (c.claimType === claimTypes.ONE_VS_ONE || c.claimType === claimTypes.TWO_VS_ONE) {
    if (a.own === RespondentResponses.COUNTER_CLAIM) {
      return 'COUNTER_ADMIT_OR_ADMIT_PART';
    }
    if (a.own === RespondentResponses.FULL_ADMISSION) {
      return 'FULL_ADMISSION';
    }
  }
  if (c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL && a.own === RespondentResponses.PART_ADMISSION) {
    return 'PART_ADMISSION';
  }
  if (c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL && !a.sameSolicitorDifferentResponses && a.own === RespondentResponses.COUNTER_CLAIM) {
    return 'FULL_DEFENCE';
  }
  return 'NOT_FULL_DEFENCE';
}

// Which defendants the solicitor answers for, who disputes the claim and how the timeline is given, and for an admission
// when it will be paid and whether the defendant's finances are asked for
function showConditionFlags(c: SpecifiedConfig, a: Answering): string[] {
  const sameSolicitor = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL;
  const flags = sameSolicitor ? ['CAN_ANSWER_RESPONDENT_1', 'CAN_ANSWER_RESPONDENT_2'] : [`CAN_ANSWER_RESPONDENT_${a.defendantNumber}`];
  const timelineFlag = c.timeline === Timeline.UPLOAD ? 'TIMELINE_UPLOAD' : 'TIMELINE_MANUALLY';
  if (counterclaimForDefendant1(a)) {
    flags.push(timelineFlag);
  }
  if (a.disputes) {
    flags.push('SOMEONE_DISPUTES', timelineFlag);
    flags.push(sameSolicitor ? 'BOTH_RESPONDENTS_DISPUTE' : `ONLY_RESPONDENT_${a.defendantNumber}_DISPUTES`);
  }
  // A full admission skips the amount admitted screen
  if (a.own !== RespondentResponses.FULL_ADMISSION) {
    flags.push('SHOW_ADMITTED_AMOUNT_SCREEN');
  }
  if (a.admits) {
    flags.push('CURRENT_ADMITS_PART_OR_FULL', 'WHEN_WILL_CLAIM_BE_PAID');
    flags.push(...(sameSolicitor ? ['RESPONDENT_1_ADMITS_PART_OR_FULL', 'RESPONDENT_2_ADMITS_PART_OR_FULL'] : [`RESPONDENT_${a.defendantNumber}_ADMITS_PART_OR_FULL`]));
    if (c.admissionPaymentRoute !== AdmissionPaymentRoute.IMMEDIATELY) {
      flags.push(`WHY_${a.defendantNumber}_DOES_NOT_PAY_IMMEDIATELY`);
      if (individualDefendant(c)) {
        flags.push(`NEED_FINANCIAL_DETAILS_${a.defendantNumber}`);
      }
      if (a.defendantNumber === 2 && c.admissionPaymentRoute === AdmissionPaymentRoute.SUGGESTION_OF_REPAYMENT_PLAN) {
        flags.push('REPAYMENT_PLAN_2');
      }
    }
  }
  return flags;
}

// A counterclaim by Defendant 1's solicitor still shows the pages asked of anyone who can answer for Defendant 1: how
// the timeline would be added, language, court, hearing support and vulnerability (Defendant 2's own solicitor
// counterclaiming goes straight to the statement of truth)
function counterclaimForDefendant1(a: Answering) {
  return a.own === RespondentResponses.COUNTER_CLAIM && a.defendantNumber === 1;
}

function counterclaim(c: SpecifiedConfig, startCaseData: Record<string, any>) {
  return {
    specClaimResponseTimelineList: c.timeline === Timeline.UPLOAD ? 'UPLOAD' : 'MANUAL',
    respondent1DQLanguage: { court: 'ENGLISH', documents: 'ENGLISH' },
    ...requestedCourt(startCaseData, 1),
    respondent1DQHearingSupport: { supportRequirements: 'No', requirements: [] },
    respondent1DQVulnerabilityQuestions: { vulnerabilityAdjustmentsRequired: 'No' },
  };
}

// An individual or sole trader gives their finances when not paying what they admit immediately
function individualDefendant(c: SpecifiedConfig) {
  return !['COMPANY', 'ORGANISATION'].includes(c.defendantType);
}

// A full or part admission: nothing has been paid yet, the amount admitted (part admission), and when it will be paid.
// Paying later, the defendant says why, gives the date or a repayment plan, and as an individual or sole trader gives
// their finances: retired, owns their home, and no partner, children, dependants, debts or court orders.
function admission(c: SpecifiedConfig, a: Answering) {
  const { defendantNumber, respondent, suffix } = a;
  const partAdmission = a.own === RespondentResponses.PART_ADMISSION;
  const route = c.admissionPaymentRoute;
  const inAMonth = new Date();
  inAMonth.setMonth(inAMonth.getMonth() + 1);
  const inAMonthDate = inAMonth.toISOString().slice(0, 10);
  const individual = individualDefendant(c);
  return {
    ...(partAdmission
      ? {
        [defendantNumber === 1 ? 'specDefenceAdmittedRequired' : 'specDefenceAdmitted2Required']: 'No',
        [`respondToAdmittedClaimOwingAmount${suffix}`]: partAdmittedPennies,
        respondToAdmittedClaimOwingAmountPounds: '1000.00',
        ...(defendantNumber === 2 ? { respondToAdmittedClaimOwingAmountPounds2: '1000.00', specPartAdmitPaid: 'No' } : {}),
      }
      : {}),
    [`defenceAdmitPartPaymentTimeRouteRequired${suffix}`]: route,
    ...(route === AdmissionPaymentRoute.BY_SET_DATE ? { [`respondToClaimAdmitPartLRspec${suffix}`]: { whenWillThisAmountBePaid: inAMonthDate } } : {}),
    ...(route !== AdmissionPaymentRoute.IMMEDIATELY ? { [`responseToClaimAdmitPartWhyNotPayLRspec${suffix}`]: 'The defendant cannot pay all of it now.' } : {}),
    ...(route === AdmissionPaymentRoute.SUGGESTION_OF_REPAYMENT_PLAN
      ? { [`${respondent}RepaymentPlan`]: { paymentAmount: monthlyRepaymentPennies, repaymentFrequency: 'ONCE_ONE_MONTH', firstRepaymentDate: inAMonthDate } }
      : {}),
    ...(route !== AdmissionPaymentRoute.IMMEDIATELY && individual ? finances(a) : {}),
  };
}

// The defendant's finances (an individual or sole trader not paying immediately)
function finances(a: Answering) {
  const { defendantNumber, respondent } = a;
  const defendant2 = defendantNumber === 2;
  // The empty answers are the ones XUI sends for the questions a retired defendant with no children is not asked
  const unemployed = { unemployedComplexTypeRequired: 'RETIRED', lengthOfUnemployment: {} };
  // Defendant 1 admitting all of the claim answers the full admission version of the income and expenses page
  const fullAdmission = !defendant2 && a.own === RespondentResponses.FULL_ADMISSION;
  return {
    [`${respondent}BankAccountList`]: [],
    [defendant2 ? 'disabilityPremiumPaymentsRespondent2' : 'disabilityPremiumPayments']: 'No',
    [`${respondent}DQHomeDetails`]: { type: 'OWNED_HOME' },
    [`${respondent}PartnerAndDependent`]: { liveWithPartnerRequired: 'No', haveAnyChildrenRequired: 'No', howManyChildrenByAgeGroup: {}, supportedAnyoneFinancialRequired: 'No' },
    [defendant2 ? 'defenceAdmitPartEmploymentTypeRequiredRespondent2' : 'defenceAdmitPartEmploymentTypeRequired']: 'No',
    [defendant2 ? 'respondToClaimAdmitPartUnemployedLRspecRespondent2' : 'respondToClaimAdmitPartUnemployedLRspec']: unemployed,
    [`${respondent}CourtOrderPaymentOption`]: 'No',
    [`${respondent}LoanCreditOption`]: 'No',
    ...(fullAdmission
      ? { respondent1DQCarerAllowanceCreditFullAdmission: 'No', respondent1DQRecurringIncomeFA: [], respondent1DQRecurringExpensesFA: [] }
      : { [`${respondent}DQCarerAllowanceCredit`]: 'No', [`${respondent}DQRecurringIncome`]: [], [`${respondent}DQRecurringExpenses`]: [] }),
  };
}

// A full defence or part admission: why the defendant disputes the claim, their timeline, and the directions
// questionnaire, in Defendant 1's fields for a solicitor representing both defendants
function disputedClaim(c: SpecifiedConfig, startCaseData: Record<string, any>, a: Answering, documents: DefendantResponseSpecDocuments) {
  const { defendantNumber, respondent, suffix } = a;
  return {
    [`detailsOfWhyDoesYouDisputeTheClaim${suffix}`]: `Defendant ${defendantNumber} disputes the claim.`,
    ...timeline(c, defendantNumber, documents.timeline),
    ...(c.track === Track.SMALL
      ? smallClaimDirectionsQuestionnaire(defendantNumber)
      : directionsQuestionnaire(c, defendantNumber, documents.draftDirections)),
    [`${respondent}DQLanguage`]: { court: 'ENGLISH', documents: 'ENGLISH' },
    ...requestedCourt(startCaseData, defendantNumber),
    [`${respondent}DQHearingSupport`]: { supportRequirements: 'No', requirements: [] },
    [`${respondent}DQVulnerabilityQuestions`]: { vulnerabilityAdjustmentsRequired: 'No' },
  };
}

// Confirm name and address, and confirm details: the addresses the claimant gave, and the solicitor's, are correct
function confirmAddresses(c: SpecifiedConfig, defendantNumber: 1 | 2) {
  if (defendantNumber === 2) {
    return { specAoSRespondent2HomeAddressRequired: 'Yes', specAoSRespondent2CorrespondenceAddressRequired: 'Yes' };
  }
  return {
    specAoSApplicantCorrespondenceAddressRequired: 'Yes',
    specAoSRespondentCorrespondenceAddressRequired: 'Yes',
    // One solicitor for both defendants confirms Defendant 2's address too
    ...(c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL ? { specAoSRespondent2HomeAddressRequired: 'Yes' } : {}),
  };
}

// The defendant's timeline of events, typed in (one event a month ago) or uploaded, as the claim's was
function timeline(c: SpecifiedConfig, defendantNumber: 1 | 2, document: Document) {
  const suffix = defendantNumber === 1 ? '' : '2';
  if (c.timeline === Timeline.UPLOAD) {
    return {
      [`specClaimResponseTimelineList${suffix}`]: 'UPLOAD',
      [defendantNumber === 1 ? 'specResponseTimelineDocumentFiles' : 'specResponsTimelineDocumentFiles2']: document,
    };
  }
  const monthAgo = new Date();
  monthAgo.setMonth(monthAgo.getMonth() - 1);
  return {
    [`specClaimResponseTimelineList${suffix}`]: 'MANUAL',
    [`specResponseTimelineOfEvents${suffix}`]: [
      { value: { timelineDate: monthAgo.toISOString().slice(0, 10), timelineDescription: `Defendant ${defendantNumber}'s account of what happened.` } },
    ],
  };
}

// Small claims: mediation contact details and availability (CARM), and the small claims directions questionnaire
function smallClaimDirectionsQuestionnaire(defendantNumber: 1 | 2) {
  const respondent = `respondent${defendantNumber}`;
  const suffix = defendantNumber === 1 ? '' : '2';
  return {
    [`resp${defendantNumber}MediationContactInfo`]: {
      firstName: 'Mediation',
      lastName: `Contact${defendantNumber}`,
      emailAddress: `defendant${defendantNumber}.mediation@example.com`,
      telephoneNumber: '07700900000',
    },
    [`resp${defendantNumber}MediationAvailability`]: { isMediationUnavailablityExists: 'No', unavailableDatesForMediation: [] },
    [`deterWithoutHearingRespondent${defendantNumber}`]: { deterWithoutHearingYesNo: 'Yes' },
    [`responseClaimExpertSpecRequired${suffix}`]: 'No',
    [`${respondent}DQWitnessesSmallClaim`]: { witnessesToAppear: 'No', details: [] },
    [`${respondent}DQHearingSmallClaim`]: { unavailableDatesRequired: 'No', smallClaimUnavailableDate: [] },
    [`SmallClaimHearingInterpreter${suffix}Required`]: 'No',
  };
}

// Fast, intermediate and multi track directions questionnaire
function directionsQuestionnaire(c: SpecifiedConfig, defendantNumber: 1 | 2, draftDirections: Document) {
  const respondent = `respondent${defendantNumber}`;
  const spec = `specRespondent${defendantNumber}`;
  const fixedRecoverableCosts = { isSubjectToFixedRecoverableCostRegime: 'No', reasons: 'Not subject to fixed recoverable costs.' };
  return {
    [`${respondent}DQFileDirectionsQuestionnaire`]: { explainedToClient: ['CONFIRM'], oneMonthStayRequested: 'No', reactionProtocolCompliedWith: 'Yes' },
    ...(c.track === Track.FAST ? { [`${respondent}DQFixedRecoverableCosts`]: fixedRecoverableCosts } : {}),
    ...(c.track === Track.INTERMEDIATE ? { [`${respondent}DQFixedRecoverableCostsIntermediate`]: fixedRecoverableCosts } : {}),
    [`${spec}DQDisclosureOfElectronicDocuments`]: { reachedAgreement: 'Yes' },
    [`${spec}DQDisclosureOfNonElectronicDocuments`]: { bespokeDirections: 'No bespoke directions needed.' },
    [`${respondent}DQDisclosureReport`]: { disclosureFormFiledAndServed: 'Yes', disclosureProposalAgreed: 'Yes', draftOrderNumber: '123' },
    [`${respondent}DQExperts`]: { expertRequired: 'No', details: [] },
    // Defendant 1's witnesses are a yes or no and a list; Defendant 2's own solicitor answers the shared witnesses field
    ...(defendantNumber === 1
      ? { respondent1DQWitnessesRequiredSpec: 'No' }
      : { respondent2DQWitnesses: { witnessesToAppear: 'No', details: [] } }),
    [`${respondent}DQHearingFastClaim`]: { unavailableDatesRequired: 'No', unavailableDates: [] },
    ...(c.track === Track.INTERMEDIATE || c.track === Track.MULTI ? { [`${respondent}DQDraftDirections`]: draftDirections } : {}),
    [`${respondent}DQFutureApplications`]: { intentionToMakeFutureApplications: 'No' },
  };
}

// The preferred court, chosen from the list the about to start callback fills in, and no remote hearing
function requestedCourt(startCaseData: Record<string, any>, defendantNumber: 1 | 2) {
  const field = defendantNumber === 1 ? 'respondToCourtLocation' : 'respondToCourtLocation2';
  const list = startCaseData[field]?.responseCourtLocations ?? startCaseData.respondToCourtLocation?.responseCourtLocations;
  const court = list?.list_items?.find((item: { label: string }) => item.label === courts.clerkenwell.longAddress);
  if (!court) {
    throw new Error(`DEFENDANT_RESPONSE_SPEC was started without ${courts.clerkenwell.longAddress} in the court list (${field})`);
  }
  return {
    [field]: {
      responseCourtLocations: { value: court, list_items: list.list_items },
      reasonForHearingAtSpecificCourt: 'Nearest court to the defendant.',
    },
    [`respondent${defendantNumber}DQRemoteHearingLRspec`]: { remoteHearingRequested: 'No' },
  };
}
