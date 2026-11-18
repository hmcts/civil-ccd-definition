const initiateGeneralApplicationLipDataBuilderComponents = {
  extendTimeApplication: ({ helpWithFees }: { helpWithFees: boolean }) => ({
    generalAppType: {
      types: ['EXTEND_TIME'],
    },
    generalAppRespondentAgreement: {
      hasAgreed: 'No',
    },
    generalAppInformOtherParty: {
      isWithNotice: 'Yes',
      reasonsForWithoutNotice: 'Reason',
    },
    generalAppAskForCosts: 'No',
    generalAppDetailsOfOrder:
      'The time by which I must [specify what needs to be done] be extended to [enter the date you can do this by].',
    generalAppReasonsOfOrder: 'test',
    generalAppHearingDetails: {
      HearingPreferencesPreferredType: 'IN_PERSON',
      ReasonForPreferredHearingType: 'test',
      HearingPreferredLocation: {
        value: {
          label:
            'Central London County Court - THOMAS MORE BUILDING, ROYAL COURTS OF JUSTICE, STRAND, LONDON - WC2A 2LL',
        },
      },
      HearingDetailsTelephoneNumber: '07000000000',
      HearingDetailsEmailID: 'civilmoneyclaimsdemo@gmail.com',
      unavailableTrialRequiredYesOrNo: 'No',
      generalAppUnavailableDates: [],
      SupportRequirement: ['OTHER_SUPPORT'],
      SupportRequirementSignLanguage: '',
      SupportRequirementLanguageInterpreter: '',
      SupportRequirementOther: 'test',
    },
    generalAppStatementOfTruth: {
      name: 'test',
    },
    // Help with Fees is what puts the application on the HWF journey. Without it the applicant pays
    // and NO_REMISSION_HWF_GA is never valid.
    generalAppHelpWithFees: helpWithFees
      ? {
          helpWithFee: 'Yes',
          helpWithFeesReferenceNumber: 'HWF-A1B-23C',
        }
      : null,
  }),
};

export default initiateGeneralApplicationLipDataBuilderComponents;
