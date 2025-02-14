import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { headings, subheadings, paragraphs, radioButtons, inputs } from './hearing-type-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { getFormattedCaseId } from '../../../../exui-page/exui-content.ts';

@AllMethodsStep()
export default class HearingTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(headings.requestJudgement),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id)),
      super.expectHeading(ccdCaseData.caseNamePublic),
      super.expectText(subheadings.hearingType),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async selectDisposalHearing() {
    await super.clickBySelector(radioButtons.hearingType.disposalHearing.selector);
    await super.runVerifications([
      super.expectText(subheadings.draftOrderDirections),
      super.expectText(paragraphs.descriptionDisposalHearing),
    ]);
    await super.inputText('Test directions', inputs.draftOrder.selector);
  }

  async selectTrial() {
    await super.clickBySelector(radioButtons.hearingType.trial.selector);
    await super.runVerifications([
      super.expectText(subheadings.draftOrderDirections),
      super.expectText(paragraphs.descriptionTrial),
    ]);
    await super.inputText('Test directions', inputs.draftOrder.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
