import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  formFields,
  formLabels,
  subHeadings,
} from './second-defendant-solicitor-organisation-content';

@AllMethodsStep()
export default class SecondDefendantSolicitorOrganisationSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectText(subHeadings.searchDefendantLegalRep)]);
  }

  async clickOrgRegisteredYes() {
    await super.clickBySelector(formFields.respondent1OrgRegisteredYes);
  }

  async fillDetails() {
    await super.inputText('Civil - Organisation 2', formFields.searchOrgText);
  }

  async clickSelectLink() {
    await super.clickByText(formLabels.selectOrganisationLink);
  }

  async submit() {
    await super.clickSubmit();
  }
}
