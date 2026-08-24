import { expect } from "@playwright/test";
import BasePage from "../../../../base/base-page";
import { AllMethodsStep } from "../../../../decorators/test-steps";
import GaExuiPage from "../../mixin-pages/ga-exui-page/ga-exui-page";
import GaCCDCaseData from "../../../../models/ga-ccd-case-data";
import { tabs } from "./ga-case-details-content";
import { TruthyParams } from "../../../../decorators/truthy-params";
import urls from "../../../../config/urls";
import config from "../../../../config/config";

const classKey = 'GaCaseDetailsPage';

@AllMethodsStep()
export default class GaCaseDetailsPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSelector(tabs.application.selector),
      super.expectSelector(tabs.applicationDocs.selector),
    ]);
  }

  @TruthyParams(classKey, 'caseId')
  async goToCaseDetails(caseId: number, { force }: { force: boolean } = { force: true }) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.goTo(`${urls.manageCase}/cases/case-details/${caseId}`, { force });
  }

  @TruthyParams(classKey, 'caseId')
  async retryGoToGaCaseDetails(caseId: number) {
    console.log(`Navigating to case with ccd case id: ${caseId}`);
    await super.retryGoTo(
      `${urls.manageCase}/cases/case-details/${caseId}`,
      () =>
        super.expectSelector(tabs.application.selector, {
          timeout: config.playwright.shortExpectTimeout,
        }),
      undefined,
      { retries: 3, message: `Navigating to case with ccd case id: ${caseId}, trying again` },
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}