import yesNo from '../../../../enums/yesNo.ts';
import { claimantSolicitorCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { FeesHelper } from '../../../../helpers/FeesHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import { claimAmountInPounds } from '../../createUnspecifiedCase.ts';
import { UnspecifiedConfig } from '../../../journey/unspecified/unspecifiedConfig.ts';
import { buildCreateClaimPayload, CreateClaimLookups, hasOtherRemedy } from './payloads/createClaimPayload.ts';

// Creates an unspecified claim as the claimant solicitor through the CCD API, with the whole of the claim's case data
// in one submit, instead of going through the CREATE_CLAIM pages in XUI. The claim is left waiting for its fee to be
// paid (PENDING_CASE_ISSUED), as it is after the UI's Submit.
export class CreateClaim {
  private ccdApiHelper = new CcdApiHelper();

  // Returns the new case's ID
  async create(c: UnspecifiedConfig): Promise<string> {
    const lookups = await this.lookUp(c);
    const started = await this.ccdApiHelper.startEvent(claimantSolicitorCredentials, 'CREATE_CLAIM');
    const payload = buildCreateClaimPayload(c, started.caseData, lookups);
    const created = await this.ccdApiHelper.submitEvent(claimantSolicitorCredentials, 'CREATE_CLAIM', started.token, payload);
    console.log(`CREATE_CLAIM submitted through the API: case ${created.id} is in state ${created.state}`);
    return String(created.id);
  }

  // The fees for the claim's value (the same value the UI enters for its track), and the certificate of suitability
  // a claimant's litigation friend needs, uploaded before the claim is submitted
  private async lookUp(c: UnspecifiedConfig): Promise<CreateClaimLookups> {
    const feesHelper = new FeesHelper();
    const amountInPounds = Number(claimAmountInPounds(c.track, c.typeOfClaim));
    const needsCertificate = c.claimShape.claimants.some((claimant) => claimant.litigationFriend === yesNo.YES);
    const lookups: CreateClaimLookups = {
      amountInPounds,
      claimFee: await feesHelper.getClaimFee(claimantSolicitorCredentials, amountInPounds),
      otherRemedyFee: hasOtherRemedy(c.typeOfClaim) ? await feesHelper.getOtherRemedyFee(amountInPounds) : undefined,
      certificateOfSuitability: needsCertificate
        ? await new TestingEndPointHelper().uploadTestDocument(claimantSolicitorCredentials)
        : undefined,
    };
    console.log(`Claim value £${amountInPounds}: claim fee ${lookups.claimFee.code} v${lookups.claimFee.version} ${lookups.claimFee.calculatedAmountInPence}p`
      + (lookups.otherRemedyFee ? `, other remedy fee ${lookups.otherRemedyFee.code} v${lookups.otherRemedyFee.version} ${lookups.otherRemedyFee.calculatedAmountInPence}p` : ''));
    return lookups;
  }
}
