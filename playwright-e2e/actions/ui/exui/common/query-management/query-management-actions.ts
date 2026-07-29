import BaseTestData from '../../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import WATask from '../../../../../models/wa-task';
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
    await qualifyingQuestionOptionPage.continue();
  }

  async enterQueryDetailsNew() {
    const { queryDetailsNewPage } = this.queryManagementPageFactory;
    await queryDetailsNewPage.verifyContent(this.ccdCaseData);
    await queryDetailsNewPage.enterQuerySubject();
    await queryDetailsNewPage.enterQueryDetail();
    await queryDetailsNewPage.selectIsQueryHearingRelatedNo();
    await queryDetailsNewPage.attachDocument();
    await queryDetailsNewPage.continue();
  }

  async enterQueryDetailsHearing() {
    const { queryDetailsNewPage } = this.queryManagementPageFactory;
    await queryDetailsNewPage.verifyContent(this.ccdCaseData);
    await queryDetailsNewPage.enterQuerySubject();
    await queryDetailsNewPage.enterQueryDetail(paragraphs.hearingQuery.queryBody);
    await queryDetailsNewPage.selectIsQueryHearingRelatedYes();
    await queryDetailsNewPage.enterHearingDate();
    await queryDetailsNewPage.continue();
  }

  async enterQueryDetailsFollowup() {
    const { queryDetailsFollowupPage } = this.queryManagementPageFactory;
    await queryDetailsFollowupPage.verifyContent(this.ccdCaseData);
    await queryDetailsFollowupPage.enterFollowupQuestion();
    await queryDetailsFollowupPage.continue();
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

  async enterResponseToQuery(waTask: WATask) {
    const { queryDetailsResponsePage } = this.queryManagementPageFactory;
    await queryDetailsResponsePage.goToQueryManagementTask(waTask, this.ccdCaseData.id!);
    await queryDetailsResponsePage.verifyContent(this.ccdCaseData);
    await queryDetailsResponsePage.enterResponseDetail();
    await queryDetailsResponsePage.attachDocument();
    await queryDetailsResponsePage.continue();
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

  async openQuery() {
    const { queryListPage } = this.queryManagementPageFactory;
    await queryListPage.verifyContent();
    await queryListPage.openQuery();
  }

  async askFollowUpQuestion() {
    const { queryPage } = this.queryManagementPageFactory;
    await queryPage.verifyContent();
    await queryPage.askFollowUpQuestion();
  }

  // async verifyQueryResponse() {
  //   const { queryPage } = this.queryManagementPageFactory;
  //   await queryPage.verifyContent();
  // }

  async verifyQueryWithHearing() {
    const { queryPage } = this.queryManagementPageFactory;
    await queryPage.verifyQueryWithHearing();
  }

  async verifyQueryNonHearing() {
    const { queryPage } = this.queryManagementPageFactory;
    await queryPage.verifyQueryNonHearing();
  }

  async verifyQueryCaseOffline() {
    const { queryDetailsNewPage } = this.queryManagementPageFactory;
    await queryDetailsNewPage.verifyCaseOffline(this.ccdCaseData);
  }

  async verifyQueryResponseAndFollowup() {
    const { queryPage } = this.queryManagementPageFactory;
    await queryPage.verifyContent();
    await queryPage.verifyQueryResponse();
    await queryPage.verifyQueryFollowup();
  }
}
