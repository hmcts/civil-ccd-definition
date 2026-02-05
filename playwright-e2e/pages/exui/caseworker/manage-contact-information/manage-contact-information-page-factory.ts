import BasePageFactory from '../../../../base/base-page-factory';
import EventSummaryFragment from '../../fragments/event-summary/event-summary-fragment.ts';
import PartySelectionSpecPage from './party-selection/party-selection-spec-page.ts';
import PartySelection1v2DSSpecPage from './party-selection/party-selection-1v2DS-spec-page.ts';
import PartySelection1v2SSSpecPage from './party-selection/party-selection-1v2SS-spec-page.ts';
import PartySelection2v1SpecPage from './party-selection/party-selection-2v1-spec-page.ts';
import PartySelectionPage from './party-selection/party-selection-page';
import PartySelection1v2DSPage from './party-selection/party-selection-1v2DS-page';
import PartySelection1v2SSPage from './party-selection/party-selection-1v2SS-page';
import PartySelection2v1Page from './party-selection/party-selection-2v1-page';
import Applicant1PartyPage from './applicant-1-party/applicant-1-party-page.ts';
import Applicant2PartyPage from './applicant-2-party/applicant-2-party-page.ts';
import Defendant1PartyPage from './defendant-1-party/defendant-1-party-page.ts';
import Defendant2PartyPage from './defendant-2-party/defendant-2-party-page.ts';
import ManageContactInformationLitigationFriendPage from './manage-contact-information-litigation-friend/manage-contact-information-litigation-friend-page.ts';
import ManageContactInformationExpertPage from './manage-contact-information-expert/manage-contact-information-expert-page.ts';
import ManageContactInformationWitnessPage from './manage-contact-information-witness/manage-contact-information-witness-page.ts';
import ManageContactInformationSubmitPage from './manage-contact-information-submit/manage-contact-information-submit-page.ts';
import ManageContactInformationConfirmPage from './manage-contact-information-confirm/manage-contact-information-confirm-page.ts';
import { Party } from '../../../../models/partys';

export default class ManageContactInformationPageFactory extends BasePageFactory {

  get partySelectionSpecPage() {
    return new PartySelectionSpecPage(this.page);
  }

  get partySelection1v2DSSpecPage() {
    return new PartySelection1v2DSSpecPage(this.page);
  }

  get partySelection1v2SSSpecPage() {
    return new PartySelection1v2SSSpecPage(this.page);
  }

  get partySelection2v1SpecPage() {
    return new PartySelection2v1SpecPage(this.page);
  }

  get partySelectionPage() {
    return new PartySelectionPage(this.page);
  }

  get partySelection1v2DSPage() {
    return new PartySelection1v2DSPage(this.page);
  }

  get partySelection1v2SSPage() {
    return new PartySelection1v2SSPage(this.page);
  }

  get partySelection2v1Page() {
    return new PartySelection2v1Page(this.page);
  }

  get applicant1PartyPage() {
    return new Applicant1PartyPage(this.page);
  }

  get applicant2PartyPage() {
    return new Applicant2PartyPage(this.page);
  }

  get defendant1PartyPage() {
    return new Defendant1PartyPage(this.page);
  }

  get defendant2PartyPage() {
    return new Defendant2PartyPage(this.page);
  }

  get manageContactInformationLitigationFriendPage() {
    return new ManageContactInformationLitigationFriendPage(this.page);
  }

  get manageContactInformationExpertPage() {
    return new ManageContactInformationExpertPage(this.page);
  }

  get manageContactInformationWitnessPage() {
    return new ManageContactInformationWitnessPage(this.page);
  }

  get manageContactInformationSubmitPage() {
    const eventSummaryFragment = new EventSummaryFragment(this.page);
    return new ManageContactInformationSubmitPage(this.page, eventSummaryFragment);
  }

  get manageContactInformationConfirmPage() {
    return new ManageContactInformationConfirmPage(this.page);
  }
}
