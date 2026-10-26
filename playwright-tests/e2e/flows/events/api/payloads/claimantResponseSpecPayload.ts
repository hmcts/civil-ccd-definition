import claimTypes from '../../../../../enums/claim-types.ts';
import Track from '../../../../../enums/track.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import RespondentResponses from '../../../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../../../enums/admissionPaymentRoute.ts';
import ClaimantSuggestedPayment from '../../../../../enums/claimantSuggestedPayment.ts';
import { courts } from '../../../../../fixtures/courts.ts';
import { claimantSolicitorCredentials } from '../../../../../civilConfig.ts';
import { SpecifiedConfig } from '../../../../journey/specified/specifiedConfig.ts';

type Document = Record<string, string>;

// The documents the claimant's response uploads: the response to the defence (when the directions questionnaire is
// asked for, and on the page a full admission paid immediately shows), and the draft directions (intermediate and multi
// track defences)
export interface ClaimantResponseSpecDocuments {
  defenceResponse: Document;
  draftDirections: Document;
}

// The fields the about to start callback fills in that XUI sends back with the event: the parties, the defendants'
// responses and the flags the event's pages are shown by. Empty ones are left out.
const keptFromStart = [
  'applicant1', 'applicant2', 'respondent1', 'respondent2', 'showCarmFields', 'claimantResponseScenarioFlag', 'featureToggleWA',
  'respondent1ClaimResponseDocumentSpec', 'respondent1GeneratedResponseDocument', 'respondent2GeneratedResponseDocument',
  'respondent1PaymentDateToStringSpec', 'responseClaimTrack', 'defenceRouteRequired', 'respondentResponseIsSame',
  'defendantSingleResponseToBothClaimants', 'respondent1ClaimResponseTypeForSpec', 'defenceAdmitPartPaymentTimeRouteRequired',
  'respondToAdmittedClaimOwingAmountPounds', 'showResponseOneVOneFlag', 'claimInterest',
  'respondent1DQLanguage', 'respondent2DQLanguage', 'respondent1DQHearingSupport', 'respondent2DQHearingSupport',
  'respondent1DQVulnerabilityQuestions', 'respondent2DQVulnerabilityQuestions',
];

// Which of the event's pages the claimant's answers lead to, as the mid event callback (set-applicant-route-flags) and
// the page show conditions decide them
export function claimantResponsePages(c: SpecifiedConfig) {
  const answers = c.claimantResponse;
  // Every response is the same once the claim waits for the claimant
  const response = c.respondent1Response;
  const fullDefence = response === RespondentResponses.FULL_DEFENCE;
  const oneVOneAdmission = c.claimType === claimTypes.ONE_VS_ONE && !fullDefence;
  const twoVOne = c.claimType === claimTypes.TWO_VS_ONE;
  const paidImmediately = c.admissionPaymentRoute === AdmissionPaymentRoute.IMMEDIATELY;
  // After a 1v1 admission the claimant is asked about the amount and the plan instead of whether they proceed
  const proceeds = !oneVOneAdmission && answers.proceed === yesNo.YES;
  const rejectsAmount = oneVOneAdmission && response === RespondentResponses.PART_ADMISSION && answers.acceptsAmount === yesNo.NO;
  // A full admission paid immediately only shows when the defendant will pay
  const fullAdmissionPaidImmediately = oneVOneAdmission && response === RespondentResponses.FULL_ADMISSION && paidImmediately;
  const planAsked = oneVOneAdmission && !paidImmediately && !rejectsAmount;
  return {
    oneVOneAdmission,
    proceeds,
    rejectsAmount,
    fullAdmissionPaidImmediately,
    planAsked,
    acceptsPlan: planAsked && answers.acceptsPlan === yesNo.YES,
    rejectsPlan: planAsked && answers.acceptsPlan === yesNo.NO,
    // The response document and directions questionnaire: a defence the claimant proceeds with, or an admitted amount
    // they reject
    directionsQuestionnaire: (fullDefence && proceeds) || rejectsAmount,
    vulnerability: (fullDefence && proceeds) || (twoVOne && proceeds) || rejectsAmount,
  };
}

