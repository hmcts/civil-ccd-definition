import { expect } from '@playwright/test';
import yesNo from '../../../enums/yesNo.ts';
import { journeySettings, settingProblems } from '../settings.ts';
import { specifiedFacts } from '../claimFacts.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import claimTypes from '../../../enums/claim-types.ts';
import claimTrack from '../../../enums/track.ts';
import Timeline from '../../../enums/timeline.ts';
import RespondentResponses from '../../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../../enums/admissionPaymentRoute.ts';
import DefendantEmployment from '../../../enums/defendantEmployment.ts';
import ClaimantSuggestedPayment from '../../../enums/claimantSuggestedPayment.ts';
import caseStates from '../../../enums/caseStates.ts';
import FinalOrder, { finalOrdersForTrack } from '../../../enums/finalOrders.ts';
import SettleClaim from '../../../enums/settleClaim.ts';
import DiscontinueClaim from '../../../enums/discontinueClaim.ts';
import CaseProceedsInCaseman from '../../../enums/caseProceedsInCaseman.ts';
import { SetAsideJudgment } from '../../../enums/judgmentsOnline.ts';
import NotSuitableSdo from '../../../enums/notSuitableSdo.ts';
import { ReconsiderationDecision, RequestForReconsiderationBy } from '../../../enums/reconsideration.ts';
import { InterestFrom, InterestType, InterestUntil } from '../../../enums/interest.ts';
import { createClaimShape } from '../../flows/createClaimShape.ts';
import { caseFlagsProblem } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { mciProblem } from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';
import { nocProblem } from '../../flows/events/shared_api_ui/noticeOfChangeSpecs.ts';
import { generalApplicationProblem } from '../generalApplicationSteps.ts';
import { queryManagementProblem } from '../queryManagementSteps.ts';
import { refundProblem } from '../refundSteps.ts';

export type SpecifiedConfig = ReturnType<typeof specifiedConfig>;

// The interest enums live in enums/interest.ts, so the settings registry can use them too; they are exported from here
// as well for the files that import them from the config
export { InterestFrom, InterestType, InterestUntil };

