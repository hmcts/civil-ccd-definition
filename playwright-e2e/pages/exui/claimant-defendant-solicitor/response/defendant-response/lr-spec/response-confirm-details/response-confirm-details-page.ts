import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import { inputs, radioButtons, tableHeadings, heading } from './response-confirm-details-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import SolicitorReferenceFragment from '../../../../../fragments/solicitor-reference/solicitor-reference-fragment.ts';

@AllMethodsStep()
export default class ResponseConfirmDetailsPage extends ExuiPage(BasePage) {
  private defendantParty: Party;
  private solicitorParty: Party;
  private solicitorReferenceFragment: SolicitorReferenceFragment;
  private dateFragment: DateFragment;

  constructor(
    page: Page,
    defendantParty: Party,
    solicitorParty: Party,
    solicitorReferenceFragment: SolicitorReferenceFragment,
    dateFragment: DateFragment,
  ) {
    super(page);
    this.defendantParty = defendantParty;
    this.solicitorParty = solicitorParty;
    this.solicitorReferenceFragment = solicitorReferenceFragment;
    this.dateFragment = dateFragment;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        this.solicitorReferenceFragment.verifyContent(),
        super.expectText(tableHeadings.organisation, {count:1}),
        // super.expectText(tableHeadings.reference, {count:1}),  not working for 1v2DS
        // super.expectText(inputs.defendant1DateOfBirth.label,  {count:1}),
        // this.dateFragment.verifyContent(),
        super.expectLegend(radioButtons.address.label, {count:1}),
        super.expectRadioYesLabel(radioButtons.address.yes.selector(this.defendantParty)),
        super.expectRadioNoLabel(radioButtons.address.no.selector(this.defendantParty))
      ],
      { axePageInsertName: StringHelper.capitalise(this.solicitorParty.key) },
    );
  }

  async selectYesAddress() {
    await super.clickBySelector(radioButtons.address.yes.selector(this.defendantParty));
  }

  async selectNoAddress() {
    await super.clickBySelector(radioButtons.address.no.selector(this.defendantParty));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
