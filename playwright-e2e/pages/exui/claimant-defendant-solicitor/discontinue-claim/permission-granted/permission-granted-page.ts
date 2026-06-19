import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import DateFragment from '../../../fragments/date/date-fragment';
import YesOrNoFragment from '../../../fragments/yes-or-no/yes-or-no-fragment';
import {
  headings,
  subheading,
  radioButtons,
  inputs,
  paragraph,
  selectorKeys,
} from './permission-granted-content';
import { getFormattedCaseId } from '../../../exui-page/exui-content';

@AllMethodsStep()
export default class PermissionGrantedPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(headings.discontinueThisClaim),
      super.expectHeading(headings.permissionGranted),
      super.expectHeading(getFormattedCaseId(ccdCaseData?.id!), { exact: false }),
      super.expectLegend(radioButtons.permissionGranted),
      super.expectRadioLabel(radioButtons.yes.label, radioButtons.yes.selector),
      super.expectRadioLabel(radioButtons.no.label, radioButtons.no.selector),
    ]);
  }

  async selectPermissionGrantedYes() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.inputText('Testing', inputs.judgeName);
    await this.dateFragment.enterDate(new Date(2024, 7, 29), selectorKeys.permissionGrantedDate);
  }

  async selectPermissionGrantedNo() {
    await super.clickBySelector(radioButtons.no.selector);
    super.expectText(subheading);
    super.expectText(paragraph);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
