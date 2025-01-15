import BasePageFactory from '../../../../../base/base-page-factory';
import partys from '../../../../../constants/partys';
import StatementOfTruthFragment from '../../../fragments/statement-of-truth/statement-of-truth-fragment';
import ApplicationPage from '../directions-questionaire/lr-spec/application/application-page';
import ClaimantResponseSmallClaimExpertsPage from '../directions-questionaire/lr-spec/claimant-response-small-claim-experts/claimant-response-small-claim-experts-experts-page';
import ClaimantResponseSmallClaimWitnessesPage from '../directions-questionaire/lr-spec/claimant-response-small-claim-witnesses/claimant-response-small-claim-witnesses-page';
import ClaimantResponseStatementOfTruthPage from './common/claimant-response-statement-of-truth/claimant-response-statement-of-truth-page';
import ClaimantResponseSubmitPage from './common/claimant-response-submit/claimant-response-submit-page';
import DefenceResponseDocumentSpecPage from './lr-spec/defence-response-document-spec/defence-response-document-spec-page';
import RespondentResponse1v2DSSpecPage from './lr-spec/respondent-response-1v2DS-spec/respondent-response-1v2DS-spec-page';
import RespondentResponse1v2SSSpecPage from './lr-spec/respondent-response-1v2SS-spec/respondent-response-1v2SS-spec-page';
import RespondentResponse2v1SpecPage from './lr-spec/respondent-response-2v1-spec/respondent-response-2v1-spec-page';
import RespondentResponseSpecPage from './lr-spec/respondent-response-spec/respondent-response-spec-page';
import ClaimantResponseConfirmPage from './unspec/claimant-response-confirm/claimants-response-confirm-page';
import DefenceResponseDocument1v2Page from './unspec/defence-response-document/defence-response-document-1v2-page';
import DefenceResponseDocumentPage from './unspec/defence-response-document/defence-response-document-page';
import RespondentResponse1v2Page from './unspec/respondent-response-1v2/respondent-response-1v2-page';
import RespondentResponse2v1Page from './unspec/respondent-response-2v1/respondent-response-2v1-page';
import RespondentResponsePage from './unspec/respondent-response/respondent-response-page';
export default class ClaimantResponsePageFactory extends BasePageFactory {
  get respondentResponsePage() {
    return new RespondentResponsePage(this.page);
  }

  get respondentResponse2v1Page() {
    return new RespondentResponse2v1Page(this.page);
  }

  get respondentResponse1v2Page() {
    return new RespondentResponse1v2Page(this.page);
  }

  get respondentResponseSpecPage() {
    return new RespondentResponseSpecPage(this.page);
  }

  get respondentResponse2v1SpecPage() {
    return new RespondentResponse2v1SpecPage(this.page);
  }

  get respondentResponse1v2SSSpecPage() {
    return new RespondentResponse1v2SSSpecPage(this.page);
  }

  get respondentResponse1v2DSSpecPage() {
    return new RespondentResponse1v2DSSpecPage(this.page);
  }

  get defenceResponseDocumentPage() {
    return new DefenceResponseDocumentPage(this.page);
  }

  get defenceResponseDocument1v2Page() {
    return new DefenceResponseDocument1v2Page(this.page);
  }

  get defenceResponseDocumentSpecPage() {
    return new DefenceResponseDocumentSpecPage(this.page);
  }

  get claimantResponseSmallClaimExperts() {
    return new ClaimantResponseSmallClaimExpertsPage(this.page);
  }

  get claimantResponseSmallClaimWitnesses() {
    return new ClaimantResponseSmallClaimWitnessesPage(this.page);
  }

  get applicationPage() {
    return new ApplicationPage(this.page, partys.CLAIMANT_1);
  }

  get claimantResponseStatementOfTruthPage() {
    const statementofTruthFragment = new StatementOfTruthFragment(this.page);
    return new ClaimantResponseStatementOfTruthPage(this.page, statementofTruthFragment);
  }

  get claimantResponseSubmitPage() {
    return new ClaimantResponseSubmitPage(this.page);
  }

  get claimantResponseConfirmPage() {
    return new ClaimantResponseConfirmPage(this.page);
  }

  get claimantResponseConfirmSpecPage() {
    return new ClaimantResponseConfirmPage(this.page);
  }
}
