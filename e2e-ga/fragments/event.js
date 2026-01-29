const {I} = inject();

const CASE_HEADER = 'ccd-case-header > h1';
const CONFIRMATION_HEADER = 'div#confirmation-header';
const ALERT_MESSAGE = '.hmcts-banner__message .alert-message';

module.exports = {

  async submit(buttonText, expectedMessage) {
    I.waitForText(buttonText);
    await I.runAccessibilityTest();
    await I.retryUntilExists(() => I.click(buttonText), CONFIRMATION_HEADER);
    await I.runAccessibilityTest();
    await within(CONFIRMATION_HEADER, () => {
      I.see(expectedMessage);
    });
  },

  async submitSupportingDoc(buttonText, expectedMessage) {
    I.waitForText(buttonText);
    await I.retryUntilExists(() => I.click(buttonText), ALERT_MESSAGE);
    await within(ALERT_MESSAGE, () => {
      I.see(expectedMessage);
    });
  },

  async returnToCaseDetails() {
    await I.retryUntilExists(() => I.click('Close and Return to case details'), CASE_HEADER);
  }
};