// The specific date interest is claimed from: six months ago, as playwright-e2e uses, as YYYY-MM-DD
function interestFromSpecificDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const twoDigits = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`;
}

// The settings of one specified journey, read from its scenario's env vars
// scenarioSettings: the names the scenario sets in scenarios/*.ts, which validate checks are settings of this journey
export function specifiedConfig(scenarioEnv: Record<string, string | undefined>, scenarioSettings: string[] = []) {
  // The scenario's settings, with their defaults (see ../settings.ts)
  const read = journeySettings('SPECIFIED', scenarioEnv);


  const claimType = read.get('CLAIM_TYPE') as claimTypes;
  const claimantType = read.get('CLAIMANT_TYPE');
  const defendantType = read.get('DEFENDANT_TYPE');
  const track = read.get('TRACK') as claimTrack;
  // The judge's final order (FINAL_ORDER). If it is not set, the first order the track offers is made: a free form order
  // on the small claims and fast tracks, the blank after-hearing template on the intermediate and multi tracks.
  const finalOrder: FinalOrder = (read.get('FINAL_ORDER') as FinalOrder) ?? finalOrdersForTrack[track][0];
  // With the same rate, 8 is the statutory rate and any other rate needs a reason. With a breakdown, it is the total
  // interest in pounds.
  const interestRate: string = read.get('INTEREST_RATE');
  const respondent1Response = read.get('RESPONDENT1_RESPONSE') as RespondentResponses;
  const respondent2Response = read.get('RESPONDENT2_RESPONSE') as RespondentResponses;
  // Once every response is in, the claim waits for the claimant if they are all the same and not a counterclaim. A
  // counterclaim, or responses that differ (divergent), take it offline. With two defendants' solicitors responding
  // separately (1v2DS), civil-service only keeps the claim online when both enter a full defence.
  const responses = [claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(claimType)
    ? [respondent1Response, respondent2Response]
    : [respondent1Response];
  const allSame = responses.every((response) => response === responses[0]);
  const staysOnline = claimType === claimTypes.ONE_VS_TWO_DIFF_SOL
    ? responses.every((response) => response === RespondentResponses.FULL_DEFENCE)
    : allSame && responses[0] !== RespondentResponses.COUNTER_CLAIM;
  const stateAfterAllResponses = staysOnline ? caseStates.AWAITING_APPLICANT_INTENTION : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;
  // The claimant's solicitor responds once every response is in and the claim is still online (all full defences, or
  // all the same admission). Where the claim goes then is worked out in claimantResponseOutcome.
  const claimantResponse = {
    proceed: read.get('CLAIMANT_PROCEED') as yesNo,
    acceptsAmount: read.get('CLAIMANT_ACCEPTS_AMOUNT') as yesNo,
    acceptsPlan: read.get('CLAIMANT_ACCEPTS_PLAN') as yesNo,
    suggestedPayment: read.get('CLAIMANT_SUGGESTED_PAYMENT') as ClaimantSuggestedPayment,
  };
  const claimantResponds = staysOnline;
  const claimantOutcome = claimantResponseOutcome(claimType, track, responses[0], read.get('ADMISSION_PAYMENT_ROUTE') as AdmissionPaymentRoute, claimantResponse);

  const config = {
    // The scenario's env vars, from which the journey works out its settings for the claim type it carries on as once
    // a notice of change has given each litigant in person a solicitor (see specifiedSteps)
    scenarioEnv,
    claimType,
    caseType: 'SPECIFIED',
    claimantType,
    defendantType,
    // The parties to the claim and who represents them, which creating the claim follows (through the UI or the API).
    // A specified claim does not ask about a claimant's litigation friend when it is created.
    claimShape: createClaimShape(claimType, claimantType, defendantType, [yesNo.NO, yesNo.NO]),
    track,
    // Whether the claim is for a delayed or cancelled flight (AIRLINE_CLAIM, default No): with an airline from the list,
    // Jet2.com (Yes), or one the claimant names because it is not on the list (OTHER)
    airlineClaim: ['Yes', 'OTHER'].includes(read.get('AIRLINE_CLAIM')) ? yesNo.YES : yesNo.NO,
    otherAirline: read.get('AIRLINE_CLAIM') === 'OTHER',
    // A small claim for a delayed flight is managed at the airline's court (or, for an airline not on the list, the
    // court the claimant asks for), and work allocation gives its directions task, "Initial Directions (Flight Delay)",
    // to a judge rather than a legal adviser
    flightDelaySmallClaim: ['Yes', 'OTHER'].includes(read.get('AIRLINE_CLAIM')) && track === claimTrack.SMALL,
    // Whether the timeline of events is typed in (MANUAL, the default) or uploaded as a document (UPLOAD)
    timeline: read.get('TIMELINE') as Timeline,
    // Whether the claimant claims interest (INTEREST_REQUIRED=Yes, default No), how (INTEREST_TYPE, INTEREST_RATE), from
    // when (INTEREST_FROM: the submit date, or a specific date six months ago) and, from a specific date, until when
    // (INTEREST_UNTIL)
    interestRequired: read.yes('INTEREST_REQUIRED'),
    interestType: read.get('INTEREST_TYPE') as InterestType,
    interestRate,
    interestFrom: read.get('INTEREST_FROM') as InterestFrom,
    interestUntil: read.get('INTEREST_UNTIL') as InterestUntil,
    interestFromDate: interestFromSpecificDate(),
    // How the claimant's solicitor pays the claim fee: from their PBA account (PAYMENT_METHOD=PBA, the default) or by
    // card (CARD), which is always done in the UI, even when the claim is created through the API
    paymentMethod: read.get('PAYMENT_METHOD') as PaymentMethod,
    // Whether the claimant claims fixed commencement costs (FIXED_COMMENCEMENT_COSTS=Yes, default No)
    fixedCommencementCosts: read.yes('FIXED_COMMENCEMENT_COSTS'),
    // Whether the hearing centre admin adds a case note straight after the claim is issued (ADD_CASE_NOTE=Yes,
    // default No)
    addCaseNote: read.yes('ADD_CASE_NOTE'),
    // Whether the hearing centre admin changes the legal representatives' email addresses with "Amend party details" once
    // the defendants' solicitors are on the claim (AMEND_PARTY_DETAILS=Yes, default No)
    amendPartyDetails: read.yes('AMEND_PARTY_DETAILS'),
    // Whether the hearing centre admin stays the case once the claimant's response has taken it to JUDICIAL_REFERRAL,
    // asks the parties for an update and lifts the stay (STAY_CASE=Yes, default No)
    stayCase: read.yes('STAY_CASE'),
    // Whether the hearing centre admin sends a district judge a message with "Send and reply to messages" once the
    // claimant's response has taken the claim to JUDICIAL_REFERRAL, and the judge replies. With STAY_CASE=Yes they do
    // it while the case is stayed (SEND_AND_REPLY=Yes, default No)
    sendAndReply: read.yes('SEND_AND_REPLY'),
    // Whether the hearing centre admin dismisses the case with "Dismiss case" once the rest of the journey has run, which
    // moves it to CASE_DISMISSED (DISMISS_CASE=Yes, default No)
    dismissCase: read.yes('DISMISS_CASE'),
    // Whether each solicitor uploads mediation documents once mediation on a small claim has been unsuccessful: a
    // non-attendance statement and a document referred to in it, for every party they act for
    // (UPLOAD_MEDIATION_DOCUMENTS=Yes, default No)
    uploadMediationDocuments: read.yes('UPLOAD_MEDIATION_DOCUMENTS'),
    // Whether mediation settles a small claim the claimant's response took to mediation, which stays the case and ends
    // the journey there, instead of being unsuccessful (MEDIATION_SUCCESSFUL=Yes, default No)
    mediationSuccessful: read.yes('MEDIATION_SUCCESSFUL'),
    // Whether a party's solicitor asks for the legal adviser's small claims order to be reconsidered once it is made
    // (REQUEST_FOR_RECONSIDERATION=CLAIMANT, DEFENDANT_1 or DEFENDANT_2; not asked by default), and what the judge
    // decides (RECONSIDERATION_DECISION=UPHOLD, the default, CREATE_SDO or CREATE_GENERAL_ORDER)
    requestForReconsideration: read.get('REQUEST_FOR_RECONSIDERATION') as RequestForReconsiderationBy | undefined,
    reconsiderationDecision: (read.get('RECONSIDERATION_DECISION') ?? ReconsiderationDecision.UPHOLD) as ReconsiderationDecision,
    // Whether and how the claim is settled with "Settle this claim" once the rest of the journey has run: the
    // claimant's solicitor marks it paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL), which stays the case, or court staff
    // record it settled after a judge's order (JUDGE_ORDER) or a consent order (CONSENT_ORDER). Not settled by default.
    settleClaim: read.get('SETTLE_CLAIM') as SettleClaim | undefined,
    // Whether the claimant's solicitor fully discontinues the claim with "Discontinue this claim" once the rest of the
    // journey has run: without needing the court's permission (DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED), or with a
    // judge's permission (PERMISSION_GRANTED), which court staff then validate. Not discontinued by default.
    discontinueClaim: read.get('DISCONTINUE_CLAIM') as DiscontinueClaim | undefined,
    // Whether the hearing centre admin takes the claim offline with "Case proceeds in Caseman" once the rest of the
    // journey has run, giving the reason for proceeding on paper (CASE_PROCEEDS_IN_CASEMAN=APPLICATION,
    // JUDGEMENT_REQUEST, CASE_SETTLED or OTHER, or DEFENDANT_DOES_NOT_CONSENT for "Defendant
    // solicitor does not consent to accept service through MyHMCTS"). civil-service moves the claim to PROCEEDS_IN_HERITAGE_SYSTEM. Not taken
    // offline by default.
    caseProceedsInCaseman: read.get('CASE_PROCEEDS_IN_CASEMAN') as CaseProceedsInCaseman | undefined,
    // Whether the claimant's solicitor asks for default judgment once the claim is waiting for the defendants: the
    // response deadlines are moved to yesterday, as if the time for responding had passed, and the steps for the
    // defendants' responses and everything after them are skipped, apart from settling or discontinuing the claim
    // (DEFAULT_JUDGMENT=Yes, default No)
    defaultJudgment: read.yes('DEFAULT_JUDGMENT'),
    // The Judgments Online events, which run once a default judgment (DEFAULT_JUDGMENT=Yes) or a judgment by admission
    // (a 1v1 claimant accepting the defendant's date or repayment plan) has left the claim in All_FINAL_ORDERS_ISSUED,
    // in this order (see judgmentsOnlineSteps in specifiedSteps.ts):
    //  - the claimant's solicitor marks the judgment as paid in full (JUDGMENT_PAID_IN_FULL=Yes, default No)
    //  - the hearing centre admin refers the claim to a judge as a defence was received in time
    //    (REFER_JUDGE_DEFENCE_RECEIVED=Yes, default No)
    //  - the hearing centre admin sets aside the default judgment: made in error (SET_ASIDE_JUDGMENT=JUDGMENT_ERROR), or
    //    by a judge's order following an application (ORDER_AFTER_APPLICATION) or a defence received
    //    (ORDER_AFTER_DEFENCE). Not set aside by default.
    judgmentPaidInFull: read.yes('JUDGMENT_PAID_IN_FULL'),
    referJudgeDefenceReceived: read.yes('REFER_JUDGE_DEFENCE_RECEIVED'),
    setAsideJudgment: read.get('SET_ASIDE_JUDGMENT') as SetAsideJudgment | undefined,
    // Whether the judge (the legal adviser for a small claim) decides the claim is not suitable for a Standard Direction
    // Order instead of making one: it should go to another hearing centre (NOT_SUITABLE_SDO=CHANGE_LOCATION), which the
    // hearing centre admin then transfers it to before the order is made there, or another reason (OTHER_REASONS),
    // which takes the claim offline. Not used by default.
    notSuitableSdo: read.get('NOT_SUITABLE_SDO') as NotSuitableSdo | undefined,
    // Whether the small claims Standard Direction Order lists a dispute resolution hearing (DRH) instead of a small
    // claims hearing (DISPUTE_RESOLUTION_HEARING=Yes, default No; needs TRACK=SMALL_CLAIM)
    disputeResolutionHearing: read.yes('DISPUTE_RESOLUTION_HEARING'),
    // Whether civil-service's automated hearing notice scheduler lists the hearing instead of the hearing centre admin's
    // hearing notice: HMC (WireMock) returns a LISTED trial and the scheduler sends the notice (HEARING_NOTICE_SCHEDULER=Yes,
    // default No). Only on a civil-service PR preview, which has WireMock; elsewhere the admin's notice is used, with a
    // warning.
    hearingNoticeScheduler: read.yes('HEARING_NOTICE_SCHEDULER'),
    // Whether each defendant's solicitor informs the court of an agreed extension to the time for responding
    // (INFORM_AGREED_EXTENSION=Yes, default No)
    informAgreedExtension: read.yes('INFORM_AGREED_EXTENSION'),
    // Whether each solicitor adds unavailable dates for the parties they represent with "Add Unavailable Dates" once the
    // claimant's response has been made, then the hearing centre admin adds some for a defendant
    // (ADD_UNAVAILABLE_DATES=Yes, default No; see addUnavailableDatesSpecs.ts)
    addUnavailableDates: read.yes('ADD_UNAVAILABLE_DATES'),
    // The parties a solicitor takes over with a notice of change (NOTICE_OF_CHANGE: a list such as
    // DEFENDANT_1,CLAIMANT_1), after the NOTICE_OF_CHANGE_AFTER step. A specified claim is not notified, so the earliest
    // is once the defendants' solicitors are assigned (ASSIGN_DEFENDANT_SOLICITORS, the default). See
    // noticeOfChangeSpecs.ts.
    noticeOfChangeSetting: read.get('NOTICE_OF_CHANGE'),
    noticeOfChangeAfter: read.get('NOTICE_OF_CHANGE_AFTER'),
    noticeOfChangeFirstStep: 'ASSIGN_DEFENDANT_SOLICITORS',
    // A general application the claimant's solicitor makes (GENERAL_APPLICATION: its types, such as STAY_THE_CLAIM or
    // EXTEND_TIME,STAY_THE_CLAIM), with notice, after the GENERAL_APPLICATION_AFTER step (default RESPOND_TO_DEFENCE).
    // See generalApplicationSteps.ts.
    generalApplicationSetting: read.get('GENERAL_APPLICATION'),
    generalApplicationAfter: read.get('GENERAL_APPLICATION_AFTER'),
    // Whether the other side has agreed to it (GENERAL_APPLICATION_AGREED, default No) and, when not, whether it is made
    // with notice to them (GENERAL_APPLICATION_WITH_NOTICE, default Yes)
    generalApplicationAgreed: read.yes('GENERAL_APPLICATION_AGREED'),
    generalApplicationWithNotice: read.get('GENERAL_APPLICATION_WITH_NOTICE') === 'No' ? yesNo.NO : yesNo.YES,
    // Whether it is urgent (GENERAL_APPLICATION_URGENT, default No): an urgent application goes straight to the court
    // once its fee is paid, without the other side's response
    generalApplicationUrgent: read.yes('GENERAL_APPLICATION_URGENT'),
    // Whose solicitor makes it (GENERAL_APPLICATION_BY: claimant, defendant1 or defendant2, default claimant); the other
    // parties' solicitors respond
    generalApplicationBy: read.get('GENERAL_APPLICATION_BY'),
    // Whether a legal adviser given the decision refers it to a judge, who then decides it
    // (GENERAL_APPLICATION_REFER_TO_JUDGE, default No)
    generalApplicationReferToJudge: read.yes('GENERAL_APPLICATION_REFER_TO_JUDGE'),
    // For an application made without notice, whether the judge or legal adviser first sends it to the other side, so
    // the applicant pays the extra fee and the other side responds before it is decided
    // (GENERAL_APPLICATION_SEND_TO_OTHER_PARTY, default No; needs GENERAL_APPLICATION_WITH_NOTICE=No)
    generalApplicationSendToOtherParty: read.yes('GENERAL_APPLICATION_SEND_TO_OTHER_PARTY'),
    // What the judge or legal adviser decides (GENERAL_APPLICATION_DECISION: APPROVE, the default, REQUEST_MORE_INFO,
    // which the applicant's solicitor then answers, or LIST_FOR_HEARING, which court staff then schedule)
    generalApplicationDecision: read.get('GENERAL_APPLICATION_DECISION'),
    // Whose solicitors raise a query, which a CTSC admin answers (QUERY_MANAGEMENT: a list such as claimant,defendant1),
    // after the QUERY_MANAGEMENT_AFTER step (default RESPOND_TO_DEFENCE, once every solicitor has the case). Whether the
    // queries are about a hearing (QUERY_MANAGEMENT_HEARING_RELATED, default No), and whether each solicitor then asks a
    // follow-up question, which is answered too (QUERY_MANAGEMENT_FOLLOW_UP, default No). See queryManagementSteps.ts.
    queryManagementSetting: read.get('QUERY_MANAGEMENT'),
    queryManagementAfter: read.get('QUERY_MANAGEMENT_AFTER'),
    queryManagementHearingRelated: read.yes('QUERY_MANAGEMENT_HEARING_RELATED'),
    queryManagementFollowUp: read.yes('QUERY_MANAGEMENT_FOLLOW_UP'),
    // A refund of an overpayment of the claim fee (REFUND: what the approver does with it, APPROVE, REJECT or RETURN,
    // which returns it to the claimant's solicitor to change and send again before it is approved), after the
    // REFUND_AFTER step (default CREATE_CLAIM). See refundSteps.ts.
    refundSetting: read.get('REFUND'),
    refundAfter: read.get('REFUND_AFTER'),
    defendantSolicitorAssignedAfter: { 1: 'ASSIGN_DEFENDANT_SOLICITORS', 2: 'ASSIGN_DEFENDANT_SOLICITORS' } as Record<1 | 2, string>,
    // Each defendant's response (RESPONDENT1_RESPONSE, RESPONDENT2_RESPONSE, default FULL_DEFENCE), and when a defendant
    // who admits all or part of the claim will pay (ADMISSION_PAYMENT_ROUTE, default IMMEDIATELY)
    respondent1Response,
    respondent2Response,
    admissionPaymentRoute: read.get('ADMISSION_PAYMENT_ROUTE') as AdmissionPaymentRoute,
    // Whether each defendant giving their finances is retired or self-employed (RESPONDENT1_EMPLOYMENT,
    // RESPONDENT2_EMPLOYMENT, default RETIRED)
    respondent1Employment: read.get('RESPONDENT1_EMPLOYMENT') as DefendantEmployment,
    respondent2Employment: read.get('RESPONDENT2_EMPLOYMENT') as DefendantEmployment,
    stateAfterAllResponses,
    // Whether the claimant responds to the defence (CLAIMANT_PROCEED, default Yes), and where the claim goes then
    // The claimant's answers (CLAIMANT_PROCEED, CLAIMANT_ACCEPTS_AMOUNT, CLAIMANT_ACCEPTS_PLAN, CLAIMANT_SUGGESTED_PAYMENT),
    // whether they respond, and the business process and state their response leads to
    claimantResponse,
    claimantResponds,
    // The flags the hearing centre admin adds once the claimant has responded and the claim is still online
    // (CASE_FLAGS: "representative", or a list such as CASE:CF0002,DEFENDANT_1:RA0012; see caseFlagSpecs.ts)
    caseFlagsSetting: read.get('CASE_FLAGS'),
    // The Manage Contact Information runs once the claimant has responded and the claim is still online
    // (MANAGE_CONTACT_INFORMATION: "representative", or a list such as admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1;
    // see manageContactInformationSpecs.ts)
    manageContactInformationSetting: read.get('MANAGE_CONTACT_INFORMATION'),
    claimantOutcome,
    finalOrder,

    // Checks the settings make sense together, before the journey starts
    validate() {
      // Every value is one its setting takes, no settings clash (settingRules) and every name the scenario sets is a
      // setting of this journey (see ../settings.ts)
      const settingErrors = settingProblems('SPECIFIED', scenarioEnv, scenarioSettings);
      expect(settingErrors, `Invalid settings:\n  - ${settingErrors.join('\n  - ')}`).toEqual([]);
      if (scenarioEnv.REQUEST_FOR_RECONSIDERATION !== undefined) {
        // The legal adviser's small claims order follows unsuccessful mediation, so the claim has to get there (the
        // checks on the settings themselves are in settingRules, in ../settings.ts)
        expect(
          claimantResponds && claimantOutcome.state === caseStates.IN_MEDIATION,
          `REQUEST_FOR_RECONSIDERATION needs the claimant's response to take the small claim to mediation (IN_MEDIATION), where the legal adviser's order follows unsuccessful mediation, but these settings take it to ${claimantResponds ? claimantOutcome.state : 'no claimant response'}. Use a defence the claimant disputes (the defaults: RESPONDENT1_RESPONSE=FULL_DEFENCE and CLAIMANT_PROCEED=Yes).`,
        ).toBeTruthy();
      }
      const caseFlagsError = caseFlagsProblem(config);
      expect(caseFlagsError, caseFlagsError).toBeUndefined();
      const mciError = mciProblem(config);
      expect(mciError, mciError).toBeUndefined();

      const nocError = nocProblem(config);
      expect(nocError, nocError).toBeUndefined();

      const gaError = generalApplicationProblem(config);
      expect(gaError, gaError).toBeUndefined();

      const queryError = queryManagementProblem(config);
      expect(queryError, queryError).toBeUndefined();

      const refundError = refundProblem(config);
      expect(refundError, refundError).toBeUndefined();
    },
  };
  // What follows for the claim from these settings, which steps need (see ../claimFacts.ts)
  return Object.assign(config, { facts: specifiedFacts(config) });
}

// Where the claimant's response takes the claim (civil-service's DetermineNextState and the claimant response process).
// response is every defendant's response, as they are all the same once the claim waits for the claimant.
//  - A full defence: proceeding takes a small claim to mediation (CARM) and any other claim to JUDICIAL_REFERRAL; not
//    proceeding takes it offline.
//  - A 2v1 or 1v2SS admission: the claimant is only asked whether they proceed, and either way the claim goes offline
//    (even a small claim, checked with a 1v2SS part admission).
//  - A 1v1 admission paid immediately and accepted (a full admission is not asked about at all) waits for the payment,
//    so the claim stays in AWAITING_APPLICANT_INTENTION.
//  - A 1v1 date or repayment plan the claimant accepts becomes a judgment by admission (All_FINAL_ORDERS_ISSUED, through
//    the JUDGEMENT_BY_ADMISSION_NON_DIVERGENT_SPEC process). A rejected full admission plan goes offline, and a rejected
//    part admission plan goes to JUDICIAL_REFERRAL.
//  - A 1v1 part admission amount the claimant rejects is disputed like a defence: JUDICIAL_REFERRAL, or mediation for a
//    small claim.
export function claimantResponseOutcome(
  claimType: claimTypes,
  track: claimTrack,
  response: RespondentResponses,
  paymentRoute: AdmissionPaymentRoute,
  answers: { proceed: yesNo; acceptsAmount: yesNo; acceptsPlan: yesNo },
): { state: caseStates; businessProcess: string } {
  const outcome = (state: caseStates, businessProcess = 'CLAIMANT_RESPONSE_SPEC') => ({ state, businessProcess });
  const disputed = track === claimTrack.SMALL ? caseStates.IN_MEDIATION : caseStates.JUDICIAL_REFERRAL;
  if (response === RespondentResponses.FULL_DEFENCE) {
    return outcome(answers.proceed === yesNo.NO ? caseStates.PROCEEDS_IN_HERITAGE_SYSTEM : disputed);
  }
  if (claimType !== claimTypes.ONE_VS_ONE) {
    return outcome(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
  }
  const partAdmission = response === RespondentResponses.PART_ADMISSION;
  if (partAdmission && answers.acceptsAmount === yesNo.NO) {
    return outcome(disputed);
  }
  if (paymentRoute === AdmissionPaymentRoute.IMMEDIATELY) {
    return outcome(caseStates.AWAITING_APPLICANT_INTENTION);
  }
  if (answers.acceptsPlan === yesNo.YES) {
    return outcome(caseStates.All_FINAL_ORDERS_ISSUED, 'JUDGEMENT_BY_ADMISSION_NON_DIVERGENT_SPEC');
  }
  return outcome(partAdmission ? caseStates.JUDICIAL_REFERRAL : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
}
