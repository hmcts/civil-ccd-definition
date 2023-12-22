// in this file you can append custom step methods to 'I' object

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

const selectDefendantSolicitorToNotifyPage = require('./pages/notifyClaim/selectDefendantSolicitorToNotify.page');
const cosNotifyClaimPage = require('./pages/notifyClaim/certificateOfServiceNotifyClaim.page');
const cosNotifyClaimDetailsPage = require('./pages/notifyClaimDetails/certificateOfServiceNotifyClaimDetails.page');

const cosNotifyClaimCYAPage = require('./pages/cosNotifyClaimCYA.page');
const cosTab = require('./pages/cosTab.page');


const selectDefendantSolicitorPage = require('./pages/notifyClaimDetails/selectDefendantSolicitor.page');
const unspecifiedSelectCaseNote = require('./pages/addCaseNotes/selectCaseNote.js');
const unspecifiedAddDocumentAndNotes = require('./pages/addCaseNotes/addDocumentAndNotes.js');

const responseIntentionPage = require('./pages/acknowledgeClaim/responseIntention.page');

const caseProceedsInCasemanPage = require('./pages/caseProceedsInCaseman/caseProceedsInCaseman.page');
const takeCaseOffline = require('./pages/caseProceedsInCaseman/takeCaseOffline.page');

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
const singleResponse = require('./fragments/singleResponse.page');

const unRegisteredDefendantSolicitorOrganisationPage = require('./pages/createClaim/unRegisteredDefendantSolicitorOrganisation.page');
const sumOfDamagesToBeDecidedPage = require('./pages/selectSDO/sumOfDamagesToBeDecided.page');
const allocateSmallClaimsTrackPage = require('./pages/selectSDO/allocateSmallClaimsTrack.page');
const allocateClaimPage = require('./pages/selectSDO/allocateClaimType.page');
const sdoOrderTypePage = require('./pages/selectSDO/sdoOrderType.page');
const smallClaimsSDOOrderDetailsPage = require('./pages/selectSDO/unspecClaimsSDOOrderDetails.page');

// DQ fragments
const fileDirectionsQuestionnairePage = require('./fragments/dq/fileDirectionsQuestionnaire.page');
const fixedRecoverableCostsPage = require('./fragments/dq/fixedRecoverableCosts.page');
const disclosureOfElectronicDocumentsPage = require('./fragments/dq/disclosureOfElectrionicDocuments.page');
const disclosureOfNonElectronicDocumentsPage = require('./fragments/dq/disclosureOfNonElectrionicDocuments.page');
const expertsPage = require('./fragments/dq/experts.page');
const witnessPage = require('./fragments/dq/witnesses.page');
const hearingPage = require('./fragments/dq/hearing.page');
const draftDirectionsPage = require('./fragments/dq/draftDirections.page');
const requestedCourtPage = require('./fragments/dq/requestedCourt.page');
const hearingSupportRequirementsPage = require('./fragments/dq/hearingSupportRequirements.page');
const vulnerabilityQuestionsPage = require('./fragments/dq/vulnerabilityQuestions.page');
const furtherInformationPage = require('./fragments/dq/furtherInformation.page');
const welshLanguageRequirementsPage = require('./fragments/dq/language.page');
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
const hearingNoticeListPage = require('./pages/caseProgression/hearingNoticeList.page');
const hearingNoticeListTypePage = require('./pages/caseProgression/hearingNoticeListingType.page');
const hearingScheduledChooseDetailsPage = require('./pages/caseProgression/hearingScheduledChooseDetails.page');
const hearingScheduledMoreInfoPage = require('./pages/caseProgression/hearingScheduledMoreInfo.page');
const confirmTrialReadinessPage = require('./pages/caseProgression/confirmTrialReadiness.page');


const selectLitigationFriendPage = require('./pages/selectLitigationFriend/selectLitigationFriend.page.ts');
const unspecifiedDefaultJudmentPage = require('./pages/defaultJudgment/requestDefaultJudgmentforUnspecifiedClaims');
const unspecifiedEvidenceUpload = require('./pages/evidenceUpload/uploadDocument');
const specifiedDefaultJudmentPage = require('./pages/defaultJudgment/requestDefaultJudgmentforSpecifiedClaims');

