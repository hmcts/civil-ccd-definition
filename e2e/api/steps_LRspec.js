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

let caseId, eventName;
let caseData = {};

const data = {
  CREATE_CLAIM: (scenario) => claimData.createClaim(scenario),
  DEFENDANT_RESPONSE: (response) => require('../fixtures/events/defendantResponseSpec.js').respondToClaim(response),
  DEFENDANT_RESPONSE_1v2: (response) => require('../fixtures/events/defendantResponseSpec1v2.js').respondToClaim(response),
  DEFENDANT_RESPONSE_2v1: (response) => require('../fixtures/events/defendantResponseSpec2v1.js').respondToClaim(response),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponseSpec.js').claimantResponse(mpScenario),
  CLAIMANT_RESPONSE_1v2: (response) => require('../fixtures/events/claimantResponseSpec1v2.js').claimantResponse(response),
  CLAIMANT_RESPONSE_2v1: (response) => require('../fixtures/events/claimantResponseSpec2v1.js').claimantResponse(response),
  INFORM_AGREED_EXTENSION_DATE: () => require('../fixtures/events/informAgreeExtensionDateSpec.js')
};

const eventData = {
  defendantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE('FULL_DEFENCE'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE('FULL_ADMISSION'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE('PART_ADMISSION'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE('COUNTER_CLAIM')
    },
    ONE_V_TWO: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('FULL_DEFENCE'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE_1v2('FULL_ADMISSION'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE_1v2('PART_ADMISSION'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE_1v2('COUNTER_CLAIM'),
      DIFF_FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('DIFF_FULL_DEFENCE'),
      DIFF_NOT_FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('DIFF_NOT_FULL_DEFENCE')
    },
    TWO_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('FULL_DEFENCE'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE_2v1('FULL_ADMISSION'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE_2v1('PART_ADMISSION'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE_2v1('COUNTER_CLAIM'),
      DIFF_FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('DIFF_FULL_DEFENCE'),
      DIFF_NOT_FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('DIFF_NOT_FULL_DEFENCE')
    }
  },
  claimantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.CLAIMANT_RESPONSE('FULL_DEFENCE'),
      FULL_ADMISSION: data.CLAIMANT_RESPONSE('FULL_ADMISSION'),
      PART_ADMISSION: data.CLAIMANT_RESPONSE('PART_ADMISSION'),
      COUNTER_CLAIM: data.CLAIMANT_RESPONSE('COUNTER_CLAIM')
    },
    ONE_V_TWO: {
      FULL_DEFENCE: data.CLAIMANT_RESPONSE_1v2('FULL_DEFENCE'),
      FULL_ADMISSION: data.CLAIMANT_RESPONSE_1v2('FULL_ADMISSION'),
      PART_ADMISSION: data.CLAIMANT_RESPONSE_1v2('PART_ADMISSION'),
      NOT_PROCEED: data.CLAIMANT_RESPONSE_1v2('NOT_PROCEED'),
    },
    TWO_V_ONE: {
      FULL_DEFENCE: data.CLAIMANT_RESPONSE_2v1('FULL_DEFENCE'),
      FULL_ADMISSION: data.CLAIMANT_RESPONSE_2v1('FULL_ADMISSION'),
      PART_ADMISSION: data.CLAIMANT_RESPONSE_2v1('PART_ADMISSION'),
      NOT_PROCEED: data.CLAIMANT_RESPONSE_2v1('NOT_PROCEED')
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
  createClaimWithRepresentedRespondent: async (user, scenario = 'ONE_V_ONE') => {

    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};
    const createClaimData = data.CREATE_CLAIM(scenario);

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

  createClaim: async (user, createClaimData, roleToAssign='RESPONDENTSOLICITORONESPEC') => {

    eventName = 'CREATE_CLAIM_SPEC';
    caseId = null;
    caseData = {};

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimData)) {
      await updateAndCheckData(createClaimData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');

    await assignCaseRoleToUser(caseId, roleToAssign, config.defendantSolicitorUser);
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

    if (scenario === 'ONE_V_ONE')
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    else if (scenario === 'ONE_V_TWO')
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
    else if (scenario === 'TWO_V_ONE')
      if (response === 'DIFF_FULL_DEFENCE')
        await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM');
      else
        await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');

    await waitForFinishedBusinessProcess(caseId);

    deleteCaseFields('respondent1Copy');
  },

  claimantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE') => {
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

    await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM');

    await waitForFinishedBusinessProcess(caseId);
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

  assert.equal(response.status, 200);

  if (data.midEventData[pageId]) {
    const expectedMidEvent = data.midEventData[pageId];
    caseData = update(caseData, expectedMidEvent);
  }

  if (data.midEventGeneratedData && data.midEventGeneratedData[pageId]) {
    const expected = data.midEventGeneratedData[pageId];
    caseData = updateWithGenerated(caseData, responseBody.data, expected);
  }

  const matchFailure = responseMatchesExpectations(responseBody.data, caseData);
  assert.isTrue(!matchFailure, 'Response data did not match in page id ' + pageId
    + '. Offending field ' + matchFailure);
};

/**
 * <p>
 * This method uses the information in data to update caseData, then sends caseData to the validation page,
 * which depends on pageId.
 * </p>
 * <p>
 * The response is then checked so it answers to the information in data, throwing an assertion error otherwise.
 * caseData is updated with the response as well.
 * </p>
 * <p>
 * The most important piece is data, which should have the following shape:
 * <ul>
 *   <li>data.userInput is the input of the user, meaning that each key has to be the id of a field and each
 *   value is the value the user inputs to that field. Sometimes fields can be nested, so
 *   {group1 : {field1: 'value'}} is allowed</li>
 *   <li>data.expected contains field:value pairs that we expect the api to return with a particular value.
 *   For instance, if we know that the api has to calculate fieldT and we know that it should return 'ASDF',
 *   data.expected would contain {... fieldT : 'ASDF',...}. We can also have nested objects to account
 *   for complex types and so on.</li>
 *   <li>data.generated is for information that we know the api should include in the response, but that has a more
 *   complicated check than just equality. In particular
 *   <ul>
 *     <li>
 *       If we have { fieldT: { type: 'typeName' }} then we will check typeof response.data.fieldT === 'typeName'
 *       except if typeName is 'array' in which case we will check with isArray method.
 *       </li>
 *     <li>
 *       If we have { fieldT: { condition: aFunction }} we will check
 *       aFunction.call(response.data.fieldT, response.data.fieldT) for a true-ish value
 *       </li>
 *       <li>
 *         We also understand { fieldT: 'typeName' } to be checking the type and { fieldT: aFunction } to be
 *         checking with a function.
 *       </li>
 *       <li>
 *         Last, we also accept nesting.
 *       </li>
 *     </ul>
 *   </li>
 * </ul>
 * </p>
 * @param data data that should be use for the current operation
 * @param pageId id of the page we want to try
 * @return {Promise<void>} doesn't return anything
 */
const updateAndCheckData = async (data, pageId) => {
  console.log(`asserting page: ${pageId} has valid data`);

  caseData = update(caseData, data[pageId].userInput);
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    caseData,
    caseId
  );
  let responseBody = await response.json();

  assert.equal(response.status, 200);

  if (data[pageId].expected) {
    checkExpected(responseBody.data, data[pageId].expected);
  }

  if (data[pageId].generated) {
    checkGenerated(responseBody.data, data[pageId].generated);
  }

  caseData = update(caseData, responseBody.data);
};

function checkExpected(responseBodyData, expected, prefix = '') {
  if (!(responseBodyData)) {
    assert.fail('Response' + prefix ? '[' + prefix + ']' : '' + ' is empty but it was expected to be ' + expected);
  }
  for (const key in expected) {
    if (Object.prototype.hasOwnProperty.call(expected, key)) {
      if (typeof expected[key] === 'object') {
        checkExpected(responseBodyData[key], expected[key], key + '.');
      } else {
        assert.equal(expected[key], responseBodyData[key], prefix + key + ' has different value');
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
    if (currentObject[key] && typeof currentObject[key] === 'object' && !Array.isArray(currentObject[key])) {
      modified[key] = update(currentObject[key], modifications[key]);
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
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  }
};
