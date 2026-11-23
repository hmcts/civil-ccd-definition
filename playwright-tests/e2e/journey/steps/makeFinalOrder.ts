import { expect } from '@playwright/test';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import caseStates from '../../../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The judge's final order after the hearing, chosen with FINAL_ORDER: a free form or assisted order on the small
// claims and fast tracks, an order uploaded from a template on the intermediate and multi tracks. None of them,
// without a further hearing, changes the claim's state. The order's notifications are sent by the
// GENERATE_ORDER_NOTIFICATION business process.
export function makeFinalOrder(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'MAKE_FINAL_ORDER',
    title: `Judge makes a final order (${c.finalOrder}).`,
    user: 'judge',
    needs: [c.facts.reachesCaseProgression],
    run: async ({ page, storageState }) => {
      const ordersBefore = await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.MakeFinalOrder().submit(ctx.caseId, c.finalOrder),
        ui: () => new ui.MakeFinalOrder(page).submit(c.finalOrder),
        businessProcess: 'GENERATE_ORDER_NOTIFICATION',
      });
      expect(await ctx.testingEndpointHelper.countFinalOrders(ctx.caseId), 'The final order was not added to the case').toBe(ordersBefore + 1);
      await ctx.assertCaseState(caseStates.DECISION_OUTCOME);
    },
  };
}
