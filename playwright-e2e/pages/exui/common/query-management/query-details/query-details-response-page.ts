import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page.ts';
import filePaths from '../../../../../config/file-paths';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content';
import { buttons, headings, inputs, paragraphs } from './query-details-content';

@AllMethodsStep()
export default class QueryDetailsResponsePage extends ExuiQmPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.queryDetails, { exact: false }),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.queryDetails.querySubject),
      super.expectText(paragraphs.queryDetails.queryBody),
      super.expectSelector(inputs.responseDetail.selector),
      super.expectSelector(inputs.closingTheQuery.selector),
      super.expectSelector(buttons.addNew.selector),
    ]);
  }

  async enterResponseDetail() {
    await super.inputText(paragraphs.response.responseDetail, inputs.responseDetail.selector);
  }

  async attachDocument() {
    await super.clickBySelector(buttons.addNew.selector);
    await super.retryUploadFile(filePaths.testDocxFile, inputs.attachDocument.selector);
  }

  async submit() {
    await super.wait(3000);
    await super.retryClickContinue();
  }
}
