import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDEvents from '../../../../../../constants/ccd-events';
import ExuiPage from '../../../../exui-page/exui-page';
import { dropdowns } from './case-filter-content';

@AllMethodsStep()
export default class CaseFilterPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(dropdowns.jurisdiction.label),
      super.expectLabel(dropdowns.caseType.label),
      super.expectLabel(dropdowns.event.label),
    ]);
  }

  async chooseSpec() {
    await super.selectFromDropdown(
      dropdowns.jurisdiction.options.civil,
      dropdowns.jurisdiction.selector,
    );
    await super.selectFromDropdown(dropdowns.caseType.options.civil, dropdowns.caseType.selector);
    await super.selectFromDropdown(dropdowns.event.options.spec, dropdowns.event.selector);
    super.setCCDEvent = CCDEvents.CREATE_CLAIM_SPEC;
  }

  async chooseUnSpec() {
    await super.selectFromDropdown(
      dropdowns.jurisdiction.options.civil,
      dropdowns.jurisdiction.selector,
    );
    await super.selectFromDropdown(dropdowns.caseType.options.civil, dropdowns.caseType.selector);
    await super.selectFromDropdown(dropdowns.event.options.unspec, dropdowns.event.selector);
    super.setCCDEvent = CCDEvents.CREATE_CLAIM;
  }

  async submit() {
    await super.clickSubmit();
  }
}
