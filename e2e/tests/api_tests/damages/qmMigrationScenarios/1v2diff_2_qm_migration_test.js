Feature('QM Migration Scenarios - Case Creation @qmMigration @testGL');

Scenario('1v2 Two Representatives Case 11', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on defendant 2 query response', api, qmSteps, 'res2', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 12', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Raise a defendant 2 query', api, qmSteps)).retry(2);
Scenario('1v2 Two Representatives Case 13', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to defendant 2 query', api, qmSteps, 'res2', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 14', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close defendant 2 query', api, qmSteps, 'res2', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 15', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on defendant 2 query response', api, qmSteps, 'res2', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 16', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 17', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 2 - Follow up on defendant 1 query response', api, qmSteps, 'res1', 'respond')).retry(2);

AfterSuite(async ({qmSteps}) => {
  qmSteps.outputScenarios();
});
