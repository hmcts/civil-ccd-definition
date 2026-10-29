import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { SpecifiedConfig } from '../../../journey/specified/specifiedConfig.ts';
import { buildDefendantResponseSpecPayload } from './payloads/defendantResponseSpecPayload.ts';

// Responds to a specified claim (DEFENDANT_RESPONSE_SPEC) as one defendant's solicitor through the CCD API, instead of
// going through the event's pages in XUI: a full defence, a full or part admission, or a counterclaim. The solicitor
// must already be assigned to the case.
export class RespondToClaimSpec {
  private ccdApiHelper = new CcdApiHelper();

  async submit(c: SpecifiedConfig, caseId: string, defendantNumber: 1 | 2, user: SessionUserKey = defendantNumber === 1 ? 'respondent1Solicitor' : 'respondent2Solicitor') {
    const solicitor = sessionUsers[user].credentials;
    // The timeline and the draft directions are uploaded first, as the UI uploads them on their pages
    const testingEndPointHelper = new TestingEndPointHelper();
    const documents = {
      timeline: await testingEndPointHelper.uploadTestDocument(solicitor),
      draftDirections: await testingEndPointHelper.uploadTestDocument(solicitor),
    };
    const started = await this.ccdApiHelper.startEvent(solicitor, 'DEFENDANT_RESPONSE_SPEC', caseId);
    const payload = buildDefendantResponseSpecPayload(c, started.caseData, defendantNumber, documents);
    await this.ccdApiHelper.submitEvent(solicitor, 'DEFENDANT_RESPONSE_SPEC', started.token, payload, caseId);
    console.log(`DEFENDANT_RESPONSE_SPEC submitted through the API for Defendant ${defendantNumber} on case ${caseId}`);
  }
}
