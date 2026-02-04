import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { text } from './applicant-1-party-content.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import PartyTypeIndividualFragment from '../../../fragments/party-type/party-type-individual-fragment.ts';
import { Page } from '@playwright/test';
import partys from '../../../../../constants/partys.ts';
import AddressFragment from '../../../fragments/address/address-fragment.ts';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';

@AllMethodsStep()
export default class Applicant1PartyPage extends ExuiPage(BasePage) {
  private partyTypeIndividualFragment: PartyTypeIndividualFragment;
  private addressFragment: AddressFragment;

  constructor(page: Page) {
    super(page);
    this.partyTypeIndividualFragment = new PartyTypeIndividualFragment(page, partys.CLAIMANT_1);
    this.addressFragment = new AddressFragment(page, partys.CLAIMANT_1);
  }

  async verifyContent(ccdCaseData: CCDCaseData, claimant1PartyType: ClaimantDefendantPartyType) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(text.party(partys.CLAIMANT_1, claimant1PartyType))
    ]);
  }

  async enterDetailsIndividual(ccdEventState: { id: string }) {
    await this.partyTypeIndividualFragment.verifyContent();
    await this.partyTypeIndividualFragment.enterIndividualDetails({ ccdEventState });
    await this.addressFragment.enterAddressManual({ ccdEventState });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
