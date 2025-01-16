import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { inputs, radioButtons } from './claimant-response-small-claim-experts-content.ts';
import partys from '../../../../../../../constants/partys.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';
import { subHeadings } from '../../common/witnesses/witnesses-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSmallClaimExpertsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeadings.witnesses),
      super.expectText(radioButtons.expertsRequired.label),
    ]);
  }

  async useExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.yes.selector);
  }

  async useNoExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.no.selector);
  }

  async enterExpertDetails() {
    const expertData = CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1);
    await super.inputText(expertData.firstName, inputs.expertDetails.firstName.selector);
    await super.inputText(expertData.lastName, inputs.expertDetails.lastName.selector);
    await super.inputText(expertData.phoneNumber, inputs.expertDetails.phoneNumber.selector);
    await super.inputText(expertData.emailAddress, inputs.expertDetails.email.selector);
    await super.inputText(expertData.fieldOfExpertise, inputs.expertDetails.expertise.selector);
    await super.inputText(expertData.whyRequired, inputs.expertDetails.whyRequired.selector);
    await super.inputText(expertData.estimatedCost, inputs.expertDetails.estimatedCost.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
