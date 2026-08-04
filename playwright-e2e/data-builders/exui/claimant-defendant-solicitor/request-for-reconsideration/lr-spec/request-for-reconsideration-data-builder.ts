import BaseDataBuilder from '../../../../../base/base-data-builder';
import partys from '../../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { Party } from '../../../../../models/users/partys';
import requestForReconsiderationDataBuilderComponents from './request-for-reconsideration-data-builder-components';

@AllMethodsStep()
export default class RequestForReconsiderationDataBuilder extends BaseDataBuilder {
  async buildCS1() {
    return this.buildData();
  }

  async buildDS1() {
    return this.buildData({ claimantDefendantParty: partys.DEFENDANT_SOLICITOR_1 });
  }

  async buildDS2() {
    return this.buildData({ claimantDefendantParty: partys.DEFENDANT_SOLICITOR_2 });
  }

  protected async buildData({
    claimantDefendantParty = partys.CLAIMANT_SOLICITOR_1,
  }: {
    claimantDefendantParty?: Party;
  } = {}) {
    return {
      ...requestForReconsiderationDataBuilderComponents.requestForReconsideration(claimantDefendantParty),
    };
  }
}
