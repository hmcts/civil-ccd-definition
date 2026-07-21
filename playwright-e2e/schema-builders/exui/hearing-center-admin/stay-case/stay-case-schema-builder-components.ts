import { z } from 'zod';

const stayCase = {
  caseStayDate: z.string()
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
