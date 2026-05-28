import BasePageFactory from '../../../../base/base-page-factory';
import ReferToJudgeDefendedClaimPage from './refer-to-judge-defended-claim/refer-to-judge-defended-claim-page';

export default class ReferToJudgeDefendedClaimPageFactory extends BasePageFactory {
  get referToJudgeDefendedClaimPage() {
    return new ReferToJudgeDefendedClaimPage(this.page);
  }
}
