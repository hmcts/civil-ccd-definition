import DateHelper from '../../../../helpers/date-helper';

const assistedOrderWithoutFurtherHearing = () => ({
  finalOrderSelection: 'ASSISTED_ORDER',
  assistedOrderAppealToggle: ['SHOW'],
  orderMadeOnOption: 'NONE',
  assistedOrderAppealDetails: {
    appealOrigin: 'CLAIMANT',
    permissionToAppeal: 'GRANTED',
    assistedOrderAppealDropdownGranted: {
      assistedOrderAppealJudgeSelection: 'CIRCUIT_COURT_JUDGE',
      assistedOrderAppealFirstOption: {
        assistedOrderAppealDate: DateHelper.formatDateToString(DateHelper.addToToday({ days: 21 }), {
          outputFormat: 'YYYY-MM-DD',
        }),
      },
    },
  },
  assistedOrderMadeSelection: 'Yes',
  assistedOrderJudgeHeardFrom: ['SHOW'],
  assistedOrderRepresentation: {
    representationType: 'OTHER_REPRESENTATION',
    otherRepresentation: {
      detailsRepresentationText: 'Test representation',
      claimantRepresentation: null,
      defendantRepresentation: null,
    },
  },
  typeRepresentationJudgePapersList: ['CONSIDERED'],
  assistedOrderOrderedThatText: 'Test order details',
  assistedCostTypes: 'COSTS_IN_CASE',
  assistedOrderGiveReasonsYesNo: 'No',
  assistedOrderRecitalsRecorded: { text: 'Test recitals' },
  assistedOrderFurtherHearingToggle: [],
  assistedOrderMadeDateHeardDetails: {
    singleDateSelection: {
      singleDateHeard: DateHelper.formatDateToString(DateHelper.addToToday({ days: 1 }), {
        outputFormat: 'YYYY-MM-DD',
      }),
    },
  },
});

export default { assistedOrderWithoutFurtherHearing };
