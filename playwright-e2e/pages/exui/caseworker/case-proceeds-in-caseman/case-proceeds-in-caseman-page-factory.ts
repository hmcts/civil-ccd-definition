import BasePageFactory from '../../../../base/base-page-factory.ts';
import CaseProceedsInCasemanLRPage from './lr-spec/case-proceeds-in-caseman-lr/case-proceeds-in-caseman-lr-page.ts';
import CaseProceedsInCasemanPage from './unspec/case-proceeds-in-caseman-page.ts';
import {Page} from "playwright-core";
import DateFragment from "../../fragments/date/date-fragment.ts";

export default class CaseProceedsInCasemanPageFactory extends BasePageFactory {
  get caseProceedsInCasemanLRPage() {
    const dateFragment = new DateFragment(this.page);
    return new CaseProceedsInCasemanLRPage(this.page,dateFragment);
  }

  get caseProceedsInCasemanPage() {
    const dateFragment = new DateFragment(this.page);
    return new CaseProceedsInCasemanPage(this.page, dateFragment);
  }
}
