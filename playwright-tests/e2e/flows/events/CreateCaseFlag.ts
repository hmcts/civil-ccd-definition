import { expect, Locator, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { CaseFlagType } from '../caseFlags/caseFlagTypes.ts';

export interface CreateCaseFlagAnswers {
  // The language for a Language Interpreter or Sign Language Interpreter flag, as the list offers it
  language?: string;
  // The flag type an "Other" flag is, in the court's words
  otherDescription?: string;
  comment: string;
}

// Court staff adding a case flag (event CREATE_CASE_FLAGS, "Create case flags"), one flag per event. XUI's flag
// component asks where the flag goes (the case or one of its parties, experts or witnesses), then the flag type one
// level at a time, then a language where the type needs one, then comments, and shows check your answers.
//
// The component's own pages all have the event page's URL and send nothing to CCD, so moving between them is checked by
// the next page's content. Only Continue on the comments page goes to CCD.
export class CreateCaseFlag {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  // holderLabel: the location as the first page lists it, e.g. "Mrs Defendant1_firstname Defendant1_lastname
  // (Defendant 1)" or "Case level" (see caseFlagHolders.ts)
  async submit(holderLabel: string, flagType: CaseFlagType, answers: CreateCaseFlagAnswers) {
    await this.pageHelper.selectNextStep('Create case flags');
    const main = this.page.locator('main');
    const languageBox = main.locator('input[type="text"]:visible').first();
    const comments = main.locator('#flagComments');

    // Where should this flag be added?
    await this.choose(holderLabel, main.getByLabel(flagType.path[0], { exact: true }));

    // The flag type, one page per level, e.g. Reasonable adjustment > I need help communicating and understanding >
    // Hearing Enhancement System > Hearing loop. Only the current page's radios are shown, so a label such as "Other"
    // that is on many levels picks the right one.
    for (const [level, label] of flagType.path.entries()) {
      const isLast = level === flagType.path.length - 1;
      const next = !isLast ? main.getByLabel(flagType.path[level + 1], { exact: true }) : flagType.hasListOfValues ? languageBox : comments;
      if (isLast && flagType.code === 'OT0001') {
        // Choosing "Other" shows a box for the flag type under it, on the same page
        await main.getByLabel(label, { exact: true }).check();
        await main.locator('#other-flag-type-description').fill(answers.otherDescription ?? 'Other flag added by the unspecified journey');
        await this.continueTo(next);
      } else {
        await this.choose(label, next);
      }
    }

    if (flagType.hasListOfValues) {
      // A type-ahead of languages (or sign languages): type part of the name and pick it from the list
      const language = answers.language ?? (flagType.code === 'RA0042' ? 'British Sign Language (BSL)' : 'Welsh');
      await languageBox.fill(language);
      await this.page.getByRole('option', { name: language, exact: true }).click();
      await this.continueTo(comments);
    }

    // Comments, which some flag types require; Continue here goes to CCD and on to check your answers
    await comments.fill(answers.comment);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit, which goes back to the case
    await expect(main.getByText(flagType.name, { exact: false }).first()).toBeVisible();
    await this.pageHelper.submitEvent();
    await this.page.waitForURL((url) => !url.pathname.includes('/trigger/'));
  }

  // Picks a radio on the current page by its label and continues to the page showing next
  private async choose(label: string, next: Locator) {
    await this.page.locator('main').getByLabel(label, { exact: true }).check();
    await this.continueTo(next);
  }

  private async continueTo(next: Locator) {
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await next.waitFor({ state: 'visible' });
  }
}
