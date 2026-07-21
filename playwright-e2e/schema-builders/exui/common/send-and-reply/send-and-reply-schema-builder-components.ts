import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const messages = () => {
  return {
    messages: z.array(
      z.object({
        id: nonEmptyString,
        value: z.looseObject({
        }),
      }),
    ).min(1),
  };
};

const lastMessage = {
  lastMessage: z.looseObject({}),
};

const ignore = {
  messagesToReplyTo: z.any().optional(),
  sendMessageContent: z.any().optional(),
}

export default {
  messages,
  lastMessage,
  ignore
};
