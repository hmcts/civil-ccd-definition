import ManageStayOption from '../../../../constants/ccd-events/manage-stay/manage-stay-option';

const manageStayOptions = (manageStayOption: ManageStayOption) => {
  return {
    manageStayOptions: {
      manageStayOption: manageStayOption
    }
  }
}

const manageStayCaseProgressedHearingReadyPrepareForHearing = (manageStayOption: ManageStayOption) => {
  if (manageStayOption === ManageStayOption.LIFT_STAY) {
    return {
      manageStayCaseProgressedHearingReadyPrepareForHearing: {}
    }
  }

  return {};
}

const manageStayRequestUpdate = (manageStayOption: ManageStayOption) => {
  if (manageStayOption === ManageStayOption.REQUEST_UPDATE) {
    return {
      manageStayRequestUpdate: {}
    }
  }
}

export default {
  manageStayOptions, 
  manageStayCaseProgressedHearingReadyPrepareForHearing, 
  manageStayRequestUpdate
};
