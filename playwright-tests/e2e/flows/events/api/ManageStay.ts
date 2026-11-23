import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Manages a stayed case (MANAGE_STAY) as the hearing centre admin through the CCD API, instead of the event's pages in
// XUI: asking the parties for an update, which leaves the case stayed, or lifting the stay, which takes the claim back
// to the state it was stayed in
export class ManageStay {
  private ccdApiHelper = new CcdApiHelper();

  async requestUpdate(caseId: string) {
    await this.submit(caseId, 'REQUEST_UPDATE');
  }

  async liftStay(caseId: string) {
    await this.submit(caseId, 'LIFT_STAY');
  }

  private async submit(caseId: string, option: 'REQUEST_UPDATE' | 'LIFT_STAY') {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'MANAGE_STAY', caseId, [
      { page: 'manageStayOptions', answers: { manageStayOption: option } },
    ]);
    console.log(`MANAGE_STAY (${option}) submitted through the API on case ${caseId}`);
  }
}
