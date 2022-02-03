const testingSupport = require("./testingSupport");
const apiRequest = require("./apiRequest.js");
const config = require("../config.js");
const expectedEvents = require("../fixtures/ccd/expectedEvents.js");
const lodash = require("lodash");

module.exports = {
  validData,
  error,
  submittedEvent,
  containsPopulatedFields,
  correctEventsAreAvailableToUser,
}

validData = async (caseData, caseId, eventName, data, pageId, solicitor) => {
  console.log(`asserting page: ${pageId} has valid data`);

  const validDataForPage = data.valid[pageId];

  caseData = {...caseData, ...validDataForPage};

  let response;
  let responseBody;


  if(pageId === 'Experts'){
    console.log(caseId, 'pageId', pageId)
  }

  //EXTENSIONDATE
  if(eventName === 'INFORM_AGREED_EXTENSION_DATE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP'){
    response = await apiRequest.validatePage(eventName, pageId, caseData, caseId);
    responseBody = await response.json();

    delete responseBody.data['businessProcess'];
    delete responseBody.data['caseNotes'];
    delete responseBody.data['systemGeneratedCaseDocuments'];

    // To do: need to split this out
    //this needs to flip depending on which user signs in
    if(solicitor=== 'two'){
      delete responseBody.data['respondent1'];
    } else {
      delete responseBody.data['respondent2'];
    }
  } else if (eventName === 'DEFENDANT_RESPONSE' && mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP'){
    //DEFENDANT_RESPONSE
    response = await apiRequest.validatePage(eventName, pageId, caseData, caseId);
    responseBody = await response.json();

    delete responseBody.data['businessProcess'];
    delete responseBody.data['caseNotes'];
    delete responseBody.data['systemGeneratedCaseDocuments'];
    delete responseBody.data['respondentSolicitor2Reference'];


    // To do: need to split this out
    //this needs to flip depending on which user signs in
    if(solicitor=== 'two'){
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
      delete responseBody.data['respondent1DQDraftDirections'];
      delete responseBody.data['respondent1DQRequestedCourt'];
      delete responseBody.data['respondent1DQFurtherInformation'];
    } else {
      //might have to delete this line? - double check
      delete responseBody.data['respondent2'];
    }
  } else {
    response = await apiRequest.validatePage(eventName, pageId, caseData);
    responseBody = await response.json();
  }

  // const responseBody = await response.json();
  assert.equal(response.status, 200);

  // eslint-disable-next-line no-prototype-builtins
  if (midEventFieldForPage.hasOwnProperty(pageId)) {
    addMidEventFields(pageId, responseBody);
    caseData = removeUiFields(pageId, caseData);
  }

  assert.deepEqual(responseBody.data, caseData);
};

function removeUiFields(pageId, caseData) {
  console.log(`Removing ui fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];

  if (midEventField.uiField.remove === true) {
    const fieldToRemove = midEventField.uiField.field;
    delete caseData[fieldToRemove];
  }
  return caseData;
}

error = async (pageId, eventData, expectedErrorMessage, responseBodyMessage = 'Unable to proceed because there are one or more callback Errors or Warnings') => {
  let response
  if(mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP' && (eventName === 'DEFENDANT_RESPONSE' || eventName === 'INFORM_AGREED_EXTENSION_DATE')){
    response = await apiRequest.validatePage(eventName, pageId, {...caseData, ...eventData}, caseId, 422);
  } else {
    response = await apiRequest.validatePage(eventName, pageId, {...caseData, ...eventData}, null, 422);
  }

  const responseBody = await response.json();

  assert.equal(response.status, 422);
  assert.equal(responseBody.message, responseBodyMessage);
  if (responseBody.callbackErrors != null) {
    assert.equal(responseBody.callbackErrors[0], expectedErrorMessage);
  }
};

submittedEvent = async (expectedState, submittedCallbackResponseContains, hasSubmittedCallback = true) => {
  await apiRequest.startEvent(eventName, caseId);

  const response = await apiRequest.submitEvent(eventName, caseData, caseId);
  const responseBody = await response.json();
  assert.equal(response.status, 201);
  assert.equal(responseBody.state, expectedState);
  if (hasSubmittedCallback) {
    assert.equal(responseBody.callback_response_status_code, 200);
    assert.include(responseBody.after_submit_callback_response.confirmation_header, submittedCallbackResponseContains.header);
    assert.include(responseBody.after_submit_callback_response.confirmation_body, submittedCallbackResponseContains.body);
  }

  if (eventName === 'CREATE_CLAIM') {
    caseId = responseBody.id;
    console.log('Case created: ' + caseId);
  }
};

containsPopulatedFields = returnedCaseData => {
  for (let populatedCaseField of Object.keys(caseData)) {
    assert.property(returnedCaseData,  populatedCaseField);
  }
};

correctEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (config.runningEnv == 'preview') {
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state]);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state]);
  }
};

// const caseNotAvailableToUser = async (user) => {
//   console.log(`Asserting user ${user.type} does not have permission to case`);
//   const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId, 404);
//   assert.equal(caseForDisplay.message, `No case found for reference: ${caseId}`);
// };

