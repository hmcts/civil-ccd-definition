Feature('QM Migration Scenarios - Case Creation @qmMigration @testGL');

Scenario('1v2 Two Representatives Case 1', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Raise a claimant query', api, qmSteps)).retry(2);
Scenario('1v2 Two Representatives Case 2', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 3', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 4', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 5', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 6', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Raise a defendant 1 query', api, qmSteps)).retry(2);
Scenario('1v2 Two Representatives Case 7', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Respond to defendant 1 query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 8', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Caseworker - Close defendant 1 query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('1v2 Two Representatives Case 9', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on defendant 1 query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('1v2 Two Representatives Case 10', async ({api, qmSteps}) => qmSteps.create1v2DiffQmScenario( '1v2 Two Representatives Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);

AfterSuite(async ({qmSteps}) => {
  qmSteps.outputScenarios();
});
