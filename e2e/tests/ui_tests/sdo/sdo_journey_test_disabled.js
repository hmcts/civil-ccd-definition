const config = require('../../../config.js');

Feature('1v1 - Claim Journey and initiate SDO @e2e-sdo');

Scenario('Applicant solicitor creates claim @create-claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await I.login(config.applicantSolicitorUser);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO('yes', 'yes', null, null);
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as disposal', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'disposal');
}).retry(3);

Scenario('Judge initiate SDO with sum of damages and not allocate small claims track and orderType as decideDamages', async ({I}) => {
  await I.initiateSDO('yes', null, null, 'decideDamages');
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate small claims track', async ({I}) => {
  await I.initiateSDO(null, null, 'smallClaims', null);
}).retry(3);

Scenario('Judge initiate SDO without entering damages and allocate fast track', async ({I}) => {
  await I.initiateSDO(null, null, 'fastTrack', null);
}).retry(3);
