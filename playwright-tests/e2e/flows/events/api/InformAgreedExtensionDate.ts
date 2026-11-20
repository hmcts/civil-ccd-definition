import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// Informs the court of an agreed 28 day extension to the time for responding to an unspecified claim
// (INFORM_AGREED_EXTENSION_DATE) as one defendant's solicitor through the CCD API, instead of the event's page in XUI.
// The extended date is not chosen: the about to start callback works it out, and it is submitted as XUI does.
export class InformAgreedExtensionDate {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, defendantNumber: number, user: SessionUserKey = defendantNumber === 1 ? 'respondent1Solicitor' : 'respondent2Solicitor') {
    const solicitor = sessionUsers[user].credentials;
    await this.ccdApiHelper.submitEventThroughPages(solicitor, 'INFORM_AGREED_EXTENSION_DATE', caseId, [{ page: 'ExtensionDate' }]);
    console.log(`INFORM_AGREED_EXTENSION_DATE submitted through the API for Defendant ${defendantNumber} on case ${caseId}`);
  }
}
