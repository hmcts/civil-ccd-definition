import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, getRadioButtons } from './how-to-add-timeline-content.ts';

@AllMethodsStep()
export default class HowToAddTimelinePage extends ExuiPage(BasePage) {
  private defendantNumber?: number;

  constructor(page: Page, defendantNumber?: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectLabel(getRadioButtons(this.defendantNumber).upload.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).manual.label),
      ],
      { pageInsertName: this.defendantNumber ? 'Defendant2' : '' },
    );
  }

  async selectUpload() {
    await super.clickBySelector(getRadioButtons(this.defendantNumber).upload.selector);
  }

  async selectManual() {
    await super.clickBySelector(getRadioButtons(this.defendantNumber).manual.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
