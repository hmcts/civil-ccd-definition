import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { reasonForTransfer, transferCourtLabel } from '../shared_api_ui/notSuitableSdoSpecs.ts';

// Transfers the claim to another hearing centre (TRANSFER_ONLINE_CASE, "Transfer online case") as the hearing centre
// admin through the CCD API, instead of the event's page in XUI, with the same answers as the UI: a London court that
// is not the current one (see transferCourtLabel). The about to start callback fills in the list of courts, and the
// page's mid event callback rejects the current court. Returns the label of the court chosen.
export class TransferOnlineCase {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, currentSite: string | undefined): Promise<string> {
    let chosen = '';
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'TRANSFER_ONLINE_CASE', caseId, [
      {
        page: 'TransferOnlineCase',
        answers: (data) => {
          const items: Array<{ code: string; label: string }> = data.transferCourtLocationList?.list_items ?? [];
          chosen = transferCourtLabel(items.map((item) => item.label), currentSite);
          return {
            transferCourtLocationList: { value: items.find((item) => item.label === chosen), list_items: items },
            reasonForTransfer,
          };
        },
      },
    ]);
    console.log(`TRANSFER_ONLINE_CASE to ${chosen} submitted through the API on case ${caseId}`);
    return chosen;
  }
}
