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
} from './court-location-content.ts';

@AllMethodsStep()
export default class CourtLocationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(courtLocationDropdown.label, { ignoreDuplicates: true }),
    ]);
  }

  async verifyContent1v1() {
    super.expectSubheading(subHeading1v1),
      super.expectText(remoteHearingRadioButtons.radioYes.label, { ignoreDuplicates: true }),
      super.expectText(remoteHearingRadioButtons.radioNo.label, { ignoreDuplicates: true });
  }

  async verifyContentMultiDefendant() {
    super.expectSubheading(subHeadingMultiDefendant),
      super.expectText(remoteHearingRadioButtons.radioYes.label, { ignoreDuplicates: true }),
      super.expectText(remoteHearingRadioButtons.radioNo.label, { ignoreDuplicates: true });
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(
      courtLocationDropdown.dropdown.options[0],
      courtLocationDropdown.dropdown.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(remoteHearingRadioButtons.radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(remoteHearingRadioButtons.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
