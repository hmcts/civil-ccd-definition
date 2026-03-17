import { Page, expect } from "@playwright/test";
import { TabsHelper } from "./TabsHelper";
import {detentionFacility} from "../fixtures/detentionFacilities";
import {appellant} from '../iacConfig';
import moment from "moment";

const inDetentionLocator:string = '#case-viewer-field-read--appellantInDetention';
const yesNo: string[] = ['Yes', 'No'];

export class ValidationHelper {
    private tabsHelper: TabsHelper;

    constructor(public page: Page) {
        this.tabsHelper = new TabsHelper(this.page);
    }

    async validateLabelDisplayed(locator: string, label: string, moveToOverviewTab: boolean = true) {
        if (moveToOverviewTab) {
            await this.tabsHelper.selectTab('Overview');
        }

        await expect(this.page.locator(locator), 'Label is not being displayed when it should').toBeVisible();
        const src:string = await this.page.locator(locator).getAttribute('src');
        expect(src, 'Expected label not found').toContain(label);
    }

    async validateLabelNotDisplayed(locator: string, moveToOverviewTab: boolean = true) {
        if (moveToOverviewTab) {
            await this.tabsHelper.selectTab('Overview');
        }

        await expect(this.page.locator(locator), 'The image is being displayed when it should not.').not.toBeVisible();
    }



    async validateCaseFlagExists(caseFlag: string, activeInactive: string = 'Active') {
        await this.tabsHelper.selectTab('Case flags');
        const totalTables = await this.page.locator('ccd-case-flag-table').count();
        let flagStatusMatched: boolean = false;

        for (let i = 0; i < totalTables; i++) {
            const table = await this.page.locator('ccd-case-flag-table').nth(i);
            const rows = await table.getByRole('row');
            const caseFlagCount = await rows.filter({hasText: 'Detained individual'}).count();
            if (caseFlagCount > 0) {
                for (let j = 0; j < caseFlagCount; j++) {
                    const targetRow = await rows.filter({hasText: 'Detained individual'}).nth(j);
                    const cellCount = await targetRow.getByRole('cell').count();
                    const flagStatus = await targetRow.getByRole('cell').nth(cellCount - 1).innerText();

                    if (activeInactive === 'Active') {
                        if (flagStatus === activeInactive.toUpperCase()) {
                            flagStatusMatched = true;
                            break;
                        } else {
                            flagStatusMatched = false;
                        }
                    }

                    if (activeInactive === 'Inactive') {
                        if (flagStatus !== activeInactive.toUpperCase()) {
                            flagStatusMatched = false;
                            break;
                        } else {
                            flagStatusMatched = true;
                        }
                    }
                }
            }
        }
        expect(flagStatusMatched, `Expected flag status not found.  Flag: ${caseFlag} with status: ${activeInactive}`).toEqual(true);
    }


    async validateDataOnAppellantTab() {
        const detentionFacilityList: string[] = ['Immigration removal centre', 'Prison', 'Other'];
        const otherFacilityNameLocator: string = '#case-viewer-field-read--otherDetentionFacilityName > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr > td > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-text-field > span';
        const detentionFacilityPrisonNameLocator: string = '#case-viewer-field-read--prisonName';
        const detentionFacilityIrcNameLocator: string = '#case-viewer-field-read--ircName';
        const detentionBuildingLocator: string = '#case-viewer-field-read--detentionBuilding';
        const detentionAddressLocator: string = '#case-viewer-field-read--detentionAddressLines';
        const detentionPostcodeLocator: string = '#case-viewer-field-read--detentionPostcode';
        const detentionPrisonNomsNumberLocator: string = '#case-viewer-field-read--prisonNOMSNumber > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-complex-field > ccd-read-complex-field-table > div > table > tbody > tr > td > span > ccd-field-read > div > ccd-field-read-label > div > ccd-read-text-field > span';


       //await this.page.waitForTimeout(6000); // waits for 2 seconds

        await this.tabsHelper.selectTab('Appellant');

        const facilityType:string = await this.page.innerText('#case-viewer-field-read--detentionFacility');
        expect(detentionFacilityList, `Invalid detention facility detected: ${facilityType}`).toContain(facilityType);

        const detentionFacilityName: string = (facilityType === 'Other' ? await this.page.innerText(otherFacilityNameLocator) : (facilityType === 'Prison' ? await this.page.innerText(detentionFacilityPrisonNameLocator) : await this.page.innerText(detentionFacilityIrcNameLocator)));


        const detentionFacilityBuilding: string = await this.page.innerText(detentionBuildingLocator);
        const detentionFacilityAddress: string = await this.page.innerText(detentionAddressLocator);
        const detentionFacilityPostcode: string = await this.page.innerText(detentionPostcodeLocator);

        switch (facilityType) {
            case 'Immigration removal centre':
                expect(detentionFacilityName, `${facilityType} name must exist on the Appellant Tab`).toEqual(detentionFacility.immigrationRemovalCentre.name)
                expect(detentionFacilityBuilding, `${facilityType} building must exist on the Appellant Tab`).toEqual(detentionFacility.immigrationRemovalCentre.building);
                expect(detentionFacilityAddress, `${facilityType} address must exist on the Appellant Tab`).toEqual(detentionFacility.immigrationRemovalCentre.address);
                expect(detentionFacilityPostcode, `${facilityType} postcode must exist on the Appellant Tab`).toEqual(detentionFacility.immigrationRemovalCentre.postcode);
                break;
            case 'Prison':
                expect(detentionFacilityName, `${facilityType} name must exist on the Appellant Tab`).toEqual(detentionFacility.prison.name);
                expect(await this.page.innerText(detentionPrisonNomsNumberLocator), 'NOMS number must exist on the Appellant Tab').toEqual(appellant.NOMSNumber);
                expect(detentionFacilityBuilding, `${facilityType} building must exist on the Appellant Tab`).toEqual(detentionFacility.prison.building);
                expect(detentionFacilityAddress, `${facilityType} address must exist on the Appellant Tab`).toEqual(detentionFacility.prison.address);
                expect(detentionFacilityPostcode, `${facilityType} postcode must exist on the Appellant Tab`).toEqual(detentionFacility.prison.postcode)
                break;
            case 'Other':
                expect(detentionFacilityName, `${facilityType} facility name must exist on the Appellant Tab.  Expected: ${detentionFacility.other.name}, Got: ${facilityType} `).toEqual(detentionFacility.other.name);
                expect(detentionFacilityBuilding, `${facilityType} facility building must exist on the Appellant Tab`).toEqual(detentionFacility.other.building);
                expect(detentionFacilityAddress, `${facilityType} facility address must exist on the Appellant Tab`).toEqual(detentionFacility.other.address);
                expect(detentionFacilityPostcode, `${facilityType} facility postcode must exist on the Appellant Tab`).toEqual(detentionFacility.other.postcode);
                break;
        }
    }

