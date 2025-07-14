Feature('QM Migration Scenarios - Case Creation @qmMigration @testGL');

Scenario('2v1 Case 1', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Claimant - Raise a claimant query', api, qmSteps)).retry(2);
Scenario('2v1 Case 2', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Caseworker - Respond to a claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('2v1 Case 3', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Caseworker - Close claimant query', api, qmSteps, 'app1', 'createQuery')).retry(2);
Scenario('2v1 Case 4', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Claimant - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);
Scenario('2v1 Case 5', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Claimant - Follow up on defendant query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('2v1 Case 6', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Defendant 1 - Raise a defendant query', api, qmSteps)).retry(2);
Scenario('2v1 Case 7', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Caseworker - Respond to defendant query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('2v1 Case 8', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Caseworker - Close defendant query', api, qmSteps, 'res1', 'createQuery')).retry(2);
Scenario('2v1 Case 9', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Defendant 1 - Follow up on defendant query response', api, qmSteps, 'res1', 'respond')).retry(2);
Scenario('2v1 Case 10', async ({api, qmSteps}) => qmSteps.create2v1QmScenario('2v1 Case - Defendant 1 - Follow up on claimant query response', api, qmSteps, 'app1', 'respond')).retry(2);

AfterSuite(async ({qmSteps}) => {
  qmSteps.outputScenarios();
});
