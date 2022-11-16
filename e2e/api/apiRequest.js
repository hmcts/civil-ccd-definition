const config = require('../config.js');

const idamHelper = require('./idamHelper');
const restHelper = require('./restHelper.js');
const {retry} = require('./retryHelper');
const totp = require('totp-generator');


const TASK_MAX_RETRIES = 40;
const TASK_RETRY_TIMEOUT_MS = 10000;

const tokens = {};
const getCcdDataStoreBaseUrl = () => `${config.url.ccdDataStore}/caseworkers/${tokens.userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}`;
const getCcdCaseUrl = (userId, caseId) => `${config.url.ccdDataStore}/aggregated/caseworkers/${userId}/jurisdictions/${config.definition.jurisdiction}/case-types/${config.definition.caseType}/cases/${caseId}`;
const getRequestHeaders = (userAuth) => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userAuth}`,
    'ServiceAuthorization': tokens.s2sAuth
  };
};

module.exports = {
  setupTokens: async (user) => {
    tokens.userAuth = await idamHelper.accessToken(user);
    tokens.userId = await idamHelper.userId(tokens.userAuth);
    tokens.s2sAuth = await restHelper.retriedRequest(
      `${config.url.authProviderApi}/lease`,
      {'Content-Type': 'application/json'},
      {
        microservice: config.s2s.microservice,
        oneTimePassword: totp(config.s2s.secret)
      })
      .then(response => response.text());
  },

  fetchCaseForDisplay: async(user, caseId, response = 200) => {
    let eventUserAuth = await idamHelper.accessToken(user);
    let eventUserId = await idamHelper.userId(eventUserAuth);
    let url = getCcdCaseUrl(eventUserId, caseId);

    return await restHelper.retriedRequest(url, getRequestHeaders(eventUserAuth), null, 'GET', response)
      .then(response => response.json());
  },

  startEvent: async (eventName, caseId) => {
    let url = getCcdDataStoreBaseUrl();
    if (caseId) {
      url += `/cases/${caseId}`;
    }
    url += `/event-triggers/${eventName}/token`;

    let response = await restHelper.retriedRequest(url, getRequestHeaders(tokens.userAuth), null, 'GET')
      .then(response => response.json());
    tokens.ccdEvent = response.token;
    return response.case_details.case_data || {};
  },

  validatePage: async (eventName, pageId, caseData, caseId, expectedStatus = 200) => {
    return restHelper.retriedRequest(`${getCcdDataStoreBaseUrl()}/validate?pageId=${eventName}${pageId}`, getRequestHeaders(tokens.userAuth),
      {
        case_reference: caseId,
        data: caseData,
        event: {id: eventName},
        event_data: caseData,
        event_token: tokens.ccdEvent
      }, 'POST', expectedStatus);
  },

  submitEvent: async (eventName, caseData, caseId) => {
    let url = `${getCcdDataStoreBaseUrl()}/cases`;
    if (caseId) {
      url += `/${caseId}/events`;
    }

    return restHelper.retriedRequest(url, getRequestHeaders(tokens.userAuth),
      {
        data: caseData,
        event: {id: eventName},
        event_data: caseData,
        event_token: tokens.ccdEvent
      }, 'POST', 201);
  },

  fetchTaskDetails: async (user, caseNumber, taskId, expectedStatus = 200) => {
    const userToken =  await idamHelper.accessToken(user);
    const s2sToken = await restHelper.retriedRequest(
      `${config.url.authProviderApi}/lease`,
      {'Content-Type': 'application/json'},
      {
        microservice: config.s2sForXUI.microservice,
        oneTimePassword: totp(config.s2sForXUI.secret)
      })
      .then(response => response.text());

    const inputData = {
      'search_parameters': [
          {'key': 'jurisdiction','operator': 'IN','values': ['CIVIL']},
          {'key': 'caseId','operator': 'IN','values': [caseNumber]},
          {'key': 'taskType','operator': 'IN','values': [taskId]},
          {'key':'state','operator':'IN','values':['assigned','unassigned', 'unconfigured']}
      ],
      'sorting_parameters': [{'sort_by': 'dueDate','sort_order': 'asc'}]
    };

    return retry(() => {
      return restHelper.request(`${config.url.waTaskMgmtApi}/task`, 
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        'ServiceAuthorization': `Bearer ${s2sToken}`
      }, inputData, 'POST', expectedStatus)
        .then(async response => await response.json())
        .then(jsonResponse => {
          let availableTaskDetails = jsonResponse['tasks'][0];
          if (!availableTaskDetails) {
            throw new Error(`Ongoing task retrieval process for case id: ${caseNumber}`);
          }
          return availableTaskDetails;
      });
    }, TASK_MAX_RETRIES, TASK_RETRY_TIMEOUT_MS);
  }

};
