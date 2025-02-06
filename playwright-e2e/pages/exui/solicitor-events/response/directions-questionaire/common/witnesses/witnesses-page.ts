import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, buttons, inputs, radioButtons } from './witnesses-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class WitnessesPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.witnesses, { index: 0 }),
        super.expectText(radioButtons.witnessesRequired.label, { index: 0 }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons.witnessesRequired.yes.selector(this.claimantDefendantParty),
    );
  }

  async selectNo() {
    await super.clickBySelector(
      radioButtons.witnessesRequired.no.selector(this.claimantDefendantParty),
    );
  }

  async addWitness() {
    await super.clickBySelector(buttons.addNewWitness.selector(this.claimantDefendantParty));
  }

  async enterWitnessDetails(witnessParty: Party) {
    const witnessData = CaseDataHelper.buildWitnessData(witnessParty);
    await super.inputText(
      witnessData.firstName,
      inputs.witnessDetails.firstName.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.lastName,
      inputs.witnessDetails.lastName.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.phoneNumber,
      inputs.witnessDetails.number.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.emailAddress,
      inputs.witnessDetails.email.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.reasonForWitness,
      inputs.witnessDetails.whatEvent.selector(this.claimantDefendantParty, witnessParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
