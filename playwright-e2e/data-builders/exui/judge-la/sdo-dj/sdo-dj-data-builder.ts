import BaseDataBuilder from '../../../../base/base-data-builder';
import SdoDJType from '../../../../constants/ccd-events/sdo-dj/sdo-dj-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import sdoDJDataBuilderComponents from './sdo-dj-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class SdoDJDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  async buildTrial() {
    return this.buildData({ sdoDJType: SdoDJType.TRIAL });
  }

  async buildDisposalHearing() {
    return this.buildData({ sdoDJType: SdoDJType.DISPOSAL_HEARING });
  }

  async buildData({
    sdoDJType = SdoDJType.DISPOSAL_HEARING,
  }: {
    sdoDJType?: SdoDJType,
  } = {}) {
    return {
      ...sdoDJDataBuilderComponents.caseManagementOrder(sdoDJType),
      ...sdoDJDataBuilderComponents.disposalHearing(sdoDJType),
      ...sdoDJDataBuilderComponents.trailHearing(sdoDJType),
      ...sdoDJDataBuilderComponents.orderPreview,
    };
  }
}
