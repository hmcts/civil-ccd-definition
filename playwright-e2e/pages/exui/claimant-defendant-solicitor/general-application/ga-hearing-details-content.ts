export const subheadings = {
  scheduledHearingsAndTrials: 'Scheduled hearings and trials',
}

export const radioButtons = {
  otherHearingScheduled: {
    legend: 'Do you have any other hearing scheduled?',
    yes: {
      label: 'Yes',
      selector: '#generalAppHearingDetails_hearingYesorNo_Yes',
    },
    no: {
      label: 'No',
      selector: '#generalAppHearingDetails_hearingYesorNo_No',
    },
  },
  trial: {
    legend: 'Has the trial been fixed?',
    yes: {
      label: 'Yes',
      selector: '#generalAppHearingDetails_trialRequiredYesOrNo_Yes',
    },
    no: {
      label: 'No',
      selector: '#generalAppHearingDetails_trialRequiredYesOrNo_No',
    },
  },
   typeOfHearing: {
    label: 'Choose your preferred type of hearing',
    inPerson: {
      label: 'In person',
      selector: '#generalAppHearingDetails_HearingPreferencesPreferredType-IN_PERSON',
    },
  },
  hearingDuration: {
    label: 'How long do you think the hearing will last?',
    fortyFiveMinutes: {
      label: '45 minutes',
      selector: '#generalAppHearingDetails_HearingDuration-MINUTES_45',
    },
  },
  unavailableDates: {
    legend: 'Are there any dates when you cannot attend a hearing within the next 3 months?',
    no: {
      label: 'No',
      selector: '#generalAppHearingDetails_unavailableTrialRequiredYesOrNo_No',
    },
  },
  vulnerability: {
    legend: 'Is anyone who will participate in the hearing vulnerable?',
    yes: {
      label: 'Yes',
      selector: '#generalAppHearingDetails_vulnerabilityQuestionsYesOrNo_Yes',
    },
  }
};

export const inputs = {
  hearingDate: { day: '#hearingDate-day', month: '#hearingDate-month', year: '#hearingDate-year' },
  trialFrom: { day: '#trialDateFrom-day', month: '#trialDateFrom-month', year: '#trialDateFrom-year' },
  trialTo: { day: '#trialDateTo-day', month: '#trialDateTo-month', year: '#trialDateTo-year' },
  reason: { label: 'Why would you prefer this type of hearing?', selector: '#generalAppHearingDetails_ReasonForPreferredHearingType' },
  phone: { label: 'Preferred telephone number', selector: '#generalAppHearingDetails_HearingDetailsTelephoneNumber' },
  email: { label: 'Preferred email', selector: '#generalAppHearingDetails_HearingDetailsEmailID' },
  vulnerability: { label: 'How could we support this person during the hearing?', selector: '#generalAppHearingDetails_vulnerabilityQuestion' },
  signLanguage: { label: 'Sign language interpreter', selector: '#generalAppHearingDetails_SupportRequirementSignLanguage' },
};

export const checkboxes = {
  supportRequirements: {
    signLanguageInterpreter: {
    label: 'Sign language interpreter (you will have to arrange this)',
    selector: '#generalAppHearingDetails_SupportRequirement-SIGN_INTERPRETER'
    }
  }
}
