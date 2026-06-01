const config = require('../config.js');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('./caseRoleAssignmentHelper');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaimSpec.js');
const claimDataSpecFastLRvLiP = require('../fixtures/events/cui/createClaimSpecFastTrackCui.js');
const claimDataSpecIntLRvLiP = require('../fixtures/events/cui/createClaimSpecIntermediateTrackCui.js');
const claimDataSpecMultiLRvLiP = require('../fixtures/events/cui/createClaimSpecMultiTrackCui.js');
const claimDataSpecSmallLRvLiP = require('../fixtures/events/cui/createClaimSpecSmallCui.js');
const createClaimLipClaimant = require('../fixtures/events/cui/createClaimUnrepresentedClaimant');
const defendantResponse = require('../fixtures/events/cui/defendantResponseCui.js');
const mediationUnsuccessful = require('../fixtures/events/cui/unsuccessfulMediationCui.js');
const expectedEvents = require('../fixtures/ccd/expectedEventsLRSpec.js');
const nonProdExpectedEvents = require('../fixtures/ccd/nonProdExpectedEventsLRSpec.js');
const testingSupport = require('./testingSupport');
const {dateNoWeekends, dateNoWeekendsBankHolidayNextDay, date} = require('./dataHelper');
const {uploadDocument, checkOtherRemedyEnabled} = require('./testingSupport');
const {adjustCaseSubmittedDateForCarm} = require('../helpers/carmHelper');
const {fetchCaseDetails} = require('./apiRequest');
const lipClaimantResponse = require('../fixtures/events/cui/lipClaimantResponse');
const discontinueClaimSpec = require('../fixtures/events/discontinueClaimSpec');
const sdoTracks = require('../fixtures/events/createSDO.js');
const sdoTracksOtherRemedy = require('../fixtures/events/createSDOOtherRemedy.js');
const hearingScheduled = require('../fixtures/events/scheduleHearing');
const evidenceUploadApplicant = require('../fixtures/events/evidenceUploadApplicant');
const evidenceUploadRespondent = require('../fixtures/events/evidenceUploadRespondent');
const requestForReconsideration = require('../fixtures/events/requestForReconsideration');
const trialReadiness = require('../fixtures/events/trialReadiness.js');
const lodash = require('lodash');
const createFinalOrder = require('../fixtures/events/finalOrder.js');
const judgeDecisionToReconsiderationRequest = require('../fixtures/events/judgeDecisionOnReconsiderationRequest');
const stayCase = require('../fixtures/events/stayCase');
const manageStay = require('../fixtures/events/manageStay');
const dismissCase = require('../fixtures/events/dismissCase');
const { toJSON } = require('lodash/seq');
const sendAndReplyMessage = require('../fixtures/events/sendAndReplyMessages');
const judgmentMarkPaidInFull = require('../fixtures/events/cui/judgmentMarkPaidInFullCui');
const judgmentOnline1v1Spec = require('../fixtures/events/judgmentOnline1v1Spec');


let caseId, eventName;
let caseData = {};
let bufferAmountSnapshot = {};

const data = {
  CREATE_CLAIM: (scenario) => claimData.createClaim(scenario),
  CREATE_SPEC_CLAIM_FASTTRACK: (scenario) => claimDataSpecFastLRvLiP.createClaim(scenario),
  CREATE_SPEC_CLAIM_INTTRACK: (scenario) => claimDataSpecIntLRvLiP.createClaim(scenario),
  CREATE_SPEC_CLAIM_MULTITRACK: (scenario) => claimDataSpecMultiLRvLiP.createClaim(scenario),
  CREATE_SPEC_CLAIM: (scenario) => claimDataSpecSmallLRvLiP.createClaim(scenario),
  DEFENDANT_RESPONSE: (response) => require('../fixtures/events/defendantResponseSpecCui.js').respondToClaim(response),
  CLAIMANT_RESPONSE: (mpScenario, citizenDefendantResponse, freeMediation, carmEnabled) => require('../fixtures/events/claimantResponseSpecCui.js').claimantResponse(mpScenario, citizenDefendantResponse, freeMediation, carmEnabled),
  CLAIMANT_RESPONSE_INTERMEDIATE_CLAIM: (response, hasLip) => require('../fixtures/events/claimantResponseIntermediateClaimSpec.js').claimantResponse(response, hasLip),
  CLAIMANT_RESPONSE_MULTI_CLAIM: (response, hasLip) => require('../fixtures/events/claimantResponseMultiClaimSpec.js').claimantResponse(response, hasLip),
  REQUEST_JUDGEMENT: (mpScenario) => require('../fixtures/events/requestJudgementSpecCui.js').response(mpScenario),
  INFORM_AGREED_EXTENSION_DATE: () => require('../fixtures/events/informAgreeExtensionDateSpec.js'),
  EXTEND_RESPONSE_DEADLINE_DATE: () => require('../fixtures/events/extendResponseDeadline.js'),
  DISCONTINUE_CLAIM: (mpScenario) => discontinueClaimSpec.discontinueClaim(mpScenario),
  CREATE_SDO: (userInput) => sdoTracks.createSDOSmallWODamageSumInPerson(userInput),
  CREATE_SDO_FAST_TRACK: (userInput) => sdoTracks.createSDOFastTrackSpec(userInput),
  CREATE_SDO_OTHER_REMEDY: (userInput) => sdoTracksOtherRemedy.createSDOSmallWODamageSumInPerson(userInput),
  CREATE_SDO_FAST_TRACK_OTHER_REMEDY: (userInput) => sdoTracksOtherRemedy.createSDOFastTrackSpec(userInput),
  HEARING_SCHEDULED: (allocatedTrack) => hearingScheduled.scheduleHearingForTrialReadiness(allocatedTrack),
  HEARING_SCHEDULED_CUI: (allocatedTrack) => hearingScheduled.scheduleHearingForCui(allocatedTrack),
  EVIDENCE_UPLOAD_CLAIMANT: (mpScenario, document) => evidenceUploadApplicant.createClaimantSmallClaimsEvidenceUpload(document),
  EVIDENCE_UPLOAD_DEFENDANT: (mpScenario, document) => evidenceUploadRespondent.createDefendantSmallClaimsEvidenceUpload(document),
  REQUEST_FOR_RECONSIDERATION: (userType) => requestForReconsideration.createRequestForReconsiderationSpecCitizen(userType),
  TRIAL_READINESS: (user) => trialReadiness.confirmTrialReady(user),
  FINAL_ORDERS: (finalOrdersRequestType, dayPlus0, dayPlus7, dayPlus14, dayPlus21) => createFinalOrder.requestFinalOrder(finalOrdersRequestType, dayPlus0, dayPlus7, dayPlus14, dayPlus21),
  DECISION_ON_RECONSIDERATION_REQUEST: (decisionSelection)=> judgeDecisionToReconsiderationRequest.judgeDecisionOnReconsiderationRequestSpec(decisionSelection),
  STAY_CASE: () => stayCase.stayCaseSpec(),
  MANAGE_STAY_UPDATE: () => manageStay.manageStayRequestUpdate(),
  MANAGE_STAY_LIFT: () => manageStay.manageStayLiftStay(),
  DISMISS_CASE: () => dismissCase.dismissCase(),
  SEND_MESSAGE: () => sendAndReplyMessage.sendMessageLr(),
  REPLY_MESSAGE: (messageCode, messageLabel) => sendAndReplyMessage.replyMessageLr(messageCode, messageLabel)
};

