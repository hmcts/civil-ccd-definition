import { expect as baseExpect } from '@playwright/test';

export const apiExpect = baseExpect.extend({
  toBeOneOfStatuses(actualStatus: number, expectedStatus: number | number[]) {
    const assertionName = 'toBeOneOfStatuses';
    const isExpectedStatusList = Array.isArray(expectedStatus);
    const expectedStatusMessage = this.utils.printExpected(expectedStatus);
    const pass = isExpectedStatusList ? expectedStatus.includes(actualStatus) : expectedStatus === actualStatus;

    return {
      name: assertionName,
      pass,
      expected: expectedStatus,
      actual: actualStatus,
      message: () =>
        this.utils.matcherHint(assertionName, undefined, undefined, {
          isNot: this.isNot
        }) +
        '\n\n' +
        `Expected Status(es): ${expectedStatusMessage}\n` +
        `Received Status: ${this.utils.printReceived(actualStatus)}`
    };
  }
});
