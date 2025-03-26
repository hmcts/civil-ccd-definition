import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import ManageDocumentsPageFactory
  from "../../../../pages/exui/caseworker/manage-documents/manage-documents-page-factory.ts";

@AllMethodsStep()
export default class ManageDocumentsActions extends BaseTestData {
  private manageDocumentsPageFactory: ManageDocumentsPageFactory;

  constructor(manageDocumentsPageFactory: ManageDocumentsPageFactory, testData: TestData) {
    super(testData);
    this.manageDocumentsPageFactory = manageDocumentsPageFactory;
  }

  async addNewDocuments() {
    const { manageDocumentsAddDocumentsPage} = this.manageDocumentsPageFactory
    await manageDocumentsAddDocumentsPage.verifyContent(this.ccdCaseData);
    await manageDocumentsAddDocumentsPage.addNew();
    await manageDocumentsAddDocumentsPage.fillFormNewDocuments();
    await manageDocumentsAddDocumentsPage.submit();
  }

  async manageDocumentSubmit() {
    const { manageDocumentsSubmitPage} = this.manageDocumentsPageFactory
    await manageDocumentsSubmitPage.verifyContent(this.ccdCaseData);
    await manageDocumentsSubmitPage.enterEventSummary();
    await manageDocumentsSubmitPage.enterEventDescription();
    await manageDocumentsSubmitPage.submit();
  }
}
