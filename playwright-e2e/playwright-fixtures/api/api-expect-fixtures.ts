import { expect as baseExpect } from '@playwright/test';

export const apiExpect = baseExpect.extend({
  toBeOneOf(actualValue: any, expectValue: any | any[]) {
    const assertionName = 'toBeOneOf';
    const isExpectedStatusList = Array.isArray(expectValue);
    const expectedStatusMessage = this.utils.printExpected(expectValue);
    const pass = isExpectedStatusList ? expectValue.includes(actualValue) : expectValue === actualValue;

    return {
      name: assertionName,
      pass,
      expected: expectValue,
      actual: actualValue,
      message: () =>
        this.utils.matcherHint(assertionName, undefined, undefined, {
          isNot: this.isNot
        }) +
        '\n\n' +
        `Expected Value(s): ${expectedStatusMessage}\n` +
        `Received Value: ${this.utils.printReceived(actualValue)}`
    };
  }
});
