import CaseDataHelper from '../../../../../helpers/case-data-helper';

const selectDefendantSolicitorToNotify = {
  SelectDefendantSolicitorToNotify: {
    defendantSolicitorNotifyClaimOptions: {
        list_items: [CaseDataHelper.setCodeToData('Both')],
        value: CaseDataHelper.setCodeToData('Both'),
      }
  },
};

const accessGrantedWarning = {
  AccessGrantedWarning: {}
};

const notifyClaimDataBuilderComponents = {
  selectDefendantSolicitorToNotify,
  accessGrantedWarning,
};

export default notifyClaimDataBuilderComponents;