// The case data for CLAIMANT_RESPONSE_SPEC, as the UI's RespondToDefenceSpec submits it, after a full defence or an
// admission. startCaseData is the case data CCD returned when the event was started.
//
// XUI also sends what the first page's mid event callback (set-applicant-route-flags) sets: whether the response
// document and directions questionnaire are asked for, and the VULNERABILITY show condition flag, which asks the
// vulnerability question. Not proceeding, or accepting an admission, goes straight to the statement of truth.
export function buildClaimantResponseSpecPayload(
  c: SpecifiedConfig,
  startCaseData: Record<string, any>,
  documents: ClaimantResponseSpecDocuments,
): Record<string, any> {
  const pages = claimantResponsePages(c);
  const statementOfTruth = { uiStatementOfTruth: { name: claimantSolicitorCredentials.name, role: 'Solicitor' } };
  if (pages.fullAdmissionPaidImmediately) {
    return {
      applicant1DefenceResponseDocumentSpec: { file: documents.defenceResponse },
      whenToBePaidText: startCaseData.whenToBePaidText,
      ...statementOfTruth,
    };
  }
  const kept: Record<string, any> = {};
  for (const field of keptFromStart) {
    if (startCaseData[field] !== undefined && startCaseData[field] !== null) {
      kept[field] = startCaseData[field];
    }
  }
  const showConditionFlags: string[] = [...(startCaseData.showConditionFlags ?? [])];
  if (pages.vulnerability && !showConditionFlags.includes('VULNERABILITY')) {
    showConditionFlags.push('VULNERABILITY');
  }
  const twoVOne = c.claimType === claimTypes.TWO_VS_ONE;
  return {
    ...kept,
    showConditionFlags,
    // A 2v1 claim asks whether both claimants proceed in its own field
    ...(pages.oneVOneAdmission
      ? admissionAnswers(c, startCaseData, pages)
      : { [twoVOne ? 'applicant1ProceedWithClaimSpec2v1' : 'applicant1ProceedWithClaim']: c.claimantResponse.proceed }),
    applicantDefenceResponseDocumentAndDQFlag: pages.directionsQuestionnaire ? yesNo.YES : yesNo.NO,
    ...(pages.directionsQuestionnaire
      ? {
        applicant1DefenceResponseDocumentSpec: { file: documents.defenceResponse },
        ...(c.track === Track.SMALL
          ? smallClaimDirectionsQuestionnaire(c)
          : directionsQuestionnaire(c, documents.draftDirections, c.respondent1Response === RespondentResponses.FULL_DEFENCE)),
        applicant1DQLanguage: { court: 'ENGLISH', documents: 'ENGLISH' },
        ...requestedCourt(startCaseData),
        applicant1DQHearingSupport: { supportRequirements: 'No', requirements: [] },
      }
      : pages.proceeds ? admissionProceedPages(c) : {}),
    ...(pages.vulnerability ? { applicant1DQVulnerabilityQuestions: { vulnerabilityAdjustmentsRequired: 'No' } } : {}),
    ...statementOfTruth,
  };
}

// The pages a claimant proceeding after a 2v1 or 1v2SS admission is shown: the fixed recoverable costs question, and for
// a small claim the mediation contact details and availability (CARM) and determination without a hearing (not 2v1,
// whose proceed answer is in a field of its own)
function admissionProceedPages(c: SpecifiedConfig) {
  const fixedRecoverableCosts = { isSubjectToFixedRecoverableCostRegime: 'No', reasons: 'Not subject to fixed recoverable costs.' };
  const twoVOne = c.claimType === claimTypes.TWO_VS_ONE;
  const small = smallClaimDirectionsQuestionnaire(c);
  return {
    ...(c.track === Track.FAST ? { applicant1DQFixedRecoverableCosts: fixedRecoverableCosts } : {}),
    ...(c.track === Track.INTERMEDIATE && !twoVOne ? { applicant1DQFixedRecoverableCostsIntermediate: fixedRecoverableCosts } : {}),
    ...(c.track === Track.SMALL && !twoVOne
      ? { app1MediationContactInfo: small.app1MediationContactInfo, app1MediationAvailability: small.app1MediationAvailability, deterWithoutHearing: small.deterWithoutHearing }
      : {}),
  };
}

