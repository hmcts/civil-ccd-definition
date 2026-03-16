import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  heading,
  confirmationHeading,
  paragraphs,
  subheading,
} from './confirm-not-suitable-sdo-content';
import { getFormattedCaseId } from '../../../../exui/exui-page/exui-content';

@AllMethodsStep()
export default class ConfirmSdoNotSuitablePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(`${getFormattedCaseId(ccdCaseData.id)} ${ccdCaseData.caseNamePublic}`),
    ]);
  }

  async verifyContentAnotherHearingCentre() {
    await super.runVerifications([
      super.expectHeading(confirmationHeading.anotherHearingCentre),
      super.expectSubheading(subheading.anotherHearingCentre),
      super.expectText(paragraphs.anotherHearingCentre.paragraph1),
      super.expectText(paragraphs.anotherHearingCentre.paragraph2),
      super.expectText(paragraphs.anotherHearingCentre.paragraph3),
    ]);
  }

  async verifyContentOtherReason() {
    await super.runVerifications([
      super.expectHeading(confirmationHeading.otherReason),
      super.expectSubheading(subheading.otherReason),
      super.expectText(paragraphs.otherReason.paragraph1),
      super.expectText(paragraphs.otherReason.paragraph2),
    ]);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
