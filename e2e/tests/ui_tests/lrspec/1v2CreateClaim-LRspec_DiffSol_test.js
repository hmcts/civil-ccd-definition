const config = require('../../../config.js');
const {assignCaseRoleToUser,addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;

const respondent1 = {
  represented: true,
  representativeRegistered: true,
  representativeOrgNumber: 2
};
const respondent2 = {
  represented: true,
  sameLegalRepresentativeAsRespondent1: false,
  representativeOrgNumber: 3
};

let caseNumber;

Feature('Claim creation 1v2 Diff Solicitor with fast claims @e2e-tests-spec');

Scenario('Applicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec', async ({LRspec}) => {
  console.log('AApplicant solicitor creates 1v2 Diff LRs specified claim defendant Different LRs for fast claims @create-claim-spec');
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.createCaseSpecified('1v2 Different LRs fast claim','organisation', null, respondent1, respondent2, 15450);
  caseNumber = await LRspec.grabCaseNumber();
  addUserCaseMapping(caseId(), config.applicantSolicitorUser);
}).retry(3);

Scenario('1v2 Diff LRs Respond To Claim fast track - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await assignCaseRoleToUser(caseId(), 'RESPONDENTSOLICITORONESPEC', config.defendantSolicitorUser);
  await LRspec.login(config.defendantSolicitorUser);
  await LRspec.respondToClaimFullDefence({
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v2 Diff LRs Respond To Claim fast track - Defendants solicitor rejects claim for defendant', async ({LRspec}) => {
  await assignCaseRoleToUser(caseId(),  'RESPONDENTSOLICITORTWOSPEC', config.secondDefendantSolicitorUser);
  await LRspec.login(config.secondDefendantSolicitorUser);
  await LRspec.respond1v2DiffLR_FullDefence({
    secondDefendant: true,
    defendant1Response: 'fullDefence',
    claimType: 'fast',
    defenceType: 'dispute'
  });
  await LRspec.click('Sign out');
}).retry(3);

Scenario.skip('1v2 Diff LRs Claimant solicitor responds to defence fast track - claimant Intention to proceed', async ({LRspec}) => {
  await LRspec.login(config.applicantSolicitorUser);
  await LRspec.respondToDefence({mpScenario: 'ONE_V_ONE', claimType: 'fast'});
  await LRspec.click('Sign out');
}).retry(3);

