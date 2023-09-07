const config = require('../config.js');
const lodash = require('lodash');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const {listElement} = require('./dataHelper');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;
const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('./caseRoleAssignmentHelper');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaim.js');
const createDJ = require('../fixtures/events/createDJ.js');
const createDJDirectionOrder = require('../fixtures/events/createDJDirectionOrder.js');
const genAppClaimData = require('../fixtures/events/createGeneralApplication.js');
const expectedEvents = require('../fixtures/ccd/expectedEvents.js');
const nonProdExpectedEvents = require('../fixtures/ccd/nonProdExpectedEvents.js');
const testingSupport = require('./testingSupport');
const {PBAv3} = require('../fixtures/featureKeys');
const sdoTracks = require('../fixtures/events/createSDO.js');
const evidenceUploadApplicant = require('../fixtures/events/evidenceUploadApplicant.js');
const evidenceUploadRespondent = require('../fixtures/events/evidenceUploadRespondent.js');
const hearingScheduled = require('../fixtures/events/scheduleHearing.js');
const evidenceUploadJudge = require('../fixtures/events/evidenceUploadJudge.js');
const trialReadiness = require('../fixtures/events/trialReadiness.js');
const createFinalOrder = require('../fixtures/events/finalOrder.js');
const {checkNoCToggleEnabled, checkToggleEnabled,checkCertificateOfServiceIsEnabled, checkCaseFlagsEnabled, checkFastTrackUpliftsEnabled} = require('./testingSupport');
const {cloneDeep} = require('lodash');
const {assertCaseFlags, assertFlagsInitialisedAfterCreateClaim, assertFlagsInitialisedAfterAddLitigationFriend} = require('../helpers/assertions/caseFlagsAssertions');
const {CASE_FLAGS} = require('../fixtures/caseFlags');
const {addAndAssertCaseFlag, getDefinedCaseFlagLocations, getPartyFlags, updateAndAssertCaseFlag} = require('./caseFlagsHelper');
const {fetchCaseDetails} = require('./apiRequest');
const {removeFlagsFieldsFromFixture} = require('../helpers/caseFlagsFeatureHelper');
const {removeFixedRecoveryCostFieldsFromUnspecDefendantResponseData, removeFastTrackAllocationFromSdoData} = require('../helpers/fastTrackUpliftsHelper');

const data = {
  INITIATE_GENERAL_APPLICATION: genAppClaimData.createGAData('Yes', null, '27500','FEE0442'),
  CREATE_CLAIM: (mpScenario, claimAmount, pbaV3) => claimData.createClaim(mpScenario, claimAmount, pbaV3),
  CREATE_CLAIM_RESPONDENT_LIP: claimData.createClaimLitigantInPerson,
  CREATE_CLAIM_RESPONDENT_LR_LIP: claimData.createClaimLRLIP,
  CREATE_CLAIM_RESPONDENT_LIP_LIP: claimData.createClaimLIPLIP,
  COS_NOTIFY_CLAIM: (lip1, lip2) => claimData.cosNotifyClaim(lip1, lip2),
  COS_NOTIFY_CLAIM_DETAILS: (lip1, lip2) => claimData.cosNotifyClaimDetails(lip1, lip2),
  CREATE_CLAIM_TERMINATED_PBA: claimData.createClaimWithTerminatedPBAAccount,
  CREATE_CLAIM_RESPONDENT_SOLICITOR_FIRM_NOT_IN_MY_HMCTS: claimData.createClaimRespondentSolFirmNotInMyHmcts,
  RESUBMIT_CLAIM: require('../fixtures/events/resubmitClaim.js'),
  NOTIFY_DEFENDANT_OF_CLAIM: require('../fixtures/events/1v2DifferentSolicitorEvents/notifyClaim_1v2DiffSol.js'),
  NOTIFY_DEFENDANT_OF_CLAIM_DETAILS: require('../fixtures/events/1v2DifferentSolicitorEvents/notifyClaim_1v2DiffSol.js'),
  ADD_OR_AMEND_CLAIM_DOCUMENTS: require('../fixtures/events/addOrAmendClaimDocuments.js'),
  ACKNOWLEDGE_CLAIM: require('../fixtures/events/acknowledgeClaim.js'),
  ACKNOWLEDGE_CLAIM_SAME_SOLICITOR: require('../fixtures/events/1v2SameSolicitorEvents/acknowledgeClaim_sameSolicitor.js'),
  ACKNOWLEDGE_CLAIM_SOLICITOR_ONE: require('../fixtures/events/1v2DifferentSolicitorEvents/acknowledgeClaim_Solicitor1.js'),
  ACKNOWLEDGE_CLAIM_SOLICITOR_TWO: require('../fixtures/events/1v2DifferentSolicitorEvents/acknowledgeClaim_Solicitor2.js'),
  ACKNOWLEDGE_CLAIM_TWO_V_ONE: require('../fixtures/events/2v1Events/acknowledgeClaim_2v1.js'),
  INFORM_AGREED_EXTENSION_DATE: require('../fixtures/events/informAgreeExtensionDate.js'),
  INFORM_AGREED_EXTENSION_DATE_SOLICITOR_TWO: require('../fixtures/events/1v2DifferentSolicitorEvents/informAgreeExtensionDate_Solicitor2.js'),
  DEFENDANT_RESPONSE: (allocatedTrack) => require('../fixtures/events/defendantResponse.js').defendantResponse(allocatedTrack),
  DEFENDANT_RESPONSE_SAME_SOLICITOR: (allocatedTrack) => require('../fixtures/events/1v2SameSolicitorEvents/defendantResponse_sameSolicitor.js').defendantResponse(allocatedTrack),
  DEFENDANT_RESPONSE_SOLICITOR_ONE: (allocatedTrack) => require('../fixtures/events/1v2DifferentSolicitorEvents/defendantResponse_Solicitor1').defendantResponse(allocatedTrack),
  DEFENDANT_RESPONSE_SOLICITOR_TWO: (allocatedTrack) => require('../fixtures/events/1v2DifferentSolicitorEvents/defendantResponse_Solicitor2').defendantResponse(allocatedTrack),
  DEFENDANT_RESPONSE_TWO_APPLICANTS: (allocatedTrack) => require('../fixtures/events/2v1Events/defendantResponse_2v1').defendantResponse(allocatedTrack),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponse.js').claimantResponse(mpScenario),
  ADD_DEFENDANT_LITIGATION_FRIEND: require('../fixtures/events/addDefendantLitigationFriend.js'),
  CASE_PROCEEDS_IN_CASEMAN: require('../fixtures/events/caseProceedsInCaseman.js'),
  AMEND_PARTY_DETAILS: require('../fixtures/events/amendPartyDetails.js'),
  ADD_CASE_NOTE: require('../fixtures/events/addCaseNote.js'),
  REQUEST_DJ: (djRequestType, mpScenario) => createDJ.requestDJ(djRequestType, mpScenario),
  REQUEST_DJ_ORDER: (djOrderType, mpScenario) => createDJDirectionOrder.judgeCreateOrder(djOrderType, mpScenario),
  CREATE_DISPOSAL: (userInput) => sdoTracks.createSDODisposal(userInput),
  CREATE_FAST: (userInput) => sdoTracks.createSDOFast(userInput),
  CREATE_FAST_IN_PERSON: (userInput) => sdoTracks.createSDOFastInPerson(userInput),
  CREATE_SMALL: (userInput) => sdoTracks.createSDOSmall(userInput),
  CREATE_FAST_NO_SUM: (userInput) => sdoTracks.createSDOFastWODamageSum(userInput),
  CREATE_SMALL_NO_SUM: (userInput) => sdoTracks.createSDOSmallWODamageSum(userInput),
  UNSUITABLE_FOR_SDO: (userInput) => sdoTracks.createNotSuitableSDO(userInput),
  HEARING_SCHEDULED: (allocatedTrack) => hearingScheduled.scheduleHearing(allocatedTrack),
  EVIDENCE_UPLOAD_JUDGE: (typeOfNote) => evidenceUploadJudge.upload(typeOfNote),
  TRIAL_READINESS: (user) => trialReadiness.confirmTrialReady(user),
  EVIDENCE_UPLOAD_APPLICANT_SMALL: (mpScenario) => evidenceUploadApplicant.createApplicantSmallClaimsEvidenceUpload(mpScenario),
  EVIDENCE_UPLOAD_APPLICANT_FAST: (mpScenario) => evidenceUploadApplicant.createApplicantFastClaimsEvidenceUpload(mpScenario),
  EVIDENCE_UPLOAD_RESPONDENT_SMALL: (mpScenario) => evidenceUploadRespondent.createRespondentSmallClaimsEvidenceUpload(mpScenario),
  EVIDENCE_UPLOAD_RESPONDENT_FAST: (mpScenario) => evidenceUploadRespondent.createRespondentFastClaimsEvidenceUpload(mpScenario),
  FINAL_ORDERS: (finalOrdersRequestType) => createFinalOrder.requestFinalOrder(finalOrdersRequestType),
};

