import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import { Page } from '@playwright/test';
import partys from '../../../../../constants/partys';
import CaseDataHelper from '../../../../../helpers/case-data-helper.ts';
import { inputs } from '../manage-contact-information-witness/manage-contact-information-witness-content.ts';

@AllMethodsStep()
export default class ManageContactInformationWitnessPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
    ]);
  }

  async enterDetailsWitness() {
    const witnessData = CaseDataHelper.buildWitnessData(partys.DEFENDANT_2_WITNESS_1, { updated: true } );
    await super.inputText(witnessData.firstName, inputs.firstName.selector);
    await super.inputText(witnessData.lastName, inputs.lastName.selector);
    await super.inputText(witnessData.emailAddress, inputs.email.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
