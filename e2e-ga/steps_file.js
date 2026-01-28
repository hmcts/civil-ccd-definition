const output = require('codeceptjs').output;
const config = require('./config.js');
const parties = require('./helpers/party.js');
const loginPage = require('./pages/login.page');
const continuePage = require('./pages/continuePage.page');
const caseViewPage = require('./pages/caseView.page');
const createCasePage = require('./pages/createClaim/createCase.page');
const solicitorReferencesPage = require('./pages/createClaim/solicitorReferences.page');
const claimantSolicitorOrganisation = require('./pages/createClaim/claimantSolicitorOrganisation.page');
const claimantSolicitorOrganisationLRspec = require('./pages/createClaim/claimantSolicitorOrganisationLRspec.page');
const claimantSolicitorServiceAddress = require('./pages/createClaim/claimantSolicitorServiceAddress.page');
const addAnotherClaimant = require('./pages/createClaim/addAnotherClaimant.page');
const claimantSolicitorIdamDetailsPage = require('./pages/createClaim/idamEmail.page');
const defendantSolicitorOrganisation = require('./pages/createClaim/defendantSolicitorOrganisation.page');
const defendantSolicitorOrganisationLRspec = require('./pages/createClaim/defendantSolicitorOrganisationLRspec.page');
const defendantSolicitorServiceAddress = require('./pages/createClaim/defendantSolicitorServiceAddress.page');
const secondDefendantSolicitorServiceAddress = require('./pages/createClaim/secondDefendantSolicitorServiceAddress.page');
const defendantSolicitorEmail = require('./pages/createClaim/defendantSolicitorEmail.page');
const chooseCourtPage = require('./pages/createClaim/chooseCourt.page');
const claimantLitigationDetails = require('./pages/createClaim/claimantLitigationDetails.page');
const addAnotherDefendant = require('./pages/createClaim/addAnotherDefendant.page');
const respondent2SameLegalRepresentative = require('./pages/createClaim/respondent2SameLegalRepresentative.page');
const secondDefendantSolicitorReference = require('./pages/createClaim/secondDefendantSolicitorReference.page');
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
const {dateNoWeekendsBankHolidayNextDay} = require('./fragments/date');

const applicationTypePage = require('./pages/generalApplication/applicationType.page');
const hearingDatePage = require('./pages/generalApplication/hearingDate.page');
const n245FormPage = require('./pages/generalApplication/n245Form.page');
const consentCheckPage = require('./pages/generalApplication/consentCheck.page');
const urgencyCheckPage = require('./pages/generalApplication/urgencyCheck.page');
const withOutNoticePage = require('./pages/generalApplication/withOutNotice.page');
const enterApplicationDetailsPage = require('./pages/generalApplication/applicationDetails.page');
const hearingAndTrialPage = require('./pages/generalApplication/hearingDetails.page');
const gaPBANumberPage = require('./pages/generalApplication/gaPBANumber.page');
const answersPage = require('./pages/generalApplication/checkYourAnswers.page');
const confirmationPage = require('./pages/generalApplication/gaConfirmation.page');
const applicationTab = require('./pages/generalApplication/applicationTab.page');
const applicantSummaryPage = require('./pages/generalApplication/applicantSummary.page');
const respConsentCheckPage = require('./pages/generalApplication/responseJourneyPages/responseConsentCheck.page');
const respondentDebtorResponsePage = require('./pages/generalApplication/responseJourneyPages/respondentDebtorResponse.page');
const respHearingDetailsPage = require('./pages/generalApplication/responseJourneyPages/responseHearingDetails.page');
const responseCheckYourAnswersPage = require('./pages/generalApplication/responseJourneyPages/responseCheckYourAnswers.page');
const responseConfirmationPage = require('./pages/generalApplication/responseJourneyPages/responseConfirmation.page');
const responseSummaryPage = require('./pages/generalApplication/responseJourneyPages/responseSummary.page');
const judgeDecisionPage = require('./pages/generalApplication/judgesJourneyPages/judgeDecision.page');
const consentOrderPage = require('./pages/generalApplication/consentOrderPages/approveConsentOrder.page');
const consentOrderReviewPage = require('./pages/generalApplication/consentOrderPages/reviewConsentOrderDocument.page');
const consentOrderCYAPage = require('./pages/generalApplication/consentOrderPages/consentOrderCheckYourAnswers.page');

const judgeOrderPage = require('./pages/generalApplication/applicationOrderPages/judgeOrder.page');
const freeFormOrderPage = require('./pages/generalApplication/applicationOrderPages/freeFormOrder.page');
const assistedOrderPage = require('./pages/generalApplication/applicationOrderPages/assistedOrder.page');
const makeAnOrderPage = require('./pages/generalApplication/judgesJourneyPages/makeAnOrder.page');
const reviewOrderDocumentPage = require('./pages/generalApplication/judgesJourneyPages/reviewOrderDocument.page');
const reviewAppOrderDocumentPage = require('./pages/generalApplication/applicationOrderPages/reviewAppOrderDocument.page');
const appOrderCYAPage = require('./pages/generalApplication/applicationOrderPages/appOrderCheckYourAnswers.page');
const appOrderConfirmationPage = require('./pages/generalApplication/applicationOrderPages/appOrderConfirmation.page');
const requestMoreInfoPage = require('./pages/generalApplication/judgesJourneyPages/requestMoreInformation.page');
const judgesCheckYourAnswers = require('./pages/generalApplication/judgesJourneyPages/judgesCheckYourAnswers.page');
const judgesConfirmationPage = require('./pages/generalApplication/judgesJourneyPages/judgesConfirmation.page');
const listForHearingPage = require('./pages/generalApplication/judgesJourneyPages/listForHearing.page');
const drawGeneralOrderPage = require('./pages/generalApplication/judgesJourneyPages/drawGeneralOrder.page');
const writtenRepresentationsPage = require('./pages/generalApplication/judgesJourneyPages/writtenRepresentations.page');
const uploadScreenPage = require('./pages/generalApplication/judgesJourneyPages/uploadScreen.page');
const applicationDocumentPage = require('./pages/generalApplication/judgesJourneyPages/applicationDocument.page');
// eslint-disable-next-line no-unused-vars
const judgesSummary = require('./pages/generalApplication/judgesJourneyPages/judgesSummary.page');
const claimDocumentPage = require('./pages/generalApplication/claimDocument.page');
const caseFileDocPage = require('./pages/generalApplication/caseFile.page');
const serviceRequestPage = require('./pages/generalApplication/serviceRequest.page');
const appDetailsPage = require('./pages/generalApplication/hearingNoticePages/applicationDetails.page');
const hearingSchedulePage = require('./pages/generalApplication/hearingNoticePages/hearingSchedule.page');
const hearingNoticeCYAPage = require('./pages/generalApplication/hearingNoticePages/hnCheckYourAnswers.page');

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

