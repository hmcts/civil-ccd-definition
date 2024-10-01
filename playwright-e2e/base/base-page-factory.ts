import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';

export default abstract class BasePageFactory {
  private _page: Page;
  private _axeBuilder: AxeBuilder;

  constructor(page: Page, axeBuilder: AxeBuilder) {
    this._page = page;
    this._axeBuilder = axeBuilder;
  }

  protected get page() {
    return this._page;
  }

  protected get axeBuilder() {
    return this._axeBuilder;
  }
}
