// in this file you can append custom step methods to 'I' object

const output = require('codeceptjs').output;

const config = require('./config.js');
const parties = require('./helpers/party.js');
const loginPage = require('./pages/login.page');
const caseViewPage = require('./pages/caseView.page');
const stayAndLiftCasePage = require('./pages/stayAndLiftCase/stayAndLiftCase.page');
const solicitorReferencesPage = require('./pages/createClaim/solicitorReferences.page');
const claimantSolicitorOrganisationLRspec = require('./pages/createClaim/claimantSolicitorOrganisationLRspec.page');
const addAnotherClaimant = require('./pages/createClaim/addAnotherClaimant.page');
const claimantSolicitorIdamDetailsPage = require('./pages/createClaim/idamEmail.page');
const defendantSolicitorOrganisationLRspec = require('./pages/createClaim/defendantSolicitorOrganisationLRspec.page');
const addAnotherDefendant = require('./pages/createClaim/addAnotherDefendant.page');
const respondent2SameLegalRepresentative = require('./pages/createClaim/respondent2SameLegalRepresentative.page');
const extensionDatePage = require('./pages/informAgreedExtensionDate/date.page');
const detailsOfClaimPage = require('./pages/createClaim/detailsOfClaim.page');
const pbaNumberPage = require('./pages/createClaim/pbaNumber.page');
const paymentReferencePage = require('./pages/createClaim/paymentReference.page');
const statementOfTruth = require('./fragments/statementOfTruth');
const party = require('./fragments/party');
const event = require('./fragments/event');
const proceedPage = require('./pages/respondToDefence/proceed.page');
const mediationFailurePage = require('./pages/caseworkerMediation/mediationUnsuccessful');

// DQ fragments
const fileDirectionsQuestionnairePage = require('./fragments/dq/fileDirectionsQuestionnaire.page');
const fixedRecoverableCosts = require('./fragments/dq/fixedRecoverableCosts.page');
const disclosureOfElectronicDocumentsPage = require('./fragments/dq/disclosureOfElectrionicDocuments.page');
const expertsPage = require('./fragments/dq/experts.page');
const singleResponse = require('./pages/respondToClaimLRspec/singleResponseLRSpec.page.js');
const hearingSupportRequirementsPage = require('./fragments/dq/hearingSupportRequirements.page');
const welshLanguageRequirementsPage = require('./fragments/dq/language.page');
const address = require('./fixtures/address.js');
const specCreateCasePage = require('./pages/createClaim/createCaseLRspec.page');
const specParty = require('./fragments/partyLRspec');
const specClaimantLRPostalAddress = require('./fixtures/claimantLRPostalAddressLRspec');
const specRespondentRepresentedPage = require('./pages/createClaim/isRespondentRepresentedLRspec.page');
const specDefendantSolicitorEmailPage = require('./pages/createClaim/defendantSolicitorEmailLRspec.page');
const specDefendantLRPostalAddress = require('./fixtures/defendantLRPostalAddressLRspec');
const specTimelinePage = require('./pages/createClaim/claimTimelineLRspec.page');
const specAddTimelinePage = require('./pages/createClaim/addTimelineLRspec.page');
const specListEvidencePage = require('./pages/createClaim/claimListEvidenceLRspec.page');
const specClaimAmountPage = require('./pages/createClaim/claimAmountLRspec.page');
const specInterestPage = require('./pages/createClaim/interestLRspec.page');
const specInterestValuePage = require('./pages/createClaim/interestValueLRspec.page');
const fixedCostsPage = require('./pages/createClaim/fixedCostsLRspec.page');
const specInterestRatePage = require('./pages/createClaim/interestRateLRspec.page');
const specInterestDateStartPage = require('./pages/createClaim/interestDateStartLRspec.page');
const specInterestDateEndPage = require('./pages/createClaim/interestDateEndLRspec.page');
const specConfirmDefendantsDetails = require('./fragments/confirmDefendantsDetailsLRspec');
const specConfirmLegalRepDetails = require('./fragments/confirmLegalRepDetailsLRspec');
const responseTypeSpecPage = require('./pages/respondToClaimLRspec/responseTypeLRspec.page');
const defenceTypePage = require('./pages/respondToClaimLRspec/defenceTypeLRspec.page');
const fullAdmitTypeLRspecPage = require('./pages/respondToClaimLRspec/fullAdmitTypeLRspec.page');
const partAdmittedAmountPage = require('./pages/respondToClaimLRspec/partAdmitTypeLRspec.page');
const freeMediationPage = require('./pages/respondToClaimLRspec/freeMediationLRspec.page');
const chooseCourtSpecPage = require('./pages/respondToClaimLRspec/chooseCourtLRspec.page');
const smallClaimsHearingPage = require('./pages/respondToClaimLRspec/hearingSmallClaimsLRspec.page');
const useExpertPage = require('./pages/respondToClaimLRspec/useExpertLRspec.page');
const useMPExpertsPage = require('./pages/respondToClaimLRspec/expertsMPLRspec.page');
const respondentCheckListPage = require('./pages/respondToClaimLRspec/respondentCheckListLRspec.page');
const enterWitnessesPage = require('./pages/respondToClaimLRspec/enterWitnessesLRspec.page');
const disputeClaimDetailsPage = require('./pages/respondToClaimLRspec/disputeClaimDetailsLRspec.page');
const claimResponseTimelineLRspecPage = require('./pages/respondToClaimLRspec/claimResponseTimelineLRspec.page');
const hearingLRspecPage = require('./pages/respondToClaimLRspec/hearingLRspec.page');
const hearingClaimantLRspecPage = require('./pages/respondToClaimLRspec/hearingClaimantLRspec.page');
const furtherInformationLRspecPage = require('./pages/respondToClaimLRspec/furtherInformationLRspec.page');
const disclosureReportPage = require('./fragments/dq/disclosureReport.page');
const admitPartPaymentRoutePage = require('./pages/respondToClaimLRspec/admitPartPaymentRoute.page');
const respondentHomeDetailsLRspecPage = require('./pages/respondToClaimLRspec/respondentHomeDetailsLRspec.page');
const respondentEmploymentTypePage = require('./pages/respondToClaimLRspec/respondentEmploymentType.page');
const respondentCourtOrderTypePage = require('./pages/respondToClaimLRspec/respondentCourtOrderType.page');
const respondentDebtsDetailsPage = require('./pages/respondToClaimLRspec/respondentDebtsDetails.page');
const respondentIncomeExpensesDetailsPage = require('./pages/respondToClaimLRspec/respondentIncomeExpensesDetails.page');
const respondentRepaymentPlanPage = require('./pages/respondToClaimLRspec/respondentRepaymentPlan.page');
const respondentPage = require('./pages/respondToClaimLRspec/respondentWhyNotPay.page');
const respondent2SameLegalRepresentativeLRspec = require('./pages/createClaim/respondent2SameLegalRepresentativeLRspec.page');
const vulnerabilityPage = require('./pages/respondToClaimLRspec/vulnerabilityLRspec.page');
const supportAccessLRspecPage = require('./pages/respondToClaimLRspec/supportAccessLRspec.page');
const vulnerabilityQuestionsPage = require('./fragments/dq/vulnerabilityQuestions.page');
const enterBreathingSpacePage = require('./pages/respondToClaimLRspec/enterBreathingSpace.page');
const liftBreathingSpacePage = require('./pages/respondToClaimLRspec/liftBreathingSpace.page');
const witnessesLRspecPage = require('./pages/respondToClaimLRspec/witnessesLRspec.page.js');
const confirm2ndDefLRspecPage = require('./pages/respondToClaimLRspec/enter2ndDefendantDetailsLRspec.page');
const caseProceedsInCasemanPage = require('./pages/caseProceedsInCaseman/caseProceedsInCaseman.page');
const sumOfDamagesToBeDecidedPage = require('./pages/selectSDO/sumOfDamagesToBeDecided.page');
const allocateSmallClaimsTrackPage = require('./pages/selectSDO/allocateSmallClaimsTrack.page');
const allocateClaimPage = require('./pages/selectSDO/allocateClaimType.page');
const sdoOrderTypePage = require('./pages/selectSDO/sdoOrderType.page');
const smallClaimsSDOOrderDetailsPage = require('./pages/selectSDO/unspecClaimsSDOOrderDetails.page');
const hearingNoticeListPage = require('./pages/caseProgression/hearingNoticeList.page');
const hearingNoticeListTypePage = require('./pages/caseProgression/hearingNoticeListingType.page');
const hearingScheduledChooseDetailsPage = require('./pages/caseProgression/hearingScheduledChooseDetails.page');
const hearingScheduledMoreInfoPage = require('./pages/caseProgression/hearingScheduledMoreInfo.page');
const serviceRequest = require('./pages/createClaim/serviceRequest.page');
const {takeCaseOffline} = require('./pages/caseProceedsInCaseman/takeCaseOffline.page');
const createCaseFlagPage = require('./pages/caseFlags/createCaseFlags.page');
const {checkToggleEnabled} = require('./api/testingSupport');
const {PBAv3} = require('./fixtures/featureKeys');
const specifiedEvidenceUpload = require('./pages/evidenceUpload/uploadDocumentSpec');
const mediationDocumentsExplanation = require('./pages/mediationDocumentsUpload/mediationDocumentsExplanation');
const whoIsFor = require('./pages/mediationDocumentsUpload/whoIsFor');
const documentType = require('./pages/mediationDocumentsUpload/documentType');
const documentUpload = require('./pages/mediationDocumentsUpload/documentUpload');
const addClaimForAFlightDelay = require('./pages/createClaim/addClaimForAFlightDelay.page');
const addClaimFlightDelayConfirmationPage = require('./pages/createClaim/addConfirmationSubmitPageValidation.page');
const requestForRR = require('./pages/requestForReconsideration/reasonForReconsideration.page');
const requestForDecision = require('./pages/decisionOnReconsideration/decisionOnReconsideration.page');

