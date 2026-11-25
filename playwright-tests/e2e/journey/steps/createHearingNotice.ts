import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import yesNo from '../../../enums/yesNo.ts';
import { runHearingNoticeScheduler } from '../hearingNoticeScheduler.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The hearing centre admin lists the trial once the evidence is in, or a small claim's hearing once its order is
// made. This is done in place of HMC returning a LISTED hearing, and moves the claim to HEARING_READINESS for the
// hearing fee. With HEARING_NOTICE_SCHEDULER=Yes on a civil-service PR preview, HMC (WireMock) lists it and
// civil-service's scheduler sends the notice instead (see ../hearingNoticeScheduler.ts).
export function createHearingNotice(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  const scheduled = () => c.hearingNoticeScheduler === yesNo.YES && api.AutomatedHearingNotice.isAvailable();
  return {
    name: 'CREATE_HEARING_NOTICE',
    title: scheduled()
      ? 'HMC lists the trial and the automated hearing notice scheduler sends the hearing notice.'
      : 'Hearing Centre Admin creates a hearing notice.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesCaseProgression],
    run: async ({ page, storageState }) => {
      if (scheduled()) {
        await runHearingNoticeScheduler(ctx, c.caseType === 'SPECIFIED' ? 'spec' : 'unspec', c.sdoTrack);
        return;
      }
      if (c.hearingNoticeScheduler === yesNo.YES) {
        console.warn('WARNING: HEARING_NOTICE_SCHEDULER=Yes needs a civil-service PR preview (ENV=preview PREVIEW_SERVICE=service), where HMC is WireMock. The hearing centre admin creates the hearing notice instead.');
      }
      await ctx.submitEvent(page, storageState, {
        api: () => new api.CreateHearingNotice().submit(ctx.caseId, c.sdoTrack),
        ui: () => new ui.CreateHearingNotice(page).submit(c.sdoTrack),
        expectState: caseStates.HEARING_READINESS,
      });
    },
  };
}
