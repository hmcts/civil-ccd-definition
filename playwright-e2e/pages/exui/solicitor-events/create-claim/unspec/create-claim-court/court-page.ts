import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { dropDowns, hints, labels, radioButtons, subHeadings } from './court-content';

@AllMethodsStep()
export default class CourtPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subHeadings.courtLocationCode),
      super.expectLabel(labels.preferredCourtHearingLocation),
      super.expectLabel(labels.preferredCourtHearingLocation),
      super.expectText(hints.hearingRemote),
    ]);
  }

  async selectNoForRemoteHearing() {
    await super.clickBySelector(radioButtons.remoteHearingRequested.no);
  }

  async selectFirstItemInDropdown() {
    await super.selectFromDropdown(1, dropDowns.courtLocationDropdown);
  }

  async submit() {
    await super.clickSubmit();
  }
}
