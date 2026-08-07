import BaseTestData from '../../../../../base/base-test-data';
import { Step } from '../../../../../decorators/test-steps';
import TestData from '../../../../../models/test-utils/test-data';
import UploadMediationDocumentsPageFactory from '../../../../../pages/exui/claimant-defendant-solicitor/upload-mediation-documents/upload-mediation-documents-page-factory';

const classKey = 'UploadMediationDocumentsActions';

export default class UploadMediationDocumentsActions extends BaseTestData {
  private uploadMediationDocumentsPageFactory: UploadMediationDocumentsPageFactory;

  constructor(
    uploadMediationDocumentsPageFactory: UploadMediationDocumentsPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.uploadMediationDocumentsPageFactory = uploadMediationDocumentsPageFactory;
  }

  @Step(classKey)
  async explanation() {
    const { explanationPage } = this.uploadMediationDocumentsPageFactory;
    await explanationPage.verifyContent(this.ccdCaseData);
    await explanationPage.submit();
  }

  @Step(classKey)
  async selectClaimant1() {
    const { whoIsDocumentForPage } = this.uploadMediationDocumentsPageFactory;
    await whoIsDocumentForPage.verifyContent(this.ccdCaseData);
    await whoIsDocumentForPage.selectClaimant1(this.claimant1PartyType!);
    await whoIsDocumentForPage.submit();
  }

  @Step(classKey)
  async selectBothClaimants() {
    const { whoIsDocumentForPage } = this.uploadMediationDocumentsPageFactory;
    await whoIsDocumentForPage.verifyContent(this.ccdCaseData);
    await whoIsDocumentForPage.selectBothClaimants();
    await whoIsDocumentForPage.submit();
  }

  @Step(classKey)
  async selectD1() {
    const { whoIsDocumentForPage } = this.uploadMediationDocumentsPageFactory;
    await whoIsDocumentForPage.verifyContent(this.ccdCaseData);
    await whoIsDocumentForPage.selectD1(this.defendant1PartyType!);
    await whoIsDocumentForPage.submit();
  }

  @Step(classKey)
  async selectD2() {
    const { whoIsDocumentForPage } = this.uploadMediationDocumentsPageFactory;
    await whoIsDocumentForPage.verifyContent(this.ccdCaseData);
    await whoIsDocumentForPage.selectD2(this.defendant2PartyType!);
    await whoIsDocumentForPage.submit();
  }

  @Step(classKey)
  async selectDocumentTypes() {
    const { documentTypePage } = this.uploadMediationDocumentsPageFactory;
    await documentTypePage.verifyContent(this.ccdCaseData);
    await documentTypePage.selectNonAttendanceStatement();
    await documentTypePage.selectReferredDocuments();
    await documentTypePage.submit();
  }

  @Step(classKey)
  async selectNonAttendanceStatement() {
    const { documentTypePage } = this.uploadMediationDocumentsPageFactory;
    await documentTypePage.verifyContent(this.ccdCaseData);
    await documentTypePage.selectNonAttendanceStatement();
    await documentTypePage.submit();
  }

  @Step(classKey)
  async selectReferredDocuments() {
    const { documentTypePage } = this.uploadMediationDocumentsPageFactory;
    await documentTypePage.verifyContent(this.ccdCaseData);
    await documentTypePage.selectReferredDocuments();
    await documentTypePage.submit();
  }

  @Step(classKey)
  async uploadBothDocuments() {
    const { documentUploadMediationPage } = this.uploadMediationDocumentsPageFactory;
    await documentUploadMediationPage.verifyContent(this.ccdCaseData);
    await documentUploadMediationPage.uploadDocumentNonAttendanceStatement();
    await documentUploadMediationPage.uploadDocumentsReferred();
    await documentUploadMediationPage.submit();
  }

  @Step(classKey)
  async uploadNonAttendanceStatement() {
    const { documentUploadMediationPage } = this.uploadMediationDocumentsPageFactory;
    await documentUploadMediationPage.verifyContent(this.ccdCaseData);
    await documentUploadMediationPage.uploadDocumentNonAttendanceStatement();
    await documentUploadMediationPage.submit();
  }

  @Step(classKey)
  async submitUploadMediationDocuments() {
    const { submitUploadMediationDocumentsPage } = this.uploadMediationDocumentsPageFactory;
    await submitUploadMediationDocumentsPage.verifyContent(this.ccdCaseData);
    await submitUploadMediationDocumentsPage.submit();
  }

  @Step(classKey)
  async confirmUploadMediationDocuments() {
    const { confirmUploadMediationDocumentsPage } = this.uploadMediationDocumentsPageFactory;
    await confirmUploadMediationDocumentsPage.verifyContent();
    await confirmUploadMediationDocumentsPage.submit();
  }
}
