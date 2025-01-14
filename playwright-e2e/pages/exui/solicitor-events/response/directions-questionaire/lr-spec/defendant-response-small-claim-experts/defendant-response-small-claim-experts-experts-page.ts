import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  inputs,
  radioButtons,
  subheadings,
} from './defendant-response-small-claim-experts-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import partys from '../../../../../../../constants/partys.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DefendantResponseSmallClaimExpertsPage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.experts),
        super.expectText(radioButtons.expertsRequired.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async useExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.yes.selector(this.defendantParty));
  }

  async useNoExperts() {
    await super.clickBySelector(radioButtons.expertsRequired.no.selector(this.defendantParty));
  }

  async enterExpertDetails() {
    const expertParty =
      this.defendantParty.number === 1 ? partys.DEFENDANT_1_EXPERT_1 : partys.DEFENDANT_2_EXPERT_1;
    const expertData = CaseDataHelper.buildExpertData(expertParty);
    await super.inputText(
      expertData.firstName,
      inputs.expert.firstName.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.lastName,
      inputs.expert.lastName.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.phoneNumber,
      inputs.expert.phoneNumber.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.emailAddress,
      inputs.expert.email.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.fieldOfExpertise,
      inputs.expert.expertise.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.whyRequired,
      inputs.expert.whyRequired.selector(this.defendantParty),
    );
    await super.inputText(
      expertData.estimatedCost,
      inputs.expert.estimatedCost.selector(this.defendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