const eventData = {
  acknowledgeClaims: {
    ONE_V_ONE: data.ACKNOWLEDGE_CLAIM,
    ONE_V_TWO_ONE_LEGAL_REP: data.ACKNOWLEDGE_CLAIM_SAME_SOLICITOR,
    ONE_V_TWO_TWO_LEGAL_REP: {
      solicitorOne: data.ACKNOWLEDGE_CLAIM_SOLICITOR_ONE,
      solicitorTwo: data.ACKNOWLEDGE_CLAIM_SOLICITOR_TWO
    },
    TWO_V_ONE: data.ACKNOWLEDGE_CLAIM_TWO_V_ONE
  },
  informAgreedExtensionDates: {
    ONE_V_ONE: data.INFORM_AGREED_EXTENSION_DATE,
    ONE_V_TWO_ONE_LEGAL_REP: data.INFORM_AGREED_EXTENSION_DATE,
    ONE_V_TWO_TWO_LEGAL_REP: {
      solicitorOne: data.INFORM_AGREED_EXTENSION_DATE,
      solicitorTwo: data.INFORM_AGREED_EXTENSION_DATE_SOLICITOR_TWO
    },
    TWO_V_ONE: data.INFORM_AGREED_EXTENSION_DATE
  },
  defendantResponses: {
    ONE_V_ONE: (allocatedTrack) => data.DEFENDANT_RESPONSE(allocatedTrack),
    ONE_V_TWO_ONE_LEGAL_REP: (allocatedTrack) => data.DEFENDANT_RESPONSE_SAME_SOLICITOR(allocatedTrack),
    ONE_V_TWO_TWO_LEGAL_REP: {
      solicitorOne: (allocatedTrack) => data.DEFENDANT_RESPONSE_SOLICITOR_ONE(allocatedTrack),
      solicitorTwo: (allocatedTrack) => data.DEFENDANT_RESPONSE_SOLICITOR_TWO(allocatedTrack)
    },
    TWO_V_ONE: (allocatedTrack) => data.DEFENDANT_RESPONSE_TWO_APPLICANTS(allocatedTrack)
  },
  sdoTracks: {
    CREATE_DISPOSAL: data.CREATE_DISPOSAL(),
    CREATE_SMALL: data.CREATE_SMALL(),
    CREATE_FAST: data.CREATE_FAST(),
    CREATE_FAST_IN_PERSON: data.CREATE_FAST_IN_PERSON(),
    CREATE_SMALL_NO_SUM: data.CREATE_SMALL_NO_SUM(),
    CREATE_FAST_NO_SUM: data.CREATE_FAST_NO_SUM(),
    UNSUITABLE_FOR_SDO: data.UNSUITABLE_FOR_SDO()
  }
};

const midEventFieldForPage = {
  ClaimValue: {
    id: 'applicantSolicitor1PbaAccounts',
    dynamicList: true,
    uiField: {
      remove: false,
    },
  },
  ClaimantLitigationFriend: {
    id: 'applicantSolicitor1CheckEmail',
    dynamicList: false,
    uiField: {
      remove: false,
    },
  },
  StatementOfTruth: {
    id: 'applicantSolicitor1ClaimStatementOfTruth',
    dynamicList: false,
    uiField: {
      remove: true,
      field: 'uiStatementOfTruth'
    },
  }
};

let caseId, eventName, legacyCaseReference;
let caseData = {};
let mpScenario = 'ONE_V_ONE';

