Feature('QM Migration Scenarios - Case Creation @qmMigration @testGL');

Scenario('1v2 One Representative Case 1', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Claimant - Raise a claimant query', api, qmSteps)).retry(2);
Scenario('1v2 One Representative Case 2', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Caseworker - Respond to claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('1v2 One Representative Case 3', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('1v2 One Representative Case 4', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);
Scenario('1v2 One Representative Case 5', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('1v2 One Representative Case 6', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Defendant 1 - Raise a defendant query', api, qmSteps)).retry(2);
Scenario('1v2 One Representative Case 7', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Caseworker - Respond to a defendant query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('1v2 One Representative Case 8', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Caseworker - Close defendant query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('1v2 One Representative Case 9', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Defendant 1 - Follow up on defendant query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('1v2 One Representative Case 10', async ({ api, qmSteps }) => qmSteps.create1v2DiffQmScenario('1v2 One Representative Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);

AfterSuite(async ({qmSteps}) => {
  qmSteps.outputScenarios();
});
