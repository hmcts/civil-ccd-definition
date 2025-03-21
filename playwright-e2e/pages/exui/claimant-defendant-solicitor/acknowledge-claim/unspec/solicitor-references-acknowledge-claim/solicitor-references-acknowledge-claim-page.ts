import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { subheadings } from './solicitor-references-acknowledge-claim-content.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import SolicitorReferenceFragment from '../../../../fragments/solicitor-reference/solicitor-reference-fragment.ts';
import { Page } from 'playwright-core';
import { Party } from '../../../../../../models/partys.ts';
import StringHelper from '../../../../../../helpers/string-helper.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class SolicitorReferencesAcknowledgeClaimPage extends ExuiPage(BasePage) {
  private defendantParty: Party;
  private defendantSolicitorReferenceFragment: SolicitorReferenceFragment;

  constructor(
    page: Page,
    defendantSolicitorReferenceFragment: SolicitorReferenceFragment,
    defendantParty: Party,
  ) {
    super(page);
    this.defendantParty = defendantParty;
    this.defendantSolicitorReferenceFragment = defendantSolicitorReferenceFragment;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectSubheading(subheadings.yourFileReference),
        this.defendantSolicitorReferenceFragment.verifyContent(), // this is different for DS2
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async enterReference() {
    await this.defendantSolicitorReferenceFragment.enterReference();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