const eventData = {
  defendantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE('FULL_DEFENCE'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE('FULL_ADMISSION'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE('PART_ADMISSION'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE('COUNTER_CLAIM'),
      REQUEST_JUDGEMENT: data.DEFENDANT_RESPONSE('REQUEST_JUDGEMENT'),
    }
  },
  claimantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.CLAIMANT_RESPONSE('FULL_DEFENCE'),
      FULL_DEFENCE_CITIZEN_DEFENDANT:  {
        Yes: data.CLAIMANT_RESPONSE('FULL_DEFENCE', true, 'Yes'),
        No: data.CLAIMANT_RESPONSE('FULL_DEFENCE', true, 'No'),
      },
      FULL_DEFENCE_CITIZEN_DEFENDANT_MEDIATION: {
        Yes: data.CLAIMANT_RESPONSE('FULL_DEFENCE', true, 'Yes', true),
        No: data.CLAIMANT_RESPONSE('FULL_DEFENCE', true, 'No', true)
      },
      FULL_DEFENCE_CITIZEN_DEFENDANT_INTERMEDIATE: {
        No: data.CLAIMANT_RESPONSE_INTERMEDIATE_CLAIM('FULL_DEFENCE', true)
      },
      FULL_DEFENCE_CITIZEN_DEFENDANT_MULTI: {
        No: data.CLAIMANT_RESPONSE_MULTI_CLAIM('FULL_DEFENCE', true)
      },
      FULL_ADMISSION: data.CLAIMANT_RESPONSE('FULL_ADMISSION'),
      PART_ADMISSION: data.CLAIMANT_RESPONSE('PART_ADMISSION'),
      COUNTER_CLAIM: data.CLAIMANT_RESPONSE('COUNTER_CLAIM'),
      PART_ADMISSION_SETTLE: data.CLAIMANT_RESPONSE('PART_ADMISSION_SETTLE'),
    }
  },
  requestJudgement: {
    ONE_V_ONE: {
      REQUEST_JUDGEMENT: data.REQUEST_JUDGEMENT('REQUEST_JUDGEMENT'),
    }
  }
};