module.exports = {
  createClaimWithRepresentedRespondent: async (user, multipartyScenario, claimAmount = '30000') => {
    eventName = 'CREATE_CLAIM';
    caseId = null;
    caseData = {};
    mpScenario = multipartyScenario;
    const pbaV3 = await checkToggleEnabled(PBAv3);
    let createClaimData = data.CREATE_CLAIM(mpScenario, claimAmount, pbaV3);

    //==============================================================

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    await validateEventPages(createClaimData);

    let i;
    if (createClaimData.invalid) {
      for (i = 0; i < createClaimData.invalid.Court.courtLocation.applicantPreferredCourt.length; i++) {
        await assertError('Court', createClaimData.invalid.Court.courtLocation.applicantPreferredCourt[i],
          null, 'Case data validation failed');
      }
      await assertError('Upload', createClaimData.invalid.Upload.servedDocumentFiles.particularsOfClaimDocument,
        null, 'Case data validation failed');
    }



    console.log('Is PBAv3 toggle on?: ' + pbaV3);

    let bodyText = 'Your claim will not be issued until payment is confirmed.';
    let headerText = '# Please now pay your claim fee\n# using the link below';
    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: headerText,
      body: bodyText
    });

    await waitForFinishedBusinessProcess(caseId);

    if (pbaV3) {
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }

    await assignCase();
    await waitForFinishedBusinessProcess(caseId);
    if(await checkCaseFlagsEnabled()) {
      await assertFlagsInitialisedAfterCreateClaim(config.adminUser, caseId);
    }
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');

    // field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
  },

  createClaimWithRespondentLitigantInPerson: async (user, multipartyScenario) => {
    eventName = 'CREATE_CLAIM';
    caseId = null;
    caseData = {};
    mpScenario = multipartyScenario;
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    const pbaV3 = await checkToggleEnabled(PBAv3);
    let createClaimData;
    switch (mpScenario){
      case 'ONE_V_ONE':
        createClaimData = data.CREATE_CLAIM_RESPONDENT_LIP;
        break;
      case 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP':
        createClaimData = data.CREATE_CLAIM_RESPONDENT_LR_LIP;
        break;
      case 'ONE_V_TWO_LIPS':
        createClaimData = data.CREATE_CLAIM_RESPONDENT_LIP_LIP;
        break;
    }

    //==============================================================
    if (pbaV3) {
      createClaimData.valid.ClaimValue.paymentTypePBA = 'PBAv3';
    }
    await validateEventPages(createClaimData);

    let noCToggleEnabled = await checkNoCToggleEnabled();
    let isCertificateOfServiceEnabled = await checkCertificateOfServiceIsEnabled();
    console.log('isCertificateOfServiceEnabled is..', isCertificateOfServiceEnabled);
    console.log('comparing assertSubmittedEvent');
    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Please now pay your claim',
      body: 'Your claim will not be issued until payment is confirmed'
    });

    await waitForFinishedBusinessProcess(caseId);

    console.log('Is PBAv3 toggle on?: ' + pbaV3);

    if (pbaV3) {
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }

    if (mpScenario === 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP') {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
    }
    console.log('***waitForFinishedBusinessProcess');
    await waitForFinishedBusinessProcess(caseId);
    console.log('***assertCorrectEventsAreAvailableToUser');
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, noCToggleEnabled ? 'CASE_ISSUED' : 'PROCEEDS_IN_HERITAGE_SYSTEM');
    console.log('***assertCorrectEventsAreAvailableToUser');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, noCToggleEnabled ? 'CASE_ISSUED' : 'PROCEEDS_IN_HERITAGE_SYSTEM');

    deleteCaseFields('applicantSolicitor1CheckEmail');
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');

    return caseId;
  },

  createClaimWithFailingPBAAccount: async (user) => {
    eventName = 'CREATE_CLAIM';
    caseId = null;
    caseData = {};
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);

    let createClaimData = data.CREATE_CLAIM_TERMINATED_PBA;
    //==============================================================

    await validateEventPages(createClaimData);

    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Your claim has been received',
      body: 'You have until DATE to notify the defendant of the claim and claim details.'
    });

    await assignCase();
    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PENDING_CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PENDING_CASE_ISSUED');
  },

  resubmitClaim: async (user) => {
    eventName = 'RESUBMIT_CLAIM';
    caseData = {};
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName, caseId);
    await validateEventPages(data.RESUBMIT_CLAIM);
    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Claim pending',
      body: 'Your claim will be processed. Wait for us to contact you.'
    });
    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PENDING_CASE_ISSUED');
  },

  amendClaimDocuments: async (user) => {
    // Temporary work around from CMC-1497 - statement of truth field is removed due to callback code in service repo.
    // Currently the mid event sets uiStatementOfTruth to null. When EXUI is involved this has the appearance of
    // resetting the field in the UI, most likely due to some caching mechanism, but the data is still available for the
    // about to submit. As these tests talk directly to the data store API the field is actually removed in the about
    // to submit callback. This gives the situation where uiStatementOfTruth is a defined field but with internal fields
    // set to null. In the about to submit callback this overwrites applicantSolicitor1ClaimStatementOfTruth with null
    // fields. When data is fetched here, the field does not exist.
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');

    await apiRequest.setupTokens(user);

    eventName = 'ADD_OR_AMEND_CLAIM_DOCUMENTS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    await validateEventPages(data[eventName]);

    const document = await testingSupport.uploadDocument();
    let errorData = await updateCaseDataWithPlaceholders(data[eventName], document);

    await assertError('Upload', errorData.invalid.Upload.duplicateError,
      'You need to either upload 1 Particulars of claim only or enter the Particulars of claim text in the field provided. You cannot do both.');

    await assertSubmittedEvent('CASE_ISSUED', {
      header: 'Documents uploaded successfully',
      body: ''
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');
  },

  notifyClaim: async (user, multipartyScenario) => {
    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM';
    mpScenario = multipartyScenario;

    await apiRequest.setupTokens(user);
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    legacyCaseReference = returnedCaseData['legacyCaseReference'];
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_CASE_DETAILS_NOTIFICATION', {
      header: 'Notification of claim sent',
      body: 'The defendant legal representative\'s organisation has been notified and granted access to this claim.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
  },

  notifyClaimLip: async (user, multipartyScenario) => {
    let isCertificateOfServiceEnabled = await checkCertificateOfServiceIsEnabled();

    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM';
    mpScenario = multipartyScenario;

    await apiRequest.setupTokens(user);

    if (isCertificateOfServiceEnabled) {

      let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
      legacyCaseReference = returnedCaseData['legacyCaseReference'];
      // assertContainsPopulatedFields(returnedCaseData);

      await validateEventPages(data[eventName]);
      returnedCaseData.defendantSolicitorNotifyClaimOptions = null;

      if (mpScenario === 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP') {
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM(false, true)};
      } else if (mpScenario === 'ONE_V_TWO_LIPS') {
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM(false, true), ...data.COS_NOTIFY_CLAIM(true, false)};
      } else {
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM(true, false)};
      }
      await assertSubmittedEventWithCaseData(returnedCaseData, 'AWAITING_CASE_DETAILS_NOTIFICATION', {
        header: 'Certificate of Service',
        body: 'You must serve the claim details and'
      });

      await waitForFinishedBusinessProcess(caseId);
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');

    } else {
      await assertStartEventNotAllowed();
    }
  },

  notifyClaimDetails: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = {...returnedCaseData, defendantSolicitorNotifyClaimDetailsOptions: {
        value: listElement('Both')
      }};

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'Defendant notified',
      body: 'The defendant legal representative\'s organisation has been notified of the claim details.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },

  notifyClaimDetailsLip: async (user, multipartyScenario) => {
    let isCertificateOfServiceEnabled = await checkCertificateOfServiceIsEnabled();

    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS';
    mpScenario = multipartyScenario;

    await apiRequest.setupTokens(user);

    if (isCertificateOfServiceEnabled) {

      let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
      legacyCaseReference = returnedCaseData['legacyCaseReference'];
      // assertContainsPopulatedFields(returnedCaseData);

      await validateEventPages(data[eventName]);
      returnedCaseData.defendantSolicitorNotifyClaimOptions = null;
      if (mpScenario === 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP') {
        returnedCaseData = {};
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM_DETAILS(false, true)};
        const document = await testingSupport.uploadDocument();
        returnedCaseData = await updateCaseDataWithPlaceholders(returnedCaseData, document);
      } else if (mpScenario === 'ONE_V_TWO_LIPS') {
        returnedCaseData = {};
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM_DETAILS(false, true), ...data.COS_NOTIFY_CLAIM_DETAILS(true, false)};
        const document = await testingSupport.uploadDocument();
        returnedCaseData = await updateCaseDataWithPlaceholders(returnedCaseData, document);
      } else {
        returnedCaseData = {};
        returnedCaseData = {...returnedCaseData, ...data.COS_NOTIFY_CLAIM_DETAILS(true, false)};
        const document = await testingSupport.uploadDocument();
        returnedCaseData = await updateCaseDataWithPlaceholders(returnedCaseData, document);
      }
      await assertSubmittedEventWithCaseData(returnedCaseData, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
        header: 'Certificate of Service',
        body: 'The defendant(s) must'
      });

      await waitForFinishedBusinessProcess(caseId);

      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    } else {
      await assertStartEventNotAllowed();
    }
  },

  amendPartyDetails: async (user) => {
    await apiRequest.setupTokens(user);
    caseData = {};

    eventName = 'AMEND_PARTY_DETAILS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'You have updated a legal representative\'s email address',
      body: ' '
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },

  acknowledgeClaim: async (user, multipartyScenario, solicitor) => {
    mpScenario = multipartyScenario;
    await apiRequest.setupTokens(user);

    eventName = 'ACKNOWLEDGE_CLAIM';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    solicitorSetup(solicitor);

    assertContainsPopulatedFields(returnedCaseData, solicitor);
    caseData = returnedCaseData;

    deleteCaseFields('systemGeneratedCaseDocuments');
    deleteCaseFields('solicitorReferences');
    deleteCaseFields('solicitorReferencesCopy');
    deleteCaseFields('respondentSolicitor2Reference');

    // solicitor 2 should not be able to see respondent 1 details
    if (solicitor === 'solicitorTwo') {
      deleteCaseFields('respondent1ClaimResponseIntentionType');
      deleteCaseFields('respondent1ResponseDeadline');
    }

    const fixture = mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP' ?
      eventData['acknowledgeClaims'][mpScenario] : eventData['acknowledgeClaims'][mpScenario][solicitor];

    //Todo: Remove after caseflags release
    await removeFlagsFieldsFromFixture(fixture);

    await validateEventPages(fixture);

    await assertError('ConfirmNameAddress', data[eventName].invalid.ConfirmDetails.futureDateOfBirth,
      'The date entered cannot be in the future');

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: '',
      body: ''
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');

    //removed because it's not needed for the further tests
    deleteCaseFields('respondent1Copy');
    deleteCaseFields('respondent2Copy');
    deleteCaseFields('solicitorReferencesCopy');
  },

  informAgreedExtension: async (user, multipartyScenario, solicitor) => {
    mpScenario = multipartyScenario;
    await apiRequest.setupTokens(user);

    solicitorSetup(solicitor);

    eventName = 'INFORM_AGREED_EXTENSION_DATE';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData, solicitor);
    caseData = returnedCaseData;
    deleteCaseFields('systemGeneratedCaseDocuments');
    if (solicitor === 'solicitorTwo') {
      deleteCaseFields('respondent1');
    }

    let informAgreedExtensionData;
    if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
      informAgreedExtensionData = eventData['informAgreedExtensionDates'][mpScenario];
    } else {
      informAgreedExtensionData = eventData['informAgreedExtensionDates'][mpScenario][solicitor];
    }

    await validateEventPages(informAgreedExtensionData, solicitor);

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'Extension deadline submitted',
      body: 'You must respond to the claimant by'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    deleteCaseFields('isRespondent1');
  },

  defendantResponse: async (user, multipartyScenario, solicitor, allocatedTrack) => {
    await apiRequest.setupTokens(user);
    mpScenario = multipartyScenario;
    eventName = 'DEFENDANT_RESPONSE';

    // solicitor 2 should not see respondent 1 data but because respondent 1 has replied before this, we need
    // to clear a big chunk of defendant response (respondent 1) data hence its cleaner to have a clean slate
    // and start off from there.
    if (solicitor === 'solicitorTwo') {
      caseData = {};
    }

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    solicitorSetup(solicitor);

    let defendantResponseData;
    if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
      defendantResponseData = eventData['defendantResponses'][mpScenario](allocatedTrack);
    } else {
      defendantResponseData = eventData['defendantResponses'][mpScenario][solicitor](allocatedTrack);
    }
    console.log(defendantResponseData);

    //Todo: Remove after fast track uplifts release
    if(!await checkFastTrackUpliftsEnabled()) {
      removeFixedRecoveryCostFieldsFromUnspecDefendantResponseData(defendantResponseData);
    }

    //Todo: Remove after caseflags release
    await removeFlagsFieldsFromFixture(defendantResponseData);

    assertContainsPopulatedFields(returnedCaseData, solicitor);
    caseData = returnedCaseData;

    deleteCaseFields('isRespondent1');
    deleteCaseFields('respondent1', 'solicitorReferences');
    deleteCaseFields('systemGeneratedCaseDocuments');
    //this is for 1v2 diff sol 1
    deleteCaseFields('respondentSolicitor2Reference');
    deleteCaseFields('respondent1DQRequestedCourt', 'respondent2DQRequestedCourt');

    if (solicitor === 'solicitorTwo') {
      deleteCaseFields('respondent1DQHearing');
      deleteCaseFields('respondent1DQLanguage');
      deleteCaseFields('respondent1DQRequestedCourt');
      deleteCaseFields('respondent2DQRequestedCourt');
      deleteCaseFields('respondent1ClaimResponseType');
      deleteCaseFields('respondent1DQExperts');
      deleteCaseFields('respondent1DQWitnesses');
      //delete case flags DQ party fields
      deleteCaseFields('respondent1Experts');
      deleteCaseFields('respondent1Witnesses');
      deleteCaseFields('respondent1DetailsForClaimDetailsTab');
    }

    await validateEventPages(defendantResponseData, solicitor);

    await assertError('ConfirmDetails', defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
      'The date entered cannot be in the future');
    await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
      'Unavailable Date cannot be past date');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
      'Dates must be within the next 12 months.');

    await assertError('Hearing', defendantResponseData.invalid.Hearing.wrongDateRange,
      'From Date should be less than To Date');
    // In a 1v2 different solicitor case, when the first solicitor responds, civil service would not change the state
    // to AWAITING_APPLICANT_INTENTION until the all solicitor response.
    if (solicitor === 'solicitorOne') {
      // when only one solicitor has responded in a 1v2 different solicitor case
      await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
        header: 'You have submitted the Defendant\'s defence',
        body: 'Once the other defendant\'s legal representative has submitted their defence, we will send the '
          + 'claimant\'s legal representative a notification.'
      });

      await waitForFinishedBusinessProcess(caseId);
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    } else {
      // when all solicitors responded
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION', {
        header: 'You have submitted the Defendant\'s defence',
        body: 'The Claimant legal representative will get a notification'
      });

      await waitForFinishedBusinessProcess(caseId);
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
      await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_APPLICANT_INTENTION');
    }

    deleteCaseFields('respondent1Copy');
    deleteCaseFields('respondent2Copy');

    const caseFlagsEnabled = await checkCaseFlagsEnabled();

    if (caseFlagsEnabled) {
      await assertCaseFlags(caseId, user, 'FULL_DEFENCE');
    }
  },

  claimantResponse: async (user, multipartyScenario, expectedCcdState, targetFlag, allocatedTrack) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE';
    mpScenario = multipartyScenario;
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    const fastTrackUpliftsEnabled = await checkFastTrackUpliftsEnabled();
    let claimantResponseData= fastTrackUpliftsEnabled ? data.CLAIMANT_RESPONSE(mpScenario, allocatedTrack)
      : data.CLAIMANT_RESPONSE(mpScenario);

    await validateEventPages(claimantResponseData);

    await assertError('Experts', claimantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', claimantResponseData.invalid.Hearing.past,
      'Unavailable Date cannot be past date');
    await assertError('Hearing', claimantResponseData.invalid.Hearing.moreThanYear,
      'Dates must be within the next 12 months.');

    await assertError('Hearing', claimantResponseData.invalid.Hearing.wrongDateRange,
      'From Date should be less than To Date');

    if (targetFlag === 'FOR_SDO') {
      console.log('sdo test');
      await assertSubmittedEvent(
        'JUDICIAL_REFERRAL', {
          header: 'You have chosen to proceed with the claim',
          body: '>We will review the case and contact you to tell you what to do next.'
        });
    } else {
      await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM', {
        header: 'You have chosen to proceed with the claim',
        body: '>We will review the case and contact you to tell you what to do next.'
      });
    }

    await waitForFinishedBusinessProcess(caseId);
    if (!expectedCcdState) {
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
      await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    }

    const caseFlagsEnabled = await checkCaseFlagsEnabled();

    if (caseFlagsEnabled) {
      await assertCaseFlags(caseId, user, 'FULL_DEFENCE');
    }
  },

  checkUserCaseAccess: async (user, shouldHaveAccess) => {
    console.log(`Checking ${user.email} ${shouldHaveAccess ? 'has' : 'does not have'} access to the case.`);
    const expectedStatus = shouldHaveAccess ? 200 : 404;
    return await fetchCaseDetails(user, caseId, expectedStatus);
  },

  initiateGeneralApplication: async (caseNumber, user, expectedState) => {
    eventName = 'INITIATE_GENERAL_APPLICATION';
    caseId = caseId || caseNumber;
    console.log('caseid is..', caseId);

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName, caseId);

    const response = await apiRequest.submitEvent(eventName, data.INITIATE_GENERAL_APPLICATION, caseId);
    const responseBody = await response.json();
    assert.equal(response.status, 201);
    assert.equal(responseBody.state, expectedState);

    console.log('General application created when main case state is', expectedState);
    assert.equal(responseBody.callback_response_status_code, 200);
  },

  addDefendantLitigationFriend: async (user, mpScenario, solicitor) => {
    eventName = 'ADD_DEFENDANT_LITIGATION_FRIEND';
    await apiRequest.setupTokens(user);
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    solicitorSetup(solicitor);
    assertContainsPopulatedFields(returnedCaseData, solicitor);
    caseData = returnedCaseData;

    let fixture = data.ADD_DEFENDANT_LITIGATION_FRIEND[mpScenario];

    await validateEventPages(fixture);
    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'You have added litigation friend details'
    });

    await waitForFinishedBusinessProcess(caseId);

    if(await checkCaseFlagsEnabled()) {
      await assertFlagsInitialisedAfterAddLitigationFriend(config.adminUser, caseId);
    }
  },

  moveCaseToCaseman: async (user) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');

    await apiRequest.setupTokens(user);

    eventName = 'CASE_PROCEEDS_IN_CASEMAN';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    await validateEventPages(data.CASE_PROCEEDS_IN_CASEMAN);

    await assertError('CaseProceedsInCaseman', data[eventName].invalid.CaseProceedsInCaseman,
      'The date entered cannot be in the future');

    //TODO CMC-1245 confirmation page for event
    await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM', {
      header: '',
      body: ''
    }, false);

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
  },

  retrieveTaskDetails: async (user, caseNumber, taskId) => {
    return apiRequest.fetchTaskDetails(user, caseNumber, taskId);
  },

  assignTaskToUser: async (user, taskId) => {
    return apiRequest.taskActionByUser(user, taskId, 'claim');
  },

  completeTaskByUser: async (user, taskId) => {
    return apiRequest.taskActionByUser(user, taskId, 'complete');
  },

  addCaseNote: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'ADD_CASE_NOTE';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    await validateEventPages(data.ADD_CASE_NOTE);

    await assertSubmittedEvent('CASE_ISSUED', {
      header: '',
      body: ''
    }, false);

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');

    // caseNote is set to null in service
    deleteCaseFields('caseNote');
  },

  amendRespondent1ResponseDeadline: async (user) => {
    await apiRequest.setupTokens(user);
    let respondent1deadline = {};
    respondent1deadline = {'respondent1ResponseDeadline': '2022-01-10T15:59:50'};
    testingSupport.updateCaseData(caseId, respondent1deadline);
  },

  amendRespondent2ResponseDeadline: async (user) => {
    await apiRequest.setupTokens(user);
    let respondent2deadline = {};
    respondent2deadline = {'respondent2ResponseDeadline': '2022-01-10T15:59:50'};
    testingSupport.updateCaseData(caseId, respondent2deadline);
  },

  amendHearingDueDate: async (user) => {
    let hearingDueDate = {};
    hearingDueDate = {'hearingDueDate': '2022-01-10'};
    await testingSupport.updateCaseData(caseId, hearingDueDate, user);
  },

  amendHearingDate: async (user, updatedDate) => {
    let hearingDate = {};
    hearingDate = {'hearingDate': updatedDate};
    await testingSupport.updateCaseData(caseId, hearingDate, user);
  },

  defaultJudgment: async (user, djRequestType = 'DISPOSAL_HEARING') => {
    await apiRequest.setupTokens(user);

    eventName = 'DEFAULT_JUDGEMENT';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    caseData = returnedCaseData;
    assertContainsPopulatedFields(returnedCaseData);
    // workaround: caseManagementLocation shows in startevent api request but not in validate request
    deleteCaseFields('caseManagementLocation');
    if (djRequestType === 'DISPOSAL_HEARING') {
      await validateEventPages(data.REQUEST_DJ('DISPOSAL_HEARING', mpScenario));
    } else {
      await validateEventPages(data.REQUEST_DJ('TRIAL_HEARING', mpScenario));
    }

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: '',
      body: ''
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },

  sdoDefaultJudgment: async (user, orderType = 'DISPOSAL_HEARING') => {
    await apiRequest.setupTokens(user);

    eventName = 'STANDARD_DIRECTION_ORDER_DJ';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    caseData = returnedCaseData;
    assertContainsPopulatedFields(returnedCaseData);
    if (orderType === 'DISPOSAL_HEARING') {
      await validateEventPages(data.REQUEST_DJ_ORDER('DISPOSAL_HEARING', mpScenario));
    } else {
      await validateEventPages(data.REQUEST_DJ_ORDER('TRIAL_HEARING', mpScenario));
    }

    await assertSubmittedEvent('CASE_PROGRESSION', {
      header: '',
      body: ''
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },

  getCaseId: async () => {
    console.log(`case created: ${caseId}`);
    return caseId;
  },

  getLegacyCaseReference: async () => {
    return legacyCaseReference;
  },

  cleanUp: async () => {
    await unAssignAllUsers();
  },

  createSDO: async (user, response = 'CREATE_DISPOSAL') => {
    console.log('SDO for case id ' + caseId);
    await apiRequest.setupTokens(user);

    if (response === 'UNSUITABLE_FOR_SDO') {
      eventName = 'NotSuitable_SDO';
    } else {
      eventName = 'CREATE_SDO';
    }

    caseData = await apiRequest.startEvent(eventName, caseId);
    let disposalData = eventData['sdoTracks'][response];

    const fastTrackUpliftsEnabled = await checkFastTrackUpliftsEnabled();
    if (!fastTrackUpliftsEnabled) {
      removeFastTrackAllocationFromSdoData(disposalData);
    }

    for (let pageId of Object.keys(disposalData.valid)) {
      await assertValidData(disposalData, pageId);
    }

    if (response === 'UNSUITABLE_FOR_SDO') {
      await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM', null, false);
    } else {
      await assertSubmittedEvent('CASE_PROGRESSION', null, false);
    }

    await waitForFinishedBusinessProcess(caseId);

  },

  createFinalOrder: async (user, finalOrderRequestType) => {
    console.log(`case in Final Order ${caseId}`);
    await apiRequest.setupTokens(user);

    eventName = 'GENERATE_DIRECTIONS_ORDER';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    assertContainsPopulatedFields(returnedCaseData);

    if (finalOrderRequestType === 'ASSISTED_ORDER') {
      await validateEventPages(data.FINAL_ORDERS('ASSISTED_ORDER', mpScenario));
    } else {
      await validateEventPages(data.FINAL_ORDERS('FREE_FORM_ORDER', mpScenario));
    }


    await waitForFinishedBusinessProcess(caseId);
  },

  createCaseFlags: async (user) => {
    if(!(await checkCaseFlagsEnabled())) {
      return;
    }

    eventName = 'CREATE_CASE_FLAGS';

    await apiRequest.setupTokens(user);

    await addAndAssertCaseFlag('caseFlags', CASE_FLAGS.complexCase, caseId);

    const partyFlags = [...getPartyFlags(), ...getPartyFlags()];
    const caseFlagLocations = await getDefinedCaseFlagLocations(user, caseId);

    for(const [index, value] of caseFlagLocations.entries()) {
      await addAndAssertCaseFlag(value, partyFlags[index], caseId);
    }
  },

  manageCaseFlags: async (user) => {
    if(!(await checkCaseFlagsEnabled())) {
      return;
    }

    eventName = 'MANAGE_CASE_FLAGS';

    await apiRequest.setupTokens(user);

    await updateAndAssertCaseFlag('caseFlags', CASE_FLAGS.complexCase, caseId);

    const partyFlags = [...getPartyFlags(), ...getPartyFlags()];
    const caseFlagLocations = await getDefinedCaseFlagLocations(user, caseId);

    for(const [index, value] of caseFlagLocations.entries()) {
      await updateAndAssertCaseFlag(value, partyFlags[index], caseId);
    }
  },

  scheduleHearing: async (user, allocatedTrack) => {
    console.log('Hearing Scheduled for case id ' + caseId);
    await apiRequest.setupTokens(user);

    eventName = 'HEARING_SCHEDULED';

    caseData = await apiRequest.startEvent(eventName, caseId);
    delete caseData['SearchCriteria'];

    let scheduleData = data.HEARING_SCHEDULED(allocatedTrack);

    for (let pageId of Object.keys(scheduleData.valid)) {
      await assertValidData(scheduleData, pageId);
    }

    await assertSubmittedEvent('HEARING_READINESS', null, false);
    await waitForFinishedBusinessProcess(caseId);
  },

  evidenceUploadJudge: async (user, typeOfNote, currentState) => {
    console.log('Evidence Upload of type:' + typeOfNote);
    await apiRequest.setupTokens(user);

    eventName = 'EVIDENCE_UPLOAD_JUDGE';

    caseData = await apiRequest.startEvent(eventName, caseId);
    delete caseData['SearchCriteria'];

    const document = await testingSupport.uploadDocument();
    let caseNoteData = await updateCaseDataWithPlaceholders(data.EVIDENCE_UPLOAD_JUDGE(typeOfNote), document);

    for (let pageId of Object.keys(caseNoteData.valid)) {
      await assertValidData(caseNoteData, pageId);
    }
    delete caseData['noteAdditionDateTime'];

    await assertSubmittedEvent(currentState, null, false);
    await waitForFinishedBusinessProcess(caseId);
  },

  hearingFeePaid: async (user) => {
    await apiRequest.setupTokens(user);

    await apiRequest.paymentUpdate(caseId, '/service-request-update',
      claimData.serviceUpdateDto(caseId, 'paid'));

    const response_msg = await apiRequest.hearingFeePaidEvent(caseId);
    assert.equal(response_msg.status, 200);
    console.log('Hearing Fee Paid');

    await apiRequest.setupTokens(config.applicantSolicitorUser);
    const updatedCaseState = await apiRequest.fetchCaseState(caseId, 'TRIAL_READINESS');
    assert.equal(updatedCaseState, 'PREPARE_FOR_HEARING_CONDUCT_HEARING');
    console.log('State moved to:'+updatedCaseState);
  },

  hearingFeeUnpaid: async (user) => {
    await apiRequest.setupTokens(user);

    const response_msg = await apiRequest.hearingFeeUnpaidEvent(caseId);
    assert.equal(response_msg.status, 200);
    console.log('Hearing Fee Unpaid');

    const updatedCaseState = await apiRequest.fetchCaseState(caseId, 'CASE_PROCEEDS_IN_CASEMAN', user);
    assert.equal(updatedCaseState, 'CASE_DISMISSED');
    console.log('State moved to:'+ updatedCaseState);
  },

  trialReadiness: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'TRIAL_READINESS';
    caseData = await apiRequest.startEvent(eventName, caseId);

    let readinessData = data.TRIAL_READINESS(user);

    for (let pageId of Object.keys(readinessData.valid)) {
      await assertValidData(readinessData, pageId);
    }

    await assertSubmittedEvent('PREPARE_FOR_HEARING_CONDUCT_HEARING', null, false);
    await waitForFinishedBusinessProcess(caseId);
  },

  triggerBundle: async () => {
    const response_msg = await apiRequest.bundleTriggerEvent(caseId);
    const response = await response_msg.text();
    assert.equal(response, 'success');
  },

  evidenceUploadApplicant: async (user, mpScenario='') => {
    await apiRequest.setupTokens(user);
    eventName = 'EVIDENCE_UPLOAD_APPLICANT';
    caseData = await apiRequest.startEvent(eventName, caseId);

    if(caseData.caseProgAllocatedTrack === 'SMALL_CLAIM') {
      console.log('evidence upload small claim applicant for case id ' + caseId);
      let ApplicantEvidenceSmallClaimData = data.EVIDENCE_UPLOAD_APPLICANT_SMALL(mpScenario);
      await validateEventPages(ApplicantEvidenceSmallClaimData);
    }
    if(caseData.caseProgAllocatedTrack === 'FAST_CLAIM' || caseData.caseProgAllocatedTrack === 'MULTI_CLAIM') {
      console.log('evidence upload applicant fast track for case id ' + caseId);
      let ApplicantEvidenceFastClaimData = data.EVIDENCE_UPLOAD_APPLICANT_FAST(mpScenario);
      await validateEventPages(ApplicantEvidenceFastClaimData);
    }
    await assertSubmittedEvent('CASE_PROGRESSION', null, false);
    await waitForFinishedBusinessProcess(caseId);
  },

  evidenceUploadRespondent: async (user, multipartyScenario) => {
    await apiRequest.setupTokens(user);
    eventName = 'EVIDENCE_UPLOAD_RESPONDENT';
    mpScenario = multipartyScenario;
    caseData = await apiRequest.startEvent(eventName, caseId);

    if(caseData.caseProgAllocatedTrack === 'SMALL_CLAIM') {
      console.log('evidence upload small claim respondent for case id ' + caseId);
      let RespondentEvidenceSmallClaimData = data.EVIDENCE_UPLOAD_RESPONDENT_SMALL(mpScenario);
      await validateEventPages(RespondentEvidenceSmallClaimData);
    }
    if(caseData.caseProgAllocatedTrack === 'FAST_CLAIM' || caseData.caseProgAllocatedTrack === 'MULTI_CLAIM') {
      console.log('evidence upload fast claim respondent for case id ' + caseId);
      let RespondentEvidenceFastClaimData = data.EVIDENCE_UPLOAD_RESPONDENT_FAST(mpScenario);
      await validateEventPages(RespondentEvidenceFastClaimData);
    }
    await assertSubmittedEvent('CASE_PROGRESSION', null, false);
    await waitForFinishedBusinessProcess(caseId);
  }
};

