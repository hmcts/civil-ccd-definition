import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import {
  buttons,
  heading,
  subheading,
  table,
} from './notify-claim-details-check-your-answers-represented-defendants-content';

@AllMethodsStep()
export default class NotifyClaimDetailsCheckYourAnswersRepresentedDefendantsPage extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheading),
      super.expectText(table.uploadDocuments),
      super.expectText(table.partiularsOfClaim, { first: true }),
      super.expectText(table.medicalReports, { first: true }),
      super.expectText(table.scheduleOfLoss, { first: true }),
      super.expectText(table.certificateOfSuitability, { first: true }),
    ]);
  }

  async submit() {
    await super.clickBySelector(buttons.submit.selector);
  }
}
