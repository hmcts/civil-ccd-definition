import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import config from '../../../../../config/config';
import filePaths from '../../../../../config/file-paths';
import urls from '../../../../../config/urls';
import CCDCaseData from '../../../../../models/ccd-case-data';
import WATask from '../../../../../models/wa-task';
import { components, getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content';
import { buttons, containers, headings, inputs, paragraphs } from './query-details-content';

@AllMethodsStep()
export default class QueryDetailsResponsePage extends ExuiPage(BasePage) {
  async goToQueryManagementTask(waTask: WATask, caseId: number) {
    const taskPath = waTask.description.match(/\]\((\/query-management\/query\/[^)]+)\)/)?.[1];
    if (!taskPath || !waTask.id) {
      throw new Error(
        `Work Allocation task ${waTask.id ?? 'without an id'} has no query-management URL.`,
      );
    }

    const taskUrl = new URL(
      taskPath.replace('${[CASE_REFERENCE]}', caseId.toString()),
      urls.manageCase,
    );
    taskUrl.searchParams.set('tid', waTask.id);
    await super.retryGoTo(
      taskUrl.toString(),
      () =>
        super.expectHeading(headings.queryDetails, {
          exact: false,
          timeout: config.exui.pageSubmitTimeout,
        }),
      undefined,
      { retries: 2, message: `Navigating to Work Allocation query task: ${waTask.id}` },
    );
    await Promise.race([
      super.waitForSelectorToDetach(components.loading.selector, {
        timeout: config.exui.pageSubmitTimeout,
      }),
      super.waitForUrlToChange({ timeout: config.exui.pageSubmitTimeout }),
    ]);
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.queryDetails, { exact: false }),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.queryDetails.senderName, { count: 2 }),
      super.expectText(paragraphs.queryDetails.querySubject),
      super.expectText(paragraphs.queryDetails.queryBody),
      super.expectText(paragraphs.queryDetails.isQueryHearingRelated),
      super.expectSelector(inputs.responseDetail.selector),
      super.expectSelector(inputs.closingTheQuery.selector),
      super.expectSelector(buttons.addNew.selector),
    ]);
  }

  async enterResponseDetail() {
    await super.inputText(paragraphs.response.responseDetail, inputs.responseDetail.selector);
  }

  async attachDocument() {
    await super.clickBySelector(buttons.addNew.selector);
    await super.retryUploadFile(filePaths.testDocxFile, containers.attachDocument.selector);
  }

  async continue() {
    await super.retryClickContinue();
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
