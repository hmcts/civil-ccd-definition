import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response-spec/defendant-response-spec-type';
import defendantResponseSpecData from './defendant-response-spec-data-components';
import DefendantResponseSpecTypeObjs from '../../../../../models/ccd-events/defendant-response-spec/defendant-response-spec-type-objs';
import DefenceRouteSpec from '../../../../../constants/ccd-events/defendant-response-spec/defence-route-spec';
import { defendantSolicitor1User } from '../../../../../config/users/exui-users';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DefendantResponseSpecDataBuilder extends BaseDataBuilder {
  async buildFastTrack1v1FullDefence() {
    return this.buildData({ 
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType: 
        { 
          defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE, 
          defenceRoute: DefenceRouteSpec.DISPUTE,  
        },
      },
    );
  }

  async buildFastTrack2v1FullDefence() {
    return this.buildData({
      claimType: ClaimType.TWO_VS_ONE,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType:
        {
          defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
          defenceRoute: DefenceRouteSpec.DISPUTE,
        },
    });
  }

  async buildFastTrack1v2SSFullDefence() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.FAST_CLAIM,
      defendantResponseSpecType:
        {
          defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
          defenceRoute: DefenceRouteSpec.DISPUTE,
        },
    });
  }

  async buildSmallTrack1v1FullDefence() {
    return this.buildData({
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType:
        {
          defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
          defenceRoute: DefenceRouteSpec.DISPUTE,
        },
    });
  }

  async buildSmallTrack1v2SSFullDefence() {
    return this.buildData({
      claimType: ClaimType.ONE_VS_TWO_SAME_SOL,
      claimTrack: ClaimTrack.SMALL_CLAIM,
      defendantResponseSpecType:
        {
          defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
          defenceRoute: DefenceRouteSpec.DISPUTE,
        },
    });
  }

  protected async buildData({ 
    claimType = ClaimType.ONE_VS_ONE,
    claimTrack = ClaimTrack.SMALL_CLAIM,
    defendantResponseSpecType = { 
        defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE, 
        defenceRoute: DefenceRouteSpec.DISPUTE,  
      }
    } : 
    { 
      claimType?: ClaimType;
      claimTrack?: ClaimTrack;
      defendantResponseSpecType?: DefendantResponseSpecTypeObjs 
    }) {
      const { civilServiceRequests } = this.requestsFactory; 
      const defenceResponseDocumentSpec =
        await civilServiceRequests.uploadTestDocument(defendantSolicitor1User);

      return {
        ...defendantResponseSpecData.defendantChecklist,
        ...defendantResponseSpecData.responseConfirmNameAddress(claimType),
        ...defendantResponseSpecData.responseConfirmDetails,
        ...defendantResponseSpecData.singleResponse(claimType),
        ...defendantResponseSpecData.defendantResponse(defendantResponseSpecType, claimType),
        ...defendantResponseSpecData.upload(defenceResponseDocumentSpec),
        ...defendantResponseSpecData.timeline,
        ...defendantResponseSpecData.mediationContactInformation(claimTrack),
        ...defendantResponseSpecData.mediationAvailability(claimTrack),
        ...defendantResponseSpecData.determinationWithoutHearing(claimTrack),
        ...defendantResponseSpecData.fastTrackDq(claimTrack),
        ...defendantResponseSpecData.experts(claimTrack),
        ...defendantResponseSpecData.witnesses(claimTrack),
        ...defendantResponseSpecData.language,
        ...defendantResponseSpecData.hearing(claimTrack),
        ...defendantResponseSpecData.requestedCourtLocation,
        ...defendantResponseSpecData.hearingSupport,
        ...defendantResponseSpecData.vulnerabilityQuestions,
        ...defendantResponseSpecData.applications(claimTrack),
        ...defendantResponseSpecData.statementOfTruth,
      };
  }
}
