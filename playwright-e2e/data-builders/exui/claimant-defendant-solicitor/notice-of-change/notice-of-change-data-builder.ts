import BaseDataBuilder from '../../../../base/base-data-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import noticeOfChangeDataBuilderComponents from './notice-of-change-data-builder-components';

@AllMethodsStep()
export default class NoticeOfChangeDataBuilder extends BaseDataBuilder {
  async buildClaimant1() {
    return this.buildData(partys.CLAIMANT_1);
  }

  async buildClaimant2() {
    return this.buildData(partys.CLAIMANT_2);
  }

  async buildDefendant1() {
    return this.buildData(partys.DEFENDANT_1);
  }

  async buildDefendant2() {
    return this.buildData(partys.DEFENDANT_2);
  }

  protected async buildData(claimantDefendantParty: Party) {
    return noticeOfChangeDataBuilderComponents.nocAnswers(
      claimantDefendantParty,
      this.claimant1PartyType!,
      this.claimant2PartyType!,
      this.defendant1PartyType!,
      this.defendant2PartyType!,
    );
  }
}
