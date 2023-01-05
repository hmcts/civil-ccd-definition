const {I} = inject();
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');

const EVENT_TRIGGER_LOCATOR = 'ccd-case-event-trigger';

module.exports = {

  tabs: {
    history: 'History'
  },
  fields: {
    eventDropdown: '#next-step',
  },
  goButton: '.button[type="submit"]',

  start: function (event) {
    I.selectOption(this.fields.eventDropdown, event);
    /* This is a temporary fix the issue of the Go button not being pressed in the automated test.
       Further investigation is required to find (hopefully) a cleaner solution
     */
    I.moveCursorTo(this.goButton);
    I.wait(5);
    I.forceClick(this.goButton);
    I.waitForElement(EVENT_TRIGGER_LOCATOR);
  },

  async startEvent(event, caseId) {
      await waitForFinishedBusinessProcess(caseId);
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await this.start(event);
    }, locate('.govuk-heading-l'));
  },

  async assertNoEventsAvailable() {
    if (await I.hasSelector(this.fields.eventDropdown)) {
      throw new Error('Expected to have no events available');
    }
  },

  async assertEventsAvailable(events) {
    await I.waitForElement(this.fields.eventDropdown);
    events.forEach(event => I.see(event, this.fields.eventDropdown));
  }
};
