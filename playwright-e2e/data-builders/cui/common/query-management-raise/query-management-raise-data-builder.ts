import BaseDataBuilder from '../../../../base/base-data-builder';
import FollowUp from '../../../../constants/ccd-events/query-management-raise/follow-up';
import HearingRelated from '../../../../constants/ccd-events/query-management-raise/hearing-related';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import User from '../../../../models/users/user';
import queryManagementRaiseDataBuilderComponents from './query-management-raise-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class QueryManagementRaiseLipDataBuilder extends BaseDataBuilder {
  async buildRaiseQueryClaimantLip() {
    return this.buildData({ user: this.claimantCitizenUser, party: partys.CLAIMANT_1 });
  }

  async buildRaiseQueryDefendantLip() {
    return this.buildData({ user: this.defendantCitizenUser, party: partys.DEFENDANT_1 });
  }

  async buildRaiseQueryHearingClaimantLip() {
    return this.buildData({
      user: this.claimantCitizenUser,
      party: partys.CLAIMANT_1,
      hearingRelated: HearingRelated.YES,
    });
  }

  async buildRaiseQueryHearingDefendantLip() {
    return this.buildData({
      user: this.defendantCitizenUser,
      party: partys.DEFENDANT_1,
      hearingRelated: HearingRelated.YES,
    });
  }

  async buildFollowQueryClaimantLip() {
    return this.buildData({
      user: this.claimantCitizenUser,
      party: partys.CLAIMANT_1,
      followUp: FollowUp.YES,
    });
  }

  async buildFollowQueryDefendantLip() {
    return this.buildData({
      user: this.defendantCitizenUser,
      party: partys.DEFENDANT_1,
      followUp: FollowUp.YES,
    });
  }

  protected async buildData({
    user,
    party,
    hearingRelated = HearingRelated.NO,
    followUp = FollowUp.NO,
  }: {
    user: User;
    party: Party;
    hearingRelated?: HearingRelated;
    followUp?: FollowUp;
  }) {
    const latestQuery = followUp === FollowUp.YES ? this.retrieveLatestQuery() : {};

    return {
      ...(await queryManagementRaiseDataBuilderComponents.followUpQueryPayload(
        this.ccdCaseData,
        user,
        this.requestsFactory.civilServiceRequests,
        latestQuery,
        followUp,
      )),
      ...(await queryManagementRaiseDataBuilderComponents.initialQueryPayload(
        this.ccdCaseData,
        user,
        party,
        this.requestsFactory.civilServiceRequests,
        hearingRelated,
        followUp,
      )),
    };
  }
}
