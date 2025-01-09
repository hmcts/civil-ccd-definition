import BasePageFactory from '../../../../../base/base-page-factory';
import Party from '../../../../../enums/party';
import StatementOfTruthFragment from '../../../fragments/statement-of-truth/statement-of-truth-fragment';
import DefendantResponseStatmentOfTruthPage from './common/defendant-response-statement-of-truth/defendant-response-statement-of-truth-page';
import SingleResponse2v1Page from './common/single-response-2v1/single-response-2v1-page';
import SingleResponsePage from './common/single-response/single-response-page';
import DefenceRouteDefendant1Page from './lr-spec/defence-route/defence-route-page';
import HowToAddTimelineManualPage from './lr-spec/how-to-add-timeline-manual/how-to-add-timeline-manual-page';
import HowToAddTimelineUploadPage from './lr-spec/how-to-add-timeline-upload/how-to-add-timeline-upload-page';
import HowToAddTimelinePage from './lr-spec/how-to-add-timeline/how-to-add-timeline-page';
import MediationPage from './lr-spec/mediation/mediation-page';
import RespondentChecklistPage from './lr-spec/respondent-checklist/respondent-checklist-page';
import RespondentResponseType1v2SpecPage from './lr-spec/respondent-response-type-spec/respondent-response-type-1v2-spec-page';
import RespondentResponseTypeSpecPage from './lr-spec/respondent-response-type-spec/respondent-response-type-spec-page';
import ResponseConfirmDetails1v2Page from './lr-spec/response-confirm-details/response-confirm-details-1v2-page';
import ResponseConfirmDetailsPage from './lr-spec/response-confirm-details/response-confirm-details-page';
import ResponseConfirmNameAddress1v2FastPage from './lr-spec/response-confirm-name-address/response-confirm-name-address-1v2-fast-page';
import ResponseConfirmNameAddress1v2Page from './lr-spec/response-confirm-name-address/response-confirm-name-address-1v2-page ';
import ResponseConfirmNameAddressPage from './lr-spec/response-confirm-name-address/response-confirm-name-and-address-page';
import ResponseType2v1SpecPage from './lr-spec/response-type-2v1-spec/response-type-2v1-spec-page';
import UploadDefendantResponseSpecPage from './lr-spec/upload-defendant-response-spec/upload-defendant-response-spec-page';
import ConfirmDetails1v2Page from './unspec/confirm-details/confirm-details-1v2-page';
import ConfirmDetailsPage from './unspec/confirm-details/confirm-details-page';
import RespondentResponseType1v2Page from './unspec/respondent-response-type/respondent-response-type-1v2-page';
import RespondentResponseType2v1Page from './unspec/respondent-response-type/respondent-response-type-2v1-page';
import RespondentResponseTypePage from './unspec/respondent-response-type/respondent-response-type-page';
import SolicitorReferencesPage from './unspec/solicitor-references/solicitor-references-page';
import UploadDefendantResponsePage from './unspec/upload-defendant-response/upload-defendant-response-page';

export default class DefendantResponsePageFactory extends BasePageFactory {
  get respondentChecklistPage() {
    return new RespondentChecklistPage(this.page);
  }

  get confirmDetailsPage() {
    return new ConfirmDetailsPage(this.page);
  }

  get confirmDetails1v2Page() {
    return new ConfirmDetails1v2Page(this.page);
  }

  get responseConfirmNameAdressPage() {
    return new ResponseConfirmNameAddressPage(this.page);
  }

  get responseConfirmNameAddress1v2Page() {
    return new ResponseConfirmNameAddress1v2Page(this.page);
  }

  get responseConfirmNameAddress1v2FastPage() {
    return new ResponseConfirmNameAddress1v2FastPage(this.page);
  }

  get responseConfirmDetailsPage() {
    return new ResponseConfirmDetailsPage(this.page);
  }

  get responseConfirmDetails1v2Page() {
    return new ResponseConfirmDetails1v2Page(this.page);
  }

  get singleResponsePage() {
    return new SingleResponsePage(this.page);
  }

  get singleResponse2v1Page() {
    return new SingleResponse2v1Page(this.page);
  }

  get respondentResponseTypePage() {
    return new RespondentResponseTypePage(this.page);
  }

  get respondentResponseType1v2Page() {
    return new RespondentResponseType1v2Page(this.page);
  }

  get respondentResponseType2v1Page() {
    return new RespondentResponseType2v1Page(this.page);
  }

  get respondentResponseTypeSpecPage() {
    return new RespondentResponseTypeSpecPage(this.page);
  }

  get respondentResponseType1v2SpecPage() {
    return new RespondentResponseType1v2SpecPage(this.page);
  }

  get responseType2v1Spec() {
    return new ResponseType2v1SpecPage(this.page);
  }

  get solicitorReferencesPage() {
    return new SolicitorReferencesPage(this.page);
  }

  get defenceRouteDefendant1Page() {
    return new DefenceRouteDefendant1Page(this.page);
  }

  get defenceRouteDefendant2Page() {
    return new DefenceRouteDefendant1Page(this.page, 2);
  }

  get uploadDefendantResponseDefendant1Page() {
    return new UploadDefendantResponsePage(this.page, Party.RESPONDENT_1);
  }

  get uploadDefendantResponseDefendant2Page() {
    return new UploadDefendantResponsePage(this.page, Party.RESPONDENT_2);
  }

  get uploadDefendantResponseSpecDefendant1Page() {
    return new UploadDefendantResponseSpecPage(this.page, Party.RESPONDENT_1);
  }

  get uploadDefendantResponseSpecDefendant2Page() {
    return new UploadDefendantResponseSpecPage(this.page, Party.RESPONDENT_2, 2);
  }

  get howToAddTimelineDefendant1Page() {
    return new HowToAddTimelinePage(this.page);
  }

  get howToAddTimelineDefendant2Page() {
    return new HowToAddTimelinePage(this.page, 2);
  }

  get howToAddTimelineManualDefendant1Page() {
    return new HowToAddTimelineManualPage(this.page);
  }

  get howToAddTimelineManualDefendant2Page() {
    return new HowToAddTimelineManualPage(this.page, 2);
  }

  get howToAddTimelineUploadDefendant1Page() {
    return new HowToAddTimelineUploadPage(this.page);
  }

  get howToAddTimelineUploadDefendant2Page() {
    return new HowToAddTimelineUploadPage(this.page, 2);
  }

  get mediationDefendant1Page() {
    return new MediationPage(this.page);
  }

  get mediationDefendant2Page() {
    return new MediationPage(this.page, 2);
  }

  get defendantResponseStatementOfTruthPage() {
    const statementofTruthFragment = new StatementOfTruthFragment(this.page);
    return new DefendantResponseStatmentOfTruthPage(this.page, statementofTruthFragment);
  }
}
