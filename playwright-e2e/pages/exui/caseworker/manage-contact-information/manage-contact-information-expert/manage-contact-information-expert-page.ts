import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import { Page } from '@playwright/test';
import partys from '../../../../../constants/partys.ts';
import CaseDataHelper from '../../../../../helpers/case-data-helper.ts';
import { inputs } from '../manage-contact-information-expert/manage-contact-information-expert-content.ts';

@AllMethodsStep()
export default class ManageContactInformationExpertPage extends ExuiPage(BasePage) {

  constructor(page: Page) {
    super(page);
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
    ]);
  }

  async enterDetailsExpert() {
    const expertData = CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1, { updated: true } );
    await super.inputText(expertData.firstName, inputs.firstName.selector);
    await super.inputText(expertData.lastName, inputs.lastName.selector);
    await super.inputText(expertData.emailAddress, inputs.email.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
