import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs, radioButtons, buttons } from './experts-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class ExpertPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        // super.expectSubheading(subheadings.experts),
        // super.expectText(radioButtons.expertsRequired.label),
        // super.expectLabel(radioButtons.expertsRequired.yes.label),
        // super.expectLabel(radioButtons.expertsRequired.no.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async useExperts() {
    await super.clickBySelector(
      radioButtons.expertsRequired.yes.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(
      radioButtons.expertReports.notObtained.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(radioButtons.jointExpert.no.selector(this.claimantDefendantParty));
  }

  async addNewExpert() {
    await super.clickBySelector(buttons.addNew.selector(this.claimantDefendantParty));
  }

  async enterExpertDetails(expertParty: Party) {
    const expertData = CaseDataHelper.buildExpertData(expertParty);
    await super.inputText(
      expertData.firstName,
      inputs.expertDetails.firstName.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.lastName,
      inputs.expertDetails.lastName.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.emailAddress,
      inputs.expertDetails.emailAddress.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.phoneNumber,
      inputs.expertDetails.phoneNumber.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.fieldOfExpertise,
      inputs.expertDetails.expertise.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.whyRequired,
      inputs.expertDetails.whyRequired.selector(this.claimantDefendantParty, expertParty),
    );

    await super.inputText(
      expertData.estimatedCost,
      inputs.expertDetails.estimatedCost.selector(this.claimantDefendantParty, expertParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
