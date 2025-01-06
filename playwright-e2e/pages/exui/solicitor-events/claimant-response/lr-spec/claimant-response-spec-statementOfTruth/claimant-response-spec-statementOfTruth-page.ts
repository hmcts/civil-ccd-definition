import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  heading2,
  statementOfTruthForm,
  statementOfTruthNavigationButtons,
  paragraphs,
  paragraphsUnspec,
} from './claimant-response-spec-statementOfTruth-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecStatementOfTruthPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading2, { ignoreDuplicates: true }),
      super.expectText(paragraphs.text1),
      super.expectText(paragraphs.text2),
      super.expectText(paragraphs.text3),
      super.expectText(paragraphs.text4),
      super.expectText(paragraphs.text5),
      super.expectText(statementOfTruthForm.fullName.label),
      super.expectText(statementOfTruthForm.Role.label, { ignoreDuplicates: true }),
    ]);
  }

  async fillStatementOfTruth() {
    await super.inputText('Test Full Name', statementOfTruthForm.fullName.selector);
    await super.inputText('Test Role', statementOfTruthForm.Role.selector);
  }

  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(heading2, { count: 3 }),
        super.expectText(paragraphsUnspec.text1),
        super.expectText(paragraphsUnspec.text2),
        super.expectText(paragraphsUnspec.text3),
        super.expectText(paragraphsUnspec.text4),
        super.expectText(statementOfTruthForm.fullName.label),
        super.expectText(statementOfTruthForm.Role.label, {
          containerSelector: statementOfTruthForm.Role.containerSelector,
        }),
      ],
      { useAxeCache: true },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
