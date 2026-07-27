import preferredCourts from '../../../../config/preferred-courts';
import SdoDJType from '../../../../constants/ccd-events/sdo-dj/sdo-dj-type';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const claimantDefaultCourt = () =>
  CaseDataHelper.setCodeToData(preferredCourts[partys.CLAIMANT_1.key].default);

const hearingMethodInPerson = () => CaseDataHelper.setCodeToData('In Person');

const caseManagementOrder = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING)
    return {
      CaseManagementOrder: {
        caseManagementOrderSelection: sdoDJType,
      },
    };

  if (sdoDJType === SdoDJType.TRIAL)
    return {
      CaseManagementOrder: {
        caseManagementOrderSelection: sdoDJType,
        caseManagementOrderAdditional: [
          'OrderTypeTrialAdditionalDirectionsBuildingDispute',
          'OrderTypeTrialAdditionalDirectionsClinicalNegligence',
          'OrderTypeTrialAdditionalDirectionsCreditHire',
          'OrderTypeTrialAdditionalDirectionsEmployersLiability',
          'OrderTypeTrialAdditionalDirectionsHousingDisrepair',
          'OrderTypeTrialAdditionalDirectionsPPI',
          'OrderTypeTrialAdditionalDirectionsPersonalInjury',
          'OrderTypeTrialAdditionalDirectionsRoadTrafficAccident',
        ],
      },
    };

  return {};
};

const disposalHearing = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.DISPOSAL_HEARING)
    return {
      DisposalHearing: {
        disposalHearingJudgesRecitalDJ: {
          input: 'string',
          judgeNameTitle: 'string',
        },
        disposalHearingDisclosureOfDocumentsDJ: {
          input: 'string',
          date: formatDate(DateHelper.addToToday({ days: 28 })),
        },
        disposalHearingWitnessOfFactDJ: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 28 })),
          input2: 'string',
          input3: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 63 })),
          input4: 'string',
        },
        disposalHearingMedicalEvidenceDJ: {
          input1: 'string',
        },
        disposalHearingQuestionsToExpertsDJ: {
          date: formatDate(DateHelper.addToToday({ days: 42 })),
        },
        disposalHearingSchedulesOfLossDJ: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 56 })),
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 70 })),
          input3: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 70 })),
          inputText4: 'string',
        },
        disposalHearingFinalDisposalHearingTimeDJ: {
          input: 'string',
          date: formatDate(DateHelper.addToToday({ days: 84 })),
          time: 'THIRTY_MINUTES',
        },
        hearingMethodValuesDisposalHearingDJ: {
          list_items: [hearingMethodInPerson()],
          value: hearingMethodInPerson(),
        },
        disposalHearingMethodInPersonDJ: {
          list_items: [claimantDefaultCourt()],
          value: claimantDefaultCourt(),
        },
        disposalHearingHearingNotesDJ: {
          input: 'string',
        },
        sdoR2DisposalHearingWelshLanguageDJ: {
          description: 'string',
        },
        disposalHearingOrderMadeWithoutHearingDJ: {
          input: 'string',
        },
        disposalHearingAddNewDirectionsDJ: [
          CaseDataHelper.setIdToData({
            directionComment: 'string',
          }),
        ],
      },
    };

  return {};
};

const trailHearing = (sdoDJType: SdoDJType) => {
  if (sdoDJType === SdoDJType.TRIAL) {
    return {
      TrailHearing: {
        trialHearingJudgesRecitalDJ: {
          input: 'string',
          judgeNameTitle: 'string',
        },
        trialHearingDisclosureOfDocumentsDJ: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 14 })),
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 21 })),
          input3: 'string',
        },
        trialHearingWitnessOfFactDJ: {
          input1: 'string',
          input2: '3',
          input3: '3',
          input4: 'string',
          input5: 'string',
          input6: '10',
          input7: 'string',
          input8: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 35 })),
          input9: 'string',
        },
        trialHearingSchedulesOfLossDJ: {
          input1: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 84 })),
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 98 })),
          input3: 'string',
        },
        trialHearingTimeDJ: {
          date1: formatDate(DateHelper.addToToday({ days: 140 })),
          date2: formatDate(DateHelper.addToToday({ days: 203 })),
          hearingTimeEstimate: 'ONE_HOUR',
          helpText1: 'string',
          helpText2: 'string',
        },
        hearingMethodValuesTrialHearingDJ: {
          list_items: [hearingMethodInPerson()],
          value: hearingMethodInPerson(),
        },
        trialHearingMethodInPersonDJ: {
          list_items: [claimantDefaultCourt()],
          value: claimantDefaultCourt(),
        },
        trialHearingHearingNotesDJ: {
          input: 'string',
        },
        sdoR2TrialWelshLanguageDJ: {
          description: 'string',
        },
        trialOrderMadeWithoutHearingDJ: {
          input: 'string',
        },
        trialBuildingDispute: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 70 })),
          input4: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 84 })),
        },
        trialClinicalNegligence: {
          input1: 'string',
          input2: 'string',
          input3: 'string',
          input4: 'string',
        },
        sdoDJR2TrialCreditHire: {
          input1: 'string',
          input6: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 84 })),
          input7: 'string',
          date4: formatDate(DateHelper.addToToday({ days: 98 })),
          input8: 'string',
          sdoDJR2TrialCreditHireDetails: {
            input2: 'string',
            input4: 'string',
            input5: 'string',
            date2: formatDate(DateHelper.addToToday({ days: 42 })),
          },
        },
        trialHousingDisrepair: {
          clauseA: 'string',
          clauseB: 'string',
          firstReportDateBy: formatDate(DateHelper.addToToday({ days: 28 })),
          clauseCBeforeDate: 'string',
          jointStatementDateBy: formatDate(DateHelper.addToToday({ days: 56 })),
          clauseCAfterDate: 'string',
          clauseD: 'string',
          clauseE: 'string',
        },
        trialPPI: {
          ppiDate: formatDate(DateHelper.addToToday({ days: 28 })),
          text: 'string',
        },
        trialPersonalInjury: {
          input1: 'string',
          input2: 'string',
          date2: formatDate(DateHelper.addToToday({ days: 49 })),
          input3: 'string',
          date3: formatDate(DateHelper.addToToday({ days: 63 })),
          input4: 'string',
          date4: formatDate(DateHelper.addToToday({ days: 70 })),
        },
        trialRoadTrafficAccident: {
          input: 'string',
          date1: formatDate(DateHelper.addToToday({ days: 28 })),
        },
        trialHearingAddNewDirectionsDJ: [
          CaseDataHelper.setIdToData({
            directionComment: 'string',
          }),
        ],
      },
    };
  }

  return {};
};

const orderPreview = {
  OrderPreview: {}
};

export default {
  caseManagementOrder,
  disposalHearing,
  trailHearing,
  orderPreview
};
