/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const testingSupport = require('../../../api/testingSupport.js');

Feature('1v1 Unspec defaultJudgement @e2e-dj-1v1');

Scenario('DefaultJudgement @create-claim ', async ({I, api}) => {

  if (config.runWAApiTest) {
    const data = await api.retrieveTaskList(config.judgeUser, '1663776399721639');
    console.log('Task content ...', data['tasks'][0]);
  }
});

