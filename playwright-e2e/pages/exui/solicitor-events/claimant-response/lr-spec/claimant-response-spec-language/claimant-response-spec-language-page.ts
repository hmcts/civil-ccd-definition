import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  headings,
  paragraphs,
  languageForHearing,
  languageForDocuments,
} from './claimant-response-spec-language-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecLanguagePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(headings.pageTitle, { ignoreDuplicates: true }),
      super.expectText(paragraphs.languageInfo1v2SS, { ignoreDuplicates: true }),
      super.expectText(languageForHearing.question.label, { ignoreDuplicates: true }),
    ]);
  }
  async verifyContent1v2SSSC(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(headings.pageTitle, {
          containerSelector: headings.containerSelector1v2SSSC,
        }),
        super.expectText(paragraphs.languageInfo1v2SS, {
          containerSelector: paragraphs.containerSelector,
        }),
        super.expectText(languageForHearing.question.label, {
          containerSelector: languageForHearing.question.containerSelector,
        }),
        super.expectText(languageForDocuments.question.label, {
          containerSelector: languageForDocuments.question.containerSelector,
        }),
      ],
      { useAxeCache: true },
    );
    //also worked for dssc
  }

  async selectHearingLanguage() {
    await super.clickBySelector(languageForHearing.options.english.selector);
  }

  async selectDocumentsLanguage() {
    await super.clickBySelector(languageForDocuments.options.english.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