const addUnavailableDatesPage = require('./pages/addUnavailableDates/unavailableDates.page');

const createCaseFlagPage = require('./pages/caseFlags/createCaseFlags.page');
const manageCaseFlagsPage = require('./pages/caseFlags/manageCaseFlags.page');
const noticeOfChange = require('./pages/noticeOfChange.page');
const {checkToggleEnabled} = require('./api/testingSupport');
const {PBAv3} = require('./fixtures/featureKeys');

const SIGNED_IN_SELECTOR = 'exui-header';
const SIGNED_OUT_SELECTOR = '#global-header';
const CASE_HEADER = 'ccd-case-header > h1';

const TEST_FILE_PATH = './e2e/fixtures/examplePDF.pdf';
const CLAIMANT_NAME = 'Test Inc';
const DEFENDANT1_NAME = 'Sir John Doe';
const DEFENDANT2_NAME = 'Dr Foo Bar';

const CONFIRMATION_MESSAGE = {
  online: 'Your claim has been received\nClaim number: ',
  offline: 'Your claim has been received and will progress offline',
  pbaV3Online: 'Please now pay your claim fee\nusing the link below'
};

let caseId, screenshotNumber, eventName, currentEventName, loggedInUser;
let eventNumber = 0;

const getScreenshotName = () => eventNumber + '.' + screenshotNumber + '.' + eventName.split(' ').join('_') + '.jpg';
const conditionalSteps = (condition, steps) => condition ? steps : [];

const firstClaimantSteps = () => [
  () => party.enterParty(parties.APPLICANT_SOLICITOR_1, address),
  () => claimantLitigationDetails.enterLitigantFriend(parties.APPLICANT_SOLICITOR_1, address, TEST_FILE_PATH),
  () => claimantSolicitorIdamDetailsPage.enterUserEmail(),
  () => claimantSolicitorOrganisation.enterOrganisationDetails(),
  () => claimantSolicitorServiceAddress.enterOrganisationServiceAddress()
];
const secondClaimantSteps = (claimant2) => [
  () => addAnotherClaimant.enterAddAnotherClaimant(claimant2),
  ...conditionalSteps(claimant2, [
    () => party.enterParty(parties.APPLICANT_SOLICITOR_2, address),
    () => claimantLitigationDetails.enterLitigantFriend(parties.APPLICANT_SOLICITOR_2, false, TEST_FILE_PATH),]
  )
];
const firstDefendantSteps = (respondent1) => [
  () => party.enterParty(parties.RESPONDENT_SOLICITOR_1, address),
  () => respondentRepresentedPage.enterRespondentRepresented(parties.RESPONDENT_SOLICITOR_1, respondent1.represented),
  ...conditionalSteps(respondent1.represented, [
    () => defendantSolicitorOrganisation.enterOrganisationDetails('1', respondent1.representativeOrgNumber),
    ...conditionalSteps(!respondent1.representativeRegistered, [
      () => unRegisteredDefendantSolicitorOrganisationPage.enterDefendantSolicitorDetails('1')
    ]),
    ...conditionalSteps(respondent1.representativeRegistered, [
      () => defendantSolicitorServiceAddress.enterOrganisationServiceAddress(),
      () => defendantSolicitorEmail.enterSolicitorEmail('1')
    ]),
  ]),
];
const secondDefendantSteps = (respondent2, respondent1Represented, twoVOneScenario = false) => [
  ...conditionalSteps(!twoVOneScenario, [
    () => addAnotherDefendant.enterAddAnotherDefendant(!!respondent2)
  ]),
  ...conditionalSteps(respondent2, [
    () => party.enterParty('respondent2', address),
    () => respondentRepresentedPage.enterRespondentRepresented(parties.RESPONDENT_SOLICITOR_2, respondent2.represented),
    ...conditionalSteps(respondent2 && respondent2.represented, [
      ...conditionalSteps(respondent1Represented, [
        () => respondent2SameLegalRepresentative.enterRespondent2SameLegalRepresentative(respondent2.sameLegalRepresentativeAsRespondent1),
      ]),
      ...conditionalSteps(respondent2 && !respondent2.sameLegalRepresentativeAsRespondent1, [
        () => defendantSolicitorOrganisation.enterOrganisationDetails('2',
          respondent2.representativeOrgNumber),
        () => secondDefendantSolicitorServiceAddress.enterOrganisationServiceAddress(),
        () => secondDefendantSolicitorReference.enterReference(),
        () => defendantSolicitorEmail.enterSolicitorEmail('2')
      ])
    ])
  ])
];

