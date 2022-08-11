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
const expectedEvents = require('../fixtures/ccd/expectedEvents.js');
const testingSupport = require('./testingSupport');

let caseId, eventName;
let caseData = {};

const data = {
  CREATE_CLAIM: (scenario) => claimData.createClaim(scenario),
  DEFENDANT_RESPONSE: (response) => require('../fixtures/events/defendantResponseSpec.js').respondToClaim(response),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponseSpec.js').claimantResponse(mpScenario),
  CREATE_DISPOSAL: (response) => require('../fixtures/events/createSDO.js').createSDODisposal(),
  CREATE_FAST: (response) => require('../fixtures/events/createSDO.js').createSDOFast(),
  CREATE_SMALL: (response) => require('../fixtures/events/createSDO.js').createSDOSmall(),
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    if (scenario === 'ONE_V_TWO'
      && createClaimData.userInput.SameLegalRepresentative
      && createClaimData.userInput.SameLegalRepresentative.respondent2SameLegalRepresentative === 'No') {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWOSPEC', config.secondDefendantSolicitorUser);
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

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    let defendantResponseData = eventData['defendantResponses'][scenario][response];

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

    await assertSubmittedEvent('JUDICIAL_REFERRAL'); //Not sure this is correct, but definitely should not be proceed to heritage system.
    await assignCaseRoleToUser(caseId, 'judge-profile', config.judge);

    await waitForFinishedBusinessProcess(caseId);
  },


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createSDO: async (user) => {

    await apiRequest.setupTokens(user);

    eventName = 'CREATE_SDO';
    caseData = await apiRequest.startEvent(eventName, caseId);
    let disposalData = data["CREATE_DISPOSAL"];

    for (let pageId of Object.keys(disposalData.userInput)) {
      await assertValidData(disposalData, pageId);
    }

    await assertSubmittedEvent('CASE_PROGRESSION');

    await waitForFinishedBusinessProcess(caseId);

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  getCaseId: async () => {
    console.log (`case created: ${caseId}`);
    return caseId;
  },
};
