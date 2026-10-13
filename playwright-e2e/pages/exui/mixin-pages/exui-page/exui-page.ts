import BasePage from '../../../../base/base-page';
import config from '../../../../config/config';
import ccdEvents from '../../../../constants/ccd-events/ccd-events/ccd-events';
import CCDCaseData from '../../../../models/ccd-case-data';
import CCDEvent from '../../../../models/ccd-events/ccdEvent';
import { buttons, components, getFormattedCaseId } from './exui-content';

let ccdEventstate: CCDEvent | undefined;

export default function ExuiPage<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  // @AllMethodsStep({ methodNamesToIgnore: ['setCCDEvent', 'clearCCDEvent'] })
  abstract class ExuiPage extends Base {
    protected async verifyHeadings(
      ccdCaseData?: CCDCaseData,
      { timeout }: { timeout?: number } = {},
    ) {
      let expects: Promise<void>[] | Promise<void>;

      if (
        ccdEventstate === ccdEvents.CREATE_CLAIM ||
        ccdEventstate === ccdEvents.CREATE_CLAIM_SPEC
      ) {
        expects = super.expectHeading(ccdEventstate.name);
      } else if (ccdEventstate === undefined) {
        expects = [
          super.expectCaseHeading(getFormattedCaseId(ccdCaseData?.id!), { timeout }),
          super.expectCaseHeading(ccdCaseData?.caseNamePublic!, { timeout }),
        ];
      } else {
        expects = [
          super.expectHeading(ccdEventstate.name, { exact: false, timeout }),
          super.expectCaseHeading(getFormattedCaseId(ccdCaseData?.id!), { timeout }),
          super.expectCaseHeading(ccdCaseData?.caseNamePublic!, { timeout }),
        ];
      }
      await super.runVerifications(expects, { runAxe: false });
    }

    protected async retryUploadFile(
      filePath: string,
      selector: string,
      {
        retries = 3,
        timeout = 5000,
        containerSelector,
        index,
        first,
      }: {
        retries?: number;
        timeout?: number;
        containerSelector?: string;
        index?: number;
        first?: boolean;
      } = {},
    ) {
      await this.retryAction(
        () => super.uploadFile(filePath, selector, { containerSelector, index, first }),
        () =>
          super.expectNoSelector(components.uploadDocError.selector, {
            containerSelector,
            timeout,
            all: true,
            message: 'Uploading document failed',
          }),
        undefined,
        { retries, message: 'Uploading document failed, trying again...' },
      );
    }

    // ExUI shows a "Page refreshed" modal when an event URL is reloaded while an event is in progress,
    // e.g. when retrying an event after a failure. It blocks every click until dismissed.
    protected async dismissRefreshModal() {
      try {
        await super.waitForSelectorToBeVisible(components.refreshModal.selector, { timeout: 3000 });
      } catch {
        return;
      }
      console.log('Page refreshed modal shown, dismissing it');
      await super.clickButtonByName(components.refreshModal.okButton);
      await super.waitForSelectorToDetach(components.refreshModal.selector, {
        timeout: config.exui.pageSubmitTimeout,
      });
    }

    protected async clickAddNew() {
      await super.clickBySelector(buttons.addNew.selector);
    }

    protected async waitForPageToLoad() {
      await Promise.race([
        super.waitForSelectorToDetach(components.loading.selector, {
          timeout: config.exui.pageSubmitTimeout,
        }),
        super.waitForUrlToChange({ timeout: config.exui.pageSubmitTimeout }),
      ]);
    }

    protected async clickSubmit() {
      await super.clickBySelector(buttons.submit.selector);
      await this.waitForPageToLoad();
      await super.expectNoSelector(components.fieldError.selector, {
        timeout: 200,
        all: true,
        message: 'Field validation error on UI',
      });
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickBySelector(
        buttons.submit.selector,
        async () => {
          await this.waitForPageToLoad();
          await super.expectNoSelector(components.error.selector, {
            timeout: 200,
            all: true,
          });
          if (expect) await expect();
        },
        undefined,
        {
          retries: 2,
          message: 'Clicking submit button failed, trying again',
        },
      );
      await super.expectNoSelector(components.fieldError.selector, {
        timeout: 200,
        all: true,
        message: 'Field Validation Error on UI',
      });
    }

    abstract submit(...args: any[]): Promise<void>;

    set setCCDEvent(ccdEvent: CCDEvent) {
      ccdEventstate = ccdEvent;
    }

    clearCCDEvent() {
      ccdEventstate = undefined;
    }
  }

  return ExuiPage;
}
