import yesNo from '../../enums/yesNo.ts';
import PaymentMethod from '../../enums/paymentMethod.ts';
import claimTypes from '../../enums/claim-types.ts';
import claimTrack from '../../enums/track.ts';
import caseStates from '../../enums/caseStates.ts';
import Timeline from '../../enums/timeline.ts';
import unspecClaimTypes from '../../enums/unspecClaimTypes.ts';
import personalInjuryTypes from '../../enums/personalInjuryTypes.ts';
import fixedRecoveryCostsBands from '../../enums/fixedRecoveryCostsBands.ts';
import languageSpokenAndDocuments from '../../enums/languageSpokenAndDocuments.ts';
import notifyClaimOptions from '../../enums/notifyClaimOptions.ts';
import responseIntentions from '../../enums/ResponseIntention.ts';
import RespondentResponses from '../../enums/RespondentResponses.ts';
import AdmissionPaymentRoute from '../../enums/admissionPaymentRoute.ts';
import DefendantEmployment from '../../enums/defendantEmployment.ts';
import ClaimantSuggestedPayment from '../../enums/claimantSuggestedPayment.ts';
import FinalOrder from '../../enums/finalOrders.ts';
import NotSuitableSdo from '../../enums/notSuitableSdo.ts';
import SettleClaim from '../../enums/settleClaim.ts';
import DiscontinueClaim from '../../enums/discontinueClaim.ts';
import CaseProceedsInCaseman from '../../enums/caseProceedsInCaseman.ts';
import { InterestFrom, InterestType, InterestUntil } from '../../enums/interest.ts';
import { ReconsiderationDecision, RequestForReconsiderationBy } from '../../enums/reconsideration.ts';
import { SetAsideJudgment } from '../../enums/judgmentsOnline.ts';
import { GaDecision } from './generalApplicationSteps.ts';
import { refundOutcomes } from './refundSteps.ts';

// Every setting a scenario can give the journeys, in one place: the values it takes, its default and what it does in
// each journey. The journeys' configs (specified/specifiedConfig.ts, unspecified/unspecifiedConfig.ts) read their
// settings through journeySettings, so a default is only written here, and check every value with settingProblems
// before the journey starts:
//  - a value that is not one the setting takes fails the run, rather than quietly running the journey without the
//    step (STAY_CASE=yes used to do that)
//  - a scenario in scenarios/*.ts that sets a name that is not a setting, or one only the other journey reads, fails too
// Settings made of lists or step names (CASE_FLAGS, NOTICE_OF_CHANGE, GENERAL_APPLICATION_AFTER ...) have no list of
// values here: the code that reads them checks them, and the run fails the same way.
//
// The notes are what the RUNNING guides say about each setting. Settings that only change how the run works (ENV,
// WORKERS, PREFLIGHT, KEEP_CASE_ASSIGNMENTS ...) are not journey settings, so are not here.

export type Journey = 'SPECIFIED' | 'UNSPECIFIED';
type PerJourney<T> = Partial<Record<Journey, T>>;

export interface Setting {
  // The values it takes, the same in both journeys or for each journey
  values?: readonly string[] | PerJourney<readonly string[]>;
  // What it takes, for the guides, where there is no list of values
  valuesText?: string;
  // Why a value is not one it takes, or undefined when it is, for a setting with no list of values
  check?: (value: string) => string | undefined;
  // Its value when it is not set, the same in both journeys or for each journey. Without one, the setting is off.
  default?: string | PerJourney<string>;
  // What it does in each journey that reads it. A setting is only for the journeys it has notes for.
  notes: PerJourney<string>;
}

const yesNoValues = ['Yes', 'No'];
const partyTypeValues = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'];
const claimTypeValues = Object.values(claimTypes);
const caseStateValues = Object.values(caseStates);
const wholeNumber = (value: string) => (/^\d+$/.test(value) ? undefined : 'It must be a whole number, 0 or more.');
const number = (value: string) => (/^\d+(\.\d+)?$/.test(value) ? undefined : 'It must be a number.');

