import personTitles from '../enums/personTitles.ts';


export const partyDetails = {
  claimant1: {
    companyName: 'Claimant 1 company name',
    organisationName: 'Claimant 1 organisation name',
    soleTraderTradingAs: 'Claimant 1 Sole Trader',
    title: personTitles.MR,
    firstName: 'Claimant1_firstname',
    lastName: 'Claimant1_lastname',
    DOB_day: '01',
    DOB_month: '01',
    DOB_year: '2000',
    email: 'claimant1@email.com',
    phone: '02099999999',
    address: {
      addressLine1: 'Claimant 1 Address, London',
      addressLine2: null,
      addressLine3: null,
      postTown: 'London',
      county: null,
      country: 'United Kingdom',
      postcode: 'SW1A 1AA'
    },
  },
  claimant2: {
    companyName: 'Claimant 2 company name',
    organisationName: 'Claimant 2 organisation name',
    soleTraderTradingAs: 'Claimant 2 Sole Trader',
    title: personTitles.MS,
    firstName: 'Claimant2_firstname',
    lastName: 'Claimant2_lastname',
    DOB_day: '01',
    DOB_month: '01',
    DOB_year: '2000',
    email: 'claimant2@email.com',
    phone: '02088888888',
    address: {
      addressLine1: 'Claimant 2 Address, London',
      addressLine2: null,
      addressLine3: null,
      postTown: 'London',
      county: null,
      country: 'United Kingdom',
      postcode: 'SW1A 1AA'
    }
  },
  claimantLitigantFriend1: {
    firstname: 'Claimant1LitigantFriend_firstname',
    lastname: 'Claimant1LitigantFriend_lastname',
    email: 'Claimant1LitigantFriend@email.com',
    phone: '02087777777',
  },
  defendant1: {
    companyName: 'Defendant 1 company name',
    organisationName: 'Defendant 1 organisation name',
    title: personTitles.MRS,
    firstName: 'Defendant1_firstname',
    lastName: 'Defendant1_lastname',
    DOB_day: '11',
    DOB_month: '11',
    DOB_year: '1991',
    email: 'defendant1@email.com',
    phone: '02099999999',
    address: {
      addressLine1: 'Chancellor Of The Exchequer',
      addressLine2: '11 Downing Street',
      addressLine3: null,
      postTown: 'London',
      county: null,
      country: 'United Kingdom',
      postcode: 'SW1A 2AB'
    }
  },
  defendant2: {
    companyName: 'Defendant 2 company name',
    organisationName: 'Defendant 2 organisation name',
    title: personTitles.DR,
    firstName: 'Defendant2_firstname',
    lastName: 'Defendant2_lastname',
    DOB_day: '12',
    DOB_month: '12',
    DOB_year: '1992',
    email: 'defendant2@email.com',
    phone: '02055555555',
    address: {
      addressLine1: 'Department Of Education',
      addressLine2: 'Great Smith Street',
      addressLine3: null,
      postTown: 'London',
      county: null,
      country: 'United Kingdom',
      postcode: 'SW1P 3BT'
    }
  },
};

