import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { formFields, labels, paragraphs, subHeadings } from './create-claim-details-content';

@AllMethodsStep()
export default class CreateClaimDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subHeadings.provideBriefDetails),
      super.expectText(paragraphs.briefDescription),
      super.expectText(paragraphs.additionalDetails),
      super.expectLabel(labels.label),
    ]);
  }

  async fillDetails() {
    await super.inputText('Test', formFields.detailsOfClaim);
  }

  async submit() {
    await super.clickSubmit();
  }
}
