import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  subHeading1v1,
  subHeadingMultiDefendant,
  courtLocationDropdown,
  reasonForm,
  remoteHearingRadioButtons,
  courtLocationDropdown1v2,
  courtLocationDropdown2v1,
  remoteHearingRadioButtons2v1,
} from './court-location-content.ts';

@AllMethodsStep()
export default class CourtLocationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyContent1v1() {
    super.expectSubheading(subHeading1v1),
      super.expectText(remoteHearingRadioButtons(1).radioYes.label, { ignoreDuplicates: true }),
      super.expectText(remoteHearingRadioButtons(1).radioNo.label, { ignoreDuplicates: true });
  }

  async verifyContentMultiDefendant(defendantNumber: number) {
    super.expectSubheading(subHeadingMultiDefendant),
      super.expectText(remoteHearingRadioButtons(defendantNumber).radioYes.label, {
        ignoreDuplicates: true,
      }),
      super.expectText(remoteHearingRadioButtons(defendantNumber).radioNo.label, {
        ignoreDuplicates: true,
      });
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(
      courtLocationDropdown.dropdown.options[0],
      courtLocationDropdown.dropdown.selector,
    );
  }

  async selectCourtLocation1v2() {
    await super.selectFromDropdown(
      courtLocationDropdown1v2.dropdown.options[0],
      courtLocationDropdown1v2.dropdown.selector,
    );
  }

  async selectCourtLocation2v1() {
    await super.selectFromDropdown(
      courtLocationDropdown2v1.dropdown.options[0],
      courtLocationDropdown2v1.dropdown.selector,
    );
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(remoteHearingRadioButtons(defendantNumber).radioYes.selector);
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(remoteHearingRadioButtons(defendantNumber).radioNo.selector);
  }

  async selectYes2v1() {
    await super.clickBySelector(remoteHearingRadioButtons2v1.radioYes.selector);
  }

  async selectNo2v1() {
    await super.clickBySelector(remoteHearingRadioButtons2v1.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
