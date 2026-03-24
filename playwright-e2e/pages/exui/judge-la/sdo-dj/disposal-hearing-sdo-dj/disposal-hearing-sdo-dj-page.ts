import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import DateFragment from '../../../fragments/date/date-fragment';
import {
  buttons,
  checkboxes,
  dropdowns,
  inputs,
  radioButtons,
  subheadings,
  containers,
} from './disposal-hearing-sdo-dj-content';

@AllMethodsStep()
export default class DisposalHearingSdoDJPage extends ExuiPage(BasePage) {
  dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData), //split out and specific to this page
      super.expectSubheading(subheadings.orderHearingDetails),
      super.expectText(subheadings.judgementForClaimant),
      super.expectSubheading(subheadings.disclosureOfDocuments),
      super.expectSubheading(subheadings.witnessOfFact),
      super.expectSubheading(subheadings.medicalEvidence),
      super.expectSubheading(subheadings.questionsToExperts),
      super.expectSubheading(subheadings.scheduleOfLoss),
      super.expectSubheading(subheadings.hearingTime),
      super.expectSubheading(subheadings.hearingMethod),
      super.expectSubheading(subheadings.disposalHearingBundle),
      super.expectSubheading(subheadings.claimSettling),
      super.expectSubheading(subheadings.costs),
      super.expectSubheading(subheadings.welshLanguage),
      super.expectSubheading(subheadings.importantNotes),
      super.expectSubheading(subheadings.newDirection),
    ]);
  }

  async addHearingTimeEstimate() {
    await super.clickBySelector(radioButtons.hearingTime.thirtyMins.selector);
  }

  async addDisposalHearingBundle() {
    await Promise.all([
      super.expectText(checkboxes.disposalHearingBundle.bundleType.label),
      super.expectLabel(checkboxes.disposalHearingBundle.bundleType.documents.label),
      super.expectLabel(checkboxes.disposalHearingBundle.bundleType.electronic.label),
      super.expectLabel(checkboxes.disposalHearingBundle.bundleType.summary.label),
    ]);

    await super.inputText('disposal hearing bundle input', inputs.disposalHearingBundle.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.documents.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.electronic.selector);
    await super.clickBySelector(checkboxes.disposalHearingBundle.bundleType.summary.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
