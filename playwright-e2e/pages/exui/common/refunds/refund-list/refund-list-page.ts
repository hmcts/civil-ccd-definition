import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { containers, headings, links, sortHeaders, subheadings, getRefundListCaseId } from './refund-list-content';

@AllMethodsStep()
export default class RefundListPage extends BasePage {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.refundList),
      super.expectSubheading(subheadings.refundsReturnedToCaseworker, ),
    ]);
  }

  async processRefund(caseId: number) {
    const formattedCaseId = getRefundListCaseId(caseId);
    const caseRow = containers.caseRow.selector(formattedCaseId);
    await super.retryReload(
      async () => {
        await super.clickBySelector(sortHeaders.lastUpdated, { index: 0 });
        await super.clickBySelector(sortHeaders.lastUpdated, { index: 0 });
        await super.expectText(formattedCaseId);
        await super.clickBySelector(links.processRefund.selector, {
          containerSelector: caseRow,
        });
      },
      undefined,
      {
        retries: 3,
        message: `Refund ${formattedCaseId} is not available yet; reloading the refund list`,
      },
    );
    await super.expectNoText(subheadings.refundsReturnedToCaseworker);
  }

  async reviewRefund(caseId: number) {
    const formattedCaseId = getRefundListCaseId(caseId);
    const caseRow = containers.caseRow.selector(formattedCaseId);
    await super.retryReload(
      async () => {
        await super.clickBySelector(sortHeaders.lastUpdated, { index: 0 });
        await super.clickBySelector(sortHeaders.lastUpdated, { index: 0 });
        await super.expectText(formattedCaseId);
        await super.clickBySelector(links.reviewRefund.selector, {
          containerSelector: caseRow,
        });
      },
      undefined,
      {
        retries: 3,
        message: `Refund ${formattedCaseId} is not available yet; reloading the refund list`,
      },
    );
    await super.expectNoText(subheadings.refundsReturnedToCaseworker);
  }
}
