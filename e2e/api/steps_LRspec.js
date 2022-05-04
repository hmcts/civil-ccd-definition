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
const expectedEvents = require('../fixtures/ccd/expectedEventsLRSpec.js');

const data = {
  CREATE_CLAIM: () => claimData.createClaim(),
  DEFENDANT_RESPONSE: require('../fixtures/events/defendantResponse.js'),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponse.js').claimantResponse(mpScenario),
  INFORM_AGREED_EXTENSION_DATE: () => require('../fixtures/events/informAgreeExtensionDateSpec.js')
};

let caseId, eventName;
let caseData = {};
let mpScenario = 'ONE_V_ONE';

module.exports = {

  /**
   * Creates a claim
   *
   * @param user user to create the claim
   * @return {Promise<void>}
   */
  createClaimWithRepresentedRespondent: async (user) => {

    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};
    const createClaimData = data.CREATE_CLAIM();

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimData.userInput)) {
      await assertValidData(createClaimData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');

    await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONESPEC', config.defendantSolicitorUser);
    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');

    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');
  },

  informAgreedExtensionDate: async (user) => {
    eventName = 'INFORM_AGREED_EXTENSION_DATE_SPEC';
    await apiRequest.setupTokens(user);
    caseData = await apiRequest.startEvent(eventName, caseId);


    let informAgreedExtensionData = data.INFORM_AGREED_EXTENSION_DATE();

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
  }
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

  assert.equal(response.status, 200);

  if (data.midEventData[pageId]) {
    const expectedMidEvent = data.midEventData[pageId];
    caseData = update(caseData, expectedMidEvent);
  }

  if (data.midEventGeneratedData[pageId]) {
    const expected = data.midEventGeneratedData[pageId];
    caseData = updateWithGenerated(caseData, responseBody.data, expected);
  }

  const matchFailure = responseMatchesExpectations(responseBody.data, caseData);
  assert.isTrue(!matchFailure, 'Response data did not match in page id ' + pageId
    + '. Offending field ' + matchFailure);
};

/**
 * ResponseData is expected to modify caseData as described in "update" method. We cannot use deepEquals because some
 * fields are not returned by backend while they're still in the browser's memory. For instance, when creating a claim,
 * the solicitor's email correct field is not returned, but it is still there, because it's sent on submit.
 *
 * @param responseBodyData the information in the response
 * @param caseData expected contents
 * @return null if all elements in responseBodyData are deeply included in caseData,
 * the name of the first field for which that isn't true otherwise
 */
function responseMatchesExpectations(responseBodyData, caseData) {
  for (const key in responseBodyData) {
    // eslint-disable-next-line no-prototype-builtins
    if (responseBodyData.hasOwnProperty(key)) {
      if (typeof responseBodyData[key] === 'object') {
        const failure = responseMatchesExpectations(responseBodyData[key], caseData[key]);
        if (failure) {
          return key + '.' + failure;
        }
      } else if (caseData) {
        if (responseBodyData[key] !== caseData[key]) {
          return key;
        }
      } else {
        return key + ' is not in caseData';
      }
    }
  }
  return null;
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
      if (!Array.isArray(currentObject[key])) {
        modified[key] = update(currentObject[key], modifications[key]);
      }
    } else {
      modified[key] = modifications[key];
    }
  }
  return modified;
}

/**
 * Some fields returned by backend are generated and we can't foresee their values. They are going
 * to update our userData though, and this method is how we are going to do so.
 *
 * @param currentObject current caseData
 * @param responseBodyData data field of the response body
 * @param expectedModifications description of the modifications expected to be in responseBodyData
 * @return a case data with the new values
 */
function updateWithGenerated(currentObject, responseBodyData, expectedModifications) {
  const modified = {...currentObject};
  for (const key in expectedModifications) {
    if (typeof expectedModifications[key] === 'object') {
      assert.property(responseBodyData, key);
      if (Array.isArray(responseBodyData[key])) {
        if (modified[key]) {
          for (let i = 0; i < responseBodyData[key].length; i++) {
            modified[key][i] = updateWithGenerated(currentObject[key][i],
              responseBodyData[key][i], expectedModifications[key]);
          }
        } else {
          modified[key] = responseBodyData[key];
        }
      } else if (modified[key]) {
        modified[key] = updateWithGenerated(currentObject[key], responseBodyData[key], expectedModifications[key]);
      } else {
        modified[key] = responseBodyData[key];
      }
    } else {
      assert.isTrue(typeof responseBodyData[key] === expectedModifications[key]);
      modified[key] = responseBodyData[key];
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
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state]);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state]);
  }
};

const isDifferentSolicitorForDefendantResponseOrExtensionDate = () => {
  return mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP' && (eventName === 'DEFENDANT_RESPONSE' || eventName === 'INFORM_AGREED_EXTENSION_DATE');
};