const gaEvents = require('./fixtures/ga-ccd/events.js');
const ccdEvents = require('./fixtures/ccd/events.js');
const address = require('./fixtures/address.js');
const specCreateCasePage = require('./pages/createClaim/createCaseLRspec.page');
const specPartyDetails = require('./fragments/claimantDetailsLRspec');
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
const specInterestRatePage = require('./pages/createClaim/interestRateLRspec.page');
const specInterestDateStartPage = require('./pages/createClaim/interestDateStartLRspec.page');
const specInterestDateEndPage = require('./pages/createClaim/interestDateEndLRspec.page');
const specConfirmDefendantsDetails = require('./fragments/confirmDefendantsDetailsLRspec');
const specConfirmLegalRepDetails = require('./fragments/confirmLegalRepDetailsLRspec');
const responseTypeSpecPage = require('./pages/respondToClaimLRspec/responseTypeLRspec.page');
const defenceTypePage = require('./pages/respondToClaimLRspec/defenceTypeLRspec.page');
const freeMediationPage = require('./pages/respondToClaimLRspec/freeMediationLRspec.page');
const chooseCourtSpecPage = require('./pages/respondToClaimLRspec/chooseCourtLRspec.page');
const smallClaimsHearingPage = require('./pages/respondToClaimLRspec/hearingSmallClaimsLRspec.page');
const useExpertPage = require('./pages/respondToClaimLRspec/useExpertLRspec.page');
const respondentCheckListPage = require('./pages/respondToClaimLRspec/respondentCheckListLRspec.page');
const enterWitnessesPage = require('./pages/respondToClaimLRspec/enterWitnessesLRspec.page');
const disputeClaimDetailsPage = require('./pages/respondToClaimLRspec/disputeClaimDetailsLRspec.page');
const claimResponseTimelineLRspecPage = require('./pages/respondToClaimLRspec/claimResponseTimelineLRspec.page');
const hearingLRspecPage = require('./pages/respondToClaimLRspec/hearingLRspec.page');
const furtherInformationLRspecPage = require('./pages/respondToClaimLRspec/furtherInformationLRspec.page');
const disclosureReportPage = require('./fragments/dq/disclosureReport.page');
const {getAppTypes} = require('./pages/generalApplication/generalApplicationTypes');
const apiRequest = require('./api/apiRequest');
const genAppJudgeMakeDecisionData = require('./fixtures/ga-ccd/judgeMakeDecision');
const {waitForGACamundaEventsFinishedBusinessProcess} = require('./api/testingSupport');

const SIGNED_IN_SELECTOR = 'exui-header';
const SIGNED_OUT_SELECTOR = '#global-header';
const CASE_HEADER = 'ccd-case-header > h1';
const GA_CASE_HEADER = '.heading-h2';
const SIGN_OUT_LINK = 'ul[class*="navigation-list"] a';
const TEST_FILE_PATH = './e2e/fixtures/examplePDF.pdf';
const CONTINUE_BUTTON = 'button[type="submit"]';
const LOGIN_FORM = 'form[name="loginForm"]';

let caseId, screenshotNumber, eventName, loggedInUser;
let eventNumber = 0;

const getScreenshotName = () => eventNumber + '.' + screenshotNumber + '.' + eventName.split(' ').join('_') + '.jpg';
const conditionalSteps = (condition, steps) => condition ? steps : [];

const selectApplicationType = (applicationType) => [
  () => applicationTypePage.selectApplicationType(applicationType),
];

const selectGAAndVerifyErrorMessage = (eventName, errorMessage) => [
  () => caseViewPage.start(eventName, errorMessage),
  () => applicationTypePage.verifyErrorMessage(errorMessage),
];

const selectConsentCheck = (consentCheck) => [
  () => consentCheckPage.selectConsentCheck(consentCheck)
];

const isUrgentApplication = (urgent) => [
  () => urgencyCheckPage.selectUrgencyRequirement(urgent),
];

const selectNotice = (notice) => [
  () => withOutNoticePage.selectNotice(notice),
];

const enterApplicationDetails = () => [
  () => enterApplicationDetailsPage.enterApplicationDetails(TEST_FILE_PATH),
];

const fillHearingDetails = (hearingScheduled, trialRequired, unavailableTrailRequired, vulnerabilityQuestions, supportRequirement) => [
  () => hearingAndTrialPage.isHearingScheduled(hearingScheduled),
  () => hearingAndTrialPage.isTrialRequired(trialRequired),
  () => hearingAndTrialPage.selectHearingPreferences('inPerson'),
  () => hearingAndTrialPage.selectHearingDuration('fortyFiveMin'),
  () => hearingAndTrialPage.isUnavailableTrailRequired(unavailableTrailRequired),
  () => hearingAndTrialPage.selectVulnerabilityQuestions(vulnerabilityQuestions),
  () => hearingAndTrialPage.selectSupportRequirement(supportRequirement),
];

const updateHearingDetails = () => [
  () => hearingAndTrialPage.updateHearingDetails(),
];

const verifyApplicationFee = (consentCheck, notice, appType) => [
  () => gaPBANumberPage.verifyApplicationFee(consentCheck, notice, appType),
];

const verifyCheckAnswerForm = (caseId, consentCheck) => [
  () => answersPage.verifyCheckAnswerForm(caseId, consentCheck),
];

const clickOnHearingDetailsChangeLink = (consentCheck) => [
  () => answersPage.clickOnChangeLink(consentCheck),
];

const submitApplication = (confMessage) => [
  () => event.submit('Submit', confMessage)
];

const submitSupportingDocument = (confMessage) => [
  () => event.submitSupportingDoc('Submit', confMessage)
];

