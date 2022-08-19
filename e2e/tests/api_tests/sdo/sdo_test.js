const config = require('../../../config.js');

Feature('CCD 1v1 API test @api-sdo');

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws disposal order', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser);
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor draws disposal order', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser);
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - judge declares SDO unsuitable', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'UNSUITABLE_FOR_SDO');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({I, api_sdo}) => {
  await api_sdo.unspecifiedProcess(config.applicantSolicitorUser, config.defendantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
  await api_sdo.createSDO(config.judgeUser, 'CREATE_DISPOSAL');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge draws disposal order', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser);
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - legal advisor draws disposal order', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.createSDO(config.legalAdvisorUser);
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge draws small claims WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - legal advisor draws small claims WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge draws fast track WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - legal advisor draws fast track WITH sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_SMALL_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - legal advisor draws small claims WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, '950');
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_SMALL_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.judgeUser, 'CREATE_FAST_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - legal advisor draws fast track WITHOUT sum of damages', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser, 950);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser, 950);
  await api_sdo.createSDO(config.legalAdvisorUser, 'CREATE_FAST_NO_SUM');
});

// eslint-disable-next-line no-unused-vars
Scenario('1v1 full defence specified - judge argues that case is not suitable for SDO', async ({I, api_sdo}) => {
  await api_sdo.createClaimWithRepresentedRespondentSPEC(config.applicantSolicitorUser);
  await api_sdo.defendantResponseSPEC(config.defendantSolicitorUser);
  await api_sdo.claimantResponseSPEC(config.applicantSolicitorUser);
  await api_sdo.createSDO(config.legalAdvisorUser, 'UNSUITABLE_FOR_SDO');
});

