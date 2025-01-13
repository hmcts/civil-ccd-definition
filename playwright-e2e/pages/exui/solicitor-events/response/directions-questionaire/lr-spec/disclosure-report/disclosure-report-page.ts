import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, getInputs, getRadioButtons } from './disclosure-report-content.ts';
import { Party } from '../../../../../../../models/partys.ts';

@AllMethodsStep()
export default class DisclosureReportPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party.key = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.report),
      super.expectText(getRadioButtons(this.party.key).disclosureReportFilledAndServed.label),
      super.expectText(getRadioButtons(this.party.key).disclosureProposalAgreed.label),
    ]);
  }

  async enterDetails() {
    await super.clickBySelector(
      getRadioButtons(this.party.key).disclosureReportFilledAndServed.no.selector,
    );
    await super.clickBySelector(
      getRadioButtons(this.party.key).disclosureProposalAgreed.yes.selector,
    );
    await super.expectLabel(getInputs(this.party.key).draftOrderNumber.label);
    await super.inputText('12345', getInputs(this.party.key).draftOrderNumber.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
