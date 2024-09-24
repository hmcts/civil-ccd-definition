import CaseListPage from './case-list/case-list-page';
import BasePageFactory from '../../../base/base-page-factory';
import ExuiCookiesBanner from './exui-cookies-banner/exui-cookies-banner';
import ExuiNavBar from './exui-nav-bar/exui-nav-bar';

export default class ExuiDashboardFactory extends BasePageFactory {
  get exuiCookiesBanner() {
    return new ExuiCookiesBanner(this.page, this.axeBuilder);
  }

  get navBar() {
    return new ExuiNavBar(this.page, this.axeBuilder);
  }

  get caseListPage() {
    return new CaseListPage(this.page, this.axeBuilder);
  }
}
