const config = require('../config.js');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const {dateTime} = require('./dataHelper');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess} = require('../api/testingSupport');
const {assignCaseRoleToUser, addUserCaseMapping, unAssignAllUsers} = require('./caseRoleAssignmentHelper');
const {HEARING_AND_LISTING} = require('../fixtures/featureKeys');
const {element} = require('../api/dataHelper');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaimSpec.js');
const expectedEvents = require('../fixtures/ccd/expectedEventsLRSpec.js');
const nonProdExpectedEvents = require('../fixtures/ccd/nonProdExpectedEventsLRSpec.js');
const testingSupport = require('./testingSupport');
const {checkCourtLocationDynamicListIsEnabled} = require('./testingSupport');
const {checkToggleEnabled} = require('./testingSupport');
const {replaceFieldsIfHNLToggleIsOffForClaimantResponseSpec, replaceFieldsIfHNLToggleIsOffForDefendantSpecResponse, removeHNLFieldsFromClaimData} = require('../helpers/hnlFeatureHelper');

let caseId, eventName;
let caseData = {};

const data = {
  CREATE_CLAIM: (scenario) => claimData.createClaim(scenario),
  DEFENDANT_RESPONSE: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpec.js').respondToClaim(response, camundaEvent),
  DEFENDANT_RESPONSE2: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpec.js').respondToClaim2(response, camundaEvent),
  DEFENDANT_RESPONSE_1v2: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpec1v2.js').respondToClaim(response, camundaEvent),
  DEFENDANT_RESPONSE_2v1: (response, camundaEvent) => require('../fixtures/events/defendantResponseSpec2v1.js').respondToClaim(response, camundaEvent),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponseSpec.js').claimantResponse(mpScenario),
  CLAIMANT_RESPONSE_1v2: (response) => require('../fixtures/events/claimantResponseSpec1v2.js').claimantResponse(response),
  CLAIMANT_RESPONSE_2v1: (response) => require('../fixtures/events/claimantResponseSpec2v1.js').claimantResponse(response),
  INFORM_AGREED_EXTENSION_DATE: () => require('../fixtures/events/informAgreeExtensionDateSpec.js'),
  DEFAULT_JUDGEMENT_SPEC: require('../fixtures/events/defaultJudgmentSpec.js'),
  DEFAULT_JUDGEMENT_SPEC_1V2: require('../fixtures/events/defaultJudgment1v2Spec.js'),
  DEFAULT_JUDGEMENT_SPEC_2V1: require('../fixtures/events/defaultJudgment2v1Spec.js')
};

