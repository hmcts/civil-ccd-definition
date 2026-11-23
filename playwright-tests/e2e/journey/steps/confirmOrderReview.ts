import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// Court staff review the judge's order ("Order Made - Review case"). Confirming it is a final order, with no
// obligation date and nothing left to do, closes the claim on any track: it moves to All_FINAL_ORDERS_ISSUED and the
// CONFIRM_ORDER_REVIEW_FINAL_ORDER business process runs.
export function confirmOrderReview(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'CONFIRM_ORDER_REVIEW',
    title: 'Hearing Centre Admin confirms the order review.',
    user: 'hearingCentreAdmin',
    needs: [c.facts.reachesCaseProgression],
    run: async ({ page, storageState }) => {
      await ctx.submitEvent(page, storageState, {
        api: () => new api.ConfirmOrderReview().submit(ctx.caseId),
        ui: () => new ui.ConfirmOrderReview(page).submit(),
        businessProcess: 'CONFIRM_ORDER_REVIEW_FINAL_ORDER',
        expectState: caseStates.All_FINAL_ORDERS_ISSUED,
      });
    },
  };
}
