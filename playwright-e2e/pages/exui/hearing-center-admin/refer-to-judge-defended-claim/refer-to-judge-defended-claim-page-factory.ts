import BasePageFactory from '../../../../base/base-page-factory';
import ReferJudgeDefenceReceivedPage from './refer-to-judge-defended-claim/refer-to-judge-defended-claim-page';

export default class ReferJudgeDefenceReceivedPageFactory extends BasePageFactory {
  get referJudgeDefenceReceivedPage() {
    return new ReferJudgeDefenceReceivedPage(this.page);
  }
}
