import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, radioButtons, inputs } from './fixed-recoverable-costs-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class FixedRecoverableCostsPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fixedRecoverableCosts),
        super.expectText(radioButtons(this.party).fixedRecoverableCosts.label),
        super.expectText(radioButtons(this.party).fixedRecoverableCosts.yes.label),
        super.expectText(radioButtons(this.party).fixedRecoverableCosts.no.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async selectNo() {
    await super.clickBySelector(radioButtons(this.party).fixedRecoverableCosts.no.selector);
    await super.inputText(
      'No explanation',
      inputs(this.party).fixedRecoverableCostsReason.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtons(this.party).fixedRecoverableCosts.yes.selector);
    await super.clickBySelector(radioButtons(this.party).complexityBands.band1.selector);
    await super.expectText(radioButtons(this.party).complexityBandAgreed.label);
    await super.clickBySelector(radioButtons(this.party).complexityBandAgreed.yes.selector);
    await super.inputText(
      'No explanation',
      inputs(this.party).fixedRecoverableCostsReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
