import HearingNoticeScenario from '../../../constants/hearings/hearing-notice-scenario';
import DateHelper from '../../../helpers/date-helper';

const changedSchedule = () => {
  const hearingStart = DateHelper.addToToday({ years: 1 });
  hearingStart.setUTCHours(9, 0, 0, 0);

  const hearingEnd = DateHelper.addToToday({ years: 1 });
  hearingEnd.setUTCHours(16, 0, 0, 0);

  return {
    hearingStartDateTime: hearingStart.toISOString(),
    hearingEndDateTime: hearingEnd.toISOString(),
    hearingVenueId: '000000',
  };
};

const serviceData = (schedule: {
  hearingVenueId: string;
  hearingStartDateTime: string;
  hearingEndDateTime: string;
}) => ({
  hearingNoticeGenerated: true,
  hearingLocation: schedule.hearingVenueId,
  days: [
    {
      hearingStartDateTime: schedule.hearingStartDateTime,
      hearingEndDateTime: schedule.hearingEndDateTime,
    },
  ],
});

const currentVersionNotifiedResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if (hearingNoticeScenario === HearingNoticeScenario.SKIP_NOTICE_CURRENT_VERSION_NOTIFIED ||
      hearingNoticeScenario === HearingNoticeScenario.AVOID_DUPLICATE_NOTICE_WITHOUT_GENERATING_NOTICE
  )
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion,
      responseReceivedDateTime: listedHearing.hearingResponse.receivedDateTime,
      serviceData: serviceData(listedHearing.hearingResponse.hearingDaySchedule[0]),
    };

  return {};
};

const pastResponseReceivedNotifiedResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if (hearingNoticeScenario === HearingNoticeScenario.ACKNOWLEDGE_HEARING_WITHOUT_NOTICE )
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion,
      responseReceivedDateTime: DateHelper.subtractFromDate(listedHearing.hearingResponse.receivedDateTime, { days: 1 }).toISOString(),
      serviceData: serviceData(listedHearing.hearingResponse.hearingDaySchedule[0]),
    };

  return {};
};

const currentVersionChangedScheduleResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if(hearingNoticeScenario === HearingNoticeScenario.NOTIFY_CURRENT_VERSION_MULTI_HMC_RESPONSES) {
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion,
      responseReceivedDateTime: DateHelper.subtractFromDate(listedHearing.hearingResponse.receivedDateTime, { days: 1 }).toISOString(),
      serviceData: serviceData(changedSchedule()),
    };
  }
  return {};
};

const previousVersionChangedScheduleResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if(hearingNoticeScenario === HearingNoticeScenario.NOTIFY_CURRENT_VERSION_MULTI_HMC_RESPONSES) {
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion - 1,
      responseReceivedDateTime: DateHelper.addToDate(listedHearing.hearingResponse.receivedDateTime, { days: 1 }).toISOString(),
      serviceData: serviceData(changedSchedule()),
    };
  }
  return {};
};

const oldVersionChangedScheduleResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if(hearingNoticeScenario === HearingNoticeScenario.GENERATE_NOTICE_RELISTED_VERSION) {
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion - 1,
      responseReceivedDateTime: DateHelper.subtractFromDate(listedHearing.hearingResponse.receivedDateTime, { days: 1 }).toISOString(),
      serviceData: serviceData(changedSchedule()),
    };
  }
  return {};
};

const newVersionChangedScheduleResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if(hearingNoticeScenario === HearingNoticeScenario.NOTIFY_CURRENT_VERSION_MULTI_HMC_RESPONSES) {
    return {
      requestVersion: listedHearing.hearingResponse.requestVersion + 1,
      responseReceivedDateTime: DateHelper.subtractFromDate(listedHearing.hearingResponse.receivedDateTime, { days: 1 }).toISOString(),
      serviceData: serviceData(changedSchedule()),
    };
  }

  return {};
};

const partialChangedScheduleResponse = (hearingNoticeScenario: HearingNoticeScenario, listedHearing: Record<string, any>) => {
  if(hearingNoticeScenario === HearingNoticeScenario.GENERATE_NOTICE_PARTIAL_HMC_RESPONSE) {
    return {
      responseReceivedDateTime: null,
      serviceData: serviceData(changedSchedule()),
    };
  }
  return {};
};

export default {
  currentVersionChangedScheduleResponse,
  currentVersionNotifiedResponse,
  oldVersionChangedScheduleResponse,
  newVersionChangedScheduleResponse,
  pastResponseReceivedNotifiedResponse,
  previousVersionChangedScheduleResponse,
  partialChangedScheduleResponse
};
