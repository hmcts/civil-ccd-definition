import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, heading, inputs } from './how-to-add-timeline-manual-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';

@AllMethodsStep()
export default class HowToAddTimelineManualPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private defendantParty: Party;

  constructor(page: Page, dateFragment: DateFragment, defendantParty: Party) {
    super(page);
    this.dateFragment = dateFragment;
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        super.expectHeading(ccdCaseData.id),
        super.expectHeading(ccdCaseData.caseNamePublic),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async addNewEvent() {
    await super.clickBySelector(buttons.addNew.selector, { first: true });
  }

  async verifyEventInputs(count = 1) {
    await super.runVerifications(
      [
        super.expectText(inputs.timelineEvent.date.label, { count }),
        this.dateFragment.verifyContent(),
        super.expectLabel(inputs.timelineEvent.eventDescription.label, { count }),
      ],
      { runAxe: false },
    );
  }

  async fillEvent1Details() {
    const date = DateHelper.subtractFromToday({ years: 1 });
    await this.dateFragment.enterDate(date, 'timelineDate', 0);
    await super.inputText(
      'Timeline event description for event 1',
      inputs.timelineEvent.eventDescription.selector(this.defendantParty, 0),
    );
  }

  async fillEvent2Details() {
    const date = DateHelper.subtractFromToday({ months: 11 });
    await this.dateFragment.enterDate(date, 'timelineDate', 1);
    await super.inputText(
      'Timeline event description for event 2',
      inputs.timelineEvent.eventDescription.selector(this.defendantParty, 1),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
