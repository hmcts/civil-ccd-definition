import BasePage from '../../../../base/base-page';
import ExuiPage from '../exui-page/exui-page';
import { buttons, components } from '../exui-page/exui-content';

export default function ExuiQmPage<TBase extends abstract new (...args: any[]) => BasePage>(
  Base: TBase,
) {
  abstract class ExuiQmPage extends ExuiPage(Base) {
    protected async retryClickContinue(expect?: () => Promise<void>) {
      await super.retryClickByText(
        buttons.continue.title,
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
          message: 'Clicking continue button failed, trying again',
        },
      );
      await super.expectNoSelector(components.fieldError.selector, {
        timeout: 200,
        all: true,
        message: 'Field Validation Error on UI',
      });
    }

  }

  return ExuiQmPage;
}
