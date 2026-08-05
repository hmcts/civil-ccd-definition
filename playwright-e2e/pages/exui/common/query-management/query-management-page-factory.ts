import BasePageFactory from '../../../../base/base-page-factory';
import QualifyingQuestionOptionPage from './qualifying-question-option/qualifying-question-option-page';
import QueryDetailsNewPage from './query-details/query-details-new-page';
import QueryDetailsResponsePage from './query-details/query-details-response-page';
import QueryDetailsFollowupPage from './query-details/query-details-followup-page';
import ReviewQueryNewPage from './review-query/review-query-new-page';
import ReviewQueryResponsePage from './review-query/review-query-response-page';
import ReviewQueryFollowupPage from './review-query/review-query-followup-page';
import ConfirmQueryPage from './confirm-query/confirm-query-page';
import ConfirmQueryResponsePage from './confirm-query/confirm-query-response-page';
import DateFragment from '../../fragments/date/date-fragment';
import CaseDetailsPage from '../../exui-dashboard/case-details/case-details-page';

export default class QueryManagementPageFactory extends BasePageFactory {
  get caseDetailsPage() {
    return new CaseDetailsPage(this.page);
  }
    
  get qualifyingQuestionOptionPage() {
    return new QualifyingQuestionOptionPage(this.page);
  }

  get queryDetailsNewPage() {
    return new QueryDetailsNewPage(this.page, new DateFragment(this.page));
  }

  get queryDetailsResponsePage() {
    return new QueryDetailsResponsePage(this.page);
  }

  get queryDetailsFollowupPage() {
    return new QueryDetailsFollowupPage(this.page);
  }

  get reviewQueryNewPage() {
    return new ReviewQueryNewPage(this.page);
  }

  get reviewQueryResponsePage() {
    return new ReviewQueryResponsePage(this.page);
  }

  get reviewQueryFollowupPage() {
    return new ReviewQueryFollowupPage(this.page);
  }

  get confirmQueryPage() {
    return new ConfirmQueryPage(this.page);
  }

  get confirmQueryResponsePage() {
    return new ConfirmQueryResponsePage(this.page);
  }
}
