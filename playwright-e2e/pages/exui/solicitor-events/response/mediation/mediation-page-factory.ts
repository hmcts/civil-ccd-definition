import BasePageFactory from '../../../../../base/base-page-factory';
import partys from '../../../../../constants/partys';
import MediationContactInformationClaimantPage from './mediation-contact-information/mediation-contact-information-claimant-page';
import MediationContactInformationDefendantPage from './mediation-contact-information/mediation-contact-information-defendant-page';
import MediationAvailabilityClaimantPage from './mediation-availability/mediation-availability-claimant-page';
import MediationAvailabilityDefendant1Page from './mediation-availability/mediation-availability-defendant-page';

export default class MediationPageFactory extends BasePageFactory {
  get mediationContactInformationClaimantPage() {
    return new MediationContactInformationClaimantPage(this.page, partys.CLAIMANT_1_MEDIATION);
  }

  get mediationContactInformationDefendant1Page() {
    return new MediationContactInformationDefendantPage(this.page, partys.DEFENDANT_1_MEDIATION);
  }

  get mediationContactInformationDefendant2Page() {
    return new MediationContactInformationDefendantPage(this.page, partys.DEFENDANT_2_MEDIATION);
  }

  get mediationAvailabilityClaimantPage() {
    return new MediationAvailabilityClaimantPage(this.page, partys.CLAIMANT_1_MEDIATION);
  }

  get mediationAvailabilityDefendant1Page() {
    return new MediationAvailabilityDefendant1Page(this.page, partys.DEFENDANT_1_MEDIATION);
  }

  get mediationAvailabilityDefendant2Page() {
    return new MediationAvailabilityDefendant1Page(this.page, partys.DEFENDANT_2_MEDIATION);
  }
}
