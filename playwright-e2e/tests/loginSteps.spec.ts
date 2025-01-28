import { civilAdminUser } from '../config/users/exui-users';
import { test } from '../playwright-fixtures/index';

test('Testing 1v1 Unspec small Claim ', {tag:""},async ({ IdamSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v1SmallClaimUnspec();
});

test('Testing 1v2 Same Solicitor Unspec small Claim ', {tag:""},async ({ IdamSteps, ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v2SSSmallClaimUnspec();
});

test('Testing 1v2 Different Solicitor Unspec small Claim ', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v2DSSmallClaimUnspec();
});

test('Testing 2v1 Unspec small Claim ', {tag:" "},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse2v1SmallClaimUnspec();
});

test('Testing 1v1 Unspec Fast Claim', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSteps.ClaimantResponse1v1FastTrackUnspec();
});

test('Testing 1v1 Spec Small Claim', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponseSpec1v1SmallTrack();
});

test('Testing 1v1 Spec Fast Track', {tag:"@debug"},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse1v1FastTrack();
});

test('Testing 1v2 Same Solicitor Small Claim', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse1v2SSSmallClaim();
});

test('Testing 1v2 Different Solicitor Small Claim', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponseSpec1v2DSSmallClaim();
});

test('Testing 2v1 Small Claim', {tag:""},async ({ IdamSteps,  ApiUserSteps, ApiDataSteps, _requestsFactory, _exuiDashboardPageFactory, ClaimantResponseSpecSteps }) => {

  await ApiUserSteps.SetupUserData(civilAdminUser);
  // await ApiDataSteps.SetupBankHolidaysData();
  await IdamSteps.ClaimantSolicitorLogin();
  await ClaimantResponseSpecSteps.ClaimantResponse2v1SmallClaim();
});
