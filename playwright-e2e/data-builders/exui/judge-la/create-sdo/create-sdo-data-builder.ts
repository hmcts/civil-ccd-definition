import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import createSdoDataBuilderComponents from './create-sdo-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateSdoDataBuilder extends BaseDataBuilder {
  async buildFastSdo() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...createSdoDataBuilderComponents.sdo,
      ...createSdoDataBuilderComponents.claimsTrack,
      ...createSdoDataBuilderComponents.fastTrack,
      ...createSdoDataBuilderComponents.undefine,
    };
  }
}
