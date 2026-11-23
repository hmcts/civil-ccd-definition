import { AxeBuilder } from "@axe-core/playwright";
import { Page, expect } from "@playwright/test";

interface AuditOptions {
  exclude?: string | string[];
  disableRules?: string | string[];
}

export class AxeUtils {
  private readonly DEFAULT_TAGS = [
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22a",
    "wcag22aa",
  ];

  constructor(protected readonly page: Page) {}

  /**
   * Run the AxeBuilder checks using the pre-determined tags
   *
   * @param options {@link AuditOptions} - Optional config such as excluding element(s)
   *
   */
  public async audit(options?: AuditOptions) {
    const builder = new AxeBuilder({ page: this.page }).withTags(
      this.DEFAULT_TAGS
    );
    if (options?.exclude) {
      if (Array.isArray(options.exclude)) {
        options.exclude.forEach((selector) => builder.exclude(selector));
      } else {
        builder.exclude(options.exclude);
      }
    }
    if (options?.disableRules) builder.disableRules(options.disableRules);
    const results = await builder.analyze();

    if (process.env.PWDEBUG) {
      if (results.violations.length > 0) {
        console.log(`Accessibility issues found on ${this.page.url()}:`);
        results.violations.forEach((violation) => {
          console.log(`${violation.id}: ${violation.description}`);
          console.log(`Impact: ${violation.impact}`);
          console.log(
            `Affected nodes:`,
            violation.nodes.map((node) => node.html).join("\n")
          );
        });
      }
    }

    expect.soft(results.violations).toEqual([]);
  }
}
