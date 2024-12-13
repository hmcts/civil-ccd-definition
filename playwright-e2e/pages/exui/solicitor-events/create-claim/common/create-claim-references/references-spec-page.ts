import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { formFields, labels, subheadings } from './references-spec-content.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';

@AllMethodsStep()
export default class CreateClaimSpecReferencesPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.yourFileReference),
      super.expectText(labels.claimantLegalRepresentativeReference),
      super.expectText(labels.defendantLegalRepresentativeReference, { ignoreDuplicates: true }),
      super.expectSelector(formFields.solicitorReferences_applicantSolicitor1Reference),
      super.expectSelector(formFields.solicitorReferences_respondentSolicitor1Reference),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
