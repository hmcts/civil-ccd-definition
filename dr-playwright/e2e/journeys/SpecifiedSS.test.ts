import { test } from '@playwright/test';
import { envUrl } from '../../civilConfig.ts';
import { PageHelper } from '../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import { CreateSpecifiedCase } from '../flows/createSpecifiedCase.ts';
import { CreateCasePage } from '../page-objects/pages/createCase_page.ts';
import YesNo from '../../enums/yesNo.ts';
import claimTypes from '../../enums/claim-types.ts';
import Timeline from '../../enums/timeline.ts';
import { cleanEnv, enums } from '@opensourcesforge/envguard';
import yesNo from '../../enums/yesNo.ts';

const env = cleanEnv({
  CLAIM_TYPE: enums({
    values: [
      claimTypes.ONE_VS_ONE_LIP,
      claimTypes.TWO_VS_ONE_LIP,
      claimTypes.ONE_VS_TWO_LIPS,
      claimTypes.ONE_VS_TWO_LR_LIP,
      claimTypes.ONE_VS_TWO_LIP_LR,
      claimTypes.ONE_VS_ONE,
      claimTypes.TWO_VS_ONE,
      claimTypes.ONE_VS_TWO_SAME_SOL,
      claimTypes.ONE_VS_TWO_DIFF_SOL,
    ] as const,
    default: claimTypes.ONE_VS_ONE,
  }),
});

const claimType: claimTypes = env.CLAIM_TYPE;
const caseType: string = 'SPECIFIED';
const claimantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
  process.env.CLAIMANT_TYPE,
)
  ? process.env.CLAIMANT_TYPE
  : 'INDIVIDUAL';
const defendantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(
  process.env.DEFENDANT_TYPE,
)
  ? process.env.DEFENDANT_TYPE
  : 'INDIVIDUAL';
const airlineClaim: YesNo = ['Yes', 'No'].includes(process.env.AIRLINE_CLAIM)
  ? YesNo.YES
  : YesNo.NO;
const interestRequired: YesNo = ['Yes', 'No'].includes(process.env.INTEREST_REQUIRED)
  ? YesNo.YES
  : YesNo.NO;
const interestType = ['SAME_RATE_INTEREST', 'BREAK_DOWN_INTEREST'].includes(
  process.env.INTEREST_TYPE,
)
  ? process.env.INTEREST_TYPE
  : 'SAME_RATE_INTEREST';
const interestRate = process.env.INTEREST_RATE;
let track = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(
  process.env.TRACK,
)
  ? process.env.TRACK
  : 'FAST_CLAIM';
let caseId: string = '';
let pageHelper: PageHelper;
let buttonHelper: ButtonHelper;
let createCasePage: CreateCasePage;

test.beforeAll(async ({}) => {});

test.beforeEach(async ({ page }) => {
  pageHelper = new PageHelper(page);
  buttonHelper = new ButtonHelper(page);
  createCasePage = new CreateCasePage(page);
  await page.goto(envUrl);
});

