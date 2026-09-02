

const config = require('../../../config.js');

Feature('Unspec 1v2lips api journey').tag('@civil-service-nightly @api-cos');

// Service-owned lifecycle behaviour is covered by civil-service workflow integration tests (DTSCCI-5193).
// These scenarios are retained but skipped so developers and QAs can re-enable them for local CCD wiring checks.
Scenario.skip('Create claim where one respondent is LIP one is LR and notify/notify details', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser,
                                                      'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');
  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser,
                                  'ONE_V_TWO_ONE_LEGAL_REP_ONE_LIP');
});

Scenario.skip('Create claim where two respondents are LIP and notify/notify details', async ({api}) => {
  await api.createClaimWithRespondentLitigantInPerson(config.applicantSolicitorUser,
                                                      'ONE_V_TWO_LIPS');
  await api.notifyClaimLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
  await api.notifyClaimDetailsLip(config.applicantSolicitorUser, 'ONE_V_TWO_LIPS');
});

AfterSuite(async  ({api}) => {
    await api.cleanUp();
});
