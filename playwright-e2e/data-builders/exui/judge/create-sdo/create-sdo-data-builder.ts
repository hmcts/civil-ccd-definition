import BaseDataBuilder from '../../../../base/base-data-builder';
import SdoType from '../../../../constants/ccd-events/sdo/sdo-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import createSdoDataBuilderComponents from './create-sdo-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateSdoDataBuilder extends BaseDataBuilder {
  async buildFastTrackSdo() {
    return this.buildData({sdoType: SdoType.FAST_TRACK});
  }

  async buildTrailSdo() {
    return this.buildData({sdoType: SdoType.TRAIL});
  }

  protected async buildData(
    {
      sdoType = SdoType.SMALL_TRACK_NO_SUM
    }: {
      sdoType?: SdoType
    } =
    {}) {
    return {
      ...createSdoDataBuilderComponents.sdo(sdoType),
      ...createSdoDataBuilderComponents.claimsTrack(sdoType),
      ...createSdoDataBuilderComponents.orderType(sdoType),
      ...createSdoDataBuilderComponents.fastTrack(sdoType),
      ...createSdoDataBuilderComponents.undefine,
    };
  }
}
