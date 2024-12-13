import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  formFields,
  formLabels,
  paragrpahs,
  subHeadings,
} from './second-defendant-solicitor-email-content';

@AllMethodsStep()
export default class SecondDefendantSolicitorEmailSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.emailForDefendantLegalRep),
      super.expectText(paragrpahs.emailUsage),
      super.expectText(paragrpahs.emailNote),
      super.expectLabel(formLabels.enterEmail),
    ]);
  }

  async fillDetails() {
    await super.inputText(
      'hmcts.civil+organisation.2.solicitor.1@gmail.com',
      formFields.respondentSolicitor2EmailAddress,
    );
  }

  async submit() {
    await super.clickSubmit();
  }
}