const eventData = {
  defendantResponses: {
    ONE_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE('FULL_DEFENCE'),
      FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT')
    },
    ONE_V_TWO: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('FULL_DEFENCE'),
      FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_1v2('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE_1v2('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_1v2('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE_1v2('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_1v2('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE_1v2('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE_1v2('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      DIFF_FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('DIFF_FULL_DEFENCE'),
      DIFF_FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_1v2('DIFF_FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      DIFF_NOT_FULL_DEFENCE: data.DEFENDANT_RESPONSE_1v2('DIFF_NOT_FULL_DEFENCE'),
      DIFF_NOT_FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_1v2('DIFF_NOT_FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
    },
    ONE_V_ONE_DIF_SOL: {
      FULL_DEFENCE1: data.DEFENDANT_RESPONSE('FULL_DEFENCE'),
      FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION1: data.DEFENDANT_RESPONSE('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION1: data.DEFENDANT_RESPONSE('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM1: data.DEFENDANT_RESPONSE('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),

      FULL_DEFENCE2: data.DEFENDANT_RESPONSE2('FULL_DEFENCE'),
      FULL_DEFENCE2_PBAv3: data.DEFENDANT_RESPONSE2('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION2: data.DEFENDANT_RESPONSE2('FULL_ADMISSION'),
      FULL_ADMISSION2_PBAv3: data.DEFENDANT_RESPONSE2('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION2: data.DEFENDANT_RESPONSE2('PART_ADMISSION'),
      PART_ADMISSION2_PBAv3: data.DEFENDANT_RESPONSE2('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM2: data.DEFENDANT_RESPONSE2('COUNTER_CLAIM'),
      COUNTER_CLAIM2_PBAv3: data.DEFENDANT_RESPONSE2('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT')
    },
    TWO_V_ONE: {
      FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('FULL_DEFENCE'),
      FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_2v1('FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      FULL_ADMISSION: data.DEFENDANT_RESPONSE_2v1('FULL_ADMISSION'),
      FULL_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_2v1('FULL_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      PART_ADMISSION: data.DEFENDANT_RESPONSE_2v1('PART_ADMISSION'),
      PART_ADMISSION_PBAv3: data.DEFENDANT_RESPONSE_2v1('PART_ADMISSION', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      COUNTER_CLAIM: data.DEFENDANT_RESPONSE_2v1('COUNTER_CLAIM'),
      COUNTER_CLAIM_PBAv3: data.DEFENDANT_RESPONSE_2v1('COUNTER_CLAIM', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      DIFF_FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('DIFF_FULL_DEFENCE'),
      DIFF_FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_2v1('DIFF_FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
      DIFF_NOT_FULL_DEFENCE: data.DEFENDANT_RESPONSE_2v1('DIFF_NOT_FULL_DEFENCE'),
      DIFF_NOT_FULL_DEFENCE_PBAv3: data.DEFENDANT_RESPONSE_2v1('DIFF_NOT_FULL_DEFENCE', 'CREATE_CLAIM_SPEC_AFTER_PAYMENT'),
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

    let createClaimData  = {};

    createClaimData = data.CREATE_CLAIM(scenario);

    // ToDo: Remove and delete function after hnl uplift released
    const hnlEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if(!hnlEnabled) {
      removeHNLFieldsFromClaimData(createClaimData);
    }
    //==============================================================

    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    for (let pageId of Object.keys(createClaimData.userInput)) {
      await assertValidData(createClaimData, pageId);
    }

    await assertSubmittedEvent('PENDING_CASE_ISSUED');

    await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONE', config.defendantSolicitorUser);

    if (scenario === 'ONE_V_TWO'
      && createClaimData.userInput.SameLegalRepresentative
      && createClaimData.userInput.SameLegalRepresentative.respondent2SameLegalRepresentative === 'No') {
        await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWO', config.secondDefendantSolicitorUser);
    }

    await waitForFinishedBusinessProcess(caseId);
    const pbaV3 = true; //await checkToggleEnabled(PBAv3);

    console.log('Is PBAv3 toggle on?: ' + pbaV3);

    if (pbaV3) {
      await apiRequest.paymentUpdate(caseId, '/service-request-update-claim-issued',
        claimData.serviceUpdateDto(caseId, 'paid'));
      console.log('Service request update sent to callback URL');
    }

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

  defendantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE',
                            expectedEvent = 'AWAITING_APPLICANT_INTENTION') => {
    await apiRequest.setupTokens(user);
    eventName = 'DEFENDANT_RESPONSE_SPEC';

    const pbaV3 = true; //await checkToggleEnabled(PBAv3);
    if(pbaV3 == true){
      response = response+'_PBAv3';
    }

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    let defendantResponseData = eventData['defendantResponses'][scenario][response];
    defendantResponseData = await replaceDefendantResponseWithCourtNumberIfCourtLocationDynamicListIsNotEnabled(defendantResponseData);

    const hnlSdoEnabled = await checkToggleEnabled(HEARING_AND_LISTING);

    //ToDo: Remove when hnlSdoEnabled feature toggle is removed
    if ((['preview', 'demo'].includes(config.runningEnv)) && hnlSdoEnabled) {
      defendantResponseData = adjustDataForHnl(defendantResponseData, response);
    }
    if(!hnlSdoEnabled) {
      let solicitor = user === config.defendantSolicitorUser ? 'solicitorOne' : 'solicitorTwo';
      defendantResponseData = await replaceFieldsIfHNLToggleIsOffForDefendantSpecResponse(
        defendantResponseData, solicitor);
    }

    caseData = returnedCaseData;

    console.log(`${response} ${scenario}`);

    for (let pageId of Object.keys(defendantResponseData.userInput)) {
      await assertValidData(defendantResponseData, pageId);
    }

    switch (scenario) {
      case 'ONE_V_ONE_DIF_SOL':
        /* when camunda process is done, when both respondents have answered
        this should be AWAITING_APPLICANT_INTENTION; while only one has answered
        this will be AWAITING_RESPONDENT_ACKNOWLEDGEMENT
         */
        await assertSubmittedEvent(expectedEvent);
        break;
      case 'ONE_V_ONE':
        await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
        break;
      case 'ONE_V_TWO':
        await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
        break;
      case 'TWO_V_ONE':
        if (response === 'DIFF_FULL_DEFENCE') {
          await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM');
        } else {
          await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION');
        }
        break;
    }

    await waitForFinishedBusinessProcess(caseId);

    deleteCaseFields('respondent1Copy');
  },

  claimantResponse: async (user, response = 'FULL_DEFENCE', scenario = 'ONE_V_ONE',
                           expectedEndState) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE_SPEC';
    caseData = await apiRequest.startEvent(eventName, caseId);
    let claimantResponseData = eventData['claimantResponses'][scenario][response];
    claimantResponseData = await replaceClaimantResponseWithCourtNumberIfCourtLocationDynamicListIsNotEnabled(claimantResponseData);

    // ToDo: Remove and delete function after hnl uplift released
    const hnlEnabled = await checkToggleEnabled('hearing-and-listing-sdo');
    if(!hnlEnabled) {
      claimantResponseData = await replaceFieldsIfHNLToggleIsOffForClaimantResponseSpec(
        claimantResponseData);
    }

    for (let pageId of Object.keys(claimantResponseData.userInput)) {
      await assertValidData(claimantResponseData, pageId);
    }

    let validState = expectedEndState || 'PROCEEDS_IN_HERITAGE_SYSTEM';
    if (['preview', 'demo'].includes(config.runningEnv) && (response == 'FULL_DEFENCE' || response == 'NOT_PROCEED')) {
      validState = 'JUDICIAL_REFERRAL';
    }


    await assertSubmittedEvent(validState || 'PROCEEDS_IN_HERITAGE_SYSTEM');

    await waitForFinishedBusinessProcess(caseId);
  },

  amendRespondent1ResponseDeadline: async (user) => {
    await apiRequest.setupTokens(user);
    let respondent1deadline ={};
    respondent1deadline = {'respondent1ResponseDeadline':'2022-01-10T15:59:50'};
    testingSupport.updateCaseData(caseId, respondent1deadline);
  },

  amendRespondent2ResponseDeadline: async (user) => {
    await apiRequest.setupTokens(user);
    let respondent2deadline ={};
    respondent2deadline = {'respondent2ResponseDeadline':'2022-01-10T15:59:50'};
    testingSupport.updateCaseData(caseId, respondent2deadline);
  },

  defaultJudgmentSpec: async (user, scenario) => {
    await apiRequest.setupTokens(user);

    let registrationData;
    eventName = 'DEFAULT_JUDGEMENT_SPEC';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    caseData = returnedCaseData;
    assertContainsPopulatedFields(returnedCaseData);

    const pbaV3 = true;
    if(pbaV3 == true){
      let claimIssuedPBADetails = {
        claimIssuedPBADetails:{
          applicantsPbaAccounts: {
              value: {
                code:'66b21c60-aed1-11ed-8aa3-494efce63912',
                label:'PBA0088192'
              },
            list_items:[
              {
                code:'66b21c60-aed1-11ed-8aa3-494efce63912',
                label:'PBA0088192'
              },
              {
                code:'66b21c61-aed1-11ed-8aa3-494efce63912',
                label:'PBA0078095'
              }
            ]
          },
          fee:{
            calculatedAmountInPence:'8000',
            code:'FEE0205',
            version:'6'
          },
          serviceRequestReference:'2023-1676644996295'
        }
      };
      caseData = update(caseData, claimIssuedPBADetails);
    }

    if (scenario === 'ONE_V_TWO') {
      registrationData = {
        registrationTypeRespondentOne: [
          {
            value: {
            registrationType: 'R',
            judgmentDateTime: dateTime(0)
          },
          id: '9f30e576-f5b7-444f-8ba9-27dabb21d966' } ],
          registrationTypeRespondentTwo: [
            {
              value: {
              registrationType: 'R',
              judgmentDateTime: dateTime(0)
            },
            id: '9f30e576-f5b7-444f-8ba9-27dabb21d966' } ],
      };
      await validateEventPagesDefaultJudgments(data.DEFAULT_JUDGEMENT_SPEC_1V2, scenario);
    } else if (scenario === 'TWO_V_ONE') {
      registrationData = {
        registrationTypeRespondentOne: [
          {
            value: {
            registrationType: 'R',
            judgmentDateTime: dateTime(0)
          },
          id: '9f30e576-f5b7-444f-8ba9-27dabb21d966' } ],
          registrationTypeRespondentTwo: []
      };
      await validateEventPagesDefaultJudgments(data.DEFAULT_JUDGEMENT_SPEC_2V1, scenario);
    } else {
      registrationData = {
        registrationTypeRespondentOne: [
          {
            value: {
            registrationType: 'R',
            judgmentDateTime: dateTime(0)
          },
          id: '9f30e576-f5b7-444f-8ba9-27dabb21d966' } ],
          registrationTypeRespondentTwo: []
      };
      await validateEventPagesDefaultJudgments(data.DEFAULT_JUDGEMENT_SPEC, scenario);
    }

    caseData = update(caseData, registrationData);
    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: '',
      body: ''
    }, true);



    await waitForFinishedBusinessProcess(caseId);
  },

  getCaseId: async () => {
    console.log (`case created: ${caseId}`);
    return caseId;
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

const validateEventPagesDefaultJudgments = async (data, scenario) => {
  //transform the data
  console.log('validateEventPages');
  for (let pageId of Object.keys(data.userInput)) {
    await assertValidDataDefaultJudgments(data, pageId, scenario);
  }
};

const assertValidDataDefaultJudgments = async (data, pageId, scenario) => {
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

  if (pageId === 'defendantDetailsSpec') {
    delete responseBody.data['registrationTypeRespondentOne'];
    delete responseBody.data['registrationTypeRespondentTwo'];
  }
  if (pageId === 'paymentConfirmationSpec') {
    if (scenario === 'ONE_V_ONE' || scenario === 'TWO_V_ONE') {
      responseBody.data.currentDefendantName = 'Sir John Doe';
    } else {
      responseBody.data.currentDefendantName = 'both defendants';
    }

  } else if (pageId === 'paymentSetDate') {
    responseBody.data.repaymentDue= '1580.00';
  }
  if (pageId === 'paymentSetDate' || pageId === 'paymentType') {
    responseBody.data.currentDatebox = '25 August 2022';
  }

  try {
    assert.deepEqual(responseBody.data, caseData);
  }
  catch(err) {
    console.error('Validate data is failed due to a mismatch ..', err);
    throw err;
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

// CIV-4203: needs to be removed when court location goes live
async function replaceDefendantResponseWithCourtNumberIfCourtLocationDynamicListIsNotEnabled(responseData) {
  let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
  // work around for the api  tests
  console.log(`Court location selected in Env: ${config.runningEnv}`);
  if (!isCourtListEnabled) {
    responseData = {
      ...responseData,
      userInput: {
        ...responseData.userInput,
        RequestedCourtLocationLRspec: {
          responseClaimCourtLocationRequired: 'No'
        }
      }
    };
  }
  return responseData;
}

// CIV-4203: needs to be removed when court location goes live
async function replaceClaimantResponseWithCourtNumberIfCourtLocationDynamicListIsNotEnabled(responseData) {
  let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
  // work around for the api  tests
  console.log(`Court location selected in Env: ${config.runningEnv}`);
  if (!isCourtListEnabled) {
    responseData = {
      ...responseData,
      userInput: {
        ...responseData.userInput,
        ApplicantCourtLocationLRspec: {
          applicant1DQRequestedCourt: {
            reasonForHearingAtSpecificCourt: 'reasons',
            responseCourtCode: '123'
          }
        },
      }
    };
  }
  return responseData;
}

const assertCorrectEventsAreAvailableToUser = async (user, state) => {
  console.log(`Asserting user ${user.type} in env ${config.runningEnv} has correct permissions`);
  const caseForDisplay = await apiRequest.fetchCaseForDisplay(user, caseId);
  if (['preview', 'demo'].includes(config.runningEnv)) {
    expect(caseForDisplay.triggers).to.deep.include.members(nonProdExpectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state],
      'Unexpected events for state ' + state + ' and user type ' + user.type);
  }
};

const adjustDataForHnl = (inputData, response) => {
  //ToDo: Take SmallClaimWitnesses data below and replace SmallClaimWitnesses data in respondToClaimSpec js files when h&l toggled is removed
  if (!response.startsWith('FULL_DEFENCE')) {
    return inputData;
  }
  const respondentNum = response == 'FULL_DEFENCE' ? '1' : '2';
  return {
    ...inputData,
    userInput: {
      ...inputData.userInput,
      SmallClaimWitnesses: {
        [`respondent${respondentNum}DQWitnesses`]: {
          witnessesToAppear: 'Yes',
          details: [
            element({
              firstName: 'Witness',
              lastName: 'One',
              emailAddress: 'witness@email.com',
              phoneNumber: '07116778998',
              reasonForWitness: 'None'
            })
          ]
        }
      }
    }
  };
};
