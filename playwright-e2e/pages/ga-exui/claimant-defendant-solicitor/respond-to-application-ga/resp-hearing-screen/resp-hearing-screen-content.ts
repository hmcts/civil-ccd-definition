export const subheadings = {
  scheduledHearingsAndTrials: 'Scheduled hearings and trials',
}

export const radioButtons = {
  otherHearingScheduled: {
    legend: 'Do you have any other hearing scheduled?',
    yes: {
      label: 'Yes',
      selector: '#hearingDetailsResp_hearingYesorNo_Yes',
    },
    no: {
      label: 'No',
      selector: '#hearingDetailsResp_hearingYesorNo_No',
    },
  },
  trial: {
    legend: 'Has the trial been fixed?',
    yes: {
      label: 'Yes',
      selector: '#hearingDetailsResp_trialRequiredYesOrNo_Yes',
    },
    no: {
      label: 'No',
      selector: '#hearingDetailsResp_trialRequiredYesOrNo_No',
    },
  },
   typeOfHearing: {
    label: 'Choose your preferred type of hearing',
    inPerson: {
      label: 'In person',
      selector: '#hearingDetailsResp_HearingPreferencesPreferredType-IN_PERSON',
    },
  },
  hearingDuration: {
    label: 'How long do you think the hearing will last?',
    fortyFiveMinutes: {
      label: '45 minutes',
      selector: '#hearingDetailsResp_HearingDuration-MINUTES_45',
    },
  },
  unavailableDates: {
    legend: 'Are there any dates when you cannot attend a hearing within the next 3 months?',
    no: {
      label: 'No',
      selector: '#hearingDetailsResp_unavailableTrialRequiredYesOrNo_No',
    },
  },
  vulnerability: {
    legend: 'Do you believe you, or a witness who will give evidence on your behalf, are vulnerable?',
    no: {
      label: 'No',
      selector: '#hearingDetailsResp_vulnerabilityQuestionsYesOrNo_No',
    },
  }
};

export const inputs = {
  hearingDate: { day: '#hearingDate-day', month: '#hearingDate-month', year: '#hearingDate-year' },
  trialFrom: { day: '#trialDateFrom-day', month: '#trialDateFrom-month', year: '#trialDateFrom-year' },
  trialTo: { day: '#trialDateTo-day', month: '#trialDateTo-month', year: '#trialDateTo-year' },
  reason: { label: 'Why would you prefer this type of hearing?', selector: '#hearingDetailsResp_ReasonForPreferredHearingType' },
  phone: { label: 'Preferred telephone number', selector: '#hearingDetailsResp_HearingDetailsTelephoneNumber' },
  email: { label: 'Preferred email', selector: '#hearingDetailsResp_HearingDetailsEmailID' },
  signLanguage: { label: 'Sign language interpreter', selector: '#hearingDetailsResp_SupportRequirementSignLanguage' },
};

export const checkboxes = {
  supportRequirements: {
    signLanguageInterpreter: {
    label: 'Sign language interpreter (you will have to arrange this)',
    selector: '#hearingDetailsResp_SupportRequirement-SIGN_INTERPRETER'
    }
  }
}
