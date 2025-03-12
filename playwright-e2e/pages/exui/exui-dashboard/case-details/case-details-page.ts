import BasePage from '../../../../base/base-page';
import config from '../../../../config/config';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../../models/ccd/ccd-events';
import { getFormattedCaseId, getUnformattedCaseId, headings } from '../../exui-page/exui-content';
import ExuiPage from '../../exui-page/exui-page';
import { buttons, containers, dropdowns, successBannerText, tabs } from './case-details-content';

const classKey = 'CaseDetailsPage';

@AllMethodsStep()
export default class CaseDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.retryReloadRunVerifications(() => [
      super.verifyHeadings(caseData),
      super.expectText(tabs.summary.title, { timeout: config.playwright.shortExpectTimeout }),
      super.expectText(tabs.caseFile.title),
      super.expectText(tabs.claimDetails.title),
      super.expectText(tabs.history.title),
      // super.expectText(tabs.claimDocs.title),
      super.expectText(tabs.paymentHistory.title),
      // super.expectText(tabs.serviceRequest.title, { exact: true }),
      super.expectText(tabs.bundles.title),
      super.expectText(tabs.caseFlags.title),
      super.expectLabel(dropdowns.nextStep.label),
    ]);
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

  async grabCaseNumber() {
    return getUnformattedCaseId(await super.getText(headings.caseNumber.selector));
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`);
  }

  async retryChooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.retryAction(
      async () => {
        await super.retryReload(
          async () => {
            await super.expectSelector(dropdowns.nextStep.selector);
            await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector, {
              timeout: 5_000,
            });
          },
          undefined,
          { retries: 1 },
        );
        await super.clickBySelector(buttons.go.selector);
      },
      async () => {
        await super.waitForPageToLoad();
        await super.expectNoTab(tabs.summary.title, {
          timeout: config.exui.pageSubmitTimeout,
        });
      },
      () => super.reload(),
      { retries: 3, message: `Starting event: ${ccdEvent.name} failed, trying again` },
    );
  }

  async chooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
    super.setCCDEvent = ccdEvent;
  }

  async verifySuccessEvent(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Verifying success banner and event history: ${ccdEvent.name}`);
    await super.expectText(successBannerText(getFormattedCaseId(caseId), ccdEvent));
    await super.clickByText(tabs.history.title);
    await super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
