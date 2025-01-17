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
} from './claimant-response-small-claim-witnesses-content.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class ClaimantResponseSmallClaimWitnessesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.witnesses),
      super.expectSubheading(subheadings.partyWitnesses),
      super.expectText(radioButtons.witnessesRequired.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.witnessesRequired.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.witnessesRequired.no.selector);
  }

  async addWitness() {
    await super.clickBySelector(buttons.addNewWitness.selector);
  }

  async enterWitness1Details(claimantWitnessParty: Party) {
    const defendantWitnessData = CaseDataHelper.buildWitnessData(claimantWitnessParty);
    await super.inputText(
      defendantWitnessData.firstName,
      inputs.witnessDetails.firstName.selector(claimantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.lastName,
      inputs.witnessDetails.lastName.selector(claimantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.emailAddress,
      inputs.witnessDetails.email.selector(claimantWitnessParty),
    );
    await super.inputText(
      defendantWitnessData.reasonForWitness,
      inputs.witnessDetails.whatEvent.selector(claimantWitnessParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
