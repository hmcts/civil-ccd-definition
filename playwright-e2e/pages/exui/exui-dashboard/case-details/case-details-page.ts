import BasePage from '../../../../base/base-page';
import config from '../../../../config/config';
import urls from '../../../../config/urls';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { TruthyParams } from '../../../../decorators/truthy-params';
import CCDCaseData from '../../../../models/ccd-case-data';
import CCDEvent from '../../../../models/ccd-events/ccdEvent';
import {
  components,
  getFormattedCaseId,
  getUnformattedCaseId,
  headings,
} from '../../mixin-pages/exui-page/exui-content';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import {
  buttons,
  caseFlagsNoticeText,
  containers,
  dropdowns,
  subheadings,
  links,
  successBannerText,
  tabs,
} from './case-details-content';
import ccdEvents from '../../../../constants/ccd-events/ccd-events/ccd-events';
import WATask from '../../../../models/wa-task';

const classKey = 'CaseDetailsPage';

@AllMethodsStep()
export default class CaseDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(caseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(caseData),
      super.expectSelector(tabs.summary.selector),
      super.expectSelector(tabs.caseFile.selector),
      super.expectSelector(tabs.claimDetails.selector),
      super.expectSelector(tabs.history.selector),
      // super.expectText(tabs.claimDocs.title),
      // super.expectSelector(tabs.paymentHistory.selector),
      // super.expectText(tabs.serviceRequest.title, { exact: true }),
      super.expectSelector(tabs.bundles.selector),
      super.expectSelector(tabs.caseFlags.selector),
      // super.expectLabel(dropdowns.nextStep.label),
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
    await super.runVerifications([super.verifyHeadings(caseData)], { useAxeCache: false });
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

  async retryClickHearingsTab() {
    await super.retryClickByText(
      tabs.hearings.title,
      () => [
        super.expectText(subheadings.hearingsTab.currentAndUpcoming, {
          timeout: config.playwright.shortExpectTimeout,
        }),
        super.expectText(subheadings.hearingsTab.pastOrCancelled, {
          timeout: config.playwright.shortExpectTimeout,
        }),
      ],
      () => super.clickByText(tabs.summary.title),
      { retries: 3, message: 'Clicking on hearings tab failed, trying again' },
    );
  }

  async retryClickQueriesTab() {
    await super.retryClickByText(
      tabs.queries.title,
      () => [
        super.expectSelector(links.firstQueryLink.selector, {
          timeout: config.playwright.shortExpectTimeout,
        }),
        super.expectUrlEnd('#Queries', {
          timeout: config.playwright.shortExpectTimeout,
        }),
      ],
      () => super.clickByText(tabs.summary.title),
      { retries: 3, message: 'Clicking on queries tab failed, trying again' },
    );
  }

  async retryClickServiceRequestTab() {
    await super.retryClickByText(
      tabs.serviceRequest.title,
      () => [
        super.expectUrlEnd('#Service%20Request', {
          timeout: config.playwright.shortExpectTimeout,
        }),
      ],
      () => super.clickByText(tabs.summary.title),
      { retries: 3, message: 'Clicking on service request tab failed, trying again' },
    );
  }

  async requestHearing() {
    await this.retryTabAction(links.requestHearing.title, tabs.hearings.selector, () =>
      super.clickByText(links.requestHearing.title),
    );
  }

  async viewHearingDetails() {
    await this.retryTabAction(buttons.viewHearingDetails.title, tabs.hearings.selector, () =>
      super.clickBySelector(buttons.viewHearingDetails.selector),
    );
  }

  async cancelHearing() {
    await this.retryTabAction(buttons.cancelHearing.title, tabs.hearings.selector, () =>
      super.clickBySelector(buttons.cancelHearing.selector),
    );
  }

  async askFollowUpQuestion() {
    await this.retryTabAction(
      buttons.askFollowUpQuestion.selector,
      tabs.queries.selector,
      async () => {
        await super.clickBySelector(links.firstQueryLink.selector);
        await super.clickBySelector(buttons.askFollowUpQuestion.selector);
      },
    );
  }

  async clickReview() {
      await super.expectLink(links.review.title, { ignoreDuplicates: true });
      await super.retryAction(
        async () => super.clickLink(links.review.title, { index: 1 }),
        async () => super.expectButton(buttons.issueRefund.title),
        async () => super.reload(),
        {message: `Click action failed on '${links.review.title}' link, trying again`, retries: 1},
      );
    }
  
    async clickIssueRefund() {
      await super.expectButton(buttons.issueRefund.title, { ignoreDuplicates: true })
       await super.retryAction(
        async () => super.clickButtonByName(buttons.issueRefund.title),
        async () => super.expectNoButton(buttons.issueRefund.title),
        undefined,
        {message: `Click action failed on '${buttons.issueRefund.title}' button, trying again`, retries: 1},
      );
    }

  private async retryTabAction(
    actionName: string,
    tabSelector: string,
    action: () => Promise<void>,
  ) {
    await super.retryAction(
      action,
      async () => {
        await super.waitForPageToLoad();
        await super.expectNoSelector(tabSelector, {
          timeout: config.playwright.shortExpectTimeout,
        });
      },
      () => super.reload(),
      { retries: 3, message: `${actionName} failed, trying again` },
    );
  }

  async grabCaseNumber() {
    return getUnformattedCaseId((await super.getText(headings.caseNumber.selector))!);
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number, { force }: { force: boolean } = { force: true }) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`, { force });
  }

  @TruthyParams(classKey, 'caseId')
  async retryGoToCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.retryGoTo(
      `${urls.manageCase}/cases/case-details/${caseId}`,
      () =>
        super.expectSelector(tabs.summary.selector, {
          timeout: config.playwright.shortExpectTimeout,
        }),
      undefined,
      { retries: 3, message: `Navigating to case with ccd case id: ${caseId}, trying again` },
    );
  }

  async chooseNextStep(ccdEvent: CCDEvent) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.selectFromDropdown(ccdEvent.name, dropdowns.nextStep.selector);
    await super.clickBySelector(buttons.go.selector);
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
        await super.expectNoSelector(tabs.summary.selector, {
          timeout: config.exui.pageSubmitTimeout,
        });
      },
      () => super.reload(),
      { retries: 3, message: `Starting event: ${ccdEvent.name} failed, trying again` },
    );
  }

  async chooseNextStepWithUrl(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Starting event with url: ${ccdEvent.id}`);
    await super.goTo(
      `${urls.manageCase}/cases/case-details/${caseId}/trigger/${ccdEvent.id}/${ccdEvent.id}`,
    );
    super.setCCDEvent = ccdEvent;
  }

  async retryChooseNextStepWithUrl(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Starting event with url: ${ccdEvent.id}`);
    await super.retryGoTo(
      `${urls.manageCase}/cases/case-details/${caseId}/trigger/${ccdEvent.id}/${ccdEvent.id}`,
      async () =>
        super.expectSelector(components.eventTrigger.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
      undefined,
      { retries: 2, message: `Starting event with url: ${ccdEvent.id} failed, trying again` },
    );
  }

  async retryRaiseANewQuery(caseId: number) {
    console.log(`Starting event with url: ${ccdEvents.QUERY_MANAGEMENT_RAISE.id}`);
    await super.retryGoTo(
      `${urls.manageCase}/query-management/query/${caseId}`,
      async () =>
        super.expectNoSelector(tabs.summary.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
      undefined,
      {
        retries: 2,
        message: `Starting event with url: ${ccdEvents.QUERY_MANAGEMENT_RAISE.id} failed, trying again`,
      },
    );
  }

  async retryGoToRefunds() {
    console.log(`Starting event with url: REFUNDS`);
    await super.retryGoTo(
      `${urls.manageCase}/refunds`,
      async () =>
        super.expectNoSelector(tabs.summary.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
      undefined,
      {
        retries: 2,
        message: `Starting event with url: REFUNDS failed, trying again`,
      },
    );
  }

  async retryStartWAEvent(ccdEvent: CCDEvent, waTask: WATask) {
    console.log(`Starting event: ${ccdEvent.name}`);
    await super.retryAction(
      async () => {
        await super.retryReload(
          async () => {
            await super.expectSelector(tabs.tasks.selector);
            await super.clickBySelector(tabs.tasks.selector, {
              timeout: 5_000,
            });
          },
          undefined,
          { retries: 1 },
        );
         await super.clickLink(waTask.name);
      },
      async () => {
        await super.waitForPageToLoad();
        await super.expectNoSelector(tabs.summary.selector, {
          timeout: config.exui.pageSubmitTimeout,
        });
      },
      () => super.reload(),
      { retries: 3, message: `Starting event: ${ccdEvent.name} failed, trying again` },
    );
  }

  async verifySuccessEvent(caseId: number, ccdEvent: CCDEvent) {
    console.log(`Verifying success banner and event history: ${ccdEvent.name}`);
    await super.expectText(successBannerText(getFormattedCaseId(caseId), ccdEvent));
    await super.clickByText(tabs.history.title);
    await super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async verifySuccessCaseFlagsEvent(activeCaseFlags: number, ccdEvent: CCDEvent) {
    console.log(`Verifying case flags notice and event history: ${ccdEvent.name}`);
    await super.expectText(caseFlagsNoticeText(activeCaseFlags), { exact: false });
    await super.clickByText(tabs.history.title);
    await super.expectTableRowValue(ccdEvent.name, containers.eventHistory.selector, {
      rowNum: 1,
    });
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
