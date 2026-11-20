import Timeline from '../../../../enums/timeline.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { FeesHelper } from '../../../../helpers/FeesHelper.ts';
import { PaymentHelper } from '../../../../helpers/PaymentHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { specClaimAmountInPounds } from '../../createSpecifiedCase.ts';
import { SpecifiedConfig } from '../../../journey/specified/specifiedConfig.ts';
import { buildCreateClaimSpecPayload, CreateClaimSpecLookups, specInterestInPounds } from './payloads/createClaimSpecPayload.ts';

// Creates a specified claim as the claimant solicitor through the CCD API, with the whole of the claim's case data in
// one submit, instead of going through the CREATE_CLAIM_SPEC pages in XUI. The claim is left waiting for its fee to be
// paid (PENDING_CASE_ISSUED), as it is after the UI's Submit, and payClaimFee pays it.
export class CreateClaimSpec {
  private ccdApiHelper = new CcdApiHelper();

  // Returns the new case's ID
  async create(c: SpecifiedConfig): Promise<string> {
    const lookups = await this.lookUp(c);
    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'CREATE_CLAIM_SPEC');
    const payload = buildCreateClaimSpecPayload(c, started.caseData, lookups);
    const created = await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'CREATE_CLAIM_SPEC', started.token, payload);
    console.log(`CREATE_CLAIM_SPEC submitted through the API: case ${created.id} is in state ${created.state}`);
    return String(created.id);
  }

  // Pays the claim fee from the claimant solicitor's PBA account through the payment service, as the UI's "Pay now"
  // does, once civil-service has made the fee's service request. The payment service then tells civil-service, which
  // issues the claim.
  async payClaimFee(caseId: string) {
    const serviceRequestReference = await new TestingEndPointHelper().waitForServiceRequestReference(caseId, 'claimIssuedPBADetails');
    await new PaymentHelper().payServiceRequestByPba(claimantSolicitorCredentials, caseId, serviceRequestReference, 'ApplicantSolicitorReference');
  }

  // The claim fee, which is for the amount claimed plus the interest the claim includes when it is submitted (as the
  // UI works it out), and the timeline document, uploaded before the claim is submitted (only when it is uploaded)
  private async lookUp(c: SpecifiedConfig): Promise<CreateClaimSpecLookups> {
    const feeAmountInPounds = specClaimAmountInPounds(c.track) + specInterestInPounds(c);
    const lookups: CreateClaimSpecLookups = {
      claimFee: await new FeesHelper().getClaimFee(claimantSolicitorCredentials, feeAmountInPounds),
      timelineDocument: c.timeline === Timeline.UPLOAD
        ? await new TestingEndPointHelper().uploadTestDocument(claimantSolicitorCredentials)
        : undefined,
    };
    console.log(`Claim fee for £${feeAmountInPounds}: ${lookups.claimFee.code} v${lookups.claimFee.version} ${lookups.claimFee.calculatedAmountInPence}p`);
    return lookups;
  }
}
