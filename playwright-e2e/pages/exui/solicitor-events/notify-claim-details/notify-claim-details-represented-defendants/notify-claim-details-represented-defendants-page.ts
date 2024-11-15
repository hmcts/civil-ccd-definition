import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import {
  buttons,
  heading,
  inputs,
  subheadings,
} from './notify-claim-details-represented-defendants-content';

@AllMethodsStep()
export default class NotifyClaimDetailsRepresentedDefendantsPage extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.uploadDocuments),
      super.expectSubheading(subheadings.partiularsOfClaim),
      super.expectSubheading(subheadings.medicalReports),
      super.expectSubheading(subheadings.scheduleOfLoss),
      super.expectSubheading(subheadings.certificateOfSuitability),
    ]);
  }

  async uploadDocuments() {
    await super.clickBySelector(buttons.addPartiularsOfClaim.selector);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadPartiularsOfClaim.selector);
    await super.clickBySelector(buttons.addMedicalReports.selector);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadMedicalReports.selector);
    await super.clickBySelector(buttons.addScheduleOfLoss.selector);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadScheduleOfLoss.selector);
    await super.clickBySelector(buttons.addCertificateOfSuitability.selector);
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.uploadCertificateOfSuitability.selector,
    );
  }

  async continue() {
    await super.clickBySelector(buttons.continue.selector);
  }
}
