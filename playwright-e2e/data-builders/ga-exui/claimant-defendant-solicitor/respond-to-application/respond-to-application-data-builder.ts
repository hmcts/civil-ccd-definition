import BaseDataBuilder from '../../../../base/base-data-builder';
import {
  claimantSolicitorUser,
  defendantSolicitor1User,
} from '../../../../config/users/exui-users';
import GaAgreedToOrder from '../../../../constants/ccd-events/ga-ccd-events/respond-to-application/ga-agreed-to-order';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/users/partys';
import User from '../../../../models/users/user';
import respondToApplicationDataBuilderComponents from './respond-to-application-data-builder-components';

@AllMethodsStep()
export default class RespondToApplicationDataBuilder extends BaseDataBuilder {
  async buildCS() {
    return this.buildData({
      solicitorParty: partys.CLAIMANT_SOLICITOR_1,
      solicitorUser: claimantSolicitorUser,
    });
  }

  async buildDS1() {
    return this.buildData({
      solicitorParty: partys.DEFENDANT_SOLICITOR_1,
      solicitorUser: defendantSolicitor1User,
    });
  }

  protected async buildData({
    gaAgreedToOrder = GaAgreedToOrder.YES,
    solicitorParty = partys.CLAIMANT_SOLICITOR_1,
    solicitorUser = claimantSolicitorUser,
  } : {
    gaAgreedToOrder?: GaAgreedToOrder,
    solicitorParty?: Party,
    solicitorUser?: User
  } = {}) {
    const {civilServiceRequests} = this.requestsFactory;
    return {
      ...(await respondToApplicationDataBuilderComponents.gaAgreedToOrder(gaAgreedToOrder, solicitorParty, civilServiceRequests, solicitorUser)),
      ...respondToApplicationDataBuilderComponents.hearingDetails(solicitorParty, solicitorUser),
    };
  }
}
