import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  buttons,
  inputs,
  radioButtons,
  subheadings,
} from './defendant-response-small-claim-witnesses-content.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class DefendantResponseSmallClaimWitnessesPage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.defendantParty = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.witnesses),
      super.expectSubheading(subheadings.partyWitnesses(this.defendantParty)),
      super.expectText(radioButtons.witnessesRequired.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.witnessesRequired.yes.selector(this.defendantParty));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.witnessesRequired.no.selector(this.defendantParty));
  }

  async addWitness() {
    await super.clickBySelector(buttons.addNewWitness.selector(this.defendantParty));
  }

  async enterWitness1Details(defendantWitnessParty: Party) {
    const defendantWitnessData = CaseDataHelper.buildWitnessData(defendantWitnessParty);
    await super.inputText(
      defendantWitnessData.firstName,
      inputs.witnessDetails.firstName.selector(this.defendantParty, defendantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.lastName,
      inputs.witnessDetails.lastName.selector(this.defendantParty, defendantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.emailAddress,
      inputs.witnessDetails.email.selector(this.defendantParty, defendantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.reasonForWitness,
      inputs.witnessDetails.whatEvent.selector(this.defendantParty, defendantWitnessParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
