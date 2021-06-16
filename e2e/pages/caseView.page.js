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

  start: function (event) {
    I.selectOption(this.fields.eventDropdown, event);
    I.click(this.goButton);
    I.waitForElement(EVENT_TRIGGER_LOCATOR);
  },

  async startEvent(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    this.start(event);

    if (I.dontSee(event, '.h1')) {
     await I.retryUntilExists(() => {
        I.navigateToCaseDetails(caseId);
        this.start(event);
      }, event);
    }
  },

  async assertNoEventsAvailable() {
    if (await I.hasSelector(this.fields.eventDropdown)) {
      throw new Error('Expected to have no events available');
    }
  }
};
