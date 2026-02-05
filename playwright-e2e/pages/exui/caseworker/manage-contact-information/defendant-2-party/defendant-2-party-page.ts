import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { subheadings } from '../defendant-1-party/defendant-1-party-content.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import PartyTypeCompanyFragment from '../../../fragments/party-type/party-type-company-fragment.ts';
import { Page } from '@playwright/test';
import partys from '../../../../../constants/partys.ts';
import AddressFragment from '../../../fragments/address/address-fragment.ts';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types.ts';

@AllMethodsStep()
export default class Defendant2PartyPage extends ExuiPage(BasePage) {

  private partyTypeCompanyFragment: PartyTypeCompanyFragment;
  private addressFragment: AddressFragment;

  constructor(page: Page) {
    super(page);

    this.partyTypeCompanyFragment = new PartyTypeCompanyFragment(page, partys.DEFENDANT_2);
    this.addressFragment = new AddressFragment(page, partys.DEFENDANT_2);
  }

  async verifyContent(ccdCaseData: CCDCaseData, defendant2PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),

      super.expectText(subheadings.party(partys.DEFENDANT_2, defendant2PartyType)),

    ]);
  }

  async enterDetailsCompany(ccdEventState: { id: string }) {
    await this.partyTypeCompanyFragment.verifyContent();
    await this.partyTypeCompanyFragment.enterCompanyDetails({ ccdEventState });
    await this.addressFragment.findAddress("SW1E 5LB", 4);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
