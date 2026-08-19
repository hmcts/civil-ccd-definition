import GaTypeLr from '../../../constants/ccd-events/initiate-general-application/ga-type-lr';
import RespondentAgreed from '../../../constants/ccd-events/initiate-general-application/respondent-agreed';
import WithNotice from '../../../constants/ccd-events/initiate-general-application/with-notice';

export default interface GeneralApplicationFeeRequest {
  gaTypesLr: GaTypeLr[];
  respondentAgreed: RespondentAgreed;
  withNotice: WithNotice;
  hearingDate?: string;
}
