import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  dropDowns,
  formFields,
  paragraphs,
  subHeadings,
} from './evidence-list-spec-content';

@AllMethodsStep()
export default class EvidenceListSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.listYourEvidence),
      super.expectText(paragraphs.evidenceInfo),
      super.expectText(buttons.addNew),
    ]);
  }

  async addNew() {
    await super.clickByText(buttons.addNew);
  }

  async selectEvidenceType() {
    await super.selectFromDropdown(1, dropDowns.evidenceTypeDropdown);
  }

  async fillEvidenceDetails() {
    await super.inputText('Test', formFields.contractAndAgreementsEvidence);
  }

  async submit() {
    await super.clickSubmit();
  }
}