// Functions
const validateEventPages = async (data, solicitor) => {
  //transform the data
  console.log('validateEventPages....');
  for (let pageId of Object.keys(data.valid)) {
    if (pageId === 'DocumentUpload' || pageId === 'Upload' || pageId === 'DraftDirections'|| pageId === 'ApplicantDefenceResponseDocument' || pageId === 'DraftDirections') {
      const document = await testingSupport.uploadDocument();
      data = await updateCaseDataWithPlaceholders(data, document);
    }
    //data = await updateCaseDataWithPlaceholders(data);
    await assertValidData(data, pageId, solicitor);
  }
};

const assertValidData = async (data, pageId, solicitor) => {
  console.log(`asserting page: ${pageId} has valid data`);

  const validDataForPage = data.valid[pageId];
  caseData = {...caseData, ...validDataForPage};
  caseData = adjustDataForSolicitor(solicitor, caseData);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    isDifferentSolicitorForDefendantResponseOrExtensionDate() ? caseId : null
  );

  let responseBody = await response.json();
  responseBody = clearDataForSearchCriteria(responseBody); //Until WA release
  responseBody = clearNoCData(responseBody);
  if (eventName === 'INFORM_AGREED_EXTENSION_DATE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForExtensionDate(responseBody, solicitor);
  } else if (eventName === 'DEFENDANT_RESPONSE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForDefendantResponse(responseBody, solicitor);
  }
  if(eventName === 'HEARING_SCHEDULED' && pageId === 'HearingNoticeSelect')
  {
    responseBody = clearHearingLocationData(responseBody);
  }
  if(eventName === 'GENERATE_DIRECTIONS_ORDER') {
    responseBody = clearFinalOrderLocationData(responseBody);
  }
  assert.equal(response.status, 200);

  // eslint-disable-next-line no-prototype-builtins
  let claimValue;
  if (data.valid && data.valid.ClaimValue && data.valid.ClaimValue.claimValue
    && data.valid.ClaimValue.claimValue.statementOfValueInPennies) {
    claimValue = ''+data.valid.ClaimValue.claimValue.statementOfValueInPennies/100;
  }
  if (Object.prototype.hasOwnProperty.call(midEventFieldForPage, pageId)) {
    addMidEventFields(pageId, responseBody, eventName === 'CREATE_SDO' ? data : null, claimValue);
    caseData = removeUiFields(pageId, caseData);
  } else if (eventName === 'CREATE_SDO' && data.midEventData && data.midEventData[pageId]) {
    addMidEventFields(pageId, responseBody, eventName === 'CREATE_SDO' ? data : null, claimValue);
  }
  if (!(responseBody.data.applicant1DQRemoteHearing) && caseData.applicant1DQRemoteHearing) {
    // CIV-3883 depends on backend having the field
    responseBody.data.applicant1DQRemoteHearing = caseData.applicant1DQRemoteHearing;
  }

  if (eventName === 'CREATE_SDO') {
    if(['ClaimsTrack', 'OrderType'].includes(pageId)) {
      delete caseData.hearingMethodValuesDisposalHearing;
      delete caseData.hearingMethodValuesFastTrack;
      delete caseData.hearingMethodValuesSmallClaims;
    }
    if (responseBody.data.sdoOrderDocument) {
      caseData.sdoOrderDocument = responseBody.data.sdoOrderDocument;
    }

    // noinspection EqualityComparisonWithCoercionJS
    if (caseData.drawDirectionsOrder && caseData.drawDirectionsOrder.judgementSum
      && responseBody.data.drawDirectionsOrder && responseBody.data.drawDirectionsOrder.judgementSum
      && caseData.drawDirectionsOrder.judgementSum !== responseBody.data.drawDirectionsOrder.judgementSum
      && caseData.drawDirectionsOrder.judgementSum == responseBody.data.drawDirectionsOrder.judgementSum) {
      // sometimes difference may be because of decimals .0, not an actual difference
      caseData.drawDirectionsOrder.judgementSum = responseBody.data.drawDirectionsOrder.judgementSum;
    }
    if (pageId === 'ClaimsTrack'
      && !(responseBody.data.disposalHearingSchedulesOfLoss)) {
      // disposalHearingSchedulesOfLoss is populated on pageId SDO but then in pageId ClaimsTrack has been removed
      delete caseData.disposalHearingSchedulesOfLoss;
    }
  }

  if (pageId === 'Claimant') {
    delete caseData.applicant1OrganisationPolicy;
  }
  try {
    assert.deepEqual(responseBody.data, caseData);
  }
  catch(err) {
    console.error('Validate data is failed due to a mismatch ..', err);
    console.error('Data different in page ' + pageId);
    whatsTheDifference(caseData, responseBody.data);
    throw err;
  }
};

