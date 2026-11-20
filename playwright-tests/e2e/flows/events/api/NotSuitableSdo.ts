import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import NotSuitableSdoReason from '../../../../enums/notSuitableSdo.ts';
import { changeLocationReason, otherReason } from '../shared_api_ui/notSuitableSdoSpecs.ts';

// The judge decides the claim is not suitable for a Standard Direction Order (NotSuitable_SDO, "Not suitable for SDO")
// through the CCD API, instead of the event's page in XUI, with the same answers as the UI. The page's mid event
// callback checks the reason's length.
export class NotSuitableSdo {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, reason: NotSuitableSdoReason, user: SessionUserKey = 'judge') {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'NotSuitable_SDO', caseId, [
      {
        page: 'NotSuitableSDO',
        answers: reason === NotSuitableSdoReason.CHANGE_LOCATION
          ? { notSuitableSdoOptions: reason, tocTransferCaseReason: { reasonForCaseTransferJudgeTxt: changeLocationReason } }
          : { notSuitableSdoOptions: reason, reasonNotSuitableSDO: { input: otherReason } },
      },
    ]);
    console.log(`NotSuitable_SDO (${reason}) submitted through the API on case ${caseId}`);
  }
}
