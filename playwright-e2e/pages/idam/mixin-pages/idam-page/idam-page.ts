import BasePage from '../../../../base/base-page';
import config from '../../../../config/config';
import { CCDEvent } from '../../../../models/ccd-events/ccd-events';
import { buttons } from './idam-content';

let ccdEventstate: CCDEvent | undefined;

export default function IdamPage<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  // @AllMethodsStep({ methodNamesToIgnore: ['setCCDEvent', 'clearCCDEvent'] })
  abstract class IdamPage extends Base {

    protected async clickContinue() {
      await super.clickBySelector(buttons.continue.selector);
    }

    protected async retryClickContinue(expect?: () => Promise<void>) {
      await super.retryClickByText(
        buttons.continue.title,
        async () => {
          if (expect) await expect();
        },
        undefined,
        {
          retries: config.idam.eventRetries,
          message: 'Clicking continue button failed, trying again',
        },
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

  return IdamPage;
}