const verifyGAConfirmationPage = (parentCaseId, consentCheck, notice, appTypes) => [
  () => confirmationPage.verifyConfirmationPage(parentCaseId, consentCheck, notice, appTypes)
];

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    async login(user) {
      if (loggedInUser !== user) {
        if (await this.hasSelector(SIGNED_IN_SELECTOR)) {
          await this.waitForSelector(SIGN_OUT_LINK, 30);
          await this.signOut();
        }
      }
      await this.retryUntilExists(async () => {
        this.amOnPage(config.url.manageCase, 90);

        if (await this.waitForSelector(LOGIN_FORM, 15) === null) {
          this.amOnPage(config.url.manageCase, 90);
          await this.waitForSelector(LOGIN_FORM, 15);
        }

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

    grabGACaseNumber: async function () {
      this.waitForElement(GA_CASE_HEADER);
      return await this.grabTextFrom(GA_CASE_HEADER);
    },

    async signOut() {
      await this.retryUntilExists(() => {
        this.click('Sign out');
      }, SIGNED_OUT_SELECTOR);
    },

    async takeScreenshot() {
  /*    if (currentEventName !== eventName) {
        currentEventName = eventName;
        eventNumber++;
        screenshotNumber = 0;
      }
      screenshotNumber++;
      await this.saveScreenshot(getScreenshotName(), true);*/
    },

    triggerStepsWithScreenshot: async function (steps) {
      for (let i = 0; i < steps.length; i++) {
        try {
          await this.takeScreenshot();
        } catch {
          output.log(`Error taking screenshot: ${getScreenshotName()}`);
        }
        await steps[i]();
      }
    },

    async createCase(litigantInPerson = false) {
      eventName = 'Create case';

      await createCasePage.createCase(config.definition.jurisdiction);
      await this.triggerStepsWithScreenshot([
        () => continuePage.continue(),
        () => solicitorReferencesPage.enterReferences(),
        () => chooseCourtPage.enterCourt(),
        () => party.enterParty('applicant1', address),
        () => claimantLitigationDetails.enterLitigantFriendWithDifferentAddressToApplicant(address, TEST_FILE_PATH),
        () => claimantSolicitorIdamDetailsPage.enterUserEmail(),
        () => claimantSolicitorOrganisation.enterOrganisationDetails(),
        () => claimantSolicitorServiceAddress.enterOrganisationServiceAddress(),
        () => addAnotherClaimant.enterAddAnotherClaimant(),
        () => party.enterParty('respondent1', address),
        () => respondentRepresentedPage.enterRespondentRepresented('respondent1', 'no'),
        () => respondentRepresentedPage.enterRespondentRepresented('respondent1', 'yes'),
        () => defendantSolicitorOrganisation.enterOrganisationDetails('1'),
        () => defendantSolicitorServiceAddress.enterOrganisationServiceAddress(),
        () => defendantSolicitorEmail.enterSolicitorEmail('1'),
        () => addAnotherDefendant.enterAddAnotherDefendant(),
        () => party.enterParty('respondent2', address),
        () => respondentRepresentedPage.enterRespondentRepresented('respondent2', 'yes'),
        () => respondent2SameLegalRepresentative.enterRespondent2SameLegalRepresentative(),
        () => defendantSolicitorOrganisation.enterOrganisationDetails('2'),
        () => secondDefendantSolicitorServiceAddress.enterOrganisationServiceAddress(),
        () => secondDefendantSolicitorReference.enterReference(),
        () => defendantSolicitorEmail.enterSolicitorEmail('2'),
        () => claimTypePage.selectClaimType(),
        () => personalInjuryTypePage.selectPersonalInjuryType(),
        () => detailsOfClaimPage.enterDetailsOfClaim(),
        () => uploadParticularsOfClaimQuestion.chooseYesUploadParticularsOfClaim(),
        () => uploadParticularsOfClaim.upload(TEST_FILE_PATH),
        () => claimValuePage.enterClaimValue(),
        () => pbaNumberPage.selectPbaNumber(),
        () => paymentReferencePage.updatePaymentReference(),
        () => statementOfTruth.enterNameAndRole('claim'),
        () => event.submit('Submit', litigantInPerson ?
          'Your claim has been received and will progress offline' : 'Your claim has been received\nClaim number: '),
        () => event.returnToCaseDetails()
      ]);

      caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
    },

    async notifyClaim() {
      eventName = ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM, caseId),
        () => continuePage.continue(),
        () => event.submit('Submit', 'Notification of claim sent'),
        () => event.returnToCaseDetails()
      ]);
    },

    async notifyClaimDetails() {
      eventName = ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM_DETAILS, caseId),
        () => continuePage.continue(),
        () => event.submit('Submit', 'Defendant notified'),
        () => event.returnToCaseDetails()
      ]);
    },

    async acknowledgeClaim(responseIntention) {
      eventName = ccdEvents.ACKNOWLEDGE_CLAIM.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.ACKNOWLEDGE_CLAIM, caseId),
        () => respondentDetails.verifyDetails(),
        () => responseIntentionPage.selectResponseIntention(responseIntention),
        () => confirmDetailsPage.confirmReference(),
        // temporarily commenting out whilst change is made to service repo
        () => event.submit(eventName, ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async informAgreedExtensionDate(respondentSolicitorNumber = '1') {
      eventName = ccdEvents.INFORM_AGREED_EXTENSION_DATE.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.INFORM_AGREED_EXTENSION_DATE, caseId),
        () => extensionDatePage.enterExtensionDate(respondentSolicitorNumber),
        () => event.submit('Submit', 'Extension deadline submitted'),
        () => event.returnToCaseDetails()
      ]);
    },

    async addDefendantLitigationFriend() {
      eventName = ccdEvents.ADD_DEFENDANT_LITIGATION_FRIEND.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.ADD_DEFENDANT_LITIGATION_FRIEND, caseId),
        () => defendantLitigationFriendPage.enterLitigantFriendWithDifferentAddressToDefendant(address, TEST_FILE_PATH),
        () => event.submit('Submit', 'You have added litigation friend details'),
        () => event.returnToCaseDetails()
      ]);
    },

    async respondToClaim(responseType) {
      eventName = ccdEvents.DEFENDANT_RESPONSE.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.DEFENDANT_RESPONSE, caseId),
        () => responseTypePage.selectResponseType(responseType),
        ...conditionalSteps(responseType === 'fullDefence', [
          () => uploadResponsePage.uploadResponseDocuments(TEST_FILE_PATH),
          () => respondentDetails.verifyDetails(),
          () => confirmDetailsPage.confirmReference(),
          () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1),
          () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments(parties.RESPONDENT_SOLICITOR_1),
          () => disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(parties.RESPONDENT_SOLICITOR_1),
          () => expertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1),
          () => witnessPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => hearingPage.enterHearingInformation(parties.RESPONDENT_SOLICITOR_1),
          () => draftDirectionsPage.upload(parties.RESPONDENT_SOLICITOR_1, TEST_FILE_PATH),
          () => requestedCourtPage.selectSpecificCourtForHearing(parties.RESPONDENT_SOLICITOR_1),
          () => hearingSupportRequirementsPage.selectRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => furtherInformationPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
          () => statementOfTruth.enterNameAndRole(parties.RESPONDENT_SOLICITOR_1 + 'DQ'),
        ]),
        () => event.submit('Submit', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async respondToDefence() {
      eventName = ccdEvents.CLAIMANT_RESPONSE.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.CLAIMANT_RESPONSE, caseId),
        () => proceedPage.proceedWithClaim(),
        () => uploadResponseDocumentPage.uploadResponseDocuments(TEST_FILE_PATH),
        () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.APPLICANT_SOLICITOR_1),
        () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments(parties.APPLICANT_SOLICITOR_1),
        () => disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(parties.APPLICANT_SOLICITOR_1),
        () => expertsPage.enterExpertInformation(parties.APPLICANT_SOLICITOR_1),
        () => witnessPage.enterWitnessInformation(parties.APPLICANT_SOLICITOR_1),
        () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1),
        () => hearingPage.enterHearingInformation(parties.APPLICANT_SOLICITOR_1),
        () => draftDirectionsPage.upload(parties.APPLICANT_SOLICITOR_1, TEST_FILE_PATH),
        () => hearingSupportRequirementsPage.selectRequirements(parties.APPLICANT_SOLICITOR_1),
        () => furtherInformationPage.enterFurtherInformation(parties.APPLICANT_SOLICITOR_1),
        () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
        () => event.submit('Submit your response', 'You have chosen to proceed with the claim\nClaim number: '),
        () => this.click('Close and Return to case details')
      ]);
      await this.takeScreenshot();
    },

    async respondToDefenceDropClaim() {
      eventName = ccdEvents.CLAIMANT_RESPONSE.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.CLAIMANT_RESPONSE, caseId),
        () => proceedPage.dropClaim(),
        () => event.submit('Submit your response', 'You have chosen not to proceed with the claim'),
        () => this.click('Close and Return to case details')
      ]);
      await this.takeScreenshot();
    },

    async caseProceedsInCaseman() {
      eventName = ccdEvents.CASE_PROCEEDS_IN_CASEMAN.name;

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.CASE_PROCEEDS_IN_CASEMAN, caseId),
        () => caseProceedsInCasemanPage.enterTransferDate(),
        () => takeCaseOffline.takeCaseOffline()
      ]);
      await this.takeScreenshot();
    },

    async assertNoEventsAvailable() {
      await caseViewPage.assertNoEventsAvailable();
    },

    async clickContinue() {
      let urlBefore = await this.grabCurrentUrl();
      await this.retryUntilUrlChanges(() => this.waitForNavigationToComplete(CONTINUE_BUTTON), urlBefore);
    },

    async clickOnElement(element) {
      let urlBefore = await this.grabCurrentUrl();
      await this.retryUntilUrlChanges(() => this.click(element), urlBefore);
    },

    async navigateToTab(caseNumber, tabName) {
      await caseViewPage.navigateToTab(caseNumber, tabName);
      await this.waitForSelector(SIGN_OUT_LINK, 30);
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
        console.log(`retryUntilInvisible(${locator}): starting try #${tryNumber}`);
        await action();

        if (await this.hasSelector(locator) > 0) {
          console.print(`retryUntilInvisible(${locator}): error present after try #${tryNumber} was executed`);
        } else {
          console.log(`retryUntilInvisible(${locator}): error not present after try #${tryNumber} was executed`);
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
    async retryUntilExists(action, locator, maxNumberOfTries = 6, timeout) {
      for (let tryNumber = 1; tryNumber <= maxNumberOfTries; tryNumber++) {
        output.log(`retryUntilExists(${locator}): starting try #${tryNumber}`);
        if (tryNumber > 1 && await this.hasSelector(locator)) {
          console.log(`retryUntilExists(${locator}): element found before try #${tryNumber} was executed`);
          break;
        }
        await action();
        if (await this.waitForSelector(locator, timeout) != null) {
          console.log(`retryUntilExists(${locator}): element found after try #${tryNumber} was executed`);
          break;
        } else {
          console.log(`retryUntilExists(${locator}): element not found after try #${tryNumber} was executed`);
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

    async createCaseSpec(applicantType, defendantType, litigantInPerson = false, claimAmount) {
      this.click('Create case');
      this.waitForElement(`#cc-jurisdiction > option[value="${config.definition.jurisdiction}"]`);
      await this.retryUntilExists(() => specCreateCasePage.selectCaseType(), 'ccd-markdown');
      await this.clickContinue();
      await this.clickContinue();
      await solicitorReferencesPage.enterReferences();
      await specPartyDetails.enterDetails('applicant1', address, applicantType);
      await claimantSolicitorIdamDetailsPage.enterUserEmail();
      await claimantSolicitorOrganisationLRspec.enterOrganisationDetails();
      await specParty.enterSpecParty('Applicant', specClaimantLRPostalAddress);
      await specPartyDetails.enterDetails('respondent1', address, defendantType);
      if (litigantInPerson) {
        await specRespondentRepresentedPage.enterRespondentRepresented('no');
      } else {
        await specRespondentRepresentedPage.enterRespondentRepresented('yes');
        await defendantSolicitorOrganisationLRspec.enterOrganisationDetails('respondent1');
        await specDefendantSolicitorEmailPage.enterSolicitorEmail();
      }
      await specParty.enterSpecParty('Respondent', specDefendantLRPostalAddress);
      await detailsOfClaimPage.enterDetailsOfClaim();
      await specTimelinePage.addManually();
      await specAddTimelinePage.addTimeline();
      await specListEvidencePage.addEvidence();
      await specClaimAmountPage.addClaimItem(claimAmount);
      await this.clickContinue();
      await specInterestPage.addInterest();
      await specInterestValuePage.selectInterest();
      await specInterestRatePage.selectInterestRate();
      await specInterestDateStartPage.selectInterestDateStart();
      await specInterestDateEndPage.selectInterestDateEnd();
      await this.clickContinue();
      await pbaNumberPage.selectPbaNumber();
      await paymentReferencePage.updatePaymentReference();
      await statementOfTruth.enterNameAndRole('claim');
      let expectedMessage = litigantInPerson ?
        'Your claim has been received and will progress offline' : 'Your claim has been received\nClaim number: ';
      await event.submit('Submit', expectedMessage);
      await event.returnToCaseDetails();
      caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
    },

    async acknowledgeClaimSpec() {
      eventName = ccdEvents.ACKNOWLEDGEMENT_OF_SERVICE.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.ACKNOWLEDGEMENT_OF_SERVICE, caseId),
        () => specConfirmDefendantsDetails.confirmDetails(),
        () => specConfirmLegalRepDetails.confirmDetails(),
        () => event.submit('Acknowledge claim', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async respondToClaimSpec(responseType, defenceType, paidAmount) {
      eventName = ccdEvents.DEFENDANT_RESPONSE_SPEC.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(ccdEvents.DEFENDANT_RESPONSE_SPEC, caseId),
        () => respondentCheckListPage.claimTimelineTemplate(),
        () => specConfirmDefendantsDetails.confirmDetails(),
        () => specConfirmLegalRepDetails.confirmDetails(),
        () => responseTypeSpecPage.selectResponseType(responseType),
        ...conditionalSteps(responseType === 'fullDefence', [
          () => defenceTypePage.selectDefenceType(defenceType, paidAmount)
        ]),
        ...conditionalSteps(defenceType === 'hasPaid' && paidAmount === 1000, [
          () => freeMediationPage.selectMediation('yes'),
          () => useExpertPage.claimExpert('no'),
          () => enterWitnessesPage.howManyWitnesses(),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => smallClaimsHearingPage.selectHearing('no'),
          () => chooseCourtSpecPage.chooseCourt('yes'),
        ]),
        ...conditionalSteps(paidAmount < 1000 && (defenceType === 'dispute' || defenceType === 'hasPaid'), [
          () => disputeClaimDetailsPage.enterReasons(),
          () => claimResponseTimelineLRspecPage.addManually(),
          () => this.clickContinue(),
          () => freeMediationPage.selectMediation('yes'),
          () => useExpertPage.claimExpert('no'),
          () => enterWitnessesPage.howManyWitnesses(),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => smallClaimsHearingPage.selectHearing('no'),
          () => chooseCourtSpecPage.chooseCourt('yes'),
        ]),
        ...conditionalSteps(defenceType === 'hasPaid' && paidAmount === 15000, [
          () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1),
          () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specRespondent1'),
          () => this.clickContinue(),
          () => disclosureReportPage.enterDisclosureReport(parties.RESPONDENT_SOLICITOR_1),
          () => expertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1),
          () => witnessPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => hearingLRspecPage.enterHearing(parties.RESPONDENT_SOLICITOR_1),
          () => chooseCourtSpecPage.chooseCourt('yes'),
        ]),
        ...conditionalSteps(paidAmount === 10000 && (defenceType === 'dispute' || defenceType === 'hasPaid'), [
          () => disputeClaimDetailsPage.enterReasons(),
          () => claimResponseTimelineLRspecPage.addManually(),
          () => this.clickContinue(),
          () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.RESPONDENT_SOLICITOR_1),
          () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments('specRespondent1'),
          () => this.clickContinue(),
          () => disclosureReportPage.enterDisclosureReport(parties.RESPONDENT_SOLICITOR_1),
          () => expertsPage.enterExpertInformation(parties.RESPONDENT_SOLICITOR_1),
          () => witnessPage.enterWitnessInformation(parties.RESPONDENT_SOLICITOR_1),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => hearingLRspecPage.enterHearing(parties.RESPONDENT_SOLICITOR_1),
          () => chooseCourtSpecPage.chooseCourt('yes'),
        ]),
        () => hearingSupportRequirementsPage.selectRequirements(parties.RESPONDENT_SOLICITOR_1),
        ...conditionalSteps(paidAmount <= 1000 && (defenceType === 'dispute' || defenceType === 'hasPaid'), [
          () => furtherInformationPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
        ]),
        ...conditionalSteps(paidAmount >= 10000 && (defenceType === 'dispute' || defenceType === 'hasPaid'), [
          () => furtherInformationLRspecPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
        ]),
        () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
        () => event.submit('Submit', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async navigateToCaseDetails(caseNumber) {
      await this.retryUntilExists(async () => {
        console.log(`Navigating to case: ${caseNumber}`);
        await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseNumber);
        await this.waitForSelector(SIGN_OUT_LINK, 30);
      }, SIGNED_IN_SELECTOR);
    },

    async navigateToHearingNoticePage(caseId) {
      console.log(`Navigating to Hearing notice screen: ${caseId}`);
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
      await this.waitForText('Application');
      await this.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/HEARING_SCHEDULED_GA/HEARING_SCHEDULED_GAHearingNoticeGADetail');
      await this.waitForText('Application details');
    },

    async acceptCookies() {
      await this.tryTo(() => this.click('Accept additional cookies', '#cookie-accept-submit'));
      await this.tryTo(() => this.click('Hide this', '#cookie-accept-all-success-banner-hide'));
    },

    async clickPayFeeLink() {
      await confirmationPage.clickPayFeeLink();
    },

    async navigateToApplicationsTab(caseNumber) {
      await caseViewPage.navigateToTab(caseNumber, 'Applications');
    },

    async verifyUploadedClaimDocument(civilCaseReference, docType) {
      await caseViewPage.navigateToTab(civilCaseReference, 'Claim documents');
      await claimDocumentPage.verifyUploadedDocument(docType);
    },

    async verifyUploadedApplicationDocument(gaCaseReference, docType) {
      await caseViewPage.navigateToTab(gaCaseReference, 'Application Documents');
      await applicationDocumentPage.verifyUploadedDocumentPDF(docType);
    },

    async navigateToMainCase(civilCaseNumber) {
      await this.navigateToCaseDetails(civilCaseNumber);
      await caseViewPage.clickOnTab('Applications');
      await caseViewPage.navigateToTab(civilCaseNumber, 'Applications');
    },

    async goToGeneralAppScreenAndVerifyAllApps(appTypes, caseNumber) {
      eventName = gaEvents.INITIATE_GENERAL_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.start(eventName),
        () => applicationTypePage.verifyAllApplicationTypes(appTypes, caseNumber),
      ]);
    },

    async fillHearingNotice(caseNumber, partyType, location, channel) {
      await appDetailsPage.verifyErrorMsg();
      await appDetailsPage.fillApplicationDetails(partyType);
      await hearingSchedulePage.verifyErrorMsg(location);
      await hearingSchedulePage.fillHearingDetails(location, channel);
      await hearingNoticeCYAPage.verifyNoticeCheckAnswerForm(caseNumber);
      await event.submit('Submit', 'Hearing notice created');
    },

    async grabChildCaseNumber() {
      this.waitInUrl('#Applications', 3);
      return await this.grabTextFrom('.collection-field-table a span');
    },

    async respondToApplication(caseId, consentCheck, hearingScheduled, trialRequired, unavailableTrailRequired, supportRequirement, appTypes) {
      eventName = gaEvents.RESPOND_TO_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.RESPOND_TO_APPLICATION,caseId),
        () => respConsentCheckPage.selectConsentCheck(consentCheck),
        () => respHearingDetailsPage.isRespHearingScheduled(hearingScheduled),
        () => respHearingDetailsPage.isRespTrialRequired(trialRequired),
        () => respHearingDetailsPage.selectRespHearingPreferences('inPerson'),
        () => respHearingDetailsPage.selectRespHearingDuration('fortyFiveMin'),
        () => respHearingDetailsPage.isRespUnavailableTrailRequired(unavailableTrailRequired),
        () => respHearingDetailsPage.selectRespVulnerabilityQuestions('no'),
        () => respHearingDetailsPage.selectRespSupportRequirement(supportRequirement),
        () => responseCheckYourAnswersPage.respVerifyCheckAnswerForm(caseId),
        ...submitApplication('You have provided the requested info'),
        () => responseConfirmationPage.verifyRespConfirmationPage(),
        () => responseConfirmationPage.verifyRespApplicationType(appTypes),
      ]);
    },

    async respondToVaryJudgementApp(caseId, appTypes, type, paymentPlanType) {
      eventName = gaEvents.RESPOND_TO_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.RESPOND_TO_APPLICATION,caseId),
        () => respondentDebtorResponsePage.selectDebtorOffer(type, paymentPlanType),
        () => respHearingDetailsPage.isRespHearingScheduled('yes'),
        () => respHearingDetailsPage.isRespTrialRequired('yes'),
        () => respHearingDetailsPage.selectRespHearingPreferences('inPerson'),
        () => respHearingDetailsPage.selectRespHearingDuration('fortyFiveMin'),
        () => respHearingDetailsPage.isRespUnavailableTrailRequired('no'),
        () => respHearingDetailsPage.selectRespVulnerabilityQuestions('no'),
        () => respHearingDetailsPage.selectRespSupportRequirement('signLanguageInterpreter'),
        () => responseCheckYourAnswersPage.respVerifyCheckAnswerForm(caseId),
        ...submitApplication('You have provided the requested info'),
        () => responseConfirmationPage.verifyRespConfirmationPage(),
        () => responseConfirmationPage.verifyRespApplicationType(appTypes),
      ]);
    },

    async respondToSameApplicationAndVerifyErrorMsg() {
      await this.triggerStepsWithScreenshot([
        () => responseConfirmationPage.verifyAlreadyRespondedErrorMessage(),
      ]);
    },

    async judgeMakeDecision(decision, order, notice, caseNumber, documentType, orderType) {
      eventName = gaEvents.MAKE_DECISION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.MAKE_DECISION, caseNumber),
        () => judgeDecisionPage.selectJudgeDecision(decision),
        () => makeAnOrderPage.selectAnOrder(order, notice, orderType),
        () => reviewOrderDocumentPage.reviewOrderDocument(documentType),
        () => judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber),
        ...submitApplication('Your order has been made'),
        () => judgesConfirmationPage.verifyJudgesConfirmationPage(),
      ]);
    },

    async judgeRequestMoreInfo(decision, infoType, caseNumber, withoutNotice, documentType) {
      eventName = gaEvents.MAKE_DECISION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.MAKE_DECISION, caseNumber),
        () => judgeDecisionPage.selectJudgeDecision(decision),
        () => requestMoreInfoPage.requestMoreInfoOrder(infoType, withoutNotice),
        () => reviewOrderDocumentPage.reviewOrderDocument(documentType),
        () => judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber),
        ...conditionalSteps(infoType === 'requestMoreInformation', [
          ...submitApplication('You have requested more information'),
        ]),
        ...conditionalSteps(infoType === 'sendApplicationToOtherParty', [
          ...submitApplication('You have requested a response'),
        ]),
        () => judgesConfirmationPage.verifyReqMoreInfoConfirmationPage(),
      ]);
    },

    async approveConsentOrder(gaCaseNumber) {
      eventName = gaEvents.APPROVE_CONSENT_ORDER.name;

      if (config.runWAApiTest || ['demo'].includes(config.runningEnv)) {
        await this.amOnPage(config.url.manageCase + '/cases/case-details/' + gaCaseNumber + '/tasks');
        await this.waitForElement('#event');
        await this.forceClick('#action_claim');
        await this.waitForElement('#action_reassign');
        await this.waitForText('ReviewApplication', 8);
        await this.wait(3);
      }

      await caseViewPage.startEventWithUrl(gaEvents.APPROVE_CONSENT_ORDER, gaCaseNumber);
      await consentOrderPage.approveConsentOrder();
      await consentOrderReviewPage.reviewOrderDocument();
      await consentOrderCYAPage.verifyConsentOrderCheckAnswerForm(gaCaseNumber, 1);
      await event.submit('Submit', 'Your order has been made');
      await judgesConfirmationPage.closeAndReturnToCaseDetails();
    },

    async judgeMakeAppOrder(gaCaseNumber, orderType, formType) {
      let workingDay = await dateNoWeekendsBankHolidayNextDay(0);

      if (orderType === 'freeFromOrder') {
        workingDay = await dateNoWeekendsBankHolidayNextDay(7);
      }
      eventName = gaEvents.GENERATE_DIRECTIONS_ORDER.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.GENERATE_DIRECTIONS_ORDER, gaCaseNumber),
        () => judgeOrderPage.verifyErrorMessage(),
        () => judgeOrderPage.selectOrderType(orderType),
        ...conditionalSteps(orderType === 'freeFromOrder', [
          () => freeFormOrderPage.verifyFreeFromErrorMessage(),
          () => freeFormOrderPage.fillFreeFormOrder(orderType, formType, workingDay),
        ]),
        ...conditionalSteps(orderType === 'assistedOrder', [
          () => assistedOrderPage.verifyAssistedOrderErrorMessage(),
          () => assistedOrderPage.isOrderMade('yes', orderType),
          () => assistedOrderPage.fillJudgeHeardForm(),
          () => assistedOrderPage.fillRecitals(),
          () => assistedOrderPage.selectCosts(),
          () => assistedOrderPage.selectFurtherHearing(),
          () => assistedOrderPage.selectAppeal(),
          () => assistedOrderPage.selectOrderType(formType),
          () => assistedOrderPage.selectReasons(),
        ]),
        () => reviewAppOrderDocumentPage.reviewOrderDocument(),
        ...conditionalSteps(orderType === 'freeFromOrder', [
          () => appOrderCYAPage.verifyAppOrderCheckAnswerForm(gaCaseNumber, 7),
          ...submitApplication('Your order has been issued'),
          () => appOrderConfirmationPage.verifyFFConfirmationPage(),
        ]),
        ...conditionalSteps(orderType === 'assistedOrder', [
          () => appOrderCYAPage.verifyAppOrderCheckAnswerForm(gaCaseNumber, 22),
          ...submitApplication('Your order has been issued'),
          () => appOrderConfirmationPage.verifyAOConfirmationPage(),
        ]),
      ]);
    },

    async respondToJudgeAdditionalInfo(caseNumber) {
      eventName = gaEvents.RESPOND_TO_JUDGE_ADDITIONAL_INFO.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.RESPOND_TO_JUDGE_ADDITIONAL_INFO, caseNumber),
        () => uploadScreenPage.uploadSupportingFile(gaEvents.RESPOND_TO_JUDGE_ADDITIONAL_INFO.id, TEST_FILE_PATH),
        ...submitSupportingDocument(eventName),
        () => caseViewPage.navigateToTab(caseNumber, 'Application Documents'),
        () => applicationDocumentPage.verifyUploadedFile('Additional information', 'examplePDF.pdf'),
      ]);
    },

    async payAndVerifyGAStatus(civilCaseReference, gaCaseReference, ccdState, user, gaStatus) {
      console.log(`GA Payment using API: ${gaCaseReference}`);
      await apiRequest.paymentApiRequestUpdateServiceCallback(
        genAppJudgeMakeDecisionData.serviceUpdateDtoWithoutNotice(gaCaseReference,'Paid'));
      console.log(`Waiting for GA payment to complete: ${gaCaseReference}, expected state: ${ccdState}`);
      await waitForGACamundaEventsFinishedBusinessProcess(gaCaseReference,
        ccdState, user);
      console.log(`GA payment for ID: ${gaCaseReference} done successfully with expected state: ${ccdState}`);
      await caseViewPage.navigateToTab(civilCaseReference, 'Applications');
      await this.see(gaStatus);
      await this.waitForSelector(SIGN_OUT_LINK, 30);
    },

    async payForGA(gaCaseReference) {
      await caseViewPage.navigateToTab(gaCaseReference, 'Service Request');
      await serviceRequestPage.payGAAmount();
      await serviceRequestPage.verifyPaymentDetails();
    },

    async verifyCaseFileAppDocument(civilCaseReference, documentType) {
      await caseViewPage.navigateToTab(civilCaseReference, 'Case File');
      await this.waitForSelector('.cdk-tree', 30);
      await caseFileDocPage.verifyCaseFileAppDocument(documentType);
    },

    async verifyCaseFileOrderDocument(civilCaseReference, documentType) {
      await caseViewPage.navigateToTab(civilCaseReference, 'Case File');
      await this.waitForSelector('.cdk-tree', 30);
      await caseFileDocPage.verifyCaseFileOrderDocument(documentType);
    },

    async verifyHearingNoticeDocNotAvailable(civilCaseReference) {
      await caseViewPage.navigateToTab(civilCaseReference, 'Claim documents');
      await claimDocumentPage.verifyHearingNoticeDocNotAvailable();
    },

    async respondToJudgesDirections(caseNumber) {
      eventName = gaEvents.RESPOND_TO_JUDGE_DIRECTIONS.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.RESPOND_TO_JUDGE_DIRECTIONS, caseNumber),
        () => uploadScreenPage.uploadSupportingFile(gaEvents.RESPOND_TO_JUDGE_DIRECTIONS.id, TEST_FILE_PATH),
        ...submitSupportingDocument(eventName),
        () => caseViewPage.navigateToTab(caseNumber, 'Application Documents'),
        () => applicationDocumentPage.verifyUploadedFile('Directions order', 'examplePDF.pdf'),
      ]);
    },

    async respondToJudgesWrittenRep(caseNumber, documentType) {
      eventName = gaEvents.RESPOND_TO_JUDGE_WRITTEN_REPRESENTATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.RESPOND_TO_JUDGE_WRITTEN_REPRESENTATION, caseNumber),
        () => uploadScreenPage.uploadSupportingFile(gaEvents.RESPOND_TO_JUDGE_WRITTEN_REPRESENTATION.id, TEST_FILE_PATH),
        ...submitSupportingDocument(eventName),
        () => caseViewPage.navigateToTab(caseNumber, 'Application Documents'),
        () => applicationDocumentPage.verifyUploadedFile(documentType, 'examplePDF.pdf'),
      ]);
    },

    async judgeListForAHearingDecision(decision, caseNumber, notice, documentType) {
      eventName = gaEvents.MAKE_DECISION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.MAKE_DECISION, caseNumber),
        () => judgeDecisionPage.selectJudgeDecision(decision),
        () => listForHearingPage.selectJudicialHearingPreferences('inPerson'),
        () => listForHearingPage.selectJudicialTimeEstimate('fifteenMin'),
        () => listForHearingPage.verifyVulnerabilityQuestions(),
        () => listForHearingPage.selectJudicialSupportRequirement('disabledAccess'),
        () => drawGeneralOrderPage.verifyHearingDetailsGeneralOrderScreen('video', '15 minutes', notice, 'withoutNoticeOrder'),
        () => reviewOrderDocumentPage.reviewOrderDocument(documentType),
        () => judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber),
        ...submitApplication('Your order has been made'),
        () => judgesConfirmationPage.verifyJudgesConfirmationPage(),
      ]);
    },

    judgeListForAHearingDecisionWA: async function (decision, caseNumber, notice, documentType) {
      await judgeDecisionPage.selectJudgeDecision(decision);
      await listForHearingPage.selectJudicialHearingPreferences('inPerson');
      await listForHearingPage.selectJudicialTimeEstimate('fifteenMin');
      await listForHearingPage.verifyVulnerabilityQuestions();
      await listForHearingPage.selectJudicialSupportRequirement('disabledAccess');
      await drawGeneralOrderPage.verifyHearingDetailsGeneralOrderScreen('video', '15 minutes', notice, 'noneOrder');
      await reviewOrderDocumentPage.reviewOrderDocument(documentType);
      await judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber);
      await event.submit('Submit', 'Your order has been made');
      await judgesConfirmationPage.verifyJudgesConfirmationPage();
    },

    async judgeApproveAnOrderWA(decision, order, consentCheck, caseNumber, documentType) {
      await judgeDecisionPage.selectJudgeDecision(decision);
      await makeAnOrderPage.selectAnOrder(order, consentCheck, 'noneOrder');
      await reviewOrderDocumentPage.reviewOrderDocument(documentType);
      await judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber);
      await event.submit('Submit', 'Your order has been made');
      await judgesConfirmationPage.verifyJudgesConfirmationPage();
    },

    async judgeWrittenRepresentationsDecision(decision, representationsType, caseNumber, notice, documentType, orderType) {
      eventName = gaEvents.MAKE_DECISION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.MAKE_DECISION, caseNumber),
        ...conditionalSteps(notice !== 'withOutNotice', [
          () => judgeDecisionPage.selectJudgeDecision(decision),
          () => writtenRepresentationsPage.selectWrittenRepresentations(representationsType),
          () => drawGeneralOrderPage.verifyWrittenRepresentationsDrawGeneralOrderScreen(representationsType, notice, orderType),
          () => reviewOrderDocumentPage.reviewOrderDocument(documentType),
          () => judgesCheckYourAnswers.verifyJudgesCheckAnswerForm(caseNumber),
          ...submitApplication('Your order has been made'),
          () => judgesConfirmationPage.verifyJudgesConfirmationPage(),
        ]),
        ...conditionalSteps(notice === 'withOutNotice', [
          () => judgeDecisionPage.judgeMakeDecisionForWithoutNotice(decision),
          () => judgeDecisionPage.verifyWrittenRepErrorMessage(),
        ]),
      ]);
    },

    async verifyResponseSummaryPage() {
      await this.triggerStepsWithScreenshot([
        () => responseSummaryPage.verifySummaryPageAfterResponding(),
      ]);
    },

    // eslint-disable-next-line no-unused-vars
    async verifyJudgesSummaryPage(decisionType, consentCheck, applicantName) {
      // await judgesSummary.verifyJudgesSummaryPage(decisionType, consentCheck, applicantName);
    },

    async verifyApplicantSummaryPage() {
      await this.triggerStepsWithScreenshot([
        () => applicantSummaryPage.verifySummaryPage(),
      ]);
    },

    async verifyN245FormElements() {
      await this.triggerStepsWithScreenshot([
        () => applicantSummaryPage.verifyN245FormElements(),
      ]);
    },

    async verifyNoServiceReqElements() {
      await this.triggerStepsWithScreenshot([
        () => applicantSummaryPage.verifyNoServiceReqElements(),
      ]);
    },

    async clickAndVerifyTab(caseNumber, tabName, appType, appCount) {
      await this.triggerStepsWithScreenshot([
        () => confirmationPage.closeAndReturnToCaseDetails(),
        () => caseViewPage.navigateToTab(caseNumber, tabName),
        () => applicationTab.verifyApplicationDetails(appType, appCount),
      ]);
    },

    async clickOnTab(tabName) {
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.clickOnTab(tabName),
      ]);
    },

    async closeAndReturnToCaseDetails() {
      await this.triggerStepsWithScreenshot([
        () => confirmationPage.closeAndReturnToCaseDetails(),
      ]);
    },

    async judgeCloseAndReturnToCaseDetails() {
      await this.triggerStepsWithScreenshot([
        () => judgesConfirmationPage.closeAndReturnToCaseDetails(),
      ]);
    },

    async respCloseAndReturnToCaseDetails() {
      await this.triggerStepsWithScreenshot([
        () => responseConfirmationPage.closeAndReturnToCaseDetails(),
      ]);
    },

    async initiateVaryJudgementGA(caseId, appTypes, hearingScheduled, consentCheck, isUrgent) {
      eventName = gaEvents.INITIATE_GENERAL_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.INITIATE_GENERAL_APPLICATION, caseId),
        ...selectApplicationType(appTypes),
        () => hearingDatePage.selectHearingScheduled(hearingScheduled),
        () => n245FormPage.uploadN245Form(TEST_FILE_PATH),
        ...selectConsentCheck(consentCheck),
        ...isUrgentApplication(isUrgent),
        ...enterApplicationDetails(),
        ...fillHearingDetails(hearingScheduled,  'no', 'no', 'yes', 'disabledAccess'),
        ...verifyApplicationFee(consentCheck, 'no', appTypes),
        ...verifyCheckAnswerForm(caseId, consentCheck),
        ...submitApplication('You have submitted an application'),
        ...verifyGAConfirmationPage(caseId, consentCheck, 'no', appTypes),
      ]);
    },

    async verifyNoN245Form(caseId, appTypes, hearingScheduled) {
      eventName = gaEvents.INITIATE_GENERAL_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.INITIATE_GENERAL_APPLICATION, caseId),
        () => applicationTypePage.chooseAppType(getAppTypes().slice(6, 11)),
        ...selectApplicationType(appTypes),
        () => hearingDatePage.selectHearingScheduled(hearingScheduled),
        () => consentCheckPage.notInN245FormPage(),
        () => this.clickOnElement('Cancel'),
        () => caseViewPage.verifySummaryPage()
       ]);
    },

    async createGeneralApplication(appTypes, caseId, consentCheck, isUrgent, notice, hearingScheduled, trialRequired, unavailableTrailRequired, supportRequirement) {
      eventName = gaEvents.INITIATE_GENERAL_APPLICATION.name;
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEventWithUrl(gaEvents.INITIATE_GENERAL_APPLICATION, caseId),
        ...selectApplicationType(appTypes),
        () => hearingDatePage.selectHearingScheduled(hearingScheduled),
        ...selectConsentCheck(consentCheck),
        ...isUrgentApplication(isUrgent),
        ...conditionalSteps(consentCheck === 'no', [
          ...selectNotice(notice),
        ]),
        ...enterApplicationDetails(),
        ...fillHearingDetails(hearingScheduled, trialRequired, unavailableTrailRequired, 'yes', supportRequirement),
        ...verifyApplicationFee(consentCheck, notice, appTypes),
        ...verifyCheckAnswerForm(caseId, consentCheck),
        ...clickOnHearingDetailsChangeLink(consentCheck),
        ...updateHearingDetails(),
        ...submitApplication('You have submitted an application'),
        ...verifyGAConfirmationPage(caseId, consentCheck, notice, appTypes),
      ]);
      await this.takeScreenshot();
    },

    async verifyNoAccessToGeneralApplications(errorMsg) {
      await this.triggerStepsWithScreenshot([
        ...selectGAAndVerifyErrorMessage('Create GA', errorMsg),
      ]);
      await this.takeScreenshot();
    }
  });
};
