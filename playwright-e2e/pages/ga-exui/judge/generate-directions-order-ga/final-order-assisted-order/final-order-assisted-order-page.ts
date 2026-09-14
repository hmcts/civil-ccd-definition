import BasePage from '../../../../../base/base-page';
import DateHelper from '../../../../../helpers/date-helper';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import {
  checkboxes,
  dropdowns,
  inputs,
  radioButtons,
  subheadings,
} from './final-order-assisted-order-content';

@AllMethodsStep()
export default class FinalOrderAssistedOrderPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheadings.orderMade, { headingLevel: 2 }),
      super.expectSubheading(radioButtons.orderMade.label, { headingLevel: 4 }),
      super.expectSubheading(subheadings.judgeHeardFrom, { headingLevel: 2 }),
      super.expectSubheading(subheadings.recitals, { headingLevel: 2 }),
      super.expectSubheading(subheadings.order, { headingLevel: 2 }),
      super.expectSubheading(subheadings.furtherHearing, { headingLevel: 2 }),
      super.expectSubheading(subheadings.appeal, { headingLevel: 2 }),
      super.expectSubheading(subheadings.orderMadeWithoutNotice, { headingLevel: 2 }),
      super.expectSubheading(subheadings.reasons, { headingLevel: 2 }),
    ]);
  }

  async enterOrderDetails() {
    await super.clickBySelector(radioButtons.orderMade.yes.selector);
    await super.clickBySelector(radioButtons.orderMade.hearingDate.singleDate.selector);
    await super.clickBySelector(checkboxes.judgeHeardFrom.showHide.selector);
    await super.clickBySelector(radioButtons.judgeHeardFrom.claimantsAndDefendants.selector);
    await super.clickBySelector(radioButtons.judgeHeardFrom.otherRepresentation.selector);
    await super.inputText('Test Other rep', inputs.judgeHeardFrom.otherRepresentation.selector);
    await super.clickBySelector(checkboxes.orderMade.judgeConsideredThePapers.selector);
    await super.clickBySelector(checkboxes.recitals.showHide.selector);
    await super.inputText('Test recital records', inputs.recitals.recordedThat.selector);
    await super.clickBySelector(radioButtons.order.costsReserved.selector);
    await super.inputText('to the hearing judge', inputs.order.costsReserved.selector);
    await super.clickBySelector(radioButtons.publicFundingCostsProtection.yes.selector);
    await super.clickBySelector(checkboxes.furtherHearing.showHide.selector);
    const furtherHearingDate = DateHelper.addToToday({ days: 1 });
    await super.inputText(
      DateHelper.getTwoDigitDay(furtherHearingDate),
      inputs.furtherHearing.listFromDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(furtherHearingDate),
      inputs.furtherHearing.listFromDate.month.selector,
    );
    await super.inputText(
      furtherHearingDate.getFullYear(),
      inputs.furtherHearing.listFromDate.year.selector,
    );
    await super.blurSelector(inputs.furtherHearing.listFromDate.year.selector);
    await super.clickBySelector(radioButtons.furtherHearing.hearingLength.twoHours.selector);
    await super.clickBySelector(radioButtons.furtherHearing.hearingMethod.video.selector);
    await super.clickBySelector(checkboxes.appeal.showHide.selector);
    await super.clickBySelector(radioButtons.appeal.origin.claimant.selector);
    await super.clickBySelector(radioButtons.appeal.permissionToAppeal.granted.selector);
    await super.selectFromDropdown(dropdowns.appeal.judge.option, dropdowns.appeal.judge.selector);
    await super.clickBySelector(radioButtons.orderMadeOn.withoutNotice.selector);
    await super.clickBySelector(radioButtons.reasons.yes.selector);
    await super.inputText('Test reasons ...', inputs.reasons.briefReasons.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
