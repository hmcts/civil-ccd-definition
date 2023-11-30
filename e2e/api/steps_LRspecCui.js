const config = require('../config.js');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers, assignCaseToCitizen} = require('./caseRoleAssignmentHelper');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaimSpec.js');
const claimDataSpecFastLRvLiP = require('../fixtures/events/cui/createClaimSpecFastTrackCui.js');
const claimDataSpecSmallLRvLiP = require('../fixtures/events/cui/createClaimSpecSmallCui.js');
const defendantResponse = require('../fixtures/events/cui/defendantResponseCui.js');
const claimantResponseAdmitAll = require('../fixtures/events/cui/claimantResponseCuiAdmitAll.js');
const claimantResponsePartAdmit = require('../fixtures/events/cui/claimantResponseCuiPartAdmit.js');
const claimantResponseRejectAll = require('../fixtures/events/cui/claimantResponseCuiRejectAll.js');
const mediationUnsuccessful = require('../fixtures/events/cui/unsuccessfulMediationCui.js');
const expectedEvents = require('../fixtures/ccd/expectedEventsLRSpec.js');
const testingSupport = require('./testingSupport');
const {dateNoWeekends} = require('./dataHelper');
const {checkToggleEnabled} = require('./testingSupport');
const {PBAv3} = require('../fixtures/featureKeys');

let caseId, eventName;
let caseData = {};

const data = {
  CREATE_CLAIM: (scenario) => claimData.createClaim(scenario),
  CREATE_CLAIM_AP: (scenario) => claimData.createClaimForAccessProfiles(scenario),
  CREATE_SPEC_CLAIM_FASTTRACK: (scenario) => claimDataSpecFastLRvLiP.createClaim(scenario),
  CREATE_SPEC_CLAIM: (scenario) => claimDataSpecSmallLRvLiP.createClaim(scenario),
  DEFENDANT_RESPONSE: (response) => require('../fixtures/events/defendantResponseSpecCui.js').respondToClaim(response),
  CLAIMANT_RESPONSE: (mpScenario, citizenDefendantResponse) => require('../fixtures/events/claimantResponseSpecCui.js').claimantResponse(mpScenario, citizenDefendantResponse),
  REQUEST_JUDGEMENT: (mpScenario) => require('../fixtures/events/requestJudgementSpecCui.js').response(mpScenario),
  INFORM_AGREED_EXTENSION_DATE: () => require('../fixtures/events/informAgreeExtensionDateSpec.js'),
  EXTEND_RESPONSE_DEADLINE_DATE: () => require('../fixtures/events/extendResponseDeadline.js')
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
      FULL_DEFENCE_CITIZEN_DEFENDANT: data.CLAIMANT_RESPONSE('FULL_DEFENCE', true),
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

  createSpecifiedClaimWithUnrepresentedRespondent: async (user, multipartyScenario, claimType, carmEnabled = false) => {
    console.log(' Creating specified claim');
    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};
    let createClaimSpecData;
    if (claimType === 'FastTrack') {
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

    const pbaV3 = await checkToggleEnabled(PBAv3);
    if (pbaV3) {
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }

    if (claimType !== 'pinInPost') {
      await assignCaseToCitizen(caseId, multipartyScenario);
    }
    await waitForFinishedBusinessProcess(caseId);

    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');

    if (carmEnabled) {
      console.log('carm enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      let submittedDate ={};
      submittedDate = {'submittedDate':'2024-05-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to after carm date');
    } else {
      console.log('carm not enabled, updating submitted date');
      await apiRequest.setupTokens(config.systemupdate);
      let submittedDate ={};
      submittedDate = {'submittedDate':'2022-05-10T15:59:50'};
      await testingSupport.updateCaseData(caseId, submittedDate);
      console.log('submitted date update to before carm date');
    }
    return caseId;
  },

  performCitizenResponse: async (user, caseId, claimType = 'SmallClaims') => {
    console.log('This is inside performCitizenResponse : ' + caseId);
    let eventName = 'DEFENDANT_RESPONSE_CUI';
    let payload = {};
    if (claimType === 'FastTrack') {
      console.log('FastTrack claim...');
      payload = defendantResponse.createDefendantResponse('15000');
    } else {
      console.log('SmallClaim...');
      payload = defendantResponse.createDefendantResponse('1500');
    }
    //console.log('The payload : ' + payload);
    await apiRequest.setupTokens(user);
    await apiRequest.startEventForCitizen(eventName, caseId, payload);
    await waitForFinishedBusinessProcess(caseId);
    console.log('End of performCitizenResponse()');
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

  claimantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE',
                           expectedCcdState) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE_SPEC';
    caseData = await apiRequest.startEvent(eventName, caseId);
    let claimantResponseData = eventData['claimantResponses'][scenario][response];

    for (let pageId of Object.keys(claimantResponseData.userInput)) {
      await assertValidData(claimantResponseData, pageId);
    }


    let validState = expectedCcdState || 'PROCEEDS_IN_HERITAGE_SYSTEM';

    await assertSubmittedEvent(validState || 'PROCEEDS_IN_HERITAGE_SYSTEM');

    await waitForFinishedBusinessProcess(caseId);
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
};

// Functions
const assertValidData = async (data, pageId) => {
  console.log(`asserting page: ${pageId} has valid data`);

  const userData = data.userInput[pageId];
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

const assertCorrectEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  } else {
    // expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  }
};

