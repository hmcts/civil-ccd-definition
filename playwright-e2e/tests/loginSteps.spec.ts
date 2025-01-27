import { civilAdminUser } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';
import ClaimantResponseSpecSteps
  from "../steps/ui/exui/solicitor-events/claimant-response/claimant-response-spec-steps.ts";

// test('Testing 1v1small Claim ', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory,_claimantResponsePageFactory }) => {
//   await ApiUserSteps.SetupUserData(civilAdminUser);
//   // await ApiDataSteps.SetupBankHolidaysData();
//   await IdamSteps.ClaimantSolicitorLogin();
//   await ExuiDashboardSteps.GoToCaseList();
//
//   const { ccdRequests } = _requestsFactory;
//   const ccdCaseData = await ccdRequests.fetchCCDCaseData( civilAdminUser, 1735901845727550);
//
//   const { caseDetailsPage } = _exuiDashboardPageFactory;
//   await caseDetailsPage.goToCaseDetails( 1735901845727550);
//   await caseDetailsPage.verifyContent(ccdCaseData);
//   await caseDetailsPage.retryChooseNextStep(ccdEvents.CLAIMANT_RESPONSE_SPEC);
// });

test('Testing 1v1 Unspec small Claim ', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v1SmallClaimUnspec();
});

test('Testing 1v2 Same Solicitor Unspec small Claim ', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v2SSSmallClaimUnspec();
});

test('Testing 1v2 Different Solicitor Unspec small Claim ', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v2DSSmallClaimUnspec();
});

test('Testing 2v1 Unspec small Claim ', {tag:"@debug"},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse2v1SmallClaimUnspec();
});

test('Testing 1v1 Unspec Fast Claim', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v1FastTrackUnspec();
});

test('Testing 1v1 Spec Small Claim', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponseSpec1v1SmallTrack();
});

test('Testing 1v1 Spec Fast Track', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse1v1FastTrack();
});

test('Testing 1v2 Same Solicitor Small Claim', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse1v2SSSmallTrack();
});

test('Testing 1v2 Different Solicitor Small Claim', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponseSpec1v2DSSmallTrack();
});

test('Testing 2v1 Small Claim', {tag:""},async ({ IdamSteps, ExuiDashboardSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse2v1SmallTrack();
});
