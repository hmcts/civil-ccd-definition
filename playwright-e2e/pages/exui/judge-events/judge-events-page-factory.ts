import BasePageFactory from '../../../base/base-page-factory';
import AddCaseNotesJudgeSelectionPage from './add-case-notes-judge/add-case-notes-judge-selection/add-case-notes-judge-selection-page';
import AddCaseNotesJudgeSelectionNotePage from './add-case-notes-judge/add-case-notes-judge-selectionNote/add-case-notes-judge-selectionNote-page';
import AddCaseNotesJudgeSelectionDocumentWithNotePage from './add-case-notes-judge/add-case-notes-judge-selectionDocumentWithNote/add-case-notes-judge-selectionDocumentWithNote-page';
import AddCaseNotesJudgeSelectionDocumentPage from './add-case-notes-judge/add-case-notes-judge-selectionDocument/add-case-notes-judge-selectionDocument-page';
import AddCaseNotesJudgeSubmitPage from './add-case-notes-judge/add-case-notes-judge-submit/add-case-notes-judge-submit-page';
import AddCaseNotesJudgeConfirmPage from './add-case-notes-judge/add-case-notes-judge-confirm/add-case-notes-judge-confirm-page';

export default class JudgeEventsPageFactory extends BasePageFactory {
  get addCaseNotesJudgeSelectionPage() {
    return new AddCaseNotesJudgeSelectionPage(this.page);
  }

  get addCaseNotesJudgeSelectionNotePage() {
    return new AddCaseNotesJudgeSelectionNotePage(this.page);
  }

  get addCaseNotesJudgeSelectionDocumentWithNotePage() {
    return new AddCaseNotesJudgeSelectionDocumentWithNotePage(this.page);
  }

  get addCaseNotesJudgeSelectionDocumentPage() {
    return new AddCaseNotesJudgeSelectionDocumentPage(this.page);
  }

  get addCaseNotesJudgeSubmitPage() {
    return new AddCaseNotesJudgeSubmitPage(this.page);
  }

  get addCaseNotesJudgeConfirmPage() {
    return new AddCaseNotesJudgeConfirmPage(this.page);
  }
}
