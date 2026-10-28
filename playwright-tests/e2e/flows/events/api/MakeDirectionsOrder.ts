import FinalOrder from '../../../../enums/finalOrders.ts';
import { MakeFinalOrder } from './MakeFinalOrder.ts';

// The judge's directions order on the intermediate or multi track (GENERATE_DIRECTIONS_ORDER, "Make an order") through
// the CCD API, made in place of a Standard Direction Order once the claim is in JUDICIAL_REFERRAL. As in the UI it is
// made from the blank template for an order made before a hearing, so it is the same as that order in MakeFinalOrder.
export class MakeDirectionsOrder {
  async submit(caseId: string) {
    await new MakeFinalOrder().submit(caseId, FinalOrder.BLANK_TEMPLATE_BEFORE_HEARING);
  }
}
