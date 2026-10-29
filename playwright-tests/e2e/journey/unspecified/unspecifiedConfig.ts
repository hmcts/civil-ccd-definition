import { expect } from '@playwright/test';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import yesNo from '../../../enums/yesNo.ts';
import PaymentMethod from '../../../enums/paymentMethod.ts';
import claimTypes from '../../../enums/claim-types.ts';
import unspecClaimTypes from '../../../enums/unspecClaimTypes.ts';
import personalInjuryTypes from '../../../enums/personalInjuryTypes.ts';
import claimTrack from '../../../enums/track.ts';
import environment from '../../../enums/environment.ts';
import notifyClaimOptions from '../../../enums/notifyClaimOptions.ts';
import responseIntentions from '../../../enums/ResponseIntention.ts';
import respondentResponses from '../../../enums/RespondentResponses.ts';
import FinalOrder, { finalOrdersForTrack } from '../../../enums/finalOrders.ts';
import SettleClaim from '../../../enums/settleClaim.ts';
import DiscontinueClaim from '../../../enums/discontinueClaim.ts';
import fixedRecoveryCostsBands from '../../../enums/fixedRecoveryCostsBands.ts';
import languageSpokenAndDocuments from '../../../enums/languageSpokenAndDocuments.ts';
import caseStates from '../../../enums/caseStates.ts';
import { caseFlagsProblem } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { mciProblem } from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';
import { defaultNocAfterStep, nocProblem } from '../../flows/events/shared_api_ui/noticeOfChangeSpecs.ts';
import { createClaimShape } from '../../flows/createClaimShape.ts';

export type UnspecifiedConfig = ReturnType<typeof unspecifiedConfig>;