/**
 * helper function to help locate differences between expected and actual.
 *
 * @param caseData expected
 * @param responseBodyData actual
 * @param path initially undefined
 */
function whatsTheDifference(caseData, responseBodyData, path) {
  Object.keys(caseData).forEach(key => {
    if (Object.keys(responseBodyData).indexOf(key) < 0) {
      console.log('response does not have ' + appendToPath(path, key)
        + '. CaseData has ' + JSON.stringify(caseData[key]));
    } else if (typeof caseData[key] === 'object') {
      whatsTheDifference(caseData[key], responseBodyData[key], [key]);
    } else if (caseData[key] !== responseBodyData[key]) {
      console.log('response and case data are different on ' + appendToPath(path, key));
      console.log('caseData has ' + caseData[key] + ' while response has ' + responseBodyData[key]);
    }
  });
  Object.keys(responseBodyData).forEach(key => {
    if (Object.keys(caseData).indexOf(key) < 0) {
      console.log('caseData does not have ' + appendToPath(path, key)
        + '. Response has ' + JSON.stringify(responseBodyData[key]));
    }
  });
}

function appendToPath(path, key) {
  if (path) {
    return path.concat([key]);
  } else {
    return [key];
  }
}

function removeUiFields(pageId, caseData) {
  console.log(`Removing ui fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];

  if (midEventField.uiField.remove === true) {
    const fieldToRemove = midEventField.uiField.field;
    delete caseData[fieldToRemove];
  }
  return caseData;
}

const assertError = async (pageId, eventData, expectedErrorMessage, responseBodyMessage = 'Unable to proceed because there are one or more callback Errors or Warnings') => {
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    {...caseData, ...eventData},
    isDifferentSolicitorForDefendantResponseOrExtensionDate ? caseId : null,
    422
  );

  const responseBody = await response.json();

  assert.equal(response.status, 422);
  assert.equal(responseBody.message, responseBodyMessage);
  if (responseBody.callbackErrors != null) {
    assert.equal(responseBody.callbackErrors[0], expectedErrorMessage);
  }
};

const assertSubmittedEvent = async (expectedState, submittedCallbackResponseContains, hasSubmittedCallback = true) => {
  await apiRequest.startEvent(eventName, caseId);

  const response = await apiRequest.submitEvent(eventName, caseData, caseId);
  const responseBody = await response.json();
  assert.equal(response.status, 201);
  assert.equal(responseBody.state, expectedState);
  if (hasSubmittedCallback) {
    assert.equal(responseBody.callback_response_status_code, 200);
    assert.include(responseBody.after_submit_callback_response.confirmation_header, submittedCallbackResponseContains.header);
    if(submittedCallbackResponseContains.body) {
      assert.include(responseBody.after_submit_callback_response.confirmation_body, submittedCallbackResponseContains.body);
    }
  }

  if (eventName === 'CREATE_CLAIM') {
    caseId = responseBody.id;
    await addUserCaseMapping(caseId, config.applicantSolicitorUser);
    console.log('Case created: ' + caseId);
  }
};

const assertStartEventNotAllowed = async () => {

  let response = await apiRequest.startEventNotAllowed(eventName, caseId);
  assert.equal(response.status, 422);

};

const assertSubmittedEventWithCaseData = async (updatedCaseData, expectedState, submittedCallbackResponseContains, hasSubmittedCallback = true) => {
  await apiRequest.startEvent(eventName, caseId);

  const response = await apiRequest.submitEvent(eventName, updatedCaseData, caseId);
  const responseBody = await response.json();
  assert.equal(response.status, 201);
  assert.equal(responseBody.state, expectedState);
  if (hasSubmittedCallback) {
    assert.equal(responseBody.callback_response_status_code, 200);
    assert.include(responseBody.after_submit_callback_response.confirmation_header, submittedCallbackResponseContains.header);
    assert.include(responseBody.after_submit_callback_response.confirmation_body, submittedCallbackResponseContains.body);
  }
};
const assertContainsPopulatedFields = (returnedCaseData, solicitor) => {
  const fixture = solicitor ? adjustDataForSolicitor(solicitor, caseData) : caseData;
  for (let populatedCaseField of Object.keys(fixture)) {
    // this property won't be here until civil service is merged
    if (populatedCaseField !== 'applicant1DQRemoteHearing') {
      assert.property(returnedCaseData, populatedCaseField);
    }
  }
};

// Mid event will not return case fields that were already filled in another event if they're present on currently processed event.
// This happens until these case fields are set again as a part of current event (note that this data is not removed from the case).
// Therefore these case fields need to be removed from caseData, as caseData object is used to make assertions
const deleteCaseFields = (...caseFields) => {
  caseFields.forEach(caseField => delete caseData[caseField]);
};

const assertCorrectEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    expect(caseForDisplay.triggers).to.deep.include.members(nonProdExpectedEvents[user.type][state]);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state]);
  }
};

// const assertCaseNotAvailableToUser = async (user) => {
//   console.log(`Asserting user ${user.type} does not have permission to case`);
//   const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId, 404);
//   assert.equal(caseForDisplay.message, `No case found for reference: ${caseId}`);
// };

function addMidEventFields(pageId, responseBody, instanceData, claimAmount) {
  console.log(`Adding mid event fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];
  let midEventData;
  let calculated;

  if (instanceData && instanceData.calculated && instanceData.calculated[pageId]) {
    calculated = instanceData.calculated[pageId];
  }

  if(eventName === 'CREATE_CLAIM'){
    midEventData = data[eventName](mpScenario, claimAmount).midEventData[pageId];
  } else if(eventName === 'CLAIMANT_RESPONSE'){
    midEventData = data[eventName](mpScenario).midEventData[pageId];
  } else if(eventName === 'DEFENDANT_RESPONSE'){
    midEventData = data[eventName]().midEventData[pageId];
  } else if (instanceData && instanceData.midEventData && instanceData.midEventData[pageId]) {
    midEventData = instanceData.midEventData[pageId];
  } else {
    midEventData = data[eventName].midEventData[pageId];
  }
  if (calculated) {
    checkCalculated(calculated, responseBody.data);
  }
  if (midEventField && midEventField.dynamicList === true && midEventField.id != 'applicantSolicitor1PbaAccounts') {
    assertDynamicListListItemsHaveExpectedLabels(responseBody, midEventField.id, midEventData);
  }

  caseData = {...caseData, ...midEventData};
  if (midEventField) {
    responseBody.data[midEventField.id] = caseData[midEventField.id];
  }
}

