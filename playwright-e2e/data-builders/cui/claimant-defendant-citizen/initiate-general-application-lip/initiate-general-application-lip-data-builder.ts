import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import initiateGeneralApplicationLipDataBuilderComponents from './initiate-general-application-lip-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class InitiateGeneralApplicationLipDataBuilder extends BaseDataBuilder {
  async buildWithHelpWithFees() {
    return this.buildData({ helpWithFees: true });
  }

  async buildWithoutHelpWithFees() {
    return this.buildData({ helpWithFees: false });
  }

  protected async buildData({
    helpWithFees = false,
  }: {
    helpWithFees?: boolean;
  } = {}): Promise<CCDCaseData> {
    return initiateGeneralApplicationLipDataBuilderComponents.extendTimeApplication({
      helpWithFees,
    }) as unknown as CCDCaseData;
  }
}