module.exports = {

  /**
   * Creates a claim
   *
   * @param user user to create the claim
   * @return {Promise<void>}
   */
  createClaimWithRepresentedRespondent: async (user,scenario = 'ONE_V_ONE') => {

    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};

    let createClaimData  = {};

    createClaimData = data.CREATE_CLAIM(scenario);
    //==============================================================

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimData.userInput)) {
      await assertValidData(createClaimData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');

    await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');

    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');
  },

  createClaimWithUnrepresentedClaimant: async (user, claimType = 'SmallClaims', carmEnabled = false, typeOfData = '', isMintiCase = false) => {
    console.log('Starting to create claim');
    let payload = {};
    await apiRequest.setupTokens(user);
    let userId = await apiRequest.fetchUserId();

    if (claimType === 'FastTrack') {
      console.log('FastTrack claim...');
      payload = createClaimLipClaimant.createClaimUnrepresentedClaimant('15000', userId);
    }
    if ( claimType === 'Request for reconsideration track') {
      console.log('Request for reconsideration claim');
      payload = createClaimLipClaimant.createClaimUnrepresentedClaimant('500', userId);
    }
    if (claimType === 'SmallClaims') {
      console.log('SmallClaim...');
      payload = createClaimLipClaimant.createClaimUnrepresentedClaimant('1500', userId, typeOfData);
    }
    if (claimType === 'INTERMEDIATE') {
      console.log('Intermediate claim...');
      payload = createClaimLipClaimant.createClaimUnrepresentedClaimant('99999', userId);
    }

    caseId = await apiRequest.startCreateCaseForCitizen(payload);
    await waitForFinishedBusinessProcess(caseId);
    console.log('Claim submitted');

    // issue claim
    payload = createClaimLipClaimant.issueClaim();
    await apiRequest.startCreateCaseForCitizen(payload, caseId);
    await waitForFinishedBusinessProcess(caseId);
    console.log('Claim issued');
    await assignCaseRoleToUser(caseId, 'DEFENDANT', config.defendantCitizenUser2);
    await adjustCaseSubmittedDateForCarm(caseId, carmEnabled, (claimType === 'INTERMEDIATE' || claimType === 'MULTI'));
    return caseId;
  },

  retrieveTaskDetails: async (user, caseNumber, taskId) => {
    return apiRequest.fetchTaskDetails(user, caseNumber, taskId);
  },

  assignTaskToUser: async (user, taskId) => {
    return apiRequest.taskActionByUser(user, taskId, 'claim');
  },

  createSpecifiedClaimWithUnrepresentedRespondent: async (user, multipartyScenario, claimType, carmEnabled = false) => {
    console.log(' Creating specified claim');
    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};
    let createClaimSpecData;
    if (claimType === 'MULTI') {
      console.log('Creating MultiTrack claim...');
      createClaimSpecData = data.CREATE_SPEC_CLAIM_MULTITRACK(multipartyScenario);
    } else if (claimType === 'INTERMEDIATE') {
      console.log('Creating IntermediateTrack claim...');
      createClaimSpecData = data.CREATE_SPEC_CLAIM_INTTRACK(multipartyScenario);
    } else if (claimType === 'FastTrack') {
      console.log('Creating FastTrack claim...');
      createClaimSpecData = data.CREATE_SPEC_CLAIM_FASTTRACK(multipartyScenario);
    } else {
      console.log('Creating small claims...');
      createClaimSpecData = data.CREATE_SPEC_CLAIM(multipartyScenario);
    }

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimSpecData.userInput)) {
      await assertValidData(createClaimSpecData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');
    await waitForFinishedBusinessProcess(caseId);

    await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
    claimData.serviceUpdateDto(caseId, 'paid'));
    console.log('Service request update sent to callback URL');

    await waitForFinishedBusinessProcess(caseId);
    if (claimType !== 'pinInPost') {
      await assignCaseRoleToUser(caseId, 'DEFENDANT', config.defendantCitizenUser2);
    }

    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');

    await adjustCaseSubmittedDateForCarm(caseId, carmEnabled, (claimType === 'INTERMEDIATE' || claimType === 'MULTI'));

    return caseId;
  },

  performCitizenDefendantResponse: async (user, caseId, claimType = 'SmallClaims', carmEnabled = false, typeOfResponse = '') => {
    let eventName = 'DEFENDANT_RESPONSE_CUI';
    let payload = {};
    if (claimType === 'FastTrack') {
      console.log('FastTrack claim...');
      payload = defendantResponse.createDefendantResponse('15000', carmEnabled);
    }
    if (claimType === 'Request for reconsideration track') {
      console.log('Request for reconsideration claim');
      payload = defendantResponse.createDefendantResponse('500', carmEnabled);
    }
    if (claimType === 'SmallClaims') {
      console.log('SmallClaim...');
      payload = defendantResponse.createDefendantResponse('1500', carmEnabled, typeOfResponse);
    }
    if (claimType === 'SmallClaimPartAdmit') {
      console.log('SmallClaim part admit lip defendant response...');
      payload = defendantResponse.createDefendantResponseSmallClaimPartAdmitCarm();
    }
    if (claimType === 'INTERMEDIATE') {
      console.log('Intermediate lip defendant response...');
      payload = defendantResponse.createDefendantResponseIntermediateTrack();
    }
    if (claimType === 'MULTI') {
      console.log('Multi lip defendant response...');
      payload = defendantResponse.createDefendantResponseMultiTrack();
    }

    //console.log('The payload : ' + payload);
    await apiRequest.setupTokens(user);
    await apiRequest.startEventForCitizen(eventName, caseId, payload);
    await waitForFinishedBusinessProcess(caseId);
  },

  performCitizenClaimantResponse: async (user, caseId, expectedEndState, carmEnabled, typeOfData) => {
    let eventName = 'CLAIMANT_RESPONSE_CUI';
    let payload = lipClaimantResponse.claimantResponse(carmEnabled, typeOfData);
    if (typeOfData === 'partadmit') {
      payload = lipClaimantResponse.claimantResponsePartAdmitRejectCarm();
    }

    await apiRequest.setupTokens(user);
    await apiRequest.startEventForCitizen(eventName, caseId, payload, expectedEndState);
    await waitForFinishedBusinessProcess(caseId);

    if (typeOfData === 'FA_ACCEPT_CCJ' || typeOfData === 'PA_ACCEPT_CCJ') {
      expectedEndState = 'All_FINAL_ORDERS_ISSUED';
    }
    if (expectedEndState) {
      const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
      assert.equal(response.state, expectedEndState);
    }
  },

  judgmentPaidInFullCui: async (user, caseId) => {
    let eventName = 'JUDGMENT_PAID_IN_FULL';
    let payload = judgmentMarkPaidInFull.markJudgmentPaidInFull();
    await apiRequest.setupTokens(user);
    await apiRequest.startEventForCitizen(eventName, caseId, payload);
    await waitForFinishedBusinessProcess(caseId);
  },

  markJudgmentPaid: async (user) => {
    console.log(`case in All final orders issued ${caseId}`);
    await apiRequest.setupTokens(user);
    eventName = 'JUDGMENT_PAID_IN_FULL';
    caseData = await apiRequest.startEvent(eventName, caseId);
    let payload = judgmentOnline1v1Spec.markJudgmentPaidInFull();
    for (let pageId of Object.keys(payload.userInput)) {
      await assertValidData(payload, pageId);
    }
    await assertSubmittedEvent('All_FINAL_ORDERS_ISSUED', {
      header: '# Judgment marked as paid in full',
      body: 'The judgment has been marked as paid in full'
    }, true);
    await waitForFinishedBusinessProcess(caseId);
  },

  createSDO: async (user, response = 'CREATE_DISPOSAL') => {
    console.log('SDO for case id ' + caseId);
    await apiRequest.setupTokens(user);
    let disposalData;
    if (response === 'UNSUITABLE_FOR_SDO') {
      eventName = 'NotSuitable_SDO';
    } else if (response === 'CREATE_FAST') {
      eventName = 'CREATE_SDO';
      disposalData = data.CREATE_SDO_FAST_TRACK();
      if(await checkOtherRemedyEnabled())
        disposalData = data.CREATE_SDO_FAST_TRACK_OTHER_REMEDY();
    } else {
      eventName = 'CREATE_SDO';
      disposalData = data.CREATE_SDO();
      if(await checkOtherRemedyEnabled())
        disposalData = data.CREATE_SDO_OTHER_REMEDY();
    }

    caseData = await apiRequest.startEvent(eventName, caseId);

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

  judgeDecisionOnReconsiderationRequest: async (user, decisionOption) => {
    console.log('judgeDecisionOnReconsiderationRequest for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'DECISION_ON_RECONSIDERATION_REQUEST';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.DECISION_ON_RECONSIDERATION_REQUEST(decisionOption);
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_PROGRESSION', {
      header: '# Response has been submitted',
      body: ''
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },


  evidenceUploadApplicant: async (user) => {
    await apiRequest.setupTokens(user);
    const document = await uploadDocument();
    let payload = data.EVIDENCE_UPLOAD_CLAIMANT('ONE_V_ONE', document);

    caseData = await apiRequest.startEventForCitizen(eventName, caseId, payload);
    await waitForFinishedBusinessProcess(caseId);
  },

  evidenceUploadDefendant: async (user) => {
    await apiRequest.setupTokens(user);
    const document = await uploadDocument();
    let payload = data.EVIDENCE_UPLOAD_DEFENDANT('ONE_V_ONE', document);

    caseData = await apiRequest.startEventForCitizen(eventName, caseId, payload);

    await waitForFinishedBusinessProcess(caseId);
  },

  requestForReconsiderationCitizen: async (user) => {
    await apiRequest.setupTokens(user);
    let payload;
    if (user === 'Claimant') {
      payload = data.REQUEST_FOR_RECONSIDERATION('Claimant');
    } else {
      payload = data.REQUEST_FOR_RECONSIDERATION('Defendant');
    }

    caseData = await apiRequest.startEventForCitizen(eventName, caseId, payload);

    await waitForFinishedBusinessProcess(caseId);

  },

  amendHearingDueDate: async (user) => {
    let hearingDueDate;
    hearingDueDate = {'hearingDueDate': '2022-01-10'};
    await testingSupport.updateCaseData(caseId, hearingDueDate, user);
  },

  hearingFeePaid: async (user) => {
    await apiRequest.setupTokens(user);

    await apiRequest.paymentUpdate(caseId, '/service-request-update',
      claimData.serviceUpdateDto(caseId, 'paid'));

    const response_msg = await apiRequest.hearingFeePaidEvent(caseId);
    assert.equal(response_msg.status, 200);
    console.log('Hearing Fee Paid');
  },

  trialReadinessCitizen: async (user) => {
    await apiRequest.setupTokens(user);

    let payload = data.TRIAL_READINESS(user);

    caseData = await apiRequest.startEventForCitizen(eventName, caseId, payload);

    await waitForFinishedBusinessProcess(caseId);

  },

  scheduleHearing: async (user, allocatedTrack = 'OTHER', claimType, expectedState = 'HEARING_READINESS') => {
    console.log('Hearing Scheduled for case id ' + caseId);
    await apiRequest.setupTokens(user);

    eventName = 'HEARING_SCHEDULED';

    caseData = await apiRequest.startEvent(eventName, caseId);
    delete caseData['SearchCriteria'];
    let scheduleData;
    if (claimType === 'CUI') {
      scheduleData = data.HEARING_SCHEDULED_CUI(allocatedTrack);
    } else {
      scheduleData = data.HEARING_SCHEDULED(allocatedTrack);
    }

    for (let pageId of Object.keys(scheduleData.valid)) {
      await assertValidData(scheduleData, pageId);
    }
    await assertSubmittedEvent(expectedState, null, false);
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

    const dayPlus0 = await dateNoWeekendsBankHolidayNextDay(0);
    const dayPlus7 = await dateNoWeekendsBankHolidayNextDay(7);
    const dayPlus14 = await dateNoWeekendsBankHolidayNextDay(14);
    const dayPlus21 = await dateNoWeekendsBankHolidayNextDay(21);

    if (finalOrderRequestType === 'ASSISTED_ORDER') {
      await validateEventPages(data.FINAL_ORDERS('ASSISTED_ORDER', dayPlus0, dayPlus7, dayPlus14, dayPlus21));
    } else {
      await validateEventPages(data.FINAL_ORDERS('FREE_FORM_ORDER', dayPlus0, dayPlus7, dayPlus14, dayPlus21));
    }

    await waitForFinishedBusinessProcess(caseId);
  },


  mediationUnsuccessful: async (user, carmEnabled = false) => {
    eventName = 'MEDIATION_UNSUCCESSFUL';

    caseData = await apiRequest.startEvent(eventName, caseId);
    caseData = {...caseData, ...mediationUnsuccessful.unsuccessfulMediation(carmEnabled)};
    await apiRequest.setupTokens(user);
    await assertSubmittedEvent('JUDICIAL_REFERRAL');
    await waitForFinishedBusinessProcess(caseId);
    console.log('End of unsuccessful mediation');
  },

  cleanUp: async () => {
    await unAssignAllUsers();
  },

  getCaseId: async () => {
    console.log(`case created: ${caseId}`);
    return caseId;
  },

  verifyEventsAvailable: async (user, state) => {
    await assertCorrectEventsAreAvailableToUser(user, state);
  },

  verifyCaseState: async (expectedState) => {
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    assert.equal(response.state, expectedState,
      `Expected case state ${expectedState} but got ${response.state}`);
  },

  verifyActiveJudgmentCancelled: async () => {
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    const cd = response.case_data || {};
    const activeJudgment = cd.activeJudgment;
    if (activeJudgment !== null && activeJudgment !== undefined) {
      assert.equal(activeJudgment.state, 'CANCELLED',
        `Expected activeJudgment.state CANCELLED but got ${activeJudgment.state}`);
    } else {
      assert.notEqual(cd.joIsLiveJudgmentExists, 'Yes',
        'activeJudgment cleared but joIsLiveJudgmentExists still Yes - pending DJ not properly cancelled');
    }
  },

  verifyBufferStateInitialFields: async () => {
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    const cd = response.case_data || {};
    const aj = cd.activeJudgment;

    assert.ok(aj, 'Expected activeJudgment to exist in buffer state but got null/undefined');

    // State / RTL fields - prove no judgment issued/registered yet
    assert.equal(aj.state, 'PENDING_ISSUE', `expected activeJudgment.state=PENDING_ISSUE, got ${aj.state}`);
    assert.isTrue(aj.issueDate === null || aj.issueDate === undefined,
      `expected issueDate null/undefined, got ${aj.issueDate}`);
    assert.equal(aj.isRegisterWithRTL, 'No', `expected isRegisterWithRTL='No', got ${aj.isRegisterWithRTL}`);
    assert.isTrue(aj.rtlState === null || aj.rtlState === undefined,
      `expected rtlState null/undefined, got ${aj.rtlState}`);

    // Request-time fields (from DefaultJudgementSpecHandler / DefaultJudgmentOnlineMapper)
    assert.equal(aj.type, 'DEFAULT_JUDGMENT', `expected type=DEFAULT_JUDGMENT, got ${aj.type}`);
    assert.ok(aj.requestDate, 'expected requestDate populated');
    assert.ok(aj.judgmentId, 'expected judgmentId populated');
    assert.ok(aj.defendant1Name, 'expected defendant1Name populated');
    assert.ok(aj.defendant1Address, 'expected defendant1Address populated');
    assert.ok(aj.paymentPlan, 'expected paymentPlan populated');
    assert.ok(aj.paymentPlan.type, 'expected paymentPlan.type populated');
    if (aj.paymentPlan.type === 'PAY_IN_INSTALMENTS') {
      assert.ok(aj.instalmentDetails, 'expected instalmentDetails for PAY_IN_INSTALMENTS plan');
      assert.ok(aj.instalmentDetails.amount, 'expected instalmentDetails.amount');
      assert.ok(aj.instalmentDetails.startDate, 'expected instalmentDetails.startDate');
      assert.ok(aj.instalmentDetails.paymentFrequency, 'expected instalmentDetails.paymentFrequency');
    }

    // Amount fields + calculation check
    assert.ok(aj.orderedAmount, 'expected orderedAmount populated');
    assert.ok(aj.claimFeeAmount, 'expected claimFeeAmount populated');
    assert.ok(aj.costs, 'expected costs populated');
    assert.ok(aj.totalAmount, 'expected totalAmount populated');
    const expectedTotal = parseInt(aj.orderedAmount) + parseInt(aj.claimFeeAmount) + parseInt(aj.costs);
    assert.equal(parseInt(aj.totalAmount), expectedTotal,
      `totalAmount calc: expected ${aj.orderedAmount}+${aj.claimFeeAmount}+${aj.costs}=${expectedTotal}, got ${aj.totalAmount}`);

    assert.isTrue(cd.joIsLiveJudgmentExists === null || cd.joIsLiveJudgmentExists === undefined || cd.joIsLiveJudgmentExists === 'No',
      `expected joIsLiveJudgmentExists NOT yet 'Yes' at PENDING_ISSUE, got ${cd.joIsLiveJudgmentExists}`);
    assert.ok(cd.joDJCreatedDate, 'expected joDJCreatedDate populated (DJ request timestamp)');
    assert.isTrue(typeof cd.joDJCreatedDate === 'string' && cd.joDJCreatedDate.startsWith(aj.requestDate),
      `expected joDJCreatedDate (${cd.joDJCreatedDate}) to start with requestDate (${aj.requestDate})`);
    console.log(`Request-time interest/breakdown captured: totalInterest=${cd.totalInterest}, joRepaymentSummaryObject=${JSON.stringify(cd.joRepaymentSummaryObject)}`);

    bufferAmountSnapshot = {
      caseId,
      orderedAmount: aj.orderedAmount,
      claimFeeAmount: aj.claimFeeAmount,
      costs: aj.costs,
      totalAmount: aj.totalAmount,
      totalInterest: cd.totalInterest,
      joRepaymentSummaryObject: cd.joRepaymentSummaryObject,
      requestDate: aj.requestDate,
      joDJCreatedDate: cd.joDJCreatedDate,
      paymentPlanType: aj.paymentPlan.type,
    };

    console.log(`PENDING_ISSUE verified: state=${aj.state}, joIsLiveJudgmentExists=${cd.joIsLiveJudgmentExists}, type=${aj.type}, requestDate=${aj.requestDate}, paymentPlan=${aj.paymentPlan.type}, ordered=${aj.orderedAmount}, claimFee=${aj.claimFeeAmount}, costs=${aj.costs}, total=${aj.totalAmount}, totalInterest=${cd.totalInterest}, joDJCreatedDate=${cd.joDJCreatedDate}`);
  },

  verifyNotificationSent: async (caseIdToQuery, templateId, recipientEmail, user = config.applicantSolicitorUser) => {
    const entries = await apiRequest.fetchSentNotifications(user, caseIdToQuery, templateId, recipientEmail);
    assert.isAtLeast(entries.length, 1,
      `Expected at least 1 notification for caseId=${caseIdToQuery}, templateId=${templateId}, recipient=${recipientEmail}, got ${entries.length}`);
  },

  verifyAnyNotificationSent: async (caseIdToQuery, user = config.applicantSolicitorUser) => {
    const entries = await apiRequest.fetchSentNotifications(user, caseIdToQuery);
    console.log(`Notification audit for caseId=${caseIdToQuery}: ${entries.length} entries`);
    entries.forEach(e => console.log(`  template=${e.templateId} recipient=${e.recipientEmail} ref=${e.reference}`));
    assert.isAtLeast(entries.length, 1,
      `Expected at least 1 notification for caseId=${caseIdToQuery}, got 0`);
  },

  verifyDefendantResponseNotificationsSent: async (
    ccdCaseId,
    user = config.applicantSolicitorUser,
    expectedApplicantTemplateId = '51fd3ba4-63ca-4ab7-b11a-0ceb8775de9f',
    expectedRespondentTemplateId = 'e763e30d-ac6d-4d95-8dc9-1ed71dd1aa1b'
  ) => {
    const response = await apiRequest.fetchCaseDetails(config.adminUser, ccdCaseId);
    const legacyRef = response.case_data ? response.case_data.legacyCaseReference : null;
    assert.ok(legacyRef, `Expected legacyCaseReference for ccdCaseId=${ccdCaseId}`);
    const entries = await apiRequest.fetchSentNotifications(user, legacyRef);
    console.log(`Notification audit for legacyRef=${legacyRef}: ${entries.length} entries`);
    entries.forEach(e => console.log(`  template=${e.templateId} recipient=${e.recipientEmail} ref=${e.reference}`));

    const applicantNotif = entries.find(e => e.reference && e.reference.includes('defendant-response-applicant-notification'));
    const respondentNotif = entries.find(e => e.reference && e.reference.includes('defendant-lip-response-respondent-notification'));

    assert.ok(applicantNotif,
      `AC6: Expected defendant-response-applicant-notification reference for legacyRef=${legacyRef}`);
    assert.ok(respondentNotif,
      `AC6: Expected defendant-lip-response-respondent-notification reference for legacyRef=${legacyRef}`);

    assert.equal(applicantNotif.templateId, expectedApplicantTemplateId,
      `AC6: Expected applicant template ${expectedApplicantTemplateId} (unchanged from normal defence flow), got ${applicantNotif.templateId}`);
    assert.equal(respondentNotif.templateId, expectedRespondentTemplateId,
      `AC6: Expected respondent template ${expectedRespondentTemplateId} (unchanged from normal defence flow), got ${respondentNotif.templateId}`);
  },

  amendRespondent1ResponseDeadline: async (user) => {
    await apiRequest.setupTokens(user);
    const respondent1deadline = {'respondent1ResponseDeadline': '2025-11-19T15:59:50'};
    await testingSupport.updateCaseData(caseId, respondent1deadline);
    console.log('ResponseDeadline updated');
  },

  waitForBusinessProcessFinished: async () => {
    await waitForFinishedBusinessProcess(caseId);
  },

  amendJoDJCreatedDate: async (hoursAgo = 144) => {
    // joDJCreatedDate is compared against a Europe/London wall-clock cutoff, so build it in London local time
    const target = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    const p = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Europe/London',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).formatToParts(target).reduce((acc, part) => (acc[part.type] = part.value, acc), {});
    const hour = p.hour === '24' ? '00' : p.hour;
    const backdated = `${p.year}-${p.month}-${p.day}T${hour}:${p.minute}:${p.second}`;
    await testingSupport.updateCaseData(caseId, {'joDJCreatedDate': backdated});
    console.log(`joDJCreatedDate backdated to ${backdated} (Europe/London, ${hoursAgo}h ago)`);
  },

  listSchedulers: async (user = config.applicantSolicitorUser) => {
    const names = await apiRequest.listSchedulers(user);
    console.log(`Registered schedulers: ${JSON.stringify(names)}`);
    return names;
  },

  runScheduler: async (schedulerName, user = config.applicantSolicitorUser) => {
    await apiRequest.triggerScheduler(user, schedulerName);
    console.log(`Scheduler ${schedulerName} triggered`);
  },

  runSchedulerExpectingNotFound: async (schedulerName, user = config.applicantSolicitorUser) => {
    await apiRequest.triggerScheduler(user, schedulerName, 404);
    console.log(`Scheduler ${schedulerName} correctly returned 404`);
  },

  verifyJudgmentBufferIssued: async (maxAttempts = 60, intervalMs = 5000) => {
    const todayLondon = new Intl.DateTimeFormat('en-CA', {timeZone: 'Europe/London'}).format(new Date());
    const todayUtc = new Intl.DateTimeFormat('en-CA', {timeZone: 'UTC'}).format(new Date());
    let last = {};
    let cdSnapshot = {};
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
      cdSnapshot = response.case_data || {};
      last.state = response.state;
      last.judgment = cdSnapshot.activeJudgment;
      last.bp = cdSnapshot.businessProcess;
      const bpFinished = !last.bp || !last.bp.status || last.bp.status === 'FINISHED';
      const judgmentIssued = last.judgment && last.judgment.state === 'ISSUED';
      const stateFinal = last.state === 'All_FINAL_ORDERS_ISSUED';
      if (judgmentIssued && stateFinal && bpFinished) {
        const aj = last.judgment;
        console.log(`Buffer issued after ${attempt} attempts (state=${last.state}, bp=${last.bp && last.bp.status}, issueDate=${aj.issueDate})`);

        // State-transition fields (set by DefaultJudgementGrantedSpecCallbackHandler.updateCaseData)
        assert.isTrue(aj.issueDate === todayLondon || aj.issueDate === todayUtc,
          `expected issueDate to be today (${todayLondon} London / ${todayUtc} UTC), got ${aj.issueDate}`);
        assert.equal(aj.rtlState, 'R', `expected rtlState='R', got ${aj.rtlState}`);
        assert.equal(aj.isRegisterWithRTL, 'Yes', `expected isRegisterWithRTL='Yes', got ${aj.isRegisterWithRTL}`);
        assert.equal(cdSnapshot.joIsLiveJudgmentExists, 'Yes',
          `expected joIsLiveJudgmentExists='Yes' at grant, got ${cdSnapshot.joIsLiveJudgmentExists}`);
        if (last.bp && last.bp.camundaEvent) {
          assert.equal(last.bp.camundaEvent, 'DEFAULT_JUDGEMENT_NON_DIVERGENT_SPEC',
            `expected camundaEvent=DEFAULT_JUDGEMENT_NON_DIVERGENT_SPEC, got ${last.bp.camundaEvent}`);
        }

        // Preserved request-time fields (must survive request → grant transition)
        assert.equal(aj.type, 'DEFAULT_JUDGMENT', `expected type=DEFAULT_JUDGMENT, got ${aj.type}`);
        assert.ok(aj.requestDate, 'expected requestDate preserved from request');
        assert.ok(aj.judgmentId, 'expected judgmentId preserved');
        assert.ok(aj.defendant1Name, 'expected defendant1Name preserved');
        assert.ok(aj.defendant1Address, 'expected defendant1Address preserved');
        assert.ok(aj.paymentPlan && aj.paymentPlan.type, 'expected paymentPlan preserved');
        if (aj.paymentPlan.type === 'PAY_IN_INSTALMENTS') {
          assert.ok(aj.instalmentDetails, 'expected instalmentDetails preserved for PAY_IN_INSTALMENTS plan');
          assert.ok(aj.instalmentDetails.amount, 'expected instalmentDetails.amount preserved');
          assert.ok(aj.instalmentDetails.paymentFrequency, 'expected instalmentDetails.paymentFrequency preserved');
        }
        assert.ok(aj.orderedAmount, 'expected orderedAmount preserved');
        assert.ok(aj.claimFeeAmount, 'expected claimFeeAmount preserved');
        assert.ok(aj.costs, 'expected costs preserved');
        assert.ok(aj.totalAmount, 'expected totalAmount preserved');
        const expectedTotal = parseInt(aj.orderedAmount) + parseInt(aj.claimFeeAmount) + parseInt(aj.costs);
        assert.equal(parseInt(aj.totalAmount), expectedTotal,
          `totalAmount calc: expected ${aj.orderedAmount}+${aj.claimFeeAmount}+${aj.costs}=${expectedTotal}, got ${aj.totalAmount}`);

        // Case-level fields
        assert.ok(cdSnapshot.joDJCreatedDate, 'expected joDJCreatedDate preserved');

        assert.equal(bufferAmountSnapshot.caseId, caseId,
          `AC3 snapshot missing or for a different case (snapshot=${bufferAmountSnapshot.caseId}, current=${caseId}) - capture verifyBufferStateInitialFields on this case before issuing`);
        {
          assert.equal(aj.orderedAmount, bufferAmountSnapshot.orderedAmount,
            `AC3: orderedAmount changed during buffer (was ${bufferAmountSnapshot.orderedAmount}, now ${aj.orderedAmount})`);
          assert.equal(aj.claimFeeAmount, bufferAmountSnapshot.claimFeeAmount,
            `AC3: claimFeeAmount changed during buffer (was ${bufferAmountSnapshot.claimFeeAmount}, now ${aj.claimFeeAmount})`);
          assert.equal(aj.costs, bufferAmountSnapshot.costs,
            `AC3: costs changed during buffer (was ${bufferAmountSnapshot.costs}, now ${aj.costs})`);
          assert.equal(aj.totalAmount, bufferAmountSnapshot.totalAmount,
            `AC3: totalAmount changed during buffer (was ${bufferAmountSnapshot.totalAmount}, now ${aj.totalAmount})`);
          assert.equal(String(cdSnapshot.totalInterest), String(bufferAmountSnapshot.totalInterest),
            `AC3: totalInterest accrued during buffer (was ${bufferAmountSnapshot.totalInterest}, now ${cdSnapshot.totalInterest})`);
          assert.equal(aj.requestDate, bufferAmountSnapshot.requestDate,
            `requestDate changed during buffer (was ${bufferAmountSnapshot.requestDate}, now ${aj.requestDate})`);
          assert.equal(JSON.stringify(cdSnapshot.joRepaymentSummaryObject), JSON.stringify(bufferAmountSnapshot.joRepaymentSummaryObject),
            'AC3: joRepaymentSummaryObject (interest breakdown) changed during the buffer');
        }

        console.log(`ISSUED verified: state=${aj.state}, issueDate=${aj.issueDate}, joIsLiveJudgmentExists=${cdSnapshot.joIsLiveJudgmentExists}, rtlState=${aj.rtlState}, isRegisterWithRTL=${aj.isRegisterWithRTL}, requestDate=${aj.requestDate}, type=${aj.type}, paymentPlan=${aj.paymentPlan.type}, ordered=${aj.orderedAmount}, claimFee=${aj.claimFeeAmount}, costs=${aj.costs}, total=${aj.totalAmount}, totalInterest=${cdSnapshot.totalInterest}, camundaEvent=${last.bp && last.bp.camundaEvent}`);
        return aj;
      }
      console.log(`Attempt ${attempt}/${maxAttempts}: state=${last.state}, judgment.state=${last.judgment && last.judgment.state}, bp=${last.bp && last.bp.status}`);
      // re-fire the scheduler periodically in case a trigger was queued/delayed
      if (attempt % 6 === 0) {
        await apiRequest.triggerScheduler(config.applicantSolicitorUser, 'JudgementBuffer');
        console.log(`Re-triggered JudgementBuffer scheduler at attempt ${attempt}`);
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    assert.fail(`Judgment buffer did not complete in ${maxAttempts * intervalMs / 1000}s. Last: ${JSON.stringify(last)}`);
  },

  verifyJudgmentBufferUnchanged: async (waitMs = 15000) => {
    console.log(`Waiting ${waitMs}ms then verifying case stayed in JUDGMENT_REQUESTED...`);
    await new Promise(resolve => setTimeout(resolve, waitMs));
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    const judgment = response.case_data ? response.case_data.activeJudgment : null;
    assert.equal(response.state, 'JUDGMENT_REQUESTED',
      `Expected case state JUDGMENT_REQUESTED but got ${response.state}. Buffer scheduler issued too early.`);
    if (judgment) {
      assert.notEqual(judgment.state, 'ISSUED',
        `activeJudgment unexpectedly ISSUED (issueDate=${judgment.issueDate}). Buffer scheduler issued too early.`);
    }
    console.log(`Confirmed: state=${response.state}, activeJudgment.state=${judgment && judgment.state}`);
  },

  verifyBufferNotIssuedAfterScheduler: async (expectedState, waitMs = 12000) => {
    await new Promise(resolve => setTimeout(resolve, waitMs));
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    const cd = response.case_data || {};
    const aj = cd.activeJudgment;
    assert.equal(response.state, expectedState,
      `Expected case to stay in ${expectedState} after scheduler run but got ${response.state}`);
    assert.isTrue(!aj || aj.state !== 'ISSUED',
      `activeJudgment unexpectedly ISSUED (state=${aj && aj.state}) for a case in ${expectedState}`);
    console.log(`Confirmed NOT issued by scheduler: state=${response.state}, activeJudgment.state=${aj && aj.state}`);
  },

  verifyInstalmentDetails: async (expectedFrequency = 'MONTHLY') => {
    const response = await apiRequest.fetchCaseDetails(config.adminUser, caseId);
    const aj = (response.case_data || {}).activeJudgment;
    assert.ok(aj, 'expected activeJudgment for instalment check');
    assert.equal(aj.paymentPlan.type, 'PAY_IN_INSTALMENTS',
      `expected paymentPlan.type=PAY_IN_INSTALMENTS, got ${aj.paymentPlan.type}`);
    assert.ok(aj.instalmentDetails, 'expected instalmentDetails populated for instalment plan');
    assert.equal(aj.instalmentDetails.paymentFrequency, expectedFrequency,
      `expected instalmentDetails.paymentFrequency=${expectedFrequency}, got ${aj.instalmentDetails.paymentFrequency}`);
    assert.ok(aj.instalmentDetails.amount, 'expected instalmentDetails.amount');
    assert.ok(aj.instalmentDetails.startDate, 'expected instalmentDetails.startDate');
    console.log(`Instalment plan verified: type=${aj.paymentPlan.type}, frequency=${aj.instalmentDetails.paymentFrequency}, amount=${aj.instalmentDetails.amount}, startDate=${aj.instalmentDetails.startDate}`);
  },

  verifyDjGrantNotificationsSent: async (ccdCaseId, user = config.applicantSolicitorUser) => {
    const cd = (await apiRequest.fetchCaseDetails(config.adminUser, ccdCaseId)).case_data;
    const legacyRef = cd && cd.legacyCaseReference;
    assert.ok(legacyRef, `expected legacyCaseReference for ccdCaseId=${ccdCaseId}`);
    const entries = await apiRequest.fetchSentNotifications(user, legacyRef);
    entries.forEach(e => console.log(`  notif audit: ref=${e.reference} template=${e.templateId} recipient=${e.recipientEmail}`));
    const djNotifs = entries.filter(e => e.reference && /dj|default.?judg|judgment/i.test(e.reference));
    assert.isAtLeast(djNotifs.length, 1,
      `AC1: expected >=1 default-judgment notification at grant for legacyRef=${legacyRef}, got refs: ${JSON.stringify(entries.map(e => e.reference))}`);
    console.log(`DJ grant notifications sent (${djNotifs.length}): ${djNotifs.map(e => e.reference).join(', ')}`);
  },

  defendantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE') => {
    await apiRequest.setupTokens(user);
    eventName = 'DEFENDANT_RESPONSE_SPEC';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    let defendantResponseData = eventData['defendantResponses'][scenario][response];

    caseData = returnedCaseData;

    console.log(`${response} ${scenario}`);

    for (let pageId of Object.keys(defendantResponseData.userInput)) {
      await assertValidData(defendantResponseData, pageId);
    }

    if(scenario === 'ONE_V_ONE')
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    else if(scenario === 'ONE_V_TWO')
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    else if (scenario === 'TWO_V_ONE')
      if (response === 'DIFF_FULL_DEFENCE' || response === 'DIFF_FULL_DEFENCE_PBAv3')
        await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM');
      else
        await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');

    await waitForFinishedBusinessProcess(caseId);

    deleteCaseFields('respondent1Copy');
  },

  claimantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE', freeMediation = 'Yes',
                           expectedCcdState, carmEnabled = false, claimType = 'SmallClaims') => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE_SPEC';
    caseData = await apiRequest.startEvent(eventName, caseId);

    if (carmEnabled) {
      response = 'FULL_DEFENCE_CITIZEN_DEFENDANT_MEDIATION';
    } else if (claimType === 'INTERMEDIATE') {
      response = 'FULL_DEFENCE_CITIZEN_DEFENDANT_INTERMEDIATE';
    } else if (claimType === 'MULTI') {
      response = 'FULL_DEFENCE_CITIZEN_DEFENDANT_MULTI';
    }

    let claimantResponseData = eventData['claimantResponses'][scenario][response][freeMediation];

    for (let pageId of Object.keys(claimantResponseData.userInput)) {
      await assertValidData(claimantResponseData, pageId);
    }

    let validState = expectedCcdState || 'PROCEEDS_IN_HERITAGE_SYSTEM';

    await assertSubmittedEvent(validState || 'PROCEEDS_IN_HERITAGE_SYSTEM');

    await waitForFinishedBusinessProcess(caseId);
  },

  discontinueClaim: async (user, mpScenario) => {
    console.log('discontinueClaim for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'DISCONTINUE_CLAIM_CLAIMANT';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;

    assertContainsPopulatedFields(returnedCaseData);

    let disposalData = data.DISCONTINUE_CLAIM(mpScenario);
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }

    if (mpScenario === 'TWO_V_ONE') {
      await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
        header: '#  We have noted your claim has been partly discontinued and your claim has been updated',
        body: ''
      }, true);
    } else if (mpScenario === 'ONE_V_TWO' || mpScenario === 'ONE_V_ONE_NO_P_NEEDED' ) {
      await assertSubmittedEvent('CASE_DISCONTINUED', {
        header: '# Your claim has been discontinued',
        body: ''
      }, true);
    } else {
      await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
        header: '# Your request is being reviewed',
        body: ''
      }, true);
    }
    await waitForFinishedBusinessProcess(caseId);
  },

  checkUserCaseAccess: async (user, shouldHaveAccess) => {
    console.log(`Checking ${user.email} ${shouldHaveAccess ? 'has' : 'does not have'} access to the case.`);
    const expectedStatus = shouldHaveAccess ? 200 : 403;
    return await fetchCaseDetails(user, caseId, expectedStatus);
  },

  requestJudgement: async (user, response = 'FULL_ADMISSION', scenario = 'ONE_V_ONE') => {

    await apiRequest.setupTokens(user);

    eventName = 'REQUEST_JUDGEMENT_ADMISSION_SPEC';
    caseData = await apiRequest.startEvent(eventName, caseId);
    let requestJudgementData = eventData['requestJudgement'][scenario][response];

    for (let pageId of Object.keys(requestJudgementData.userInput)) {
      await assertValidData(requestJudgementData, pageId);
    }
  },

  extendResponseDeadline: async (user) => {
    eventName = 'EXTEND_RESPONSE_DEADLINE';
    await apiRequest.setupTokens(user);
    caseData = await apiRequest.startEvent(eventName, caseId);

    let informAgreedExtensionData = await data.EXTEND_RESPONSE_DEADLINE_DATE();
    informAgreedExtensionData.userInput.ResponseDeadlineExtension.respondentSolicitor1AgreedDeadlineExtension = await dateNoWeekends(40);

    for (let pageId of Object.keys(informAgreedExtensionData.userInput)) {
      await assertValidData(informAgreedExtensionData, pageId);
    }

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },

  amendRespondent1ResponseDate: async (user) => {
    await apiRequest.setupTokens(user);
    let respondent1ResponseDate ={};
    respondent1ResponseDate = {'respondent1ResponseDate':'2022-01-10T15:59:50'};
    testingSupport.updateCaseData(caseId, respondent1ResponseDate);
  },

  stayCase: async (user) => {
    console.log('Stay Case for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'STAY_CASE';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.STAY_CASE();
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_STAYED', {
      header: '# Stay added to the case \n\n ## All parties have been notified and any upcoming hearings must be cancelled',
      body: '&nbsp;'
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },

  manageStay: async (user, requestUpdate) => {
    console.log('Manage Stay for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'MANAGE_STAY';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData, header;
    if (requestUpdate) {
      disposalData = data.MANAGE_STAY_UPDATE();
      header = '# You have requested an update on \n\n # this case \n\n ## All parties have been notified';
    } else {
      disposalData = data.MANAGE_STAY_LIFT();
      header = '# You have lifted the stay from this \n\n # case \n\n ## All parties have been notified';
    }
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }

    if (requestUpdate) {
      await assertSubmittedEvent('CASE_STAYED', {
        header: header,
        body: '&nbsp;'
      }, true);
    } else {
      if (caseData.preStayState === 'IN_MEDIATION') {
        await assertSubmittedEvent('JUDICIAL_REFERRAL', {
          header: header,
          body: '&nbsp;'
        }, true);
      } else {
        await assertSubmittedEvent(caseData.preStayState, {
          header: header,
          body: '&nbsp;'
        }, true);
      }
    }


    await waitForFinishedBusinessProcess(caseId);
  },

  dismissCase: async (user) => {
    console.log('Dismiss case for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'DISMISS_CASE';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.DISMISS_CASE();
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_DISMISSED', {
      header: '# The case has been dismissed\n## All parties have been notified',
      body: '&nbsp;'
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },

  sendMessage: async (user) => {
    console.log('Send message  case for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'SEND_AND_REPLY';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.SEND_MESSAGE();
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_STAYED', {
      header: '# Your message has been sent',
      body: '<br /><h2 class="govuk-heading-m">What happens next</h2><br />A task has been created to review your message'
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },

  replyMessage: async (user) => {
    console.log('Send message  case for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'SEND_AND_REPLY';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;

    const latestMessage = getLatestMessageToReplyTo(caseData);
    const disposalData = data.REPLY_MESSAGE(latestMessage.code, latestMessage.label);
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_STAYED', {
      header: '# Reply sent',
      body: '<br /><h2 class="govuk-heading-m">What happens next</h2><br />A task has been created to review your reply.'
    }, true);

    await waitForFinishedBusinessProcess(caseId);
  },
};

const getLatestMessageToReplyTo = (caseData) => {
  const messagesToReplyTo = caseData.messagesToReplyTo;
  if (messagesToReplyTo && messagesToReplyTo.list_items && messagesToReplyTo.list_items.length > 0) {
    const latestMessage = messagesToReplyTo.list_items[messagesToReplyTo.list_items.length - 1];
    return {
      code: latestMessage.code,
      label: latestMessage.label
    };
  }
  return null;
};

const validateEventPages = async (data, solicitor) => {
  //transform the data
  console.log('validateEventPages....');
  for (let pageId of Object.keys(data.valid)) {
    if (pageId === 'DefendantLitigationFriend' || pageId === 'DocumentUpload' || pageId === 'Upload' || pageId === 'DraftDirections'|| pageId === 'ApplicantDefenceResponseDocument' || pageId === 'DraftDirections' || pageId === 'FinalOrderPreview' || pageId === 'FixedRecoverableCosts') {
      const document = await testingSupport.uploadDocument();
      data = await updateCaseDataWithPlaceholders(data, document);
    }
    // data = await updateCaseDataWithPlaceholders(data);
    await assertValidData(data, pageId, solicitor);
  }
};

async function updateCaseDataWithPlaceholders(data, document) {
  const placeholders = {
    TEST_DOCUMENT_URL: document.document_url,
    TEST_DOCUMENT_BINARY_URL: document.document_binary_url,
    TEST_DOCUMENT_FILENAME: document.document_filename
  };

  data = lodash.template(JSON.stringify(data))(placeholders);

  return JSON.parse(data);
}

// Functions
const assertValidData = async (data, pageId) => {
  console.log(`asserting page: ${pageId} has valid data`);
  if (pageId === 'FixedRecoverableCosts' || pageId === 'DraftDirections') {
    const document = await testingSupport.uploadDocument();
    data = await updateCaseDataWithPlaceholders(data, document);
  }
  let userData;
  if (eventName === 'CREATE_SDO' || eventName === 'NotSuitable_SDO' || eventName === 'HEARING_SCHEDULED'
  || eventName === 'GENERATE_DIRECTIONS_ORDER') {
    userData = data.valid[pageId];
  } else {
    userData = data.userInput[pageId];
  }
  caseData = update(caseData, userData);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    caseId
  );
  let responseBody = await response.json();
  responseBody = clearDataForSearchCriteria(responseBody); //Until WA release

  assert.equal(response.status, 200);

  if (data.midEventData && data.midEventData[pageId]) {
    checkExpected(responseBody.data, data.midEventData[pageId]);
  }

  if (data.midEventGeneratedData && data.midEventGeneratedData[pageId]) {
    checkGenerated(responseBody.data, data.midEventGeneratedData[pageId]);
  }

  caseData = update(caseData, responseBody.data);
};

