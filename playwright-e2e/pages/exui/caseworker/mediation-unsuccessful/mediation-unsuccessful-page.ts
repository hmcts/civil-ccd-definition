import { AllMethodsStep } from '../../../../decorators/test-steps';
import BasePage from '../../../../base/base-page';
import ExuiPage from '../../exui-page/exui-page';
import CCDCaseData from '../../../../models/ccd-case-data';
import { checkboxes } from './mediation-unsuccessful-content';

@AllMethodsStep()
export default class MediationUnsuccessfulPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(checkboxes.appointmentNoAgreement.label, { count: 1 }),
    ]);
  }

  async selectAppointmentNoAgreement() {
    await super.clickByLabel(checkboxes.appointmentNoAgreement.label);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
