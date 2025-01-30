import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  heading,
  radioButtons,
  inputs,
  tableHeadings,
} from './response-confirm-details-content.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class ResponseConfirmDetails1v2Page extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent() {
    super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.defendantSolicitorReference.label),
      super.expectText(tableHeadings.organisation),
      super.expectText(tableHeadings.reference),
      super.expectText(inputs.defendant1DateOfBirth.label),
      super.expectText(inputs.defendant2DateOfBirth.label),
      this.dateFragment.verifyContent(),
      super.expectText(radioButtons.defendant1Address.label, { count: 2 }),
    ]);
  }

  async selectYesAddressBothDefendants() {
    await super.clickBySelector(radioButtons.defendant1Address.yes.selector);
    await super.clickBySelector(radioButtons.defendant2Address.yes.selector);
  }

  async selectNoAddressBothDefendants() {
    await super.clickBySelector(radioButtons.defendant1Address.no.selector);
    await super.clickBySelector(radioButtons.defendant2Address.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
