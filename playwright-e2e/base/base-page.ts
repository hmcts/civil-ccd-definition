import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import config from '../config/config';
import Cookie from '../models/cookie';
import { TruthyParams } from '../decorators/truthy-params';
import { pageExpect, test } from '../playwright-fixtures';
import Timer from '../helpers/timer';
import { getDomain } from '../config/urls';
import { BoxedDetailedStep, Step } from '../decorators/test-steps';
import ClassMethodHelper from '../helpers/class-method-helper';
import ExpectError from '../errors/expect-error';

const classKey = 'BasePage';
export default abstract class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async clickBySelector(
    selector: string,
    options: { timeout?: number; first?: boolean } = {},
  ) {
    const locator = this.page.locator(selector);
    if (options.first) {
      await locator.first().click({ timeout: options.timeout });
    }
    await locator.click({ timeout: options.timeout });
  }

  @BoxedDetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickButtonByName(name: string, options: { timeout?: number } = {}) {
    await this.page.getByRole('button', { name }).click(options);
  }

  @BoxedDetailedStep(classKey, 'name')
  @TruthyParams(classKey, 'name')
  protected async clickLink(
    name: string,
    options: { index?: number; timeout?: number } = {
      index: 0,
    },
  ) {
    await this.page
      .getByRole('link', { name })
      .nth(options.index)
      .click({ timeout: options.timeout });
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey)
  protected async selectorExists(selector: string): Promise<boolean> {
    await this.page.waitForSelector(selector, { state: 'visible' });
    return await this.page.locator(selector!).isVisible();
  }

  @BoxedDetailedStep(classKey, 'content', 'selector')
  @TruthyParams(classKey)
  protected async elementIncludes(content: string, selector?: string): Promise<boolean> {
    const textContent = await this.page.locator(selector!).textContent();
    if (!textContent) return false;
    return textContent.includes(content);
  }

  @BoxedDetailedStep(classKey, 'url')
  @TruthyParams(classKey, 'url')
  protected async goTo(url: string, options: { force?: boolean } = {}) {
    const { origin, pathname } = new URL(this.page.url());
    if (`${origin}${pathname}` !== url || options.force) {
      await this.page.goto(url);
    }
  }

  protected async isDomain(url: string) {
    const currentDomain = getDomain(this.page.url());
    const urlDomain = getDomain(url);
    return urlDomain === currentDomain;
  }

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async clickByText(text: string, options: { timeout?: number; exact?: boolean } = {}) {
    await this.page.getByText(text, { exact: options.exact }).click({ timeout: options.timeout });
  }

  @BoxedDetailedStep(classKey, 'input', 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputText(
    input: string | number,
    selector: string,
    options: { index?: number; timeout?: number } = {},
  ) {
    if (options.index) {
      await this.page.locator(selector).nth(options.index).fill(input.toString());
    } else {
      await this.page.fill(selector, input.toString(), {
        timeout: options.timeout,
      });
    }
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'input', 'selector')
  protected async inputSensitiveText(
    input: string | number,
    selector: string,
    options: { timeout?: number } = {},
  ) {
    await this.page.fill(selector, input.toString(), {
      timeout: options.timeout,
    });
  }

  @TruthyParams(classKey)
  protected async getText(selector: string) {
    return (await this.page.textContent(selector)) ?? undefined;
  }

  @BoxedDetailedStep(classKey, 'option', 'selector')
  @TruthyParams(classKey, 'selector')
  protected async selectFromDropdown(option: string | number, selector: string) {
    if (typeof option === 'number') await this.page.selectOption(selector, { index: option });
    else await this.page.selectOption(selector, option);
  }

  @BoxedDetailedStep(classKey)
  protected async getCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  @BoxedDetailedStep(classKey)
  protected async reload() {
    await this.page.reload();
  }

  @BoxedDetailedStep(classKey)
  protected async clearCookies() {
    await this.page.context().clearCookies();
  }

  @BoxedDetailedStep(classKey)
  protected async addCookies(cookies: Cookie[]) {
    await this.page.context().addCookies(cookies);
  }

  @BoxedDetailedStep(classKey, 'filePath', 'selector')
  @TruthyParams(classKey)
  protected async retryUploadFile(filePath: string, selector: string) {
    await this.page.locator(selector).setInputFiles([]);
    await this.page.locator(selector).setInputFiles([filePath]);
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async waitForSelectorToDetach(
    selector: string,
    options: { timeout?: number } = { timeout: 25_000 },
  ) {
    const locator = this.page.locator(selector);
    try {
      await locator.waitFor({ state: 'attached', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await locator.waitFor({ state: 'detached', ...options });
  }

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async waitForTextToDetach(
    text: string,
    options: { timeout?: number } = { timeout: 25_000 },
  ) {
    const locator = this.page.getByText(text);
    try {
      await locator.waitFor({ state: 'attached', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    await locator.waitFor({ state: 'detached', ...options });
  }

  public async pause() {
    await this.page.pause();
  }

  public async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  abstract verifyContent(...args: any[]): Promise<void>;

  protected async runVerifications(
    expects?: Promise<void> | Promise<void>[],
    {
      runAxe = true,
      axeExclusions = [],
      useAxeCache = true,
      pageInsertName,
    }: {
      runAxe?: boolean;
      axeExclusions?: string[];
      useAxeCache?: boolean;
      pageInsertName?: string;
    } = {},
  ) {
    if (expects) {
      Array.isArray(expects) ? await Promise.all(expects) : await expects;
    }

    if (config.runAxeTests && runAxe) {
      await this.expectAxeToPass(axeExclusions, useAxeCache, pageInsertName);
    }
  }

  protected async retryReloadRunVerifications(
    assertions: () => Promise<void>[] | Promise<void>,
    {
      runAxe = true,
      axeExclusions = [],
      useAxeCache = true,
      timeout = 12_000,
      pageInsertName,
    }: {
      runAxe?: boolean;
      axeExclusions?: string[];
      useAxeCache?: boolean;
      timeout?: number;
      pageInsertName?: string;
    } = {},
  ) {
    await this.retryReloadTimeout(assertions, { timeout, interval: 2000 });

    if (config.runAxeTests && runAxe) {
      await this.expectAxeToPass(axeExclusions, useAxeCache, pageInsertName);
    }
  }

  @BoxedDetailedStep(classKey)
  private async expectAxeToPass(
    axeExclusions: string[],
    useAxeCache: boolean,
    pageInsertName?: string,
  ) {
    const axeBuilder = new AxeBuilder({ page: this.page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .setLegacyMode(true);

    for (const axeExclusion of axeExclusions) {
      axeBuilder.exclude(axeExclusion);
    }

    const pageName = ClassMethodHelper.formatClassName(
      pageInsertName !== undefined
        ? `${this.constructor.name.slice(0, -4)}${pageInsertName}Page`
        : this.constructor.name,
    );

    const errorsNumBefore = test.info().errors.length;
    if (useAxeCache) {
      await pageExpect.soft(pageName).toHaveNoAxeViolationsCache(axeBuilder, this.page);
    } else {
      await pageExpect.soft(pageName).toHaveNoAxeViolations(axeBuilder, this.page);
    }
    const errorsAfter = test.info().errors;

    if (errorsAfter.length > errorsNumBefore) {
      errorsAfter[errorsAfter.length - 1].value = 'accessibility';
    }
  }

  @BoxedDetailedStep(classKey, 'domain')
  protected async expectDomain(
    domain: string,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page, { message: options.message }).toHaveURL(
      new RegExp(`https?://${domain}.*`),
      {
        timeout: options.timeout,
      },
    );
  }

  @BoxedDetailedStep(classKey, 'path')
  protected async expectUrlStart(
    path: string,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page, { message: options.message }).toHaveURL(new RegExp(`^${path}`), {
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'endpoints')
  protected async expectUrlEnd(
    endpoints: string | string[],
    options: { timeout?: number; message?: string } = {},
  ) {
    const regex = new RegExp(
      Array.isArray(endpoints) ? `(${endpoints.join('|')})$` : `${endpoints}$`,
    );
    await pageExpect(this.page, { message: options.message }).toHaveURL(regex, {
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'text')
  protected async expectHeading(
    text: string | number,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page.locator('h1', { hasText: text.toString() }), {
      message: options.message,
    }).toBeVisible({ timeout: options.timeout });
  }

  @BoxedDetailedStep(classKey, 'text')
  protected async expectSubheading(
    text: string,
    options: { exact?: string; message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page.locator('h2', { hasText: text }), {
      message: options.message,
    }).toBeVisible({ timeout: options.timeout });
  }

  private getSelectorLocator(
    selector: string,
    containerSelector?: string,
    index?: number,
    first?: boolean,
  ) {
    const locator = containerSelector
      ? this.page.locator(containerSelector).locator(selector)
      : this.page.locator(selector);
    return first ? locator.nth(0) : index ? locator.nth(index) : locator;
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async expectSelector(
    selector: string,
    options: {
      containerSelector?: string;
      index?: number;
      first?: boolean;
      message?: string;
      timeout?: number;
    } = {},
  ) {
    if (options.first && options.index !== undefined) {
      throw new ExpectError("Cannot use 'first' and 'index' options at the same time");
    }
    const locator = this.getSelectorLocator(
      selector,
      options.containerSelector,
      options.index,
      options.first,
    );
    await pageExpect(locator, { message: options.message }).toBeVisible(options);
  }

  @BoxedDetailedStep(classKey, 'selector')
  protected async expectNoSelector(
    selector: string,
    options: {
      containerSelector?: string;
      all?: boolean;
      index?: number;
      first?: boolean;
      message?: string;
      timeout?: number;
    } = {},
  ) {
    if (options.first && options.index !== undefined) {
      throw new ExpectError("Cannot use 'first' and 'index' options at the same time");
    }
    const locator = this.getSelectorLocator(
      selector,
      options.containerSelector,
      options.index,
      options.first,
    );
    try {
      await locator.waitFor({ state: 'visible', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    if (options.all) {
      await pageExpect(locator, { message: options.message }).allToBeHidden({
        timeout: options.timeout,
      });
    } else {
      await pageExpect(locator, { message: options.message }).toBeHidden({
        timeout: options.timeout,
      });
    }
  }

  private getTextLocator(
    text: string | number,
    exact?: boolean,
    containerSelector?: string,
    index?: number,
    first?: boolean,
  ) {
    const locator = containerSelector
      ? this.page.locator(containerSelector).getByText(text.toString(), { exact })
      : this.page.getByText(text.toString(), { exact });
    return first ? locator.nth(0) : index ? locator.nth(index) : locator;
  }

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async expectText(
    text: string | number,
    options: {
      message?: string;
      exact?: boolean;
      containerSelector?: string;
      index?: number;
      first?: boolean;
      ignoreDuplicates?: boolean;
      count?: number | null;
      timeout?: number;
    } = {},
  ) {
    if (options.ignoreDuplicates && options.count !== undefined) {
      throw new ExpectError("Cannot use 'ignoreDuplicates' and 'count' options at the same time");
    }

    if (options.first && options.index !== undefined) {
      throw new ExpectError("Cannot use 'first' and 'index' options at the same time");
    }

    if (options.count && options.count === 0) {
      throw new ExpectError("'count' cannot be set to 0");
    }

    const locator = this.getTextLocator(
      text,
      options.exact,
      options.containerSelector,
      options.index,
      options.first,
    );

    if (options.ignoreDuplicates) {
      await pageExpect(locator, { message: options.message }).atLeastOneToBeVisible({
        timeout: options.timeout,
      });
    } else if (options.count !== undefined) {
      await pageExpect(locator, { message: options.message }).someToBeVisible(options.count, {
        timeout: options.timeout,
      });
    } else {
      await pageExpect(locator, { message: options.message }).toBeVisible({
        timeout: options.timeout,
      });
    }
  }

  @BoxedDetailedStep(classKey, 'text')
  @TruthyParams(classKey, 'text')
  protected async expectNoText(
    text: string | number,
    options: {
      message?: string;
      exact?: boolean;
      containerSelector?: string;
      all?: boolean;
      index?: number;
      first?: boolean;
      timeout?: number;
    } = {},
  ) {
    const locator = this.getTextLocator(
      text,
      options.exact,
      options.containerSelector,
      options.index,
      options.first,
    );
    try {
      await locator.waitFor({ state: 'visible', timeout: 500 });
      // eslint-disable-next-line no-empty
    } catch (err) {}
    if (options.all) {
      await pageExpect(locator, { message: options.message }).allToBeHidden({
        timeout: options.timeout,
      });
    } else {
      await pageExpect(locator, { message: options.message }).toBeHidden({
        timeout: options.timeout,
      });
    }
  }

  @BoxedDetailedStep(classKey, 'label')
  protected async expectLabel(
    label: string,
    options: {
      count?: number;
      ignoreDuplicates?: boolean;
      message?: string;
      exact?: boolean;
      timeout?: number;
    } = { exact: false },
  ) {
    if (options.ignoreDuplicates && options.count !== undefined) {
      throw new ExpectError("Cannot use 'ignoreDuplicates' and 'count' options at the same time");
    }

    if (options.count && options.count === 0) {
      throw new ExpectError("'count' cannot be set to 0");
    }

    const locator = this.page.getByLabel(label, { exact: options.exact });

    if (options.ignoreDuplicates) {
      await pageExpect(locator, { message: options.message }).atLeastOneToBeVisible({
        timeout: options.timeout,
      });
    } else if (options.count !== undefined) {
      await pageExpect(locator, { message: options.message }).someToBeVisible(options.count, {
        timeout: options.timeout,
      });
      await pageExpect(locator, {
        message: options.message,
      }).toBeVisible({
        timeout: options.timeout,
      });
    }
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectLink(
    name: string,
    options: { message?: string; exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('link', { name, exact: options.exact }), {
      message: options.message,
    }).toBeVisible({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectTab(
    name: string,
    options: { message?: string; exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('tab', { name, exact: options.exact }), {
      message: options.message,
    }).toBeVisible({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectNoTab(
    name: string,
    options: { message?: string; exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('tab', { name, exact: options.exact }), {
      message: options.message,
    }).toBeHidden({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectButton(
    name: string,
    options: { message?: string; exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('button', { name, exact: options.exact }), {
      message: options.message,
    }).toBeVisible({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'name')
  protected async expectNoButton(
    name: string,
    options: { message?: string; exact?: boolean; timeout?: number } = { exact: false },
  ) {
    await pageExpect(this.page.getByRole('button', { name, exact: options.exact }), {
      message: options.message,
    }).toBeHidden({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'selector')
  @TruthyParams(classKey, 'selector')
  protected async expectOptionChecked(
    selector: string,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page.locator(selector), { message: options.message }).toBeChecked({
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'selector', 'text')
  @TruthyParams(classKey, 'selector', 'text')
  protected async expectInputValue(
    selector: string,
    text: string,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page.locator(selector), { message: options.message }).toHaveValue(text, {
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'selector', 'option')
  @TruthyParams(classKey, 'selector', 'option')
  protected async expectDropdownOption(
    selector: string,
    option: string,
    options: { message?: string; timeout?: number } = {},
  ) {
    await pageExpect(this.page.locator(selector), { message: options.message }).toHaveText(option, {
      timeout: options.timeout,
    });
  }

  @BoxedDetailedStep(classKey, 'text', 'selector')
  @TruthyParams(classKey, 'text', 'selector')
  protected async expectTableRowValue(
    text: string,
    selector: string,
    options: { message?: string; rowNum: number; timeout?: number; tableName?: string } = {
      rowNum: 0,
    },
  ) {
    await pageExpect(this.page.locator(`${selector} >> tr`).nth(options.rowNum).getByText(text), {
      message: options.message,
    }).toBeVisible({ timeout: options.timeout });
  }

  protected async retryAction(
    action: () => Promise<void>,
    assertions: () => Promise<void>[] | Promise<void>,
    message: string,
    { retries = 1, assertFirst = false }: { retries?: number; assertFirst?: boolean } = {},
  ) {
    while (retries > 0) {
      if (!assertFirst) await action();
      const promises = assertions();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
        break;
      } catch (error) {
        retries--;
        if (retries <= 0) throw error;
        console.log(message);
        console.log(`Retries: ${retries} remaining`);
        assertFirst = false;
      }
    }
  }

  @Step(classKey)
  @TruthyParams(classKey, 'selector')
  protected async retryClickBySelector(
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.clickBySelector(selector),
      assertions,
      `Click action failed, selector: ${selector}, trying again`,
      { retries },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'name')
  protected async retryClickLink(
    name: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.clickLink(name),
      assertions,
      `Click action failed, link: ${name} trying again`,
      { retries },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'option', 'selector')
  protected async retrySelectFromDropdown(
    option: string,
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      async () => {
        await this.selectFromDropdown(0, selector);
        await this.selectFromDropdown(option, selector);
      },
      assertions,
      `Select from dropdown action failed, option: ${option}, selector: ${selector} trying again`,
      { retries },
    );
  }

  @Step(classKey)
  protected async retryReload(
    assertions: () => Promise<void>[] | Promise<void>,
    { retries = 2 }: { retries?: number } = {},
  ) {
    await this.retryAction(
      () => this.reload(),
      assertions,
      'Assertion failed, reloading page and trying again',
      { retries, assertFirst: true },
    );
  }

  protected async retryActionTimeout(
    action: () => Promise<void>,
    expects: () => Promise<void>[] | Promise<void>,
    message: string,
    {
      interval = 5_000,
      timeout = config.playwright.toPassTimeout,
      assertFirst = false,
    }: { interval?: number; timeout?: number; assertFirst?: boolean } = {},
  ) {
    let attempts = 0;
    const timer = new Timer(timeout);
    await pageExpect(async () => {
      if (!assertFirst) await action();
      attempts++;
      const promises = expects();
      try {
        await (Array.isArray(promises) ? Promise.all(promises) : promises);
      } catch (error) {
        console.log(message);
        console.log(`Attempts: ${attempts}, Timeout in ${timer.remainingTime} second(s)`);
        assertFirst = false;
        throw error;
      }
    }).toPass({
      intervals: [interval],
      timeout: timeout,
    });
  }

  @Step(classKey)
  @TruthyParams(classKey, 'selector')
  protected async retryClickBySelectorTimeout(
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.clickBySelector(selector),
      assertions,
      `Click action failed, selector: ${selector}, trying again`,
      {
        interval,
        timeout,
      },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'name')
  protected async retryClickLinkTimeout(
    name: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.clickLink(name),
      assertions,
      `Click action failed, link: ${name} trying again`,
      { interval, timeout },
    );
  }

  @Step(classKey)
  @TruthyParams(classKey, 'option', 'selector')
  protected async retrySelectFromDropdownTimeout(
    option: string,
    selector: string,
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      async () => {
        await this.selectFromDropdown(0, selector);
        await this.selectFromDropdown(option, selector);
      },
      assertions,
      `Select from dropdown action failed, option: ${option}, selector: ${selector} trying again`,
      { interval, timeout },
    );
  }

  @Step(classKey)
  protected async retryReloadTimeout(
    assertions: () => Promise<void>[] | Promise<void>,
    { interval, timeout }: { interval?: number; timeout?: number } = {},
  ) {
    await this.retryActionTimeout(
      () => this.reload(),
      assertions,
      'Assertion failed, reloading page and trying again',
      { interval, timeout, assertFirst: true },
    );
  }
}
