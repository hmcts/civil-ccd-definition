import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  hearingLocationDropDown,
  remoteHearing,
  subHeading,
} from './claimant-response-spec-application-court-location-LR-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecApplicationCourtLocationLRPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeading.claimantHeading2),
      super.expectText(subHeading.remoteHearingHeading2),
      super.expectText(hearingLocationDropDown.text),
      super.expectText(hearingLocationDropDown.hint),
      super.expectText(remoteHearing.text),
      super.expectText(remoteHearing.hint),
    ]);
  }

  async verifyContent1v2(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(subHeading.claimantHeading2),
        super.expectText(subHeading.remoteHearingHeading2),
        super.expectText(hearingLocationDropDown.text, { first: true }),
        super.expectText(hearingLocationDropDown.hint),
        super.expectText(remoteHearing.text, { first: true }),
        super.expectText(remoteHearing.hint),
      ],
      { useAxeCache: true },
    );
  }

  async fillRequestedCourt() {
    await super.selectFromDropdown(
      hearingLocationDropDown.selectValue.option[0],
      hearingLocationDropDown.selectValue.selector,
    ),
      await super.inputText('Closer to Home', hearingLocationDropDown.reasons.selector);
  }

  async chooseRemoteHearing() {
    await super.clickBySelector(remoteHearing.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
