import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  witnessesSubHeadings,
  witnessesNumber,
  witnessesRadioForm,
  witnessesActionButtons,
  witnessDetailsForm,
} from './claimant-response-witnesses-content.ts';

@AllMethodsStep()
export default class ClaimantResponseWitnessesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(witnessesSubHeadings.witnesses, {
        containerSelector: witnessesSubHeadings.containerSelector,
      }),
      super.expectText(witnessesRadioForm.text, { first: true }),
    ]);
  }
  async witnessSelectYes() {
    await super.clickBySelector(witnessesRadioForm.radioYes.selector);
  }

  async addNewWitness() {
    await super.expectText(witnessesSubHeadings.witnessesDetails, { first: true });
    await super.clickBySelector(witnessesActionButtons.addNewWitnessTop.selector);
  }

  async fillWitnessDetails() {
    await super.inputText('Witness 1 ', witnessDetailsForm.firstName.selector);
    await super.inputText('Witness Last Name', witnessDetailsForm.lastName.selector);
    await super.inputText('07173783974', witnessDetailsForm.phoneNumber.selector);
    await super.inputText('Witness1@gmail.com', witnessDetailsForm.emailAddress.selector);
    await super.inputText('the witness had evidence', witnessDetailsForm.reasonForWitness.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
