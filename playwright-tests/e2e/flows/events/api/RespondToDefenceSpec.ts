import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { SpecifiedConfig } from '../../../journey/specified/specifiedConfig.ts';
import { buildClaimantResponseSpecPayload, claimantResponsePages, ClaimantResponseSpecDocuments } from './payloads/claimantResponseSpecPayload.ts';
import Track from '../../../../enums/track.ts';

// The claimant's response to the defence or admission of a specified claim (CLAIMANT_RESPONSE_SPEC, "View and respond to
// defence") as the claimant solicitor through the CCD API, instead of going through the event's pages in XUI
export class RespondToDefenceSpec {
  private ccdApiHelper = new CcdApiHelper();

  async submit(c: SpecifiedConfig, caseId: string) {
    const documents = await this.uploadDocuments(c);
    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'CLAIMANT_RESPONSE_SPEC', caseId);
    const payload = buildClaimantResponseSpecPayload(c, started.caseData, documents);
    await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'CLAIMANT_RESPONSE_SPEC', started.token, payload, caseId);
    console.log(`CLAIMANT_RESPONSE_SPEC submitted through the API on case ${caseId}`);
  }

  // The documents are only uploaded when their pages are shown, as in the UI: the response to the defence with the
  // directions questionnaire (and on a full admission paid immediately's pages), and the draft directions for an
  // intermediate or multi track defence
  private async uploadDocuments(c: SpecifiedConfig): Promise<ClaimantResponseSpecDocuments> {
    const pages = claimantResponsePages(c);
    const testingEndPointHelper = new TestingEndPointHelper();
    const upload = () => testingEndPointHelper.uploadTestDocument(claimantSolicitorCredentials);
    const draftDirectionsAsked = pages.directionsQuestionnaire && !pages.rejectsAmount && (c.track === Track.INTERMEDIATE || c.track === Track.MULTI);
    return {
      defenceResponse: pages.directionsQuestionnaire || pages.fullAdmissionPaidImmediately ? await upload() : undefined,
      draftDirections: draftDirectionsAsked ? await upload() : undefined,
    };
  }
}
