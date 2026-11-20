import yesNo from '../../../../enums/yesNo.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { DirectionsQuestionnaireAnswers } from '../ui/DirectionsQuestionnaire.ts';
import { buildClaimantResponsePayload, ClaimantResponseDocuments, proceedAnswers } from './payloads/claimantResponsePayload.ts';

// The claimant's response to the defence (CLAIMANT_RESPONSE, "View and respond to defence") as the claimant solicitor
// (or whoever represents the claimant now) through the CCD API, instead of going through the event's pages in XUI
export class RespondToDefence {
  private ccdApiHelper = new CcdApiHelper();

  async submit(c: UnspecifiedConfig, caseId: string, answers: DirectionsQuestionnaireAnswers, user: SessionUserKey = 'claimantSolicitor') {
    const solicitor = sessionUsers[user].credentials;
    const documents = await this.uploadDocuments(c, solicitor);
    const started = await this.ccdApiHelper.startEvent(solicitor, 'CLAIMANT_RESPONSE', caseId);
    const payload = buildClaimantResponsePayload(c, started.caseData, answers, documents);
    await this.ccdApiHelper.submitEvent(solicitor, 'CLAIMANT_RESPONSE', started.token, payload, caseId);
    console.log(`CLAIMANT_RESPONSE submitted through the API on case ${caseId}`);
  }

  // The documents are only asked for when a claimant proceeds, so they are only uploaded then, as in the UI
  private async uploadDocuments(c: UnspecifiedConfig, solicitor): Promise<ClaimantResponseDocuments> {
    const proceed = proceedAnswers(c);
    if (proceed.applicantsProceedIntention !== yesNo.YES) {
      return { defenceResponse: undefined, defenceResponseToDefendant2: undefined, draftDirections: undefined };
    }
    const testingEndPointHelper = new TestingEndPointHelper();
    const upload = () => testingEndPointHelper.uploadTestDocument(solicitor);
    return {
      defenceResponse: await upload(),
      defenceResponseToDefendant2: proceed.claimantResponseDocumentToDefendant2Flag === yesNo.YES ? await upload() : undefined,
      draftDirections: await upload(),
    };
  }
}
