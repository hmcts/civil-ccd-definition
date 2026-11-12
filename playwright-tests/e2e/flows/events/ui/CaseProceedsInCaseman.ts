import moment from 'moment-business-days';
import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import CaseProceedsInCasemanReason from '../../../../enums/caseProceedsInCaseman.ts';

// The hearing centre admin taking the claim offline (event CASE_PROCEEDS_IN_CASEMAN, "Case proceeds in Caseman"), with
// today as the date it was transferred to Caseman and the reason for proceeding on paper. civil-service records when it
// was taken offline and moves the claim to PROCEEDS_IN_HERITAGE_SYSTEM ("Case Proceeds Offline").
//
// An unspecified claim gets the page with claimProceedsInCaseman, a specified claim the one with claimProceedsInCasemanLR,
// which also offers "Defendant solicitor does not consent to accept service through MyHMCTS". The event has no check
// your answers or confirmation page, so submitting goes straight back to the case.
export class CaseProceedsInCaseman {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(reason: CaseProceedsInCasemanReason, specified: boolean) {
    await this.pageHelper.selectNextStep('Case proceeds in Caseman');

    const field = specified ? 'claimProceedsInCasemanLR' : 'claimProceedsInCaseman';
    await this.pageHelper.fillDate('date', moment());
    // XUI can redraw the page as the date is typed, which undoes the first click on a reason, so click until it sticks
    const reasonRadio = this.page.locator(`#${field}_reason-${reason}`);
    await expect(async () => {
      await reasonRadio.click();
      await expect(reasonRadio).toBeChecked({ timeout: 1000 });
    }).toPass({ timeout: 15000 });
    if (reason === CaseProceedsInCasemanReason.OTHER) {
      await this.page.locator(`#${field}_other`).fill('Taken offline by the Playwright journey');
    }

    await this.pageHelper.submitEvent('Take offline');
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }
}
