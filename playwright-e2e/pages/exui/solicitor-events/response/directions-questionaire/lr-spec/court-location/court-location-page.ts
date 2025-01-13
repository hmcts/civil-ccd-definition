import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subHeading1v1,
  subHeadingMultiDefendant,
  courtLocationDropdown,
  reasonForm,
  remoteHearingRadioButtons,
  courtLocationDropdown1v2,
  courtLocationDropdownUnspecAndSpec2v1,
  remoteHearingRadioButtonsUnspecAndSpec2v1,
} from './court-location-content.ts';

@AllMethodsStep()
export default class CourtLocationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyContent1v1() {
    super.expectSubheading(subHeading1v1),
      super.expectText(remoteHearingRadioButtons.radioYes.label, { ignoreDuplicates: true }),
      super.expectText(remoteHearingRadioButtons.radioNo.label, { ignoreDuplicates: true });
  }

  async verifyContentMultiDefendant() {
    super.expectSubheading(subHeadingMultiDefendant),
      super.expectText(remoteHearingRadioButtons.radioYes.label, {
        ignoreDuplicates: true,
      }),
      super.expectText(remoteHearingRadioButtons.radioNo.label, {
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

  async selectCourtLocationUnpecAndSpec2v1() {
    await super.selectFromDropdown(
      courtLocationDropdownUnspecAndSpec2v1.dropdown.options[0],
      courtLocationDropdownUnspecAndSpec2v1.dropdown.selector(this.party),
    );
  }

  async selectYes() {
    await super.clickBySelector(remoteHearingRadioButtons.radioYes.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(remoteHearingRadioButtons.radioNo.selector(this.party));
  }

  async selectYesUnspecAndSpec2v1() {
    await super.clickBySelector(
      remoteHearingRadioButtonsUnspecAndSpec2v1.radioYes.selector(this.party),
    );
  }

  async selectNoUnspecAndSpec2v1() {
    await super.clickBySelector(
      remoteHearingRadioButtonsUnspecAndSpec2v1.radioNo.selector(this.party),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
