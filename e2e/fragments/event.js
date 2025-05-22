const {I} = inject();

const CONFIRMATION_HEADER = '#confirmation-header';
const SUMMARY_TAB = 'div[role=\'tab\'] >> \'Summary\'';

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

  async returnToCaseDetails() {
    await I.retryUntilExists(() => I.click('Close and Return to case details'), SUMMARY_TAB);
  },

  async goBackToCase() {
    await I.retryUntilExists(() => I.click('Go back to the case'), SUMMARY_TAB);
  }
};