function assertDynamicListListItemsHaveExpectedLabels(responseBody, dynamicListFieldName, midEventData) {
  const actualDynamicElementLabels = removeUuidsFromDynamicList(responseBody.data, dynamicListFieldName);
  const expectedDynamicElementLabels = removeUuidsFromDynamicList(midEventData, dynamicListFieldName);

  expect(actualDynamicElementLabels).to.deep.equalInAnyOrder(expectedDynamicElementLabels);
}


function checkCalculated(calculated, responseBodyData) {
  const checked = {};
  // strictly check
  Object.keys(calculated).forEach(key => {
    if (caseData[key]) {
      if (calculated[key].call(null, caseData[key]) !== false) {
        checked[key] = caseData[key];
      } else {
        console.log('Failed calculated key on caseData ' + key);
      }
    } else if (responseBodyData[key]) {
      if (calculated[key].call(null, responseBodyData[key]) !== false) {
        checked[key] = caseData[key];
      } else {
        console.log('Failed calculated key on responseBody' + key);
      }
    }
  });
  // update
  Object.keys(checked).forEach((key) => {
    if (caseData[key]) {
      responseBodyData[key] = caseData[key];
    } else {
      caseData[key] = responseBodyData[key];
    }
  });
}

function removeUuidsFromDynamicList(data, dynamicListField) {
  const dynamicElements = data[dynamicListField].list_items;
  // eslint-disable-next-line no-unused-vars
  return dynamicElements.map(({code, ...item}) => item);
}

