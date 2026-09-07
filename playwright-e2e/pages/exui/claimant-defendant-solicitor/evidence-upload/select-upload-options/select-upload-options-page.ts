import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { heading, radioButtons } from './select-upload-options-content.ts';
import { ClaimantDefendantPartyType } from '../../../../../models/users/claimant-defendant-party-types.ts';

@AllMethodsStep()
export default class SelectUploadOptionsPage extends ExuiPage(BasePage) {
  async verifyContent(
    defendant1PartyType: ClaimantDefendantPartyType,
    defendant2PartyType: ClaimantDefendantPartyType,
  ) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.label),
      super.expectLabel(radioButtons.defendant1.label(defendant1PartyType)),
      super.expectLabel(radioButtons.defendant2.label(defendant2PartyType)),
      super.expectLabel(radioButtons.defendant1and2.label),
    ]);
  }

  async selectDefendant1(defendant1PartyType: ClaimantDefendantPartyType) {
    super.clickByLabel(radioButtons.defendant1.label(defendant1PartyType));
  }

  async selectDefendant2(defendant1PartyType: ClaimantDefendantPartyType) {
    super.clickByLabel(radioButtons.defendant2.label(defendant1PartyType));
  }

  async selectDefendant1and2() {
    super.clickByLabel(radioButtons.defendant1and2.label);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
