const config = require('../../../config.js');
const {unAssignAllUsers} = require('../../../api/caseRoleAssignmentHelper');
const RequestRefundSteps = require('./steps/requestRefundSteps');
const apiRequest = require('../../../api/apiRequest');

Feature('Request and Processing of refunds @non-prod-e2e-ft');

Scenario('Request and Approval of a Refund after a return to Requestor by the Approval Caseworker',
  async ({I, api}) => {
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
    let caseId = await api.getCaseId();
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    await api.notifyClaim(config.applicantSolicitorUser);
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    await apiRequest.createAPBAPayment(config.applicantSolicitorUser, caseId, 550, 'FEE0209', 3, 1);
    await apiRequest.rollbackPaymentDate(config.applicantSolicitorUser, caseId);
    await I.navigateToServiceRequest(config.applicantSolicitorUser, caseId);
    RequestRefundSteps.performRefunds();
    await I.navigateToRefundsList(config.defendantSolicitorUser);
    RequestRefundSteps.returnRefunds();
    await I.navigateToRefundsList(config.applicantSolicitorUser);
    RequestRefundSteps.reviewRefunds();
    await I.navigateToRefundsList(config.defendantSolicitorUser);
    RequestRefundSteps.approveRefund();
});

Scenario('Request and Rejection of a Refund after a return to Requestor by the Approval Caseworker',
  async ({I, api}) => {
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
    let caseId = await api.getCaseId();
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    await api.notifyClaim(config.applicantSolicitorUser);
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    await apiRequest.createAPBAPayment(config.applicantSolicitorUser, caseId, 550, 'FEE0209', 3, 1);
    await apiRequest.rollbackPaymentDate(config.applicantSolicitorUser, caseId);
    await I.navigateToServiceRequest(config.applicantSolicitorUser, caseId);
    RequestRefundSteps.performRefunds();
    await I.navigateToRefundsList(config.defendantSolicitorUser);
    RequestRefundSteps.returnRefunds();
    await I.navigateToRefundsList(config.applicantSolicitorUser);
    RequestRefundSteps.reviewRefunds();
    await I.navigateToRefundsList(config.defendantSolicitorUser);
    RequestRefundSteps.rejectRefund();
});


AfterSuite(async ({api}) => {
  await api.cleanUp();
  await unAssignAllUsers();
});
