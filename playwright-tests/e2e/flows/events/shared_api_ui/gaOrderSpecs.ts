// The order a judge makes on a general application once its hearing is scheduled (GENERAL_APPLICATION_ORDER, event
// GENERATE_DIRECTIONS_ORDER, "Make an order"), the same in the UI and API versions, and checked on the application
// afterwards
export enum GaOrder {
  FREE_FORM_ORDER = 'FREE_FORM_ORDER',
  ASSISTED_ORDER = 'ASSISTED_ORDER',
}

export interface GaOrderAnswers {
  // A free form order's recitals and what it orders
  recitals: string;
  ordered: string;
  // What an assisted order orders, in place of the text civil-service fills in
  orderedThat: string;
}

export function gaOrderAnswers(): GaOrderAnswers {
  const stamp = Date.now();
  return {
    recitals: `Playwright: the court heard the application (${stamp})`,
    ordered: `Playwright: the application is granted (${stamp})`,
    orderedThat: `Playwright: the application is granted (${stamp})`,
  };
}