const SIGNED_IN_SELECTOR = 'exui-header';
const SIGNED_OUT_SELECTOR = '#global-header';
const CASE_HEADER = 'ccd-markdown >> h1';

const CONFIRMATION_MESSAGE = {
  online: 'Your claim has been received\nClaim number: ',
  offline: 'Your claim has been received and will progress offline',
  pbaV3Online: 'Please now pay your claim fee\nusing the link below'
};

const TEST_FILE_PATH = './e2e/fixtures/examplePDF.pdf';

let caseId, screenshotNumber, eventName, currentEventName, loggedInUser;
let eventNumber = 0;
const getScreenshotName = () => eventNumber + '.' + screenshotNumber + '.' + eventName.split(' ').join('_') + '.jpg';
const conditionalSteps = (condition, steps) => condition ? steps : [];

const firstClaimantSteps = (optionType) => [
  () => party.enterParty(parties.APPLICANT_SOLICITOR_1, address, optionType),
];

const secondClaimantSteps = (claimant2, optionType) => [
  () => addAnotherClaimant.enterAddAnotherClaimant(claimant2),

  ...conditionalSteps(claimant2, [
    () => party.enterParty(parties.APPLICANT_SOLICITOR_2, address, optionType),
    ]),

  () => claimantSolicitorIdamDetailsPage.enterUserEmail(),
  () => claimantSolicitorOrganisationLRspec.enterOrganisationDetails(),
  () => specParty.enterSpecParty('Applicant', specClaimantLRPostalAddress),
];


const firstDefendantSteps = (respondent1) => [
  () => party.enterParty('respondent1', address, respondent1.partyType),
  () => specRespondentRepresentedPage.enterRespondentRepresented('yes'),
  () => defendantSolicitorOrganisationLRspec.enterOrganisationDetails('respondent1'),
  () => specDefendantSolicitorEmailPage.enterSolicitorEmail('1'),
  () => specParty.enterSpecParty('Respondent', specDefendantLRPostalAddress),

];

