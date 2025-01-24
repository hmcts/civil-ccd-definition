import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { inputs, radioButtons, subHeadings } from './small-claim-experts-content.ts';
import partys from '../../../../../../../constants/partys.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class SmallClaimExpertsClaimantPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subHeadings.experts),
      super.expectText(radioButtons.expertsRequired.label, {ignoreDuplicates:true}),
    ]);
  }

  async useExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.yes.selector(partys.CLAIMANT_1));
  }

  async useNoExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.no.selector(partys.CLAIMANT_1));
  }

  async enterExpertDetails() {
    const expertData = CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1);
    await super.inputText(
      expertData.firstName,
      inputs.expert.firstName.selector(partys.CLAIMANT_1),
    );
    await super.inputText(expertData.lastName,
      inputs.expert.lastName.selector(partys.CLAIMANT_1)
    );
    await super.inputText(
      expertData.phoneNumber,
      inputs.expert.phoneNumber.selector(partys.CLAIMANT_1),
    );
    await super.inputText(expertData.emailAddress,
      inputs.expert.email.selector(partys.CLAIMANT_1)
    );
    await super.inputText(
      expertData.fieldOfExpertise,
      inputs.expert.expertise.selector(partys.CLAIMANT_1),
    );
    await super.inputText(
      expertData.whyRequired,
      inputs.expert.whyRequired.selector(partys.CLAIMANT_1),
    );
    await super.inputText(
      expertData.estimatedCost,
      inputs.expert.estimatedCost.selector(partys.CLAIMANT_1),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
