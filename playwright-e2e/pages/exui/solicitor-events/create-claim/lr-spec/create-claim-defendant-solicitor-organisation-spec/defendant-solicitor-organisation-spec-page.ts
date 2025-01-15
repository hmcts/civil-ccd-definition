import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  formFields,
  formLabels,
  subHeadings,
} from './defendant-solicitor-organisation-spec-content';

@AllMethodsStep()
export default class DefendantSolicitorOrganisationSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.searchDefendantLegalRep),
      super.expectText(subHeadings.defendantLegalRep, { ignoreDuplicates: true }),
    ]);
  }

  async clickOrgRegisteredYes() {
    await super.clickBySelector(formFields.respondent1OrgRegisteredYes);
  }

  async fillDetails() {
    await super.inputText('Civil - Organisation 1', formFields.searchOrgText);
  }

  async clickSelectLink() {
    await super.clickByText(formLabels.selectOrganisationLink);
  }

  async submit() {
    await super.clickSubmit();
  }
}
