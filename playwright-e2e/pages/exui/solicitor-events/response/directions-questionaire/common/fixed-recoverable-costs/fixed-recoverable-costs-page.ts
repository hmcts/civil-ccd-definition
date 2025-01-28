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
        super.expectSubheading(subheadings.fixedRecoverableCosts, { index: 0 }),
        super.expectText(radioButtons.fixedRecoverableCosts.label, {
          index: 0,
        }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectNo() {
    await super.clickBySelector(
      radioButtons.fixedRecoverableCosts.no.selector(this.claimantDefendantParty),
    );
    await super.inputText(
      `No explanation - ${this.claimantDefendantParty.key}`,
      inputs.fixedRecoverableCostsReason.selector(this.claimantDefendantParty),
    );
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons.fixedRecoverableCosts.yes.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(
      radioButtons.complexityBands.band1.selector(this.claimantDefendantParty),
    );
    await super.expectText(radioButtons.complexityBandAgreed.label, {
      index: 0,
    });
    await super.clickBySelector(
      radioButtons.complexityBandAgreed.yes.selector(this.claimantDefendantParty),
    );
    await super.inputText(
      `No explanation - ${this.claimantDefendantParty.key}`,
      inputs.fixedRecoverableCostsReason.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
