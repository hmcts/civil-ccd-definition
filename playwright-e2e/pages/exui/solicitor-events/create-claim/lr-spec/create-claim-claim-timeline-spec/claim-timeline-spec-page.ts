import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  formFields,
  labels,
  lists,
  paragraphs,
  subHeadings,
} from './claim-timeline-spec-content';

@AllMethodsStep()
export default class ClaimTimelineSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subHeadings.claimTimeline),
      super.expectText(paragraphs.dateInfo),
      ...lists.claimEvents.map((event) => super.expectText(event)),
    ]);
  }

  async addNewEvent() {
    const day = '01';
    const month = '01';
    const year = '2022';
    const description = 'Test';

    await super.clickByText(buttons.addNew);
    await super.inputText(day, formFields.timelineDateDay);
    await super.inputText(month, formFields.timelineDateMonth);
    await super.inputText(year, formFields.timelineDateYear);
    await super.inputText(description, formFields.timelineDescription);
  }

  async verifyAddNewEvent() {
    await super.expectText(labels.date, { ignoreDuplicates: true });
    await super.expectText(labels.day, { ignoreDuplicates: true });
    await super.expectText(labels.month, { ignoreDuplicates: true });
    await super.expectText(labels.year, { ignoreDuplicates: true });
  }

  async submit() {
    await super.clickSubmit();
  }
}
