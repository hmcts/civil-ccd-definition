import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { checkboxes, paragraph, radioButtons } from './order-type-content';

@AllMethodsStep()
export default class OrderTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraph),
      super.expectLabel(radioButtons.decideDamages.label),
      super.expectLabel(radioButtons.disposal.label),
    ]);
  }

  async enterDisposalHearing() {
    await super.clickBySelector(radioButtons.disposal.selector);
  }

  async enterDecideDamages() {
    await super.clickBySelector(radioButtons.decideDamages.selector);
    await super.expectText(checkboxes.buildingDispute.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.clinicialNegligence.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.creditHire.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.employersLiability.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.housingDisrepair.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.personalInjury.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.roadTrafficAccident.label, { ignoreDuplicates: true });
    await super.expectText(checkboxes.noiseInducedHearingLoss.label, { ignoreDuplicates: true });
  }

  async setAdditionalDirections() {
    await super.clickBySelector(checkboxes.buildingDispute.selector);
    await super.clickBySelector(checkboxes.clinicialNegligence.selector);
    await super.clickBySelector(checkboxes.creditHire.selector);
    await super.clickBySelector(checkboxes.employersLiability.selector);
    await super.clickBySelector(checkboxes.housingDisrepair.selector);
    await super.clickBySelector(checkboxes.personalInjury.selector);
    await super.clickBySelector(checkboxes.roadTrafficAccident.selector);
  }

  async setNoiseInducedHearingLoss() {
    await super.clickBySelector(checkboxes.noiseInducedHearingLoss.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
