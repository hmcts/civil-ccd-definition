import BasePage from '../../../../../../base/base-page';
import filePaths from '../../../../../../config/file-paths.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  heading2,
  hearingSupportForm,
  navigationButtons,
  hearingSupportText,
} from './claimant-response-spec-hearing-support-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecHearingSupportPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading2, { ignoreDuplicates: true }),
      super.expectText(hearingSupportForm.Text.label, { ignoreDuplicates: true }),
      super.expectText(hearingSupportText),
    ]);
  }

  async selectHearingSupportYes() {
    await super.clickBySelector(hearingSupportForm.radioYes.selector);
  }

  async fillSupportRequirementField() {
    await super.expectText(hearingSupportForm.supportRequirement.label, { ignoreDuplicates: true }),
      await super.inputText(
        'Jane Smith requires a wheelchair',
        hearingSupportForm.supportRequirement.selector,
      );
  }
  async selectHearingSupportNo() {
    await super.clickBySelector(hearingSupportForm.radioNo.selector);
  }

  async verifyContentFastTrack(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(heading2),
        super.expectText(hearingSupportForm.Text.label, { first: true }),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(heading2, { ignoreDuplicates: true }),
        super.expectText(hearingSupportForm.Text.label, { ignoreDuplicates: true }),
      ],
      { useAxeCache: true },
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
