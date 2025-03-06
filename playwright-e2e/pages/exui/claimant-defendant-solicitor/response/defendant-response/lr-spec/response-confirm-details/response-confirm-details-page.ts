import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import DateOfBirthFragment from '../../../../../fragments/date/date-of-birth-fragment.ts';
import { heading, radioButtons } from './response-confirm-details-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import SolicitorReferenceFragment from '../../../../../fragments/solicitor-reference/solicitor-reference-fragment.ts';

@AllMethodsStep()
export default class ResponseConfirmDetailsPage extends ExuiPage(BasePage) {
  private defendantParty: Party;
  private solicitorParty: Party;
  private solicitorReferenceFragment: SolicitorReferenceFragment;
  private dateOfBirthFragment: DateOfBirthFragment;

  constructor(
    page: Page,
    defendantParty: Party,
    solicitorParty: Party,
    solicitorReferenceFragment: SolicitorReferenceFragment,
    dateOfBirthFragment: DateOfBirthFragment,
  ) {
    super(page);
    this.defendantParty = defendantParty;
    this.solicitorParty = solicitorParty;
    this.solicitorReferenceFragment = solicitorReferenceFragment;
    this.dateOfBirthFragment = dateOfBirthFragment;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        this.solicitorReferenceFragment.verifyContent(),
        // super.expectText(tableHeadings.organisation),
        // super.expectText(tableHeadings.reference),
        // super.expectText(inputs.defendant1DateOfBirth.label),
        // this.dateOfBirthFragment.verifyContent(),
        // super.expectText(radioButtons.defendant1Address.label),
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
