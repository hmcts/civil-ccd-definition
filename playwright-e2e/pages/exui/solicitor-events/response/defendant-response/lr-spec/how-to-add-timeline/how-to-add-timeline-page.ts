import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './how-to-add-timeline-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class HowToAddTimelinePage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectLabel(radioButtons.upload.label),
        super.expectLabel(radioButtons.manual.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async selectUpload() {
    await super.clickBySelector(radioButtons.upload.selector(this.defendantParty));
  }

  async selectManual() {
    await super.clickBySelector(radioButtons.manual.selector(this.defendantParty));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
