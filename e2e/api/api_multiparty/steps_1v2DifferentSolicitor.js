const config = require('../config.js');
const lodash = require('lodash');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');

chai.use(deepEqualInAnyOrder);
chai.config.truncateThreshold = 0;
const {expect, assert} = chai;

const {waitForFinishedBusinessProcess, assignCaseToDefendant} = require('../api/testingSupport');
const apiRequest = require('./apiRequest.js');
const claimData = require('../fixtures/events/createClaim.js');
const expectedEvents = require('../fixtures/ccd/expectedEvents.js');
const testingSupport = require('./testingSupport');

const data = {
  CREATE_CLAIM: (mpScenario) => claimData.createClaim(mpScenario),
  CREATE_CLAIM_RESPONDENT_LIP: claimData.createClaimLitigantInPerson,
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
  INFORM_AGREED_EXTENSION_DATE: require('../fixtures/events/informAgreeExtensionDate.js'),
  INFORM_AGREED_EXTENSION_DATE_SOLICITOR_TWO: require('../fixtures/events/1v2DifferentSolicitorEvents/informAgreeExtensionDate_Solicitor2.js'),
  DEFENDANT_RESPONSE: require('../fixtures/events/defendantResponse.js'),
  DEFENDANT_RESPONSE_SAME_SOLICITOR:  require('../fixtures/events/1v2SameSolicitorEvents/defendantResponse_sameSolicitor.js'),
  CLAIMANT_RESPONSE: require('../fixtures/events/claimantResponse.js'),
  ADD_DEFENDANT_LITIGATION_FRIEND: require('../fixtures/events/addDefendantLitigationFriend.js'),
  CASE_PROCEEDS_IN_CASEMAN: require('../fixtures/events/caseProceedsInCaseman.js'),
  AMEND_PARTY_DETAILS: require('../fixtures/events/amendPartyDetails.js'),
  ADD_CASE_NOTE: require('../fixtures/events/addCaseNote.js')
};

module.exports = {

  // defendantResponseSolicitorOne: async (user) => {
  //   await apiRequest.setupTokens(user);
  //   mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP'
  //
  //   eventName = 'DEFENDANT_RESPONSE';
  //   let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
  //   deleteCaseFields('respondent2');
  //
  //   assertContainsPopulatedFields(returnedCaseData);
  //   caseData = returnedCaseData;
  //
  //   deleteCaseFields('isRespondent1');
  //   //won't be able to see this
  //   deleteCaseFields('respondentSolicitor2Reference');
  //   deleteCaseFields('solicitorReferences');
  //   deleteCaseFields('systemGeneratedCaseDocuments');
  //
  //   let defendantResponseData = data['DEFENDANT_RESPONSE_SOLICITOR_ONE'];
  //
  //   await validateEventPages(defendantResponseData, 'one');
  //
  //   await assertError('ConfirmDetails',defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
  //     'The date entered cannot be in the future');
  //   await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
  //   await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
  //     'The date cannot be in the past and must not be more than a year in the future');
  //   await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
  //     'The date cannot be in the past and must not be more than a year in the future');
  //
  //   await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
  //     header: 'You have submitted the Defendant\'s defence',
  //     body: 'Once the other defendant\'s legal representative has submitted their defence, we will send the '
  //       + 'claimant\'s legal representative a notification.'
  //   });
  //
  //   await waitForFinishedBusinessProcess(caseId);
  //   await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  //   await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  //   await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  //   deleteCaseFields('respondent1Copy');
  //   deleteCaseFields('respondent2Copy');
  // },
  //
  // defendantResponseSolicitorTwo: async (user) => {
  //   await apiRequest.setupTokens(user);
  //   mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP'
  //
  //   eventName = 'DEFENDANT_RESPONSE';
  //   caseData = {};
  //   let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
  //
  //   assertContainsPopulatedFields(returnedCaseData);
  //   caseData = returnedCaseData;
  //
  //   deleteCaseFields('isRespondent1');
  //   deleteCaseFields('respondent2Copy');
  //   //won't be able to see this
  //   deleteCaseFields('respondentSolicitor2Reference');
  //   deleteCaseFields('solicitorReferences');
  //   deleteCaseFields('systemGeneratedCaseDocuments');
  //
  //   let defendantResponseData = data['DEFENDANT_RESPONSE_SOLICITOR_TWO'];
  //
  //   await validateEventPages(defendantResponseData, 'two');
  //
  //   await assertError('ConfirmDetails',defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
  //     'The date entered cannot be in the future');
  //   await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
  //   await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
  //     'The date cannot be in the past and must not be more than a year in the future');
  //   await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
  //     'The date cannot be in the past and must not be more than a year in the future');
  //
  //   await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION', {
  //     header: 'You have submitted the Defendant\'s defence',
  //     body: 'The Claimant legal representative will get a notification'
  //   });
  //
  //   await waitForFinishedBusinessProcess(caseId);
  //   await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
  //   await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
  //   await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_APPLICANT_INTENTION');
  //   deleteCaseFields('respondent1Copy');
  //   deleteCaseFields('respondent2Copy');
  // },


}
