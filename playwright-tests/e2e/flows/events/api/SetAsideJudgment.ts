import moment from 'moment';
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { SetAsideJudgment as SetAsideReason } from '../../../../enums/judgmentsOnline.ts';

export const setAsideErrorText = 'Judgment made in error, set aside by the Playwright journey';

// Sets aside the default judgment (SET_ASIDE_JUDGMENT, "Set aside judgment") as the hearing centre admin through the CCD
// API, instead of the event's pages in XUI, with the same answers as the UI. A judgment made in error gives a reason the
// parties see, and that is the only page. A judge's order gets a second page: the date of the order (today), which type
// of order, and the date of the application or of the defence received (yesterday). Its mid event callback checks the
// order is not in the future and the other date is not after it.
export class SetAsideJudgment {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, setAside: SetAsideReason) {
    const isoDate = (date: moment.Moment) => date.format('YYYY-MM-DD');
    const today = isoDate(moment());
    const yesterday = isoDate(moment().subtract(1, 'day'));
    const madeInError = setAside === SetAsideReason.JUDGMENT_ERROR;
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'SET_ASIDE_JUDGMENT', caseId, [
      {
        page: 'SetAsideJudgment',
        answers: madeInError
          ? { joSetAsideReason: 'JUDGMENT_ERROR', joSetAsideJudgmentErrorText: setAsideErrorText }
          : { joSetAsideReason: 'JUDGE_ORDER' },
      },
      {
        page: 'SetAsideOrderType',
        when: (data) => data.joSetAsideReason === 'JUDGE_ORDER',
        answers: {
          joSetAsideOrderDate: today,
          joSetAsideOrderType: setAside,
          ...(setAside === SetAsideReason.ORDER_AFTER_APPLICATION
            ? { joSetAsideApplicationDate: yesterday }
            : { joSetAsideDefenceReceivedDate: yesterday }),
        },
      },
    ]);
    console.log(`SET_ASIDE_JUDGMENT (${setAside}) submitted through the API on case ${caseId}`);
  }
}
