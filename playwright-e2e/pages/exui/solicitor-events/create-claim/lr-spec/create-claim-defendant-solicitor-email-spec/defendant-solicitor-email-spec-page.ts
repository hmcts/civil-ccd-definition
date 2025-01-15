import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  formFields,
  formLabels,
  paragrpahs,
  subHeadings,
} from './defendant-solicitor-email-spec-content';

@AllMethodsStep()
export default class DefendantSolicitorEmailSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.emailForDefendantLegalRep),
      super.expectText(paragrpahs.emailUsage),
      super.expectText(paragrpahs.emailNote),
      super.expectLabel(formLabels.enterEmail),
      super.expectLabel(formLabels.emailRequired),
    ]);
  }

  async fillDetails() {
    await super.inputText(
      'hmcts.civil+organisation.1.solicitor.1@gmail.com',
      formFields.respondentSolicitor1EmailAddress,
    );
  }

  async submit() {
    await super.clickSubmit();
  }
}
