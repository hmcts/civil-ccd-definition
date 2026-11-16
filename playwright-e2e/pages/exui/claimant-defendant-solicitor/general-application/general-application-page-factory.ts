import BasePageFactory from '../../../../base/base-page-factory';
import GaConfirmPage from './ga-confirm-page';
import GaHearingDatePage from './ga-hearing-date-page';
import GaHearingDetailsPage from './ga-hearing-details-page';
import GaPbaDetailsPage from './ga-pba-details-page';
import GaRespondentAgreementPage from './ga-respondent-agreement-page';
import GaStatementOfTruthPage from './ga-statement-of-truth-page';
import GaSubmitPage from './ga-submit-page';
import GaTypePage from './ga-type-page';
import GaUrgencyRecordPage from './ga-urgency-record-page';
import GaWithOrWithoutNoticePage from './ga-with-or-without-notice-page';

export default class GeneralApplicationPageFactory extends BasePageFactory {
  get gaTypePage() {
    return new GaTypePage(this.page);
  }

  get gaHearingDatePage() {
    return new GaHearingDatePage(this.page);
  }

  get gaRespondentAgreementPage() {
    return new GaRespondentAgreementPage(this.page);
  }

  get gaUrgencyRecordPage() {
    return new GaUrgencyRecordPage(this.page);
  }

  get gaWithOrWithoutNoticePage() {
    return new GaWithOrWithoutNoticePage(this.page);
  }

  get gaStatementOfTruthPage() {
    return new GaStatementOfTruthPage(this.page);
  }

  get gaHearingDetailsPage() {
    return new GaHearingDetailsPage(this.page);
  }

  get gaPbaDetailsPage() {
    return new GaPbaDetailsPage(this.page);
  }

  get gaSubmitPage() {
    return new GaSubmitPage(this.page);
  }

  get gaConfirmPage() {
    return new GaConfirmPage(this.page);
  }
}
