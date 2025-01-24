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
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fixedRecoverableCosts),
        super.expectText(radioButtons(this.claimantDefendantParty).fixedRecoverableCosts.label),
        super.expectText(radioButtons(this.claimantDefendantParty).fixedRecoverableCosts.yes.label),
        super.expectText(radioButtons(this.claimantDefendantParty).fixedRecoverableCosts.no.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectNo() {
    await super.clickBySelector(
      radioButtons(this.claimantDefendantParty).fixedRecoverableCosts.no.selector,
    );
    await super.inputText(
      'No explanation',
      inputs(this.claimantDefendantParty).fixedRecoverableCostsReason.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons(this.claimantDefendantParty).fixedRecoverableCosts.yes.selector,
    );
    await super.clickBySelector(
      radioButtons(this.claimantDefendantParty).complexityBands.band1.selector,
    );
    await super.expectText(radioButtons(this.claimantDefendantParty).complexityBandAgreed.label);
    await super.clickBySelector(
      radioButtons(this.claimantDefendantParty).complexityBandAgreed.yes.selector,
    );
    await super.inputText(
      'No explanation',
      inputs(this.claimantDefendantParty).fixedRecoverableCostsReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
