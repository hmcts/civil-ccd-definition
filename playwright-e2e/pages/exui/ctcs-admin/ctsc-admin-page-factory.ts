import MediationUnsuccessfulPage from './mediation-unsuccessful-page';
import MediationUnsuccessfulWorkAllocationIntegrationFieldsPage from './mediation-unsuccessful-work-allocation-integration-fields-page';
import MediationUnsuccessfulCheckYourAnswersPage from './mediation-unsuccessful-check-your-answers-page';
import BasePageFactory from '../../../base/base-page-factory';

export default class CtscAdminPageFactory extends BasePageFactory {
  get mediationUnsuccessfulPage() {
    return new MediationUnsuccessfulPage(this.page);
  }

  get mediationUnsuccessfulWorkAllocationPage() {
    return new MediationUnsuccessfulWorkAllocationIntegrationFieldsPage(this.page);
  }

  get mediationUnsuccessfulCheckYourAnswersPage() {
    return new MediationUnsuccessfulCheckYourAnswersPage(this.page);
  }
}
