import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  manageCaseFlagsButton,
  nextButton,
  caseFlagCommentInput,
  makeInactiveButton,
  updateFlagNextButton,
} from './manage-case-flags-content.ts';

@AllMethodsStep()
export default class ManageCaseFlagsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectCaseFlagButton(caseFlagNumber: number) {
    await super.clickBySelector(manageCaseFlagsButton(caseFlagNumber).selector);
  }

  async clickNext() {
    await super.clickBySelector(nextButton);
  }

  async enterComment() {
    await super.inputText('test', caseFlagCommentInput);
  }

  async clickMakeInactive() {
    await super.clickBySelector(makeInactiveButton);
  }

  async clickUpdateFlagNext() {
    await super.clickBySelector(updateFlagNextButton);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
