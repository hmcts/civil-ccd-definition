import { Page } from "@playwright/test";

export interface UserCredentials {
  username: string;
  password: string;
  sessionFile?: string;
  cookieName?: string;
}
export class IdamPage {
  constructor(public page: Page) {}

  readonly heading = this.page.getByRole("heading", {
    name: "Sign in or create an account",
  });

  readonly signOut = this.page.getByText('Sign out', { exact: true });
  readonly emailInput = this.page.locator("#email");
  readonly passwordInput = this.page.locator("#password");
  readonly continueBtn = this.page.getByRole("button", { name: "Continue" });

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
