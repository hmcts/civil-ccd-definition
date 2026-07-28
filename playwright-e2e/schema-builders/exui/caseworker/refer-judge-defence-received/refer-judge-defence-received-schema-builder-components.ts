import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const referJudgeDefenceReceived = {
  confirmReferToJudgeDefenceReceived: z.array(nonEmptyString).min(1),
};

const referJudgeDefenceReceivedSchemaBuilderComponents = {
  referJudgeDefenceReceived,
};

export default referJudgeDefenceReceivedSchemaBuilderComponents;
