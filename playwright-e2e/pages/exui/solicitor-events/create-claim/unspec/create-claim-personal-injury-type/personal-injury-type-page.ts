import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, radioButtons } from './personal-injury-type-content';

@AllMethodsStep()
export default class PersonalInjuryTypePage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(labels.personalInjuryType),
      super.expectSelector(radioButtons.personalInjuryType.roadAccident),
      super.expectSelector(radioButtons.personalInjuryType.workAccident),
      super.expectSelector(radioButtons.personalInjuryType.publicLiability),
      super.expectSelector(radioButtons.personalInjuryType.holidayIllness),
      super.expectSelector(radioButtons.personalInjuryType.diseaseClaim),
      super.expectSelector(radioButtons.personalInjuryType.noiseInducedHearingLoss),
      super.expectSelector(radioButtons.personalInjuryType.personalInjuryOther),
    ]);
  }

  async selectTypeOfPersonalInjury() {
    await super.clickBySelector(radioButtons.personalInjuryType.roadAccident);
  }

  async submit() {
    await super.clickSubmit();
  }
}
