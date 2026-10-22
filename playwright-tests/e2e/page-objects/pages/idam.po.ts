import { Locator, Page } from "@playwright/test";

export interface UserCredentials {
  username: string;
  password: string;
  sessionFile?: string;
  cookieName?: string;
}
export class IdamPage {
  readonly heading: Locator;
  readonly signOut: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueBtn: Locator;

  constructor(public page: Page) {
    this.heading = page.getByRole("heading", {
      name: "Sign in or create an account",
    });
    this.signOut = page.getByText('Sign out', { exact: true });
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }

  async login(user: UserCredentials): Promise<void> {
    await this.emailInput.fill(user.username);
    await this.continueBtn.click();
    await this.passwordInput.fill(user.password);
    await this.continueBtn.click();
    if (user.sessionFile) await this.saveSession(user);
  }

  async logout(): Promise<void> {
    await  this.signOut.click();
  }

  private async saveSession(user: UserCredentials) {
    await this.page.context().storageState({ path: user.sessionFile });
  }
}
