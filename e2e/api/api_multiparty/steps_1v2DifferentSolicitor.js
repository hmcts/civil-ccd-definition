const config = require('../../config');
const lodash = require('lodash');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../../api/testingSupport');
const apiRequest = require('./../apiRequest.js');
const expectedEvents = require('../../fixtures/ccd/expectedEvents.js');
const testingSupport = require('./../testingSupport');
const validateData = require('../apiTestHelper');

const data = {
  ACKNOWLEDGE_CLAIM_SOLICITOR_ONE: require('../../fixtures/events/1v2DifferentSolicitorEvents/acknowledgeClaim_Solicitor1.js'),
  ACKNOWLEDGE_CLAIM_SOLICITOR_TWO: require('../../fixtures/events/1v2DifferentSolicitorEvents/acknowledgeClaim_Solicitor2.js'),
  INFORM_AGREED_EXTENSION_DATE: require('../../fixtures/events/informAgreeExtensionDate.js'),
  INFORM_AGREED_EXTENSION_DATE_SOLICITOR_TWO: require('../../fixtures/events/1v2DifferentSolicitorEvents/informAgreeExtensionDate_Solicitor2.js'),
  DEFENDANT_RESPONSE: require('../../fixtures/events/defendantResponse.js'),
  DEFENDANT_RESPONSE_SAME_SOLICITOR:  require('../../fixtures/events/1v2SameSolicitorEvents/defendantResponse_sameSolicitor.js'),
};

let caseId, eventName;
let caseData = {};
let mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';

module.exports = {
  acknowledgeClaimSolicitorOne: async (user, caseReference) => {
    caseId = caseReference;
    await apiRequest.setupTokens(user);

    eventName = 'ACKNOWLEDGE_CLAIM';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    //because sol one cannot see respondent 2 details
    validateData.deleteCaseFields('respondent2');

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('systemGeneratedCaseDocuments');
    deleteCaseFields('solicitorReferences');
    deleteCaseFields('solicitorReferencesCopy');
    deleteCaseFields('respondentSolicitor2Reference');

    await validateEventPages(data.ACKNOWLEDGE_CLAIM_SOLICITOR_ONE);

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

  acknowledgeClaimSolicitorTwo: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'ACKNOWLEDGE_CLAIM';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    //because sol one cannot see respondent 1 details
    deleteCaseFields('respondent1');

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('systemGeneratedCaseDocuments');

    deleteCaseFields('solicitorReferences');
    deleteCaseFields('solicitorReferencesCopy');
    deleteCaseFields('respondentSolicitor2Reference');
    deleteCaseFields('respondent1ClaimResponseIntentionType');

    await validateEventPages(data.ACKNOWLEDGE_CLAIM_SOLICITOR_TWO);

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

  informAgreedExtensionSolicitor1: async (user, multipartyScenario) => {
    await apiRequest.setupTokens(user);
    mpScenario = multipartyScenario;

    deleteCaseFields('respondent2');

    eventName = 'INFORM_AGREED_EXTENSION_DATE';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;
    deleteCaseFields('systemGeneratedCaseDocuments');

    await validateEventPages(data[eventName], 'one');

    await assertError('ExtensionDate', data[eventName].invalid.ExtensionDate.past,
      'The agreed extension date must be a date in the future');
    await assertError('ExtensionDate', data[eventName].invalid.ExtensionDate.beforeCurrentDeadline,
      'The agreed extension date must be after the current deadline');

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

  informAgreedExtensionSolicitor2: async (user, multipartyScenario) => {
    await apiRequest.setupTokens(user);
    mpScenario = multipartyScenario;

    deleteCaseFields('respondent1');

    eventName = 'INFORM_AGREED_EXTENSION_DATE';
    const informDateData = data['INFORM_AGREED_EXTENSION_DATE_SOLICITOR_TWO'];
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;
    deleteCaseFields('systemGeneratedCaseDocuments');

    await validateEventPages(informDateData, 'two');

    await assertError('ExtensionDate', informDateData.invalid.ExtensionDate.past,
      'The agreed extension date must be a date in the future');
    await assertError('ExtensionDate', informDateData.invalid.ExtensionDate.beforeCurrentDeadline,
      'The agreed extension date must be after the current deadline');

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

  defendantResponseSolicitorOne: async (user) => {
    await apiRequest.setupTokens(user);
    mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP'

    eventName = 'DEFENDANT_RESPONSE';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    deleteCaseFields('respondent2');

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('isRespondent1');
    //won't be able to see this
    deleteCaseFields('respondentSolicitor2Reference');
    deleteCaseFields('solicitorReferences');
    deleteCaseFields('systemGeneratedCaseDocuments');

    let defendantResponseData = data['DEFENDANT_RESPONSE_SOLICITOR_ONE'];

    await validateEventPages(defendantResponseData, 'one');

    await assertError('ConfirmDetails',defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
      'The date entered cannot be in the future');
    await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
      'The date cannot be in the past and must not be more than a year in the future');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
      'The date cannot be in the past and must not be more than a year in the future');

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'You have submitted the Defendant\'s defence',
      body: 'Once the other defendant\'s legal representative has submitted their defence, we will send the '
        + 'claimant\'s legal representative a notification.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    deleteCaseFields('respondent1Copy');
    deleteCaseFields('respondent2Copy');
  },

  defendantResponseSolicitorTwo: async (user) => {
    await apiRequest.setupTokens(user);
    mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP'

    eventName = 'DEFENDANT_RESPONSE';
    caseData = {};
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    //because it returns with all of respondent1 details. should they be deleted or
    // placed in the response file?
    // deleteCaseFields('respondent1');
    // deleteCaseFields('respondent1ClaimResponseType');
    // deleteCaseFields('respondent1ClaimResponseDocument');
    // deleteCaseFields('respondent1DQFileDirectionsQuestionnaire');
    // deleteCaseFields('respondent1DQDisclosureOfElectronicDocuments');
    // deleteCaseFields('respondent1DQExperts');
    // deleteCaseFields('respondent1DQWitnesses');
    // deleteCaseFields('respondent1DQLanguage');
    // deleteCaseFields('respondent1DQHearing');
    // deleteCaseFields('respondent1DQDraftDirections');
    // deleteCaseFields('respondent1DQRequestedCourt');
    // deleteCaseFields('respondent1DQFurtherInformation');

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('isRespondent1');
    deleteCaseFields('respondent2Copy');
    //won't be able to see this
    deleteCaseFields('respondentSolicitor2Reference');
    deleteCaseFields('solicitorReferences');
    deleteCaseFields('systemGeneratedCaseDocuments');

    let defendantResponseData = data['DEFENDANT_RESPONSE_SOLICITOR_TWO'];

    await validateEventPages(defendantResponseData, 'two');

    await assertError('ConfirmDetails',defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
      'The date entered cannot be in the future');
    await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
      'The date cannot be in the past and must not be more than a year in the future');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
      'The date cannot be in the past and must not be more than a year in the future');

    await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION', {
      header: 'You have submitted the Defendant\'s defence',
      body: 'The Claimant legal representative will get a notification'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_APPLICANT_INTENTION');
    deleteCaseFields('respondent1Copy');
    deleteCaseFields('respondent2Copy');
  },
}
