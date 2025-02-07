import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-confirm-name-address-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../../constants/partys.ts';
import { Party } from '../../../../../../../models/partys.ts';
import ClaimTrack from '../../../../../../../enums/claim-track.ts';

@AllMethodsStep()
export default class ResponseConfirmNameAddressPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.address.label, { ignoreDuplicates: true }),
      super.expectLabel(radioButtons.address.yes.label, { ignoreDuplicates: true }),
      super.expectLabel(radioButtons.address.no.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYesAddress(party: Party, claimTrack?: ClaimTrack) {
    await super.clickBySelector(radioButtons.address.yes.selector(party, claimTrack));
  }

  async selectNoAddress(party: Party, claimTrack?: ClaimTrack) {
    await super.clickBySelector(radioButtons.address.no.selector(party, claimTrack));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
