import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { subheadings, radioButtons, inputs, checkboxes } from './judicial-hearing-details-screen-content';

@AllMethodsStep()
export default class JudicialHearingDetailsScreenPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheadings),
      super.expectLabel(radioButtons.preferedType.video.label),
      super.expectLabel(radioButtons.judicialTimeEstimate.fourtyFiveMinutes.label),
    ]);
  }

  async enterDetails() {
    await super.clickBySelector(radioButtons.preferedType.video.selector);
    await super.clickBySelector(radioButtons.judicialTimeEstimate.fourtyFiveMinutes.selector);
    await super.clickBySelector(checkboxes.supportRequirements.disabledAccess.selector);
    await super.inputText('Information for court staff', inputs.additionalInformationForCourtStaff.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
