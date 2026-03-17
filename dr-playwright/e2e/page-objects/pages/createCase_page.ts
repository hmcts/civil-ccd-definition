import { Page } from "@playwright/test";
//import {runningEnv} from "../../../iacConfig";
import { createCaseSpecified, createCaseUnspecified } from '../../../civilConfig.ts';
import {WaitUtils} from '../../utils/wait.utils.ts';

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


    await ccJurisdiction.selectOption(caseType === 'UNSPECIFIED' ? createCaseUnspecified.jurisdictionCode : createCaseSpecified.jurisdictionCode);
    await ccCaseType.selectOption(caseType === 'UNSPECIFIED' ? createCaseUnspecified.caseTypeCode : createCaseSpecified.caseTypeCode);
    await ccEvent.selectOption(caseType === 'UNSPECIFIED' ? createCaseUnspecified.eventCode : createCaseSpecified.eventCode);
    await this.startButton.click();
  }
}
