import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CaseEventsUI from '../../../../../../enums/case-events/case-events-ui';
import ExuiEvent from '../../../../exui-event/exui-event';
import { paragraphs, subheadings } from './checklist-spec-content';

@AllMethodsStep()
export default class ChecklistSpecPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(CaseEventsUI.CREATE_CLAIM_SPEC),
      super.expectSubheading(subheadings.lrSpec),
      super.expectText(paragraphs.paragraph1),
      super.expectText(paragraphs.paragraph2),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
