import BaseDataBuilder from '../../../../base/base-data-builder';
import JudicialDecision from '../../../../constants/ccd-events/ga-ccd-events/make-decision/judicial-decision';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import makeDecisionDataBuilderComponents from './make-decision-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class MakeDecisionDataBuilder extends BaseDataBuilder {
  async buildAddInfo() {
    return this.buildData();
  }

  async buildListHearing() {
    return this.buildData({judicialDecision: JudicialDecision.LIST_FOR_A_HEARING});
  }

  protected async buildData({
    judicialDecision = JudicialDecision.REQUEST_MORE_INFO,
  }: {
    judicialDecision?: JudicialDecision;
  } = {}) {
    return {
      ...makeDecisionDataBuilderComponents.judicialDecision(judicialDecision),
      ...makeDecisionDataBuilderComponents.judicialDecisionRequestMoreInfo(judicialDecision),
      ...makeDecisionDataBuilderComponents.judicialListForHearing(judicialDecision),
      ...makeDecisionDataBuilderComponents.hearingDetails(judicialDecision),
    };
  }
}
