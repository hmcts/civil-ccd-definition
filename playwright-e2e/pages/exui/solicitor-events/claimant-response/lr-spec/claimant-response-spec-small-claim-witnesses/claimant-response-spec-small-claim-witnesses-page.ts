import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  claimantWitnessesLegends,
  witnessesNumber,
  witnessesRadioForm,
  witnessesActionButtons,
  witnessDetailsForm,
  subHeadings,
} from './claimant-response-spec-small-claim-witnesses-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecSmallClaimWitnessesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeadings.pageSubHeading.label, { first: true }),
      super.expectSubheading(subHeadings.claimantSubHeading.label),
      super.expectText(claimantWitnessesLegends.anyWitnesses, { first: true }),
      super.expectLabel(witnessesNumber.input.label),
    ]);
  }
  async witnessSelectYes() {
    await super.clickBySelector(witnessesRadioForm.radioYes.selector);
  }

  async addNewWitness() {
    await super.clickBySelector(witnessesActionButtons.addNewWitnessTop.selector);
  }

  async fillSmallClaimWitnessDetails() {
    await super.inputText('Witness 1 ', witnessDetailsForm.firstName.selector);
    await super.inputText('Witness Last Name', witnessDetailsForm.lastName.selector);
    await super.inputText('07173783974', witnessDetailsForm.phoneNumber.selector);
    await super.inputText('Witness1@gmail.com', witnessDetailsForm.emailAddress.selector);
    await super.inputText(
      'the witness had evidence',
      witnessDetailsForm.reasonForWitness1v2SS.selector,
    );
  }
  async fillSmallClaimWitnessesNumber() {
    await super.inputText('2', witnessesNumber.input.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
