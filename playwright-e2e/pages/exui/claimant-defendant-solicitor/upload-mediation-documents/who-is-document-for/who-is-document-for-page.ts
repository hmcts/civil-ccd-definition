import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { headings, radioButtons } from './who-is-document-for-content';
import { ClaimantDefendantPartyType } from '../../../../../models/users/claimant-defendant-party-types.ts';

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

  async selectClaimant1(claimant1PartyType: ClaimantDefendantPartyType) {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant1.label(claimant1PartyType));
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant1.selector
    );
  }

  async selectClaimant2(claimant2PartyType: ClaimantDefendantPartyType) {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant2.label(claimant2PartyType));
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.claimant2.selector
    );
  }

  async selectBothClaimants() {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.claimants.label);
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.claimants.selector
    );
  }

  async selectD1(defendant1PartyType: ClaimantDefendantPartyType) {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant1.label(defendant1PartyType));
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant1.selector,
    );
  }

  async selectD2(defendant2PartyType: ClaimantDefendantPartyType) {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant2.label(defendant2PartyType));
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendant2.selector,
    );
  }

  async selectBothDefendants() {
    await super.expectLabel(radioButtons.uploadMediationDocumentsPartyChosen.parties.defendants.label);
    await super.clickBySelector(
      radioButtons.uploadMediationDocumentsPartyChosen.parties.defendants.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
