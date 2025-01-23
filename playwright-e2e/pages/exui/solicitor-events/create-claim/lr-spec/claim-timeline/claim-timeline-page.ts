import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { buttons, inputs, paragraphs, subheadings } from './claim-timeline-content';
import DateFragment from '../../../../fragments/date/date-fragment';
import DateHelper from '../../../../../../helpers/date-helper';
import partys from '../../../../../../constants/partys';

@AllMethodsStep()
export default class ClaimTimelinePage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.claimTimeline),
      super.expectText(paragraphs.dateInfo),
    ]);
  }

  async addNewEvent() {
    super.clickBySelector(buttons.addNew.selector);
  }

  async enterTimelineEvent1Details() {
    const date = DateHelper.subtractFromToday({ months: 3 });
    await this.dateFragment.enterDate(date, '#timelineDate', 0);
    await super.inputText(
      `This the timeline - ${partys.CLAIMANT_1.key}`,
      inputs.timelineDescription.selector(1),
    );
  }

  async submit() {
    await super.clickSubmit();
  }
}