const clearDataForSearchCriteria = (responseBody) => {
  delete responseBody.data['SearchCriteria'];
  return responseBody;
};

function checkExpected(responseBodyData, expected, prefix = '') {
  if (!(responseBodyData) && expected) {
    if (expected) {
      assert.fail('Response' + prefix ? '[' + prefix + ']' : '' + ' is empty but it was expected to be ' + expected);
    } else {
      // null and undefined may reach this point bc typeof null is object
      return;
    }
  }
  for (const key in expected) {
    if (Object.prototype.hasOwnProperty.call(expected, key)) {
      if (typeof expected[key] === 'object') {
        checkExpected(responseBodyData[key], expected[key], key + '.');
      } else {
        assert.equal(responseBodyData[key], expected[key], prefix + key + ': expected ' + expected[key]
          + ' but actual ' + responseBodyData[key]);
      }
    }
  }
}

function checkGenerated(responseBodyData, generated, prefix = '') {
  if (!(responseBodyData)) {
    assert.fail('Response' + prefix ? '[' + prefix + ']' : '' + ' is empty but it was not expected to be');
  }
  for (const key in generated) {
    if (Object.prototype.hasOwnProperty.call(generated, key)) {
      const checkType = function (type) {
        if (type === 'array') {
          assert.isTrue(Array.isArray(responseBodyData[key]),
            'responseBody[' + prefix + key + '] was expected to be an array');
        } else {
          assert.equal(typeof responseBodyData[key], type,
            'responseBody[' + prefix + key + '] was expected to be of type ' + type);
        }
      };
      const checkFunction = function (theFunction) {
        assert.isTrue(theFunction.call(responseBodyData[key], responseBodyData[key]),
          'responseBody[' + prefix + key + '] does not satisfy the condition it should');
      };
      if (typeof generated[key] === 'string') {
        checkType(generated[key]);
      } else if (typeof generated[key] === 'function') {
        checkFunction(generated[key]);
      } else if (typeof generated[key] === 'object') {
        if (generated[key]['type']) {
          checkType(generated[key]['type']);
        }
        if (generated[key]['condition']) {
          checkType(generated[key]['condition']);
        }
        for (const key2 in generated[key]) {
          if (Object.prototype.hasOwnProperty.call(generated, key2) && 'condition' !== key2 && 'type' !== key2) {
            checkGenerated(responseBodyData[key2], generated[key2], key2 + '.');
          }
        }
      }
    }
  }
}

