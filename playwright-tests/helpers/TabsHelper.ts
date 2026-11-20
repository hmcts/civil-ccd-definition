import { Page } from "@playwright/test";

export class TabsHelper {

    constructor(public page: Page) {}

    async selectTab(tabName: string) {
        await this.page.getByRole('tab', { name: `${tabName}`}).click();
   }
}