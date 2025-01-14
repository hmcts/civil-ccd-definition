import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import Party from "../../../../../../../enums/party.ts";
import {
  subHeading,
  text,
  getSpeakingRadioButtons,
  getDocumentsRadioButtons,
  getSpeakingRadioButtons1v2,
  getDocumentsRadioButtons1v2,
} from './language-content.ts';

@AllMethodsStep()
export default class LanguagePage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeading.language),
      super.expectText(text.officialLanguage, { ignoreDuplicates: true }),
    ]);
  }

  async selectSpeakingEnglish() {
    await super.clickBySelector(getSpeakingRadioButtons(this.party).radioEnglish.selector);
  }

  async selectDocumentsEnglish() {
    await super.clickBySelector(getDocumentsRadioButtons(this.party).radioEnglish.selector);
  }

  async selectSpeakingEnglish1v2() {
    await super.clickBySelector(getSpeakingRadioButtons1v2(this.party).radioEnglish.selector);
  }

  async selectDocumentsEnglish1v2() {
    await super.clickBySelector(getDocumentsRadioButtons1v2(this.party).radioEnglish.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
