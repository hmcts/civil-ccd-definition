import claimTypes from '../../../../../enums/claim-types.ts';
import yesNo from '../../../../../enums/yesNo.ts';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../../civilConfig.ts';
import { UnspecifiedConfig } from '../../../../journey/unspecified/unspecifiedConfig.ts';
import { DirectionsQuestionnaireAnswers } from '../../ui/DirectionsQuestionnaire.ts';
import { buildDirectionsQuestionnaire } from './directionsQuestionnaire.ts';
import { responsePages } from '../../defendantResponsePages.ts';

type Document = Record<string, string>;

// The documents the response uploads: the defence, and the draft directions for the directions questionnaire
export interface DefendantResponseDocuments {
  responseDocument: Document;
  draftDirections: Document;
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
  const pages = responsePages(c.claimType, c.respondent1Response, c.respondent2Response, defendantNumber);
  const dqDefendant = pages.directionsQuestionnaireFor;
  return {
    ...keptFromStart(startCaseData),
    ...responseTypes(c, defendantNumber),
    ...references(startCaseData, defendantNumber),
    multiPartyResponseTypeFlags: pages.multiPartyResponseTypeFlags,
    ...Object.fromEntries(pages.responseDocuments.map((defendant) => [`respondent${defendant}ClaimResponseDocument`, { file: documents.responseDocument }])),
    ...(dqDefendant !== undefined
      ? buildDirectionsQuestionnaire(
        {
          fieldPrefix: `respondent${dqDefendant}DQ`,
          // The small claims question is the solicitor's own (Defendant 1's unless they only represent Defendant 2)
          determinationWithoutHearingField: `deterWithoutHearingRespondent${defendantNumber}`,
          label: `Defendant${dqDefendant}`,
          hasRequestedCourt: true,
        },
        c.track,
        c.typeOfClaim,
        answers,
        documents.draftDirections,
        // civil-service gives both defendants the same list of courts. CCD leaves Defendant 2's out of the started event
        // for a solicitor without Defendant 2's role, in which case Defendant 1's is used.
        startCaseData[`respondent${dqDefendant}DQRequestedCourt`] ?? startCaseData.respondent1DQRequestedCourt,
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
