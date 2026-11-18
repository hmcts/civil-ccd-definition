import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import RespondToApplicationGaActions from '../claimant-solicitor/respond-to-application-ga-actions/respond-to-application-ga-actions';
import RespondToApplicationGaPageFactory from '../../../../pages/ga-exui/claimant-defendant-solicitor/respond-to-application-ga/respond-to-application-ga-page-factory';

export default class DefendantSolicitorGaActionsFactory extends BasePageActionsFactory {
  get respondToApplicationActions() {
    return new RespondToApplicationGaActions(
      new RespondToApplicationGaPageFactory(this.page),
      this.testData,
    );
  }
}
