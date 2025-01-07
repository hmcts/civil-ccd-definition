import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, heading, getInputs } from './how-to-add-timeline-manual-content.ts';

@AllMethodsStep()
export default class HowToAddTimelineManualPage extends ExuiPage(BasePage) {
  private defendantNumber?: number;

  constructor(page: Page, defendantNumber?: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        super.expectHeading(ccdCaseData.id),
        super.expectHeading(ccdCaseData.caseNamePublic),
      ],
      { pageInsertName: this.defendantNumber ? 'Defendant2' : '' },
    );
  }

  async addNewEvent() {
    await super.clickBySelector(buttons.addNew.selector, { first: true });
  }

  async verifyEvent1Inputs() {
    await super.runVerifications(
      [
        super.expectText(getInputs(this.defendantNumber, 0).timelineEvent.date.label),
        super.expectLabel(getInputs(this.defendantNumber, 0).timelineEvent.date.day.label),
        super.expectLabel(getInputs(this.defendantNumber, 0).timelineEvent.date.month.label),
        super.expectLabel(getInputs(this.defendantNumber, 0).timelineEvent.date.year.label),
        super.expectLabel(getInputs(this.defendantNumber, 0).timelineEvent.eventDescription.label),
      ],
      { runAxe: false },
    );
  }

  async fillEvent1Details() {
    const date = DateHelper.subtractFromToday({ years: 1 });
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      getInputs(this.defendantNumber, 1).timelineEvent.date.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      getInputs(this.defendantNumber, 1).timelineEvent.date.month.selector,
    );
    await super.inputText(
      date.getFullYear(),
      getInputs(this.defendantNumber, 1).timelineEvent.date.day.selector,
    );
    await super.inputText(
      'Nothing',
      getInputs(this.defendantNumber, 1).timelineEvent.eventDescription.selector,
    );
  }

  async fillEvent2Details() {
    const date = DateHelper.subtractFromToday({ months: 11 });
    await super.inputText(
      DateHelper.getTwoDigitDay(date),
      getInputs(this.defendantNumber, 1).timelineEvent.date.day.selector,
      { index: 1 },
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(date),
      getInputs(this.defendantNumber, 1).timelineEvent.date.month.selector,
      {
        index: 1,
      },
    );
    await super.inputText(
      date.getFullYear(),
      getInputs(this.defendantNumber, 1).timelineEvent.date.day.selector,
      { index: 1 },
    );
    await super.inputText(
      'Nothing',
      getInputs(this.defendantNumber, 1).timelineEvent.eventDescription.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
