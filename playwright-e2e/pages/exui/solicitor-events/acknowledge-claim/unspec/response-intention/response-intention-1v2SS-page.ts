import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-intention-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class ResponseIntention1v2SSPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.fullDefence.label, { count: 2 }),
      super.expectLabel(radioButtons.partAdmit.label, { count: 2 }),
      super.expectLabel(radioButtons.contestJurisdiction.label, { count: 2 }),
    ]);
  }

  async selectRejectAll() {
    await super.clickBySelector(
      radioButtons.fullDefence.selector(partys.DEFENDANT_1, partys.CLAIMANT_1),
    );
    await super.clickBySelector(
      radioButtons.fullDefence.selector(partys.DEFENDANT_2, partys.CLAIMANT_1),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
