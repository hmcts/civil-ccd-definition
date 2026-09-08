import BaseDataBuilder from '../../../../base/base-data-builder';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../config/users/exui-users';
import FollowUp from '../../../../constants/ccd-events/ccd-events/query-management-raise/follow-up';
import HearingRelated from '../../../../constants/ccd-events/ccd-events/query-management-raise/hearing-related';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import User from '../../../../models/users/user';
import queryManagementRaiseDataBuilderComponents from './query-management-raise-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class QueryManagementRaiseDataBuilder extends BaseDataBuilder {
  async buildRaiseQueryCS() {
    return this.buildData({ user: claimantSolicitorUser, party: partys.CLAIMANT_SOLICITOR_1 });
  }

  async buildRaiseQueryDS1() {
    return this.buildData({ user: defendantSolicitor1User, party: partys.DEFENDANT_SOLICITOR_1 });
  }

  async buildRaiseQueryDS2() {
    return this.buildData({ user: defendantSolicitor2User, party: partys.DEFENDANT_SOLICITOR_2 });
  }

  async buildRaiseQueryHearingCS() {
    return this.buildData({
      user: claimantSolicitorUser,
      party: partys.CLAIMANT_SOLICITOR_1,
      hearingRelated: HearingRelated.YES,
    });
  }

  async buildRaiseQueryHearingDS1() {
    return this.buildData({
      user: defendantSolicitor1User,
      party: partys.DEFENDANT_SOLICITOR_1,
      hearingRelated: HearingRelated.YES,
    });
  }

  async buildRaiseQueryHearingDS2() {
    return this.buildData({
      user: defendantSolicitor2User,
      party: partys.DEFENDANT_SOLICITOR_2,
      hearingRelated: HearingRelated.YES,
    });
  }

  async buildFollowQueryCS() {
    return this.buildData({
      user: claimantSolicitorUser,
      party: partys.CLAIMANT_SOLICITOR_1,
      followUp: FollowUp.YES,
    });
  }

  async buildFollowQueryDS1() {
    return this.buildData({
      user: defendantSolicitor1User,
      party: partys.DEFENDANT_SOLICITOR_1,
      followUp: FollowUp.YES,
    });
  }

  async buildFollowQueryDS2() {
    return this.buildData({
      user: defendantSolicitor2User,
      party: partys.DEFENDANT_SOLICITOR_2,
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
    }

  }
}
