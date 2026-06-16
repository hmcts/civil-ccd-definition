import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  subheadings,
  inputs,
  radios,
  paragraphs,
  containers,
} from './judge-response-to-reconsideration-content';

@AllMethodsStep()
export default class JudgeResponseToReconsiderationPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSelector(radios.yes),
      super.expectSelector(radios.noCreateNewSdo),
      super.expectSelector(radios.noCreateGeneralOrder),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radios.yes);
  }

  async enterReasonForUpholdingPreviousOrder() {
    await super.inputText(inputs.reason.text, inputs.reason.selector);
  }

  async selectNoCreateNewSdo() {
    await super.clickBySelector(radios.noCreateNewSdo);
    await super.expectSubheading(subheadings.createNewSDO, {
      headingLevel: 3,
      containerSelector: containers.createNewSDO,
    });
    await super.expectText(paragraphs.createNewSDO, {
      containerSelector: containers.createNewSDO,
    });
  }

  async selectNoCreateGeneralOrder() {
    await super.clickBySelector(radios.noCreateGeneralOrder);
    await super.expectSubheading(subheadings.createGeneralOrder, {
      headingLevel: 3,
      containerSelector: containers.createGeneralOrder,
    });
    await super.expectText(paragraphs.createGeneralOrder, {
      containerSelector: containers.createGeneralOrder,
    });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
