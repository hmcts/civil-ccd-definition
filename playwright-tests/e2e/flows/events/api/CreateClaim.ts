import yesNo from '../../../../enums/yesNo.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { buildCreateClaimPayload } from './payloads/createClaimPayload.ts';

// Creates an unspecified claim as the claimant solicitor through the CCD API, with the whole of the claim's case data
// in one submit, instead of going through the CREATE_CLAIM pages in XUI. The claim is left waiting for its fee to be
// paid (PENDING_CASE_ISSUED), as it is after the UI's Submit.
export class CreateClaim {
  private ccdApiHelper = new CcdApiHelper();

  // Returns the new case's ID
  async create(c: UnspecifiedConfig): Promise<string> {
    // A claimant's litigation friend needs a certificate of suitability, uploaded before the claim is submitted
    const needsCertificate = c.claimShape.claimants.some((claimant) => claimant.litigationFriend === yesNo.YES);
    const certificateOfSuitability = needsCertificate
      ? await new TestingEndPointHelper().uploadTestDocument(claimantSolicitorCredentials)
      : undefined;

    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'CREATE_CLAIM');
    const payload = buildCreateClaimPayload(c, started.caseData, certificateOfSuitability);
    const created = await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'CREATE_CLAIM', started.token, payload);
    console.log(`CREATE_CLAIM submitted through the API: case ${created.id} is in state ${created.state}`);
    return String(created.id);
  }
}
