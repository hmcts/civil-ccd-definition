import moment from 'moment-business-days';
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';

// Records that mediation settled a specified small claim (MEDIATION_SUCCESSFUL) as the hearing centre admin through the
// CCD API, instead of the event's pages in XUI: the settlement was agreed today, and civil-service's test document is
// the mediation agreement. civil-service moves the claim to CASE_STAYED.
export class MediationSuccessful {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    const agreement = await new TestingEndPointHelper().uploadTestDocument(hearingCentreAdminCredentials);
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'MEDIATION_SUCCESSFUL', caseId, [
      { page: 'MediationSuccessful', answers: { mediationSettlementAgreedAt: moment().format('YYYY-MM-DD') } },
      { page: 'MediationAgreement', answers: { mediationAgreement: { name: 'Mediation agreement', documentType: 'MEDIATION_AGREEMENT', document: agreement } } },
    ]);
    console.log(`MEDIATION_SUCCESSFUL submitted through the API on case ${caseId}`);
  }
}