async function updateCaseDataWithPlaceholders(data, document) {
  const placeholders = {
    TEST_DOCUMENT_URL: document.document_url,
    TEST_DOCUMENT_BINARY_URL: document.document_binary_url,
    TEST_DOCUMENT_FILENAME: document.document_filename
  };

  data = lodash.template(JSON.stringify(data))(placeholders);

  return JSON.parse(data);
}

const assignCase = async () => {
  await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
  switch (mpScenario) {
    case 'ONE_V_TWO_TWO_LEGAL_REP': {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
      break;
    }
    case 'ONE_V_TWO_ONE_LEGAL_REP': {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWO', config.defendantSolicitorUser);
      break;
    }
  }
};

// solicitor 1 should not see details for respondent 2
// solicitor 2 should not see details for respondent 1
const solicitorSetup = (solicitor) => {
  if (solicitor === 'solicitorOne') {
    deleteCaseFields('respondent2');
  } else if (solicitor === 'solicitorTwo') {
    deleteCaseFields('respondent1');
  }
};

const clearDataForExtensionDate = (responseBody, solicitor) => {
  delete responseBody.data['businessProcess'];
  delete responseBody.data['caseNotes'];
  delete responseBody.data['systemGeneratedCaseDocuments'];
  delete responseBody.data['respondent1OrganisationIDCopy'];
  delete responseBody.data['respondent2OrganisationIDCopy'];


  // solicitor cannot see data from respondent they do not represent
  if (solicitor === 'solicitorOne') {
    delete responseBody.data['respondent2ResponseDeadline'];
  }

  if (solicitor === 'solicitorTwo') {
    delete responseBody.data['respondent1'];
    delete responseBody.data['respondent1ResponseDeadline'];
  } else {
    delete responseBody.data['respondent2'];
  }
  return responseBody;
};

