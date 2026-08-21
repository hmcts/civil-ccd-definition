import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const gaHearingNoticeApplication = {
  gaHearingNoticeApplication: z.looseObject({
    hearingNoticeApplicationDetail: nonEmptyString,
    hearingNoticeApplicationType: nonEmptyString,
    hearingNoticeApplicationDate: nonEmptyString,
  }),
};

const gaHearingNoticeDetail = {
  gaHearingNoticeDetail: z.looseObject({
    hearingLocation: z.looseObject({
    }),
    channel: nonEmptyString,
    hearingDate: nonEmptyString,
    hearingTimeHourMinute: nonEmptyString,
    hearingDuration: nonEmptyString,
  }),
};

const gaHearingNoticeInformation = {
  gaHearingNoticeInformation: nonEmptyString,
};

const hearingScheduledGa = {
  ...gaHearingNoticeApplication,
  ...gaHearingNoticeDetail,
  ...gaHearingNoticeInformation,
};

export default {
  gaHearingNoticeApplication,
  gaHearingNoticeDetail,
  gaHearingNoticeInformation,
  hearingScheduledGa,
};
