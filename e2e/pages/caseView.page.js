const {I} = inject();
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');

const EVENT_TRIGGER_LOCATOR = 'ccd-case-event-trigger';

module.exports = {

  components: {
    caseFlags: 'ccd-field-read'
  },
  tabs: {
    history: 'History',
    caseFlags: 'Case Flags'
  },
  fields: {
    eventDropdown: '#next-step',
    tabButton: 'div.mat-tab-label-content'
  },
  goButton: '.button[type="submit"]',

  start: async function (event) {
    await I.selectOption(this.fields.eventDropdown, event);
    /* This is a temporary fix the issue of the Go button not being pressed in the automated test.
       Further investigation is required to find (hopefully) a cleaner solution
     */
    await I.moveCursorTo(this.goButton);
    await I.wait(5);
    await I.forceClick(this.goButton);
    await I.waitForElement(EVENT_TRIGGER_LOCATOR);
  },

  async startEvent(event, caseId) {
      await waitForFinishedBusinessProcess(caseId);
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await this.start(event);
    }, locate('.govuk-heading-l'));
  },

  async navigateToTab(tabName) {
    let urlBefore = await I.grabCurrentUrl();
    await I.retryUntilUrlChanges(async () => {
      await I.forceClick(locate(this.fields.tabButton).withText(tabName));
    }, urlBefore);
  },

  async assertNoEventsAvailable() {
    if (await I.hasSelector(this.fields.eventDropdown)) {
      throw new Error('Expected to have no events available');
    }
  },

  async assertEventsAvailable(events) {
    await I.waitForElement(this.fields.eventDropdown);
    events.forEach(event => I.see(event, this.fields.eventDropdown));
  },

  async selectCaseFlagsTab(caseId) {
    await I.navigateToCaseDetails(caseId);
    const xpath = '//div[contains(text(), \'Case Flags\')]';
    await I.waitForClickable(xpath);
    await I.click(xpath);
    await I.waitForElement(this.components.caseFlags);
  },

  async assertCaseFlagsInfo(numberOfFlags) {
    I.see(`There is ${numberOfFlags} active flag on this case.`)
  },

  async assertCaseFlags(caseFlags) {
    console.log('validating case flags')
    caseFlags.forEach(({partyName, details}) => {
      console.log('verifying party name')
      I.see(partyName, this.components.caseFlags);
      details.forEach(({name, comments, creationDate, lastModified, status}) => {
        console.log('verifying flag name');
        I.see(name, this.components.caseFlags);
        // I.see(comments, this.components.caseFlags);
        // I.see(creationDate, this.components.caseFlags);
        // I.see(lastModified, this.components.caseFlags);
        // I.see(status, this.components.caseFlags);
      });
    });
  }
};
