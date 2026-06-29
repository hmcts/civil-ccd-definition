import { z } from 'zod';
import BaseSchemaBuilder from '../../../../../base/base-schema-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimType from '../../../../../constants/cases/claim-type';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import ZodHelper from '../../../../../helpers/zod-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';
import defendantResponseSpecSchemaComponents from './defendant-response-spec-schema-components';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

@AllMethodsStep({ methodNamesToIgnore: ['buildSchema'] })
export default class DefendantResponseSpecSchemaBuilder extends BaseSchemaBuilder {
  async buildFastTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildDS2FastTrackFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  async buildFastTrack2v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildFastTrack1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmallTrack1v1FullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_ONE,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmallTrack1v2SSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildSmallTrack1v2DSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
    });
  }

  async buildDS2SmallTrack1v2DSFullDefence(caseDataBeforeSubmission?: CCDCaseData) {
    return this.buildSchema(caseDataBeforeSubmission, {
      claimType: ClaimType.ONE_VS_TWO_DIFF_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      responseType: DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty: partys.DEFENDANT_SOLICITOR_2,
    });
  }

  protected async buildSchema(
    caseDataBeforeSubmission: CCDCaseData | undefined,
    {
      claimType = ClaimType.ONE_VS_ONE,
      claimTrack = ClaimTrack.SMALL_CLAIM,
      responseType = DefendantResponseSpecType.FULL_DEFENCE,
      defendantSolicitorParty = partys.DEFENDANT_SOLICITOR_1,
    }: {
      caseDataBeforeSubmission?: CCDCaseData;
      claimType: ClaimType;
      claimTrack: ClaimTrack;
      responseType: DefendantResponseSpecType;
      defendantSolicitorParty?: Party;
    },
  ): Promise<z.ZodType> {
    const baseSchema = ZodHelper.createSchemaFromJson(caseDataBeforeSubmission, {
      strictObjects: false,
    }) as z.ZodObject<any>;

    return baseSchema.extend({
      ...defendantResponseSpecSchemaComponents.responseClaimTrack(claimTrack),
      ...defendantResponseSpecSchemaComponents.singleResponse(claimType),
      ...defendantResponseSpecSchemaComponents.responseConfirmNameAddress(claimType, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.responseConfirmDetails(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.respondentResponseType(
        responseType,
        claimType,
        defendantSolicitorParty,
      ),
      ...defendantResponseSpecSchemaComponents.defenceRoute(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.upload(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.timeline(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.mediationContactInformation(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.mediationAvailability(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.determinationWithoutHearing(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.fastTrackDq(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.experts(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.witnesses(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.language(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.hearing(claimTrack, defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.requestedCourtLocation(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.hearingSupport(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.vulnerabilityQuestions(defendantSolicitorParty),
      ...defendantResponseSpecSchemaComponents.applications(claimTrack, defendantSolicitorParty),
    });
  }
}
