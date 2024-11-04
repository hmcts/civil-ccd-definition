import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ccdEvents from '../../../fixtures/ccd/events';
import CaseDataHelper from '../../../helpers/case-data-helper';
import CCDCaseData from '../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../models/ccd/ccd-events';
import { buttons, components } from './exui-event-content';

let ccdEventState: CCDEvent;

export default function ExuiEvent<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep({ methodNamesToIgnore: ['setCCDEvent', 'clearCCDEvent'] })
  abstract class ExuiEvent extends Base {
    protected async verifyHeadings(caseData?: CCDCaseData) {
      let expects: Promise<void>[] | Promise<void>;

      if (
        ccdEventState === ccdEvents.CREATE_CLAIM ||
        ccdEventState === ccdEvents.CREATE_CLAIM_SPEC
      ) {
        expects = super.expectHeading(ccdEventState.name);
      } else if (ccdEventState === undefined) {
        expects = [
          super.expectHeading(CaseDataHelper.formatCaseId(caseData.id)),
          super.expectHeading(caseData.caseNamePublic),
        ];
      } else {
        expects = [
          super.expectHeading(ccdEventState.name),
          super.expectHeading(CaseDataHelper.formatCaseId(caseData.id)),
          super.expectHeading(caseData.caseNamePublic),
        ];
      }
      await super.runVerifications(expects, { runAxe: false });
    }

    protected async retryUploadFile(
      filePath: string,
      selector: string,
      retries = 3,
      timeout = 5000,
    ) {
      await this.retryAction(
        () => super.retryUploadFile(filePath, selector),
        () => super.waitForSelectorToDetach('span.error-message', { timeout }),
        'Uploading document failed, trying again...',
        { retries },
      );
    }

    protected async clickSubmit(options: { count?: number } = {}) {
      await super.clickBySelector(buttons.submit.selector, options);
      await super.waitForSelectorToDetach(components.loading.selector);
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickBySelectorTimeout(
        buttons.submit.selector,
        async () => {
          await super.waitForSelectorToDetach(components.loading.selector, {
            timeout: 30_000,
          });
          await super.expectNoSelector(components.error.selector, {
            timeout: 500,
          });
          if (expect) await expect();
        },
        { timeout: 45_000 },
      );
    }

    abstract submit(...args: any[]): Promise<void>;

    protected set setCCDEvent(ccdEvent: CCDEvent) {
      ccdEventState = ccdEvent;
    }

    protected clearCCDEvent() {
      ccdEventState = undefined;
    }
  }

  return ExuiEvent;
}
