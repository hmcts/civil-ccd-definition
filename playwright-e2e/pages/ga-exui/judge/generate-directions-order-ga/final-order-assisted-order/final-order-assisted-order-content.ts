export const subheadings = {
  orderMade: 'Order Made',
  judgeHeardFrom: 'Judge heard from',
  recitals: 'Recitals',
  order: 'Order',
  furtherHearing: 'Further hearing (part heard or adjourned)',
  appeal: 'Appeal',
  orderMadeWithoutNotice: "Order made on court's own initiative/without notice",
  reasons: 'Reasons',
};

export const radioButtons = {
  orderMade: {
    label: 'Is this order made following a hearing?',
    yes: { label: 'Yes', selector: '#assistedOrderMadeSelection_Yes' },
    no: { label: 'No', selector: '#assistedOrderMadeSelection_No' },
    hearingDate: {
      label: 'Enter date(s) of hearing',
      singleDate: {
        label: 'Single date',
        selector: '#assistedOrderMadeDateHeardDetails_assistedOrderMadeDateList-SINGLE_DATE',
      },
      dateRange: {
        label: 'Date range',
        selector: '#assistedOrderMadeDateHeardDetails_assistedOrderMadeDateList-DATE_RANGE',
      },
      bespokeDate: {
        label: 'Bespoke date',
        selector: '#assistedOrderMadeDateHeardDetails_assistedOrderMadeDateList-BESPOKE_RANGE',
      },
    },
  },
  judgeHeardFrom: {
    claimantsAndDefendants: {
      label: 'Claimant(s) and defendant(s)',
      selector: '#assistedOrderRepresentation_representationType-CLAIMANT_AND_DEFENDANT',
    },
    otherRepresentation: {
      label: 'Other representation (free text)',
      selector: '#assistedOrderRepresentation_representationType-OTHER_REPRESENTATION',
    },
  },
  order: {
    costsInTheCase: {
      label: 'Costs in the case',
      selector: '#assistedCostTypes-COSTS_IN_CASE',
    },
    noOrderAsToCosts: {
      label: 'No order as to costs',
      selector: '#assistedCostTypes-NO_ORDER_TO_COST',
    },
    costsReserved: {
      label: 'Costs reserved',
      selector: '#assistedCostTypes-COSTS_RESERVED',
    },
    makeOrderForDetailedCosts: {
      label: 'Make an order for detailed/summary costs',
      selector: '#assistedCostTypes-MAKE_AN_ORDER_FOR_DETAILED_COSTS',
    },
    bespokeCostsOrder: {
      label: 'Bespoke costs order (free text)',
      selector: '#assistedCostTypes-BESPOKE_COSTS_ORDER',
    },
  },
  publicFundingCostsProtection: {
    label: 'Does the paying party have public funding costs protection?',
    yes: { label: 'Yes', selector: '#publicFundingCostsProtection_Yes' },
    no: { label: 'No', selector: '#publicFundingCostsProtection_No' },
  },
  furtherHearing: {
    hearingLength: {
      label: 'Length of new hearing',
      twoHours: {
        label: '2 hours',
        selector: '#assistedOrderFurtherHearingDetails_lengthOfNewHearing-HOURS_2',
      },
    },
    hearingMethod: {
      label: 'Hearing method',
      video: {
        label: 'Video',
        selector: '#assistedOrderFurtherHearingDetails_hearingMethods-VIDEO',
      },
      telephone: {
        label: 'Telephone',
        selector: '#assistedOrderFurtherHearingDetails_hearingMethods-TELEPHONE',
      },
      inPerson: {
        label: 'In person',
        selector: '#assistedOrderFurtherHearingDetails_hearingMethods-IN_PERSON',
      },
    },
    datesToAvoid: {
      label: 'Do you want the parties to provide dates to avoid?',
      Yes: { label: 'Yes', selector: '#assistedOrderFurtherHearingDetails_datesToAvoidYesNo_Yes' },
      no: { label: 'No', selector: '#assistedOrderFurtherHearingDetails_datesToAvoidYesNo_No' },
    },
  },
  appeal: {
    origin: {
      label: 'The',
      claimant: {
        label: "Claimant's",
        selector: '#assistedOrderAppealDetails_appealOrigin-CLAIMANT',
      },
    },
    permissionToAppeal: {
      label: 'Permission to appeal',
      granted: {
        label: 'granted',
        selector: '#assistedOrderAppealDetails_permissionToAppeal-GRANTED',
      },
      refused: {
        label: 'refused',
        selector: '#assistedOrderAppealDetails_permissionToAppeal-REFUSED',
      },
    },
  },
  orderMadeOn: {
    withoutNotice: {
      label: 'Order without notice',
      selector: '#orderMadeOnOption-WITHOUT_NOTICE',
    },
  },
  reasons: {
    label: 'Reasons',
    yes: { label: 'Yes', selector: '#assistedOrderGiveReasonsYesNo_Yes' },
  },
};

export const checkboxes = {
  orderMade: {
    judgeConsideredThePapers: {
      label: 'The judge considered the papers',
      selector: '#typeRepresentationJudgePapersList-CONSIDERED',
    },
  },
  judgeHeardFrom: {
    showHide: { label: 'Show/hide', selector: '#assistedOrderJudgeHeardFrom-SHOW' },
  },
  recitals: {
    showHide: { label: 'Show/hide', selector: '#assistedOrderRecitals-SHOW' },
  },
  furtherHearing: {
    showHide: { label: 'Show/hide', selector: '#assistedOrderFurtherHearingToggle-SHOW' },
  },
  appeal: {
    showHide: { label: 'Show/hide', selector: '#assistedOrderAppealToggle-SHOW' },
  },
};

export const inputs = {
  judgeHeardFrom: {
    otherRepresentation: {
      label: 'Enter details of representation',
      selector: '#assistedOrderRepresentation_otherRepresentation_detailsRepresentationText',
    },
  },
  recitals: {
    recordedThat: {
      label: 'It is recorded that:',
      selector: '#assistedOrderRecitalsRecorded_text',
    },
  },
  order: {
    orderedThat: {
      label: 'It is ordered that:',
      selector: '#assistedOrderOrderedThatText',
    },
    costsReserved: {
      label: 'Costs reserved',
      selector: '#costReservedDetails_detailsRepresentationText',
    },
  },
  furtherHearing: {
    listFromDate: {
      day: { label: 'Day', selector: '#listFromDate-day' },
      month: { label: 'Month', selector: '#listFromDate-month' },
      year: { label: 'Year', selector: '#listFromDate-year' },
    },
  },
  reasons: {
    briefReasons: {
      label: 'Brief reasons',
      selector: '#assistedOrderGiveReasonsDetails_reasonsText',
    },
  },
};

export const dropdowns = {
  appeal: {
    judge: {
      label: 'An appeal lies from this order to',
      option: '1: CIRCUIT_COURT_JUDGE',
      selector:
        '#assistedOrderAppealDetails_assistedOrderAppealDropdownGranted_assistedOrderAppealJudgeSelection',
    },
  },
};
