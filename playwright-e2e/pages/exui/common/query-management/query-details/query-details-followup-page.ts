import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content';
import { headings, buttons, inputs, paragraphs } from './query-details-content';

@AllMethodsStep()
export default class QueryDetailsFollowupPage extends ExuiQmPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(headings.queryDetails),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.queryDetails.title),
      super.expectText(paragraphs.response.title),
      super.expectText(inputs.askFollowupQuestions.label),
      super.expectText(paragraphs.attachDocumentOptional),
      super.expectButton(buttons.addNew.title),
    ]);
  }

  async enterFollowupQuestion() {
    await super.inputText(
      paragraphs.followupQuery.queryDetail,
      inputs.askFollowupQuestions.selector,
    );
  }

  async submit() {
    await super.retryClickContinue();
  }
}
