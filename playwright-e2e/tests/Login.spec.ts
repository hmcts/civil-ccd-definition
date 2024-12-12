import { civilAdminUser } from '../config/users/exui-users';
import ccdEvents from '../fixtures/ccd-events/events';
import { test } from '../playwright-fixtures/index';

test(
  'Testing Login',
  { tag: '@debug' },
  async ({
    IdamSteps,
    ExuiDashboardSteps,
    ApiUserSteps,
    ApiDataSteps,
    _requestsFactory,
    _exuiDashboardPageFactory,
    _notifyClaimPageFactory,
    _standardDirectionOrderPageFactory,
  }) => {
    await ApiUserSteps.SetupUserData(civilAdminUser);
    // await ApiDataSteps.SetupBankHolidaysData();
    // await IdamSteps.ClaimantSolicitorLogin();
    await IdamSteps.JudgeRegion1Login();
    await ExuiDashboardSteps.GoToCaseList();

    const { ccdRequests } = _requestsFactory;
    const ccdCaseData = await ccdRequests.fetchCCDCaseData(civilAdminUser, 1732104739145327);

    const { caseDetailsPage } = _exuiDashboardPageFactory;
    await caseDetailsPage.goToCaseDetails(1732104739145327);
    await caseDetailsPage.goToUrl();

    const { drawDirectionsOrderPage } = _standardDirectionOrderPageFactory;
    await drawDirectionsOrderPage.verifyContent(ccdCaseData);
    await drawDirectionsOrderPage.enterNoSumOfDamages();
    // await drawDirectionsOrderPage.enterSumOfDamages();
    await drawDirectionsOrderPage.submit();

    const { claimsTrackPage } = _standardDirectionOrderPageFactory;
    await claimsTrackPage.verifyContent(ccdCaseData);
    await claimsTrackPage.enterSmallClaimsTrack();
    await claimsTrackPage.setAdditionalDirectionsSmallClaimsTrack();
    // await claimsTrackPage.setDisputeResolutionHearing();

    // await claimsTrackPage.enterFastTrack();
    // await claimsTrackPage.setAdditionalDirectionsFastTrack();
    // await claimsTrackPage.setNoiseInducedHearingLoss();
    await claimsTrackPage.submit();

    const { smallClaimsPage } = _standardDirectionOrderPageFactory;
    await smallClaimsPage.verifyContent(ccdCaseData);
    await smallClaimsPage.addJudgesRecital();
    await smallClaimsPage.addFlightDelay();
    await smallClaimsPage.addHearingTime();
    // await smallClaimsPage.removeHearingTime();
    await smallClaimsPage.addHearingMethod();
    await smallClaimsPage.addHearingNotes();
    await smallClaimsPage.addWelshLanguage();
    await smallClaimsPage.addImportantNotes();
    await smallClaimsPage.addDocuments();
    await smallClaimsPage.addWitnessStatement();
    await smallClaimsPage.restrictNumPages();
    await smallClaimsPage.restrictNumWitnesses();
    await smallClaimsPage.addCreditHire();
    await smallClaimsPage.addRoadTrafficAccident();
    await smallClaimsPage.addNewDirection();
    await smallClaimsPage.submit();

    // const { smallClaimsDisputeResolutionHearingPage } = _standardDirectionOrderPageFactory
    // await smallClaimsDisputeResolutionHearingPage.verifyContent(ccdCaseData);

    // const { fastTrackPage } = _standardDirectionOrderPageFactory;
    // await fastTrackPage.verifyContent(ccdCaseData);
    // await fastTrackPage.addAllocation();
    // await fastTrackPage.addJudgesRecital();
    // await fastTrackPage.addCreditHire();
    // await fastTrackPage.addAltDisputeResolution();

    // await caseDetailsPage.goToCaseDetails(1732120625619001);
    // await caseDetailsPage.verifyContent(ccdCaseData);
    // await caseDetailsPage.retryChooseNextStep(ccdEvents.NOTIFY_DEFENDANT_OF_CLAIM);

    // const { notifyClaimCOSDefendant1Page } = _notifyClaimPageFactory;
    // await notifyClaimCOSDefendant1Page.verifyContent(ccdCaseData);
    // await notifyClaimCOSDefendant1Page.fillDetails();
    // await notifyClaimCOSDefendant1Page.submit();

    // const { notifyClaimCOSDefendant2Page } = _notifyClaimPageFactory;
    // await notifyClaimCOSDefendant2Page.verifyContent(ccdCaseData);
    // await notifyClaimCOSDefendant2Page.fillDetails();
    // await notifyClaimCOSDefendant2Page.submit();

    // const { notifyClaimCOSSubmitPage } = _notifyClaimPageFactory;
    // await notifyClaimCOSSubmitPage.verifyContent(ccdCaseData);

    // await notifyClaimDetailsCOSSubmitPage.submit();
  },
);
