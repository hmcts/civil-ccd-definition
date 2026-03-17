import { expect, test } from '@playwright/test';
import { envUrl } from '../../civilConfig.ts';
import { PageHelper } from '../../helpers/PageHelper.ts';
import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import { CreateUnspecifiedCase } from '../flows/createUnspecifiedCase.ts';
import { CreateCasePage } from '../page-objects/pages/createCase_page.ts';
import YesNo from '../../enums/yesNo.ts';
import ClaimType from '../../enums/claim-type.ts';
import unspecClaimTypes from '../../enums/unspecClaimTypes.ts';
import personalInjuryTypes from '../../enums/personalInjuryTypes.ts';
import claimTrack from '../../enums/claim-track.ts';
import yesNo from '../../enums/yesNo.ts';

const claimType: string = ['1v1', '2v1'].includes(process.env.CLAIM_TYPE) ? process.env.CLAIM_TYPE : '1v1';
const caseType: string = ['UNSPECIFIED', 'SPECIFIED'].includes(process.env.CASE_TYPE)
  ? process.env.CASE_TYPE
  : 'UNSPECIFIED';
const claimantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(process.env.CLAIMANT_TYPE) ? process.env.CLAIMANT_TYPE : 'INDIVIDUAL';
const defendantType: string = ['INDIVIDUAL', 'COMPANY', 'ORGANISATION', 'SOLE_TRADER'].includes(process.env.DEFENDANT_TYPE) ? process.env.DEFENDANT_TYPE : 'INDIVIDUAL';
const typeOfClaim = process.env.TYPE_OF_CLAIM;
const typeOfClaimSubType: string = process.env.SUB_TYPE;
const litigantFriend: YesNo = ['Yes'].includes(process.env.LITIGANT_FRIEND) ? YesNo.YES : YesNo.NO;

let track = ['SMALL_CLAIM', 'FAST_CLAIM', 'INTERMEDIATE_CLAIM', 'MULTI_CLAIM'].includes(process.env.TRACK) ? process.env.TRACK : 'FAST_CLAIM';
let caseId: string = '';
let pageHelper: PageHelper;
let buttonHelper: ButtonHelper;
let createCasePage: CreateCasePage;

test.beforeAll(async ({  }) => {
  // if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS) {
  //    expect(track, `Invalid claim track: ${track} used for type: ${typeOfClaim} and sub type: ${typeOfClaimSubType} combination. Either do not specify a track or set the track to FAST_CLAIM.` ).toEqual(claimTrack.FAST_CLAIM);
  // }
});

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
    let createCase: CreateUnspecifiedCase = new CreateUnspecifiedCase(page);
    await createCasePage.createCase(caseType);
    await buttonHelper.continueButton.click(); //Summary
    await createCase.setReferences(claimType);
    await createCase.setCourt();
    await createCase.setClaimantType(claimantType, 1);
    await createCase.setClaimantLitigantFriend(litigantFriend, 1);
    await createCase.setClaimantNotifications();
    await buttonHelper.continueButton.click(); //ClaimantSolicitorOrganisation
    await createCase.setClaimantServiceAddress();

    switch (claimType) {
      case ClaimType.ONE_VS_ONE:
        await createCase.setAnotherClaimant(YesNo.NO, claimantType);
        break;
      case ClaimType.TWO_VS_ONE:
        await createCase.setAnotherClaimant(YesNo.YES, claimantType);
        await createCase.setClaimantType(claimantType, 2);
        await createCase.setClaimantLitigantFriend(litigantFriend, 2);
        break;
      }

    await createCase.setDefendantType(defendantType);
    await createCase.setDefendantLegallyRepresented();
    await createCase.setDefendantSolicitorOrganisation('Civil - Organisation 2');
    await createCase.setDefendantServiceAddress();
    await createCase.setDefendantLegalRepresentativeAddress();
    await createCase.setDefendantLegalRepresentativeEmail();

    if (claimType !== ClaimType.ONE_VS_ONE && claimType !== ClaimType.TWO_VS_ONE && claimType !== ClaimType.ONE_VS_ONE_LIP) {
      await createCase.setAnotherDefendant(yesNo.YES);

    }

    if (claimType == ClaimType.ONE_VS_TWO_DIFF_SOL)
    // if 1v2 then Yes - to code

    await createCase.setClaimType(typeOfClaim); // use from parameters in package

    if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY) {
      await createCase.setSubClaimType(typeOfClaimSubType); // use from parameters in package
    }

    await createCase.setDescriptionOfClaim();
    await createCase.setUploadParticularsOfClaim();

    if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS) {
      track = claimTrack.FAST_CLAIM;
    }
    await createCase.setClaimValue(track); // use from parameters in package - if claimType ie fast etc AND type ie unspec/spec used we can work out a value to use

    await buttonHelper.continueButton.click(); //Amount to pay - can do an assertion on amount by api to fee and pay to make sure fee is correct, if needed.
    await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
    await buttonHelper.submitButton.click(); //CYA
    await buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success

    caseId = await pageHelper.grabCaseNumber();
    console.log('caseId>>>>>>>>>>>>>>>' + caseId + '<<<<<<<<<<<<<<<<<<<');
  });
});
