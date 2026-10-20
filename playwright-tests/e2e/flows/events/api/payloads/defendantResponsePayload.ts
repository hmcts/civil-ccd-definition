import claimTypes from '../../../../../enums/claim-types.ts';
import respondentResponses from '../../../../../enums/RespondentResponses.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../../civilConfig.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';
import { DirectionsQuestionnaireAnswers } from '../../ui/DirectionsQuestionnaire.ts';
import { buildDirectionsQuestionnaire } from './directionsQuestionnaire.ts';

type Document = Record<string, string>;

// The documents the response uploads: the defence, and the draft directions for the directions questionnaire
export interface DefendantResponseDocuments {
  responseDocument: Document;
  draftDirections: Document;
}

// The responding defendant's own response, which decides the pages after the response: the response document is only
// asked for a full defence or part admission, and the directions questionnaire only for a full defence. In a 2v1 claim
// it is the defendant's response to Claimant 1, and in a 1v2SS single response the one response for both.
function ownResponse(c: UnspecifiedConfig, defendantNumber: 1 | 2): respondentResponses {
  return defendantNumber === 1 ? c.respondent1Response : c.respondent2Response;
}

// The responses for both 1v2SS defendants can be one single response only when they are the same. civil-service rejects
// separate responses that are both a full defence.
function isSingleResponse(c: UnspecifiedConfig) {
  return c.respondent1Response === c.respondent2Response;
}

// The case data for DEFENDANT_RESPONSE, as the UI's RespondToClaim submits it for one defendant's solicitor.
// startCaseData is the case data CCD returned when the event was started, which holds the defendants' details, the
// copies of them the about to submit callback restores from, isRespondent1, the solicitor's reference and the list of
// courts.
export function buildDefendantResponsePayload(
  c: UnspecifiedConfig,
  startCaseData: Record<string, any>,
  defendantNumber: 1 | 2,
  answers: DirectionsQuestionnaireAnswers,
  documents: DefendantResponseDocuments,
): Record<string, any> {
  const response = ownResponse(c, defendantNumber);
  return {
    ...keptFromStart(startCaseData),
    ...responseTypes(c, defendantNumber),
    ...references(startCaseData, defendantNumber),
    multiPartyResponseTypeFlags: responseTypeFlag(response),
    ...(response === respondentResponses.FULL_DEFENCE || response === respondentResponses.PART_ADMISSION
      ? { [`respondent${defendantNumber}ClaimResponseDocument`]: { file: documents.responseDocument } }
      : {}),
    ...(response === respondentResponses.FULL_DEFENCE
      ? buildDirectionsQuestionnaire(
        {
          fieldPrefix: `respondent${defendantNumber}DQ`,
          determinationWithoutHearingField: `deterWithoutHearingRespondent${defendantNumber}`,
          label: `Defendant${defendantNumber}`,
          hasRequestedCourt: true,
        },
        c.track,
        c.typeOfClaim,
        answers,
        documents.draftDirections,
        startCaseData[`respondent${defendantNumber}DQRequestedCourt`],
      )
      : {}),
    uiStatementOfTruth: {
      name: (defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials).name,
      role: 'Solicitor',
    },
  };
}

// Confirm details (the defendants as they are, confirmed unchanged), isRespondent1 (which defendant's solicitor is
// responding), and the hidden copies of the defendants the about to start callback makes, which the about to submit
// callback reads back. XUI sends all of these back with the event, and so must the API.
function keptFromStart(startCaseData: Record<string, any>) {
  const kept: Record<string, any> = {};
  for (const field of ['respondent1', 'respondent2', 'respondent1Copy', 'respondent2Copy', 'isRespondent1']) {
    if (startCaseData[field] !== undefined) {
      kept[field] = startCaseData[field];
    }
  }
  return kept;
}

// Single response (1v2SS only) and Response: each defendant's solicitor answers their own defendant's response, except
// that in a 2v1 claim the defendant responds to each claimant, and in a 1v2SS claim the shared solicitor gives one
// response for both defendants or one for each
function responseTypes(c: UnspecifiedConfig, defendantNumber: 1 | 2) {
  switch (c.claimType) {
    case claimTypes.TWO_VS_ONE:
      return {
        respondent1ClaimResponseType: c.respondent1Response,
        respondent1ClaimResponseTypeToApplicant2: c.respondent2Response,
      };
    case claimTypes.ONE_VS_TWO_SAME_SOL:
      return isSingleResponse(c)
        ? { respondentResponseIsSame: yesNo.YES, respondent1ClaimResponseType: c.respondent1Response }
        : {
          respondentResponseIsSame: yesNo.NO,
          respondent1ClaimResponseType: c.respondent1Response,
          respondent2ClaimResponseType: c.respondent2Response,
        };
    default:
      return defendantNumber === 1
        ? { respondent1ClaimResponseType: c.respondent1Response }
        : { respondent2ClaimResponseType: c.respondent2Response };
  }
}

// Solicitor reference: the solicitor adds to their reference, as the UI does
function references(startCaseData: Record<string, any>, defendantNumber: 1 | 2) {
  if (defendantNumber === 1) {
    const solicitorReferences = startCaseData.solicitorReferences ?? {};
    return {
      solicitorReferences: {
        ...solicitorReferences,
        respondentSolicitor1Reference: `${solicitorReferences.respondentSolicitor1Reference ?? ''} Respond to claim`,
      },
    };
  }
  return { respondentSolicitor2Reference: `${startCaseData.respondentSolicitor2Reference ?? ''} - Respond to claim` };
}

// The flag the Response page's mid event callback (set-generic-response-type-flag) sets from the defendant's own
// response, which the following pages are shown by
function responseTypeFlag(response: respondentResponses) {
  if (response === respondentResponses.FULL_DEFENCE) {
    return 'FULL_DEFENCE';
  }
  return response === respondentResponses.PART_ADMISSION ? 'PART_ADMISSION' : 'NOT_FULL_DEFENCE';
}
