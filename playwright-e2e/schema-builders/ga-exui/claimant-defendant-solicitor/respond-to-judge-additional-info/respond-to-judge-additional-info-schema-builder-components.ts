import { z } from 'zod';

const generalAppAddlnInfoUpload = () => ({
  gaAddlDocRespondentSol: z.array(z.looseObject({})).min(1),
  gaAddlDoc: z.array(z.looseObject({})).min(1),
  gaAddlDocStaff: z.array(z.looseObject({})).min(1),
});

export default {
  generalAppAddlnInfoUpload,
};
