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

const claimType: string = ['1v1LIP', '2v1LIP', '1v2LIPS', '1v2LRLIP', '1v2LIPLR', '1v1', '2v1', '1v2SS', '1v2DS'].includes(process.env.CLAIM_TYPE) ? process.env.CLAIM_TYPE : '1v1';
const caseType: string = 'UNSPECIFIED';
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
  if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS) {
     expect(track, `Invalid claim track: ${track} used for type: ${typeOfClaim} and sub type: ${typeOfClaimSubType} combination. Either do not specify a track or set the track to FAST_CLAIM.` ).toEqual(claimTrack.FAST_CLAIM);
  }
});

test.beforeEach(async ({ page }) => {
  pageHelper = new PageHelper(page);
  buttonHelper = new ButtonHelper(page);
  createCasePage = new CreateCasePage(page);
  await page.goto(envUrl);
});

test.describe.configure({ mode: 'serial' });
test.describe('test1', { tag: '@unspecified' }, () => {
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
      case ClaimType.TWO_VS_ONE:
      case ClaimType.TWO_VS_ONE_LIP:
        await createCase.setAnotherClaimant(YesNo.YES, claimantType);
        await createCase.setClaimantType(claimantType, 2);
        await createCase.setClaimantLitigantFriend(litigantFriend, 2);
        break;
      default:
        await createCase.setAnotherClaimant(YesNo.NO, claimantType);
    }

    await createCase.setDefendantType(defendantType, 1);

    if (claimType == ClaimType.ONE_VS_ONE_LIP || claimType == ClaimType.TWO_VS_ONE_LIP || claimType == ClaimType.ONE_VS_TWO_LIP_LR || claimType == ClaimType.ONE_VS_TWO_LIPS) {
      console.log('Defendant 1: NOT represented');
      await createCase.setDefendantLegallyRepresented(yesNo.NO, 1)
    } else {
      console.log('Defendant 1: REPRESENTED');
      await createCase.setDefendantLegallyRepresented(yesNo.YES, 1);
      await createCase.setSolicitorOrganisation('Civil - Organisation 2');
      await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO, 1);
      await createCase.setDefendantLegalRepresentativeEmail();
    }

    if (claimType == ClaimType.TWO_VS_ONE_LIP || claimType == ClaimType.TWO_VS_ONE) {
      // ignore these claim types as they cannot have a second defendant
    } else if (claimType == ClaimType.ONE_VS_ONE || claimType == ClaimType.ONE_VS_ONE_LIP) {
      await createCase.setAnotherDefendant(yesNo.NO);
    } else {
      await createCase.setAnotherDefendant(yesNo.YES);
      await createCase.setDefendantType(defendantType, 2);

      switch (claimType) {
        case ClaimType.ONE_VS_TWO_LIP_LR:
          console.log('Defendant 2: REPRESENTED');
          await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
          await createCase.setSolicitorOrganisation('Civil - Organisation 2');
          await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO,2);
          await createCase.setDefendant2LegalRepresentativeReference();
          await createCase.setDefendantLegalRepresentativeEmail(2);
          break;
        case ClaimType.ONE_VS_TWO_SAME_SOL:
          console.log('Defendant 2: REPRESENTED - same sols');
          await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
          await createCase.setSameLegalRepresentative(yesNo.YES);
          break;
        case ClaimType.ONE_VS_TWO_DIFF_SOL:
          console.log('Defendant 2: REPRESENTED - diff sols');
          await createCase.setDefendantLegallyRepresented(yesNo.YES, 2);
          await createCase.setSameLegalRepresentative(yesNo.NO);
          await createCase.setSolicitorOrganisation('Civil - Organisation 3');
          await createCase.setDefendantLegalRepresentativeCorrespondenceAddress(yesNo.NO,2);
          await createCase.setDefendant2LegalRepresentativeReference();
          await createCase.setDefendantLegalRepresentativeEmail(2);
          break;
        default:
          console.log('Defendant 2: NOT represented');
          await createCase.setDefendantLegallyRepresented(yesNo.NO, 2);
      }
    }

    await createCase.setTypeOfClaim(typeOfClaim); // use from parameters in package

    if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY) {
      await createCase.setSubClaimType(typeOfClaimSubType); // use from parameters in package
    }

    if (typeOfClaim == unspecClaimTypes.HOUSING_DISREPAIR || typeOfClaim == unspecClaimTypes.DAMAGES_AND_OTHER_REMEDY) {
      await createCase.setOtherRemedy();
      await createCase.setHumanRights();
    }

    await createCase.setDescriptionOfClaim(typeOfClaim);

    await createCase.setUploadParticularsOfClaim();

    //
    if (typeOfClaim == unspecClaimTypes.PERSONAL_INJURY && typeOfClaimSubType == personalInjuryTypes.NOISE_INDUCED_HEARING_LOSS) {
      track = claimTrack.FAST_CLAIM;
    }

    await createCase.setClaimValue(track, typeOfClaim); // use from parameters in package
    await buttonHelper.continueButton.click(); //Amount to pay - can do an assertion on amount by api to fee and pay to make sure fee is correct, if needed.
    await createCase.setStatementOfTruth(); //will be dependant upon case ie 1v1 etc
    await buttonHelper.submitButton.click(); //CYA
    await buttonHelper.closeAndReturnToCaseDetailsButton.click(); //Success

    caseId = await pageHelper.grabCaseNumber();
    console.log('caseId>>>>>>>>>>>>>>>' + caseId + '<<<<<<<<<<<<<<<<<<<');
  });
});
