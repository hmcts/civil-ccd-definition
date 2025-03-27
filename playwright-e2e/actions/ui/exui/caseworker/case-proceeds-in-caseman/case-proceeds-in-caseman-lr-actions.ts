import BaseTestData from '../../../../../base/base-test-data.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import TestData from '../../../../../models/test-data.ts';
import CaseProceedsInCasemanPageFactory
  from "../../../../../pages/exui/caseworker/case-proceeds-in-caseman/case-proceeds-in-caseman-page-factory.ts";

@AllMethodsStep()
export default class CaseProceedsInCasemanLrActions extends BaseTestData {
  private caseProceedsInCasemanPageFactory: CaseProceedsInCasemanPageFactory;

  constructor(caseProceedsInCasemanPageFactory: CaseProceedsInCasemanPageFactory, testData: TestData) {
    super(testData);
    this.caseProceedsInCasemanPageFactory = caseProceedsInCasemanPageFactory;

  }

  async casemanLRCaseSettled() {
    const { caseProceedsInCasemanLRPage } = this.caseProceedsInCasemanPageFactory;
    await caseProceedsInCasemanLRPage.verifyContent(this.ccdCaseData);
    await caseProceedsInCasemanLRPage.enterTodayDate();
    await caseProceedsInCasemanLRPage.selectProceedOnPaperReasonCaseSettled();
  }

  async submit() {
    const { caseProceedsInCasemanLRPage } = this.caseProceedsInCasemanPageFactory;
    await caseProceedsInCasemanLRPage.submit();
  }

}