    async validateDataOnAppellantTabDetainedStatusRemoved(detentionLocation: string) {
        const appellantTabDetentionFacilityTypeText: string = 'Detention facility type';
        const appellantTabDetentionFacilityNameText: string = 'Detention facility name';
        const appellantTabNomsNoText: string = 'NOMS number';

        await this.tabsHelper.selectTab('Appellant');
        await expect(this.page.getByText(appellantTabDetentionFacilityTypeText)).not.toBeVisible();
        await expect(this.page.getByText(appellantTabDetentionFacilityNameText)).not.toBeVisible();
        await expect(this.page.getByText(appellantTabNomsNoText)).not.toBeVisible();
        await expect(this.page.getByText(detentionLocation === 'prison' ? detentionFacility.prison.building : detentionFacility.immigrationRemovalCentre.building)).not.toBeVisible();
        await expect(this.page.getByText(detentionLocation === 'prison' ? detentionFacility.prison.address : detentionFacility.immigrationRemovalCentre.address)).not.toBeVisible();
        await expect(this.page.getByText(detentionLocation === 'prison' ? detentionFacility.prison.postcode : detentionFacility.immigrationRemovalCentre.postcode)).not.toBeVisible();
    }

    async validateDataOnAppealTab(detentionLocation: string = 'prison', checkForDetainedDate:boolean) {
        const detainedDateLocator: string = '#case-viewer-field-read--appellantDetainedDate';
        const detainedReasonLocator: string = '#case-viewer-field-read--addReasonAppellantWasDetained';
        const removalDirectionsLocator: string = '#case-viewer-field-read--removalOrderOptions';
        const appealTabOnBailLocator: string = '#case-viewer-field-read--hasPendingBailApplications';
        const bailApplicationNumberLocator: string = '#case-viewer-field-read--bailApplicationNumber';
        const custodialSentenceLocator: string = '#case-viewer-field-read--releaseDateProvided';
        const custodialSentenceReleaseDateLocator: string = '#case-viewer-field-read--releaseDate';
        const removalDirectionsDateLocator: string = '#case-viewer-field-read--removalOrderDate';

        let onBail: string;
        let bailApplicationNumber:string;
        let removalDirectionsDate: string;
        let hasCustodialSentence: string;
        let custodialReleaseDate: string;
        let detainedDate: string;
        let detainedReason: string;

        await this.tabsHelper.selectTab('Appeal');

        const inDetention = await this.page.innerText(inDetentionLocator);
        expect(yesNo, `An invalid Detention flag: ${inDetention} found on the Appeal Tab.`).toContain(inDetention);

        if (checkForDetainedDate) {
             detainedDate = await this.page.innerText(detainedDateLocator);
             expect(detainedDate, 'Incorrect detained date found on Appeals Tab').toEqual(appellant.detained.date.day + ' ' + appellant.detained.date.shortMonthDesc + ' ' + appellant.detained.date.year);

             detainedReason = await this.page.innerText(detainedReasonLocator);
             expect(detainedReason, `The reason: ${detainedReason} for the detention is incorrect on the Appeal Tab`).toEqual(appellant.detained.reason);
        }

        const hasRemovalDirections = await this.page.innerText(removalDirectionsLocator);
        expect(yesNo, `An invalid Removal Directions flag: ${hasRemovalDirections} found on the Appeal Tab`).toContain(hasRemovalDirections);

        switch (detentionLocation) {
            case 'immigrationRemovalCentre':
                onBail = await this.page.innerText(appealTabOnBailLocator);
                expect(yesNo, `An invalid Bail flag: ${onBail} found on the Appeal Tab`).toContain(onBail);

                if (onBail === 'Yes') {
                    bailApplicationNumber = await this.page.innerText(bailApplicationNumberLocator);
                    expect(bailApplicationNumber, 'A valid Bail Application Number must exist on the Appeal Tab').toEqual(appellant.bailApplicationNumber);
                }
                break;
            default:
                hasCustodialSentence = await this.page.innerText(custodialSentenceLocator);
                expect(yesNo, `An invalid Custodial Sentence flag: ${hasCustodialSentence} found on the Appeal Tab`).toContain(hasCustodialSentence);

                if (hasCustodialSentence === 'Yes') {
                    custodialReleaseDate = await this.page.innerText(custodialSentenceReleaseDateLocator);
                    expect(custodialReleaseDate, 'A valid Custodial Release Date must exist on the Appeal Tab').toEqual(appellant.custodialSentence.day + ' ' + appellant.custodialSentence.shortMonthDesc + ' ' + appellant.custodialSentence.year);
                } else {
                    onBail = await this.page.innerText(appealTabOnBailLocator);
                    expect(yesNo, `An invalid Bail flag: ${onBail} found on the Appeal Tab`).toContain(onBail);

                    if (onBail === 'Yes') {
                        bailApplicationNumber = await this.page.innerText(bailApplicationNumberLocator);
                        expect(bailApplicationNumber, 'A valid Bail Application Number must exist on the Appeal Tab').toEqual(appellant.bailApplicationNumber);
                    }
                }
                break;
        }

        if (hasRemovalDirections === 'Yes') {
            removalDirectionsDate = await this.page.innerText(removalDirectionsDateLocator);
            expect(removalDirectionsDate, 'Incorrect removal date found on Appeal Tab')
                .toEqual(appellant.removalDirections.date.day + ' '
                    + appellant.removalDirections.date.shortMonthDesc + ' '
                    + appellant.removalDirections.date.year +', '
                    + appellant.removalDirections.time.hour12NoLeadingZero + ':'
                    + appellant.removalDirections.time.minutesWithLeadingZero + ':'
                    + appellant.removalDirections.time.secondsWithLeadingZero + ' '
                    + appellant.removalDirections.time.amPm);
        }
    }

