import BasePageFactory from '../../../../../base/base-page-factory';
import partys from '../../../../../constants/partys';
import DateFragment from '../../../fragments/date/date-fragment';
import RemoteHearingSpecFragment from '../../../fragments/remote-hearing-spec/remote-hearing-spec-fragment';
import RemoteHearingFragment from '../../../fragments/remote-hearing/remote-hearing-fragment';
import StatementOfTruthFragment from '../../../fragments/statement-of-truth/statement-of-truth-fragment';
import ApplicationPage from '../directions-questionaire/lr-spec/application/application-page';
import DefendantResponseSmallClaimExpertsPage from '../directions-questionaire/lr-spec/defendant-response-small-claim-experts/defendant-response-small-claim-experts-experts-page';
import DefendantResponseSmallClaimWitnessesPage from '../directions-questionaire/lr-spec/defendant-response-small-claim-witnesses/defendant-response-small-claim-witnesses-page';
import HearingLRSpecPage from '../directions-questionaire/lr-spec/hearing-lr-spec/hearing-lr-spec-page';
import RequestedCourtLRSpecPage from '../directions-questionaire/lr-spec/requested-court-lr-spec/requested-court-lr-spec-page';
import SmallClaimHearingPage from '../directions-questionaire/lr-spec/small-claim-hearing/small-claim-hearing-page';
import RequestedCourtPage from '../directions-questionaire/unspec/requested-court/requested-court-page';
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
import ResponseConfirmNameAddressPage from './lr-spec/response-confirm-name-address/response-confirm-name-address-page';
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
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetailsPage(this.page, dateFragment);
  }

  get confirmDetails1v2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ConfirmDetails1v2Page(this.page, dateFragment);
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
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetailsPage(this.page, dateFragment);
  }

  get responseConfirmDetails1v2Page() {
    const dateFragment = new DateFragment(this.page);
    return new ResponseConfirmDetails1v2Page(this.page, dateFragment);
  }

  get singleResponsePage() {
    return new SingleResponsePage(this.page);
  }

  get singleResponse2v1Page() {
    return new SingleResponse2v1Page(this.page);
  }

  get respondentResponseTypeDefendant1Page() {
    return new RespondentResponseTypePage(this.page, partys.DEFENDANT_1);
  }

  get respondentResponseTypeDefendantwPage() {
    return new RespondentResponseTypePage(this.page, partys.DEFENDANT_2);
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
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendant1Page(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get defenceRouteDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new DefenceRouteDefendant1Page(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get uploadDefendantResponseDefendant1Page() {
    return new UploadDefendantResponsePage(this.page, partys.DEFENDANT_1);
  }

  get uploadDefendantResponseDefendant2Page() {
    return new UploadDefendantResponsePage(this.page, partys.DEFENDANT_2);
  }

  get uploadDefendantResponseSpecDefendant1Page() {
    return new UploadDefendantResponseSpecPage(this.page, partys.DEFENDANT_1);
  }

  get uploadDefendantResponseSpecDefendant2Page() {
    return new UploadDefendantResponseSpecPage(this.page, partys.DEFENDANT_2);
  }

  get howToAddTimelineDefendant1Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_1);
  }

  get howToAddTimelineDefendant2Page() {
    return new HowToAddTimelinePage(this.page, partys.DEFENDANT_2);
  }

  get howToAddTimelineManualDefendant1Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get howToAddTimelineManualDefendant2Page() {
    const dateFragment = new DateFragment(this.page);
    return new HowToAddTimelineManualPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get howToAddTimelineUploadDefendant1Page() {
    return new HowToAddTimelineUploadPage(this.page, partys.DEFENDANT_1);
  }

  get howToAddTimelineUploadDefendant2Page() {
    return new HowToAddTimelineUploadPage(this.page, partys.DEFENDANT_2);
  }

  get mediationDefendant1Page() {
    return new MediationPage(this.page, partys.DEFENDANT_1);
  }

  get mediationDefendant2Page() {
    return new MediationPage(this.page, partys.DEFENDANT_2);
  }

  get defendantResponseSmallClaimExpertsDefendant1() {
    return new DefendantResponseSmallClaimExpertsPage(this.page, partys.DEFENDANT_1);
  }

  get defendantResponseSmallClaimExpertsDefendant2() {
    return new DefendantResponseSmallClaimExpertsPage(this.page, partys.DEFENDANT_2);
  }

  get defendantResponseSmallClaimWitnessesDefendant1() {
    return new DefendantResponseSmallClaimWitnessesPage(this.page, partys.DEFENDANT_1);
  }

  get defendantResponseSmallClaimWitnessesDefendant2() {
    return new DefendantResponseSmallClaimWitnessesPage(this.page, partys.DEFENDANT_2);
  }

  get smallClaimHearingDefendant1() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get smallClaimHearingDefendant2() {
    const dateFragment = new DateFragment(this.page);
    return new SmallClaimHearingPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get hearingLRSpecDefendant1() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(this.page, dateFragment, partys.DEFENDANT_1);
  }

  get hearingLRSpecDefendant2() {
    const dateFragment = new DateFragment(this.page);
    return new HearingLRSpecPage(this.page, dateFragment, partys.DEFENDANT_2);
  }

  get requestedCourtLRSpecDefendant1() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtLRSpecPage(this.page, remoteHearingSpecFragment, partys.DEFENDANT_1);
  }

  get requestedCourtLRSpecDefendant2() {
    const remoteHearingSpecFragment = new RemoteHearingSpecFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtLRSpecPage(this.page, remoteHearingSpecFragment, partys.DEFENDANT_2);
  }

  get applicationPageDefendant1() {
    return new ApplicationPage(this.page, partys.DEFENDANT_1);
  }

  get applicationPageDefendant2() {
    return new ApplicationPage(this.page, partys.DEFENDANT_2);
  }

  get requestedCourtDefendant1() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_1);
    return new RequestedCourtPage(this.page, remoteHearingFragment, partys.DEFENDANT_1);
  }

  get requestedCourtDefendant2() {
    const remoteHearingFragment = new RemoteHearingFragment(this.page, partys.DEFENDANT_2);
    return new RequestedCourtPage(this.page, remoteHearingFragment, partys.DEFENDANT_2);
  }

  get defendantResponseStatementOfTruthPage() {
    const statementofTruthFragment = new StatementOfTruthFragment(this.page);
    return new DefendantResponseStatmentOfTruthPage(this.page, statementofTruthFragment);
  }
}
