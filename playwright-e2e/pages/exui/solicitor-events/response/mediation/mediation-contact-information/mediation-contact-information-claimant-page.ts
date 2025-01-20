import { Page } from 'playwright-core';
import { Party } from '../../../../../../models/partys.ts';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  subHeading,
  content,
  inputs,
  buttons,
} from './mediation-contact-information-content.ts';
import CaseDataHelper from '../../../../../../helpers/case-data-helper.ts';
import StringHelper from '../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class MediationContactInformationClaimantPage extends ExuiPage(BasePage) {
  private claimantParty: Party;

  constructor(page: Page, claimantParty: Party) {
    super(page);
    this.claimantParty = claimantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectHeading(heading.claimant.label),
        super.expectSubheading(subHeading, { ignoreDuplicates: true }),
        super.expectText(content.paragraph1.label),
        super.expectText(content.paragraph2.label),
        super.expectText(inputs.firstName.label),
        super.expectText(inputs.lastName.label),
        super.expectText(inputs.emailAddress.label),
        super.expectText(inputs.telephoneNumber.label),
        super.expectText(buttons.previous.label),
        super.expectText(buttons.submit.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantParty.key) },
    );
  }

  async enterMediationContactInformation(claimantParty: Party) {
    const mediationData = CaseDataHelper.buildMediationData(claimantParty);

    await super.inputText(mediationData.firstName, inputs.firstName.selector(claimantParty));

    await super.inputText(mediationData.lastName, inputs.lastName.selector(claimantParty));

    await super.inputText(mediationData.emailAddress, inputs.emailAddress.selector(claimantParty));

    await super.inputText(
      mediationData.phoneNumber,
      inputs.telephoneNumber.selector(claimantParty),
    );
  }

  async previous() {
    await super.clickBySelector(buttons.previous.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
