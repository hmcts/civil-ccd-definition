import preferredCourts from '../../../../config/preferred-courts';
import OrderType from '../../../../constants/ccd-events/generate-directions-order/order-type';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';

const formatDate = (date: Date) =>
  DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' });

const finalOrderSelect = (orderType: OrderType) => ({
  FinalOrderSelect: {
    finalOrderSelection: orderType,
  },
});

const finalOrderAssistedOrder = (
  orderType: OrderType,
  claimantPartyType: ClaimantDefendantPartyType,
  defendantPartyType: ClaimantDefendantPartyType,
) => {
  if(orderType === OrderType.ASSISTED_ORDER) {
    const claimantName = CaseDataHelper.buildClaimantAndDefendantData(
      partys.CLAIMANT_1,
      claimantPartyType,
    ).partyName;
    const defendantName = CaseDataHelper.buildClaimantAndDefendantData(
      partys.DEFENDANT_1,
      defendantPartyType,
    ).partyName;
    const preferredCourt = preferredCourts[partys.CLAIMANT_1.key].default;
    const alternativeHearingLocation = CaseDataHelper.setCodeToData(preferredCourt);

    return {
      FinalOrderAssistedOrder: {
        assistedOrderPenalNoticeContent:
          'WARNING\n\n[DEFENDANT] IF YOU DO NOT COMPLY WITH THIS ORDER YOU MAY BE HELD IN CONTEMPT OF COURT AND PUNISHED BY A FINE, IMPRISONMENT, CONFISCATION OF ASSETS OR OTHER PUNISHMENT UNDER THE LAW.\n\nA penal notice against the [DEFENDANT] is attached to paragraph X below.',
        finalOrderMadeSelection: 'Yes',
        finalOrderDateHeardComplex: {
          finalOrderMadeRadioList: 'SINGLE_DATE',
          singleDateSelection: {
            singleDate: formatDate(DateHelper.addToToday({ days: 1 })),
          },
        },
        finalOrderJudgePapers: ['CONSIDERED'],
        finalOrderRepresentation: {
          typeRepresentationList: 'CLAIMANT_AND_DEFENDANT',
          typeRepresentationComplex: {
            typeRepresentationClaimantOneDynamic: claimantName,
            typeRepresentationClaimantTwoDynamic: null,
            typeRepresentationDefendantOneDynamic: defendantName,
            typeRepresentationDefendantTwoDynamic: null,
            typeRepresentationClaimantList: 'COUNSEL_FOR_CLAIMANT',
            typeRepresentationClaimantListTwo: null,
            typeRepresentationDefendantList: 'COUNSEL_FOR_DEFENDANT',
            typeRepresentationDefendantTwoList: null,
            detailsRepresentationText: null,
          },
        },
        finalOrderRecitalsRecorded: {
          text: 'The court records that..',
        },
        finalOrderOrderedThatText: 'The court orders that...',
        finalOrderFurtherHearingComplex: {
          listFromDate: formatDate(DateHelper.addToToday({ months: 4 })),
          dateToDate: formatDate(DateHelper.addToToday({ months: 6 })),
          lengthList: 'MINUTES_30',
          datesToAvoidYesNo: 'Yes',
          hearingLocationList: {
            value: {
              code: 'OTHER_LOCATION',
              label: 'Other location',
            },
            list_items: [
              {
                code: 'LOCATION_LIST',
                label: 'Central London County Court',
              },
              {
                code: 'OTHER_LOCATION',
                label: 'Other location',
              },
            ],
          },
          alternativeHearingList: {
            value: alternativeHearingLocation,
            list_items: [alternativeHearingLocation],
          },
          hearingMethodList: 'IN_PERSON',
          hearingNotesText: 'Hearing notes',
          datesToAvoidDateDropdown: {
            datesToAvoidDates: formatDate(DateHelper.addToToday({ days: 7 })),
          },
        },
        assistedOrderCostList: 'COSTS_IN_THE_CASE',
        publicFundingCostsProtection: 'No',
        finalOrderAppealComplex: {
          list: 'CLAIMANT',
          applicationList: 'GRANTED',
          appealGrantedDropdown: {
            circuitOrHighCourtList: 'CIRCUIT_COURT',
            appealChoiceSecondDropdownA: {
              appealGrantedRefusedDate: formatDate(DateHelper.addToToday({ days: 14 })),
            },
          },
        },
        orderMadeOnDetailsList: 'COURTS_INITIATIVE',
        orderMadeOnDetailsOrderCourt: {
          ownInitiativeText:
            "As this order was made on the court's own initiative any party affected by the order may apply to set aside, vary or stay the order. Any such application must be made by 4pm on",
          ownInitiativeDate: formatDate(DateHelper.addToToday({ days: 7 })),
        },
        finalOrderGiveReasonsYesNo: 'Yes',
        finalOrderGiveReasonsComplex: {
          reasonsText: 'Breif reasons',
        },
      },
    };
  }

  return {};
};

const freeFormOrder = (orderType: OrderType) => {
  if(orderType === OrderType.FREE_FORM_ORDER) {
    return {
      FreeFormOrder: {
        freeFormHearingNotes: 'string',
        freeFormOrderedTextArea: 'string',
        freeFormRecordedTextArea: 'string',
        orderOnCourtsList: 'ORDER_ON_COURT_INITIATIVE',
        orderOnCourtInitiative: {
          onInitiativeSelectionDate: formatDate(DateHelper.addToToday({ days: 7 })),
          onInitiativeSelectionTextArea: 'string'
        }
      }
    }
  }

  return {};
}

const finalOrderPreview = () => ({
  FinalOrderPreview: {},
});

export default {
  finalOrderSelect,
  finalOrderAssistedOrder,
  freeFormOrder,
  finalOrderPreview,
};
