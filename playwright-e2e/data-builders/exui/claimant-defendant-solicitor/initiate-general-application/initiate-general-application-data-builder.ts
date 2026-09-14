import BaseDataBuilder from '../../../../base/base-data-builder';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
  defendantSolicitor2User,
} from '../../../../config/users/exui-users';
import GaTypeLr from '../../../../constants/ccd-events/ccd-events/initiate-general-application/ga-type-lr';
import GaUrgency from '../../../../constants/ccd-events/ccd-events/initiate-general-application/ga-urgency';
import RespondentAgreed from '../../../../constants/ccd-events/ccd-events/initiate-general-application/respondent-agreed';
import WithNotice from '../../../../constants/ccd-events/ccd-events/initiate-general-application/with-notice';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import User from '../../../../models/users/user';
import initiateGeneralApplicationDataBuilderComponents from './initiate-general-application-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class InitiateGeneralApplicationDataBuilder extends BaseDataBuilder {
  async buildCS1() {
    return this.buildData();
  }

  async buildWithNoticeCS1() {
    return this.buildData({withNotice: WithNotice.YES});
  }

  async buildDS1() {
    return this.buildData({ solicitorParty: partys.DEFENDANT_SOLICITOR_1, solicitorUser: defendantSolicitor1User });
  }

  async buildDS2() {
    return this.buildData({ solicitorParty: partys.DEFENDANT_SOLICITOR_2, solicitorUser: defendantSolicitor2User });
  }

  protected async buildData({
    gaTypesLr = [
      GaTypeLr.STRIKE_OUT,
      GaTypeLr.SUMMARY_JUDGEMENT,
      GaTypeLr.EXTEND_TIME,
    ],
    respondentAgreed = RespondentAgreed.NO,
    gaUrgency = GaUrgency.NO,
    withNotice = WithNotice.NO,
    solicitorParty = partys.CLAIMANT_SOLICITOR_1,
    solicitorUser = claimantSolicitorUser
  }: {
    gaTypesLr?: GaTypeLr[];
    respondentAgreed?: RespondentAgreed;
    gaUrgency?: GaUrgency;
    withNotice?: WithNotice;
    solicitorParty?: Party;
    solicitorUser?: User
  } = {}) {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...initiateGeneralApplicationDataBuilderComponents.typePage(gaTypesLr),
      ...initiateGeneralApplicationDataBuilderComponents.hearingDate(),
      ...initiateGeneralApplicationDataBuilderComponents.defendantAgreementPage(
        respondentAgreed,
      ),
      ...initiateGeneralApplicationDataBuilderComponents.gaUrgencyRecordPage(
        gaUrgency,
        solicitorParty,
      ),
      ...initiateGeneralApplicationDataBuilderComponents.gaWithOrWithoutNoticePage(
        withNotice,
        solicitorParty,
      ),
      ...initiateGeneralApplicationDataBuilderComponents.hearingDetails(
        solicitorParty,
        solicitorUser,
      ),
      ...(await initiateGeneralApplicationDataBuilderComponents.gaPbaDetailsGaSpec(
        civilServiceRequests,
        gaTypesLr,
        respondentAgreed,
        withNotice,
        solicitorUser,
      )),
      ...(await initiateGeneralApplicationDataBuilderComponents.statementOfTruth(
        civilServiceRequests,
        solicitorParty,
        solicitorUser,
      )),
    };
  }
}
