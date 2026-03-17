import { expect } from "@playwright/test";

export class ValidatorUtils {
  /**
   * Validate a case number is made of only digits
   *
   * @param caseNumber {@link string} - the case number
   *
   */
  public static validateCaseNumber(caseNumber: string) {
    // TODO: There may be a specification around case numbers somewhere?
    // For now, this just validates it's only digits
    expect(caseNumber).toMatch(/^\d+$/);
  }

  /**
   * Validates a given date in the format of "18 Oct 2024"
   * and ensures the date can be parsed
   *
   * @param caseNumber {@link string} - the case number
   *
   */
  public static validateDate(date: string) {
    const dateRegex =
      /^\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/;
    expect(date).toMatch(dateRegex);
    expect(Date.parse(date)).not.toBe(NaN);
  }
}