// A 1v1 claimant's answers to an admission: whether they accept the amount (part admission) and the date or plan;
// rejecting the plan, how they suggest the defendant pays (a date a month away, or £100 a month starting in two months);
// accepting it, the judgment they ask for
function admissionAnswers(c: SpecifiedConfig, startCaseData: Record<string, any>, pages: ReturnType<typeof claimantResponsePages>) {
  const answers = c.claimantResponse;
  const partAdmission = c.respondent1Response === RespondentResponses.PART_ADMISSION;
  const date = (months: number) => {
    const day = new Date();
    day.setMonth(day.getMonth() + months);
    return day.toISOString().slice(0, 10);
  };
  return {
    ...(partAdmission ? { applicant1AcceptAdmitAmountPaidSpec: answers.acceptsAmount } : {}),
    ...(pages.planAsked ? { [partAdmission ? 'applicant1AcceptPartAdmitPaymentPlanSpec' : 'applicant1AcceptFullAdmitPaymentPlanSpec']: answers.acceptsPlan } : {}),
    ...(pages.rejectsPlan
      ? {
        applicant1RepaymentOptionForDefendantSpec: answers.suggestedPayment,
        ...(answers.suggestedPayment === ClaimantSuggestedPayment.SET_DATE
          ? { applicant1RequestedPaymentDateForDefendantSpec: { paymentSetDate: date(1) } }
          : {}),
        ...(answers.suggestedPayment === ClaimantSuggestedPayment.REPAYMENT_PLAN
          ? {
            applicant1SuggestInstalmentsPaymentAmountForDefendantSpec: '10000',
            applicant1SuggestInstalmentsRepaymentFrequencyForDefendantSpec: 'ONCE_ONE_MONTH',
            applicant1SuggestInstalmentsFirstRepaymentDateForDefendantSpec: date(2),
          }
          : {}),
      }
      : {}),
    ...(pages.acceptsPlan ? judgmentSummary(c, startCaseData) : {}),
  };
}

// The judgment by admission the claimant asks for on accepting the date or plan, as the mid event callback
// (validate-amount-paid) works it out: nothing paid yet, no interest or fixed costs, and the claim fee added to the
// claim amount (a full admission) or the amount admitted (a part admission). civil-service's judgment is made from it.
function judgmentSummary(c: SpecifiedConfig, startCaseData: Record<string, any>) {
  if (c.interestRequired === yesNo.YES || c.fixedCommencementCosts === yesNo.YES) {
    throw new Error('CLAIMANT_RESPONSE_SPEC through the API only asks for judgment without interest or fixed costs; use the UI');
  }
  const amount = c.respondent1Response === RespondentResponses.PART_ADMISSION
    ? Number(startCaseData.respondToAdmittedClaimOwingAmountPounds)
    : Number(startCaseData.totalClaimAmount);
  const fee = startCaseData.outstandingFeeInPounds !== undefined && startCaseData.outstandingFeeInPounds !== null
    ? Number(startCaseData.outstandingFeeInPounds)
    : Number(startCaseData.claimFee.calculatedAmountInPence) / 100;
  const total = (amount + fee).toFixed(2);
  return {
    ccjPaymentPaidSomeOption: 'No',
    ccjJudgmentAmountShowInterest: 'No',
    ccjJudgmentAmountClaimAmount: amount.toFixed(2),
    ccjJudgmentAmountClaimFee: fee.toFixed(2),
    ccjJudgmentAmountInterestToDate: '0',
    ccjJudgmentFixedCostAmount: '0',
    ccjJudgmentSummarySubtotalAmount: total,
    ccjPaymentPaidSomeAmountInPounds: '0',
    ccjJudgmentTotalStillOwed: total,
    // civil-service words it one way for a full admission and another for a part admission
    ccjJudgmentStatement: c.respondent1Response === RespondentResponses.PART_ADMISSION
      ? `The judgment will order the defendant to pay £${total} , including the claim fee and interest, if applicable, as shown:`
      : `The judgment will order the defendant to pay £${total}, including the claim fee, any fixed costs if claimed and interest if applicable, as shown:`,
  };
}

