import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  useExpertRadioButtonsSmallTrack,
  useExpertRadioButtonsFastTrack,
  expertDetails,
} from './use-of-experts-content.ts';

@AllMethodsStep()
export default class UseOfExpertsPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesSmallTrack() {
    await super.clickBySelector(useExpertRadioButtonsSmallTrack.radioYes.selector);
    super.expectInputValue(
      expertDetails.fields.firstName.label,
      expertDetails.fields.firstName.selector,
    ),
      super.expectInputValue(
        expertDetails.fields.lastName.label,
        expertDetails.fields.lastName.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.number.label,
        expertDetails.fields.number.selector,
      ),
      super.expectInputValue(expertDetails.fields.email.label, expertDetails.fields.email.selector),
      super.expectInputValue(
        expertDetails.fields.fieldOfExpertise.label,
        expertDetails.fields.fieldOfExpertise.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.whyDoYouNeedExpert.label,
        expertDetails.fields.whyDoYouNeedExpert.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.estimateCost.label,
        expertDetails.fields.estimateCost.selector,
      );
  }

  async selectNoSmallTrack() {
    await super.clickBySelector(useExpertRadioButtonsSmallTrack.radioNo.selector);
  }

  async selectYesFastTrack() {
    await super.clickBySelector(useExpertRadioButtonsFastTrack.radioYes.selector);
    super.expectInputValue(
      expertDetails.fields.firstName.label,
      expertDetails.fields.firstName.selector,
    ),
      super.expectInputValue(
        expertDetails.fields.lastName.label,
        expertDetails.fields.lastName.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.number.label,
        expertDetails.fields.number.selector,
      ),
      super.expectInputValue(expertDetails.fields.email.label, expertDetails.fields.email.selector),
      super.expectInputValue(
        expertDetails.fields.fieldOfExpertise.label,
        expertDetails.fields.fieldOfExpertise.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.whyDoYouNeedExpert.label,
        expertDetails.fields.whyDoYouNeedExpert.selector,
      ),
      super.expectInputValue(
        expertDetails.fields.estimateCost.label,
        expertDetails.fields.estimateCost.selector,
      );
  }

  async selectNoFastTrack() {
    await super.clickBySelector(useExpertRadioButtonsFastTrack.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
