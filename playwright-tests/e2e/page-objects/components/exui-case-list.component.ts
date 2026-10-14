import { Page } from "@playwright/test";
import { ExuiSpinnerComponent } from "./exui-spinner.component.js";

export class ExuiCaseListComponent {
  constructor(public page: Page) {}
  
  readonly caseList = this.page.locator("exui-case-list");
  readonly caseListTable = this.page.locator("#search-result table");
  readonly filters = {
    caseNameFilter: this.page.locator("#applicantCaseName"),
    caseNumberFilter: this.page.locator("#\\[CASE_REFERENCE\\]"),
    caseStateFilter: this.page.locator("select#wb-case-state"),
    applyFilterBtn: this.page.getByTitle("Apply filter"),
  };
  readonly resultLinks = this.page.locator("ccd-search-result .govuk-link");
  private spinnerComponent = new ExuiSpinnerComponent(this.page);
  
  public async searchByCaseName(caseName: string): Promise<void> {
    await this.filters.caseNameFilter.fill(caseName);
    await this.filters.applyFilterBtn.click();
    await this.spinnerComponent.wait();
  }

  public async searchByCaseNumber(caseNumber: string): Promise<void> {
    await this.filters.caseNumberFilter.fill(caseNumber);
    await this.filters.applyFilterBtn.click();
    await this.spinnerComponent.wait();
  }

  public async searchByCaseState(state: string) {
    await this.filters.caseStateFilter.selectOption(state);
    await this.filters.applyFilterBtn.click();
    await this.spinnerComponent.wait();
  }

  public async selectCaseByIndex(index: number) {
    await this.resultLinks.nth(index).click();
    await this.spinnerComponent.wait();
  }
}
