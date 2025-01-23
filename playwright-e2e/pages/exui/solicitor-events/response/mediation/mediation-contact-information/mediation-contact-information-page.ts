import { Page } from 'playwright-core';
import { Party } from '../../../../../../models/partys.ts';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, paragraphs, inputs } from './mediation-contact-information-content.ts';
import CaseDataHelper from '../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class MediationContactInformationPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;
  private mediationParty: Party;

  constructor(page: Page, claimantDefendantParty: Party, mediationParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
    this.mediationParty = mediationParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings, { index: 0 }),
      super.expectText(paragraphs.description1),
      super.expectText(paragraphs.description2),
      super.expectText(inputs.mediationFriendDetails.firstName.label),
      super.expectText(inputs.mediationFriendDetails.lastName.label),
      super.expectText(inputs.mediationFriendDetails.emailAddress.label),
      super.expectText(inputs.mediationFriendDetails.telephoneNumber.label),
    ]);
  }

  async enterMediationContactDetails() {
    const mediationData = CaseDataHelper.buildMediationData(this.mediationParty);

    await super.inputText(
      mediationData.firstName,
      inputs.mediationFriendDetails.firstName.selector(this.claimantDefendantParty),
    );

    await super.inputText(
      mediationData.lastName,
      inputs.mediationFriendDetails.lastName.selector(this.claimantDefendantParty),
    );

    await super.inputText(
      mediationData.emailAddress,
      inputs.mediationFriendDetails.emailAddress.selector(this.claimantDefendantParty),
    );

    await super.inputText(
      mediationData.phoneNumber,
      inputs.mediationFriendDetails.telephoneNumber.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
