import BasePage from '../../../../../base/base-page.ts';
import { Page } from '@playwright/test';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd-case-data.ts';
import DateHelper from '../../../../../helpers/date-helper.ts';
import DateFragment from '../../../fragments/date/date-fragment.ts';
import {
  headings,
  buttons,
  inputs,
  containers,
  paragraphs,
  radioButtons,
} from './query-details-content.ts';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import filePaths from '../../../../../config/file-paths.ts';

@AllMethodsStep()
export default class QueryDetailsNewPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.enterQueryDetails),
      super.expectHeading(getFormattedCaseId(ccdCaseData?.id!), { exact: false }),
      super.expectHeading(ccdCaseData?.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.civilProcedureRule),
      super.expectSelector(inputs.querySubject.selector),
      super.expectSelector(inputs.queryDetail.selector),
      super.expectSelector(radioButtons.isQueryHearingRelated.yes.selector),
      super.expectSelector(radioButtons.isQueryHearingRelated.no.selector),
      super.expectSelector(buttons.addNew.selector),
    ]);
  }

  async verifyCaseOffline(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.enterQueryDetails),
      super.expectHeading(getFormattedCaseId(ccdCaseData?.id!), { exact: false }),
      super.expectHeading(ccdCaseData?.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.offlineCaseError),
      super.expectNoSelector(inputs.querySubject.selector),
    ]);
  }

  async enterQuerySubject() {
    await super.inputText(paragraphs.queryDetails.querySubject, inputs.querySubject.selector);
  }

  async enterQueryDetail(queryDetail = paragraphs.queryDetails.queryBody) {
    await super.inputText(queryDetail, inputs.queryDetail.selector);
  }

  async selectIsQueryHearingRelatedYes() {
    await super.clickBySelector(radioButtons.isQueryHearingRelated.yes.selector);
  }

  async selectIsQueryHearingRelatedNo() {
    await super.clickBySelector(radioButtons.isQueryHearingRelated.no.selector);
  }

  async enterHearingDate() {
    await this.dateFragment.enterDate(
      DateHelper.addToToday({ days: 10 }),
      inputs.hearingDate.selectorKey,
    );
  }

  async attachDocument() {
    await super.clickAddNew();
    await super.retryUploadFile(filePaths.testDocxFile, containers.attachDocument.selector);
  }

  async continue() {
    await super.retryClickContinue();
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
