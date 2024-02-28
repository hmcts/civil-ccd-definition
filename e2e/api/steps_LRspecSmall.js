const config = require('../config.js');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('./caseRoleAssignmentHelper');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaimSpecSmall.js');
const claimDataHearings = require('../fixtures/events/createClaimSpecSmallForHearings.js');
const expectedEvents = require('../fixtures/ccd/expectedEventsLRSpec.js');
const {assertCaseFlags, assertFlagsInitialisedAfterCreateClaim} = require('../helpers/assertions/caseFlagsAssertions');
const {PBAv3} = require('../fixtures/featureKeys');
const {checkToggleEnabled, checkCaseFlagsEnabled, checkManageContactInformationEnabled} = require('./testingSupport');
const {addAndAssertCaseFlag, getPartyFlags, getDefinedCaseFlagLocations, updateAndAssertCaseFlag} = require('./caseFlagsHelper');
const {CASE_FLAGS} = require('../fixtures/caseFlags');
const {dateNoWeekends} = require('./dataHelper');
const sdoTracks = require('../fixtures/events/createSDO');
const {addFlagsToFixture} = require('../helpers/caseFlagsFeatureHelper');
const mediationDocuments = require('../fixtures/events/mediation/uploadMediationDocuments');
const testingSupport = require('./testingSupport');
const lodash = require('lodash');
const requestForReconsideration = require('../fixtures/events/requestForReconsideration');
const judgeDecisionToReconsiderationRequest = require('../fixtures/events/judgeDecisionOnReconsiderationRequest');
const {updateExpert} = require('./manageContactInformationHelper');
const manageContactInformation = require('../fixtures/events/manageContactInformation.js');
const {adjustCaseSubmittedDateForCarm} = require('../helpers/carmHelper');
const mediationUnsuccessful = require('../fixtures/events/cui/unsuccessfulMediationCui.js');
const transferOnlineCase = require('../fixtures/events/transferOnlineCase');
const {fetchCaseDetails} = require('./apiRequest');
const evidenceUploadApplicant = require('../fixtures/events/evidenceUploadApplicant');
const evidenceUploadRespondent = require('../fixtures/events/evidenceUploadRespondent.js');
const {cloneDeep} = require('lodash');
const createFinalOrder = require('../fixtures/events/finalOrder');
const hearingScheduled = require('../fixtures/events/scheduleHearing');

let caseId, eventName;
let caseData = {};
let mpScenario = 'ONE_V_ONE';

