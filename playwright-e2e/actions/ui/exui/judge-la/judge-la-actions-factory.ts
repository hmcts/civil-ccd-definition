import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import SdoPageFactory from '../../../../pages/exui/judge-la/sdo/sdo-page-factory';
import SdoDJPageFactory from '../../../../pages/exui/judge-la/sdo-dj/sdo-dj-page-factory';
import NotSuitableSdoPageFactory from '../../../../pages/exui/judge-la/not-suitable-for-sdo/not-suitable-sdo-page-factory';
import SdoActions from './sdo-actions';
import SdoDJActions from './sdo-dj-actions';
import NotSuitableSdoActions from './not-suitable-sdo-actions';

export default class JudgeLAActionsFactory extends BasePageActionsFactory {
  get sdoActions() {
    return new SdoActions(
      new SdoPageFactory(this.page),
      this.testData,
    );
  }

  get sdoDJActions() {
    return new SdoDJActions(
      new SdoDJPageFactory(this.page),
      this.testData,
    );
  }

  get notSuitableSdoActions() {
    return new NotSuitableSdoActions(
      new NotSuitableSdoPageFactory(this.page),
      this.testData,
    );
  }
}
