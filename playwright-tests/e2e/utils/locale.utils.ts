import { Page } from "@playwright/test";

export enum Locale {
  EN = "en",
  CY = "cy",
}

export class LocaleUtils {
  constructor(private page: Page) {}

  /**
   * Takes a locale and appends it to the current URL, or if a locale is already present it is replaced.
   *
   * @param locale {@link Locale} - enum representing supported locales
   *
   */
  public appendLocaleToUrl(locale: Locale): string {
    const url = this.page.url();
    const lngRegex = new RegExp("\\?lng=");

    const match = url.match(lngRegex);
    if (match) {
      return this.page.url().replace(/\?lng=\w+/, `?lng=${locale}`);
    }
    return this.page.url() + `?lng=${locale}`;
  }

  public async navigateWithLocale(locale: Locale): Promise<void> {
    await this.page.goto(this.appendLocaleToUrl(locale));
  }
}
