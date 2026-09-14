import BaseDataBuilder from '../../../../base/base-data-builder';
import { claimantSolicitorUser, defendantSolicitor1User } from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import User from '../../../../models/users/user';
import respondToJudgeAdditionalInfoDataBuilderComponents from './respond-to-judge-additional-info-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class RespondToJudgeAdditionalInfoDataBuilder extends BaseDataBuilder {
  async buildDS1() {
    return this.buildData({ solicitorUser: defendantSolicitor1User });
  }

  protected async buildData({
    solicitorUser = claimantSolicitorUser
  } : {
    solicitorUser?: User
  } = {}) {
    const {civilServiceRequests} = this.requestsFactory;
    return {
      ...(await respondToJudgeAdditionalInfoDataBuilderComponents.generalAppAddlnInfoUpload(civilServiceRequests, solicitorUser)),
    };
  }
}
