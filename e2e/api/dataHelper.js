const fetch = require('node-fetch');
const uuid = require('uuid');
const config = require('../config.js');
const address = require('../fixtures/address');
const getDateTimeISOString = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const getDate = days => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};


module.exports = {
  date: (days = 0) => {
    return getDateTimeISOString(days).slice(0, 10);
  },

  dateNoWeekends: async function dateNoWeekends(days = 0) {
    const date = getDate(days);
    let date_String = date.toISOString().slice(0, 10);
    let isDateABankHoliday = false;
    if (date.getDay() !== 6 && date.getDay() !== 0) {
      if(date.getDay() == 1 || date.getDay() == 5) {
        try {
          const rawBankHolidays = await fetch('https://www.gov.uk/bank-holidays.json');
          const ukbankholidays = await rawBankHolidays.json();
          isDateABankHoliday = JSON.stringify(ukbankholidays['england-and-wales'].events).includes(date_String);
          if (!isDateABankHoliday) {
            return date_String;
          } else {
            return await dateNoWeekends(days - 1);
          }
        } catch (err) {
          console.warn('Error while fetching UK Bank Holidays...', err);
        }
      } else {
        return date_String;
      }
    } else {
      return await dateNoWeekends(days - 1);
    }
  },

  dateTime: (days = 0) => {
    return getDateTimeISOString(days);
  },

  document: filename => {
    const documentId = uuid.v1();
    return {
      document_url: `${config.url.dmStore}/documents/${documentId}`,
      document_filename: filename,
      document_binary_url: `${config.url.dmStore}/documents/${documentId}/binary`
    };
  },

  element: object => {
    return {
      id: uuid.v1(),
      value: object
    };
  },

  listElement: string => {
    return {
      code: uuid.v1(),
      label: string
    };
  },

  buildAddress: postFixLineOne => {
    return {
      AddressLine1: `${address.buildingAndStreet.lineOne + ' - ' + postFixLineOne}`,
      AddressLine2: address.buildingAndStreet.lineTwo,
      AddressLine3: address.buildingAndStreet.lineThree,
      PostTown: address.town,
      County: address.county,
      Country: address.country,
      PostCode: address.postcode
    };
  }
};
