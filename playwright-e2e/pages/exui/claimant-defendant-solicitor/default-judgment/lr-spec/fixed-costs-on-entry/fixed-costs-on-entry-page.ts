import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { radioButtons } from './fixed-costs-on-entry-content.ts';
import {getFormattedCaseId} from "../../../../exui-page/exui-content.ts";

@AllMethodsStep()
export default class FixedCostsOnEntryPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id), {exact:false}),
      super.expectHeading(ccdCaseData.caseNamePublic, {exact:false}),
      super.expectLegend(radioButtons.claimFixedCosts.label),
      super.expectRadioYesLabel(radioButtons.claimFixedCosts.yes.selector),
      super.expectRadioNoLabel(radioButtons.claimFixedCosts.no.selector),
    ]);
  }

  async selectYesClaimFixedCosts() {
    await super.clickBySelector(radioButtons.claimFixedCosts.yes.selector);
  }

  async selectNoClaimFixedCosts() {
    await super.clickBySelector(radioButtons.claimFixedCosts.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
