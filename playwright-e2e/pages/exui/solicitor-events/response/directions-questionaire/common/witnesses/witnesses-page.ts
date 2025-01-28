import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subHeadings, buttons, inputs, radioButtons } from './witnesses-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

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
        super.expectSubheading(subHeadings.witnesses, { index: 0 }),
        super.expectText(radioButtons.witnessesRequired.label, { index: 0 }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async addWitnesses() {
    await super.clickBySelector(
      radioButtons.witnessesRequired.yes.selector(this.claimantDefendantParty),
    );
    await super.clickBySelector(buttons.addNewWitness.selector(this.claimantDefendantParty));
  }

  async enterWitnessDetails(witnessParty: Party) {
    await super.inputText(
      'First name',
      inputs.witnessDetails.firstName.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      'Last name',
      inputs.witnessDetails.lastName.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      '07825454749',
      inputs.witnessDetails.number.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      'firstlast@gmail.com',
      inputs.witnessDetails.email.selector(this.claimantDefendantParty, witnessParty),
    );
    await super.inputText(
      'Event',
      inputs.witnessDetails.whatEvent.selector(this.claimantDefendantParty, witnessParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