const secondDefendantSteps = (respondent2, respondent1Represented) => [
  ...conditionalSteps(respondent2, [
    () => party.enterParty('respondent2', address, respondent2.partyType),
    () => respondent2SameLegalRepresentativeLRspec.enterRespondent2SameLegalRepresentative(respondent2.represented),
    ...conditionalSteps(respondent2 && respondent2.represented, [
      ...conditionalSteps(respondent1Represented, [
        () => respondent2SameLegalRepresentative.enterRespondent2SameLegalRepresentative(respondent2.sameLegalRepresentativeAsRespondent1),
      ]),
      ...conditionalSteps(respondent2 && !respondent2.sameLegalRepresentativeAsRespondent1, [
        () => defendantSolicitorOrganisationLRspec.enterOrganisationDetails('respondent2'),
        () => specDefendantSolicitorEmailPage.enterSolicitorEmail('2'),
        () => specParty.enterSpecParty('Respondent2'),
      ])
    ])
  ])
];

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.

    // It is recommended to place a general 'login' function here.
    async login(user) {
        if (loggedInUser !== user) {
          if (await this.hasSelector(SIGNED_IN_SELECTOR)) {
            await this.signOut();
          }
        }
        await this.retryUntilExists(async () => {
          this.amOnPage(config.url.manageCase, 90);

          if (!config.idamStub.enabled || config.idamStub.enabled === 'false') {
            console.log(`Signing in user: ${user.type}`);
            await loginPage.signIn(user);
          }
          await this.waitForSelector(SIGNED_IN_SELECTOR);
        }, SIGNED_IN_SELECTOR);
        loggedInUser = user;
        console.log('Logged in user..', loggedInUser);
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

    async getCaseId(){
      console.log(`case created: ${caseId}`);
      return caseId;
    },

    async setCaseId(argCaseNumber) {
      caseId = argCaseNumber;
    },

    async takeScreenshot() {
      if (currentEventName !== eventName) {
        currentEventName = eventName;
        eventNumber++;
        screenshotNumber = 0;
      }
      screenshotNumber++;
      await this.saveScreenshot(getScreenshotName(), true);
    },

    triggerStepsWithScreenshot: async function (steps) {
      for (let i = 0; i < steps.length; i++) {
        //commenting this out, this will give us few minutes back
        /*try {
          await this.takeScreenshot();
        } catch {
          output.log(`Error taking screenshot: ${getScreenshotName()}`);
        }*/
        await steps[i]();
      }
    },

    async assertNoEventsAvailable() {
      await caseViewPage.assertNoEventsAvailable();
    },

    async clickContinue() {
      let urlBefore = await this.grabCurrentUrl();
      await this.retryUntilUrlChanges(() => {
        this.click('Continue');
        this.wait(5);
      }, urlBefore);
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

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Retries defined action util url is changed by given action. If url does not change
     * after 4 tries (run + 3 retries) this step throws an error. If url is already changed, will exit.
     *
     * Warning: action logic should avoid framework steps that stop test execution upon step failure as it will
     *          stop test execution even if there are retries still available. Catching step error does not help.
     *
     * @param action - an action that will be retried until either condition is met or max number of retries is reached
     * @param urlBefore - the url before the action has occurred
     * @param maxNumberOfTries - maximum number to retry the function for before failing
     * @returns {Promise<void>} - promise holding no result if resolved or error if rejected
     */
    async retryUntilUrlChanges(action, urlBefore, maxNumberOfTries = 6) {
      let urlAfter;
      for (let tryNumber = 1; tryNumber <= maxNumberOfTries; tryNumber++) {
        output.log(`Checking if URL has changed, starting try #${tryNumber}`);
        await action();
        await this.sleep(3000 * tryNumber);
        urlAfter = await this.grabCurrentUrl();
        if (urlBefore !== urlAfter) {
          output.log(`retryUntilUrlChanges(before: ${urlBefore}, after: ${urlAfter}): url changed after try #${tryNumber} was executed`);
          break;
        } else {
          output.print(`retryUntilUrlChanges(before: ${urlBefore}, after: ${urlAfter}): url did not change after try #${tryNumber} was executed`);
        }
        if (tryNumber === maxNumberOfTries) {
          throw new Error(`Maximum number of tries (${maxNumberOfTries}) has been reached trying to change urls. Before: ${urlBefore}. After: ${urlAfter}`);
        }
      }
    },

    async createCaseSpecified(mpScenario, claimant1, claimant2, respondent1, respondent2, claimAmount) {
      output.log('Create claim - Specified');
      eventName = 'Create claim - Specified';

         //const twoVOneScenario = claimant1 && claimant2;
         const pbaV3 = await checkToggleEnabled(PBAv3);
         output.log('--------------createCaseSpecified calling------------');
         await specCreateCasePage.createCaseSpecified(config.definition.jurisdiction);
         output.log('--------------createCaseSpecified finished------------');
          let steps = pbaV3 ? [
            () => this.clickContinue(),
            () => this.clickContinue(),
            () => solicitorReferencesPage.enterReferences(),
            ...firstClaimantSteps(claimant1),
            ...secondClaimantSteps(claimant2),
            ...firstDefendantSteps(respondent1),
            ...conditionalSteps(claimant2 == null, [
             () =>  addAnotherDefendant.enterAddAnotherDefendant(respondent2),
              ]),
             ...secondDefendantSteps(respondent2, respondent1.represented),
            ...conditionalSteps( [
              () => addClaimForAFlightDelay.enteredFlightDelayClaim()]),
                 () => detailsOfClaimPage.enterDetailsOfClaim(mpScenario),
                 () => specTimelinePage.addManually(),
                 () => specAddTimelinePage.addTimeline(),
                 () => specListEvidencePage.addEvidence(),
                 () => specClaimAmountPage.addClaimItem(claimAmount),
                 () => this.clickContinue(),
                 () => specInterestPage.addInterest(),
                 () => specInterestValuePage.selectInterest(),
                 () => specInterestRatePage.selectInterestRate(),
                 () => specInterestDateStartPage.selectInterestDateStart(),
                 () => specInterestDateEndPage.selectInterestDateEnd(),
                 () => this.clickContinue(),
                 () => pbaNumberPage.clickContinue(),
                 () => fixedCostsPage.addFixedCosts(),
                 () => statementOfTruth.enterNameAndRole('claim'),
                 () => event.submit('Submit',CONFIRMATION_MESSAGE.pbaV3Online),
                 () => event.returnToCaseDetails(),
           ] : [
            () => this.clickContinue(),
            () => this.clickContinue(),
            () => solicitorReferencesPage.enterReferences(),
            ...firstClaimantSteps(claimant1),
            ...secondClaimantSteps(claimant2),
            ...firstDefendantSteps(respondent1),
            ...conditionalSteps(claimant2 == null, [
              () =>  addAnotherDefendant.enterAddAnotherDefendant(respondent2),
            ]),
            ...secondDefendantSteps(respondent2, respondent1.represented),
            ...conditionalSteps([
              () => addClaimForAFlightDelay.enteredFlightDelayClaim()]),
            () => detailsOfClaimPage.enterDetailsOfClaim(mpScenario),
            () => specTimelinePage.addManually(),
            () => specAddTimelinePage.addTimeline(),
            () => specListEvidencePage.addEvidence(),
            () => specClaimAmountPage.addClaimItem(claimAmount),
            () => this.clickContinue(),
            () => specInterestPage.addInterest(),
            () => specInterestValuePage.selectInterest(),
            () => specInterestRatePage.selectInterestRate(),
            () => specInterestDateStartPage.selectInterestDateStart(),
            () => specInterestDateEndPage.selectInterestDateEnd(),
            () => this.clickContinue(),
            () => pbaNumberPage.selectPbaNumber(),
            () => paymentReferencePage.updatePaymentReference(),
            () => fixedCostsPage.addFixedCosts(),
            () => statementOfTruth.enterNameAndRole('claim'),
            () => event.submit('Submit',CONFIRMATION_MESSAGE.online),
            () => event.returnToCaseDetails(),
          ];

          await this.triggerStepsWithScreenshot(steps);
         caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
  },

    async createCaseSpecifiedForFlightDelay(mpScenario, claimant1, claimant2, respondent1, respondent2, claimAmount) {
      output.log('Create claim - Specified');
      eventName = 'Create claim - Specified';

      //const twoVOneScenario = claimant1 && claimant2;
      const pbaV3 = await checkToggleEnabled(PBAv3);
      output.log('--------------createCaseSpecified calling------------');
      await specCreateCasePage.createCaseSpecified(config.definition.jurisdiction);
      output.log('--------------createCaseSpecified finished------------');
      let steps = pbaV3 ? [
        () => this.clickContinue(),
        () => this.clickContinue(),
        () => solicitorReferencesPage.enterReferences(),
        ...firstClaimantSteps(claimant1),
        ...secondClaimantSteps(claimant2),
        ...firstDefendantSteps(respondent1),
        ...conditionalSteps(claimant2 == null, [
          () =>  addAnotherDefendant.enterAddAnotherDefendant(respondent2),
        ]),
        ...secondDefendantSteps(respondent2, respondent1.represented),
        ...conditionalSteps( [
          () => addClaimForAFlightDelay.enteredFlightDelayClaimYes()]),
        () => detailsOfClaimPage.enterDetailsOfClaim(mpScenario),
        () => specTimelinePage.addManually(),
        () => specAddTimelinePage.addTimeline(),
        () => specListEvidencePage.addEvidence(),
        () => specClaimAmountPage.addClaimItem(claimAmount),
        () => this.clickContinue(),
        () => specInterestPage.addInterest(),
        () => specInterestValuePage.selectInterest(),
        () => specInterestRatePage.selectInterestRate(),
        () => specInterestDateStartPage.selectInterestDateStart(),
        () => specInterestDateEndPage.selectInterestDateEnd(),
        () => this.clickContinue(),
        () => pbaNumberPage.clickContinue(),
        () => fixedCostsPage.addFixedCosts(),
        () => statementOfTruth.enterNameAndRole('claim'),
        ...conditionalSteps( [
          () => addClaimFlightDelayConfirmationPage.flightDelayClaimConfirmationPageValidation()]),
        () => event.submit('Submit',CONFIRMATION_MESSAGE.pbaV3Online),
        () => event.returnToCaseDetails(),
      ] : [
        () => this.clickContinue(),
        () => this.clickContinue(),
        () => solicitorReferencesPage.enterReferences(),
        ...firstClaimantSteps(claimant1),
        ...secondClaimantSteps(claimant2),
        ...firstDefendantSteps(respondent1),
        ...conditionalSteps(claimant2 == null, [
          () =>  addAnotherDefendant.enterAddAnotherDefendant(respondent2),
        ]),
        ...secondDefendantSteps(respondent2, respondent1.represented),
        ...conditionalSteps( [
          () => addClaimForAFlightDelay.enteredFlightDelayClaimYes()]),
        () => detailsOfClaimPage.enterDetailsOfClaim(mpScenario),
        () => specTimelinePage.addManually(),
        () => specAddTimelinePage.addTimeline(),
        () => specListEvidencePage.addEvidence(),
        () => specClaimAmountPage.addClaimItem(claimAmount),
        () => this.clickContinue(),
        () => specInterestPage.addInterest(),
        () => specInterestValuePage.selectInterest(),
        () => specInterestRatePage.selectInterestRate(),
        () => specInterestDateStartPage.selectInterestDateStart(),
        () => specInterestDateEndPage.selectInterestDateEnd(),
        () => this.clickContinue(),
        () => pbaNumberPage.selectPbaNumber(),
        () => paymentReferencePage.updatePaymentReference(),
        () => fixedCostsPage.addFixedCosts(),
        () => statementOfTruth.enterNameAndRole('claim'),
        ...conditionalSteps( [
          () => addClaimFlightDelayConfirmationPage.flightDelayClaimConfirmationPageValidation()]),
        () => event.submit('Submit',CONFIRMATION_MESSAGE.online),
        () => event.returnToCaseDetails(),
      ];

      await this.triggerStepsWithScreenshot(steps);
      caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
    },

   async informAgreedExtensionDateSpec(respondentSolicitorNumber = '1') {
       eventName = 'Inform agreed extension date';
       await this.triggerStepsWithScreenshot([
         () => caseViewPage.startEvent(eventName, caseId),
         () => extensionDatePage.enterExtensionDate(respondentSolicitorNumber),
         () => event.submit('Submit', ''),
         () => event.returnToCaseDetails(),
       ]);
     },

   async enterBreathingSpace() {
       eventName = 'Enter Breathing Space';
        await this.triggerStepsWithScreenshot([
                 () => caseViewPage.startEvent(eventName, caseId
                 ),
                 () => enterBreathingSpacePage.selectBSType(),
                 () => event.submit('Submit', ''),
                 () => event.returnToCaseDetails()
               ]);
    },

   async liftBreathingSpace() {
           eventName = 'Lift Breathing Space';
            await this.triggerStepsWithScreenshot([
                     () => caseViewPage.startEvent(eventName, caseId),
                     () => liftBreathingSpacePage.liftBS(),
                     () => event.submit('Submit', ''),
                     () => event.returnToCaseDetails()
                   ]);
        },

    async respondToClaimFullDefence({twoDefendants = false, defendant1Response = 'fullDefence', twoClaimants = false, claimType = 'fast', defenceType = 'dispute'}) {
      eventName = 'Respond to claim';
          await this.triggerStepsWithScreenshot([
            () => caseViewPage.startEvent(eventName, caseId),
            () => respondentCheckListPage.claimTimelineTemplate(),
            () => specConfirmDefendantsDetails.confirmDetails(twoDefendants),
            () => specConfirmLegalRepDetails.confirmDetails(false),
            ... conditionalSteps(twoDefendants, [
              () => singleResponse.defendantsHaveSameResponse(true),
            ]),
            ... conditionalSteps(twoClaimants, [
              () => singleResponse.defendantsHaveSameResponseForBothClaimants(true),
            ]),
            () => responseTypeSpecPage.selectResponseType(false,defendant1Response),
            () => defenceTypePage.selectDefenceType(false,defenceType,150),
            () => disputeClaimDetailsPage.enterReasons(false),
            () => claimResponseTimelineLRspecPage.addManually(false),
            () => this.clickContinue(),
         ... conditionalSteps(claimType === 'fast', [
                () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1),
                () => fixedRecoverableCosts.fixedRecoverableCosts(parties.RESPONDENT_SOLICITOR_1),
                () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specRespondent1'),
                () => this.clickContinue(),
                () => disclosureReportPage.enterDisclosureReport(parties.RESPONDENT_SOLICITOR_1),
                () => useMPExpertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1),
                () => witnessesLRspecPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1),
                () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
                () => hearingLRspecPage.enterHearing(parties.RESPONDENT_SOLICITOR_1),
           ]),
           ... conditionalSteps(claimType === 'small', [
                      () => freeMediationPage.selectMediation('DefendantResponse'),
                      () => enterWitnessesPage.howManyWitnesses('DefendantResponse'),
                      () => useExpertPage.claimExpert('DefendantResponse'),
                      () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
                      () => smallClaimsHearingPage.selectHearing('DefendantResponse'),
            ]),
            () => chooseCourtSpecPage.chooseCourt('DefendantResponse'),
            () => hearingSupportRequirementsPage.selectRequirements(parties.RESPONDENT_SOLICITOR_1),
            () => vulnerabilityPage.selectVulnerability('no'),
            ... conditionalSteps(claimType === 'fast', [
              () => furtherInformationLRspecPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
            ]),
            () => statementOfTruth.enterNameAndRole(parties.RESPONDENT_SOLICITOR_1 + 'DQ'),
            () => event.submit('Submit', ''),
            () => event.returnToCaseDetails()
         ]);

    },

    async respond1v2DiffLR_FullDefence({secondDefendant = true, defendant1Response = 'fullDefence', claimType = 'fast', defenceType = 'dispute'}) {
          eventName = 'Respond to claim';
              await this.triggerStepsWithScreenshot([
                () => caseViewPage.startEvent(eventName, caseId),
                () => respondentCheckListPage.claimTimelineTemplate(),
                () => confirm2ndDefLRspecPage.confirmDetails(),
                () => specConfirmLegalRepDetails.confirmDetails(secondDefendant),
                () => responseTypeSpecPage.selectResponseType(secondDefendant,defendant1Response),
                () => defenceTypePage.selectDefenceType(secondDefendant,defenceType,150),
                () => disputeClaimDetailsPage.enterReasons(secondDefendant),
                () => claimResponseTimelineLRspecPage.addManually(secondDefendant),
                () => this.clickContinue(),
             ... conditionalSteps(claimType === 'fast', [
                    () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_2),
                    () => fixedRecoverableCosts.fixedRecoverableCosts(parties.RESPONDENT_SOLICITOR_2),
                    () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specRespondent2'),
                    () => this.clickContinue(),
                    () => disclosureReportPage.enterDisclosureReport(parties.RESPONDENT_SOLICITOR_2),
                    () => useMPExpertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_2),
                    () => witnessesLRspecPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_2),
                    () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_2),
                    () => hearingLRspecPage.enterHearing(parties.RESPONDENT_SOLICITOR_2),
               ]),
                () => chooseCourtSpecPage.chooseCourt('DefendantResponse2'),
                () => hearingSupportRequirementsPage.selectRequirements(parties.RESPONDENT_SOLICITOR_2),
                () => vulnerabilityPage.selectVulnerability('no',true),
                ... conditionalSteps(claimType === 'fast', [
                  () => furtherInformationLRspecPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_2),
                ]),
                () => statementOfTruth.enterNameAndRole(parties.RESPONDENT_SOLICITOR_1 + 'DQ'),
                () => event.submit('Submit', ''),
                () => event.returnToCaseDetails()
             ]);

        },

    async respondToClaimPartAdmit({twoDefendants = false, defendant1Response = 'partAdmission', claimType = 'fast', defenceType = 'repaymentPlan', twoClaimants = false}) {
              eventName = 'Respond to claim';
              await this.triggerStepsWithScreenshot([
               () => caseViewPage.startEvent(eventName, caseId),
               () => respondentCheckListPage.claimTimelineTemplate(),
               () => specConfirmDefendantsDetails.confirmDetails(),
               () => specConfirmLegalRepDetails.confirmDetails(),
               ... conditionalSteps(twoClaimants, [
                () => singleResponse.defendantsHaveSameResponseForBothClaimants(true),
               ]),
               () => responseTypeSpecPage.selectResponseType(twoDefendants, defendant1Response),
               () => partAdmittedAmountPage.selectFullAdmitType('no'),
               () => disputeClaimDetailsPage.enterReasons(),
               () => claimResponseTimelineLRspecPage.addManually(),
               () => this.clickContinue(),
               () => admitPartPaymentRoutePage.selectPaymentRoute('repaymentPlan'),
              /* () => this.clickContinue(),
               () => this.clickContinue(),
               () => respondentHomeDetailsLRspecPage.selectRespondentHomeType(),
               () => respondentEmploymentTypePage.selectRespondentEmploymentType(),
               () => respondentCourtOrderTypePage.selectRespondentCourtOrderType(),
               () => respondentDebtsDetailsPage.selectDebtsDetails(),
               () => respondentCarerAllowanceDetailsPage.selectIncomeExpenses(),*/
               () => respondentPage.enterReasons(),
                ... conditionalSteps(defenceType === 'repaymentPlan', [
                 () => respondentRepaymentPlanPage.selectRepaymentPlan(),
               ]),
               ... conditionalSteps(claimType === 'small', [
                      () => freeMediationPage.selectMediation('DefendantResponse'),
                      () => useExpertPage.claimExpert('DefendantResponse'),
                      () => enterWitnessesPage.howManyWitnesses('DefendantResponse'),
                      () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1),
                      () => smallClaimsHearingPage.selectHearing('DefendantResponse'),
               ]),
               ... conditionalSteps(claimType === 'fast', [
                  () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1),
                  () => fixedRecoverableCosts.fixedRecoverableCosts(parties.RESPONDENT_SOLICITOR_1),
                  () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specRespondent1'),
                  () => this.clickContinue(),
                  () => disclosureReportPage.enterDisclosureReport(parties.RESPONDENT_SOLICITOR_1),
                  () => expertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1),
                  () => witnessesLRspecPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1),
                  () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
                  () => hearingLRspecPage.enterHearing(parties.RESPONDENT_SOLICITOR_1),

              ]),
                 () => chooseCourtSpecPage.chooseCourt('DefendantResponse'),
                 () => supportAccessLRspecPage.selectSupportAccess('no'),
                 () => vulnerabilityPage.selectVulnerability('no'),
                 () => furtherInformationLRspecPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
                 () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
                 () => event.submit('Submit', ''),
                 () => event.returnToCaseDetails(),
             ]);

     },

     async respondToClaimFullAdmit({twoDefendants = false, defendant1Response = 'fullAdmission', twoClaimants = false, claimType, defenceType}) {
              eventName = 'Respond to claim';
              await this.triggerStepsWithScreenshot([
               () => caseViewPage.startEvent(eventName, caseId),
               () => respondentCheckListPage.claimTimelineTemplate(),
               () => specConfirmDefendantsDetails.confirmDetails(),
               () => specConfirmLegalRepDetails.confirmDetails(),
               ... conditionalSteps(twoDefendants, [
                 () => this.clickContinue(),
               ]),
               ... conditionalSteps(claimType, [
                () => {
                  console.log('claimType...', claimType);
                },
              ]),
               ... conditionalSteps(twoClaimants, [
                () => singleResponse.defendantsHaveSameResponseForBothClaimants(true),
               ]),
               () => responseTypeSpecPage.selectResponseType(twoDefendants, defendant1Response),
               () => fullAdmitTypeLRspecPage.selectFullAdmitType('no'),
               () => admitPartPaymentRoutePage.selectPaymentRoute('setDate'),
               ... conditionalSteps(defenceType == 'payByInstallments', [
               () => this.clickContinue(),
               () => this.clickContinue(),
               () => respondentHomeDetailsLRspecPage.selectRespondentHomeType(),
               () => respondentEmploymentTypePage.selectRespondentEmploymentType(),
               () => respondentCourtOrderTypePage.selectRespondentCourtOrderType(),
               () => respondentDebtsDetailsPage.selectDebtsDetails(),
               () => respondentIncomeExpensesDetailsPage.selectIncomeExpenses(),
               ]),
               () => respondentPage.enterReasons(),
               ... conditionalSteps(defenceType == 'payByInstallments', [
               () => vulnerabilityPage.selectVulnerability('no'),
              ]),
               () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
               () => event.submit('Submit', ''),
               () => event.returnToCaseDetails()
             ]);

     },

     async mediationUnsuccessful() {
        eventName = 'Mediation Unsuccessful';
        await this.triggerStepsWithScreenshot([
          () => caseViewPage.startEvent(eventName, caseId),
          () => mediationFailurePage.selectMediationFailureReason(),
          () => event.submitWithoutHeader('Submit'),
        ]);
     },

     async respondToDefence({mpScenario = 'ONE_V_ONE', claimType = 'fast'}) {
                eventName = 'View and respond to defence';
                await this.triggerStepsWithScreenshot([
                      () => caseViewPage.startEvent(eventName, caseId),
                      () => proceedPage.proceedWithClaim(mpScenario),
                      () => this.clickContinue(),
                      ... conditionalSteps(claimType === 'small', [
                      () => freeMediationPage.selectMediation('ClaimantResponse'),
                      () => useExpertPage.claimExpert('ClaimantResponse'),
                      () => enterWitnessesPage.howManyWitnesses('ClaimantResponse'),
                      () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1),
                      () => smallClaimsHearingPage.selectHearing('ClaimantResponse'),
                      ]),
                      ... conditionalSteps(claimType === 'fast', [
                       () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.APPLICANT_SOLICITOR_1),
                       () => fixedRecoverableCosts.fixedRecoverableCosts(parties.APPLICANT_SOLICITOR_1),
                       () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specApplicant1'),
                       () => this.clickContinue(),
                       () => disclosureReportPage.enterDisclosureReport(parties.APPLICANT_SOLICITOR_1),
                       () => expertsPage.enterExpertInformation(parties.APPLICANT_SOLICITOR_1),
                       () => witnessesLRspecPage.enterWitnessInformation(parties.APPLICANT_SOLICITOR_1),
                       () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1),
                       () => hearingClaimantLRspecPage.enterHearing(parties.APPLICANT_SOLICITOR_1),
                       ]),
                      () => chooseCourtSpecPage.chooseCourt('ClaimantResponse'),
                      () => hearingSupportRequirementsPage.selectRequirements(parties.APPLICANT_SOLICITOR_1),
                      () => vulnerabilityQuestionsPage.vulnerabilityQuestions(parties.APPLICANT_SOLICITOR_1),
                       ... conditionalSteps(claimType === 'fast', [
                      () => furtherInformationLRspecPage.enterFurtherInformation(parties.APPLICANT_SOLICITOR_1),
                       ]),
                      () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
                      () => event.submit('Submit your response', ''),
                      () => event.returnToCaseDetails()
                   ]);
                   await this.takeScreenshot();
      },

    async caseProceedsInCaseman() {
      eventName = 'Case proceeds in Caseman';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => caseProceedsInCasemanPage.enterTransferDate(),
        () => takeCaseOffline.takeCaseOffline()
      ]);
      await this.takeScreenshot();
    },

    async acknowledgeClaimSpec() {
      eventName = 'Acknowledgement of Service';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => specConfirmDefendantsDetails.confirmDetails(),
        () => specConfirmLegalRepDetails.confirmDetails(),
        () => event.submit('Acknowledge claim', ''),
        () => event.returnToCaseDetails(),
      ]);
    },

    async uploadMediationDocs(caseId, partyType, docType) {
      eventName = 'Upload mediation documents';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => mediationDocumentsExplanation.uploadADocument(),
        () => whoIsFor.selectOptions(partyType),
        () => documentType.selectDocumentType(docType),
        ... conditionalSteps(docType === 'Both docs', [
          () => documentUpload.fillNonAttendanceStatement(TEST_FILE_PATH),
          () => documentUpload.fillDocumentsReferredForm(TEST_FILE_PATH),
          () => this.clickContinue(),
        ]),
        ... conditionalSteps(docType === 'Non-attendance', [
          () => documentUpload.fillNonAttendanceStatement(TEST_FILE_PATH),
          () => this.clickContinue(),
        ]),
        () => event.submitWithoutHeader('Submit')
      ]);
    },

    async initiateSDO(damages, allocateSmallClaims, trackType, orderType) {
      eventName = 'Standard Direction Order';

      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/CREATE_SDO/CREATE_SDOSDO');

      await this.waitForText('Standard Direction Order');
      await this.triggerStepsWithScreenshot([
        () => sumOfDamagesToBeDecidedPage.damagesToBeDecided(damages),

        ...conditionalSteps(damages, [
          () => allocateSmallClaimsTrackPage.decideSmallClaimsTrack(allocateSmallClaims),
          ...conditionalSteps(!allocateSmallClaims,[
            () => sdoOrderTypePage.decideOrderType(orderType)])
        ]),

        ...conditionalSteps(trackType, [
        () => allocateClaimPage.selectTrackType(trackType)]),

        () => smallClaimsSDOOrderDetailsPage.selectOrderDetails(allocateSmallClaims, trackType, orderType),
        () => smallClaimsSDOOrderDetailsPage.verifyOrderPreview(),
        () => event.submit('Submit', 'Your order has been issued')
      ]);
    },

    async createCaseFlags(caseFlags) {
      eventName = 'Create case flags';

      for (const {partyName, roleOnCase, details} of caseFlags) {
        for (const {name, flagComment} of details) {
          await this.triggerStepsWithScreenshot([
            () => caseViewPage.startEvent(eventName, caseId),
            () => createCaseFlagPage.selectFlagLocation(`${partyName} (${roleOnCase})`),
            () => createCaseFlagPage.selectFlag(name),
            () => createCaseFlagPage.inputFlagComment(flagComment),
            () => event.submitWithoutHeader('Submit'),
          ]);
        }
      }
    },

    async validateCaseFlags(caseFlags) {
      eventName = '';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.goToCaseFlagsTab(caseId),
        () => caseViewPage.rejectCookieBanner(),
        () => caseViewPage.assertCaseFlagsInfo(caseFlags.length),
        () => caseViewPage.assertCaseFlags(caseFlags)
      ]);
      await this.takeScreenshot();
    },

    async navigateToCaseDetails(caseNumber) {
      await this.retryUntilExists(async () => {
        const normalizedCaseId = caseNumber.toString().replace(/\D/g, '');
        output.log(`Navigating to case: ${normalizedCaseId}`);
        await this.amOnPage(`${config.url.manageCase}/cases/case-details/${normalizedCaseId}`);
        await this.waitForSelector(SIGNED_IN_SELECTOR);
      }, SIGNED_IN_SELECTOR);

      await this.waitForSelector('.ccd-dropdown');
    },

    async evidenceUploadSpec(caseId, defendant) {
      defendant ? eventName = 'EVIDENCE_UPLOAD_RESPONDENT' : eventName = 'EVIDENCE_UPLOAD_APPLICANT';
      await this.triggerStepsWithScreenshot([
        () => specifiedEvidenceUpload.uploadADocument(caseId, defendant),
        () => specifiedEvidenceUpload.selectType(defendant),
        () => specifiedEvidenceUpload.uploadYourDocument(TEST_FILE_PATH, defendant),
        () => event.submit('Submit', 'Documents uploaded')
      ]);
    },

    async createHearingScheduled() {
      eventName = 'Hearing Scheduled';
      await this.triggerStepsWithScreenshot([
        () => hearingNoticeListPage.hearingType('fastTrack'),
        () => hearingNoticeListTypePage.listingOrRelistingSelect('Listing'),
        () => hearingScheduledChooseDetailsPage.selectCourt(),
        () => hearingScheduledMoreInfoPage.enterMoreInfo(),
        () => event.submit('Submit', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async payHearingFee(user = config.applicantSolicitorUser) {
      await this.login(user);
      const pbaV3 = await checkToggleEnabled(PBAv3);
      if (pbaV3) {
        await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
        await serviceRequest.openServiceRequestTab();
        await serviceRequest.payFee(caseId, true);
      }
    },

    async stayCase(user = config.ctscAdminUser) {
      eventName = 'Stay case';
      await this.login(user);
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => this.waitForText('All parties will be notified.'),
        () => event.submit('Submit', 'All parties have been notified and any upcoming hearings must be cancelled'),
        () => event.returnToCaseDetails(),
      ]);
    },

    async manageStay(manageStayType = 'LIFT_STAY', caseState = 'JUDICIAL_REFERRAL', user = config.ctscAdminUser) {
      eventName = 'Manage stay';
      await this.login(user);
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
      ]);
      if (manageStayType == 'REQ_UPDATE')  {
        await this.triggerStepsWithScreenshot([
          () => stayAndLiftCasePage.verifyReqUpdateSteps(),
          () => event.submit('Submit', 'You have requested an update on'),
          () => this.waitForText('All parties have been notified'),
          () => event.returnToCaseDetails(),
        ]);
      } else {
        await this.triggerStepsWithScreenshot([
          () => stayAndLiftCasePage.verifyLiftCaseStaySteps(caseState),
          () => event.submit('Submit', 'You have lifted the stay from this'),
          () => this.waitForText('All parties have been notified'),
          () => event.returnToCaseDetails(),
        ]);
      }
      await this.waitForText('Summary');
    },

    async requestForReconsiderationForUI() {
      eventName = 'Request for Reconsideration';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForRR(eventName, caseId),
        () => requestForRR.reasonForReconsideration(),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Testing Request for Reconsideration'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },

    async requestForSettleThisClaimForUI() {
      eventName = 'Settle this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForSD(eventName, caseId),
        () => this.click('Continue'),
        () => this.waitForText('Confirm settle this claim'),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('This claim has been marked as settled'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestForSettleThisClaimForUI2v1() {
      eventName = 'Settle this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForSDMultiple(eventName, caseId),
        () => this.click('Continue'),
        () => this.waitForText('Which claimants are settling'),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('This claim has been marked as settled'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestSettleThisClaimJudgesOrderForUI() {
      eventName = 'Settle this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForSettleThisClaimJudgesOrder(eventName, caseId),
        () => caseViewPage.selectJudgeOrder(),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },

    async requestSettleThisClaimConsentOrderForUI() {
      eventName = 'Settle this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForSettleThisClaimJudgesOrder(eventName, caseId),
        () => this.click('Consent order approved'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },

    async requestForDiscontinueThisClaimForUI() {
      eventName = 'Discontinue this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDiscontinueThisClaim(eventName, caseId),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Permission granted by the court'),
        () => this.click('Yes'),
        () => caseViewPage.permissionGrantedByJudge(),
        () => this.waitForText('Type of Discontinuance'),
        () => this.click('Full discontinuance'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestForDiscontinueThisClaimForUI1v2() {
      eventName = 'Discontinue this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDiscontinueThisClaim(eventName, caseId),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Permission granted by the court'),
        () => this.click('Yes'),
        () => caseViewPage.permissionGrantedByJudge(),
        () => this.waitForText('Discontinuing against defendants'),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Type of Discontinuance'),
        () => this.click('Full discontinuance'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestForDiscontinueThisClaimForUI2v1() {
      eventName = 'Discontinue this claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDiscontinueThisClaim2v1(eventName, caseId),
        () => this.click('Both'),
        () => this.click('Continue'),
        () => this.waitForText('Permission from the court'),
        () => this.click('Yes'),
        () => this.click('Continue'),
        () => this.waitForText('Has permission been granted by a Judge to discontinue'),
        () => this.click('Yes'),
        () => caseViewPage.permissionGrantedByJudge(),
        () => this.waitForText('Is this a full or part discontinuance?'),
        () => this.click('Full discontinuance'),
        () => this.click('Continue'),
        () => this.waitForText('Check your answers'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestForValidateDiscontinuanceForUI() {
      eventName = 'Validate discontinuance';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForValidateDiscontinuance(eventName, caseId),
        () => this.click('Yes - generate a Notice of Discontinuance'),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async requestForClaimDiscontinuedRemoveHearingForUI() {
     // eventName = 'Validate discontinuance';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForClaimDiscontinuedRemoveHearing(caseId),
        () => caseViewPage.caseNoteForClaimDiscontinuedRemoveHearing(),
        () => this.waitForText('Add a case note'),
        () => this.click('Submit'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
    async decisionForReconsideration() {
      eventName = 'Decision on reconsideration';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDR(caseId),
        () => requestForDecision.selectCreateNewSDO(),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },

    async decisionForReconsiderationYesOption() {
      eventName = 'Decision on reconsideration';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDR(caseId),
        () => requestForDecision.selectYesOptionToUpholdThePreviousOrderMade(),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },

    async decisionForReconsiderationNoOptionForAmending() {
      eventName = 'Decision on reconsideration';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventForDR(caseId),
        () => requestForDecision.selectNoOptionForPreviousOrderNeedsAmending(),
        () => this.click('Submit'),
        () => this.waitForText('Close and Return to case details'),
        () => this.click('Close and Return to case details'),
        () => this.waitForText('Sign out'),
        () => this.click('Sign out'),
      ]);
      await this.takeScreenshot();
    },
  });
};