test.describe.configure({ mode: 'serial' });
test.describe('test1', { tag: '@specified' }, () => {
  test.use({ storageState: './dr-playwright/e2e/.auth/ClaimantSolicitorUser.json' });
  test('Claimant Solicitor creates ' + claimType + ' claim ', async ({ page }) => {
    let createCase: CreateSpecifiedCase = new CreateSpecifiedCase(page);
    await createCasePage.createCase(caseType);
    await buttonHelper.continueButton.click(); //Summary
    await buttonHelper.continueButton.click(); //Further information
    await createCase.setReferences(claimType);
    await createCase.setClaimantType(claimantType, 1);

    switch (claimType) {
      case claimTypes.TWO_VS_ONE:
      case claimTypes.TWO_VS_ONE_LIP:
        await createCase.setAnotherClaimant(YesNo.YES, claimantType);
        await createCase.setClaimantType(claimantType, 2);
        break;
      default:
        await createCase.setAnotherClaimant(YesNo.NO, claimantType);
    }

    await createCase.setClaimantNotifications();

    // Need to set the org for legal rep of the claimant(s)
    await createCase.setSolicitorOrganisation('Civil - Organisation 1');

    await createCase.setClaimantLegalRepresentativePostalAddress();
    await createCase.setDefendantType(defendantType, 1);

    if (
      claimType == claimTypes.ONE_VS_ONE_LIP ||
      claimType == claimTypes.TWO_VS_ONE_LIP ||
      claimType == claimTypes.ONE_VS_TWO_LIP_LR ||
      claimType == claimTypes.ONE_VS_TWO_LIPS
    ) {
      console.log('Defendant 1: NOT represented');
      await createCase.setDefendantLegallyRepresented(YesNo.NO, 1);
    } else {
      console.log('Defendant 1: REPRESENTED');
      await createCase.setDefendantLegallyRepresented(YesNo.YES, 1);
      await createCase.setOrganisationRegisteredWithHMCTS(YesNo.YES, 1);
      await createCase.setSolicitorOrganisation('Civil - Organisation 2');
      await createCase.setDefendantLegalRepresentativeEmail(1);
      await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(YesNo.NO, 1);
    }

    if (claimType == claimTypes.TWO_VS_ONE_LIP || claimType == claimTypes.TWO_VS_ONE) {
      // ignore these claim types as they cannot have a second defendant
    } else if (claimType == claimTypes.ONE_VS_ONE || claimType == claimTypes.ONE_VS_ONE_LIP) {
      await createCase.setAnotherDefendant(YesNo.NO);
    } else {
      await createCase.setAnotherDefendant(YesNo.YES);
      await createCase.setDefendantType(defendantType, 2);

      switch (claimType) {
        case claimTypes.ONE_VS_TWO_LIP_LR:
          console.log('Defendant 2: REPRESENTED');
          await createCase.setDefendantLegallyRepresented(YesNo.YES, 2);
          await createCase.setOrganisationRegisteredWithHMCTS(YesNo.YES, 2);
          await createCase.setSolicitorOrganisation('Civil - Organisation 2');
          await createCase.setDefendantLegalRepresentativeEmail(2);
          await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(YesNo.NO, 2);
          break;
        case claimTypes.ONE_VS_TWO_SAME_SOL:
          console.log('Defendant 2: REPRESENTED - same sols');
          await createCase.setDefendantLegallyRepresented(YesNo.YES, 2);
          await createCase.setSameLegalRepresentative(YesNo.YES);
          break;
        case claimTypes.ONE_VS_TWO_DIFF_SOL:
          console.log('Defendant 2: REPRESENTED - diff sols');
          await createCase.setDefendantLegallyRepresented(YesNo.YES, 2);
          await createCase.setSameLegalRepresentative(YesNo.NO);
          await createCase.setOrganisationRegisteredWithHMCTS(YesNo.YES, 2);
          await createCase.setSolicitorOrganisation('Civil - Organisation 3');
          await createCase.setDefendantLegalRepresentativeEmail(2);
          break;
        default:
          console.log('Defendant 2: NOT represented');
          await createCase.setDefendantLegallyRepresented(YesNo.NO, 2);
      }
    }

    await createCase.setAirlineClaim(airlineClaim);
    await createCase.setDescriptionOfClaim();
    await createCase.setTimeline(Timeline.MANUAL);
    await createCase.setEvidence();
    await createCase.setClaimValue(track);
    await buttonHelper.continueButton.click(); // Amount claimed summary
    await createCase.setInterest(interestRequired);

    if (interestRequired === YesNo.YES) {
      await createCase.setInterestTypeAndRate(interestType, interestRate);
    }

    await buttonHelper.continueButton.click(); // Total Amount claimed summary
    await buttonHelper.continueButton.click(); // Claim fee maybe an assertion?

    await createCase.setFixedCosts(yesNo.NO);
    await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
    await buttonHelper.submitButton.click(); //CYA
    await buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success

    caseId = await pageHelper.grabCaseNumber();
    console.log('caseId>>>>>>>>>>>>>>>' + caseId + '<<<<<<<<<<<<<<<<<<<');
  });
});
