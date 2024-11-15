import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import {
  heading,
  subheading,
  table,
} from './notify-claim-details-check-your-answers-content-represented-defendants';

@AllMethodsStep()
export default class NotifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(subheading),
      super.expectText(table.uploadDocuments),
      super.expectText(table.partiularsOfClaim),
      super.expectText(table.medicalReports),
      super.expectText(table.scheduleOfLoss),
      super.expectText(table.certificateOfSuitability),
    ]);
  }
}
