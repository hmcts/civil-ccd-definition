import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import evidenceUploadRespondentDataBuilderComponents from './evidence-upload-respondent-data-builder-components';

@AllMethodsStep()
export default class EvidenceUploadRespondentDataBuilder extends BaseDataBuilder {
  async buildDS1Fast() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildDS1Fast1v2SS() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
    });
  }

  async buildDS2Fast() {
    return this.buildData({
      claimTrack: ClaimTrack.FAST_CLAIM,
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      witness1Party: partys.DEFENDANT_2_WITNESS_1,
      witness2Party: partys.DEFENDANT_2_WITNESS_2,
      expertParty: partys.DEFENDANT_1_EXPERT_1,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2
    });
  }

  async buildDS1Small() {
    return this.buildData();
  }

  protected async buildData({
    claimTrack = ClaimTrack.SMALL_CLAIM,
    claimType = ClaimType.ONE_VS_ONE,
    witness1Party = partys.DEFENDANT_1_WITNESS_1,
    witness2Party = partys.DEFENDANT_1_WITNESS_2,
    expertParty = partys.DEFENDANT_1_EXPERT_1,
    defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
  }: {
    claimTrack?: ClaimTrack;
    claimType?: ClaimType;
    witness1Party?: Party;
    witness2Party?: Party;
    expertParty?: Party;
    defendantSolicitorParty?: Party;
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...evidenceUploadRespondentDataBuilderComponents.evidenceUpload,
      ...evidenceUploadRespondentDataBuilderComponents.selectUploadOptions(claimType),
      ...evidenceUploadRespondentDataBuilderComponents.documentSelection(claimTrack),
      ...(await evidenceUploadRespondentDataBuilderComponents.documentUploadFastTrack(
        claimTrack,
        witness1Party,
        expertParty,
        defendantSolicitorParty,
        civilServiceRequests,
      )),
      ...(await evidenceUploadRespondentDataBuilderComponents.documentUploadSmallClaim(
        claimTrack,
        witness1Party,
        witness2Party,
        expertParty,
        defendantSolicitorParty,
        civilServiceRequests,
      )),
      ...evidenceUploadRespondentDataBuilderComponents.undefine,
    };
  }
}
