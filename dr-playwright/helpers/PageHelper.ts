import { Page } from "@playwright/test";
// import {imageLocators} from "../fixtures/imageLocators";
// import {TabsHelper} from "./TabsHelper";
// import {WaitUtils} from "../e2e/utils/wait.utils";
// import {envUrl} from "../iacConfig";

export class PageHelper {

    // readonly callbackErrorLocator: string = '//*[@id="content"]/div/exui-ccd-connector/ccd-case-edit/ccd-case-edit-page/ccd-callback-errors';
    // readonly errorsList: string = '//*[@id="errors"]/li'
    constructor(public page: Page) {}

    async grabCaseNumber() {
        await this.page.waitForSelector('.alert-message', { state: 'visible' });
        const message = await this.page.innerText('.alert-message');
        const caseId: string = (message.split('#')[1].split(' ')[0]).split('-').join('');
        return caseId;
    }

    // async selectNextStep(nextStep: string) {
    //     await this.page.selectOption('#next-step', nextStep);
    //     await this.page.waitForTimeout(2000); // waits for 2 seconds
    //     await this.page.getByRole('button', { name: 'Go' }).click();
    // }
    //
    // // When running as API test the search reference box is not being populated.  Tried multiple options to no avail
    // // So added 2nd parameter and use the url instead of search reference box for API tests
    // async getCase(caseId: string, isE2e: boolean = true) {
    //     if (isE2e) {
    //         await this.page.fill('#exuiCaseReferenceSearch', caseId);
    //         await this.page.getByRole( 'button', { name: 'Find' }).click();
    //     } else {
    //         await this.page.goto(envUrl + '/cases/case-details/IA/Asylum/' + caseId);
    //     }
    // }
    //
    // async waitForHearingBundleToBeGenerated() {
    //     const maxRetries: number = 10;
    //     let retry: number = 0;
    //     while (await this.page.locator('#progress_caseOfficer_finalBundling_in_new').isVisible()) {
    //         if (retry < maxRetries) {
    //             retry++;
    //             console.log('Refreshing webpage, try: ' + retry + ' of ' + maxRetries);
    //             await this.page.reload();
    //             const visibleElement = await this.page.locator('#next-step');
    //             await visibleElement.waitFor({state: 'visible'});
    //         } else {
    //             break;
    //         }
    //     }
    // }
    //
    // async areNotificationsTurnedOff() {
    //     await new TabsHelper(this.page).selectTab('Overview');
    //     return (!await this.page.locator(imageLocators.rehydrated.notifications.locator).isHidden());
    // }
    //
    // async checkForAnyErrorsOnPage() {
    //     await this.page.locator(this.callbackErrorLocator).waitFor({timeout:5000});
    //     console.log(await this.page.locator(this.callbackErrorLocator).isVisible());
    //     return (await this.page.locator(this.callbackErrorLocator).isVisible());
    // }
    //
    // async checkForSingleErrorOnPage(errorMessage: string) {
    //     await this.page.locator(this.callbackErrorLocator).waitFor({timeout:5000});
    //     console.log(await this.page.locator(this.callbackErrorLocator).isVisible());
    //     console.log(errorMessage + '>>>> ', await this.page.locator(this.errorsList).innerText());
    //     return (await this.page.locator(this.errorsList).innerText() === errorMessage);
    //
    // }
}
