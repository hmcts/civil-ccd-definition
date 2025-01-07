import BasePageFactory from '../../../../base/base-page-factory';
import CaseFilterPage from '../create-claim/common/case-filter/case-filter-page.ts';
import AddLitigantFriendLitigationFriendPage from './common/add-litigant-friend-litigation-friend-page.ts';

export default class AddLitigantFriendFactory extends BasePageFactory {
  get caseFilterPage() {
    return new CaseFilterPage(this.page);
  }

  get addLitigantFriendLitigationFriendPage() {
    return new AddLitigantFriendLitigationFriendPage(this.page);
  }
}
