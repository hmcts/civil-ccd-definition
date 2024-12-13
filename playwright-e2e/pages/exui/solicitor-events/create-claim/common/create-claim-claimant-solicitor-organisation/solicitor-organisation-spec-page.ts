import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { formFields, heading, labels, subHeadings } from './solicitor-organisation-spec-content.ts';

@AllMethodsStep()
export default class SolicitorOrganisationSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading.searchClaimantSolicitor),
      super.expectSubheading(subHeadings.claimantLegalRepresentative),
      super.expectSubheading(subHeadings.searchForOrganisation),
      super.expectSubheading(subHeadings.organisationNameAndAddress),
      super.expectText(labels.referenceOptional, { ignoreDuplicates: true }),
    ]);
  }

  async fillDetails() {
    await super.inputText('Civil - Organisation 1', formFields.searchOrgText);
  }

  async clickSelectLink() {
    await super.clickByText(labels.selectOrganisationLink);
  }

  async submit() {
    await super.clickSubmit();
  }
}
