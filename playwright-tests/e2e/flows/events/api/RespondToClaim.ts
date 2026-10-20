import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { DirectionsQuestionnaireAnswers } from '../ui/DirectionsQuestionnaire.ts';
import { buildDefendantResponsePayload } from './payloads/defendantResponsePayload.ts';

// Responds to the claim (DEFENDANT_RESPONSE) as one defendant's solicitor through the CCD API, instead of going
// through the event's pages in XUI. The solicitor must already be assigned to the case.
export class RespondToClaim {
  private ccdApiHelper = new CcdApiHelper();

  async submit(c: UnspecifiedConfig, caseId: string, defendantNumber: 1 | 2, answers: DirectionsQuestionnaireAnswers) {
    const solicitor = defendantNumber === 1 ? respondent1SolicitorCredentials : respondent2SolicitorCredentials;
    // The defence and the draft directions are uploaded first, as the UI uploads them on their pages
    const testingEndPointHelper = new TestingEndPointHelper();
    const documents = {
      responseDocument: await testingEndPointHelper.uploadTestDocument(solicitor),
      draftDirections: await testingEndPointHelper.uploadTestDocument(solicitor),
    };
    const started = await this.ccdApiHelper.startEvent(solicitor, 'DEFENDANT_RESPONSE', caseId);
    const payload = buildDefendantResponsePayload(c, started.caseData, defendantNumber, answers, documents);
    await this.ccdApiHelper.submitEvent(solicitor, 'DEFENDANT_RESPONSE', started.token, payload, caseId);
    console.log(`DEFENDANT_RESPONSE submitted through the API for Defendant ${defendantNumber} on case ${caseId}`);
  }
}
