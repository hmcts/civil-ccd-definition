import claimTypes from '../../../../../enums/claim-types.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import { claimantSolicitorCredentials } from '../../../../../civilConfig.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';
import { DirectionsQuestionnaireAnswers } from '../../ui/DirectionsQuestionnaire.ts';
import { buildDirectionsQuestionnaire } from './directionsQuestionnaire.ts';

type Document = Record<string, string>;

// The documents the claimant's response uploads: the response to the defence (and, where asked for, a separate one to
// Defendant 2), and the draft directions for the directions questionnaire
export interface ClaimantResponseDocuments {
  defenceResponse: Document;
  defenceResponseToDefendant2: Document;
  draftDirections: Document;
}

// The answers to the proceed questions, and the flags the Respondent response page's mid event callback
// (set-applicants-proceed-intention) sets from them, which decide the following pages
export interface ProceedAnswers {
  answers: Record<string, yesNo>;
  applicantsProceedIntention: yesNo;
  claimantResponseDocumentToDefendant2Flag: yesNo;
  claimant2ResponseFlag: yesNo;
}

// Proceed with the claim. proceed1 and proceed2 depend on the claim type, as in the UI's RespondToDefence:
//  - 1v1: proceed1 is the claimant's answer (proceed2 is not used)
//  - 2v1: proceed1 is Claimant 1's answer and proceed2 is Claimant 2's
//  - 1v2SS / 1v2DS: proceed1 is against Defendant 1 and proceed2 is against Defendant 2
export function proceedAnswers(c: UnspecifiedConfig): ProceedAnswers {
  const proceed1 = c.claimantProceed1;
  const proceed2 = c.claimantProceed2;
  const answers: Record<string, yesNo> = (() => {
    switch (c.claimType) {
      case claimTypes.TWO_VS_ONE:
        return { applicant1ProceedWithClaimMultiParty2v1: proceed1, applicant2ProceedWithClaimMultiParty2v1: proceed2 };
      case claimTypes.ONE_VS_TWO_SAME_SOL:
      case claimTypes.ONE_VS_TWO_DIFF_SOL:
        return {
          applicant1ProceedWithClaimAgainstRespondent1MultiParty1v2: proceed1,
          applicant1ProceedWithClaimAgainstRespondent2MultiParty1v2: proceed2,
        };
      default:
        return { applicant1ProceedWithClaim: proceed1 };
    }
  })();
  const yesIf = (condition: boolean) => (condition ? yesNo.YES : yesNo.NO);
  return {
    answers,
    applicantsProceedIntention: yesIf(Object.values(answers).includes(yesNo.YES)),
    claimantResponseDocumentToDefendant2Flag: yesIf(
      proceed2 === yesNo.YES
      && (c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL || (c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL && proceed1 === yesNo.NO)),
    ),
    claimant2ResponseFlag: yesIf(c.claimType === claimTypes.TWO_VS_ONE && proceed2 === yesNo.YES && proceed1 === yesNo.NO),
  };
}

// The case data for CLAIMANT_RESPONSE, as the UI's RespondToDefence submits it. startCaseData is the case data CCD
// returned when the event was started, which holds the hidden fields the about to start callback sets and the
// defendants' defence documents it shows for preview.
export function buildClaimantResponsePayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  answers: DirectionsQuestionnaireAnswers,
  documents: ClaimantResponseDocuments,
): Record<string, any> {
  const proceed = proceedAnswers(c);
  const isOneVsTwo = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL || c.claimType === claimTypes.ONE_VS_TWO_DIFF_SOL;
  // In a 2v1 claim where only Claimant 2 proceeds, Claimant 2 answers the DQ. Otherwise Claimant 1 answers it.
  const claimant2Dq = proceed.claimant2ResponseFlag === yesNo.YES;
  return {
    ...keptFromStart(startCaseData),
    ...proceed.answers,
    applicantsProceedIntention: proceed.applicantsProceedIntention,
    claimantResponseDocumentToDefendant2Flag: proceed.claimantResponseDocumentToDefendant2Flag,
    claimant2ResponseFlag: proceed.claimant2ResponseFlag,
    ...(proceed.applicantsProceedIntention === yesNo.YES
      ? {
        // In a 1v2 claim the main response document is only asked for when proceeding against Defendant 1
        ...(!isOneVsTwo || c.claimantProceed1 === yesNo.YES ? { applicant1DefenceResponseDocument: { file: documents.defenceResponse } } : {}),
        ...(proceed.claimantResponseDocumentToDefendant2Flag === yesNo.YES
          ? { claimantDefenceResDocToDefendant2: { file: documents.defenceResponseToDefendant2 } }
          : {}),
        ...buildDirectionsQuestionnaire(
          {
            fieldPrefix: claimant2Dq ? 'applicant2DQ' : 'applicant1DQ',
            determinationWithoutHearingField: 'deterWithoutHearing',
            label: claimant2Dq ? 'Claimant2' : 'Claimant1',
            hasRequestedCourt: false,
          },
          c.track,
          c.typeOfClaim,
          answers,
          documents.draftDirections,
        ),
      }
      : {}),
    uiStatementOfTruth: { name: claimantSolicitorCredentials.name, role: 'Solicitor' },
  };
}

// The hidden fields the about to start callback sets that keep their value (the claim's scenario, which decides the
// proceed questions, and the work allocation toggle), and the defendants' defence documents it puts on the first page
// for the claimant to see. XUI sends all of these back with the event, and so must the API.
function keptFromStart(startCaseData: Record<string, any>) {
  const kept: Record<string, any> = {};
  for (const field of [
    'claimantResponseScenarioFlag',
    'featureToggleWA',
    'respondent1ClaimResponseDocument',
    'respondent2ClaimResponseDocument',
    'respondentSharedClaimResponseDocument',
  ]) {
    if (startCaseData[field] !== undefined) {
      kept[field] = startCaseData[field];
    }
  }
  return kept;
}
