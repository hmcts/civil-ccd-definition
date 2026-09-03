import BasePageFactory from '../../../base/base-page-factory';
import GaCaseDetailsPage from './ga-case-details/ga-case-details-page';

export default class GaExuiDashboardPageFactory extends BasePageFactory {
  get gaCaseDetailsPage() {
    return new GaCaseDetailsPage(this.page);
  }
}
