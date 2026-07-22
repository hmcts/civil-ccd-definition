import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const stayCase = {
  caseStayDate: nonEmptyString
}

const undefine = {
  hearingDate: z.undefined().optional(),
  channel: z.undefined().optional(),
  hearingNoticeList: z.undefined().optional(),
  information: z.undefined().optional(),
  hearingLocation: z.undefined().optional(),
  hearingDueDate: z.undefined().optional(),
  hearingDuration: z.undefined().optional(),
  hearingTimeHourMinute: z.undefined().optional(),
  listingOrRelisting: z.undefined().optional(),
};

export default {
  stayCase,
  undefine
};