    async validateDataOnAppealTabDetainedStatusRemoved() {
        const custodialText: string = 'Custodial Sentence';
        const custodialDateText: string = 'Custodial sentence release date';
        const bailPendingText: string = 'Pending bail application';
        const bailNumberText: string = 'Bail application number';
        const dateStatusRemovedText: string = 'Date detention status removed';
        const removalReasonsText: string = 'Reasons for removal';

        await this.tabsHelper.selectTab('Appeal');

        const inDetention = await this.page.innerText(inDetentionLocator);
        expect(yesNo, `An invalid Detention flag: ${inDetention} found on the Appeal Tab.`).toContain(inDetention);
        expect(inDetention,`The Detention Flag value of: ${inDetention} on the Appeal Tab is invalid. It should be: No`).toEqual('No');

        await expect(this.page.getByText(custodialText)).not.toBeVisible();
        await expect(this.page.getByText(custodialDateText)).not.toBeVisible();
        await expect(this.page.getByText(bailPendingText)).not.toBeVisible();
        await expect(this.page.getByText(bailNumberText)).not.toBeVisible();
        await expect(this.page.getByText(dateStatusRemovedText)).toBeVisible();
        await expect(this.page.getByText(removalReasonsText)).toBeVisible();
    }

    async validateComplyDate(daysToComply: number) {
        const complyDate: string = await this.page.inputValue('#sendDirectionDateDue-day') + '-'
            + await this.page.inputValue('#sendDirectionDateDue-month') + '-'
            + await this.page.inputValue('#sendDirectionDateDue-year');
        const todayPlusDays = moment().add(daysToComply, 'days').format('DD-MM-YYYY');

        expect(complyDate, `Request respondent evidence comply date should be ${daysToComply} days from today: ${todayPlusDays}.`).toEqual(todayPlusDays)
    }

    async validateNextStepNotAvailable(nextStep: string) {
        const options: string[] = await this.page.locator('#next-step > option').allTextContents();
        expect(options, `The next step event: ${nextStep} should not be available to the user.`).not.toContain(nextStep);
    }
}