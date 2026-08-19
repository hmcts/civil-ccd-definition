import ExuiDashboardActions from "../actions/ui/exui/common/exui-dashboard-actions";
import GaExuiDashboardActions from "../actions/ui/ga-exui/common/ga-exui-dashboard-actions";
import IdamActions from "../actions/ui/idam/idam-actions";
import TestData from "../models/test-utils/test-data";
import RequestsFactory from "../requests/requests-factory";
import BaseApi from "./base-api";

export default abstract class BaseGaExui extends BaseApi {
  private _gaExuiDashboardActions: GaExuiDashboardActions;
  private _idamActions: IdamActions;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this._gaExuiDashboardActions = gaExuiDashboardActions;
    this._idamActions = idamActions;
  }

  get gaExuiDashboardActions() {
    return this._gaExuiDashboardActions;
  }

  get idamActions() {
    return this._idamActions;
  }

}