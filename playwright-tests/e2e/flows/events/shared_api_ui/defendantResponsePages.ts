import claimTypes from '../../../../enums/claim-types.ts';
import RespondentResponses from '../../../../enums/RespondentResponses.ts';

// What an unspecified DEFENDANT_RESPONSE asks after the response, as civil-service decides it from the responses one
// solicitor gives (the set-generic-response-type-flag mid event callback, which sets multiPartyResponseTypeFlags):
//  - the flag is FULL_DEFENCE if any of those responses is a full defence, otherwise PART_ADMISSION if any is a part
//    admission, otherwise NOT_FULL_DEFENCE
//  - the response document is asked (with FULL_DEFENCE or PART_ADMISSION) for each defendant whose response is a full
//    defence or a part admission
//  - the directions questionnaire is asked (with FULL_DEFENCE only) for the defendant who defends the claim
//
// The responses one solicitor gives: in a 2v1 claim the defendant's response to each claimant, in a 1v2 same solicitor
// claim one response for both defendants (when they are the same) or one for each, and otherwise their own defendant's.
export interface DefendantResponsePages {
  multiPartyResponseTypeFlags: 'FULL_DEFENCE' | 'PART_ADMISSION' | 'NOT_FULL_DEFENCE';
  // The defendants (1 or 2) whose response document is uploaded
  responseDocuments: Array<1 | 2>;
  // The defendant whose directions questionnaire is answered, if there is one
  directionsQuestionnaireFor?: 1 | 2;
}

export function responsePages(
  claimType: claimTypes,
  respondent1Response: RespondentResponses,
  respondent2Response: RespondentResponses,
  defendantNumber: number,
): DefendantResponsePages {
  const responses = responsesGiven(claimType, respondent1Response, respondent2Response, defendantNumber);
  const values = responses.map(({ response }) => response);
  const multiPartyResponseTypeFlags = values.includes(RespondentResponses.FULL_DEFENCE)
    ? 'FULL_DEFENCE'
    : values.includes(RespondentResponses.PART_ADMISSION) ? 'PART_ADMISSION' : 'NOT_FULL_DEFENCE';
  const withDocument = (response: RespondentResponses) =>
    response === RespondentResponses.FULL_DEFENCE || response === RespondentResponses.PART_ADMISSION;
  const responseDocuments = [...new Set(responses.filter(({ response }) => withDocument(response)).map(({ defendant }) => defendant))];
  const defending = responses.find(({ response }) => response === RespondentResponses.FULL_DEFENCE);
  return { multiPartyResponseTypeFlags, responseDocuments, directionsQuestionnaireFor: defending?.defendant };
}

// Each response the solicitor gives, with the defendant whose case fields it is answered in
function responsesGiven(
  claimType: claimTypes,
  respondent1Response: RespondentResponses,
  respondent2Response: RespondentResponses,
  defendantNumber: number,
): Array<{ defendant: 1 | 2; response: RespondentResponses }> {
  switch (claimType) {
    // The one defendant responds to each claimant, both in Defendant 1's fields
    case claimTypes.TWO_VS_ONE:
      return [{ defendant: 1, response: respondent1Response }, { defendant: 1, response: respondent2Response }];
    // One response for both defendants, in Defendant 1's fields, or one each
    case claimTypes.ONE_VS_TWO_SAME_SOL:
      return respondent1Response === respondent2Response
        ? [{ defendant: 1, response: respondent1Response }]
        : [{ defendant: 1, response: respondent1Response }, { defendant: 2, response: respondent2Response }];
    default:
      return defendantNumber === 1
        ? [{ defendant: 1, response: respondent1Response }]
        : [{ defendant: 2, response: respondent2Response }];
  }
}
