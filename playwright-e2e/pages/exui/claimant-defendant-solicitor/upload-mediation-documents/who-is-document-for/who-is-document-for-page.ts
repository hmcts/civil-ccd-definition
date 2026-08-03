import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { headings, radioButtons } from './who-is-document-for-content';

@AllMethodsStep()
export default class WhoIsDocumentForPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.selectParty),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectText(radioButtons.uploadMediationDocumentsPartyChosen.hintText),
      super.expectText(radioButtons.uploadMediationDocumentsPartyChosen.label),
    ]);
  }

  async selectClaimant1() {
    await super.clickBySelector(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant1);
  }

  async selectClaimant2() {
    await super.clickBySelector(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant2);
  }

  async selectBothClaimants() {
    await super.clickBySelector(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimants);
  }

  async selectDefendant1() {
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant1,
    );
  }

  async selectDefendant2() {
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant2,
    );
  }

  async selectBothDefendants() {
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendants,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
