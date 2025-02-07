import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons } from './disclosure-report-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DisclosureReportPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        // super.expectSubheading(subheadings.report),
        // super.expectText(radioButtons.disclosureReportFilledAndServed.label),
        // super.expectText(radioButtons.disclosureProposalAgreed.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(
      radioButtons.disclosureReportFilledAndServed.no.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(
      radioButtons.disclosureProposalAgreed.yes.selector(this.claimantDefendantParty),
    );
    await super.expectLabel(inputs.draftOrderNumber.label, { ignoreDuplicates: true });
    await super.inputText('12345', inputs.draftOrderNumber.selector(this.claimantDefendantParty));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
