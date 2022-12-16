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
  goButton: 'Go',

  start: async function (event) {
    await I.waitForElement(this.fields.eventDropdown, 10);
    await I.selectOption(this.fields.eventDropdown, event);
    await I.retryUntilExists(async () => {
      await I.click(this.goButton);
    }, EVENT_TRIGGER_LOCATOR);
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
