import TestData from '../../../../../models/test-data';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import BaseTestData from '../../../../../base/base-test-data';
import claimantDefendantPartyTypes from "../../../../../constants/claimant-defendant-party-types.ts";
import DefaultJudgmentPageFactory from "../../../../../pages/exui/claimant-defendant-solicitor/default-judgment/default-judgment-page-factory.ts";

@AllMethodsStep()
export default class DefaultJudgmentActions extends BaseTestData {
  private defaultJudgmentFactory: DefaultJudgmentPageFactory;

  constructor(defaultJudgmentPageFactory: DefaultJudgmentPageFactory, testData: TestData) {
    super(testData);
    this.defaultJudgmentFactory = defaultJudgmentPageFactory;
  }

  async defendantDetails() {
  const { defendantDetailsPage } = this.defaultJudgmentFactory;
  await defendantDetailsPage.verifyContent(this.ccdCaseData);
  await defendantDetailsPage.selectDefendant(claimantDefendantPartyTypes.INDIVIDUAL)
  await defendantDetailsPage.submit();
}

  async showCertifyStatement() {
    const { showCertifyStatementPage } = this.defaultJudgmentFactory;
    await showCertifyStatementPage.verifyContent();
    await showCertifyStatementPage.acceptCPR();
    await showCertifyStatementPage.submit();
  }

  async hearingType() {
    const { hearingTypePage } = this.defaultJudgmentFactory;
    await hearingTypePage.verifyContent(this.ccdCaseData);
    await hearingTypePage.selectDisposalHearing();
    await hearingTypePage.submit();
  }

  async hearingSupportRequirementsFieldDJ() {
    const {hearingSupportRequirementsFieldDJPage } = this.defaultJudgmentFactory;
    await hearingSupportRequirementsFieldDJPage.verifyContent(this.ccdCaseData);
    await hearingSupportRequirementsFieldDJPage.selectInPerson();
    await hearingSupportRequirementsFieldDJPage.enterDetails(claimantDefendantPartyTypes.INDIVIDUAL);
    await hearingSupportRequirementsFieldDJPage.selectNoUnavailableDates();
    await hearingSupportRequirementsFieldDJPage.selectRequireNoSupport();
  }

  async submitDefaultJudgment() {
    const { submitDefaultJudgmentPage} = this.defaultJudgmentFactory;
    await submitDefaultJudgmentPage.verifyContent(this.ccdCaseData);
    await submitDefaultJudgmentPage.submit();
  }

  async confirmDefaultJudgment() {
    const { confirmDefaultJudgmentPage } = this.defaultJudgmentFactory;
    await confirmDefaultJudgmentPage.verifyContent(this.ccdCaseData);
    await confirmDefaultJudgmentPage.submit();
  }
}
