const config = require('../config.js');
const idamHelper = require('./idamHelper');
const serviceAuthHelper = require('./serviceAuthorisationHelper');
const restHelper = require('./restHelper');
const {retry} = require('./retryHelper');


let incidentMessage;

// Optimized retry configuration for Camunda business process waits
const MAX_RETRIES = 40;
const INITIAL_RETRY_TIMEOUT_MS = 2000; // Reduced from 5000 (check more frequently initially)
const MAX_RETRY_TIMEOUT_MS = 10000; // Cap exponential backoff at 10 seconds
const RETRY_TIMEOUT_MS = 5000;

const checkFlagEnabled = async (flag) => {
  const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
  const s2sAuth = await serviceAuthHelper.civilServiceAuth();

  return await restHelper.request(
    `${config.url.civilService}/testing-support/feature-toggle/${flag}`,
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
      'ServiceAuthorization': s2sAuth
    }, null, 'GET')
    .then(async response =>  {
        if (response.status === 200) {
          const json = await response.json();
          return json.toggleEnabled;
        } else {
          throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
        }
      }
    );
};


module.exports =  {
  waitForFinishedBusinessProcess: async caseId => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    let retryTimeout = INITIAL_RETRY_TIMEOUT_MS;
    let attempts = 0;
    let currentIncidentMessage = null;

    while (attempts < MAX_RETRIES) {
      let businessProcess;
      try {
        const response = await restHelper.request(
          `${config.url.civilService}/testing-support/case/${caseId}/business-process`,
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'ServiceAuthorization': s2sAuth
          }, null, 'GET');

        const responseData = await response.json();
        businessProcess = responseData.businessProcess;

        if (responseData.incidentMessage) {
          currentIncidentMessage = responseData.incidentMessage;
          break; // Exit loop if incident detected
        } else if (businessProcess && businessProcess.status === 'FINISHED') {
          // Success - process finished
          if (currentIncidentMessage) {
            throw new Error(`Business process failed for case: ${caseId}, incident message: ${currentIncidentMessage}`);
          }
          return; // Success
        } else if (businessProcess) {
          // Process not finished yet, will retry
          throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
            + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`);
        } else {
          throw new Error(`Invalid response: businessProcess not found for case: ${caseId}`);
        }
      } catch (error) {
        attempts++;
        if (attempts >= MAX_RETRIES) {
          // Final attempt failed
          if (currentIncidentMessage) {
            throw new Error(`Business process failed for case: ${caseId}, incident message: ${currentIncidentMessage}`);
          }
          throw error;
        }
        // Exponential backoff: increase timeout, but cap at MAX_RETRY_TIMEOUT_MS
        console.log(`Business process: ${businessProcess.camundaEvent}, not finished for case ${caseId}, retrying in ${retryTimeout / 1000} seconds (Attempt ${attempts}/${MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, retryTimeout));
        retryTimeout = Math.min(retryTimeout * 1.5, MAX_RETRY_TIMEOUT_MS);
      }
    }

    // If we exit the loop without returning, something went wrong
    if (currentIncidentMessage) {
      throw new Error(`Business process failed for case: ${caseId}, incident message: ${currentIncidentMessage}`);
    }
    throw new Error(`Business process did not finish for case: ${caseId} within ${MAX_RETRIES} attempts`);
  },
  waitForCompletedCamundaProcess: async (definitionKey, processInstanceId, variables) => {
    const authToken = await idamHelper.accessToken(config.systemUpdate2);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    await retry(() => {
      const params = {definitionKey, processInstanceId, variables};
      const url = new URL(`${config.url.civilService}/testing-support/camunda-processes`);
      Object.keys(params).forEach(key => {
        if (params[key]) {
          url.searchParams.append(key, params[key]);
        }
      });
      return restHelper.request(
        url.toString(),
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        }, null, 'GET')
        .then(async response => await response.json()).then(response => {
          // console.log(JSON.stringify(response));
          if (response && response.length > 0 && response[0].state === 'COMPLETED') {
            console.log(`${response[0].processDefinitionKey} process has completed!!`);
          } else {
            throw new Error('Waiting for camunda process to complete');
          }
        });
    }, 10, INITIAL_RETRY_TIMEOUT_MS);
  },

  assignCaseToDefendant: async (caseId, caseRole = 'RESPONDENTSOLICITORONE', user = config.defendantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/assign-case/${caseId}/${caseRole}`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        },
        {},
        'POST')
        .then(response => {
          if (response.status === 200) {
            console.log( 'Role created successfully');
          } else if (response.status === 409) {
            console.log('Role already exists!');
          } else  {
            console.log('response..', response);
            throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  assignCaseToLRSpecDefendant: async (caseId, caseRole = 'RESPONDENTSOLICITORONE', user = config.defendantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/assign-case/${caseId}/${caseRole}`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        },
        {},
        'POST')
        .then(response => {
          if (response.status === 200) {
            console.log('Role created successfully');
          } else if (response.status === 409) {
            console.log('Role already exists!');
          } else {
            throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  unAssignUserFromCases: async (caseIds, user) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/unassign-user`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        },
        {
          caseIds
        },
        'POST')
        .then(response => {
          if (response.status === 200) {
            caseIds.forEach(caseId => console.log( `User unassigned from case [${caseId}] successfully`));
          }
          else  {
            console.log(`Error occurred with status : ${response.status}`);
            //throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  updateCaseData: async (caseId, caseData, user = config.applicantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    await restHelper.retriedRequest(
      `${config.url.civilService}/testing-support/case/${caseId}`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': s2sAuth
      }, caseData, 'PUT');
  },

  uploadDocument: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    let response = await restHelper.request(
      `${config.url.civilService}/testing-support/upload/test-document`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': s2sAuth
      },
      {},
      'POST');

    return await response.json();
  },
  triggerCamundaProcess: async (processName, variables = {}) => {
    const authToken = await idamHelper.accessToken(config.systemUpdate2);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();

    let response = await restHelper.request(
      `${config.url.civilService}/testing-support/trigger-camunda-process`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'ServiceAuthorization': s2sAuth
      },
      {
        name: processName,
        variables
      },
      'POST');

    return await response.json();
  },

  /**
   * This request call is the extract the GA from Civil Service and
   * waits for General Application Camunda tasks to finish
   *
   * @param caseId - Civil Case Reference
   * @param user
   */
  waitForGAFinishedBusinessProcess: async (caseId, user) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();
    incidentMessage = null;
    console.log('** Start waitForGAFinishedBusinessProcess to wait for GA Camunda Tasks to Start and Finish **');

    await retry(() => {
      return restHelper.request(
        `${config.url.generalApplication}/testing-support/case/${caseId}/business-process/ga`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        }, null, 'GET')
        .then(async response => await response.json()).then(response => {
          let businessProcess = response.businessProcess;
          if (response.incidentMessage) {
            incidentMessage = response.incidentMessage;
          } else if (businessProcess && businessProcess.status !== 'FINISHED') {
            throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
              + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`);
          }
        });
    }, MAX_RETRIES, RETRY_TIMEOUT_MS);
    console.log('** End of waitForGAFinishedBusinessProcess **');

    if (incidentMessage)
      throw new Error(`Business process failed for case: ${caseId}, incident message: ${incidentMessage}`);
  },

  /**
   * Waits for General Application Camunda tasks to finish
   *
   * @param caseId - GA Case Reference
   * @param ccdState
   * @param user
   */
  waitForGACamundaEventsFinishedBusinessProcess: async (caseId, ccdState, user) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await serviceAuthHelper.civilServiceAuth();
    incidentMessage = null;
    console.log('** Start waitForGACamundaEventsFinishedBusinessProcess to wait for GA Camunda Tasks to Start and Finish **');

    await retry(() => {
      return restHelper.request(
        `${config.url.generalApplication}/testing-support/case/${caseId}/business-process`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'ServiceAuthorization': s2sAuth
        }, null, 'GET')
        .then(async response => await response.json()).then(response => {
          let businessProcess = response.businessProcess;
          if (response.incidentMessage) {
            incidentMessage = response.incidentMessage;
          } else if (businessProcess && businessProcess.status !== 'FINISHED' && response.ccdState !== ccdState) {
            throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
              + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`);
          } else if (businessProcess && businessProcess.status !== 'FINISHED') {
            throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
                            + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`);
          } else if (businessProcess && businessProcess.status === 'FINISHED' && response.ccdState !== ccdState) {
            throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
              + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId},`
              + ` Present Case state: ${response.ccdState}, Expected State: ${ccdState}`);
          }
        });
    }, MAX_RETRIES, RETRY_TIMEOUT_MS);
    console.log('** End of waitForGACamundaEventsFinishedBusinessProcess **');

    if (incidentMessage)
      throw new Error(`Business process failed for case: ${caseId}, incident message: ${incidentMessage}`);
  },

  checkToggleEnabled: async (toggle) => checkFlagEnabled(toggle),
};
