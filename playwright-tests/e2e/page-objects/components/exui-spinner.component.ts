import { Locator, Page, expect } from "@playwright/test";

export class ExuiSpinnerComponent{
  readonly spinner: Locator;

  constructor(public page: Page) {
    this.spinner = page.locator("xuilib-loading-spinner");
  }

  async wait() {
    await expect
      .poll(
        async () => {
          const spinnerCount = await this.spinner.count();
          return spinnerCount;
        },
        {
          timeout: 60_000,
        }
      )
      .toBe(0);
  }
}
