import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import CaseProceedsInCasemanPageFactory
  from "../../../../pages/exui/caseworker/case-proceeds-in-caseman/case-proceeds-in-caseman-page-factory.ts";
import CaseProceedsInCasemanActions from "./case-proceeds-in-caseman/case-proceeds-in-caseman-actions.ts";
import CaseProceedsInCasemanLrActions from "./case-proceeds-in-caseman/case-proceeds-in-caseman-lr-actions.ts";

export default class CaseworkerActionsFactory extends BasePageActionsFactory {

  get caseProceedsInCasemanActions() {
    return new CaseProceedsInCasemanActions(new CaseProceedsInCasemanPageFactory(this.page), this.testData);
  }

  get caseProceedsInCasemanLrActions() {
    return new CaseProceedsInCasemanLrActions(new CaseProceedsInCasemanPageFactory(this.page), this.testData);
  }
}
