import { optional, z } from 'zod'
import ManageStayOption from '../../../../constants/ccd-events/manage-stay/manage-stay-option';

const nonEmptyString = z.string().min(1);

const manageStay = (manageStayOption: ManageStayOption) => {
  if (manageStayOption === ManageStayOption.REQUEST_UPDATE) {
    return {
      manageStayUpdateRequestDate: nonEmptyString,
      manageStayOption: nonEmptyString,
    };
  } else if (manageStayOption === ManageStayOption.LIFT_STAY) {
    return {
      manageStayUpdateRequestDate: z.undefined().optional(),
    };
  }
  return {};
}

const undefine = (manageStayOption: ManageStayOption) => {
  if (manageStayOption === ManageStayOption.LIFT_STAY) {
    return {
      caseStayDate: z.undefined().optional()
    }
  }

  return {};
}

export default {
  manageStay,
  undefine
};
