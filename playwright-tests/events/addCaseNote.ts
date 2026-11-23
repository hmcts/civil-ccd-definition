import { expect } from '@playwright/test';
import { event } from '../e2e/journey/event.ts';
import { AddCaseNote } from '../e2e/flows/events/ui/AddCaseNote.ts';
import { AddCaseNote as AddCaseNoteApi } from '../e2e/flows/events/api/AddCaseNote.ts';

// Court staff can add a case note in any state, so it is added as early as possible: straight after the claim is
// issued. civil-service puts it at the top of the case's notes.
export default event({
  id: 'ADD_CASE_NOTE',
  title: 'Hearing Centre Admin adds a case note.',
  description: {
    SPECIFIED: 'Optional step: the hearing centre admin adds a case note after the claim is issued.',
    UNSPECIFIED: 'Optional event: Hearing Centre Admin adds a case note after the claim is issued.',
  },
  user: 'hearingCentreAdmin',
  after: { SPECIFIED: 'CREATE_CLAIM', UNSPECIFIED: 'CREATE_CLAIM' },
  answers: (claim) => ({
    note: `Case note added by the ${claim.caseType === 'SPECIFIED' ? 'specified' : 'unspecified'} journey at ${new Date().toISOString()}`,
  }),
  ui: ({ page, answers }) => new AddCaseNote(page).submit(answers.note),
  api: ({ caseId, answers }) => new AddCaseNoteApi().submit(caseId, answers.note),
  expect: { businessProcess: 'ADD_CASE_NOTE' },
  check: async ({ caseData, page, inUi, answers }) => {
    const notes = (caseData.caseNotes ?? []).map((entry: { value?: { note?: string } }) => entry.value?.note);
    expect(notes, 'The case note was not saved').toContain(answers.note);
    if (inUi) {
      await new AddCaseNote(page).verifyNoteShown(answers.note);
    }
  },
});
