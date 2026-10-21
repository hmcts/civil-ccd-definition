import { Page } from "@playwright/test";
//import {runningEnv} from "../../../iacConfig";
import { createCase } from '../../../civilConfig.ts';
import {WaitUtils} from '../../utils/wait.utils.ts';
import { PageHelper } from '../../../helpers/PageHelper.ts';

export class CreateCasePage {
  private jurisdictionLocator: string;
  private caseTypeLocator: string;
  private caseTypeOptionLocator: string;
  private eventLocator: string;


  constructor(public page: Page) {}

  readonly createCaseLink = this.page.getByRole('link', { name: 'Create case' });
  readonly startButton = this.page.getByRole('button', { name: 'Start' })


  async createCase(caseType: string = 'UNSPECIFIED') {
    const ccJurisdiction = this.page.locator('#cc-jurisdiction');
    const ccCaseType = this.page.locator('#cc-case-type');
    const ccEvent = this.page.locator('#cc-event')

    await this.createCaseLink.click();
    // CCD can take longer than the action timeout to return the jurisdictions, leaving the list empty, so wait for
    // an option other than "--Select a value--" and reload if it doesn't arrive
    await new PageHelper(this.page).waitForReady(ccJurisdiction.locator('option').nth(1), 'The Create case jurisdiction list');
    await ccJurisdiction.selectOption(createCase.jurisdictionCode);
    await ccCaseType.selectOption(createCase.caseTypeCode);
    await ccEvent.selectOption(caseType === 'SPECIFIED' ? createCase.specifiedEventCode : createCase.eventCode);
    await this.startButton.click();
  }
}
