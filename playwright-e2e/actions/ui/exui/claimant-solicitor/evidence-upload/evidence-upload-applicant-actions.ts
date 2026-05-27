import TestData from '../../../../../models/test-utils/test-data.ts';
import { Step } from '../../../../../decorators/test-steps.ts';
import BaseTestData from '../../../../../base/base-test-data.ts';
import EvidenceUploadPageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/evidence-upload-applicant/evidence-upload-applicant-page-factory.ts';

const classKey = 'EvidenceUploadApplicantActions';
export default class EvidenceUploadApplicantActions extends BaseTestData {
  private evidenceUploadPageFactory: EvidenceUploadPageFactory;

  constructor(evidenceUploadPageFactory: EvidenceUploadPageFactory, testData: TestData) {
    super(testData);
    this.evidenceUploadPageFactory = evidenceUploadPageFactory;
  }

  @Step(classKey)
  async evidenceUpload() {
    const { evidenceUploadPage } = this.evidenceUploadPageFactory;
    await evidenceUploadPage.verifyContent();
    await evidenceUploadPage.submit();
  }

  @Step(classKey)
  async documentSelectionSmallClaim() {
    const { documentSelectionSmallClaimPage } = this.evidenceUploadPageFactory;
    await documentSelectionSmallClaimPage.verifyContent();
    await documentSelectionSmallClaimPage.selectWitnessStatement();
    await documentSelectionSmallClaimPage.submit();
  }

  @Step(classKey)
  async documentUpload() {
    const { documentUploadPage } = this.evidenceUploadPageFactory;
    await documentUploadPage.verifyContent();
    await documentUploadPage.addWitnessStatement();
    await documentUploadPage.submit();
  }

  @Step(classKey)
  async submitEvidenceUpload() {
    const { evidenceUploadSubmitPage } = this.evidenceUploadPageFactory;
    await evidenceUploadSubmitPage.verifyContent();
    await evidenceUploadSubmitPage.submit();
  }

  @Step(classKey)
  async confirm() {
    const { evidenceUploadConfirmPage } = this.evidenceUploadPageFactory;
    await evidenceUploadConfirmPage.verifyContent();
  }
}
