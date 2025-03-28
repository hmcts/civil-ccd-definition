// this can be either a company or individual

// example url: https://manage-case.aat.platform.hmcts.net/cases/case-details/1733994380755104/trigger/MANAGE_CONTACT_INFORMATION/MANAGE_CONTACT_INFORMATIONApplicant1Party

import BasePartyPage from '../common/base-party-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import * as basePartyContent from '../common/base-party-content.ts';

@AllMethodsStep()
export default class ApplicantPartyPage extends BasePartyPage {
  async verifyApplicantName(ccdData: CCDCaseData) {
    await this.verifyName(basePartyContent.PartyType.APPLICANT, ccdData.applicant1.partyName);
  }

  async verifyApplicant1Header() {
    await this.verifyPartyHeader(basePartyContent.Headers.APPLICANT_PARTY_1);
  }

  // verify address
}
