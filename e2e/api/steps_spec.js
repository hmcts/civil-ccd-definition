const config = require('../config.js');
const lodash = require('lodash');
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

const data = {
  CREATE_CLAIM: () => claimData.createClaim(),
  DEFENDANT_RESPONSE: require('../fixtures/events/defendantResponse.js'),
  CLAIMANT_RESPONSE: (mpScenario) => require('../fixtures/events/claimantResponse.js').claimantResponse(mpScenario)
};

const eventData = {
  defendantResponses: {
    ONE_V_ONE: data.DEFENDANT_RESPONSE
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

let caseId, eventName;
let caseData = {};
let mpScenario = 'ONE_V_ONE';

module.exports = {

  defendantResponseNoChecks: async (user) => {
    await apiRequest.setupTokens(user);
    eventName = 'DEFENDANT_RESPONSE_SPEC';

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    caseData = {
      "addApplicant2": "No",
      "additionalInformationForJudge": null,
      "addRespondent2": "No",
      "allocatedTrack": null,
      "claimType": null,
      "defenceRouteRequired": "DISPUTES_THE_CLAIM",
      "detailsOfWhyDoesYouDisputeTheClaim": "asdf",
      "multiPartyResponseTypeFlags": null,
      "respondent1": {
        "companyName": "company 2",
        "individualDateOfBirth": null,
        "individualFirstName": null,
        "individualLastName": null,
        "individualTitle": null,
        "organisationName": null,
        "partyName": "company 2",
        "partyTypeDisplayValue": "Company",
        "primaryAddress": {
          "AddressLine1": "Markson 35",
          "AddressLine2": null,
          "AddressLine3": null,
          "Country": null,
          "County": null,
          "PostCode": "SW1W 0NY",
          "PostTown": null
        },
        "soleTraderDateOfBirth": null,
        "soleTraderFirstName": null,
        "soleTraderLastName": null,
        "soleTraderTitle": null,
        "soleTraderTradingAs": null,
        "type": "COMPANY"
      },
      "respondent1ClaimResponsePaymentAdmissionForSpec": null,
      "respondent1ClaimResponseTypeForSpec": "FULL_DEFENCE",
      "respondent1Copy": {
        "companyName": "company 2",
        "partyName": "company 2",
        "partyTypeDisplayValue": "Company",
        "primaryAddress": {
          "AddressLine1": "Markson 35",
          "PostCode": "SW1W 0NY"
        },
        "type": "COMPANY"
      },
      "respondent1DQDisclosureReport": null,
      "respondent1DQExperts": {
        "details": [],
        "expertReportsSent": null,
        "expertRequired": "No",
        "jointExpertSuitable": null
      },
      "respondent1DQFileDirectionsQuestionnaire": {
        "explainedToClient": [
          "CONFIRM"
        ],
        "oneMonthStayRequested": "Yes",
        "reactionProtocolCompliedWith": "Yes",
        "reactionProtocolNotCompliedWithReason": null
      },
      "respondent1DQFutureApplications": {
        "intentionToMakeFutureApplications": "No",
        "whatWillFutureApplicationsBeMadeFor": null
      },
      "respondent1DQHearingFastClaim": {
        "hearingLength": "ONE_DAY",
        "hearingLengthDays": null,
        "hearingLengthHours": null,
        "unavailableDatesLRspec": [],
        "unavailableDatesRequired": "No"
      },
      "respondent1DQHearingSupport": null,
      "respondent1DQLanguage": {
        "court": "ENGLISH",
        "documents": "ENGLISH",
        "evidence": "ENGLISH"
      },
      "respondent1DQWitnesses": {
        "details": [],
        "witnessesToAppear": "No"
      },
      "respondent1OrganisationPolicy": {
        "Organisation": {
          "OrganisationID": "Q1KOKP2"
        },
        "OrgPolicyCaseAssignedRole": "[RESPONDENTSOLICITORONESPEC]"
      },
      "respondent1SpecDefenceResponseDocument": null,
      "respondent2": null,
      "respondent2ClaimResponseTypeForSpec": null,
      "respondent2Copy": null,
      "respondent2SameLegalRepresentative": null,
      "respondToClaim": null,
      "respondToCourtLocation": null,
      "responseClaimCourtLocationRequired": "No",
      "responseClaimTrack": "FAST_CLAIM",
      "sameSolicitorSameResponse": null,
      "solicitorReferences": null,
      "specAoSApplicantCorrespondenceAddressdetails": null,
      "specAoSApplicantCorrespondenceAddressRequired": "Yes",
      "specAoSRespondent2HomeAddressDetails": null,
      "specAoSRespondent2HomeAddressRequired": null,
      "specAoSRespondentCorrespondenceAddressdetails": null,
      "specAoSRespondentCorrespondenceAddressRequired": "Yes",
      "specClaimResponseTimelineList": "MANUAL",
      "specDisputesOrPartAdmission": "Yes",
      "specFullAdmissionOrPartAdmission": null,
      "specFullDefenceOrPartAdmission": "Yes",
      "specFullDefenceOrPartAdmission1V1": "Yes",
      "specPaidLessAmountOrDisputesOrPartAdmission": "Yes",
      "specRespondent1DQDisclosureOfElectronicDocuments": {
        "agreementLikely": null,
        "reachedAgreement": "Yes",
        "reasonForNoAgreement": null
      },
      "specRespondent1DQDisclosureOfNonElectronicDocuments": null,
      "specResponseTimelineOfEvents": [],
      "uiStatementOfTruth": {
        "name": "SoT Name",
        "role": "Solicitor"
      }
    };

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT');

    await waitForFinishedBusinessProcess(caseId);
  },

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

  // TODO remove
  createClaimWithRespondentSolicitorFirmNotInMyHmcts: async (user) => {
    eventName = 'CREATE_CLAIM';
    caseId = null;
    caseData = {};
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    await validateEventPages(data.CREATE_CLAIM_RESPONDENT_SOLICITOR_FIRM_NOT_IN_MY_HMCTS);

    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Your claim has been received and will progress offline',
      body: 'Your claim will not be issued until payment is confirmed. Once payment is confirmed you will receive an email. The claim will then progress offline.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    //field is deleted in about to submit callback
    deleteCaseFields('applicantSolicitor1CheckEmail');
  },
  // TODO remove
  createClaimWithFailingPBAAccount: async (user) => {
    eventName = 'CREATE_CLAIM';
    caseId = null;
    caseData = {};
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName);
    await validateEventPages(data.CREATE_CLAIM_TERMINATED_PBA);
    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Your claim has been received',
      body: 'You have until DATE to notify the defendant of the claim and claim details.'
    });

    await assignCase();
    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PENDING_CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PENDING_CASE_ISSUED');
    // await assertCaseNotAvailableToUser(config.defendantSolicitorUser);
  },
  // TODO remove
  resubmitClaim: async (user) => {
    eventName = 'RESUBMIT_CLAIM';
    caseData = {};
    await apiRequest.setupTokens(user);
    await apiRequest.startEvent(eventName, caseId);
    await validateEventPages(data.RESUBMIT_CLAIM);
    await assertSubmittedEvent('PENDING_CASE_ISSUED', {
      header: 'Claim pending',
      body: 'Your claim will be processed. Wait for us to contact you.'
    });
    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PENDING_CASE_ISSUED');
    // await assertCaseNotAvailableToUser(config.defendantSolicitorUser);
  },
  // TODO remove
  amendClaimDocuments: async (user) => {
    // Temporary work around from CMC-1497 - statement of truth field is removed due to callback code in service repo.
    // Currently the mid event sets uiStatementOfTruth to null. When EXUI is involved this has the appearance of
    // resetting the field in the UI, most likely due to some caching mechanism, but the data is still available for the
    // about to submit. As these tests talk directly to the data store API the field is actually removed in the about
    // to submit callback. This gives the situation where uiStatementOfTruth is a defined field but with internal fields
    // set to null. In the about to submit callback this overwrites applicantSolicitor1ClaimStatementOfTruth with null
    // fields. When data is fetched here, the field does not exist.
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');

    await apiRequest.setupTokens(user);

    eventName = 'ADD_OR_AMEND_CLAIM_DOCUMENTS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    await validateEventPages(data[eventName]);

    const document = await testingSupport.uploadDocument();
    let errorData = await updateCaseDataWithPlaceholders(data[eventName], document);

    await assertError('Upload', errorData.invalid.Upload.duplicateError,
      'You need to either upload 1 Particulars of claim only or enter the Particulars of claim text in the field provided. You cannot do both.');

    await assertSubmittedEvent('CASE_ISSUED', {
      header: 'Documents uploaded successfully',
      body: ''
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'CASE_ISSUED');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'CASE_ISSUED');
    // await assertCaseNotAvailableToUser(config.defendantSolicitorUser);
  },
  // TODO remove
  notifyClaim: async (user, multipartyScenario) => {
    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM';
    mpScenario = multipartyScenario;

    await apiRequest.setupTokens(user);
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_CASE_DETAILS_NOTIFICATION', {
      header: 'Notification of claim sent',
      body: 'The defendant legal representative\'s organisation has been notified and granted access to this claim.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_CASE_DETAILS_NOTIFICATION');
  },
  // TODO remove
  notifyClaimDetails: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'NOTIFY_DEFENDANT_OF_CLAIM_DETAILS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'Defendant notified',
      body: 'The defendant legal representative\'s organisation has been notified of the claim details.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },
  // TODO remove
  amendPartyDetails: async (user) => {
    await apiRequest.setupTokens(user);

    eventName = 'AMEND_PARTY_DETAILS';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);

    await validateEventPages(data[eventName]);

    await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
      header: 'You have updated a legal representative\'s email address',
      body: ' '
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
  },
  // TODO remove
  acknowledgeClaim: async (user, multipartyScenario, solicitor) => {
    mpScenario = multipartyScenario;
    await apiRequest.setupTokens(user);

    eventName = 'ACKNOWLEDGE_CLAIM';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    solicitorSetup(solicitor);

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('systemGeneratedCaseDocuments');
    deleteCaseFields('solicitorReferences');
    deleteCaseFields('solicitorReferencesCopy');
    deleteCaseFields('respondentSolicitor2Reference');

    // solicitor 2 should not be able to see respondent 1 details
    if (solicitor === 'solicitorTwo') {
      deleteCaseFields('respondent1ClaimResponseIntentionType');
    }

    if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
      await validateEventPages(eventData['acknowledgeClaims'][mpScenario]);
    } else {
      await validateEventPages(eventData['acknowledgeClaims'][mpScenario][solicitor]);
    }

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
  // TODO remove
  informAgreedExtension: async (user, multipartyScenario, solicitor) => {
    mpScenario = multipartyScenario;
    await apiRequest.setupTokens(user);

    solicitorSetup(solicitor);

    eventName = 'INFORM_AGREED_EXTENSION_DATE';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;
    deleteCaseFields('systemGeneratedCaseDocuments');

    let informAgreedExtensionData;
    if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
      informAgreedExtensionData = eventData['informAgreedExtensionDates'][mpScenario];
    } else {
      informAgreedExtensionData = eventData['informAgreedExtensionDates'][mpScenario][solicitor];
    }

    await validateEventPages(informAgreedExtensionData, solicitor);

    await assertError('ExtensionDate', informAgreedExtensionData.invalid.ExtensionDate.past,
      'The agreed extension date must be a date in the future');
    await assertError('ExtensionDate', informAgreedExtensionData.invalid.ExtensionDate.beforeCurrentDeadline,
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
  // TODO remove
  defendantResponse: async (user, multipartyScenario, solicitor) => {
    await apiRequest.setupTokens(user);
    mpScenario = multipartyScenario;
    eventName = 'DEFENDANT_RESPONSE';

    // solicitor 2 should not see respondent 1 data but because respondent 1 has replied before this, we need
    // to clear a big chunk of defendant response (respondent 1) data hence its cleaner to have a clean slate
    // and start off from there.
    if (solicitor === 'solicitorTwo') {
      caseData = {};
    }

    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    solicitorSetup(solicitor);

    let defendantResponseData;
    if (mpScenario !== 'ONE_V_TWO_TWO_LEGAL_REP') {
      defendantResponseData = eventData['defendantResponses'][mpScenario];
    } else {
      defendantResponseData = eventData['defendantResponses'][mpScenario][solicitor];
    }

    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    deleteCaseFields('isRespondent1');
    deleteCaseFields('respondent1', 'solicitorReferences');
    deleteCaseFields('systemGeneratedCaseDocuments');
    //this is for 1v2 diff sol 1
    deleteCaseFields('respondentSolicitor2Reference');

    await validateEventPages(defendantResponseData, solicitor);

    await assertError('ConfirmDetails', defendantResponseData.invalid.ConfirmDetails.futureDateOfBirth,
      'The date entered cannot be in the future');
    await assertError('Experts', defendantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.past,
      'The date cannot be in the past and must not be more than a year in the future');
    await assertError('Hearing', defendantResponseData.invalid.Hearing.moreThanYear,
      'The date cannot be in the past and must not be more than a year in the future');

    // In a 1v2 different solicitor case, when the first solicitor responds, civil service would not change the state
    // to AWAITING_APPLICANT_INTENTION until the all solicitor response.
    if (solicitor === 'solicitorOne') {
      // when only one solicitor has responded in a 1v2 different solicitor case
      await assertSubmittedEvent('AWAITING_RESPONDENT_ACKNOWLEDGEMENT', {
        header: 'You have submitted the Defendant\'s defence',
        body: 'Once the other defendant\'s legal representative has submitted their defence, we will send the '
          + 'claimant\'s legal representative a notification.'
      });

      await waitForFinishedBusinessProcess(caseId);
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_RESPONDENT_ACKNOWLEDGEMENT');
    } else {
      // when all solicitors responded
      await assertSubmittedEvent('AWAITING_APPLICANT_INTENTION', {
        header: 'You have submitted the Defendant\'s defence',
        body: 'The Claimant legal representative will get a notification'
      });

      await waitForFinishedBusinessProcess(caseId);
      await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
      await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'AWAITING_APPLICANT_INTENTION');
      await assertCorrectEventsAreAvailableToUser(config.adminUser, 'AWAITING_APPLICANT_INTENTION');
    }

    deleteCaseFields('respondent1Copy');
    deleteCaseFields('respondent2Copy');
  },

  claimantResponseNoChecks: async (user) => {

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE_SPEC';
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);

    const claimantResponseData = {
      "applicant1AdditionalInformationForJudge": null,
      "applicant1DefenceResponseDocumentSpec": null,
      "applicant1DQDisclosureOfElectronicDocuments": {
        "agreementLikely": null,
        "reachedAgreement": "Yes",
        "reasonForNoAgreement": null
      },
      "applicant1DQDisclosureReport": null,
      "applicant1DQExperts": {
        "details": [],
        "expertReportsSent": null,
        "expertRequired": "No",
        "jointExpertSuitable": null
      },
      "applicant1DQFileDirectionsQuestionnaire": {
        "explainedToClient": [
          "CONFIRM"
        ],
        "oneMonthStayRequested": "No",
        "reactionProtocolCompliedWith": "Yes",
        "reactionProtocolNotCompliedWithReason": null
      },
      "applicant1DQFutureApplications": {
        "intentionToMakeFutureApplications": "No",
        "whatWillFutureApplicationsBeMadeFor": null
      },
      "applicant1DQHearingLRspec": {
        "hearingLength": "ONE_DAY",
        "hearingLengthDays": null,
        "hearingLengthHours": null,
        "unavailableDatesLRspec": [],
        "unavailableDatesRequired": "No"
      },
      "applicant1DQHearingSupport": null,
      "applicant1DQLanguage": {
        "court": "ENGLISH",
        "documents": "ENGLISH",
        "evidence": "ENGLISH"
      },
      "applicant1DQRequestedCourt": {
        "reasonForHearingAtSpecificCourt": null,
        "requestHearingAtSpecificCourt": "No",
        "responseCourtCode": null
      },
      "applicant1DQSmallClaimHearing": null,
      "applicant1DQWitnesses": {
        "details": [],
        "witnessesToAppear": "No"
      },
      "applicant1ProceedWithClaim": "Yes",
      "claimType": null,
      "defenceRouteRequired": "DISPUTES_THE_CLAIM",
      "respondent1": {
        "companyName": "company 2",
        "partyName": "company 2",
        "partyTypeDisplayValue": "Company",
        "primaryAddress": {
          "AddressLine1": "Markson 35",
          "PostCode": "SW1W 0NY"
        },
        "type": "COMPANY"
      },
      "respondent1ClaimResponseTypeForSpec": "FULL_DEFENCE",
      "respondent1GeneratedResponseDocument": null,
      "responseClaimTrack": "FAST_CLAIM",
      "specApplicant1DQDisclosureOfNonElectronicDocuments": null,
      "uiStatementOfTruth": {
        "name": "SoT Name",
        "role": "Solicitor"
      }
    };

    await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM');

    await waitForFinishedBusinessProcess(caseId);
  },

  // TODO remove
  claimantResponse: async (user, multipartyScenario) => {
    // workaround
    deleteCaseFields('applicantSolicitor1ClaimStatementOfTruth');
    deleteCaseFields('respondentResponseIsSame');

    await apiRequest.setupTokens(user);

    eventName = 'CLAIMANT_RESPONSE';
    mpScenario = multipartyScenario;
    let returnedCaseData = await apiRequest.startEvent(eventName, caseId);
    assertContainsPopulatedFields(returnedCaseData);
    caseData = returnedCaseData;

    const claimantResponseData = data.CLAIMANT_RESPONSE(mpScenario);

    await validateEventPages(claimantResponseData);

    await assertError('Experts', claimantResponseData.invalid.Experts.emptyDetails, 'Expert details required');
    await assertError('Hearing', claimantResponseData.invalid.Hearing.past,
      'The date cannot be in the past and must not be more than a year in the future');
    await assertError('Hearing', claimantResponseData.invalid.Hearing.moreThanYear,
      'The date cannot be in the past and must not be more than a year in the future');

    await assertSubmittedEvent('PROCEEDS_IN_HERITAGE_SYSTEM', {
      header: 'You have chosen to proceed with the claim',
      body: '>We will review the case and contact you to tell you what to do next.'
    });

    await waitForFinishedBusinessProcess(caseId);
    await assertCorrectEventsAreAvailableToUser(config.applicantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    await assertCorrectEventsAreAvailableToUser(config.defendantSolicitorUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
    await assertCorrectEventsAreAvailableToUser(config.adminUser, 'PROCEEDS_IN_HERITAGE_SYSTEM');
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
    isDifferentSolicitorForDefendantResponseOrExtensionDate() ? caseId : null
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

// TODO remove
function removeUiFields(pageId, caseData) {
  console.log(`Removing ui fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];

  if (midEventField.uiField.remove === true) {
    const fieldToRemove = midEventField.uiField.field;
    delete caseData[fieldToRemove];
  }
  return caseData;
}

// TODO remove
const assertError = async (pageId, eventData, expectedErrorMessage, responseBodyMessage = 'Unable to proceed because there are one or more callback Errors or Warnings') => {
  const response = await apiRequest.validatePage(
    eventName,
    pageId,
    {...caseData, ...eventData},
    isDifferentSolicitorForDefendantResponseOrExtensionDate ? caseId : null,
    422
  );

  const responseBody = await response.json();

  assert.equal(response.status, 422);
  assert.equal(responseBody.message, responseBodyMessage);
  if (responseBody.callbackErrors != null) {
    assert.equal(responseBody.callbackErrors[0], expectedErrorMessage);
  }
};

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
// TODO remove
const assertContainsPopulatedFields = returnedCaseData => {
  for (let populatedCaseField of Object.keys(caseData)) {
    assert.property(returnedCaseData, populatedCaseField);
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
  if (config.runningEnv == 'preview') {
    expect(caseForDisplay.triggers).to.deep.include.members(expectedEvents[user.type][state]);
  } else {
    expect(caseForDisplay.triggers).to.deep.equalInAnyOrder(expectedEvents[user.type][state]);
  }
};

// TODO remove
function addMidEventFields(pageId, responseBody) {
  console.log(`Adding mid event fields for pageId: ${pageId}`);
  const midEventField = midEventFieldForPage[pageId];
  let midEventData;

  if (eventName === 'CREATE_CLAIM' || eventName === 'CLAIMANT_RESPONSE') {
    midEventData = data[eventName](mpScenario).midEventData[pageId];
  } else {
    midEventData = data[eventName].midEventData[pageId];
  }

  if (midEventField.dynamicList === true) {
    assertDynamicListListItemsHaveExpectedLabels(responseBody, midEventField.id, midEventData);
  }

  caseData = {...caseData, ...midEventData};
  responseBody.data[midEventField.id] = caseData[midEventField.id];
}

// TODO remove
function assertDynamicListListItemsHaveExpectedLabels(responseBody, dynamicListFieldName, midEventData) {
  const actualDynamicElementLabels = removeUuidsFromDynamicList(responseBody.data, dynamicListFieldName);
  const expectedDynamicElementLabels = removeUuidsFromDynamicList(midEventData, dynamicListFieldName);

  expect(actualDynamicElementLabels).to.deep.equalInAnyOrder(expectedDynamicElementLabels);
}

// TODO remove
function removeUuidsFromDynamicList(data, dynamicListField) {
  const dynamicElements = data[dynamicListField].list_items;
  // eslint-disable-next-line no-unused-vars
  return dynamicElements.map(({code, ...item}) => item);
}

// TODO remove
async function updateCaseDataWithPlaceholders(data, document) {
  const placeholders = {
    TEST_DOCUMENT_URL: document.document_url,
    TEST_DOCUMENT_BINARY_URL: document.document_binary_url,
    TEST_DOCUMENT_FILENAME: document.document_filename
  };

  data = lodash.template(JSON.stringify(data))(placeholders);

  return JSON.parse(data);
}

// TODO remove
const assignCase = async () => {
  await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORONESPEC', config.defendantSolicitorUser);
  switch (mpScenario) {
    case 'ONE_V_TWO_TWO_LEGAL_REP': {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWOSPEC', config.secondDefendantSolicitorUser);
      break;
    }
    case 'ONE_V_TWO_ONE_LEGAL_REP': {
      await assignCaseRoleToUser(caseId, 'RESPONDENTSOLICITORTWOSPEC', config.defendantSolicitorUser);
      break;
    }
  }
};
// TODO remove
// solicitor 1 should not see details for respondent 2
// solicitor 2 should not see details for respondent 1
const solicitorSetup = (solicitor) => {
  if (solicitor === 'solicitorOne') {
    deleteCaseFields('respondent2');
  } else if (solicitor === 'solicitorTwo') {
    deleteCaseFields('respondent1');
  }
};
// TODO remove
const clearDataForExtensionDate = (responseBody, solicitor) => {
  delete responseBody.data['businessProcess'];
  delete responseBody.data['caseNotes'];
  delete responseBody.data['systemGeneratedCaseDocuments'];

  // solicitor cannot see data from respondent they do not represent
  if (solicitor === 'solicitorTwo') {
    delete responseBody.data['respondent1'];
  } else {
    delete responseBody.data['respondent2'];
  }
  return responseBody;
};
// TODO remove
const clearDataForDefendantResponse = (responseBody, solicitor) => {
  delete responseBody.data['businessProcess'];
  delete responseBody.data['caseNotes'];
  delete responseBody.data['systemGeneratedCaseDocuments'];
  delete responseBody.data['respondentSolicitor2Reference'];

  // solicitor cannot see data from respondent they do not represent
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
    delete responseBody.data['respondent1DQDraftDirections'];
    delete responseBody.data['respondent1DQRequestedCourt'];
    delete responseBody.data['respondent1DQFurtherInformation'];
  } else {
    delete responseBody.data['respondent2'];
  }
  return responseBody;
};
// TODO remove
const isDifferentSolicitorForDefendantResponseOrExtensionDate = () => {
  return mpScenario === 'ONE_V_TWO_TWO_LEGAL_REP' && (eventName === 'DEFENDANT_RESPONSE' || eventName === 'INFORM_AGREED_EXTENSION_DATE');
};
