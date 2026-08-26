import preferredCourts from '../../../../config/preferred-courts';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';

const selectedHearingLocation = CaseDataHelper.setCodeToData(
  preferredCourts[partys.DEFENDANT_SOLICITOR_1.key].default,
);

const gaHearingNoticeApplication = {
  gaHearingNoticeApplication: {
    hearingNoticeApplicationDetail: 'CLAIMANT_AND_DEFENDANT',
    hearingNoticeApplicationType: 'Application type',
    hearingNoticeApplicationDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({ days: 1 }), {
      outputFormat: 'YYYY-MM-DD',
    }),
  },
};

const gaHearingNoticeDetail = {
  gaHearingNoticeDetail: {
    hearingLocation: {
      value: selectedHearingLocation,
      list_items: [selectedHearingLocation],
    },
    channel: 'VIDEO',
    hearingDate: DateHelper.formatDateToString(DateHelper.addToToday({ days: 1 }), {
      outputFormat: 'YYYY-MM-DD',
    }),
    hearingTimeHourMinute: '0800',
    hearingDuration: 'MINUTES_25',
  },
};

const gaHearingNoticeInformation = {
  gaHearingNoticeInformation: 'Hearing notice information'
}

const hearingScheduledGaDataBuilderComponents = {
  gaHearingNoticeApplication,
  gaHearingNoticeDetail,
  gaHearingNoticeInformation,
};

export default hearingScheduledGaDataBuilderComponents
