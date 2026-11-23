import { expect } from '@playwright/test';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import yesNo from '../../../enums/yesNo.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Adding a case note, done as early as possible: court staff can add one in any state, so straight after the claim
// is issued. Only run with ADD_CASE_NOTE=Yes (default No).
export function addCaseNote(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  const specified = c.caseType === 'SPECIFIED';
  return {
    name: 'ADD_CASE_NOTE',
    title: 'Hearing Centre Admin adds a case note.',
    user: 'hearingCentreAdmin',
    skipIf: [[c.addCaseNote !== yesNo.YES, 'Adding a case note is switched off (set ADD_CASE_NOTE=Yes to run it)']],
    run: async ({ page, storageState }) => {
      const note = `Case note added by the ${specified ? 'specified' : 'unspecified'} journey at ${new Date().toISOString()}`;
      const caseNote = new ui.AddCaseNote(page);
      if (ctx.useApi()) {
        await new api.AddCaseNote().submit(ctx.caseId, note);
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'ADD_CASE_NOTE');
        // The case page was opened before the note was added, so the saved notes are checked instead of the Notes tab
        const notes = (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).caseNotes ?? [];
        expect(notes.map((entry) => entry.value?.note), 'The case note was not saved').toContain(note);
      } else {
        await ctx.runEvent(page, storageState, async () => {
          await caseNote.submit(note);
        });
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'ADD_CASE_NOTE');
        await caseNote.verifyNoteShown(note);
      }
      // A case note does not change the claim's state: a specified claim is waiting for the defendants' responses, an
      // unspecified one for Notify claim
      await ctx.assertCaseState(specified ? caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT : caseStates.CASE_ISSUED);
    },
  };
}