// Small claims: mediation contact details and availability (CARM), and the small claims directions questionnaire. Only
// the claimant gives evidence.
function smallClaimDirectionsQuestionnaire(c: SpecifiedConfig) {
  return {
    app1MediationContactInfo: {
      firstName: 'Mediation',
      lastName: 'Claimant',
      emailAddress: 'claimant.mediation@example.com',
      telephoneNumber: '07700900000',
    },
    app1MediationAvailability: { isMediationUnavailablityExists: 'No', unavailableDatesForMediation: [] },
    deterWithoutHearing: { deterWithoutHearingYesNo: 'Yes' },
    // A 2v1 claim asks about experts for both claimants together
    [c.claimType === claimTypes.TWO_VS_ONE ? 'applicantMPClaimExpertSpecRequired' : 'applicant1ClaimExpertSpecRequired']: 'No',
    applicant1ClaimWitnesses: '1',
    applicant1DQWitnessesSmallClaim: { witnessesToAppear: 'No', details: [] },
    applicant1DQSmallClaimHearing: { unavailableDatesRequired: 'No', smallClaimUnavailableDate: [] },
  };
}

// Fast, intermediate and multi track directions questionnaire. The fixed recoverable costs and draft directions are only
// asked for after a defence the claimant proceeds with, not a part admission amount they reject.
function directionsQuestionnaire(c: SpecifiedConfig, draftDirections: Document, defence: boolean) {
  const fixedRecoverableCosts = { isSubjectToFixedRecoverableCostRegime: 'No', reasons: 'Not subject to fixed recoverable costs.' };
  return {
    applicant1DQFileDirectionsQuestionnaire: { explainedToClient: ['CONFIRM'], oneMonthStayRequested: 'No', reactionProtocolCompliedWith: 'Yes' },
    ...(c.track === Track.FAST && defence ? { applicant1DQFixedRecoverableCosts: fixedRecoverableCosts } : {}),
    ...(c.track === Track.INTERMEDIATE && defence ? { applicant1DQFixedRecoverableCostsIntermediate: fixedRecoverableCosts } : {}),
    specApplicant1DQDisclosureOfElectronicDocuments: { reachedAgreement: 'Yes' },
    specApplicant1DQDisclosureOfNonElectronicDocuments: { bespokeDirections: 'No bespoke directions needed.' },
    applicant1DQDisclosureReport: { disclosureFormFiledAndServed: 'Yes', disclosureProposalAgreed: 'Yes', draftOrderNumber: '123' },
    applicant1DQExperts: { expertRequired: 'No', details: [] },
    applicant1DQWitnesses: { witnessesToAppear: 'No', details: [] },
    applicant1DQHearingLRspec: { unavailableDatesRequired: 'No', unavailableDates: [] },
    ...((c.track === Track.INTERMEDIATE || c.track === Track.MULTI) && defence ? { applicant1DQDraftDirections: draftDirections } : {}),
    applicant1DQFutureApplications: { intentionToMakeFutureApplications: 'No' },
  };
}

// The preferred court, chosen from the list the about to start callback fills in, and no remote hearing
function requestedCourt(startCaseData: Record<string, any>) {
  const list = startCaseData.applicant1DQRequestedCourt?.responseCourtLocations;
  const court = list?.list_items?.find((item: { label: string }) => item.label === courts.clerkenwell.longAddress);
  if (!court) {
    throw new Error(`CLAIMANT_RESPONSE_SPEC was started without ${courts.clerkenwell.longAddress} in the court list (applicant1DQRequestedCourt)`);
  }
  return {
    applicant1DQRequestedCourt: {
      responseCourtLocations: { value: court, list_items: list.list_items },
      reasonForHearingAtSpecificCourt: 'Nearest court to the claimant.',
    },
    applicant1DQRemoteHearingLRspec: { remoteHearingRequested: 'No' },
  };
}
