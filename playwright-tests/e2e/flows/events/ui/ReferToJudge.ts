import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';

// A legal adviser refers a general application to a judge ("Refer to Judge", REFER_TO_JUDGE, on the application), as the
// API version does. It is chosen from the application's Next step list: the link on the legal adviser's task is their
// own decision, not this. The event asks nothing: its one page shows the application's urgency and types, read only.
// The application must be open in the page, with the legal adviser's LegalAdvisorDecideOnApplication task claimed where
// one is needed (see WaTaskHelper).
export class ReferToJudge {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Refer to Judge');

    // The application's urgency and types, shown read only
    await expect(this.page.getByText('Application type', { exact: true })).toBeVisible();
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
