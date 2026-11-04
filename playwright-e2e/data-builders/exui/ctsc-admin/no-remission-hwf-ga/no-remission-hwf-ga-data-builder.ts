import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import noRemissionHwfGaDataBuilderComponents from './no-remission-hwf-ga-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class NoRemissionHwfGaDataBuilder extends BaseDataBuilder {
  async buildApplicationFee() {
    return this.buildData();
  }

  protected async buildData() {
    return noRemissionHwfGaDataBuilderComponents.refuseApplicationFee();
  }
}
