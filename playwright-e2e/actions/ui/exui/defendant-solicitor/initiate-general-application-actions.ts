import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-utils/test-data';
import GeneralApplicationPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/general-application/general-application-page-factory';

@AllMethodsStep()
export default class InitiateGeneralApplicationActions extends BaseTestData {
  private generalApplicationPageFactory: GeneralApplicationPageFactory;

  constructor(generalApplicationPageFactory: GeneralApplicationPageFactory, testData: TestData) {
    super(testData);
    this.generalApplicationPageFactory = generalApplicationPageFactory;
  }

  async gaType() {
    const { gaTypePage } = this.generalApplicationPageFactory;
    await gaTypePage.verifyContent(this.ccdCaseData!);
    await gaTypePage.selectApplicationTypes();
    await gaTypePage.submit();
  }

  async gaHearingDate() {
    const { gaHearingDatePage } = this.generalApplicationPageFactory;
    await gaHearingDatePage.verifyContent(this.ccdCaseData!);
    await gaHearingDatePage.selectYes();
    await gaHearingDatePage.enterHearingDates();
    await gaHearingDatePage.submit();
  }

  async gaRespondentAgreement() {
    const { gaRespondentAgreementPage } = this.generalApplicationPageFactory;
    await gaRespondentAgreementPage.verifyContent(this.ccdCaseData!);
    await gaRespondentAgreementPage.selectNo();
    await gaRespondentAgreementPage.submit();
 }

  async gaUrgencyRecord() {
    const { gaUrgencyRecordPage } = this.generalApplicationPageFactory;
    await gaUrgencyRecordPage.verifyContent(this.ccdCaseData!);
    await gaUrgencyRecordPage.selectNo();
    await gaUrgencyRecordPage.submit();
}

  async gaWithOrWithoutNotice() {
    const { gaWithOrWithoutNoticePage } = this.generalApplicationPageFactory;
    await gaWithOrWithoutNoticePage.verifyContent(this.ccdCaseData!);
    await gaWithOrWithoutNoticePage.selectYes();
    await gaWithOrWithoutNoticePage.submit();
  }

  async gaStatementOfTruth() {
    const { gaStatementOfTruthPage } = this.generalApplicationPageFactory;
    await gaStatementOfTruthPage.verifyContent(this.ccdCaseData!);
    await gaStatementOfTruthPage.enterDetails();
    await gaStatementOfTruthPage.submit();
  }

  async gaHearingDetails() {
    const { gaHearingDetailsPage } = this.generalApplicationPageFactory;
    await gaHearingDetailsPage.verifyContent(this.ccdCaseData!);
    await gaHearingDetailsPage.enterDetails();
    await gaHearingDetailsPage.submit();
  }

  async gaPbaDetails() {
    const { gaPbaDetailsPage } = this.generalApplicationPageFactory;
    await gaPbaDetailsPage.verifyContent(this.ccdCaseData!);
    await gaPbaDetailsPage.submit();
  }

  async gaSubmit() {
    const { gaSubmitPage } = this.generalApplicationPageFactory;
    await gaSubmitPage.verifyContent(this.ccdCaseData!);
    await gaSubmitPage.submit();
  }

  async gaConfirm() {
    const { gaConfirmPage } = this.generalApplicationPageFactory;
    await gaConfirmPage.verifyContent(this.ccdCaseData!);
    await gaConfirmPage.submit();
  }

}
