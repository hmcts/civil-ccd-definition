import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { checkboxes, radioButtons } from './claims-track-content';

@AllMethodsStep()
export default class ClaimsTrackPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.smallClaimsTrack.label),
      super.expectLabel(radioButtons.fastTrack.label),
    ]);
  }

  async enterSmallClaimsTrack() {
    await super.clickBySelector(radioButtons.smallClaimsTrack.selector);
    await super.runVerifications([
      super.expectText(checkboxes.smallClaims.label, { ignoreDuplicates: true }),
      super.expectText(checkboxes.smallClaims.creditHire.label, { ignoreDuplicates: true }),
      super.expectText(checkboxes.smallClaims.roadTrafficAccident.label, {
        ignoreDuplicates: true,
      }),
      super.expectText(checkboxes.smallClaims.disputeResolutionHearing.label, {
        ignoreDuplicates: true,
      }),
      super.expectText(checkboxes.smallClaims.flightDelay.label, { ignoreDuplicates: true }),
    ]);
  }

  async setAdditionalDirectionsSmallClaimsTrack() {
    await super.clickBySelector(checkboxes.smallClaims.creditHire.selector);
    await super.clickBySelector(checkboxes.smallClaims.roadTrafficAccident.selector);
    await super.clickBySelector(checkboxes.smallClaims.flightDelay.selector);
  }

  async setDisputeResolutionHearing() {
    await super.clickBySelector(checkboxes.smallClaims.disputeResolutionHearing.selector);
  }

  async enterFastTrack() {
    await super.clickBySelector(radioButtons.fastTrack.selector);
    await super.runVerifications([
      super.expectText(checkboxes.fastTrack.label),
      super.expectText(checkboxes.fastTrack.buildingDispute.label),
      super.expectText(checkboxes.fastTrack.clinicialNegligence.label),
      super.expectText(checkboxes.fastTrack.creditHire.label, { ignoreDuplicates: true }),
      super.expectText(checkboxes.fastTrack.employersLiability.label),
      super.expectText(checkboxes.fastTrack.housingDisrepair.label),
      super.expectText(checkboxes.fastTrack.noiseInducedHearingLoss.label),
      super.expectText(checkboxes.fastTrack.personalInjury.label),
      super.expectText(checkboxes.fastTrack.roadTrafficAccident.label, { ignoreDuplicates: true }),
    ]);
  }

  async setAdditionalDirectionsFastTrack() {
    await super.clickBySelector(checkboxes.fastTrack.buildingDispute.selector);
    await super.clickBySelector(checkboxes.fastTrack.clinicialNegligence.selector);
    await super.clickBySelector(checkboxes.fastTrack.creditHire.selector);
    await super.clickBySelector(checkboxes.fastTrack.employersLiability.selector);
    await super.clickBySelector(checkboxes.fastTrack.housingDisrepair.selector);
    await super.clickBySelector(checkboxes.fastTrack.personalInjury.selector);
    await super.clickBySelector(checkboxes.fastTrack.roadTrafficAccident.selector);
  }

  async setNoiseInducedHearingLoss() {
    await super.clickBySelector(checkboxes.fastTrack.noiseInducedHearingLoss.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
