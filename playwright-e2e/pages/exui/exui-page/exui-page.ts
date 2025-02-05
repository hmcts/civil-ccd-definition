import BasePage from '../../../base/base-page';
import { AllMethodsStep } from '../../../decorators/test-steps';
import ccdEvents from '../../../constants/ccd-events';
import CaseDataHelper from '../../../helpers/case-data-helper';
import CCDCaseData from '../../../models/ccd/ccd-case-data';
import { CCDEvent } from '../../../models/ccd/ccd-events';
import { buttons, components, getFormattedCaseId } from './exui-content';

let ccdEventstate: CCDEvent;

export default function ExuiPage<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  @AllMethodsStep({ methodNamesToIgnore: ['setCCDEvent', 'clearCCDEvent'] })
  abstract class ExuiPage extends Base {
    protected async verifyHeadings(ccdCaseData?: CCDCaseData) {
      let expects: Promise<void>[] | Promise<void>;

      if (
        ccdEventstate === ccdEvents.CREATE_CLAIM ||
        ccdEventstate === ccdEvents.CREATE_CLAIM_SPEC
      ) {
        expects = super.expectHeading(ccdEventstate.name);
      } else if (ccdEventstate === undefined) {
        expects = [
          super.expectHeading(getFormattedCaseId(ccdCaseData.id)),
          super.expectHeading(ccdCaseData.caseNamePublic),
        ];
      } else {
        expects = [
          super.expectHeading(ccdEventstate.name),
          super.expectHeading(getFormattedCaseId(ccdCaseData.id)),
          super.expectHeading(ccdCaseData.caseNamePublic),
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

    protected async clickAddNew() {
      await super.clickBySelector(buttons.addNew.selector);
    }

    protected async clickSubmit() {
      await super.clickBySelector(buttons.submit.selector);
      await super.waitForSelectorToDetach(components.loading.selector);
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickBySelectorTimeout(
        buttons.submit.selector,
        async () => {
          await super.waitForSelectorToDetach(components.loading.selector, {
            timeout: 15_000,
          });
          await super.expectNoSelector(components.error.selector, {
            timeout: 500,
            all: true,
          });
          await super.expectNoSelector(components.fieldError.selector, {
            timeout: 500,
            all: true,
            message: 'Field Validation Error on UI',
          });
          if (expect) await expect();
        },
        { timeout: 30_000 },
      );
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
