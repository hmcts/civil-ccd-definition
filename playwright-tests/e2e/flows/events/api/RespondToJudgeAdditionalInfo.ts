import { randomUUID } from 'node:crypto';
import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// The applicant's solicitor gives the more information asked for on a general application
// (RESPOND_TO_JUDGE_ADDITIONAL_INFO, "Respond to judges addn info", on the application) through the CCD API, instead
// of the event's page in XUI, with civil-service's test document in place of the UI's PDF. civil-service adds it to the
// application's additional documents, and the application stays in AWAITING_ADDITIONAL_INFORMATION.
export class RespondToJudgeAdditionalInfo {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async submit(applicationCaseId: string, user: SessionUserKey) {
    const credentials = sessionUsers[user].credentials;
    const document = await new TestingEndPointHelper().uploadTestDocument(credentials);
    await this.ccdApiHelper.submitEventThroughPages(credentials, 'RESPOND_TO_JUDGE_ADDITIONAL_INFO', applicationCaseId, [
      { page: 'GAUploadDocForAddlnInfoScreen', answers: { generalAppAddlnInfoUpload: [{ id: randomUUID(), value: document }] } },
    ], false, true);
    console.log(`RESPOND_TO_JUDGE_ADDITIONAL_INFO submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
