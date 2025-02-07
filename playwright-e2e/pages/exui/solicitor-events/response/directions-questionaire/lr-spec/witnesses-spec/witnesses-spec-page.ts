import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, buttons, inputs, radioButtons } from './witnesses-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';

@AllMethodsStep()
export default class WitnessesSpecPage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.witnesses, { ignoreDuplicates: true }),
        super.expectText(radioButtons.witnessesRequired.label, { ignoreDuplicates: true }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async addWitnesses() {
    await super.clickBySelector(radioButtons.witnessesRequired.yes.selector(this.defendantParty));
    await super.clickBySelector(buttons.addNewWitness.selector(this.defendantParty));
  }

  async enterWitnessDetails(witnessParty: Party) {
    const witnessData = CaseDataHelper.buildWitnessData(witnessParty);
    await super.inputText(
      witnessData.firstName,
      inputs.witnessDetails.firstName.selector(this.defendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.lastName,
      inputs.witnessDetails.lastName.selector(this.defendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.phoneNumber,
      inputs.witnessDetails.number.selector(this.defendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.emailAddress,
      inputs.witnessDetails.email.selector(this.defendantParty, witnessParty),
    );
    await super.inputText(
      witnessData.reasonForWitness,
      inputs.witnessDetails.reasonForWitness.selector(this.defendantParty, witnessParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
