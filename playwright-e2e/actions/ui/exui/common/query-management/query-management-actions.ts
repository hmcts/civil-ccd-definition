import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import QueryManagementPageFactory from '../../../../../pages/exui/common/query-management/query-management-page-factory';
import { paragraphs } from '../../../../../pages/exui/common/query-management/query-details/query-details-content';

@AllMethodsStep()
export default class QueryManagementActions extends BaseTestData {
  private queryManagementPageFactory: QueryManagementPageFactory;

  constructor(queryManagementPageFactory: QueryManagementPageFactory, testData: TestData) {
    super(testData);
    this.queryManagementPageFactory = queryManagementPageFactory;
  }

  async raiseANewQuery() {
    const { qualifyingQuestionOptionPage } = this.queryManagementPageFactory;
    await qualifyingQuestionOptionPage.verifyContent();
    await qualifyingQuestionOptionPage.selectRaiseANewQuery();
    await qualifyingQuestionOptionPage.submit();
  }

  async enterQueryDetailsNew() {
    const { queryDetailsNewPage } = this.queryManagementPageFactory;
    await queryDetailsNewPage.verifyContent(this.ccdCaseData);
    await queryDetailsNewPage.enterQuerySubject();
    await queryDetailsNewPage.enterQueryDetail();
    await queryDetailsNewPage.selectIsQueryHearingRelatedNo();
    await queryDetailsNewPage.attachDocument();
    await queryDetailsNewPage.submit();
  }

  async enterQueryDetailsHearing() {
    const { queryDetailsNewPage } = this.queryManagementPageFactory;
    await queryDetailsNewPage.verifyContent(this.ccdCaseData);
    await queryDetailsNewPage.enterQuerySubject();
    await queryDetailsNewPage.enterQueryDetail(paragraphs.hearingQuery.queryBody);
    await queryDetailsNewPage.selectIsQueryHearingRelatedYes();
    await queryDetailsNewPage.enterHearingDate();
    await queryDetailsNewPage.submit();
  }

  async enterQueryDetailsFollowup() {
    const { queryDetailsFollowupPage } = this.queryManagementPageFactory;
    await queryDetailsFollowupPage.verifyContent(this.ccdCaseData);
    await queryDetailsFollowupPage.enterFollowupQuestion();
    await queryDetailsFollowupPage.submit();
  }

  async reviewQueryDetails() {
    const { reviewQueryNewPage } = this.queryManagementPageFactory;
    await reviewQueryNewPage.verifyContent(this.ccdCaseData);
    await reviewQueryNewPage.submit();
  }

  async reviewQueryDetailsFollowup() {
    const { reviewQueryFollowupPage } = this.queryManagementPageFactory;
    await reviewQueryFollowupPage.verifyContent(this.ccdCaseData);
    await reviewQueryFollowupPage.submit();
  }

  async enterResponseToQuery() {
    const { queryDetailsResponsePage } = this.queryManagementPageFactory;
    await queryDetailsResponsePage.verifyContent(this.ccdCaseData);
    await queryDetailsResponsePage.enterResponseDetail();
    await queryDetailsResponsePage.attachDocument();
    await queryDetailsResponsePage.submit();
  }

  async reviewQueryResponse() {
    const { reviewQueryResponsePage } = this.queryManagementPageFactory;
    await reviewQueryResponsePage.verifyContent(this.ccdCaseData);
    await reviewQueryResponsePage.submit();
  }

  async confirmQuery() {
    const { confirmQueryPage } = this.queryManagementPageFactory;
    await confirmQueryPage.verifyContent();
  }

  async confirmQueryResponse() {
    const { confirmQueryResponsePage } = this.queryManagementPageFactory;
    await confirmQueryResponsePage.verifyContent();
  }

  async askFollowUpQuestion() {
    const { caseDetailsPage } = this.queryManagementPageFactory;
    await caseDetailsPage.askFollowUpQuestion();
  }

}