const defenceSteps = ({party, twoDefendants = false, sameResponse = false, defendant1Response, defendant2Response, defendant1ResponseToApplicant2}) =>
  [() => respondentDetails.verifyDetails(
    defendant1Response ? parties.RESPONDENT_SOLICITOR_1 : null,
    defendant2Response ? parties.RESPONDENT_SOLICITOR_2 : null),
    ...conditionalSteps(twoDefendants, [
      () => singleResponse.defendantsHaveSameResponse(sameResponse),
    ]),
    () => responseTypePage.selectResponseType({defendant1Response, defendant2Response, defendant1ResponseToApplicant2}),
    () => confirmDetailsPage.confirmReferences(defendant1Response, defendant2Response, sameResponse),
    ...conditionalSteps(defendant1Response === 'fullDefence' || defendant2Response === 'fullDefence', [
      () => uploadResponsePage.uploadResponseDocuments(party, TEST_FILE_PATH)
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
      }
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

    async createCase(claimant1, claimant2, respondent1, respondent2, claimValue = 30000, shouldStayOnline = true) {
      eventName = 'Create case';

      const twoVOneScenario = claimant1 && claimant2;
      await createCasePage.createCase(config.definition.jurisdiction);
      const pbaV3 = await checkToggleEnabled(PBAv3);

      let steps = pbaV3 ? [
        () => continuePage.continue(),
        () => solicitorReferencesPage.enterReferences(),
        () => chooseCourtPage.selectCourt(),
        ...firstClaimantSteps(),
        ...secondClaimantSteps(claimant2),
        ...firstDefendantSteps(respondent1),
        ...secondDefendantSteps(respondent2, respondent1.represented, twoVOneScenario),
        () => claimTypePage.selectClaimType(),
        () => personalInjuryTypePage.selectPersonalInjuryType(),
        () => detailsOfClaimPage.enterDetailsOfClaim(),
        () => uploadParticularsOfClaimQuestion.chooseYesUploadParticularsOfClaim(),
        () => uploadParticularsOfClaim.upload(TEST_FILE_PATH),
        () => claimValuePage.enterClaimValue(claimValue),
        () => pbaNumberPage.clickContinue(),
        () => statementOfTruth.enterNameAndRole('claim'),
        () => event.submit('Submit',
          shouldStayOnline ? CONFIRMATION_MESSAGE.pbaV3Online : CONFIRMATION_MESSAGE.offline),
        () => event.returnToCaseDetails(),
      ] : [
        () => continuePage.continue(),
        () => solicitorReferencesPage.enterReferences(),
        () => chooseCourtPage.selectCourt(),
        ...firstClaimantSteps(),
        ...secondClaimantSteps(claimant2),
        ...firstDefendantSteps(respondent1),
        ...secondDefendantSteps(respondent2, respondent1.represented, twoVOneScenario),
        () => claimTypePage.selectClaimType(),
        () => personalInjuryTypePage.selectPersonalInjuryType(),
        () => detailsOfClaimPage.enterDetailsOfClaim(),
        () => uploadParticularsOfClaimQuestion.chooseYesUploadParticularsOfClaim(),
        () => uploadParticularsOfClaim.upload(TEST_FILE_PATH),
        () => claimValuePage.enterClaimValue(claimValue),
        () => pbaNumberPage.selectPbaNumber(),
        () => paymentReferencePage.updatePaymentReference(),
        () => statementOfTruth.enterNameAndRole('claim'),
        () => event.submit('Submit',
          shouldStayOnline ? CONFIRMATION_MESSAGE.online : CONFIRMATION_MESSAGE.offline),
        () => event.returnToCaseDetails(),
      ];

      await this.triggerStepsWithScreenshot(steps);

      caseId = (await this.grabCaseNumber()).split('-').join('').substring(1);
    },

    async checkForCaseFlagsEvent() {
      eventName = 'Create case flags';
      const eventNames = ['Create case flags', 'Manage case flags'];

      await this.triggerStepsWithScreenshot([
          () => caseViewPage.assertEventsAvailable(eventNames),
      ]);
    },

    async notifyClaim(solicitorToNotify) {
      eventName = 'Notify claim';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        ...conditionalSteps(!!solicitorToNotify, [
          () => selectDefendantSolicitorToNotifyPage.selectSolicitorToNotify(solicitorToNotify),
        ]),
        () => continuePage.continue(),
        () => event.submit('Submit', 'Notification of claim sent'),
        () => event.returnToCaseDetails()
      ]);
    },

    async notifyClaimDetails(solicitorToNotify) {
      eventName = 'Notify claim details';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        ...conditionalSteps(!!solicitorToNotify, [
          () => selectDefendantSolicitorPage.selectSolicitorToNotify(solicitorToNotify),
        ]),
        () => continuePage.continue(),
        () => event.submit('Submit', 'Defendant notified'),
        () => event.returnToCaseDetails()
      ]);
    },

    async initiateDJUnspec(caseNumber, scenario) {
      caseId = caseNumber;
      eventName = 'Request Default Judgment';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => unspecifiedDefaultJudmentPage.againstWhichDefendant(scenario),
        () => unspecifiedDefaultJudmentPage.statementToCertify(scenario),
        () => unspecifiedDefaultJudmentPage.hearingSelection(),
        () => unspecifiedDefaultJudmentPage.hearingRequirements(),
        () => event.submit('Submit', 'Judgment for damages to be decided Granted'),
        () => event.returnToCaseDetails()
      ]);
    },

    async initiateDJSpec(caseId, scenario) {
      eventName = 'Request Default Judgment';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => specifiedDefaultJudmentPage.againstWhichDefendant(scenario),
        () => specifiedDefaultJudmentPage.statementToCertify(scenario),
        () => specifiedDefaultJudmentPage.hasDefendantMadePartialPayment(),
        () => specifiedDefaultJudmentPage.claimForFixedCosts(),
        () => specifiedDefaultJudmentPage.repaymentSummary(),
        () => specifiedDefaultJudmentPage.paymentTypeSelection(),
        () => event.submit('Submit', 'Default Judgment Granted'),
        () => event.returnToCaseDetails()
      ]);
    },

    async judgePerformDJDirectionOrder() {
      eventName = 'STANDARD_DIRECTION_ORDER_DJ';
      await this.triggerStepsWithScreenshot([
        () => unspecifiedDefaultJudmentPage.selectCaseManagementOrder('DisposalHearing'),
        () => unspecifiedDefaultJudmentPage.selectOrderAndHearingDetailsForDJTask('DisposalHearing'),
        () => unspecifiedDefaultJudmentPage.verifyOrderPreview(),
        () => event.submit('Submit', 'Your order has been issued')
      ]);
    },

    async judgeAddsCaseNotes() {
      eventName = 'EVIDENCE_UPLOAD_JUDGE';
      await this.triggerStepsWithScreenshot([
        () => unspecifiedSelectCaseNote.selectCaseNotes(),
        () => unspecifiedAddDocumentAndNotes.addDocumentAndNotes(TEST_FILE_PATH),
        () => event.submit('Submit', 'Document uploaded and note added')
      ]);
    },

    async staffPerformDJCaseTransferCaseOffline(caseId) {
      await this.triggerStepsWithScreenshot([
        () => unspecifiedDefaultJudmentPage.performAndVerifyTransferCaseOffline(caseId)
      ]);
    },

    async acknowledgeClaim(respondent1Intention, respondent2Intention, respondent1ClaimIntentionApplicant2, sameSolicitor = false) {
      eventName = 'Acknowledge claim';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => respondentDetails.verifyDetails(),
        () => responseIntentionPage.selectResponseIntention(respondent1Intention, respondent2Intention, respondent1ClaimIntentionApplicant2),
        () => confirmDetailsPage.confirmReferences(!!respondent1Intention, !!respondent2Intention, sameSolicitor),
        // temporarily commenting out whilst change is Fmade to service repo
        () => event.submit('Acknowledge claim', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async informAgreedExtensionDate() {
      eventName = 'Inform agreed 28 day extension';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => event.submit('Submit', 'Extension deadline submitted'),
        () => event.returnToCaseDetails()
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

    async confirmTrialReadiness(user, hearingDateIsLessThan3Weeks = false, readyForTrial = 'yes') {
          eventName = 'Confirm trial arrangements';
          const confirmationMessage = readyForTrial == 'yes' ? 'You have said this case is ready for trial or hearing' : 'You have said this case is not ready for trial or hearing';
          await this.triggerStepsWithScreenshot([
            ...conditionalSteps(hearingDateIsLessThan3Weeks == false, [
              () => caseViewPage.startEvent(eventName, caseId),
              () => confirmTrialReadinessPage.updateTrialConfirmation(user, readyForTrial, 'yes'),
              () => event.submit('Submit', confirmationMessage),
              () => event.returnToCaseDetails()
            ]),
            ...conditionalSteps(hearingDateIsLessThan3Weeks == true, [
              () => caseViewPage.verifyErrorMessageOnEvent(eventName, caseId, 'Trial arrangements had to be confirmed more than 3 weeks before the trial')
            ])
          ]);
        },

    async addDefendantLitigationFriend(partyType, selectPartyType = true) {
      eventName = 'Add litigation friend';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        ...conditionalSteps(selectPartyType && partyType, [
            () => selectLitigationFriendPage.selectDefendant(partyType)
          ]),
          () => defendantLitigationFriendPage.enterLitigantFriendWithDifferentAddressToDefendant(partyType, address, TEST_FILE_PATH),
          () => event.submit('Submit', 'You have added litigation friend details'),
          () => event.returnToCaseDetails()
      ]);
    },

    async respondToClaim({party = parties.RESPONDENT_SOLICITOR_1, twoDefendants = false, sameResponse = false, defendant1Response, defendant2Response, defendant1ResponseToApplicant2, claimValue = 30000}) {
      eventName = 'Respond to claim';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        ...defenceSteps({party, twoDefendants, sameResponse, defendant1Response, defendant2Response, defendant1ResponseToApplicant2}),
        ...conditionalSteps(defendant1Response === 'fullDefence' || defendant2Response === 'fullDefence', [
          () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(party),
          () => fixedRecoverableCostsPage.fixedRecoverableCosts(party),
          ...conditionalSteps(claimValue >= 25000, [
            () => disclosureOfElectronicDocumentsPage.enterDisclosureOfElectronicDocuments(party)
            ]
          ),
          () => disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(party),
          () => expertsPage.enterExpertInformation(party),
          () => witnessPage.enterWitnessInformation(party),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(party),
          () => hearingPage.enterHearingInformation(party),
          () => draftDirectionsPage.upload(party, TEST_FILE_PATH),
          () => requestedCourtPage.selectSpecificCourtForHearing(party),
          () => hearingSupportRequirementsPage.selectRequirements(party),
          () => vulnerabilityQuestionsPage.vulnerabilityQuestions(party),
          () => furtherInformationPage.enterFurtherInformation(party),
          () => statementOfTruth.enterNameAndRole(party + 'DQ'),
        ]),
        () => event.submit('Submit', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async respondToDefence(mpScenario = 'ONE_V_ONE', claimValue = 30000) {
      eventName = 'View and respond to defence';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => proceedPage.proceedWithClaim(mpScenario),
        () => uploadResponseDocumentPage.uploadResponseDocuments(TEST_FILE_PATH, mpScenario),
        () => fileDirectionsQuestionnairePage.fileDirectionsQuestionnaire(parties.APPLICANT_SOLICITOR_1),
        () => fixedRecoverableCostsPage.fixedRecoverableCosts(parties.APPLICANT_SOLICITOR_1),
        ...conditionalSteps(claimValue >= 25000, [
            () => disclosureOfElectronicDocumentsPage.
                            enterDisclosureOfElectronicDocuments(parties.APPLICANT_SOLICITOR_1)
          ]
        ),
        () => disclosureOfNonElectronicDocumentsPage.enterDirectionsProposedForDisclosure(parties.APPLICANT_SOLICITOR_1),
        () => expertsPage.enterExpertInformation(parties.APPLICANT_SOLICITOR_1),
        () => witnessPage.enterWitnessInformation(parties.APPLICANT_SOLICITOR_1),
        () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.APPLICANT_SOLICITOR_1),
        () => hearingPage.enterHearingInformation(parties.APPLICANT_SOLICITOR_1),
        () => draftDirectionsPage.upload(parties.APPLICANT_SOLICITOR_1, TEST_FILE_PATH),
        () => hearingSupportRequirementsPage.selectRequirements(parties.APPLICANT_SOLICITOR_1),
        () => vulnerabilityQuestionsPage.vulnerabilityQuestions(parties.APPLICANT_SOLICITOR_1),
        () => furtherInformationPage.enterFurtherInformation(parties.APPLICANT_SOLICITOR_1),
        () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
        () => event.submit('Submit your response', 'You have chosen to proceed with the claim\nClaim number: '),
        () => this.click('Close and Return to case details')
      ]);
      await this.takeScreenshot();
    },

    async respondToDefenceDropClaim(mpScenario = 'ONE_V_ONE') {
      eventName = 'View and respond to defence';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => proceedPage.dropClaim(mpScenario),
        () => event.submit('Submit your response', 'You have chosen not to proceed with the claim'),
        () => this.click('Close and Return to case details')
      ]);
      await this.takeScreenshot();
    },

    async fillNotifyClaimCOSForm(caseId, mpScenario) {
      eventName = 'Notify claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => cosNotifyClaimPage.fillNotifyClaimCOSForm('Certificate of Service [defendant1]', DEFENDANT1_NAME),
        () => cosNotifyClaimPage.fillNotifyClaimCOSForm('Certificate of Service [defendant2]', DEFENDANT2_NAME),
        () => cosNotifyClaimCYAPage.verifyCOSCheckAnswerForm(CLAIMANT_NAME, DEFENDANT1_NAME, DEFENDANT2_NAME, mpScenario),
        () => event.submit('Submit', 'Certificate of Service - notify claim successful'),
        () => event.returnToCaseDetails()
      ]);
    },

    async fillLRNotifyClaimCOSForm(caseId, mpScenario) {
      eventName = 'Notify claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => this.clickContinue(),
        () => cosNotifyClaimPage.fillNotifyClaimCOSForm('Certificate of Service [defendant2]', DEFENDANT2_NAME),
        () => cosNotifyClaimCYAPage.verifyCOSCheckAnswerForm(CLAIMANT_NAME, '', DEFENDANT2_NAME, mpScenario),
        () => event.submit('Submit', 'Certificate of Service - notify claim successful'),
        () => event.returnToCaseDetails()
      ]);
    },

    async fillNotifyClaimDetailsCOSForm(caseId) {
      eventName = 'Notify claim details';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => cosNotifyClaimDetailsPage.fillNotifyClaimDetailsCOSForm('Certificate of Service [defendant1]',
          DEFENDANT1_NAME, 'NotifyClaimDetails1', TEST_FILE_PATH),
        () => cosNotifyClaimDetailsPage.fillNotifyClaimDetailsCOSForm('Certificate of Service [defendant2]',
          DEFENDANT2_NAME, 'NotifyClaimDetails2', TEST_FILE_PATH),
        () => cosNotifyClaimCYAPage.verifyCOSCheckAnswerForm(CLAIMANT_NAME, DEFENDANT1_NAME, DEFENDANT2_NAME),
        () => cosNotifyClaimCYAPage.verifyCOSSupportingEvidence(),
        () => event.submit('Submit', 'Certificate of Service - notify claim details successful'),
        () => event.returnToCaseDetails()
      ]);
    },

    async fillLRNotifyClaimDetailsCOSForm(caseId) {
      eventName = 'Notify claim details';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => this.clickContinue(),
        () => cosNotifyClaimDetailsPage.fillNotifyClaimDetailsCOSForm('Certificate of Service [defendant2]',
          DEFENDANT2_NAME, 'NotifyClaimDetails2', TEST_FILE_PATH),
        () => event.submit('Submit', 'Certificate of Service - notify claim details successful'),
        () => event.returnToCaseDetails()
      ]);
    },

    async verifyCOSTabDetails() {
      await this.triggerStepsWithScreenshot([
        () =>caseViewPage.navigateToTab('Certificate of Service'),
        () => cosTab.verifyCOSDetails(CLAIMANT_NAME, DEFENDANT1_NAME, DEFENDANT2_NAME)
      ]);
    },

    async navigateToTab(tabName) {
      await this.triggerStepsWithScreenshot([
        () =>caseViewPage.navigateToTab(tabName),
      ]);
    },

    async verifyCOSTabNotifyClaimDetails() {
      await this.triggerStepsWithScreenshot([
        () =>caseViewPage.navigateToTab('Certificate of Service'),
        () => cosTab.verifyCOSNCDetails(CLAIMANT_NAME, DEFENDANT1_NAME, DEFENDANT2_NAME)
      ]);
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

    async addUnavailableDates(caseId) {
      eventName = 'Add Unavailable Dates';
      const url = config.url.manageCase + '/cases/case-details/' + caseId;

      await this.amOnPage(url + '/trigger/ADD_UNAVAILABLE_DATES/ADD_UNAVAILABLE_DATESAddAdditionalDates');
      await this.waitForText('Add unavailable dates');
      await this.triggerStepsWithScreenshot([
        () => addUnavailableDatesPage.enterUnavailableDates(),
        () => event.submit('Submit', 'Availability updated'),
        () => event.returnToCaseDetails(),
        () => addUnavailableDatesPage.confirmSubmission(url + '#Listing%20notes'),
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
        () => smallClaimsSDOOrderDetailsPage.verifyOrderPreview(allocateSmallClaims, trackType, orderType),
        () => event.submit('Submit', 'Your order has been issued')
      ]);
    },

    async assertNoEventsAvailable() {
      await caseViewPage.assertNoEventsAvailable();
    },

    async assertHasEvents(events) {
      await caseViewPage.assertEventsAvailable(events);
    },

    async clickContinue() {
      let urlBefore = await this.grabCurrentUrl();
      await this.retryUntilUrlChanges(() => this.forceClick('Continue'), urlBefore);
    },
    
    async getCaseId(){
      console.log(`case created: ${caseId}`);
      return caseId;
    },
    
    async setCaseId(argCaseNumber) {
      caseId = argCaseNumber;
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
          console.log(`retryUntilExists(${locator}): element found before try #${tryNumber} was executed`);
          break;
        }
        await action();
        if (await this.waitForSelector(locator) != null) {
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
      this.forceClick('Create case');
      this.waitForElement(`#cc-jurisdiction > option[value="${config.definition.jurisdiction}"]`);
      await this.retryUntilExists(() => specCreateCasePage.selectCaseType(), 'ccd-markdown');
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
      eventName = 'Acknowledgement of Service';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => specConfirmDefendantsDetails.confirmDetails(),
        () => specConfirmLegalRepDetails.confirmDetails(),
        () => event.submit('Acknowledge claim', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async respondToClaimSpec(responseType,defenceType,paidAmount) {
      eventName = 'Respond to claim';
      await this.triggerStepsWithScreenshot([
        () => caseViewPage.startEvent(eventName, caseId),
        () => respondentCheckListPage.claimTimelineTemplate(),
        () => specConfirmDefendantsDetails.confirmDetails(),
        () => specConfirmLegalRepDetails.confirmDetails(),
        () => responseTypeSpecPage.selectResponseType(responseType),
        ... conditionalSteps(responseType === 'fullDefence', [
          () => defenceTypePage.selectDefenceType(defenceType,paidAmount)
        ]),
        ... conditionalSteps(defenceType === 'hasPaid' && paidAmount === 1000, [
          () => freeMediationPage.selectMediation('yes'),
          () => useExpertPage.claimExpert('no'),
          () => enterWitnessesPage.howManyWitnesses(),
          () => welshLanguageRequirementsPage.enterWelshLanguageRequirements(parties.RESPONDENT_SOLICITOR_1),
          () => smallClaimsHearingPage.selectHearing('no'),
          () => chooseCourtSpecPage.chooseCourt('yes'),
        ]),
        ... conditionalSteps(paidAmount < 1000 && (defenceType === 'dispute' || defenceType === 'hasPaid'), [
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
        ... conditionalSteps(defenceType === 'hasPaid' && paidAmount === 15000, [
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
        ... conditionalSteps(paidAmount === 10000 && (defenceType === 'dispute' || defenceType === 'hasPaid'),  [
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
        ... conditionalSteps(paidAmount <= 1000 && (defenceType === 'dispute' || defenceType === 'hasPaid'),  [
          () => furtherInformationPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
        ]),
        ... conditionalSteps(paidAmount >= 10000 && (defenceType === 'dispute' || defenceType === 'hasPaid'),  [
          () => furtherInformationLRspecPage.enterFurtherInformation(parties.RESPONDENT_SOLICITOR_1),
        ]),
        () => statementOfTruth.enterNameAndRole(parties.APPLICANT_SOLICITOR_1 + 'DQ'),
        () => event.submit('Submit', ''),
        () => event.returnToCaseDetails()
      ]);
    },

    async evidenceUpload(caseId, defendant) {
      defendant ? eventName = 'EVIDENCE_UPLOAD_RESPONDENT' : eventName = 'EVIDENCE_UPLOAD_APPLICANT';
      await this.triggerStepsWithScreenshot([
        () => unspecifiedEvidenceUpload.uploadADocument(caseId, defendant),
        () => unspecifiedEvidenceUpload.selectType(defendant),
        () => unspecifiedEvidenceUpload.uploadYourDocument(TEST_FILE_PATH, defendant),
        () => event.submit('Submit', 'Documents uploaded')
      ]);
    },

    async navigateToCaseDetails(caseNumber) {
      await this.retryUntilExists(async () => {
        const normalizedCaseId = caseNumber.toString().replace(/\D/g, '');
        console.log(`Navigating to case: ${normalizedCaseId}`);
        await this.amOnPage(`${config.url.manageCase}/cases/case-details/${normalizedCaseId}`);
      }, SIGNED_IN_SELECTOR);

      await this.waitForSelector('.ccd-dropdown');
    },

    async initiateNoticeOfChange(caseId, clientName) {
      eventName = 'NoC Request';
      await this.triggerStepsWithScreenshot([
        () => noticeOfChange.initiateNoticeOfChange(),
        () => noticeOfChange.enterCaseId(caseId),
        () => noticeOfChange.enterClientName(clientName),
        () => noticeOfChange.checkAndSubmit(caseId)
      ]);
    },

    async navigateToCaseFlags(caseNumber) {
      await this.retryUntilExists(async () => {
        const normalizedCaseId = caseNumber.toString().replace(/\D/g, '');
        output.log(`Navigating to case: ${normalizedCaseId}`);
        await this.amOnPage(`${config.url.manageCase}/cases/case-details/${normalizedCaseId}`);
        await this.waitForText('Summary');
        await this.amOnPage(`${config.url.manageCase}/cases/case-details/${normalizedCaseId}#Case%20Flags`);
      }, SIGNED_IN_SELECTOR);

      await this.waitForSelector('.ccd-dropdown');
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

    async manageCaseFlags(caseFlags) {
      eventName = 'Manage case flags';

      for (const {partyName, roleOnCase, flagType, flagComment} of caseFlags) {
        await this.triggerStepsWithScreenshot([
          () => caseViewPage.startEvent(eventName, caseId),
          () => manageCaseFlagsPage.selectFlagLocation(`${partyName} (${roleOnCase}) - ${flagType} (${flagComment})`),
          () => manageCaseFlagsPage.updateFlagComment(`${flagComment} - Updated - ${partyName}`),
          () => event.submitWithoutHeader('Submit')
        ]);
      }
    },

    async validateUpdatedCaseFlags(caseFlags) {
      eventName = '';

      await this.triggerStepsWithScreenshot([
        () => caseViewPage.goToCaseFlagsTab(caseId),
        () => caseViewPage.assertInactiveCaseFlagsInfo(caseFlags.length),
        () => caseViewPage.assertUpdatedCaseFlags(caseFlags)
      ]);
      await this.takeScreenshot();
    },
  });
};
