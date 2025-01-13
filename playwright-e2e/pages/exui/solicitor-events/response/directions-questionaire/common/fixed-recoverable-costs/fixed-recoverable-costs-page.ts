import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, getRadioButtons, getInputs } from './fixed-recoverable-costs-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class FixedRecoverableCostsPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party.key = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fixedRecoverableCosts),
        super.expectText(getRadioButtons(this.party.key).fixedRecoverableCosts.label),
        super.expectText(getRadioButtons(this.party.key).fixedRecoverableCosts.yes.label),
        super.expectText(getRadioButtons(this.party.key).fixedRecoverableCosts.no.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party.key).fixedRecoverableCosts.no.selector);
    await super.inputText(
      'No explanation',
      getInputs(this.party.key).fixedRecoverableCostsReason.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.party.key).fixedRecoverableCosts.yes.selector);
    await super.clickBySelector(getRadioButtons(this.party.key).complexityBands.band1.selector);
    await super.expectText(getRadioButtons(this.party.key).complexityBandAgreed.label);
    await super.clickBySelector(getRadioButtons(this.party.key).complexityBandAgreed.yes.selector);
    await super.inputText(
      'No explanation',
      getInputs(this.party.key).fixedRecoverableCostsReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
