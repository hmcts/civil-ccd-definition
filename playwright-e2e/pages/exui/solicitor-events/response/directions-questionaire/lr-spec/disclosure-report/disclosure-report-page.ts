import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons } from './disclosure-report-content.ts';
import { Party } from '../../../../../../../models/partys.ts';

@AllMethodsStep()
export default class DisclosureReportPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.report),
      super.expectText(radioButtons.disclosureReportFilledAndServed.label),
      super.expectText(radioButtons.disclosureProposalAgreed.label),
    ]);
  }

  async enterDetails() {
    await super.clickBySelector(
      radioButtons.disclosureReportFilledAndServed.no.selector(this.party),
    );
    await super.clickBySelector(radioButtons.disclosureProposalAgreed.yes.selector(this.party));
    await super.expectLabel(inputs.draftOrderNumber.label);
    await super.inputText('12345', inputs.draftOrderNumber.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
