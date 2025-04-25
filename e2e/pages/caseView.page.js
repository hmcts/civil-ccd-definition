const {I} = inject();
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const config = require('../config');

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
    dayOfPermission: '#permissionGrantedDate-day',
    monthOfPermission: '#permissionGrantedDate-month',
    yearOfPermission: '#permissionGrantedDate-year',
    judgeName: '#permissionGrantedComplex_permissionGrantedJudge',
    caseNote: '#caseNote',
    judgeOrder: '#settleReason-JUDGE_ORDER',
  },
  goButton: '.button[type="submit"]',

  start: async function (event) {
    await I.waitForElement(this.fields.eventDropdown, 90);
    await I.selectOption(this.fields.eventDropdown, event);
    await I.forceClick(this.goButton);
  },

  async startEvent(event, caseId) {
      await waitForFinishedBusinessProcess(caseId);
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await this.start(event);
    }, EVENT_TRIGGER_LOCATOR, 5, 35);
  },
  async permissionGrantedByJudge() {
    await I.runAccessibilityTest();
    I.fillField(this.fields.judgeName, 'Testing');
    I.fillField(this.fields.dayOfPermission, 29);
    I.fillField(this.fields.monthOfPermission, 8);
    I.fillField(this.fields.yearOfPermission, 2024);
    await I.clickContinue();
  },
  async selectJudgeOrder() {
    await I.runAccessibilityTest();
    I.click(this.fields.judgeOrder);
    await I.clickContinue();
  },
  async caseNoteForClaimDiscontinuedRemoveHearing() {
    await I.runAccessibilityTest();
    I.fillField(this.fields.caseNote, 'Testing');
    await I.clickContinue();
  },
  async startEventForRR(event, caseId) {
      await waitForFinishedBusinessProcess(caseId);
      await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await this.start(event);
    }, EVENT_TRIGGER_LOCATOR, 5, 25);
  },
  async startEventForSD(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/SETTLE_CLAIM_MARK_PAID_FULL/SETTLE_CLAIM_MARK_PAID_FULLSingleClaimant`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForSDMultiple(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/SETTLE_CLAIM_MARK_PAID_FULL/SETTLE_CLAIM_MARK_PAID_FULLMultipleClaimant`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForSettleThisClaimJudgesOrder(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/SETTLE_CLAIM/SETTLE_CLAIMSettleClaim`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForDiscontinueThisClaim(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/DISCONTINUE_CLAIM_CLAIMANT/DISCONTINUE_CLAIM_CLAIMANTCourtPermission`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForDiscontinueThisClaim2v1(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/DISCONTINUE_CLAIM_CLAIMANT/DISCONTINUE_CLAIM_CLAIMANTMultipleClaimant`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForValidateDiscontinuance(event, caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/VALIDATE_DISCONTINUE_CLAIM_CLAIMANT/VALIDATE_DISCONTINUE_CLAIM_CLAIMANTValidateDiscontinuance`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForClaimDiscontinuedRemoveHearing(caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/ADD_CASE_NOTE/ADD_CASE_NOTECaseNote`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
  },
  async startEventForDR(caseId) {
    await waitForFinishedBusinessProcess(caseId);
    await I.retryUntilExists(async() => {
      await I.navigateToCaseDetails(caseId);
      await I.amOnPage(`${config.url.manageCase}/cases/case-details/${caseId}/trigger/DECISION_ON_RECONSIDERATION_REQUEST/DECISION_ON_RECONSIDERATION_REQUESTJudgeResponseToReconsideration`);
    }, EVENT_TRIGGER_LOCATOR, undefined, 25);
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

  async rejectCookieBanner() {
    if (await I.see('We use some essential cookies to make this service work.')) {
      await I.click('Reject analytics cookies');
      await I.wait(5);
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
