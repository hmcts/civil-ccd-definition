import BasePage from '../../../../base/base-page';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../../models/ccd/ccd-events';
import ExuiEvent from '../../exui-event/exui-event';
import { buttons, containers, dropdowns, getSuccessBannerText, tabs } from './case-details-content';

const classKey = 'CaseDetailsPage';

@AllMethodsStep()
export default class CaseDetailsPage extends ExuiEvent(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(caseData),
        super.expectText(tabs.summary.title),
        super.expectText(tabs.caseFile.title),
        super.expectText(tabs.claimDetails.title),
        super.expectText(tabs.history.title, { exact: true }),
        super.expectText(tabs.claimDocs.title),
        super.expectText(tabs.paymentHistory.title),
        // super.expectText(tabs.serviceRequest.title, { exact: true }),
        super.expectText(tabs.bundles.title),
        super.expectText(tabs.caseFlags.title),
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
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`, {
      force: true,
    });
  }

  async retryChooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector);
    await super.retryClickBySelector(
      buttons.go.selector,
      () =>
        super.expectNoText(tabs.summary.title, {
          timeout: 10_000,
        }),
      { retries: 3 },
    );
    super.setCCDEvent = ccdEvent;
  }

  async chooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
  }

  async verifySuccessEvent(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Verifying success banner and event history: ${ccdEvent.name}`);
    await super.runVerifications(
      [
        super.expectText(getSuccessBannerText(caseId, ccdEvent)),
        super.clickByText(tabs.history.title),
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
