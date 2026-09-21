import BasePage from '../../../../base/base-page';
import { buttons } from './exui-refunds-content';

export default function ExuiRefundsPage<
  TBase extends abstract new (...args: any[]) => BasePage,
>(Base: TBase) {
  abstract class ExuiRefundsPage extends Base {
    protected async retryClickContinue(expect?: () => Promise<void>) {
      await super.retryClickByText(
        buttons.continue.title,
        async () => {
          if (expect) await expect();
        },
        undefined,
        {
          retries: 2,
          message: 'Clicking continue button failed, trying again',
        },
      );
    }

    protected async retryClickSubmit(expect?: () => Promise<void>) {
      await super.retryClickByText(
        buttons.submit.title,
        async () => {
          if (expect) await expect();
        },
        undefined,
        {
          retries: 2,
          message: 'Clicking submit button failed, trying again',
        },
      );
    }

    protected async retryClickSubmitRefund(expect?: () => Promise<void>) {
      await super.retryClickByText(
        buttons.submitRefund.title,
        async () => {
          if (expect) await expect();
        },
        undefined,
        {
          retries: 2,
          message: 'Clicking submit refund button failed, trying again',
        },
      );
    }
  }

  return ExuiRefundsPage;
}