export const settings = {
  API_UNTIL: {
    values: caseStateValues,
    notes: {
      SPECIFIED: 'Steps with an API version use the API until the claim reaches this state.',
      UNSPECIFIED: 'Steps with an API version use the API until the claim reaches this state.',
    },
  },
  STOP_AT_STATE: {
    values: caseStateValues,
    notes: {
      SPECIFIED: 'Stop once the claim reaches this state.',
      UNSPECIFIED: 'Stop once the claim reaches this state.',
    },
  },
  STOP_AFTER_TEST: {
    valuesText: "A step or group name, or testN (checked against the journey's steps)",
    notes: {
      SPECIFIED: 'Stop after this step.',
      UNSPECIFIED: 'Stop after this step.',
    },
  },
  CLAIM_TYPE: {
    values: claimTypeValues,
    default: claimTypes.ONE_VS_ONE,
    notes: {
      SPECIFIED: 'SS = one solicitor for both defendants, DS = a solicitor each. LIP = litigant in person.',
      UNSPECIFIED: 'SS = one solicitor for both defendants, DS = a solicitor each. LIP = litigant in person. 1v2LRLIP: Defendant 1 has a solicitor, Defendant 2 is a LIP. 1v2LIPLR is the other way round.',
    },
  },
  CLAIMANT_TYPE: {
    values: partyTypeValues,
    default: 'INDIVIDUAL',
    notes: {
      SPECIFIED: 'Any other value is treated as INDIVIDUAL.',
      UNSPECIFIED: 'Any other value is treated as INDIVIDUAL.',
    },
  },
  DEFENDANT_TYPE: {
    values: partyTypeValues,
    default: 'INDIVIDUAL',
    notes: {
      SPECIFIED: 'Any other value is treated as INDIVIDUAL.',
      UNSPECIFIED: 'Any other value is treated as INDIVIDUAL.',
    },
  },
  TRACK: {
    values: Object.values(claimTrack),
    default: claimTrack.FAST,
    notes: {
      SPECIFIED: 'Sets the claim amount.',
      UNSPECIFIED: 'Sets the claim value. The intermediate and multi tracks get a directions order instead of the Standard Direction Order, then go on to the final order as the small and fast tracks do.',
    },
  },
  TYPE_OF_CLAIM: {
    values: Object.values(unspecClaimTypes),
    default: unspecClaimTypes.PERSONAL_INJURY,
    notes: {
      UNSPECIFIED: 'A value that is set but is not one of these stops the run before it starts.',
    },
  },
  SUB_TYPE: {
    values: Object.values(personalInjuryTypes),
    notes: {
      UNSPECIFIED: 'Only for PERSONAL_INJURY. A value that is not one of these stops the run before it starts. A noise induced hearing loss claim must be on the fast track.',
    },
  },
  PAYMENT_METHOD: {
    values: Object.values(PaymentMethod),
    default: PaymentMethod.PBA,
    notes: {
      SPECIFIED: 'How the claim fee and the hearing fee are paid. CARD is always paid in the UI. Any other value stops the run.',
      UNSPECIFIED: "How the claim fee and the hearing fee are paid. CARD is always paid in the UI, on GOV.UK Pay's pages. Any other value stops the run.",
    },
  },
  TIMELINE: {
    values: Object.values(Timeline),
    default: Timeline.MANUAL,
    notes: {
      SPECIFIED: 'Whether the timeline of events is typed in or uploaded as a document, by the claimant and by each defendant.',
    },
  },
  AIRLINE_CLAIM: {
    values: ['Yes', 'No', 'OTHER'],
    default: 'No',
    notes: {
      SPECIFIED: 'A claim for a delayed or cancelled flight, with an airline from the list (Yes: Jet2.com) or one that is not on it (OTHER: the airline\'s name is typed in). The claim is checked to be saved as a flight delay claim, with the airline\'s court for Yes. On a small claim the claimant\'s response is checked to move the claim to the airline\'s court (for OTHER, the court the claimant asked for), and work allocation gives the directions task, "Initial Directions (Flight Delay)", to a judge rather than a legal adviser, who adds the flight delay directions (related claims and legal arguments, filled in by civil-service) to the Standard Direction Order. On a small claim it cannot be used with REQUEST_FOR_RECONSIDERATION (only a legal adviser\'s order can be reconsidered) or DISPUTE_RESOLUTION_HEARING. Has an API version.',
    },
  },
  INTEREST_REQUIRED: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'The claimant claims interest.',
    },
  },
  INTEREST_TYPE: {
    values: Object.values(InterestType),
    default: InterestType.SAME_RATE,
    notes: {
      SPECIFIED: 'One rate over the whole period, or a total the claimant has broken down.',
    },
  },
  INTEREST_RATE: {
    valuesText: 'A number',
    check: number,
    default: '8',
    notes: {
      SPECIFIED: 'With the same rate, 8 is the statutory rate and any other rate needs a reason. With a breakdown, the total interest in pounds.',
    },
  },
  INTEREST_FROM: {
    values: Object.values(InterestFrom),
    default: InterestFrom.SUBMIT_DATE,
    notes: {
      SPECIFIED: 'The date interest is claimed from. A specific date is six months ago, with a reason. Needs INTEREST_REQUIRED=Yes. Through the API the interest built up since that date (worked out as civil-service does) is added to the amount the claim fee is for. Has an API version.',
    },
  },
  INTEREST_UNTIL: {
    values: Object.values(InterestUntil),
    default: InterestUntil.SETTLED_OR_JUDGMENT,
    notes: {
      SPECIFIED: 'With INTEREST_FROM=FROM_A_SPECIFIC_DATE, when the interest is claimed until. Has an API version.',
    },
  },
  FIXED_COMMENCEMENT_COSTS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'The claimant claims fixed commencement costs.',
    },
  },
  FIXED_RECOVERABLE_COSTS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Directions questionnaire answer.',
    },
  },
  FIXED_RECOVERY_COSTS_BAND: {
    values: Object.values(fixedRecoveryCostsBands),
    default: fixedRecoveryCostsBands.BAND1,
    notes: {
      UNSPECIFIED: 'Used when FIXED_RECOVERABLE_COSTS=Yes.',
    },
  },
  CLAIMANT1_LITIGANT_FRIEND: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Claimant 1 has a litigation friend.',
    },
  },
  CLAIMANT2_LITIGANT_FRIEND: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Claimant 2 has a litigation friend (2v1 claims).',
    },
  },
  LANGUAGE: {
    values: Object.values(languageSpokenAndDocuments),
    default: languageSpokenAndDocuments.ENGLISH,
    notes: {
      UNSPECIFIED: 'Language for the hearing and documents.',
    },
  },
  EXPERTS: {
    valuesText: 'A whole number, 0 or more',
    check: wholeNumber,
    default: '0',
    notes: {
      UNSPECIFIED: 'Number of experts in each directions questionnaire.',
    },
  },
  WITNESSES: {
    valuesText: 'A whole number, 0 or more',
    check: wholeNumber,
    default: '0',
    notes: {
      UNSPECIFIED: 'Number of witnesses in each directions questionnaire.',
    },
  },
  UNAVAILABLE_DATES: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Adds unavailable dates to the directions questionnaires.',
    },
  },
  DETERMINATION_WITHOUT_HEARING: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Directions questionnaire answer (small claims).',
    },
  },
  ONE_MONTH_STAY: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Directions questionnaire answer. Also sets the pre-action protocol answer.',
    },
  },
  DEFENDANTS_TO_NOTIFY_CLAIM: {
    values: Object.values(notifyClaimOptions),
    default: notifyClaimOptions.BOTH,
    notes: {
      UNSPECIFIED: 'Quote values with spaces. Anything other than Both takes the claim offline.',
    },
  },
  DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS: {
    values: Object.values(notifyClaimOptions),
    default: notifyClaimOptions.BOTH,
    notes: {
      UNSPECIFIED: 'Anything other than Both takes the claim offline.',
    },
  },
  RESPONDENT1_RESPONSE_INTENTION: {
    values: Object.values(responseIntentions),
    default: responseIntentions.FULL_DEFENCE,
    notes: {
      UNSPECIFIED: "Defendant 1's answer when acknowledging the claim.",
    },
  },
  RESPONDENT2_RESPONSE_INTENTION: {
    values: Object.values(responseIntentions),
    default: responseIntentions.FULL_DEFENCE,
    notes: {
      UNSPECIFIED: "Defendant 2's answer when acknowledging the claim.",
    },
  },
  RESPONDENT1_RESPONSE: {
    values: Object.values(RespondentResponses),
    default: RespondentResponses.FULL_DEFENCE,
    notes: {
      SPECIFIED: "Defendant 1's response.",
      UNSPECIFIED: 'Anything other than a full defence takes the claim offline.',
    },
  },
  RESPONDENT2_RESPONSE: {
    values: Object.values(RespondentResponses),
    default: RespondentResponses.FULL_DEFENCE,
    notes: {
      SPECIFIED: "Defendant 2's response, or in a 2v1 claim the defendant's response to Claimant 2.",
      UNSPECIFIED: "Defendant 2's response, or in a 2v1 claim the defendant's response to Claimant 2. Anything other than a full defence takes the claim offline.",
    },
  },
  ADMISSION_PAYMENT_ROUTE: {
    values: Object.values(AdmissionPaymentRoute),
    default: AdmissionPaymentRoute.IMMEDIATELY,
    notes: {
      SPECIFIED: 'When a defendant who admits all or part of the claim will pay.',
    },
  },
  RESPONDENT1_EMPLOYMENT: {
    values: Object.values(DefendantEmployment),
    default: DefendantEmployment.RETIRED,
    notes: {
      SPECIFIED: 'What Defendant 1 says about their work when they give their finances (an individual or sole trader admitting and not paying immediately).',
    },
  },
  RESPONDENT2_EMPLOYMENT: {
    values: Object.values(DefendantEmployment),
    default: DefendantEmployment.RETIRED,
    notes: {
      SPECIFIED: 'The same for Defendant 2.',
    },
  },
  CLAIMANT_PROCEED: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      SPECIFIED: "Whether the claimant proceeds with the claim after the defendants' full defences, or after a 2v1 or 1v2SS admission. Any other value stops the run.",
    },
  },
  CLAIMANT_PROCEED_1: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      UNSPECIFIED: '1v1: the claimant proceeds. 2v1: Claimant 1 proceeds. 1v2: the claimant proceeds against Defendant 1. No takes the claim offline.',
    },
  },
  CLAIMANT_PROCEED_2: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      UNSPECIFIED: '2v1: Claimant 2 proceeds. 1v2: the claimant proceeds against Defendant 2. Not used for 1v1.',
    },
  },
  CLAIMANT_ACCEPTS_AMOUNT: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      SPECIFIED: 'Whether the claimant accepts the amount a 1v1 defendant admits (part admission).',
    },
  },
  CLAIMANT_ACCEPTS_PLAN: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      SPECIFIED: "Whether the claimant accepts a 1v1 defendant's payment date or repayment plan.",
    },
  },
  CLAIMANT_SUGGESTED_PAYMENT: {
    values: Object.values(ClaimantSuggestedPayment),
    default: ClaimantSuggestedPayment.IMMEDIATELY,
    notes: {
      SPECIFIED: 'How the claimant suggests the defendant pays when they reject the date or plan.',
    },
  },
  FINAL_ORDER: {
    values: Object.values(FinalOrder),
    notes: {
      SPECIFIED: 'FREE_FORM_ORDER on small and fast, BLANK_TEMPLATE_AFTER_HEARING on intermediate and multi. Any other value stops the run.',
      UNSPECIFIED: 'FREE_FORM_ORDER on small and fast, BLANK_TEMPLATE_AFTER_HEARING on intermediate and multi.',
    },
  },
  DISPUTE_RESOLUTION_HEARING: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional: the small claims Standard Direction Order lists a dispute resolution hearing (DRH) instead of a small claims hearing. "Dispute resolution hearing" is chosen among the small claims directions, and civil-service fills in the DRH page apart from when witness statements are due (42 days away, 14 days before the hearing\'s first open date 56 days away). The DRH is checked on the case; the rest of the journey is unchanged. Needs TRACK=SMALL_CLAIM and the claim to reach CREATE_SDO. Has an API version.',
      UNSPECIFIED: 'Optional: the small claims Standard Direction Order lists a dispute resolution hearing (DRH) instead of a small claims hearing. "Dispute resolution hearing" is chosen among the small claims directions, and civil-service fills in the DRH page apart from when witness statements are due (42 days away, 14 days before the hearing\'s first open date 56 days away). The DRH is checked on the case; the rest of the journey is unchanged. Needs TRACK=SMALL_CLAIM and the claim to reach CREATE_SDO. Has an API version.',
    },
  },
  HEARING_NOTICE_SCHEDULER: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional: civil-service\'s automated hearing notice scheduler lists the trial instead of the hearing centre admin\'s "Create a hearing notice". HMC is stubbed in WireMock to return a LISTED trial 40 working days ahead, the specified scheduler is run, and its NOTIFY_HEARING_PARTIES process sends the notice. The claim is checked to reach HEARING_READINESS with the hearing date, a hearing fee and a new hearing notice document; the rest of the journey is unchanged. Only on a civil-service PR preview (ENV=preview PREVIEW_SERVICE=service), the only environment where HMC is WireMock (WIREMOCK_URL, worked out from URL); anywhere else the admin\'s notice is used, with a warning, so the scheduler never runs against AAT\'s real HMC. Needs the claim to reach the hearing notice.',
      UNSPECIFIED: 'Optional: civil-service\'s automated hearing notice scheduler lists the trial instead of the hearing centre admin\'s "Create a hearing notice". HMC is stubbed in WireMock to return a LISTED trial 40 working days ahead, the unspecified scheduler is run, and its NOTIFY_HEARING_PARTIES process sends the notice. The claim is checked to reach HEARING_READINESS with the hearing date, a hearing fee and a new hearing notice document; the rest of the journey is unchanged. Only on a civil-service PR preview (ENV=preview PREVIEW_SERVICE=service), the only environment where HMC is WireMock (WIREMOCK_URL, worked out from URL); anywhere else the admin\'s notice is used, with a warning, so the scheduler never runs against AAT\'s real HMC. Needs the claim to reach the hearing notice.',
    },
  },
  NOT_SUITABLE_SDO: {
    values: Object.values(NotSuitableSdo),
    notes: {
      SPECIFIED: "Optional steps instead of the Standard Direction Order: the judge (the legal adviser for a small claim) decides the claim is not suitable for one. CHANGE_LOCATION sends it to another hearing centre, which the hearing centre admin transfers it to before the order is made there; OTHER_REASONS takes it offline. Needs the claim to reach CREATE_SDO (fast or small claims track, every defendant represented, the claimant's response taking it to JUDICIAL_REFERRAL or mediation, no default judgment). Has API versions.",
      UNSPECIFIED: 'Optional events instead of the Standard Direction Order: the judge claims the directions task and follows its "Not Suitable for SDO" link (the only way users reach it). CHANGE_LOCATION sends the claim to another hearing centre, which the hearing centre admin transfers it to with "Transfer online case" (the first London court in a fixed list that is not its current one) before the order is made there; OTHER_REASONS takes it offline (PROCEEDS_IN_HERITAGE_SYSTEM) and every later event is skipped apart from those that close the claim. Needs the claim to reach CREATE_SDO (fast or small claims track, no default judgment). Has API versions.',
    },
  },
  MEDIATION_SUCCESSFUL: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step: mediation settles a small claim, which stays the case (CASE_STAYED) and ends the journey, instead of mediation being unsuccessful.',
    },
  },
  UPLOAD_MEDIATION_DOCUMENTS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: "Optional steps: once mediation on a small claim has been unsuccessful, each solicitor uploads a non-attendance statement and a document referred to in it for every party they act for. Needs TRACK=SMALL_CLAIM, every defendant represented and the claimant's response taking the claim to mediation (the defaults), and cannot be used with MEDIATION_SUCCESSFUL or DEFAULT_JUDGMENT. Has an API version.",
    },
  },
  REQUEST_FOR_RECONSIDERATION: {
    values: Object.values(RequestForReconsiderationBy),
    notes: {
      SPECIFIED: "Optional steps: that party's solicitor asks for the legal adviser's small claims order to be reconsidered, and a judge decides it. Needs TRACK=SMALL_CLAIM, every defendant represented and the claimant's response taking the claim to mediation (the defaults), and cannot be used with MEDIATION_SUCCESSFUL or DEFAULT_JUDGMENT. DEFENDANT_2 needs CLAIM_TYPE=1v2DS.",
    },
  },
  RECONSIDERATION_DECISION: {
    values: Object.values(ReconsiderationDecision),
    default: ReconsiderationDecision.UPHOLD,
    notes: {
      SPECIFIED: 'What the judge decides on the request for reconsideration. Needs REQUEST_FOR_RECONSIDERATION.',
    },
  },
  ADD_CASE_NOTE: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step: the hearing centre admin adds a case note after the claim is issued.',
      UNSPECIFIED: 'Optional event: Hearing Centre Admin adds a case note after the claim is issued.',
    },
  },
  ADD_OR_AMEND_CLAIM_DOCUMENTS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Optional event: once the claim is issued, the claimant\'s solicitor uploads the particulars of claim with "Add or amend claim documents", which is only offered until the claim details are notified. The test checks they were saved. Notify claim details then serves them instead of asking for them again. Has an API version.',
    },
  },
  AMEND_PARTY_DETAILS: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step: once the defendants\' solicitors are assigned, the hearing centre admin changes the legal representatives\' email addresses with "Amend party details". Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
      UNSPECIFIED: 'Optional event: once Notify claim details has run, the hearing centre admin changes the legal representatives\' email addresses with "Amend party details": Defendant 1\'s solicitor\'s to the address they sign in with (the claim is created with a made-up one) and the claimant\'s solicitor\'s to theirs. The test checks they were saved. Skipped where Defendant 1 is a litigant in person or the claim went offline when notified. Has an API version.',
    },
  },
  ADD_UNAVAILABLE_DATES: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: "Optional steps: once the claimant's response has taken the claim to JUDICIAL_REFERRAL or IN_MEDIATION, each solicitor adds unavailable dates for the parties they represent, then the hearing centre admin adds some for the defendant (Defendants for 1v2SS, Defendant 2 for 1v2DS). Each run's dates are checked on the case. Cannot be used with DEFAULT_JUDGMENT. Has an API version.",
      UNSPECIFIED: 'Optional events: once the claimant\'s response has taken the claim to JUDICIAL_REFERRAL, each solicitor on the claim adds a single date and a date range their parties cannot attend a hearing ("Add Unavailable Dates"), which civil-service adds to every party they represent, then the hearing centre admin adds some for the defendant (Defendants for 1v2SS, Defendant 2 where the defendants are separate). Each run\'s dates are checked on the parties they were added to. Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
    },
  },
  INFORM_AGREED_EXTENSION: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: "Optional steps: each defendant's solicitor informs the court of an agreed extension before responding.",
      UNSPECIFIED: "Optional event: each defendant's solicitor informs the court of an agreed extension after acknowledging the claim.",
    },
  },
  DEFENDANT_LITIGATION_FRIEND: {
    values: yesNoValues,
    default: 'No',
    notes: {
      UNSPECIFIED: 'Optional event: each defendant\'s solicitor adds a litigation friend for the defendant they represent ("Add litigation friend") after acknowledging the claim, with a certificate of suitability. Where both defendants have the same solicitor (1v2SS), Defendant 1\'s solicitor chooses Both and one litigation friend is added for both. The saved litigation friends are checked against what was entered. Skipped for a defendant who is a LiP. Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
    },
  },
  STAY_CASE: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional steps: stay the case once it reaches JUDICIAL_REFERRAL, ask for an update and lift the stay.',
      UNSPECIFIED: "Optional events: stay the case, request an update and lift the stay, after the claimant's response.",
    },
  },
  SEND_AND_REPLY: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional steps: once the claim reaches JUDICIAL_REFERRAL, the hearing centre admin sends a district judge a message and the judge replies; while the case is stayed with STAY_CASE=Yes. Cannot be used with DEFAULT_JUDGMENT. Has an API version.',
      UNSPECIFIED: 'Optional events: once the claimant\'s response has taken the claim to JUDICIAL_REFERRAL, the hearing centre admin sends a district judge a message with "Send and reply to messages" and the judge replies. With STAY_CASE=Yes they run while the case is stayed, before the stay is lifted, as playwright-e2e does. The message and reply are checked on the case\'s messages. Cannot be used with DEFAULT_JUDGMENT. Has an API version (which does not complete the judge\'s "Review message" task, as XUI does).',
    },
  },
  DEFAULT_JUDGMENT: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: "Optional steps instead of the defendants responding: the response deadlines are moved to yesterday and the claimant's solicitor requests default judgment against every defendant, which records the judgment (All_FINAL_ORDERS_ISSUED, or JUDGMENT_REQUESTED with the judgment buffer). Cannot be used with INFORM_AGREED_EXTENSION, AMEND_PARTY_DETAILS, STAY_CASE, SEND_AND_REPLY, MEDIATION_SUCCESSFUL, REQUEST_FOR_RECONSIDERATION, CASE_FLAGS, MANAGE_CONTACT_INFORMATION, ADD_UNAVAILABLE_DATES or DISCONTINUE_CLAIM.",
      UNSPECIFIED: 'Optional events instead of the defendants responding: once Notify claim details has run, the response deadlines are moved to yesterday through civil-service\'s testing support, the claimant\'s solicitor requests default judgment against every defendant ("Request Default Judgment", the damages decided at a disposal hearing), which moves the claim to JUDICIAL_REFERRAL, and the judge makes the directions order after judgment ("Directions Order (Judgment)", a disposal hearing), which moves it to CASE_PROGRESSION. The defendants\' steps and everything after them are skipped, apart from SETTLE_CLAIM and DISCONTINUE_CLAIM. Cannot be used with INFORM_AGREED_EXTENSION, DEFENDANT_LITIGATION_FRIEND, STAY_CASE, SEND_AND_REPLY, CASE_FLAGS, MANAGE_CONTACT_INFORMATION, ADD_UNAVAILABLE_DATES or a claim type that goes offline when notified. Has an API version.',
    },
  },
  JUDGMENT_PAID_IN_FULL: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: "Optional step: the claimant's solicitor marks the judgment as paid in full. Needs DEFAULT_JUDGMENT=Yes or a judgment by admission (CLAIM_TYPE=1v1, a full or part admission paid by a set date or a repayment plan, which the claimant accepts). Has an API version.",
    },
  },
  REFER_JUDGE_DEFENCE_RECEIVED: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step: the hearing centre admin refers the claim to a judge as a defence was received in time. Needs the same judgment as JUDGMENT_PAID_IN_FULL. Has an API version.',
    },
  },
  SET_ASIDE_JUDGMENT: {
    values: Object.values(SetAsideJudgment),
    notes: {
      SPECIFIED: "Optional step: the hearing centre admin sets aside the default judgment, made in error or by a judge's order following an application or a defence received. Needs DEFAULT_JUDGMENT=Yes. Has an API version.",
    },
  },
  CASE_FLAGS: {
    valuesText: 'representative, or a list of holder:code[:detail] (checked by caseFlagSpecs.ts)',
    notes: {
      SPECIFIED: 'Optional steps: add flags once the claimant has responded, then make the first inactive (section 8). Holders: CASE, CLAIMANT_1, CLAIMANT_2, DEFENDANT_1, DEFENDANT_2. The detail is the language for an interpreter flag or the description for an OT0001 flag.',
      UNSPECIFIED: "Optional events: add flags after the claimant's response, then make the first inactive. Holders: CASE, CLAIMANT_1/2, DEFENDANT_1/2, CLAIMANT_1/2_LITIGATION_FRIEND, CLAIMANT_EXPERT_n, CLAIMANT_WITNESS_n, DEFENDANT_1/2_EXPERT_n, DEFENDANT_1/2_WITNESS_n. The detail is the language for an interpreter flag or the description for an OT0001 flag.",
    },
  },
  MANAGE_CONTACT_INFORMATION: {
    valuesText: 'representative, or a list of user:party (checked by manageContactInformationSpecs.ts)',
    notes: {
      SPECIFIED: 'Optional steps: Manage Contact Information once the claimant has responded, one run per entry, each checked against the saved case data (section 9). Users: admin, claimantSolicitor, respondent1Solicitor, respondent2Solicitor. Parties: CLAIMANT_1/2, DEFENDANT_1/2, each with _ORGANISATION_INDIVIDUALS, and CLAIMANT_1/DEFENDANT_1/DEFENDANT_2 with _LR_INDIVIDUALS; the admin can also add _WITNESSES or _EXPERTS. Has an API version.',
      UNSPECIFIED: "Optional events: Manage Contact Information after the claimant's response, one run per entry, each checked against the saved case data. Users: admin, claimantSolicitor, respondent1Solicitor, respondent2Solicitor (a solicitor only sees their own side). Parties: CLAIMANT_1/2, DEFENDANT_1/2, each with _LITIGATION_FRIEND or _ORGANISATION_INDIVIDUALS, and CLAIMANT_1/DEFENDANT_1/DEFENDANT_2 with _LR_INDIVIDUALS, _WITNESSES or _EXPERTS. A party's or litigation friend's email (and a party's first address line) is changed, an individual is added, and a witness or expert is added by the admin or the first one's email changed by a solicitor (set WITNESSES or EXPERTS). Has an API version.",
    },
  },
  NOTICE_OF_CHANGE: {
    valuesText: 'A list of CLAIMANT_1, DEFENDANT_1, DEFENDANT_2 (checked by noticeOfChangeSpecs.ts)',
    notes: {
      SPECIFIED: "Optional steps: a solicitor takes over each party with a notice of change (section 10). A LIP defendant gets the solicitor the represented claim type would have, and the journey carries on as that claim type. A represented party moves to a solicitor of another organisation, who runs that party's later steps. Has an API version.",
      UNSPECIFIED: "Optional steps: a solicitor takes over each party with a notice of change (see section 7). A LIP defendant gets the solicitor the represented claim type would have, and the journey carries on as that claim type. A represented party moves to a solicitor of another organisation, who runs that party's later steps. Has an API version.",
    },
  },
  NOTICE_OF_CHANGE_AFTER: {
    valuesText: "A step name (checked against the journey's steps)",
    default: { SPECIFIED: 'ASSIGN_DEFENDANT_SOLICITORS', UNSPECIFIED: 'NOTIFY_CLAIM_DETAILS' },
    notes: {
      SPECIFIED: 'The step the notices of change follow, for example RESPOND_TO_DEFENCE. A LIP can only be given a solicitor after ASSIGN_DEFENDANT_SOLICITORS.',
      UNSPECIFIED: 'The step the notices of change follow, for example RESPOND_TO_DEFENCE. A LIP can only be given a solicitor after NOTIFY_CLAIM_DETAILS.',
    },
  },
  GENERAL_APPLICATION: {
    valuesText: 'A list of application types (checked by generalApplicationSteps.ts)',
    notes: {
      SPECIFIED: "Optional steps: a solicitor makes a general application with these types and pays its fee, the other side responds where it is made with notice, and a judge, legal adviser or court staff approves it (section 12). The claim's state does not change. Has an API version.",
      UNSPECIFIED: 'Optional steps: a solicitor makes a general application with these types and pays its fee, the other side responds where it is made with notice, and a judge, legal adviser or court staff approves it (see "General applications" in section 7). The claim\'s state does not change. Has an API version.',
    },
  },
  GENERAL_APPLICATION_AFTER: {
    valuesText: "A step name (checked against the journey's steps)",
    default: 'RESPOND_TO_DEFENCE',
    notes: {
      SPECIFIED: 'The step the application follows. Not CREATE_CLAIM, or a step that closes the claim.',
      UNSPECIFIED: 'The step the application follows. Not CREATE_CLAIM, or a step that closes the claim.',
    },
  },
  GENERAL_APPLICATION_AGREED: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'The other side has agreed to the application, so it counts as made with notice. SETTLE_BY_CONSENT needs Yes.',
      UNSPECIFIED: 'The other side has agreed to the application. It then counts as made with notice, and an agreed application of some types (such as SETTLE_BY_CONSENT or a stay) is approved by court staff as a consent order. SETTLE_BY_CONSENT needs Yes.',
    },
  },
  GENERAL_APPLICATION_WITH_NOTICE: {
    values: yesNoValues,
    default: 'Yes',
    notes: {
      SPECIFIED: 'Where it is not agreed, whether the application is made with notice to the other side. Without notice, the other side does not respond.',
      UNSPECIFIED: 'Where it is not agreed, whether the application is made with notice to the other side. Without notice, the other side does not respond, and it goes straight to the court once paid.',
    },
  },
  GENERAL_APPLICATION_URGENT: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'The application is urgent, so it goes straight to the court once paid and the other side does not respond.',
      UNSPECIFIED: 'The application is urgent. It goes straight to the court once paid, even with notice, so the other side does not respond.',
    },
  },
  GENERAL_APPLICATION_BY: {
    values: ['claimant', 'defendant1', 'defendant2'],
    default: 'claimant',
    notes: {
      SPECIFIED: "Whose solicitor makes the application. defendant2 needs 1v2DS. The other parties' solicitors respond.",
      UNSPECIFIED: "Whose solicitor makes the application. defendant2 needs 1v2DS. The other parties' solicitors respond.",
    },
  },
  GENERAL_APPLICATION_REFER_TO_JUDGE: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'A legal adviser given the decision refers the application to a judge, who decides it.',
      UNSPECIFIED: 'A legal adviser given the decision refers the application to a judge, who decides it.',
    },
  },
  GENERAL_APPLICATION_SEND_TO_OTHER_PARTY: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'For an application made without notice (needs GENERAL_APPLICATION_WITH_NOTICE=No, not agreed, not urgent): the judge or legal adviser first sends it to the other side, the applicant pays the extra fee, and the other side responds before it is decided.',
      UNSPECIFIED: 'For an application made without notice (needs GENERAL_APPLICATION_WITH_NOTICE=No, not agreed, not urgent): the judge or legal adviser first sends it to the other side, the applicant pays the extra fee, and the other side responds before it is decided.',
    },
  },
  GENERAL_APPLICATION_DECISION: {
    values: Object.values(GaDecision),
    default: GaDecision.APPROVE,
    notes: {
      SPECIFIED: "What the judge or legal adviser decides: approve the order sought, ask the applicant for more information (by a date a week away), which the applicant's solicitor then gives by uploading a document, or list the application for a 15 minute video hearing, which court staff then schedule. Has an API version.",
      UNSPECIFIED: "What the judge or legal adviser decides: approve the order sought, ask the applicant for more information (by a date a week away), which the applicant's solicitor then gives by uploading a document, or list the application for a 15 minute video hearing, which court staff then schedule. Has an API version.",
    },
  },
  QUERY_MANAGEMENT: {
    valuesText: 'A list of claimant, defendant1, defendant2 (checked by queryManagementSteps.ts)',
    notes: {
      SPECIFIED: 'Optional steps: each solicitor raises a query and a CTSC admin answers it (section 11). Has an API version.',
      UNSPECIFIED: 'Optional steps: each solicitor raises a query and a CTSC admin answers it (see section 7). Has an API version.',
    },
  },
  QUERY_MANAGEMENT_AFTER: {
    valuesText: "A step name (checked against the journey's steps)",
    default: 'RESPOND_TO_DEFENCE',
    notes: {
      SPECIFIED: "The step the queries follow. A defendant's solicitor can only raise one after ASSIGN_DEFENDANT_SOLICITORS.",
      UNSPECIFIED: "The step the queries follow. A defendant's solicitor can only raise one once they have acknowledged the claim.",
    },
  },
  QUERY_MANAGEMENT_HEARING_RELATED: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'The queries are about a hearing, ten days from today.',
      UNSPECIFIED: 'The queries are about a hearing, ten days from today.',
    },
  },
  QUERY_MANAGEMENT_FOLLOW_UP: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Each solicitor asks a follow-up question once CTSC has answered, which CTSC answers too.',
      UNSPECIFIED: 'Each solicitor asks a follow-up question once CTSC has answered, which CTSC answers too.',
    },
  },
  REFUND: {
    values: refundOutcomes,
    notes: {
      SPECIFIED: 'Optional steps: a refund of a second payment of the claim fee, which the approver approves, rejects, or returns to be changed before approving it (section 13). Always in the UI, apart from the second payment.',
      UNSPECIFIED: "Optional steps: the claim fee is paid again and the claimant's solicitor asks for it back; the approver approves, rejects, or returns it to be changed and sent again before approving it (see section 7). Always in the UI, apart from the second payment.",
    },
  },
  REFUND_AFTER: {
    valuesText: "A step name (checked against the journey's steps)",
    default: 'CREATE_CLAIM',
    notes: {
      SPECIFIED: 'The step the refund follows.',
      UNSPECIFIED: 'The step the refund follows.',
    },
  },
  SETTLE_CLAIM: {
    values: Object.values(SettleClaim),
    notes: {
      SPECIFIED: 'Optional step, once the rest of the journey has run or where it is stopped: the claimant\'s solicitor marks the claim paid in full with "Settle this claim", which stays the case (CASE_STAYED), or the hearing centre admin records it settled after a judge\'s order or a consent order (CASE_SETTLED).',
      UNSPECIFIED: 'Optional event, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it. MARK_PAID_IN_FULL: the claimant\'s solicitor marks the claim paid in full with "Settle this claim", which stays the case (CASE_STAYED); with two claimants it is for both. JUDGE_ORDER or CONSENT_ORDER: the hearing centre admin records with court staff\'s "Settle this claim" that the claim settled for that reason (CASE_SETTLED). Has an API version.',
    },
  },
  DISCONTINUE_CLAIM: {
    values: Object.values(DiscontinueClaim),
    notes: {
      SPECIFIED: "Optional steps, once the rest of the journey has run or where it is stopped: the claimant's solicitor fully discontinues the claim, without the court's permission (CASE_DISCONTINUED) or with a judge's permission, which the hearing centre admin then validates (CASE_DISCONTINUED).",
      UNSPECIFIED: 'Optional events, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it: the claimant\'s solicitor fully discontinues the claim with "Discontinue this claim", for every claimant and against every defendant. NO_PERMISSION_NEEDED: the court\'s permission is not needed, so the claim is discontinued (CASE_DISCONTINUED). PERMISSION_GRANTED: a judge gave permission today, and the hearing centre admin then validates the discontinuance, which discontinues the claim. Not offered once the final orders are issued or while the case is stayed. Has an API version.',
    },
  },
  CASE_PROCEEDS_IN_CASEMAN: {
    values: { SPECIFIED: Object.values(CaseProceedsInCaseman), UNSPECIFIED: Object.values(CaseProceedsInCaseman).filter((reason) => reason !== CaseProceedsInCaseman.DEFENDANT_DOES_NOT_CONSENT) },
    notes: {
      SPECIFIED: 'Optional step, once the rest of the journey has run or where it is stopped: the hearing centre admin takes the claim offline with "Case proceeds in Caseman" for this reason (DEFENDANT_DOES_NOT_CONSENT: the defendant\'s solicitor does not consent to accept service through MyHMCTS), which moves it to PROCEEDS_IN_HERITAGE_SYSTEM. Cannot be used with SETTLE_CLAIM or DISCONTINUE_CLAIM.',
      UNSPECIFIED: 'Optional event, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it: the hearing centre admin takes the claim offline with "Case proceeds in Caseman", giving today as the date it was transferred to Caseman and this as the reason for proceeding on paper (OTHER adds a reason as text). civil-service moves the claim to PROCEEDS_IN_HERITAGE_SYSTEM. Skipped where the claim has already gone offline. Cannot be used with SETTLE_CLAIM or DISCONTINUE_CLAIM. Has an API version.',
    },
  },
  DISMISS_CASE: {
    values: yesNoValues,
    default: 'No',
    notes: {
      SPECIFIED: 'Optional step, once the rest of the journey has run or where it is stopped: the hearing centre admin dismisses the case with "Dismiss case", which moves it to CASE_DISMISSED. Cannot be used with SETTLE_CLAIM, DISCONTINUE_CLAIM or CASE_PROCEEDS_IN_CASEMAN. Has an API version.',
      UNSPECIFIED: 'Optional event, once the rest of the journey has run or where STOP_AT_STATE or STOP_AFTER_TEST stops it: the hearing centre admin dismisses the case with "Dismiss case", which moves it to CASE_DISMISSED and tells the parties. It is offered in the same states as "Settle this claim", but not CASE_STAYED. Cannot be used with SETTLE_CLAIM, DISCONTINUE_CLAIM or CASE_PROCEEDS_IN_CASEMAN. Has an API version.',
    },
  },
} satisfies Record<string, Setting>;

