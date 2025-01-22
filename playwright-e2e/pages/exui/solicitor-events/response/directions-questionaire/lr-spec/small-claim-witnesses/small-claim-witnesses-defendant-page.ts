import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, inputs, radioButtons, subheadings } from './small-claim-witnesses-content.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class SmallClaimWitnessesDefendantPage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.witnesses),
        super.expectSubheading(subheadings.defendantWitnesses(this.defendantParty)),
        super.expectText(radioButtons.witnessesRequired.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
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

  async enterWitnessDetails(defendantWitnessParty: Party) {
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
