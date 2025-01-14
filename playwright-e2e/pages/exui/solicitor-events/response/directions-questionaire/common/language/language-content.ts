import Party from '../../../../../../../enums/party';

export const subHeading = {
  language: 'Welsh language'
};

export const text = {
 officialLanguage :
   'Welsh is an official language of Wales. You can use Welsh in court hearings. ' +
   'Asking to speak in Welsh in your hearing will not delay the hearing or ' +
   'have any effect on proceedings or the outcome of a case.'
}

export const getSpeakingRadioButtons = (party: Party) => ({
  question: 'What language will you, your experts or witnesses speak at the hearing?',
  radioWelsh: {
    label: 'Welsh',
    selector: `#${party}DQLanguage_court-WELSH`,
  },
  radioEnglish: {
    label: 'English',
    selector: `#${party}DQLanguage_court-ENGLISH`,
  },
  radioBoth: {
    label: 'Welsh and English',
    selector: `#${party}DQLanguage_court-BOTH`,
  },
});

export const getDocumentsRadioButtons = (party :Party) => ({
  question: 'What language will documents be provided in?',
  radioWelsh: {
    label: 'Welsh',
    selector: `#${party}DQLanguage_documents-WELSH`,
  },
  radioEnglish: {
    label: 'English',
    selector: `#${party}DQLanguage_documents-ENGLISH`,
  },
  radioBoth: {
    label: 'Welsh and English',
    selector: `#${party}DQLanguage_documents-BOTH`,
  },
});

export const getSpeakingRadioButtons1v2 = (party : Party)=>({
  question: 'What language will you, your experts or witnesses speak at the hearing?',
  radioWelsh: {
    label: 'Welsh',
    selector: `#${party}DQLanguage_court-WELSH`,
  },
  radioEnglish: {
    label: 'English',
    selector: `#${party}DQLanguage_court-ENGLISH`,
  },
  radioBoth: {
    label: 'Welsh and English',
    selector: `#${party}DQLanguage_court-BOTH`,
  },
});

export const getDocumentsRadioButtons1v2 = (party : Party) => ({
  question: 'What language will documents be provided in?',
  radioWelsh: {
    label: 'Welsh',
    selector: `#${party}DQLanguage_documents-WELSH`,
  },
  radioEnglish: {
    label: 'English',
    selector: `#${party}DQLanguage_documents-ENGLISH`,
  },
  radioBoth: {
    label: 'Welsh and English',
    selector: `#${party}DQLanguage_documents-BOTH`,
  },
});

