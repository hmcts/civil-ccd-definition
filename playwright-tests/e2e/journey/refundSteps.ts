import { expect } from '@playwright/test';
import { sessionUsers } from '../../helpers/SessionHelper.ts';
import { PaymentHelper } from '../../helpers/PaymentHelper.ts';
import { Refund } from '../flows/events/ui/Refund.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// What the refund approver does with the refund (REFUND): approve it, reject it, or return it to the claimant's solicitor,
// who changes the reason and sends it again, after which it is approved
export const refundOutcomes = ['APPROVE', 'REJECT', 'RETURN'] as const;
export type RefundOutcome = typeof refundOutcomes[number];

// The parts of a journey's settings that a refund uses
export interface RefundClaim {
  // REFUND: what the approver does, or undefined when there is no refund
  refundSetting?: string;
  // REFUND_AFTER: the step the refund follows
  refundAfter: string;
}

// Why the REFUND setting cannot be used, or undefined when it can. Where it goes (REFUND_AFTER) is checked by
// withRefund, which has the journey's steps.
export function refundProblem(c: RefundClaim): string | undefined {
  if (c.refundSetting === undefined || (refundOutcomes as readonly string[]).includes(c.refundSetting)) {
    return undefined;
  }
  return `Invalid REFUND value: ${c.refundSetting}. It must be one of ${refundOutcomes.join(', ')}.`;
}

// Adds a refund to a journey's steps, after the REFUND_AFTER step, in group REFUND. Refunds are not a CCD event: they
// are XUI's payment screens, backed by the payment and refunds services. A refund needs a payment to refund, so the
// claimant's solicitor first pays the claim fee a second time, through the payment API (REFUND_OVERPAYMENT). They then
// ask for it back from the Service Request tab (REFUND_REQUEST), and the refund approver deals with it from the refund
// list. On AAT the claimant's solicitor has the refund requester roles (payments-refund) and Defendant 1's solicitor the
// approver roles (payments-refund-approver), so the approver is Respondent1 Solicitor. A refund does not change the
// claim's state. The steps always use the UI, like paying the hearing fee, apart from the overpayment. Without REFUND
// the journey still lists one REFUND step, skipped with the reason, as it does for other switched-off steps.
export function withRefund(c: RefundClaim, ctx: JourneyContext, steps: JourneyStep[]): JourneyStep[] {
  const outcome = c.refundSetting as RefundOutcome | undefined;
  const anchorIndex = steps.findIndex((step) => step.name === c.refundAfter);
  const anchor = steps[anchorIndex];
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    name: 'REFUND', title: 'The claimant\'s solicitor asks for a refund of an overpayment.', user: 'claimantSolicitor', skipIf, invalidIf, run: async () => {},
  });

  if (anchor === undefined || anchor.closesClaim) {
    const problem = `Invalid REFUND_AFTER value: ${c.refundAfter}. It must be a step that does not close the claim: ${steps.filter((step) => !step.closesClaim).map((step) => step.name).join(', ')}.`;
    const lastIndex = steps.findIndex((step) => step.closesClaim);
    const at = lastIndex === -1 ? steps.length : lastIndex;
    return [...steps.slice(0, at), placeholder([[true, problem]], () => [[outcome !== undefined, problem]]), ...steps.slice(at)];
  }
  if (outcome === undefined) {
    const off: [boolean, string] = [true, 'Refunds are switched off (set REFUND to APPROVE, REJECT or RETURN to run one)'];
    return [...steps.slice(0, anchorIndex + 1), placeholder([off]), ...steps.slice(anchorIndex + 1)];
  }
  return [...steps.slice(0, anchorIndex + 1), ...refundSteps(ctx, outcome, anchor), ...steps.slice(anchorIndex + 1)];
}

function refundSteps(ctx: JourneyContext, outcome: RefundOutcome, anchor: JourneyStep): JourneyStep[] {
  const approver = sessionUsers.respondent1Solicitor.credentials.name;
  const returned = outcome === 'RETURN';
  const notReturned: [boolean, string] = [!returned, `Skipping as the approver does not return the refund (REFUND=${outcome})`];
  // The refund's reference (RF-....), once it has been asked for
  let refundReference: string | undefined;
  const requested = () => {
    expect(refundReference, 'No refund has been asked for').toBeDefined();
    return refundReference;
  };
  // The claim stays where the step the refund follows left it
  const claimStateUnchanged = async () => {
    if (ctx.lastStateReached !== undefined) {
      await ctx.assertCaseState(ctx.lastStateReached);
    }
  };

  return [
    {
      name: 'REFUND_OVERPAYMENT',
      group: 'REFUND',
      title: 'Claimant Solicitor pays the claim fee a second time, so it can be refunded.',
      user: 'claimantSolicitor',
      skipIf: anchor.skipIf,
      run: async ({ user }) => {
        const { claimFee } = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(claimFee?.code, `Case ${ctx.caseId} has no claim fee to pay again`).toBeTruthy();
        await new PaymentHelper().makeRefundableOverpayment(sessionUsers[user].credentials, ctx.caseId, claimFee);
        await claimStateUnchanged();
      },
    },
    {
      name: 'REFUND_REQUEST',
      group: 'REFUND',
      title: 'Claimant Solicitor asks for the overpayment to be refunded.',
      user: 'claimantSolicitor',
      skipIf: anchor.skipIf,
      run: async ({ page, storageState }) => {
        await ctx.runEvent(page, storageState, async () => {
          refundReference = await new Refund(page).request(ctx.caseId);
        });
        await claimStateUnchanged();
      },
    },
    {
      name: 'REFUND_RETURN',
      group: 'REFUND',
      title: `Refund approver (${approver}) returns the refund to the claimant's solicitor.`,
      user: 'respondent1Solicitor',
      skipIf: [...(anchor.skipIf ?? []), notReturned],
      run: async ({ page, storageState }) => {
        const reference = requested();
        await ctx.runEvent(page, storageState, async () => {
          await new Refund(page).process(ctx.caseId, reference, 'RETURN');
        });
        await claimStateUnchanged();
      },
    },
    {
      name: 'REFUND_RESUBMIT',
      group: 'REFUND',
      title: 'Claimant Solicitor changes the returned refund\'s reason and sends it again.',
      user: 'claimantSolicitor',
      skipIf: [...(anchor.skipIf ?? []), notReturned],
      run: async ({ page, storageState }) => {
        const reference = requested();
        await ctx.runEvent(page, storageState, async () => {
          await new Refund(page).resubmit(ctx.caseId, reference);
        });
        await claimStateUnchanged();
      },
    },
    {
      name: 'REFUND_DECISION',
      group: 'REFUND',
      title: `Refund approver (${approver}) ${outcome === 'REJECT' ? 'rejects' : 'approves'} the refund.`,
      user: 'respondent1Solicitor',
      skipIf: anchor.skipIf,
      run: async ({ page, storageState }) => {
        const reference = requested();
        await ctx.runEvent(page, storageState, async () => {
          await new Refund(page).process(ctx.caseId, reference, outcome === 'REJECT' ? 'REJECT' : 'APPROVE');
        });
        await claimStateUnchanged();
      },
    },
  ];
}
