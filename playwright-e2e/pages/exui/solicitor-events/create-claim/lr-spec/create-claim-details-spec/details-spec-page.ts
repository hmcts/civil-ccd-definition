import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  formFields,
  hints,
  insetTexts,
  labels,
  paragraphs,
  subHeadings,
} from './details-spec-content';

@AllMethodsStep()
export default class DetailsSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.describeClaim),
      super.expectSubheading(subHeadings.uploadDocuments),
      super.expectText(paragraphs.detailedTimeline),
      super.expectText(labels.descriptionOfClaim),
      super.expectText(labels.uploadFile),
      super.expectText(insetTexts.uploadDocumentsSupport),
      super.expectText(hints.acceptedFormats),
      super.expectText(buttons.cancelUpload),
      super.expectSelector(formFields.detailsOfClaim),
    ]);
  }

  async fillDetails() {
    await super.inputText('Test', formFields.detailsOfClaim);
  }

  async submit() {
    await super.clickSubmit();
  }
}
