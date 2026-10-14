import Track from './track.ts';

// The final orders a judge can make with "Make an order" (GENERATE_DIRECTIONS_ORDER). On the small and fast tracks
// the judge writes a free form or an assisted order. On the intermediate and multi tracks the judge downloads a
// template, fills it in and uploads it.
enum FinalOrder {
  FREE_FORM_ORDER = 'FREE_FORM_ORDER',
  ASSISTED_ORDER = 'ASSISTED_ORDER',
  BLANK_TEMPLATE_AFTER_HEARING = 'BLANK_TEMPLATE_AFTER_HEARING',
  BLANK_TEMPLATE_BEFORE_HEARING = 'BLANK_TEMPLATE_BEFORE_HEARING',
  FIX_A_DATE_FOR_CMC = 'FIX_A_DATE_FOR_CMC',
  FIX_A_DATE_FOR_CCMC = 'FIX_A_DATE_FOR_CCMC',
}

// The orders each track offers. Fixing a date for a costs and case management conference (CCMC) is only offered on
// the multi track.
export const finalOrdersForTrack: Record<Track, FinalOrder[]> = {
  [Track.SMALL]: [FinalOrder.FREE_FORM_ORDER, FinalOrder.ASSISTED_ORDER],
  [Track.FAST]: [FinalOrder.FREE_FORM_ORDER, FinalOrder.ASSISTED_ORDER],
  [Track.INTERMEDIATE]: [
    FinalOrder.BLANK_TEMPLATE_AFTER_HEARING,
    FinalOrder.BLANK_TEMPLATE_BEFORE_HEARING,
    FinalOrder.FIX_A_DATE_FOR_CMC,
  ],
  [Track.MULTI]: [
    FinalOrder.BLANK_TEMPLATE_AFTER_HEARING,
    FinalOrder.BLANK_TEMPLATE_BEFORE_HEARING,
    FinalOrder.FIX_A_DATE_FOR_CMC,
    FinalOrder.FIX_A_DATE_FOR_CCMC,
  ],
};

export default FinalOrder;
