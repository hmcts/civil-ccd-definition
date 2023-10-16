const {I} = inject();
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const retryCount = 3;

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
    tabButton: 'div.mat-tab-label-content',
    cookieAccept: '#cookie-accept-submit',
    cookieAcceptHide: '#cookie-accept-all-success-banner-hide',
    authorizeBlock: '#authorizeCommand'
  },
  goButton: '.button[type="submit"]',

  start: async function (event) {
    await I.selectOption(this.fields.eventDropdown, event);
    /* This is a temporary fix the issue of the Go button not being pressed in the automated test.
       Further investigation is required to find (hopefully) a cleaner solution
     */
   // await I.moveCursorTo(this.goButton);
    await I.wait(15);
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

  async verifyErrorMessageOnEvent(event, caseId, errorMsg) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
    await I.navigateToCaseDetails(caseId);
    await I.selectOption(this.fields.eventDropdown, event);
   // await I.moveCursorTo(this.goButton);
    await I.wait(15);
    await I.forceClick(this.goButton);
    await I.waitForText(errorMsg);
  }, locate('#errors'));
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

  async acceptCookieBanner() {
    try {
      await I.see('Accept analytics cookies');
      await I.retry(retryCount).forceClick(this.fields.cookieAccept);
      await I.retry(retryCount).forceClick(this.fields.cookieAcceptHide);
      await I.retry(retryCount).seeElement(this.fields.authorizeBlock);
    } catch (e) {
      console.log('no cookie banner');
      await I.retry(retryCount).seeElement(this.fields.authorizeBlock);
    }
  },

  async assertEventsAvailable(events) {
    await I.waitForElement(this.fields.eventDropdown);
    events.forEach(event => I.see(event, this.fields.eventDropdown));
  },

  async goToCaseFlagsTab(caseId) {
    await I.navigateToCaseFlags(caseId);
    await I.waitForElement(this.components.caseFlags);
  },

  async assertCaseFlagsInfo(numberOfFlags) {
    I.see(`There ${numberOfFlags > 1 ? 'are' : 'is'} ${numberOfFlags} active flag${numberOfFlags > 1 ? 's' : ''} on this case.`);
  },

  async assertCaseFlags(caseFlags) {
    console.log('validating case flags');
    caseFlags.forEach(({partyName, details}) => {
      console.log(`Verifying party name [${partyName}] is displayed`);
      I.see(partyName, this.components.caseFlags);
      details.forEach(({name}) => {
        console.log(`Verifying [${name}] flag is displayed`);
        I.see(name, this.components.caseFlags);
      });
    });
  },

  async assertInactiveCaseFlagsInfo(numberOfFlags) {
    console.log('Verifying active case flags banner is not visible.');
    I.dontSee(`There ${numberOfFlags > 1 ? 'are' : 'is'} ${numberOfFlags} active flag${numberOfFlags > 1 ? 's' : ''} on this case.`);
  },

  async assertUpdatedCaseFlags(caseFlags) {
    console.log('validating updated case flags');
    caseFlags.forEach(({partyName, flagComment}) => {
      console.log('Verifying updated flag comment is displayed');
      I.see(`${flagComment} - Updated - ${partyName}`, this.components.caseFlags);
    });
  }
};
