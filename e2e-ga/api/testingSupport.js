const config = require('../config.js');
const idamHelper = require('./idamHelper');
const restHelper = require('./restHelper');
const {retry} = require('./retryHelper');
const totpGenerator = require('totp-generator');
const totp = typeof totpGenerator === 'function' ? totpGenerator : totpGenerator.default;

let incidentMessage;

const MAX_RETRIES = 30;
const RETRY_TIMEOUT_MS = 5000;

module.exports = {
  waitForFinishedBusinessProcess: async (caseId, user) => {
    const authToken = await idamHelper.accessToken(user);
    const s2sAuth = await restHelper.retriedRequest(
      `${config.url.authProviderApi}/lease`,
      {'Content-Type': 'application/json'},
      {
        microservice: config.s2s.microservice,
        oneTimePassword: totp(config.s2s.secret)
      })
      .then(response => response.text());

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/case/${caseId}/business-process`,
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
    if (incidentMessage)
      throw new Error(`Business process failed for case: ${caseId}, incident message: ${incidentMessage}`);
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
    const s2sAuth = await restHelper.retriedRequest(
      `${config.url.authProviderApi}/lease`,
      {'Content-Type': 'application/json'},
      {
        microservice: config.s2s.microservice,
        oneTimePassword: totp(config.s2s.secret)
      })
      .then(response => response.text());
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
    const s2sAuth = await restHelper.retriedRequest(
      `${config.url.authProviderApi}/lease`,
      {'Content-Type': 'application/json'},
      {
        microservice: config.s2s.microservice,
        oneTimePassword: totp(config.s2s.secret)
      }).then(response => response.text());
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

  assignCaseToDefendant: async (caseId, caseRole, user) => {
    const authToken = await idamHelper.accessToken(user);

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/assign-case/${caseId}/${caseRole}`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        {},
        'POST')
        .then(response => {
          if (response.status === 200) {
            console.log('Role assigned successfully');
          } else if (response.status === 409) {
            console.log('Role already exists!');
          } else {
            console.log('response..', response);
            throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  unAssignUserFromCases: async (caseIds, user) => {
    const authToken = await idamHelper.accessToken(user);

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/unassign-user`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        {
          caseIds
        },
        'POST')
        .then(response => {
          if (response.status === 200) {
            caseIds.forEach(caseId => console.log(`User unassigned from case [${caseId}] successfully`));
          } else {
            console.log(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  updateCaseData: async (caseId, caseData, user = config.applicantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);

    await restHelper.retriedRequest(
      `${config.url.civilService}/testing-support/case/${caseId}`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }, caseData, 'PUT');
  },

  uploadDocument: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
    let response = await restHelper.request(
      `${config.url.civilService}/testing-support/upload/test-document`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      {},
      'POST');

    return await response.json();
  },


  checkToggleEnabled: async (toggle) => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

    return await restHelper.request(
      `${config.url.civilService}/testing-support/feature-toggle/${toggle}`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }, null, 'GET')
      .then(async response => {
          if (response.status === 200) {
            const json = await response.json();
            return json.toggleEnabled;
          } else {
            throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
          }
        }
      );
  }


};
