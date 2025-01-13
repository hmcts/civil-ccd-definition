import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  getInputs,
  getCheckboxes,
  getRadioButtons,
} from './file-directions-questionnaire-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class FileDirectionsQuestionnairePage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party.key = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.fileDQ),
        super.expectLabel(getCheckboxes(this.party.key).fileDQConfirm.label),
        super.expectText(getRadioButtons(this.party.key).oneMonthStay.label),
        super.expectText(getRadioButtons(this.party.key).protocolComplied.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(getCheckboxes(this.party.key).fileDQConfirm.selector);
    await super.clickBySelector(getRadioButtons(this.party.key).oneMonthStay.no.selector);
    await super.clickBySelector(getRadioButtons(this.party.key).protocolComplied.no.selector);
    await super.inputText(
      `No explanation - ${this.party.key}`,
      getInputs(this.party.key).noProtocolCompliedReason.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
