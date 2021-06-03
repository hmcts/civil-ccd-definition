// in this file you can append custom step methods to 'I' object

const output = require('codeceptjs').output;

const config = require('./config.js');
const parties = require('./helpers/party.js');
const loginPage = require('./pages/login.page');
const caseViewPage = require('./pages/caseView.page');
const createCasePage = require('./pages/createClaim/createCase.page');
const solicitorReferencesPage = require('./pages/createClaim/solicitorReferences.page');
const claimantSolicitorOrganisation = require('./pages/createClaim/claimantSolicitorOrganisation.page');
const claimantSolicitorIdamDetailsPage = require('./pages/createClaim/idamEmail.page');
const defendantSolicitorOrganisation = require('./pages/createClaim/defendantSolicitorOrganisation.page');
const defendantSolicitorEmail = require('./pages/createClaim/defendantSolicitorEmail.page');
const chooseCourtPage = require('./pages/createClaim/chooseCourt.page');
const claimantLitigationDetails = require('./pages/createClaim/claimantLitigationDetails.page');
const claimTypePage = require('./pages/createClaim/claimType.page');
const respondentRepresentedPage = require('./pages/createClaim/isRespondentRepresented.page');
const personalInjuryTypePage = require('./pages/createClaim/personalInjuryType.page');
const detailsOfClaimPage = require('./pages/createClaim/detailsOfClaim.page');
const uploadParticularsOfClaimQuestion = require('./pages/createClaim/uploadParticularsOfClaimQuestion.page');
const uploadParticularsOfClaim = require('./pages/createClaim/uploadParticularsOfClaim.page');
const claimValuePage = require('./pages/createClaim/claimValue.page');
const pbaNumberPage = require('./pages/createClaim/pbaNumber.page');
const paymentReferencePage = require('./pages/createClaim/paymentReference.page');

const responseIntentionPage = require('./pages/acknowledgeClaim/responseIntention.page');

const caseProceedsInCasemanPage = require('./pages/caseProceedsInCaseman/caseProceedsInCaseman.page');
const takeCaseOffline = require('./pages/caseProceedsInCaseman/takeCaseOffline.page');

const extensionDatePage = require('./pages/informAgreedExtensionDate/date.page');

const responseTypePage = require('./pages/respondToClaim/responseType.page');
const uploadResponsePage = require('./pages/respondToClaim/uploadResponseDocument.page');

const proceedPage = require('./pages/respondToDefence/proceed.page');
const uploadResponseDocumentPage = require('./pages/respondToDefence/uploadResponseDocument.page');

const defendantLitigationFriendPage = require('./pages/addDefendantLitigationFriend/defendantLitigationDetails.page');

const statementOfTruth = require('./fragments/statementOfTruth');
const party = require('./fragments/party');
const event = require('./fragments/event');
const respondentDetails = require('./fragments/respondentDetails.page');
const confirmDetailsPage = require('./fragments/confirmDetails.page');

// DQ fragments
const fileDirectionsQuestionnairePage = require('./fragments/dq/fileDirectionsQuestionnaire.page');
const disclosureOfElectronicDocumentsPage = require('./fragments/dq/disclosureOfElectrionicDocuments.page');
const disclosureOfNonElectronicDocumentsPage = require('./fragments/dq/disclosureOfNonElectrionicDocuments.page');
const expertsPage = require('./fragments/dq/experts.page');
const witnessPage = require('./fragments/dq/witnesses.page');
const hearingPage = require('./fragments/dq/hearing.page');
const draftDirectionsPage = require('./fragments/dq/draftDirections.page');
const requestedCourtPage = require('./fragments/dq/requestedCourt.page');
const hearingSupportRequirementsPage = require('./fragments/dq/hearingSupportRequirements.page');
const furtherInformationPage = require('./fragments/dq/furtherInformation.page');
const welshLanguageRequirementsPage = require('./fragments/dq/language.page');

const address = require('./fixtures/address.js');

const SIGNED_IN_SELECTOR = 'exui-header';
const SIGNED_OUT_SELECTOR = '#global-header';
const CASE_HEADER = 'ccd-case-header > h1';

const TEST_FILE_PATH = './e2e/fixtures/examplePDF.pdf';

