import { ButtonHelper } from '../../helpers/ButtonHelper.ts';
import { Page } from '@playwright/test';

export class CreateCaseCommon {
  private buttonHelper: ButtonHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
  }
}
