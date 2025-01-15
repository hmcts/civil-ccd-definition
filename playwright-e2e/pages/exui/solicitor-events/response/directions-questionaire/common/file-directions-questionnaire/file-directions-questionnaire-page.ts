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
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fileDQ),
        super.expectLabel(getCheckboxes(this.party).fileDQConfirm.label),
        super.expectText(radioButtons(this.party).oneMonthStay.label),
        super.expectText(radioButtons(this.party).protocolComplied.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(getCheckboxes(this.party).fileDQConfirm.selector);
    await super.clickBySelector(radioButtons(this.party).oneMonthStay.no.selector);
    await super.clickBySelector(radioButtons(this.party).protocolComplied.no.selector);
    await super.inputText(
      `No explanation - ${this.party}`,
      inputs(this.party).noProtocolCompliedReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
