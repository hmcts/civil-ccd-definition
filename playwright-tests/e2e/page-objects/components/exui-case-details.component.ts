import { Locator, Page } from "@playwright/test";

export class ExuiCaseDetailsComponent {
  readonly caseHeader: Locator;
  readonly tabs: { documentsTab: Locator };
  readonly documentField: Locator;

  constructor(public page: Page) {
    this.caseHeader = page.locator("ccd-case-header");
    this.tabs = {
      documentsTab: page.getByRole("tab", { name: "Case documents" }),
    };
    this.documentField = page.locator("ccd-read-document-field");
  }

  public async getCaseNumber(): Promise<string> {
    const text = await this.caseHeader.textContent();
    const caseNumber = text!.match(/Casenumber: (.*)/);
    if (!caseNumber || !text) {
      throw new Error("Case number not found");
    }
    return caseNumber[1].trim();
  }
}
