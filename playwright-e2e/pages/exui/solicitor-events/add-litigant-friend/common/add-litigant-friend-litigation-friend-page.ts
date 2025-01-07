import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import BasePage from '../../../../../base/base-page.ts';
import {
  headings,
  subHeadings,
  labels,
  selectors,
  uploadDocument,
  buttons,
  formFields,
} from './add-litigant-friend-litigation-friend-content';
import filePaths from '../../../../../config/file-paths.ts';

@AllMethodsStep()
export default class AddLitigantFriendLitigationFriendPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(headings.heading),
      super.expectSubheading(subHeadings.uploadCertificate),
      super.expectText(labels.firstName),
      super.expectText(labels.lastName),
      super.expectText(labels.emailAddress),
      super.expectText(labels.phoneNumber),
      super.expectText(labels.hasSameAddressAsLitigant),
      super.expectText(labels.hasSameAddressAsLitigantNo, { ignoreDuplicates: true }),
    ]);
  }

  async fillDetails() {
    await super.inputText('John', formFields.firstName);
    await super.inputText('Doe', formFields.lastName);
  }

  async clickYesLitigantSameAddress() {
    await super.clickBySelector(selectors.hasSameAddressAsLitigantYes);
  }

  async clickNoLitigantSameAddress() {
    await super.clickBySelector(selectors.hasSameAddressAsLitigantNo);
  }

  async clickAddNewButton() {
    await super.clickButtonByName(buttons.addNew);
  }

  async uploadCertificateOfSuitability() {
    await super.clickBySelector(uploadDocument.certificateOfSuitability);
    await super.retryUploadFile(filePaths.testPdfFile, uploadDocument.certificateOfSuitability);
  }

  async submit() {
    await super.clickSubmit();
  }
}