// The settings of one unspecified journey, read from its scenario's env vars, and what follows from them: which claim
// types skip which steps, and the state the claim is expected to reach after each response.
export function unspecifiedConfig(scenarioEnv: Record<string, string | undefined>) {
  const env = cleanEnv({
    PAYMENT_METHOD: enums({
      values: [PaymentMethod.PBA, PaymentMethod.CARD],
      default: PaymentMethod.PBA,
    }),
    CLAIM_TYPE: enums({
      values: [
        claimTypes.ONE_VS_ONE_LIP,
        claimTypes.TWO_VS_ONE_LIP,
        claimTypes.ONE_VS_TWO_LIPS,
        claimTypes.ONE_VS_TWO_LR_LIP,
        claimTypes.ONE_VS_TWO_LIP_LR,
        claimTypes.ONE_VS_ONE,
        claimTypes.TWO_VS_ONE,
        claimTypes.ONE_VS_TWO_SAME_SOL,
        claimTypes.ONE_VS_TWO_DIFF_SOL,
      ] as const,
      default: claimTypes.ONE_VS_ONE,
    }),
    ENVIRONMENT: enums({
      values: [
        environment.AAT,
        environment.DEMO,
        environment.ITHC,
        environment.PREVIEW,
        environment.PERFTEST,
      ],
      default: environment.PREVIEW,
    }),
    DEFENDANTS_TO_NOTIFY_CLAIM: enums({
      values: [notifyClaimOptions.BOTH, notifyClaimOptions.DEFENDANT1, notifyClaimOptions.DEFENDANT2],
      default: notifyClaimOptions.BOTH,
    }),
    DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS: enums({
      values: [notifyClaimOptions.BOTH, notifyClaimOptions.DEFENDANT1, notifyClaimOptions.DEFENDANT2],
      default: notifyClaimOptions.BOTH,
    }),
    RESPONDENT1_RESPONSE_INTENTION: enums({
      values: [
        responseIntentions.FULL_DEFENCE,
        responseIntentions.PART_DEFENCE,
        responseIntentions.CONTEST_JURISDICTION,
      ],
      default: responseIntentions.FULL_DEFENCE,
    }),
    RESPONDENT2_RESPONSE_INTENTION: enums({
      values: [
        responseIntentions.FULL_DEFENCE,
        responseIntentions.PART_DEFENCE,
        responseIntentions.CONTEST_JURISDICTION,
      ],
      default: responseIntentions.FULL_DEFENCE,
    }),
    RESPONDENT1_RESPONSE: enums({
      values: [
        respondentResponses.FULL_DEFENCE,
        respondentResponses.FULL_ADMISSION,
        respondentResponses.PART_ADMISSION,
        respondentResponses.COUNTER_CLAIM
      ],
      default: respondentResponses.FULL_DEFENCE
    }),
    RESPONDENT2_RESPONSE: enums({
      values: [
        respondentResponses.FULL_DEFENCE,
        respondentResponses.FULL_ADMISSION,
        respondentResponses.PART_ADMISSION,
        respondentResponses.COUNTER_CLAIM
      ],
      default: respondentResponses.FULL_DEFENCE
    }),
    // Whether the claimant proceeds with the claim when responding to the defence. 2v1 and 1v2 claims ask twice:
    //  - 1v1: CLAIMANT_PROCEED_1 is the claimant's answer (CLAIMANT_PROCEED_2 is not used)
    //  - 2v1: CLAIMANT_PROCEED_1 is Claimant 1's answer and CLAIMANT_PROCEED_2 is Claimant 2's
    //  - 1v2SS / 1v2DS: CLAIMANT_PROCEED_1 is against Defendant 1 and CLAIMANT_PROCEED_2 is against Defendant 2
    CLAIMANT_PROCEED_1: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES
    }),
    CLAIMANT_PROCEED_2: enums({
      values: [yesNo.YES, yesNo.NO],
      default: yesNo.YES
    }),
    FIXED_RECOVERY_COSTS_BAND: enums({
      values: [
        fixedRecoveryCostsBands.BAND1,
        fixedRecoveryCostsBands.BAND2,
        fixedRecoveryCostsBands.BAND3,
        fixedRecoveryCostsBands.BAND4
      ],
      default: fixedRecoveryCostsBands.BAND1
    }),
  }, { env: scenarioEnv });

  const yes = (value: string | undefined): yesNo => (value === 'Yes' ? yesNo.YES : yesNo.NO);
  const partyType = (value: string | undefined): string =>
    ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(value) ? value : 'INDIVIDUAL';

  const claimType: claimTypes = env.CLAIM_TYPE;
  const respondent1Response: respondentResponses = env.RESPONDENT1_RESPONSE;
  const respondent2Response: respondentResponses = env.RESPONDENT2_RESPONSE;
  const claimantProceed1: yesNo = env.CLAIMANT_PROCEED_1;
  const claimantProceed2: yesNo = env.CLAIMANT_PROCEED_2;
  // A personal injury claim from a road accident unless TYPE_OF_CLAIM (and, for personal injury, SUB_TYPE) is set
  const typeOfClaim = scenarioEnv.TYPE_OF_CLAIM ?? unspecClaimTypes.PERSONAL_INJURY;
  const typeOfClaimSubType: string = scenarioEnv.SUB_TYPE
    ?? (typeOfClaim === unspecClaimTypes.PERSONAL_INJURY ? personalInjuryTypes.ROAD_ACCIDENT : undefined);
  const defendantsToNotifyClaim: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM;
  const defendantsToNotifyClaimDetails: notifyClaimOptions = env.DEFENDANTS_TO_NOTIFY_CLAIM_DETAILS;
  // Notifying only one defendant takes the claim offline, so no later events can be done online
  const claimOfflineAfterNotifyClaim = defendantsToNotifyClaim !== notifyClaimOptions.BOTH;
  const claimOfflineAfterNotifyClaimDetails =
    claimOfflineAfterNotifyClaim || defendantsToNotifyClaimDetails !== notifyClaimOptions.BOTH;
  // Once every defendant has responded, the claim moves on to the claimant's intention if all responses are a full
  // defence and goes offline otherwise.
  const responsesForClaimType = [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR, claimTypes.TWO_VS_ONE].includes(claimType)
    ? [respondent1Response, respondent2Response]
    : [respondent1Response];
  const stateAfterAllResponses = responsesForClaimType.every((response) => response === respondentResponses.FULL_DEFENCE)
    ? caseStates.AWAITING_APPLICANT_INTENTION
    : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;
  // Claim types with no litigant in person, where the claimant solicitor responds to the defence once every defendant
  // has entered a full defence. The claim moves to JUDICIAL_REFERRAL only if every claimant proceeds against every
  // defendant. Not proceeding, or proceeding against only some of them, takes the claim offline.
  const claimantResponseClaimTypes = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL];
  const claimantProceedsWithWholeClaim = claimType === claimTypes.ONE_VS_ONE
    ? claimantProceed1 === yesNo.YES
    : claimantProceed1 === yesNo.YES && claimantProceed2 === yesNo.YES;
  const stateAfterClaimantResponse = claimantProceedsWithWholeClaim
    ? caseStates.JUDICIAL_REFERRAL
    : caseStates.PROCEEDS_IN_HERITAGE_SYSTEM;

  const track: claimTrack = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(scenarioEnv.TRACK) ? (scenarioEnv.TRACK as claimTrack) : claimTrack.FAST;
  // Noise induced hearing loss claims are always on the fast track (checked in validate), get their own Standard
  // Direction Order directions, and their own work allocation task for it
  const noiseInducedHearingLoss: boolean =
    typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS;
  const sdoTaskType: string = noiseInducedHearingLoss ? 'NIHLFastTrackDirections' : 'FastTrackDirections';
  // The judge's final order (FINAL_ORDER). If it is not set, the first order the track offers is made: a free form order
  // on the small and fast tracks, the blank after-hearing template on the intermediate and multi tracks.
  const finalOrder: FinalOrder = (scenarioEnv.FINAL_ORDER as FinalOrder) ?? finalOrdersForTrack[track][0];
  const noOfExperts: string = scenarioEnv.EXPERTS ?? '0';
  const noOfWitnesses: string = scenarioEnv.WITNESSES ?? '0';

  const claimantType = partyType(scenarioEnv.CLAIMANT_TYPE);
  const defendantType = partyType(scenarioEnv.DEFENDANT_TYPE);
  const claimant1LitigantFriend = yes(scenarioEnv.CLAIMANT1_LITIGANT_FRIEND);
  const claimant2LitigantFriend = yes(scenarioEnv.CLAIMANT2_LITIGANT_FRIEND);

  const config = {
    // The scenario's env vars, from which the journey works out its settings for the claim type it carries on as once
    // a notice of change has given each litigant in person a solicitor (see unspecifiedSteps)
    scenarioEnv,
    claimType,
    caseType: 'UNSPECIFIED',
    claimantType,
    defendantType,
    // The parties to the claim and who represents them, which creating the claim follows (through the UI or the API)
    claimShape: createClaimShape(claimType, claimantType, defendantType, [claimant1LitigantFriend, claimant2LitigantFriend]),
    typeOfClaim,
    typeOfClaimSubType,
    track,
    noiseInducedHearingLoss,
    sdoTaskType,
    finalOrder,
    respondent1ResponseIntention: env.RESPONDENT1_RESPONSE_INTENTION as responseIntentions,
    respondent2ResponseIntention: env.RESPONDENT2_RESPONSE_INTENTION as responseIntentions,
    respondent1Response,
    respondent2Response,
    claimantProceed1,
    claimantProceed2,
    fixedRecoverableCosts: yes(scenarioEnv.FIXED_RECOVERABLE_COSTS),
    fixedRecoveryCostsBand: env.FIXED_RECOVERY_COSTS_BAND as fixedRecoveryCostsBands,
    claimant1LitigantFriend,
    claimant2LitigantFriend,
    determinationWithoutHearing: yes(scenarioEnv.DETERMINATION_WITHOUT_HEARING),
    oneMonthStay: yes(scenarioEnv.ONE_MONTH_STAY),
    preActionProtocol: yes(scenarioEnv.ONE_MONTH_STAY),
    noOfExperts,
    noOfWitnesses,
    language: ['WELSH', 'ENGLISH', 'BOTH'].includes(scenarioEnv.LANGUAGE) ? (scenarioEnv.LANGUAGE as languageSpokenAndDocuments) : languageSpokenAndDocuments.ENGLISH,
    unavailableDatesRequired: yes(scenarioEnv.UNAVAILABLE_DATES),
    // How the claimant's solicitor pays the claim fee and the hearing fee: from their PBA account (PAYMENT_METHOD=PBA,
    // the default) or by card (CARD), which is always done in the UI, even when the claim is created through the API
    paymentMethod: env.PAYMENT_METHOD as PaymentMethod,
    // Whether the hearing centre admin adds a case note straight after the claim is issued (ADD_CASE_NOTE=Yes,
    // default No)
    addCaseNote: yes(scenarioEnv.ADD_CASE_NOTE),
    // Whether the hearing centre admin stays the case after the claimant's response, asks for an update and lifts the
    // stay (STAY_CASE=Yes, default No)
    stayCase: yes(scenarioEnv.STAY_CASE),
    // Whether and how the claim is settled with "Settle this claim" once the rest of the journey has run: the
    // claimant's solicitor marks it paid in full (SETTLE_CLAIM=MARK_PAID_IN_FULL), which stays the case, or court staff
    // record it settled after a judge's order (JUDGE_ORDER) or a consent order (CONSENT_ORDER). Not settled by default.
    settleClaim: scenarioEnv.SETTLE_CLAIM as SettleClaim | undefined,
    // Whether the claimant's solicitor fully discontinues the claim with "Discontinue this claim" once the rest of the
    // journey has run: without needing the court's permission (DISCONTINUE_CLAIM=NO_PERMISSION_NEEDED), or with a
    // judge's permission (PERMISSION_GRANTED), which court staff then validate. Not discontinued by default.
    discontinueClaim: scenarioEnv.DISCONTINUE_CLAIM as DiscontinueClaim | undefined,
    // Whether the claimant's solicitor asks for default judgment once the claim is waiting for the defendants: the
    // response deadlines are moved to yesterday, as if the time for responding had passed, and the steps for the
    // defendants' responses and everything after them are skipped, apart from settling or discontinuing the claim
    // (DEFAULT_JUDGMENT=Yes, default No)
    defaultJudgment: yes(scenarioEnv.DEFAULT_JUDGMENT),
    // Whether each defendant's solicitor informs the court of an agreed 28 day extension to respond, after
    // acknowledging the claim (INFORM_AGREED_EXTENSION=Yes, default No)
    informAgreedExtension: yes(scenarioEnv.INFORM_AGREED_EXTENSION),
    // The case flags the hearing centre admin adds after the claimant's response, and then makes the first one inactive
    // (CASE_FLAGS: "representative", or a list such as CASE:CF0002,DEFENDANT_1:RA0012; see caseFlagSpecs.ts)
    caseFlagsSetting: scenarioEnv.CASE_FLAGS,
    // Who updates which contact details after the claimant's response, each a run of Manage Contact Information
    // (MANAGE_CONTACT_INFORMATION: "representative", or a list such as admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1;
    // see manageContactInformationSpecs.ts)
    manageContactInformationSetting: scenarioEnv.MANAGE_CONTACT_INFORMATION,
    // The parties a solicitor takes over with a notice of change (NOTICE_OF_CHANGE: a list such as
    // DEFENDANT_1,CLAIMANT_1). A defendant who is a litigant in person gets a solicitor, who then acknowledges and
    // responds to the claim; a represented party moves to a solicitor of another organisation, who runs their later
    // steps. See noticeOfChangeSpecs.ts.
    noticeOfChangeSetting: scenarioEnv.NOTICE_OF_CHANGE,
    // The step the notices of change are given after (NOTICE_OF_CHANGE_AFTER, default NOTIFY_CLAIM_DETAILS), such as
    // RESPOND_TO_DEFENCE to change solicitors once the claim reaches JUDICIAL_REFERRAL
    noticeOfChangeAfter: scenarioEnv.NOTICE_OF_CHANGE_AFTER ?? defaultNocAfterStep,
    defendantsToNotifyClaim,
    defendantsToNotifyClaimDetails,
    claimOfflineAfterNotifyClaim,
    claimOfflineAfterNotifyClaimDetails,
    stateAfterAllResponses,
    claimantResponseClaimTypes,
    stateAfterClaimantResponse,
    // Claim types where Defendant 1 has a solicitor, who acknowledges and responds to the claim
    defendant1SolicitorClaimTypes: [
      claimTypes.ONE_VS_ONE,
      claimTypes.ONE_VS_TWO_SAME_SOL,
      claimTypes.ONE_VS_TWO_DIFF_SOL,
      claimTypes.TWO_VS_ONE,
      claimTypes.ONE_VS_TWO_LR_LIP,
    ],
    // Claim types where Defendant 2 has their own solicitor, who acknowledges and responds separately
    defendant2OwnSolicitorClaimTypes: [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_LIP_LR],
    // In these claims the two defendants respond separately, in either order, and the claim waits in
    // AWAITING_RESPONDENT_ACKNOWLEDGEMENT until both have responded.
    //  - 1v2DS: each defendant's solicitor responds.
    //  - 1v2LRLIP: Defendant 1's solicitor responds. Defendant 2 is a litigant in person, who cannot respond online in
    //    an unspecified claim, so the claim keeps waiting unless they appoint a solicitor who responds for them.
    //  - 1v2LIPLR: no defendant responds. Defendant 1 is a litigant in person, and Defendant 2's solicitor's response
    //    is skipped, so the claim stays in AWAITING_RESPONDENT_ACKNOWLEDGEMENT.
    separateResponseClaimTypes: [claimTypes.ONE_VS_TWO_DIFF_SOL, claimTypes.ONE_VS_TWO_LR_LIP, claimTypes.ONE_VS_TWO_LIP_LR],

    // Checks the settings make sense together, before the journey starts
    validate() {
      expect(
        [undefined, ...Object.values(SettleClaim)],
        `Invalid SETTLE_CLAIM value: ${scenarioEnv.SETTLE_CLAIM}. It must be one of ${Object.values(SettleClaim).join(', ')}.`,
      ).toContain(scenarioEnv.SETTLE_CLAIM);
      expect(
        [undefined, ...Object.values(DiscontinueClaim)],
        `Invalid DISCONTINUE_CLAIM value: ${scenarioEnv.DISCONTINUE_CLAIM}. It must be one of ${Object.values(DiscontinueClaim).join(', ')}.`,
      ).toContain(scenarioEnv.DISCONTINUE_CLAIM);
      expect(
        [undefined, 'Yes', 'No'],
        `Invalid DEFAULT_JUDGMENT value: ${scenarioEnv.DEFAULT_JUDGMENT}. It must be Yes or No.`,
      ).toContain(scenarioEnv.DEFAULT_JUDGMENT);
      expect(
        scenarioEnv.SETTLE_CLAIM === undefined || scenarioEnv.DISCONTINUE_CLAIM === undefined,
        'SETTLE_CLAIM and DISCONTINUE_CLAIM cannot both be set: a claim is either settled or discontinued.',
      ).toBeTruthy();
      expect(
        Object.values(unspecClaimTypes),
        `Invalid TYPE_OF_CLAIM value: ${typeOfClaim}. It must be one of ${Object.values(unspecClaimTypes).join(', ')}.`,
      ).toContain(typeOfClaim);
      if (typeOfClaim === unspecClaimTypes.PERSONAL_INJURY) {
        expect(
          Object.values(personalInjuryTypes),
          `Invalid SUB_TYPE value: ${typeOfClaimSubType}. It must be one of ${Object.values(personalInjuryTypes).join(', ')}.`,
        ).toContain(typeOfClaimSubType);
      }

      if (noiseInducedHearingLoss) {
        expect(
          track,
          `Invalid claim track: ${track} used for type: ${typeOfClaim} and sub type: ${typeOfClaimSubType} combination. Either do not specify a track or set the track to FAST_CLAIM.`,
        ).toEqual(claimTrack.FAST);
      }

      expect(noOfExperts, `Invalid EXPERTS value: ${noOfExperts}. It must be an integer.`).toMatch(/^\d+$/);
      expect(Number(noOfExperts), `Invalid EXPERTS value: ${noOfExperts}. It must be >= 0.`).toBeGreaterThanOrEqual(0);
      expect(noOfWitnesses, `Invalid WITNESSES value: ${noOfWitnesses}. It must be an integer.`).toMatch(/^\d+$/);
      expect(Number(noOfWitnesses), `Invalid WITNESSES value: ${noOfWitnesses}. It must be >= 0.`).toBeGreaterThanOrEqual(0);

      expect(
        Object.values(FinalOrder),
        `Invalid FINAL_ORDER value: ${finalOrder}. It must be one of ${Object.values(FinalOrder).join(', ')}.`,
      ).toContain(finalOrder);
      expect(
        finalOrdersForTrack[track],
        `Invalid FINAL_ORDER value: ${finalOrder} for track ${track}. The ${track} track offers ${finalOrdersForTrack[track].join(', ')}.`,
      ).toContain(finalOrder);

      const caseFlagsError = caseFlagsProblem(config);
      expect(caseFlagsError, caseFlagsError).toBeUndefined();

      const mciError = mciProblem(config);
      expect(mciError, mciError).toBeUndefined();

      const nocError = nocProblem(config);
      expect(nocError, nocError).toBeUndefined();
    },
  };
  return config;
}
