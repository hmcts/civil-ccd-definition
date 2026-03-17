const {I} = inject();

const CONFIRMATION_HEADER = '#confirmation-header';
const SUMMARY_TAB = 'div[role="tab"]:nth-child(1)';
const ALERT_MESSAGE = '.hmcts-banner__message .alert-message';

module.exports = {

  async submit(buttonText, expectedMessage) {
    I.waitForText(buttonText);
    await I.runAccessibilityTest();
    await I.retryUntilExists(() => I.click(buttonText), CONFIRMATION_HEADER);
    await I.runAccessibilityTest();
    await within(CONFIRMATION_HEADER, () => {
      if(expectedMessage && expectedMessage.length > 0)
        I.see(expectedMessage);
    });
  },

  async submitWithoutHeader(buttonText) {
    I.waitForText(buttonText);
    await I.runAccessibilityTest();
    await I.click(buttonText);
  },

   async submitSupportingDoc(buttonText, expectedMessage) {
    I.waitForText(buttonText);
    await I.retryUntilExists(() => I.click(buttonText), ALERT_MESSAGE);
    await within(ALERT_MESSAGE, () => {
      I.see(expectedMessage);
    });
  },

  async returnToCaseDetails() {
    await I.retryUntilExists(() => I.click('Close and Return to case details'), SUMMARY_TAB);
  },

  async submitAndGoBackToCase(buttonText, expectedMessage) {
    await I.waitForText(buttonText);
    await I.click(buttonText);
    await I.waitForText(expectedMessage);
    I.see(expectedMessage);
    await I.retryUntilExists(() => I.click('Go back to the case'), SUMMARY_TAB);
  }
};
