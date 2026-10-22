import { Locator, Page, expect } from "@playwright/test";

export class ExuiMediaViewerPage {
  readonly container: Locator;
  readonly toolbar: {
    container: Locator;
    numPages: Locator;
    pageDownBtn: Locator;
    pageUpBtn: Locator;
  };
  readonly clippingCoords = {
    fullPage: { x: -1000, y: 0, width: 1920, height: 1080 },
  };

  constructor(public page: Page) {
    this.container = page.locator("exui-media-viewer");
    this.toolbar = {
      container: page.locator("#toolbarContainer"),
      numPages: page.locator("#numPages"),
      pageDownBtn: page.locator("#mvDownBtn"),
      pageUpBtn: page.locator("#mvUpBtn"),
    };
  }

  public async waitForLoad() {
    await expect
      .poll(
        async () => {
          const totalPages = await this.getNumberOfPages();
          return totalPages;
        },
        { timeout: 10_000 }
      )
      .toBeGreaterThan(0);
  }

  public async getNumberOfPages(): Promise<number> {
    const text = await this.toolbar.numPages.textContent();
    if (!text) throw new Error("No page numbers found");
    return parseInt(text.replace("/", ""));
  }

  public async runVisualTestOnAllPages() {
    await this.waitForLoad();
    const totalPages = await this.getNumberOfPages();
    for (let i = 0; i < totalPages; i++) {
      await expect(this.page).toHaveScreenshot({
        clip: this.clippingCoords.fullPage,
      });
      if (i != totalPages - 1) await this.toolbar.pageDownBtn.click();
    }
  }
}
