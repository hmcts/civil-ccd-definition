// can be either a company or individual

// example url: https://manage-case.aat.platform.hmcts.net/cases/case-details/1733994380755104/trigger/MANAGE_CONTACT_INFORMATION/MANAGE_CONTACT_INFORMATIONDefendant1Party

import BasePartyPage from '../common/base-party-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import * as basePartyContent from '../common/base-party-content.ts';

@AllMethodsStep()
export default class DefendantPartyPage extends BasePartyPage {
  async verifyDefendantName(ccdData: CCDCaseData) {
    await this.verifyName(basePartyContent.PartyType.RESPONDENT, ccdData.respondent1.partyName);
  }

  async verifyApplicant1Header() {
    await this.verifyPartyHeader(basePartyContent.Headers.DEFENDANT_1_PARTY);
  }

  // verify address
}
