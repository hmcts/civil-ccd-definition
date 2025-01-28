import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, inputs, radioButtons, subheadings } from './small-claim-witnesses-content.ts';
import CaseDataHelper from '../../../../../../../helpers/case-data-helper.ts';
import partys from '../../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class SmallClaimWitnessesClaimantPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.witnesses),
      super.expectSubheading(subheadings.claimantWitnesses),
      super.expectText(radioButtons.witnessesRequired.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.witnessesRequired.yes.selector(partys.CLAIMANT_1));
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.witnessesRequired.no.selector(partys.CLAIMANT_1));
  }

  async addWitness() {
    await super.clickBySelector(buttons.addNewWitness.selector(partys.CLAIMANT_1));
  }

  async enterWitness1Details() {
    const claimantWitnessData = CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1);
    await super.inputText(
      claimantWitnessData.firstName,
      inputs.witnessDetails.firstName.selector(partys.CLAIMANT_1, partys.CLAIMANT_WITNESS_1),
    );
    await super.inputText(
      claimantWitnessData.lastName,
      inputs.witnessDetails.lastName.selector(partys.CLAIMANT_1, partys.CLAIMANT_WITNESS_1),
    );

    await super.inputText(
      claimantWitnessData.phoneNumber,
      inputs.witnessDetails.number.selector(partys.CLAIMANT_1, partys.CLAIMANT_WITNESS_1),
    );
    await super.inputText(
      claimantWitnessData.emailAddress,
      inputs.witnessDetails.email.selector(partys.CLAIMANT_1, partys.CLAIMANT_WITNESS_1),
    );
    await super.inputText(
      claimantWitnessData.reasonForWitness,
      inputs.witnessDetails.whatEvent.selector(partys.CLAIMANT_1, partys.CLAIMANT_WITNESS_1),
    );
  }

  async enterWitnessNumber() {
    await super.inputText('0', inputs.witnessNumber.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
