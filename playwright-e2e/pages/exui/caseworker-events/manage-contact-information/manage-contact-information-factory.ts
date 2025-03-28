import BasePageFactory from '../../../../base/base-page-factory';
import PartySelectionPage from './party-selection/party-selection-page';
import ApplicantPartyPage from './applicant-party/applicant-party-page';
import DefendantPartyPage from './defendant-party/defendant-party-page';

export default class ManageContactInformationPageFactory extends BasePageFactory {
  get partySelectionPage() {
    return new PartySelectionPage(this.page);
  }

  get applicantPartyPage() {
    return new ApplicantPartyPage(this.page);
  }

  get defendantPartyPage() {
    return new DefendantPartyPage(this.page);
  }
  // add other pages here
}
