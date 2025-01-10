import BasePageFactory from '../../../../../base/base-page-factory';
import ApplicationPage from './lr-spec/application/application-page';
import party from '../../../../../enums/party';
import CourtLocationPage from './lr-spec/court-location/court-location-page';
import SmallClaimExpertsPage from './lr-spec/small-claim-experts/small-claim-experts-page';
import SmallClaimWitnessesPage from './lr-spec/small-claim-witnesses/small-claim-witnesses-page';
import HearingLRSpecPage from './lr-spec/hearing-lr-spec/hearing-lr-spec-page';
import RequestedCourtLRSpecPage from './lr-spec/requested-court-lr-spec/requested-court-lr-spec-page';
import RequestedCourtPage from './unspec/requested-court/requested-court-page';

export default class DirectionsQuestionairePageFactory extends BasePageFactory {
  get applicationPage() {
    return new ApplicationPage(this.page, party.RESPONDENT_1);
  }

  get courtLocationPage() {
    return new CourtLocationPage(this.page);
  }

  get smallClaimExpertPage() {
    return new SmallClaimExpertsPage(this.page, party.RESPONDENT_1);
  }

  get smallClaimWitnessesPage() {
    return new SmallClaimWitnessesPage(this.page, party.RESPONDENT_1);
  }

  get hearingLRSpecPage() {
    return new HearingLRSpecPage(this.page, party.RESPONDENT_1);
  }

  get requestedCourtLocationLRSpecPage() {
    return new RequestedCourtLRSpecPage(this.page, party.RESPONDENT_1);
  }

  get requestedCourtPage() {
    return new RequestedCourtPage(this.page, party.RESPONDENT_1);
  }
}
