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
      getDropdowns(this.party).dropdown.options[0],
      getDropdowns(this.party).dropdown.selector,
    );
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.party).radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.party).radioNo.selector);
  }

  async fillInPreferredCourtReason() {
    await super.inputText('Test reason', getInputs().preferredCourtReasonForm.selector);
  }

  async fillInHeldRemotelyReason() {
    await super.inputText('Test reason', getInputs(this.party).heldRemotelyReasonForm.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