let caseId;
let screenshotNumber;
let screenshotNumberStart;
let eventName;

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    async login(user) {
      await this.retryUntilExists(async () => {
        this.amOnPage(config.url.manageCase);

        if (!config.idamStub.enabled || config.idamStub.enabled === 'false') {
          output.log(`Signing in user: ${user.type}`);
          await loginPage.signIn(user);
        }
      }, SIGNED_IN_SELECTOR);
    },

    grabCaseNumber: async function () {
      this.waitForElement(CASE_HEADER);

      return await this.grabTextFrom(CASE_HEADER);
    },

    async signOut() {
      await this.retryUntilExists(() => {
        this.click('Sign out');
      }, SIGNED_OUT_SELECTOR);
    },

    async takeScreenshot() {
      let title = eventName.split(' ').join('_');
      screenshotNumber = screenshotNumber + 1;
      let saveFullPage = true;
      await this.saveScreenshot(title + '_' + screenshotNumberStart + '.' + screenshotNumber + '.png', saveFullPage);
    },

    triggerSteps: async function (stepArray) {
      for (let i = 0; i < stepArray.length; i++) {
        try {
          await this.takeScreenshot();
        } catch {
          output.log(`error taking screen shot for step ${screenshotNumberStart}_${screenshotNumber}`);
        }
        await stepArray[i]();
      }
    },

    async createCase(litigantInPerson = false) {
      eventName = 'Create case';
      screenshotNumberStart = 1;
      screenshotNumber = 0;
      this.click(eventName);
      this.waitForElement(`#cc-jurisdiction > option[value="${config.definition.jurisdiction}"]`);
      await this.retryUntilExists(() => createCasePage.selectCaseType(), 'ccd-markdown');
      await this.runAccessibilityTest();
      await this.takeScreenshot();
      await this.clickContinue();

      let stepArr = [
        async function () {
          await solicitorReferencesPage.enterReferences();
        },
        async function () {
          await chooseCourtPage.enterCourt();
        },
        async function () {
          await party.enterParty('applicant1', address);
        },
        async function () {
          await claimantLitigationDetails.enterLitigantFriendWithDifferentAddressToApplicant(address, TEST_FILE_PATH);
        },
        async function () {
          await claimantSolicitorIdamDetailsPage.enterUserEmail();
        },
        async function () {
          await claimantSolicitorOrganisation.enterOrganisationDetails();
        },
        async function () {
          await party.enterParty('respondent1', address);
        },
      ];

      await this.triggerSteps(stepArr);

      if (litigantInPerson) {
        await this.takeScreenshot();
        await respondentRepresentedPage.enterRespondentRepresented('no');
      } else {
        await this.takeScreenshot();
        await respondentRepresentedPage.enterRespondentRepresented('yes');
        await this.takeScreenshot();
        await defendantSolicitorOrganisation.enterOrganisationDetails();
        await this.takeScreenshot();
        await defendantSolicitorEmail.enterSolicitorEmail();
      }

      let nextStepArr = [
        async function () {
          await claimTypePage.selectClaimType();
        },
        async function () {
          await personalInjuryTypePage.selectPersonalInjuryType();
        },
        async function () {
          await detailsOfClaimPage.enterDetailsOfClaim();
        },
        async function () {
          await uploadParticularsOfClaimQuestion.chooseYesUploadParticularsOfClaim();
        },
        async function () {
          await uploadParticularsOfClaim.upload(TEST_FILE_PATH);
        },
        async function () {
          await claimValuePage.enterClaimValue();
        },
        async function () {
          await pbaNumberPage.selectPbaNumber();
        },
        async function () {
          await paymentReferencePage.updatePaymentReference();
        },
        async function () {
          await statementOfTruth.enterNameAndRole('claim');
        },
        async function () {
          let expectedMessage = litigantInPerson ?
            'Your claim has been received and will progress offline' : 'Your claim has been received\nClaim number: ';
          await event.submit('Submit', expectedMessage);
        },
      ];

      await this.triggerSteps(nextStepArr);

      await event.returnToCaseDetails();
      caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
    },

    async notifyClaim() {
      eventName = 'Notify claim';
      screenshotNumberStart = 2;
      screenshotNumber = 0;
      await caseViewPage.startEvent(eventName, caseId);
      await this.runAccessibilityTest();
      await this.takeScreenshot();
      await this.clickContinue();
      await this.takeScreenshot();
      await event.submit('Submit', 'Notification of claim sent');
      await this.takeScreenshot();
      await event.returnToCaseDetails();
    },

    async notifyClaimDetails() {
      eventName = 'Notify claim details';
      screenshotNumberStart = 3;
      screenshotNumber = 0;
      await caseViewPage.startEvent(eventName, caseId);
      await this.runAccessibilityTest();
      await this.takeScreenshot();
      await this.clickContinue();
      await this.takeScreenshot();
      await event.submit('Submit', 'Defendant notified');
      await this.takeScreenshot();
      await event.returnToCaseDetails();
    },

    async acknowledgeClaim(responseIntention) {
      eventName = 'Acknowledge claim';
      screenshotNumberStart = 4;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await respondentDetails.verifyDetails();
        },
        async function () {
          await confirmDetailsPage.confirmReference();
        },
        async function () {
          await responseIntentionPage.selectResponseIntention(responseIntention);
        },
        async function () {
          // temporarily commenting out whilst change is made to service repo
          await event.submit('Acknowledge claim', '');
        },
      ];

      await this.triggerSteps(stepArr);
      await event.returnToCaseDetails();
    },

    async informAgreedExtensionDate() {
      eventName = 'Inform agreed extension date';
      screenshotNumberStart = 5;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await extensionDatePage.enterExtensionDate();
        },
        async function () {
          await event.submit('Submit', 'Extension deadline submitted');
        },
      ];

      await this.triggerSteps(stepArr);
      await event.returnToCaseDetails();
    },

    async addDefendantLitigationFriend() {
      eventName = 'Add litigation friend';
      screenshotNumberStart = 6;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await defendantLitigationFriendPage.enterLitigantFriendWithDifferentAddressToDefendant(address, TEST_FILE_PATH);
        },
        async function () {
          await event.submit('Submit', 'You have added litigation friend details');
        },
      ];

      await this.triggerSteps(stepArr);
      await event.returnToCaseDetails();
    },

    async respondToClaim(responseType) {
      eventName = 'Respond to claim';
      screenshotNumberStart = 7;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await responseTypePage.selectResponseType(responseType);
        },
      ];

      await this.triggerSteps(stepArr);

      if (responseType === 'fullDefence') {
        await this.respondToClaimFullDefence();
      }

      await event.submit('Submit', 'You\'ve submitted your response');
      await this.takeScreenshot();
      await event.returnToCaseDetails();
    },

    async respondToClaimFullDefence() {
      let stepArr = [
        async function () {
          await uploadResponsePage.uploadResponseDocuments(TEST_FILE_PATH);
        },
        async function () {
          await respondentDetails.verifyDetails();
        },
        async function () {
          await confirmDetailsPage.confirmReference();
        },
        async function () {
          await fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await expertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await witnessPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await hearingPage.enterHearingInformation(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await draftDirectionsPage.upload(parties.RESPONDENT_SOLICITOR_1, TEST_FILE_PATH);
        },
        async function () {
          await requestedCourtPage.selectSpecificCourtForHearing(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await hearingSupportRequirementsPage.selectRequirements(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await furtherInformationPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1);
        },
        async function () {
          await statementOfTruth.enterNameAndRole(parties.RESPONDENT_SOLICITOR_1 + 'DQ');
        }
      ];

      await this.triggerSteps(stepArr);
    },

    async respondToDefence() {
      eventName = 'View and respond to defence';
      screenshotNumberStart = 8;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await proceedPage.proceedWithClaim();
        },
        async function () {
          await uploadResponseDocumentPage.uploadResponseDocuments(TEST_FILE_PATH);
        },
        async function () {
          await fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await expertsPage.enterExpertInformation(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await witnessPage.enterWitnessInformation(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await hearingPage.enterHearingInformation(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await draftDirectionsPage.upload(parties.APPLICANT_SOLICITOR_1, TEST_FILE_PATH);
        },
        async function () {
          await hearingSupportRequirementsPage.selectRequirements(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await furtherInformationPage.enterFurtherInformation(parties.APPLICANT_SOLICITOR_1);
        },
        async function () {
          await statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ');
        },
        async function () {
          await event.submit('Submit your response', 'You\'ve chosen to proceed with the claim\nClaim number: ');
        }
      ];

      await this.triggerSteps(stepArr);
      await this.click('Close and Return to case details');
    },

    async respondToDefenceDropClaim() {
      await caseViewPage.startEvent('View and respond to defence', caseId);
      await proceedPage.dropClaim();
      await event.submit('Submit your response', 'You\'ve chosen not to proceed with the claim');
      await this.click('Close and Return to case details');
    },

    async caseProceedsInCaseman() {
      eventName = 'Case proceeds in Caseman';
      screenshotNumberStart = 9;
      screenshotNumber = 0;

      let stepArr = [
        async function () {
          await caseViewPage.startEvent(eventName, caseId);
        },
        async function () {
          await caseProceedsInCasemanPage.enterTransferDate();
        }
      ];

      await this.triggerSteps(stepArr);
      await takeCaseOffline.takeCaseOffline();
    },

    async assertNoEventsAvailable() {
      await caseViewPage.assertNoEventsAvailable();
    },

    async clickContinue() {
      await this.retryUntilInvisible(() => this.click('Continue'), locate('.error-summary'));
    },

    /**
     * Retries defined action util element described by the locator is invisible. If element is not invisible
     * after 4 tries (run + 3 retries) this step throws an error. Use cases include checking no error present on page.
     *
     * Warning: action logic should avoid framework steps that stop test execution upon step failure as it will
     *          stop test execution even if there are retries still available. Catching step error does not help.
     *
     * @param action - an action that will be retried until either condition is met or max number of retries is reached
     * @param locator - locator for an element that is expected to be invisible upon successful execution of an action
     * @param maxNumberOfRetries - maximum number to retry the function for before failing
     * @returns {Promise<void>} - promise holding no result if resolved or error if rejected
     */
    async retryUntilInvisible(action, locator, maxNumberOfRetries = 3) {
      for (let tryNumber = 1; tryNumber <= maxNumberOfRetries; tryNumber++) {
        output.log(`retryUntilInvisible(${locator}): starting try #${tryNumber}`);
        await action();

        if (await this.hasSelector(locator) > 0) {
          output.print(`retryUntilInvisible(${locator}): error present after try #${tryNumber} was executed`);
        } else {
          output.log(`retryUntilInvisible(${locator}): error not present after try #${tryNumber} was executed`);
          break;
        }
        if (tryNumber === maxNumberOfRetries) {
          throw new Error(`Maximum number of tries (${maxNumberOfRetries}) has been reached in search for ${locator}`);
        }
      }
    },

    async addAnotherElementToCollection() {
      const numberOfElements = await this.grabNumberOfVisibleElements('.collection-title');
      this.click('Add new');
      this.waitNumberOfVisibleElements('.collection-title', numberOfElements + 1);
    },

    /**
     * Retries defined action util element described by the locator is present. If element is not present
     * after 4 tries (run + 3 retries) this step throws an error.
     *
     * Warning: action logic should avoid framework steps that stop test execution upon step failure as it will
     *          stop test execution even if there are retries still available. Catching step error does not help.
     *
     * @param action - an action that will be retried until either condition is met or max number of retries is reached
     * @param locator - locator for an element that is expected to be present upon successful execution of an action
     * @param maxNumberOfTries - maximum number to retry the function for before failing
     * @returns {Promise<void>} - promise holding no result if resolved or error if rejected
     */
    async retryUntilExists(action, locator, maxNumberOfTries = 6) {
      for (let tryNumber = 1; tryNumber <= maxNumberOfTries; tryNumber++) {
        output.log(`retryUntilExists(${locator}): starting try #${tryNumber}`);
        if (tryNumber > 1 && await this.hasSelector(locator)) {
          output.log(`retryUntilExists(${locator}): element found before try #${tryNumber} was executed`);
          break;
        }
        await action();
        if (await this.waitForSelector(locator) != null) {
          output.log(`retryUntilExists(${locator}): element found after try #${tryNumber} was executed`);
          break;
        } else {
          output.print(`retryUntilExists(${locator}): element not found after try #${tryNumber} was executed`);
        }
        if (tryNumber === maxNumberOfTries) {
          throw new Error(`Maximum number of tries (${maxNumberOfTries}) has been reached in search for ${locator}`);
        }
      }
    },

    async navigateToCaseDetails(caseNumber) {
      await this.retryUntilExists(async () => {
        const normalizedCaseId = caseNumber.toString().replace(/\D/g, '');
        output.log(`Navigating to case: ${normalizedCaseId}`);
        await this.amOnPage(`${config.url.manageCase}/cases/case-details/${normalizedCaseId}`);
      }, SIGNED_IN_SELECTOR);

      await this.waitForSelector('.ccd-dropdown');
    },

    async navigateToCaseDetailsAs(user, caseNumber) {
      await this.signOut();
      await this.login(user);
      await this.navigateToCaseDetails(caseNumber);
    },
  });
};
