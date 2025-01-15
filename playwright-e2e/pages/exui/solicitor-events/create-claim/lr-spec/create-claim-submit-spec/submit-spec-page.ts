import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { subHeadings } from './submit-spec-content';

@AllMethodsStep()
export default class SubmitSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.checkYourAnswers, { ignoreDuplicates: true }),
      super.expectText(subHeadings.defendantLegalRepresentative),
      super.expectText(subHeadings.airlineClaim),
      super.expectText(subHeadings.addClaimTimeline),
      super.expectText(subHeadings.listEvidence),
      super.expectText(subHeadings.claimAmount, { ignoreDuplicates: true }),
      super.expectText(subHeadings.claimInterest),
      super.expectText(subHeadings.totalAmountOfClaim),
      super.expectText(subHeadings.statementOfTruth),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
