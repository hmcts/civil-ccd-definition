import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  inputs,
  getCheckboxes,
  radioButtons,
} from './file-directions-questionnaire-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class FileDirectionsQuestionnairePage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fileDQ, { index: 0 }),
        super.expectLabel(getCheckboxes(this.claimantDefendantParty).fileDQConfirm.label, {
          index: 0,
        }),
        super.expectText(radioButtons(this.claimantDefendantParty).oneMonthStay.label, {
          index: 0,
        }),
        super.expectText(radioButtons(this.claimantDefendantParty).protocolComplied.label, {
          index: 0,
        }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(getCheckboxes(this.claimantDefendantParty).fileDQConfirm.selector);
    await super.clickBySelector(radioButtons(this.claimantDefendantParty).oneMonthStay.no.selector);
    await super.clickBySelector(
      radioButtons(this.claimantDefendantParty).protocolComplied.no.selector,
    );
    await super.inputText(
      `No explanation - ${this.claimantDefendantParty.key}`,
      inputs(this.claimantDefendantParty).noProtocolCompliedReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
