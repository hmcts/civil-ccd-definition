import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../../models/ccd/ccd-events';
import ExuiPage from '../../exui-page/exui-page';
import { buttons, containers, dropdowns, getSuccessBannerText, tabs } from './case-details-content';

const classKey = 'CaseDetailsPage';

@AllMethodsStep()
export default class CaseDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(caseData),
        super.expectTab(tabs.summary.title),
        super.expectTab(tabs.caseFile.title),
        super.expectTab(tabs.claimDetails.title, { exact: true }),
        super.expectTab(tabs.history.title, { exact: true }),
        // super.expectText(tabs.claimDocs.title),
        super.expectTab(tabs.paymentHistory.title),
        // super.expectText(tabs.serviceRequest.title, { exact: true }),
        super.expectTab(tabs.bundles.title),
        super.expectTab(tabs.caseFlags.title),
        super.expectLabel(dropdowns.nextStep.label),
      ],
      { useAxeCache: false },
    );
  }

  async verifySummaryContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.summary.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyCaseFileContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.caseFile.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyClaimDetailsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.claimDetails.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyClaimDocumentsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.claimDocs.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyPaymentHistoryContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.paymentHistory.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyBundlesContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.bundles.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  async verifyCaseFlagsContent(caseData: CCDCaseData) {
    await super.clickByText(tabs.caseFlags.title);
    await super.runVerifications([], { useAxeCache: false });
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`);
  }

  async retryChooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdownBySelector(ccdEvent.name, dropdowns.nextStep.selector);
    await super.retryClickBySelector(
      buttons.go.selector,
      () =>
        super.expectNoTab(tabs.summary.title, {
          timeout: 15_000,
          exact: true,
        }),
      { retries: 3 },
    );
  }

  async chooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdownBySelector(ccdEvent.name, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
    super.setCCDEvent = ccdEvent;
  }

  async verifySuccessEvent(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Verifying success banner and event history: ${ccdEvent.name}`);
    await super.runVerifications(
      [
        super.expectText(getSuccessBannerText(caseId, ccdEvent)),
        super.clickByText(tabs.history.title, { exact: true }),
        super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
          rowNum: 1,
        }),
      ],
      { runAxe: false },
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