/**
 * {...obj1, ...obj2} replaces elements. For instance, if obj1 = { check : { correct : false }}
 * and obj2 = { check: { newValue : 'ASDF' }} the result will be { check : {newValue : 'ASDF} }.
 *
 * What this method does is a kind of deep spread, in a case like the one before,
 * @param currentObject the object we want to modify
 * @param modifications the object holding the modifications
 * @return a caseData with the new values
 */
function update(currentObject, modifications) {
  const modified = {...currentObject};
  for (const key in modifications) {
    if (currentObject[key] && typeof currentObject[key] === 'object') {
      if (Array.isArray(currentObject[key])) {
        modified[key] = modifications[key];
      } else {
        modified[key] = update(currentObject[key], modifications[key]);
      }
    } else {
      modified[key] = modifications[key];
    }
  }
  return modified;
}

const assertSubmittedEvent = async (expectedState, submittedCallbackResponseContains, hasSubmittedCallback = true) => {
  await apiRequest.startEvent(eventName, caseId);

  const response = await apiRequest.submitEvent(eventName, caseData, caseId);
  const responseBody = await response.json();
  assert.equal(response.status, 201);
  assert.equal(responseBody.state, expectedState);
  if (hasSubmittedCallback && submittedCallbackResponseContains) {
    assert.equal(responseBody.callback_response_status_code, 200);
    assert.include(responseBody.after_submit_callback_response.confirmation_header, submittedCallbackResponseContains.header);
    assert.include(responseBody.after_submit_callback_response.confirmation_body, submittedCallbackResponseContains.body);
  }

  if (eventName === 'CREATE_CLAIM_SPEC') {
    caseId = responseBody.id;
    await addUserCaseMapping(caseId, config.applicantSolicitorUser);
    console.log('Case created: ' + caseId);
  }
};

// Mid event will not return case fields that were already filled in another event if they're present on currently processed event.
// This happens until these case fields are set again as a part of current event (note that this data is not removed from the case).
// Therefore these case fields need to be removed from caseData, as caseData object is used to make assertions
const deleteCaseFields = (...caseFields) => {
  caseFields.forEach(caseField => delete caseData[caseField]);
};

const assertContainsPopulatedFields = returnedCaseData => {
  for (let populatedCaseField of Object.keys(caseData)) {
    assert.property(returnedCaseData,  populatedCaseField);
  }
};

const assertCorrectEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    expect(caseForDisplay.triggers).to.deep.include.members(nonProdExpectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  } else {
    // expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  }
};
