import { Page } from "@playwright/test";

export class ExuiCaseDetailsComponent {
  constructor(public page: Page) {}

  readonly caseHeader = this.page.locator("ccd-case-header");
  readonly tabs = {
    documentsTab: this.page.getByRole("tab", { name: "Case documents" }),
  };
  readonly documentField = this.page.locator("ccd-read-document-field");

  public async getCaseNumber(): Promise<string> {
    const text = await this.caseHeader.textContent();
    const caseNumber = text!.match(/Casenumber: (.*)/);
    if (!caseNumber || !text) {
      throw new Error("Case number not found");
    }
    return caseNumber[1].trim();
  }
}
