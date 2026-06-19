import BasePageFactory from '../../../../base/base-page-factory';
import DateFragment from '../../fragments/date/date-fragment';
import ConfirmDiscontinueClaimPage from './confirm-discontinue-claim/confirm-discontinue-claim-page';
import CourtPermissionPage from './court-permission/court-permission-page';
import DiscontinuanceTypePage from './discontinuance-type/discontinuance-type-page';
import DiscontinuingAgainstDefendantsPage from './discontinuing-against-defendants/discontinuing-against-defendants-page';
import MultipleClaimantPage from './multiple-claimant/multiple-claimant-page';
import PermissionGrantedPage from './permission-granted/permission-granted-page';
import SubmitDiscontinueClaimPage from './submit-discontinue-claim/submit-discontinue-claim-page';

export default class DiscontinueClaimPageFactory extends BasePageFactory {
  get multipleClaimantPage() {
    return new MultipleClaimantPage(this.page);
  }

  get courtPermissionPage() {
    return new CourtPermissionPage(this.page);
  }

  get permissionGrantedPage() {
    const dateFragment = new DateFragment(this.page);
    return new PermissionGrantedPage(this.page, dateFragment);
  }

  get discontinuanceTypePage() {
    return new DiscontinuanceTypePage(this.page);
  }

  get discontinuingAgainstDefendantsPage() {
    return new DiscontinuingAgainstDefendantsPage(this.page);
  }

  get submitDiscontinueClaimPage() {
    return new SubmitDiscontinueClaimPage(this.page);
  }

  get confirmDiscontinueClaimPage() {
    return new ConfirmDiscontinueClaimPage(this.page);
  }
}
