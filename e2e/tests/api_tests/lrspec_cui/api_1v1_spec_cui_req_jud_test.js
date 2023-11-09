/* eslint-disable no-unused-vars */

const config = require('../../../config.js');

Feature('CCD 1v1 API test unique @api-spec-cui');

Scenario('1v1 full admit claimant and defendant response', async ({I, api_spec_cui}) => {
  await api_spec_cui.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_cui.defendantResponse(config.defendantSolicitorUser, 'REQUEST_JUDGEMENT');
  await api_spec_cui.amendRespondent1ResponseDate(config.systemupdate);
  await api_spec_cui.requestJudgement(config.applicantSolicitorUser, 'REQUEST_JUDGEMENT', 'ONE_V_ONE');
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
});