export type SettingName = keyof typeof settings;

const journeyLabel: Record<Journey, string> = { SPECIFIED: 'specified', UNSPECIFIED: 'unspecified' };

function setting(name: SettingName): Setting {
  return settings[name];
}

// The journeys a setting is for
export function settingJourneys(name: SettingName): Journey[] {
  return Object.keys(setting(name).notes) as Journey[];
}

// The values a setting takes in a journey, or undefined for a setting with no list of values
export function settingValues(name: SettingName, journey: Journey): readonly string[] | undefined {
  const { values } = setting(name);
  return values === undefined || Array.isArray(values) ? (values as readonly string[] | undefined) : (values as PerJourney<readonly string[]>)[journey];
}

// A setting's default in a journey, or undefined for a setting that is off when it is not set
export function settingDefault(name: SettingName, journey: Journey): string | undefined {
  const value = setting(name).default;
  if (typeof value === 'object') {
    return value[journey];
  }
  return value as string | undefined;
}

// Why a value is not one a setting takes in a journey, or undefined when it is
function valueProblem(name: SettingName, journey: Journey, value: string): string | undefined {
  const values = settingValues(name, journey);
  if (values !== undefined) {
    return values.includes(value) ? undefined : `Invalid ${name} value: ${value}. It must be one of ${values.join(', ')}.`;
  }
  const problem = setting(name).check?.(value);
  return problem === undefined ? undefined : `Invalid ${name} value: ${value}. ${problem}`;
}

