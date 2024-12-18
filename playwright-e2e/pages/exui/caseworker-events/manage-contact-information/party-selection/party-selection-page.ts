import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';

type Party = {
  claimaint1: 'CLAIMANT_1';
  organisationIndividuals: 'CLAIMANT_1_ORGANISATION_INDIVIDUALS';
  claimaint1LrIndividuals: 'CLAIMANT_1_LR_INDIVIDUALS';
  claimaint1Witnesses: 'CLAIMANT_1_WITNESSES';
  claimaint1Experts: 'CLAIMANT_1_EXPERTS';
  defendant1: 'DEFENDANT_1';
  defendant2: 'DEFENDANT_2';
  defendant2OrganisationIndividuals: 'DEFENDANT_2_ORGANISATION_INDIVIDUALS';
  defendant1LrIndividuals: 'DEFENDANT_1_LR_INDIVIDUALS';
  defendant1Witnesses: 'DEFENDANT_1_WITNESSES';
  defendant1Experts: 'DEFENDANT_1_EXPERTS';
};

@AllMethodsStep()
export default class PartySelectionPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectParty(party: Party) {
    await super.clickBySelector(`#partyChosen_${party}`);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
