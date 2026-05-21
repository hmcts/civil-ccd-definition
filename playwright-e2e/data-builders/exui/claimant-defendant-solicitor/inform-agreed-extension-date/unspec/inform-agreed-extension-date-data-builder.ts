import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import informAgreedExtensionDateDataComponents from './inform-agreed-extension-date-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class InformAgreedExtensionDateDataBuilder extends BaseDataBuilder {
  async buildDataDS1() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...informAgreedExtensionDateDataComponents.extensionDate(this.ccdCaseData),
    };
  }
}
