import { expect } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import yesNo from '../../enums/yesNo.ts';
import * as ui from '../flows/events/ui/index.ts';
import * as api from '../flows/events/api/index.ts';
import {
  expectedRepliedMessage,
  expectedSentMessage,
  messageToSend,
  replyTo,
} from '../flows/events/shared_api_ui/sendAndReplySpecs.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The steps for SEND_AND_REPLY=Yes, in group SEND_AND_REPLY: the hearing centre admin sends a district judge a message
// with "Send and reply to messages", then the judge replies. Each is checked on the case's messages, and the claim stays
// in stateDuring: JUDICIAL_REFERRAL once the claimant has responded, or CASE_STAYED where the case is stayed
// (STAY_CASE=Yes), as playwright-e2e does. skipIf are the journey's reasons the claim does not get there. Without
// SEND_AND_REPLY the journey still lists one SEND_AND_REPLY step, skipped with the reason.
export function sendAndReplySteps(
  c: { sendAndReply: yesNo },
  ctx: JourneyContext,
  stateDuring: caseStates,
  skipIf: Array<[boolean, string]>,
): JourneyStep[] {
  const off: [boolean, string] = [c.sendAndReply !== yesNo.YES, 'Sending messages is switched off (set SEND_AND_REPLY=Yes to run it)'];
  if (c.sendAndReply !== yesNo.YES) {
    return [{ name: 'SEND_AND_REPLY', title: 'Court staff and a judge send each other messages.', user: 'hearingCentreAdmin', skipIf: [off], run: async () => {} }];
  }
  const message = messageToSend();
  const reply = replyTo(message);

  // The case's message with this run's subject
  async function savedMessage() {
    const messages: Array<{ value: Record<string, any> }> = (await ctx.testingEndpointHelper.getCaseData(ctx.caseId)).messages ?? [];
    const saved = messages.find((element) => element.value.subject === message.subject);
    expect(saved, `No message with the subject "${message.subject}" was saved on the case`).toBeDefined();
    return saved.value;
  }

  return [
    {
      name: 'SEND_MESSAGE',
      group: 'SEND_AND_REPLY',
      title: 'Hearing Centre Admin sends a district judge a message.',
      user: 'hearingCentreAdmin',
      skipIf,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new api.SendAndReply().send(ctx.caseId, message);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ui.SendAndReply(page).send(message);
          });
        }
        expect(await savedMessage()).toMatchObject(expectedSentMessage(message));
        await ctx.assertCaseState(stateDuring);
      },
    },
    {
      name: 'REPLY_TO_MESSAGE',
      group: 'SEND_AND_REPLY',
      title: 'Judge replies to the message.',
      user: 'judge',
      skipIf,
      run: async ({ page, storageState }) => {
        if (ctx.useApi()) {
          await new api.SendAndReply().reply(ctx.caseId, reply);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            await new ui.SendAndReply(page).reply(reply);
          });
        }
        expect(await savedMessage()).toMatchObject(expectedRepliedMessage(message, reply));
        await ctx.assertCaseState(stateDuring);
      },
    },
  ];
}
