import BasePageFactory from '../../../../base/base-page-factory';
import DefendantDetailsPage from './unspec/defendant-details/defendant-details-page';
import ShowCertifyStatmentPage from './unspec/show-certify-statement/show-certify-statement-page';
import HearingTypePage from './unspec/hearing-type/hearing-type-page';
import HearingSupportRequirementsFieldPage from './unspec/hearing-support-requirements-field/hearing-support-requirements-field-page';

export default class DefaultJudgmentPageFactory extends BasePageFactory {
  get defendantDetailsPage() {
    return new DefendantDetailsPage(this.page);
  }

  get showCertifyStatementPage() {
    return new ShowCertifyStatmentPage(this.page);
  }

  get hearingTypePage() {
    return new HearingTypePage(this.page);
  }

  get hearingSupportRequirementsFieldPage() {
    return new HearingSupportRequirementsFieldPage(this.page);
  }
}
