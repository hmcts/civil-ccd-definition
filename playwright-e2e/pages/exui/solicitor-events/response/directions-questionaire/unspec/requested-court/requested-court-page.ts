import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getDropdowns, getInputs, getRadioButtons } from './requested-court-content.ts';

@AllMethodsStep()
export default class RequestedCourtPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(
      getDropdowns.dropdown.options[0],
      getDropdowns.dropdown.selector(this.party),
    );
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons.radioYes.selector(this.party));
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons.radioNo.selector(this.party));
  }

  async fillInPreferredCourtReason() {
    await super.inputText('Test reason', getInputs.preferredCourtReasonForm.selector(this.party));
  }

  async fillInHeldRemotelyReason() {
    await super.inputText('Test reason', getInputs.heldRemotelyReasonForm.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
