import BaseDataBuilder from '../../../../base/base-data-builder';
import ManageStayOption from '../../../../constants/ccd-events/manage-stay/manage-stay-option';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import manageStayDataBuilderComponents from './manage-stay-data-builder-components';

@AllMethodsStep()
export default class ManageStayDataBuilder extends BaseDataBuilder {
  async buildLiftStay() {
    return this.buildData();
  }

  async buildRequestUpdate() {
    return this.buildData({manageStayOption: ManageStayOption.REQUEST_UPDATE});
  }

  protected async buildData({
    manageStayOption = ManageStayOption.LIFT_STAY
  } : {
    manageStayOption?: ManageStayOption
  } = {}) {
    return {
      ...manageStayDataBuilderComponents.manageStayOptions(manageStayOption),
      ...manageStayDataBuilderComponents.manageStayCaseProgressedHearingReadyPrepareForHearing(manageStayOption),
      ...manageStayDataBuilderComponents.manageStayRequestUpdate(manageStayOption),
    };
  }
}
