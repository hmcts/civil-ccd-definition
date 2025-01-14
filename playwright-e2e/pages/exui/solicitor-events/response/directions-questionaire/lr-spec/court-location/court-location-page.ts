import {Page} from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import {AllMethodsStep} from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import Party from "../../../../../../../enums/party.ts";
import {
  subHeadings,
  courtLocationDropdown,
  reasonForm,
  getRemoteHearingRadioButtons,
  courtLocationDropdown1v2,
  getCourtLocationDropdownUnspecAndSpec2v1,
  getRemoteHearingRadioButtonsUnspecAndSpec2v1,
} from './court-location-content.ts';

@AllMethodsStep()
export default class CourtLocationPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeadings.hearing1v1),
      super.expectText(getRemoteHearingRadioButtons(this.party).radioYes.label, {ignoreDuplicates: true}),
      super.expectText(getRemoteHearingRadioButtons(this.party).radioNo.label, {ignoreDuplicates: true})
    ]);
  }

  async verifyContentMultiDefendant(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(getRemoteHearingRadioButtons(this.party).radioYes.label, {
        ignoreDuplicates: true,
      }),
      super.expectText(getRemoteHearingRadioButtons(this.party).radioNo.label, {
        ignoreDuplicates: true,
      })
    ]);
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
      getCourtLocationDropdownUnspecAndSpec2v1(this.party).dropdown.options[0],
      getCourtLocationDropdownUnspecAndSpec2v1(this.party).dropdown.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(getRemoteHearingRadioButtons(this.party).radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRemoteHearingRadioButtons(this.party).radioNo.selector);
  }

  async selectYesUnspecAndSpec2v1() {
    await super.clickBySelector(getRemoteHearingRadioButtonsUnspecAndSpec2v1(this.party).radioYes.selector,);
  }

  async selectNoUnspecAndSpec2v1() {
    await super.clickBySelector(getRemoteHearingRadioButtonsUnspecAndSpec2v1(this.party).radioNo.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
