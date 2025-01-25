import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, paragraphs, radioButtons } from './language-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class LanguagePage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.welsh),
        super.expectText(paragraphs.descriptionText),
        super.expectText(radioButtons.courtLanguage.label),
        super.expectText(radioButtons.documentLanguage.label),
        super.expectLabel(radioButtons.courtLanguage.welsh.label, {index: 0}),
        super.expectLabel(radioButtons.courtLanguage.english.label, {index: 0}),
        super.expectLabel(radioButtons.courtLanguage.welshAndEnglish.label, {index: 0}),
        super.expectLabel(radioButtons.documentLanguage.welsh.label, {index: 0}),
        super.expectLabel(radioButtons.documentLanguage.english.label, {index: 0}),
        super.expectLabel(radioButtons.documentLanguage.welshAndEnglish.label, {index: 0}),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectEnglishAndWelsh() {
    await super.clickBySelector(
      radioButtons.courtLanguage.welshAndEnglish.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(
      radioButtons.documentLanguage.welshAndEnglish.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
