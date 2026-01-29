const config = require('../config');
const I = actor();

const EVENT_TRIGGER_LOCATOR = 'ccd-case-event-trigger';

module.exports = {

  tabs: {
    summary: 'Summary',
    claimDetails: 'Claim details',
    history: 'History',
    Applications: 'Applications'
  },
  fields: {
    eventDropdown: '#next-step',
    tab: 'div.mat-tab-label-content',
    spinner: 'div.spinner-container',
    caseHeader: 'ccd-case-header > h1',
    generalApps: 'h1.govuk-heading-l',
    tabList: 'div.mat-tab-list',
    selectedTab: 'div[aria-selected="true"] div[class*="content"]',
    caseViewerLabel: '.Summary .case-viewer-label',
    signOutLink: 'ul[class*="navigation-list"] a',
    errorMessage: 'ul#errors li',
  },
  goButton: 'button[type="submit"]',

  async start(event) {
    await I.waitForElement(this.fields.eventDropdown);
    await I.selectOption(this.fields.eventDropdown, event);
    await I.forceClick(this.goButton);
  },

  async startEvent(event, caseId) {
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await this.start(event.name);
    }, EVENT_TRIGGER_LOCATOR, 3, 45);
  },

  async startEventWithUrl(event, caseId) {
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      // await this.start(event.name);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/${event.id}/${event.id}`);
    }, EVENT_TRIGGER_LOCATOR, 3, 45);
  },

  async assertNoEventsAvailable() {
    if (await I.hasSelector(this.fields.eventDropdown)) {
      throw new Error('Expected to have no events available');
    }
  },

  async verifySummaryPage() {
    await I.waitForText('Summary', 15, this.fields.selectedTab);
    await I.seeTextEquals('Type of claim', locate(this.fields.caseViewerLabel).first());
  },

  async clickOnTab(tabName) {
    await I.waitForSelector(this.fields.tabList, 5);
    await I.refreshPage();
    if (['preview'].includes(config.runningEnv)) {
      await I.wait(5);
    } else if (['aat', 'demo'].includes(config.runningEnv)) {
      await I.wait(8);
    } else {
      await I.wait(3);
    }
    await I.waitForSelector(this.fields.signOutLink, 30);
    await I.clickTab(tabName);
    await I.waitForText(tabName, 10, this.fields.selectedTab);
  },

  async navigateToTab(caseNumber, tabName) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
    await I.waitForSelector(this.fields.signOutLink, 30);
    await I.retryUntilExists(() => I.clickTab(tabName), `//div[@aria-selected="true" and contains(., "${tabName}")]`);
  },
};
