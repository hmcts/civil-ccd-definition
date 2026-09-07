import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const queryCollection = (collectionField = 'queries') => ({
  [collectionField]: z.looseObject({
    partyName: nonEmptyString,
    caseMessages: z.array(z.looseObject({})).min(1),
  }),
});

const qmLatestQuery = {
  qmLatestQuery: z.looseObject({
    isWelsh: z.string().optional(),
    queryId: nonEmptyString,
    isHearingRelated: z.string(),
  }).optional(),
};

export default {
  queryCollection,
  qmLatestQuery,
};
