import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { getFormattedCaseId } from '../../../../exui/exui-page/exui-content';
import { heading } from './submit-not-suitable-sdo-content';

@AllMethodsStep()
export default class SubmitSdoNotSuitablePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(`${getFormattedCaseId(ccdCaseData.id)} ${ccdCaseData.caseNamePublic}`),
    ]);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