const data = {
  CREATE_CLAIM: (scenario, pbaV3) => claimData.createClaim(scenario, pbaV3),
  CREATE_CLAIM_HEARINGS: (scenario, pbaV3) => claimDataHearings.createClaim(scenario, pbaV3),
  DEFENDANT_RESPONSE: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpecSmall.js').respondToClaim(response, camundaEvent),
  DEFENDANT_RESPONSE_JUDICIAL_REFERRAL: () => require('../fixtures/events/defendantResponseSpecSmall.js').respondToClaimForJudicialReferral(),
  DEFENDANT_RESPONSE_1v2: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpec1v2.js').respondToClaim(response, camundaEvent),
  DEFENDANT_RESPONSE2_1V2_2ND_DEF: (response) => require('../fixtures/events/defendantResponseSpecSmall.js').respondToClaim2(response),
  CLAIMANT_RESPONSE: (hasAgreedFreeMediation) => require('../fixtures/events/claimantResponseSpecSmall.js').claimantResponse(hasAgreedFreeMediation),
  INFORM_AGREED_EXTENSION_DATE: async (camundaEvent) => require('../fixtures/events/informAgreeExtensionDateSpec.js').informExtension(camundaEvent),
  LA_CREATE_SDO: (userInput) => sdoTracks.createLASDO(userInput),
  CREATE_SDO: (userInput) => sdoTracks.createSDOSmallWODamageSumInPerson(userInput),
  REQUEST_FOR_RECONSIDERATION: (userType) => requestForReconsideration.createRequestForReconsiderationSpec(userType),
  DECISION_ON_RECONSIDERATION_REQUEST: (decisionSelection)=> judgeDecisionToReconsiderationRequest.judgeDecisionOnReconsiderationRequestSpec(decisionSelection),
  MANAGE_DEFENDANT1_EXPERT_INFORMATION: (caseData) => manageContactInformation.manageDefendant1ExpertsInformation(caseData),
  NOT_SUITABLE_SDO: (option) => transferOnlineCase.notSuitableSDO(option),
  CREATE_SMALL_FLIGHT_DELAY_NO_SUM: (userInput) => sdoTracks.createSDOSmallFlightDelayWODamageSum(userInput),
  EVIDENCE_UPLOAD_APPLICANT_SMALL: (mpScenario) => evidenceUploadApplicant.createApplicantSmallClaimsEvidenceUploadFlightDelay(mpScenario),
  EVIDENCE_UPLOAD_RESPONDENT_SMALL: (mpScenario) => evidenceUploadRespondent.createRespondentSmallClaimsEvidenceUploadFlightDelay(mpScenario),
  FINAL_ORDERS: (finalOrdersRequestType) => createFinalOrder.requestFinalOrder(finalOrdersRequestType),
  HEARING_SCHEDULED: (allocatedTrack) => hearingScheduled.scheduleHearing(allocatedTrack),
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

const eventData = {
  defendantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE('FULL_DEFENCE'),
      FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_DEFENCE_JUDICIAL_REFERRAL: data.DEFENDANT_RESPONSE_JUDICIAL_REFERRAL()
    },
    ONE_V_TWO: {
      FULL_ADMISSION: data.DEFENDANT_RESPONSE_1v2('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_1v2('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE_1v2('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_1v2('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE_1v2('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE_1v2('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT')
    },
    ONE_V_TWO_DIF_SOL: {
      FULL_DEFENCE1: data.DEFENDANT_RESPONSE_JUDICIAL_REFERRAL(),
      FULL_DEFENCE1_PBAv3:  data.DEFENDANT_RESPONSE_JUDICIAL_REFERRAL(),
      FULL_DEFENCE2: data.DEFENDANT_RESPONSE2_1V2_2ND_DEF('FULL_DEFENCE'),
      FULL_DEFENCE2_PBAv3:  data.DEFENDANT_RESPONSE2_1V2_2ND_DEF('FULL_DEFENCE')
    }
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

module.exports = function (){
  return actor({

  /**
   * Creates a claim
   *
   * @param user user to create the claim
   * @param scenario
   * @param hearings
   * @return {Promise<void>}
   */
  createClaimWithRepresentedRespondent: async (user,scenario = 'ONE_V_ONE', hearings = false) => {

    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};

    const pbaV3 = await checkToggleEnabled(PBAv3);
    let createClaimData  = {};

    if (!hearings) {
      createClaimData = data.CREATE_CLAIM(scenario, pbaV3);
    } else {
      createClaimData = data.CREATE_CLAIM_HEARINGS(scenario, pbaV3);
    }
    //==============================================================

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimData.userInput)) {
      await assertValidData(createClaimData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');

    await waitForFinishedBusinessProcess(caseId);

    console.log('Is PBAv3 toggle on?: ' + pbaV3);

    if (pbaV3) {
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }

    await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);
    if (scenario === 'ONE_V_TWO') {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
    }

    await waitForFinishedBusinessProcess(caseId);
    if(await checkCaseFlagsEnabled()) {
      await assertFlagsInitialisedAfterCreateClaim(config.adminUser, caseId);
    }
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');

    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');
  },

  informAgreedExtensionDate: async (user) => {
    eventName = 'INFORM_AGREED_EXTENSION_DATE_SPEC';
    await apiRequest.setupTokens(user);
    caseData = await apiRequest.startEvent(eventName, caseId);
    const pbaV3 = await checkToggleEnabled(PBAv3);

    let informAgreedExtensionData = await data.INFORM_AGREED_EXTENSION_DATE(pbaV3 ? 'CREATE_CLAIM_SPEC_AFTER_PAYMENT':'CREATE_CLAIM_SPEC');
    informAgreedExtensionData.userInput.ExtensionDate.respondentSolicitor1AgreedDeadlineExtension = await dateNoWeekends(40);

    for (let pageId of Object.keys(informAgreedExtensionData.userInput)) {
      await assertValidData(informAgreedExtensionData, pageId);
    }

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },

  cleanUp: async () => {
    await unAssignAllUsers();
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

  defendantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE', judicialReferral = false) => {
    await apiRequest.setupTokens(user);

    const pbaV3 = await checkToggleEnabled(PBAv3);
    if(pbaV3){
      response = response+'_PBAv3';
    }

    eventName = 'DEFENDANT_RESPONSE_SPEC';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    let defendantResponseData;

    if (!judicialReferral) {
      defendantResponseData = eventData['defendantResponses'][scenario][response];
    } else {
      if (scenario === 'ONE_V_TWO_DIF_SOL') {
        defendantResponseData = eventData['defendantResponses'][scenario][response];
      } else {
        defendantResponseData = eventData['defendantResponses'][scenario]['FULL_DEFENCE_JUDICIAL_REFERRAL'];
      }
    }

    caseData = returnedCaseData;

    caseData = await addFlagsToFixture(caseData);

    for (let pageId of Object.keys(defendantResponseData.userInput)) {
      await assertValidData(defendantResponseData, pageId);
    }

    if(scenario === 'ONE_V_ONE')
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    else if(response === 'FULL_ADMISSION' && scenario === 'ONE_V_TWO')
      await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    else if(scenario === 'ONE_V_TWO_DIF_SOL') {
      if(response === 'FULL_DEFENCE1' || response === 'FULL_DEFENCE1_PBAv3')
        await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      else if(response === 'FULL_DEFENCE2' || response === 'FULL_DEFENCE2_PBAv3')
        await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    }

    await waitForFinishedBusinessProcess(caseId);

    const caseFlagsEnabled = await checkCaseFlagsEnabled();
    if (caseFlagsEnabled) {
      await assertCaseFlags(caseId, user, response);
    }

    deleteCaseFields('respondent1Copy');
  },

  claimantResponse: async (user, judicialReferral = false, hasAgreedFreeMediation = 'Yes', carmEnabled = false) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await adjustCaseSubmittedDateForCarm(caseId, carmEnabled);

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE_SPEC';
    caseData = await apiRequest.startEvent(eventName, caseId);

    caseData = await addFlagsToFixture(caseData);

    let claimantResponseData = data.CLAIMANT_RESPONSE(hasAgreedFreeMediation);

    for (let pageId of Object.keys(claimantResponseData.userInput)) {
      await assertValidData(claimantResponseData, pageId);
    }

    let expectedEndState;

    carmEnabled ? expectedEndState = 'IN_MEDIATION' : judicialReferral ? expectedEndState = 'JUDICIAL_REFERRAL' : null;

    if (expectedEndState) {
      await assertSubmittedEvent(expectedEndState);
    }

    await waitForFinishedBusinessProcess(caseId);

    const caseFlagsEnabled = await checkCaseFlagsEnabled();
    if (caseFlagsEnabled) {
      await assertCaseFlags(caseId, user, 'FULL_DEFENCE');
    }
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

  uploadMediationDocuments: async (user) => {
    await apiRequest.setupTokens(user);

    let eventData;
    if (user === config.applicantSolicitorUser) {
      eventData = mediationDocuments.uploadMediationDocuments('claimant');
    } else {
      eventData = mediationDocuments.uploadMediationDocuments('defendant');
    }

    eventName = 'UPLOAD_MEDIATION_DOCUMENTS';
    caseData = await apiRequest.startEvent(eventName, caseId);

    await validateEventPages(eventData);

    await assertSubmittedEvent('JUDICIAL_REFERRAL');
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
    let disposalData = data.CREATE_SDO();

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

    evidenceUploadApplicant: async (user, mpScenario='') => {
      await apiRequest.setupTokens(user);
      eventName = 'EVIDENCE_UPLOAD_APPLICANT';
      caseData = await apiRequest.startEvent(eventName, caseId);

      console.log('caseData.caseProgAllocatedTrack ..', caseData.caseProgAllocatedTrack );

      if(caseData.caseProgAllocatedTrack === 'SMALL_CLAIM') {
        console.log('evidence upload small claim applicant for case id ' + caseId);
        let ApplicantEvidenceSmallClaimData = data.EVIDENCE_UPLOAD_APPLICANT_SMALL(mpScenario);
        await validateEventPagesFlightDelay(ApplicantEvidenceSmallClaimData);
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
        await validateEventPagesFlightDelay(RespondentEvidenceSmallClaimData);
      }
      await assertSubmittedEvent('CASE_PROGRESSION', null, false);
      await waitForFinishedBusinessProcess(caseId);
    },

  notSuitableSDO: async (user, option) => {
    console.log(`case in CASE PROGRESSION  ${caseId}`);
    await apiRequest.setupTokens(user);

    eventName = 'NotSuitable_SDO';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.NOT_SUITABLE_SDO(option);

    for (let pageId of Object.keys(disposalData.valid)) {
      await assertValidData(disposalData, pageId);
    }

    if (option === 'CHANGE_LOCATION') {
      await assertSubmittedEvent('CASE_PROGRESSION', {
        header: '',
        body: ''
      }, true);
      await waitForFinishedBusinessProcess(caseId);
    } else {
      await assertSubmittedEvent('CASE_PROGRESSION', {
        header: '',
        body: ''
      }, true);
      await waitForFinishedBusinessProcess(caseId);
      const caseData = await fetchCaseDetails(config.adminUser, caseId, 200);
      assert(caseData.state === 'PROCEEDS_IN_HERITAGE_SYSTEM');
    }
  },

    notSuitableSdoChangeLocation: async (user, option) => {
      console.log(`case in CASE PROGRESSION  ${caseId}`);
      await apiRequest.setupTokens(user);

      eventName = 'NotSuitable_SDO';
      let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
      delete returnedCaseData['SearchCriteria'];
      caseData = returnedCaseData;
      let disposalData = data.NOT_SUITABLE_SDO(option);

      for (let pageId of Object.keys(disposalData.valid)) {
        await assertNotValidData(disposalData, pageId);
      }

    },

    amendHearingDueDate: async (user) => {
      let hearingDueDate = {};
      hearingDueDate = {'hearingDueDate': '2022-01-10'};
      await testingSupport.updateCaseData(caseId, hearingDueDate, user);
    },

    //TODO: Added below method to similar to DRH - To confirm
    hearingFeePaid: async (user) => {
      await apiRequest.setupTokens(user);

      await apiRequest.paymentUpdate(caseId, '/service-request-update',
        claimData.serviceUpdateDto(caseId, 'paid'));

      const response_msg = await apiRequest.hearingFeePaidEvent(caseId);
      assert.equal(response_msg.status, 200);
      console.log('Hearing Fee Paid');
    },

    triggerBundle: async () => {
      const response_msg = await apiRequest.bundleTriggerEvent(caseId);
      const response = await response_msg.text();
      assert.equal(response, 'success');
    },

    createFinalOrderJO: async (user, finalOrderRequestType) => {
      console.log(`case in Final Order ${caseId}`);
      await apiRequest.setupTokens(user);

      eventName = 'GENERATE_DIRECTIONS_ORDER';
      let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
      delete returnedCaseData['SearchCriteria'];
      caseData = returnedCaseData;
      assertContainsPopulatedFields(returnedCaseData);

      if (finalOrderRequestType === 'ASSISTED_ORDER') {
        await validateEventPagesFlightDelay(data.FINAL_ORDERS('ASSISTED_ORDER', mpScenario));
      } else {
        await validateEventPagesFlightDelay(data.FINAL_ORDERS('FREE_FORM_ORDER', mpScenario));
      }

      await assertSubmittedEvent('All_FINAL_ORDERS_ISSUED', {
        header: '',
        body: ''
      }, true);

      await waitForFinishedBusinessProcess(caseId);
    },

    createLASDO: async (user, response = 'CREATE_DISPOSAL') => {
      console.log('SDO for case id ' + caseId);
      await apiRequest.setupTokens(user);

    if (response === 'UNSUITABLE_FOR_SDO') {
      eventName = 'NotSuitable_SDO';
    } else {
      eventName = 'CREATE_SDO';
    }

    caseData = await apiRequest.startEvent(eventName, caseId);
    let disposalData = data.LA_CREATE_SDO();

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

  scheduleHearing: async (user, allocatedTrack) => {
    console.log('Hearing Scheduled for case id ' + caseId);
    await apiRequest.setupTokens(user);

    eventName = 'HEARING_SCHEDULED';

    caseData = await apiRequest.startEvent(eventName, caseId);
    delete caseData['SearchCriteria'];

    let scheduleData = data.HEARING_SCHEDULED(allocatedTrack);

    for (let pageId of Object.keys(scheduleData.userInput)) {
      await assertValidData(scheduleData, pageId);
    }

    await assertSubmittedEvent('HEARING_READINESS', null, false);
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

    for (const [index, value] of caseFlagLocations.entries()) {
      await addAndAssertCaseFlag(value, partyFlags[index], caseId);
    }
  },

  manageContactInformation : async (user) => {
    if(!(await checkManageContactInformationEnabled())) {
      return;
    }
    eventName = 'MANAGE_CONTACT_INFORMATION';
    await apiRequest.setupTokens(user);
    caseData = await apiRequest.startEvent(eventName, caseId);
    let manageContactInformationData = data.MANAGE_DEFENDANT1_EXPERT_INFORMATION(caseData);
    await updateExpert(caseId, manageContactInformationData);
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

  requestForReconsideration: async (user, userType) => {
    console.log('RequestForReconsideration for case id ' + caseId);
    await apiRequest.setupTokens(user);
    eventName = 'REQUEST_FOR_RECONSIDERATION';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    delete returnedCaseData['SearchCriteria'];
    caseData = returnedCaseData;
    let disposalData = data.REQUEST_FOR_RECONSIDERATION(userType);
    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }
    await assertSubmittedEvent('CASE_PROGRESSION', {
      header: '# Your request has been submitted',
      body: ''
    }, true);

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

  getCaseId: async () => {
    console.log(`case created: ${caseId}`);
    return caseId;
  },
  });
};

const assertValidDataForEvidenceUpload = async (data, pageId, solicitor) => {
  console.log(`asserting page: ${pageId} has valid data`);

  const validDataForPage = data.valid[pageId];
  caseData = {...caseData, ...validDataForPage};
  caseData = adjustDataForSolicitor(solicitor, caseData);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    addCaseId(pageId) ? caseId : null
  );

  let responseBody = await response.json();
  responseBody = clearDataForSearchCriteria(responseBody); //Until WA release
  responseBody = clearNoCData(responseBody);
  if (eventName === 'INFORM_AGREED_EXTENSION_DATE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForExtensionDate(responseBody, solicitor);
  } else if (eventName === 'DEFENDANT_RESPONSE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForDefendantResponse(responseBody, solicitor);
  }
  if(eventName === 'EVIDENCE_UPLOAD_APPLICANT') {
    responseBody = clearDataForEvidenceUpload(responseBody, eventName);
  }
  if(eventName === 'EVIDENCE_UPLOAD_RESPONDENT') {
    responseBody = clearDataForEvidenceUpload(responseBody, eventName);
    delete responseBody.data['businessProcess'];
    delete responseBody.data['applicant1DQStatementOfTruth'];
    delete responseBody.data['respondent1DQStatementOfTruth'];
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
    assert.deepEqual(responseBody.data, caseData); //TODO: To uncomment later as this assertion is failing
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

function addMidEventFields(pageId, responseBody, instanceData, claimAmount) {
  console.log(`Adding mid event fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];
  let midEventData;
  let calculated;

  if (instanceData && instanceData.calculated && instanceData.calculated[pageId]) {
    calculated = instanceData.calculated[pageId];
  }
  const isSdoR2Enabled = checkToggleEnabled(SDOR2);
  if(isSdoR2Enabled && (pageId === 'ClaimsTrack' || pageId === 'OrderType'
    || pageId === 'SmallClaims')) {
    calculated = {...calculated, ...calculatedClaimsTrackDRH};
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
  if(isSdoR2Enabled && pageId === 'ClaimsTrack' && typeof midEventData.isSdoR2NewScreen === 'undefined') {
    let sdoR2Var = { ['isSdoR2NewScreen'] : 'No' };
    midEventData = {...midEventData, ...sdoR2Var};
  }

  if(isSdoR2Enabled && pageId === 'SmallClaims') {
    delete caseData.isSdoR2NewScreen;
  }

  caseData = {...caseData, ...midEventData};
  if (midEventField) {
    responseBody.data[midEventField.id] = caseData[midEventField.id];
  }
}

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

const addCaseId = (pageId) => {
  return isDifferentSolicitorForDefendantResponseOrExtensionDate() || isEvidenceUpload(pageId) || isManageContactInformation();
};

const isEvidenceUpload = (pageId) => {
  return (pageId === 'DocumentSelectionFastTrack'
      || pageId === 'DocumentSelectionSmallClaim')
    && (eventName === 'EVIDENCE_UPLOAD_APPLICANT'
      || eventName === 'EVIDENCE_UPLOAD_RESPONDENT');
};

const isManageContactInformation = () => {
  return eventName === 'MANAGE_CONTACT_INFORMATION';
};

const isDifferentSolicitorForDefendantResponseOrExtensionDate = () => {
  return (mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP' && (eventName === 'DEFENDANT_RESPONSE' || eventName === 'INFORM_AGREED_EXTENSION_DATE'));
};

const clearNoCData = (responseBody) => {
  delete responseBody.data['changeOfRepresentation'];
  return responseBody;
};

const clearHearingLocationData = (responseBody) => {
  delete responseBody.data['hearingLocation'];
  return responseBody;
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
    delete responseBody.data['respondent1DQRemoteHearing'];
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

const clearDataForEvidenceUpload = (responseBody, eventName) => {
  delete responseBody.data['caseNoteType'];
  delete responseBody.data['caseNotes'];
  delete responseBody.data['caseNotesTA'];
  delete responseBody.data['disposalHearingFinalDisposalHearingTimeDJ'];
  delete responseBody.data['disposalHearingHearingNotesDJ'];
  delete responseBody.data['disposalHearingOrderMadeWithoutHearingDJ'];
  delete responseBody.data['documentAndName'];
  delete responseBody.data['documentAndNote'];
  delete responseBody.data['hearingNotes'];
  delete responseBody.data['respondent1OrganisationIDCopy'];
  delete responseBody.data['respondent2OrganisationIDCopy'];
  delete responseBody.data['applicantExperts'];
  delete responseBody.data['applicantWitnesses'];
  delete responseBody.data['disposalHearingBundle'];
  delete responseBody.data['disposalHearingBundleToggle'];
  delete responseBody.data['disposalHearingClaimSettlingToggle'];
  delete responseBody.data['disposalHearingCostsToggle'];
  delete responseBody.data['disposalHearingDisclosureOfDocuments'];
  delete responseBody.data['disposalHearingDisclosureOfDocumentsToggle'];
  delete responseBody.data['disposalHearingFinalDisposalHearing'];
  delete responseBody.data['disposalHearingFinalDisposalHearingToggle'];
  delete responseBody.data['disposalHearingJudgementDeductionValue'];
  delete responseBody.data['disposalHearingJudgesRecital'];
  delete responseBody.data['disposalHearingMedicalEvidence'];
  delete responseBody.data['disposalHearingMedicalEvidenceToggle'];
  delete responseBody.data['disposalHearingMethodInPerson'];
  delete responseBody.data['disposalHearingMethodToggle'];
  delete responseBody.data['disposalHearingNotes'];
  delete responseBody.data['disposalHearingQuestionsToExperts'];
  delete responseBody.data['disposalHearingQuestionsToExpertsToggle'];
  delete responseBody.data['disposalHearingSchedulesOfLossToggle'];
  delete responseBody.data['disposalHearingWitnessOfFact'];
  delete responseBody.data['disposalHearingWitnessOfFactToggle'];
  delete responseBody.data['drawDirectionsOrder'];
  delete responseBody.data['drawDirectionsOrderRequired'];
  delete responseBody.data['drawDirectionsOrderSmallClaims'];
  delete responseBody.data['fastTrackAddNewDirections'];
  delete responseBody.data['fastTrackAllocation'];
  delete responseBody.data['fastTrackAltDisputeResolutionToggle'];
  delete responseBody.data['fastTrackBuildingDispute'];
  delete responseBody.data['fastTrackClinicalNegligence'];
  delete responseBody.data['fastTrackCostsToggle'];
  delete responseBody.data['fastTrackCreditHire'];
  delete responseBody.data['fastTrackDisclosureOfDocuments'];
  delete responseBody.data['fastTrackDisclosureOfDocumentsToggle'];
  delete responseBody.data['fastTrackHearingNotes'];
  delete responseBody.data['fastTrackHearingTime'];
  delete responseBody.data['fastTrackHousingDisrepair'];
  delete responseBody.data['fastTrackJudgementDeductionValue'];
  delete responseBody.data['fastTrackJudgesRecital'];
  delete responseBody.data['fastTrackMethod'];
  delete responseBody.data['fastTrackMethodInPerson'];
  delete responseBody.data['fastTrackMethodTelephoneHearing'];
  delete responseBody.data['fastTrackMethodToggle'];
  delete responseBody.data['fastTrackNotes'];
  delete responseBody.data['fastTrackOrderWithoutJudgement'];
  delete responseBody.data['fastTrackPersonalInjury'];
  delete responseBody.data['fastTrackRoadTrafficAccident'];
  delete responseBody.data['fastTrackSchedulesOfLoss'];
  delete responseBody.data['fastTrackSchedulesOfLossToggle'];
  delete responseBody.data['fastTrackSettlementToggle'];
  delete responseBody.data['fastTrackTrial'];
  delete responseBody.data['fastTrackTrialToggle'];
  delete responseBody.data['fastTrackVariationOfDirectionsToggle'];
  delete responseBody.data['fastTrackWitnessOfFact'];
  delete responseBody.data['fastTrackWitnessOfFactToggle'];
  delete responseBody.data['orderType'];
  delete responseBody.data['respondent1Experts'];
  delete responseBody.data['respondent1Witnesses'];
  delete responseBody.data['setFastTrackFlag'];
  delete responseBody.data['setSmallClaimsFlag'];
  delete responseBody.data['smallClaimsCreditHire'];
  delete responseBody.data['smallClaimsDocuments'];
  delete responseBody.data['smallClaimsDocumentsToggle'];
  delete responseBody.data['smallClaimsHearing'];
  delete responseBody.data['smallClaimsHearingToggle'];
  delete responseBody.data['smallClaimsJudgementDeductionValue'];
  delete responseBody.data['smallClaimsJudgesRecital'];
  delete responseBody.data['smallClaimsMethod'];
  delete responseBody.data['smallClaimsMethodInPerson'];
  delete responseBody.data['smallClaimsMethodToggle'];
  delete responseBody.data['smallClaimsNotes'];
  delete responseBody.data['smallClaimsWitnessStatementToggle'];
  delete responseBody.data['smallClaimsWitnessStatement'];
  delete responseBody.data['smallClaimsRoadTrafficAccident'];
  delete responseBody.data['documentAndNoteToAdd'];
  delete responseBody.data['documentAndNameToAdd'];
  delete responseBody.data['channel'];
  delete responseBody.data['disposalHearingMethodTelephoneHearing'];
  delete responseBody.data['disposalHearingSchedulesOfLoss'];
  delete responseBody.data['disposalHearingMethod'];
  delete responseBody.data['hearingNoticeList'];
  delete responseBody.data['information'];
  delete responseBody.data['hearingDueDate'];
  delete responseBody.data['disposalHearingAddNewDirections'];
  delete responseBody.data['hearingFee'];
  delete responseBody.data['hearingFeePBADetails'];
  delete responseBody.data['hearingNoticeListOther'];
  delete responseBody.data['sdoR2SmallClaimsJudgesRecital'];
  delete responseBody.data['sdoR2SmallClaimsUploadDocToggle'];
  delete responseBody.data['sdoR2SmallClaimsUploadDoc'];
  delete responseBody.data['sdoR2SmallClaimsWitnessStatements'];
  delete responseBody.data['sdoR2SmallClaimsImpNotes'];
  delete responseBody.data['isSdoR2NewScreen'];
  delete responseBody.data['sdoR2SmallClaimsPPI'];
  delete responseBody.data['sdoR2SmallClaimsHearing'];
  delete responseBody.data['sdoR2SmallClaimsWitnessStatementsToggle'];
  delete responseBody.data['sdoR2SmallClaimsHearingToggle'];
  delete responseBody.data['smallClaims'];
  delete responseBody.data['smallClaimsFlightDelay'];
  delete responseBody.data['smallClaimsFlightDelayToggle'];
  delete responseBody.data['hearingMethodValuesDisposalHearing'];
  delete responseBody.data['hearingMethodValuesFastTrack'];
  delete responseBody.data['hearingMethodValuesSmallClaims'];
  delete responseBody.data['smallClaimsAddNewDirections'];
  //delete responseBody.data['applicant1DQStatementOfTruth'];
  //delete responseBody.data['respondent1DQStatementOfTruth'];

  if(mpScenario === 'TWO_V_ONE' && eventName === 'EVIDENCE_UPLOAD_RESPONDENT') {
    delete responseBody.data['evidenceUploadOptions'];
  }

  if ( eventName === 'EVIDENCE_UPLOAD_RESPONDENT') {
    delete responseBody.data['claimantResponseScenarioFlag'];
    delete responseBody.data['claimant2ResponseFlag'];
    delete responseBody.data['claimantResponseDocumentToDefendant2Flag'];
    delete responseBody.data['applicantsProceedIntention'];
  }

  return responseBody;
};

const clearFinalOrderLocationData = (responseBody) => {
  delete responseBody.data['finalOrderFurtherHearingComplex'];
  return responseBody;
};

// Functions
const assertValidData = async (data, pageId) => {
  console.log(`asserting page: ${pageId} has valid data`);

  let userData;

  if (eventName === 'CREATE_SDO' || eventName === 'NotSuitable_SDO' ) {
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

const assertValidDataHearing = async (data, pageId, solicitor) => {
  console.log(`asserting page: ${pageId} has valid data`);

  const validDataForPage = data.valid[pageId];
  caseData = {...caseData, ...validDataForPage};
  caseData = adjustDataForSolicitor(solicitor, caseData);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    addCaseId(pageId) ? caseId : null
  );

  let responseBody = await response.json();
  responseBody = clearDataForSearchCriteria(responseBody); //Until WA release
  responseBody = clearNoCData(responseBody);
  if (eventName === 'INFORM_AGREED_EXTENSION_DATE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForExtensionDate(responseBody, solicitor);
  } else if (eventName === 'DEFENDANT_RESPONSE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
    responseBody = clearDataForDefendantResponse(responseBody, solicitor);
  }
  if(eventName === 'EVIDENCE_UPLOAD_APPLICANT' || eventName === 'EVIDENCE_UPLOAD_RESPONDENT') {
    responseBody = clearDataForEvidenceUpload(responseBody, eventName);
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

const assertNotValidData = async (data, pageId) => {
  console.log(`asserting page: ${pageId} has valid data`);

  let userData;

  if (eventName === 'CREATE_SDO' || eventName === 'NotSuitable_SDO') {
    userData = data.valid[pageId];
  } else {
    userData = data.userInput[pageId];
  }
  caseData = update(caseData, userData);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    caseId,
    422
  );
  let responseBody = await response.json();
  if (responseBody.callbackErrors != null) {
    assert.equal(responseBody.callbackErrors[0], 'Unable to process this request. To transfer the case to another court you need to issue a General Order.');
  }

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

const validateEventPages = async (data, solicitor) => {
  //transform the data
  console.log('validateEventPages....');
  for (let pageId of Object.keys(data.userInput)) {
    if (pageId === 'DocumentUpload' || pageId === 'Upload' || pageId === 'DraftDirections'|| pageId === 'ApplicantDefenceResponseDocument' || pageId === 'DraftDirections' || pageId === 'FinalOrderPreview') {
      const document = await testingSupport.uploadDocument();
      data = await updateCaseDataWithPlaceholders(data, document);
    }
    // data = await updateCaseDataWithPlaceholders(data);
    await assertValidData(data, pageId, solicitor);
  }
};

const validateEventPagesFlightDelay = async (data, solicitor) => {
  //transform the data
  console.log('validateEventPages....');
  for (let pageId of Object.keys(data.valid)) {
    if (pageId === 'DefendantLitigationFriend' || pageId === 'DocumentUpload' || pageId === 'Upload' || pageId === 'DraftDirections'|| pageId === 'ApplicantDefenceResponseDocument' || pageId === 'DraftDirections' || pageId === 'FinalOrderPreview') {
      const document = await testingSupport.uploadDocument();
      data = await updateCaseDataWithPlaceholders(data, document);
    }
    // data = await updateCaseDataWithPlaceholders(data);
    await assertValidDataForEvidenceUpload(data, pageId, solicitor);
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

const assertCorrectEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  }
};
