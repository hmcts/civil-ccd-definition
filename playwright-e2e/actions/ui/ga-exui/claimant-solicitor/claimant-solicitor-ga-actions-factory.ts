import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import RespondToApplicationGaPageFactory from '../../../../pages/ga-exui/claimant-defendant-solicitor/respond-to-application-ga/respond-to-application-ga-page-factory';
import RespondToApplicationGaActions from './respond-to-application-ga-actions/respond-to-application-ga-actions';

export default class ClaimantSolicitorGaActionsFactory extends BasePageActionsFactory {
  get respondToApplicationActions() {
    return new RespondToApplicationGaActions(
      new RespondToApplicationGaPageFactory(this.page),
      this.testData,
    );
  }
}
