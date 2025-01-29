import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { content, inputs } from './unregistered-organisation-content';
import { Party } from '../../../../models/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class UnRegisteredOrganisationFragment extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent() {
    await super.runVerifications([
      super.expectText(content),
      super.expectLabel(inputs.organisationName.label, { ignoreDuplicates: true }),
      super.expectLabel(inputs.phoneNumber.label),
      super.expectLabel(inputs.email.label),
      super.expectLabel(inputs.DX.label),
      super.expectLabel(inputs.fax.label),
    ]);
  }

  async enterUnregisteredOrgDetails() {
    const legalRepresentativeData = CaseDataHelper.buildLegalRepresentativeData(this.party);
    await super.inputText(
      legalRepresentativeData.organisationName,
      inputs.organisationName.selector(this.party),
    );
    await super.inputText(
      legalRepresentativeData.phoneNumber,
      inputs.phoneNumber.selector(this.party),
    );
    await super.inputText(legalRepresentativeData.email, inputs.email.selector(this.party));
    await super.inputText(legalRepresentativeData.DX, inputs.DX.selector(this.party));
    await super.inputText(legalRepresentativeData.fax, inputs.fax.selector(this.party));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
