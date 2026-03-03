const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let carmEnabled = false;
let caseId;

Feature('1v1 LIP v LIP spec api full admit journey').tag('@api-prod @apii-nightly-prod @api-spec-full-admit');

Before(async () => {
    await createAccount(config.applicantCitizenUser.email, config.applicantCitizenUser.password);
    await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LiP v LiP defendant response with full admit pay by set date', async ({ api_spec_cui }) => {
    caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser,'SmallClaims',false,'INDIVIDUAL');
    await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled, 'FA_SETDATE_INDIVIDUAL');
    await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'PROCEEDS_IN_HERITAGE_SYSTEM', carmEnabled,'FA_ACCEPT_CCJ');
});

AfterSuite(async ({ api_spec_cui }) => {
    await api_spec_cui.cleanUp();
    await deleteAccount(config.applicantCitizenUser.email);
    await deleteAccount(config.defendantCitizenUser2.email);
});
