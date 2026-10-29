import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// Informs the court of an agreed extension to the time for responding to a specified claim
// (INFORM_AGREED_EXTENSION_DATE_SPEC) as one defendant's solicitor through the CCD API, instead of the event's page in
// XUI. The solicitor must already be assigned to the case.
export class InformAgreedExtensionDateSpec {
  private ccdApiHelper = new CcdApiHelper();

  // extensionDate is YYYY-MM-DD. Defendant 2's solicitor (only when they have their own) gives Defendant 2's date.
  async submit(
    caseId: string,
    defendantNumber: 1 | 2,
    extensionDate: string,
    user: SessionUserKey = defendantNumber === 1 ? 'respondent1Solicitor' : 'respondent2Solicitor',
  ) {
    const solicitor = sessionUsers[user].credentials;
    const started = await this.ccdApiHelper.startEvent(solicitor, 'INFORM_AGREED_EXTENSION_DATE_SPEC', caseId);
    const payload = { [`respondentSolicitor${defendantNumber}AgreedDeadlineExtension`]: extensionDate };
    await this.ccdApiHelper.submitEvent(solicitor, 'INFORM_AGREED_EXTENSION_DATE_SPEC', started.token, payload, caseId);
    console.log(`INFORM_AGREED_EXTENSION_DATE_SPEC submitted through the API for Defendant ${defendantNumber} on case ${caseId} (${extensionDate})`);
  }
}
