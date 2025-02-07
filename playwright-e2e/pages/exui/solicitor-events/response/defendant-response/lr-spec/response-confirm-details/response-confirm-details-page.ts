import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import {
  heading,
  radioButtons,
  inputs,
  tableHeadings,
} from './response-confirm-details-content.ts';
import { Party } from '../../../../../../../models/partys.ts';

@AllMethodsStep()
export default class ResponseConfirmDetailsPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent() {
    super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.defendantSolicitorReference.label),
      super.expectText(tableHeadings.organisation, { ignoreDuplicates: true }),
      super.expectText(tableHeadings.reference, { ignoreDuplicates: true }),
      // super.expectText(inputs.defendant1DateOfBirth.label, { ignoreDuplicates: true }),
      // this.dateFragment.verifyContent(),
      // super.expectText(radioButtons.defendant1Address.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYesAddress(defendantParty: Party) {
    await super.clickBySelector(radioButtons.defendantAddress.yes.selector(defendantParty));
  }

  async selectNoAddress(defendantParty: Party) {
    await super.clickBySelector(radioButtons.defendantAddress.no.selector(defendantParty));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