const clearDataForSearchCriteria = (responseBody) => {
  delete responseBody.data['SearchCriteria'];
  return responseBody;
};

const clearNoCData = (responseBody) => {
  delete responseBody.data['changeOfRepresentation'];
  return responseBody;
};

const clearHearingLocationData = (responseBody) => {
  delete responseBody.data['hearingLocation'];
  return responseBody;
};

const clearDataForDefendantResponse = (responseBody, solicitor) => {
  delete responseBody.data['businessProcess'];
  delete responseBody.data['caseNotes'];
  delete responseBody.data['systemGeneratedCaseDocuments'];
  delete responseBody.data['respondentSolicitor2Reference'];
  delete responseBody.data['respondent1OrganisationIDCopy'];
  delete responseBody.data['respondent2OrganisationIDCopy'];

  // solicitor cannot see data from respondent they do not represent
  if (solicitor === 'solicitorOne') {
    delete responseBody.data['respondent2ResponseDeadline'];
  }
  if (solicitor === 'solicitorTwo') {
    delete responseBody.data['respondent1'];
    delete responseBody.data['respondent1ClaimResponseType'];
    delete responseBody.data['respondent1ClaimResponseDocument'];
    delete responseBody.data['respondent1DQFileDirectionsQuestionnaire'];
    delete responseBody.data['respondent1DQDisclosureOfElectronicDocuments'];
    delete responseBody.data['respondent1DQDisclosureOfNonElectronicDocuments'];
    delete responseBody.data['respondent1DQExperts'];
    delete responseBody.data['respondent1DQWitnesses'];
    delete responseBody.data['respondent1DQLanguage'];
    delete responseBody.data['respondent1DQHearing'];
    delete responseBody.data['respondent1DQHearingSupport'];
    delete responseBody.data['respondent1DQVulnerabilityQuestions'];
    delete responseBody.data['respondent1DQDraftDirections'];
    delete responseBody.data['respondent1DQRequestedCourt'];
    delete responseBody.data['respondent1DQFurtherInformation'];
    delete responseBody.data['respondent1DQFurtherInformation'];
    delete responseBody.data['respondent1ResponseDeadline'];
    delete responseBody.data['respondent1Experts'];
    delete responseBody.data['respondent1Witnesses'];
    delete responseBody.data['respondent1DetailsForClaimDetailsTab'];
  } else {
    delete responseBody.data['respondent2'];
  }
  return responseBody;
};

const isDifferentSolicitorForDefendantResponseOrExtensionDate = () => {
  return mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP' && (eventName === 'DEFENDANT_RESPONSE' || eventName === 'INFORM_AGREED_EXTENSION_DATE');
};

const adjustDataForSolicitor = (user, data) => {
  let fixtureClone = cloneDeep(data);
  if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
    delete fixtureClone['defendantSolicitorNotifyClaimOptions'];
  }
  if (user === 'solicitorOne') {
    delete fixtureClone['respondent2ResponseDeadline'];
  } else if (user === 'solicitorTwo') {
    delete fixtureClone['respondent1ResponseDeadline'];
  }
  return fixtureClone;
};

const clearFinalOrderLocationData = (responseBody) => {
  delete responseBody.data['finalOrderFurtherHearingComplex'];
  return responseBody;
};