// An empty value counts as not set
function isSet(value: string | undefined): value is string {
  return value !== undefined && value !== '';
}

// What is wrong with a journey's settings: values the settings do not take, and, for a scenario, the names it sets
// (scenarioSettings, the keys of its env in scenarios/*.ts) that are not settings or are only for the other journey.
// Names set on the command line are not checked, as they come with every other env var.
export function settingProblems(journey: Journey, env: Record<string, string | undefined>, scenarioSettings: string[] = []): string[] {
  const problems: string[] = [];
  for (const name of scenarioSettings) {
    if (!(name in settings)) {
      problems.push(`${name} is not a setting of the journeys. Check the name against the settings in e2e/journey/settings.ts.`);
    } else if (!settingJourneys(name as SettingName).includes(journey)) {
      const others = settingJourneys(name as SettingName).map((other) => journeyLabel[other]).join(' and ');
      problems.push(`${name} is only a setting of the ${others} journey, so the ${journeyLabel[journey]} journey would ignore it.`);
    }
  }
  for (const name of Object.keys(settings) as SettingName[]) {
    const value = env[name];
    if (settingJourneys(name).includes(journey) && isSet(value)) {
      const problem = valueProblem(name, journey, value);
      if (problem !== undefined) {
        problems.push(problem);
      }
    }
  }
  return problems;
}

// Reads a journey's settings from its env: get gives a setting's value, or its default when it is not set or its value
// is not one it takes (which settingProblems reports before the journey starts), and yes whether a Yes/No setting is
// Yes
export function journeySettings(journey: Journey, env: Record<string, string | undefined>) {
  const get = (name: SettingName): string | undefined => {
    const value = env[name];
    return isSet(value) && valueProblem(name, journey, value) === undefined ? value : settingDefault(name, journey);
  };
  return {
    get,
    yes: (name: SettingName): yesNo => (get(name) === 'Yes' ? yesNo.YES : yesNo.NO),
  };
}
