import { v4 as uuidv4 } from 'uuid';
import PartyType from '../enums/party-type';
import StringHelper from './string-helper';
import ClaimTrack from '../enums/claim-track';

export default class CaseDataHelper {
  static getNextClaimNumber() {
    return '00' + Math.random().toString(36).slice(-6);
  }

  static formatCaseId(caseId: number) {
    const groups = caseId.toString().match(/.{1,4}/g);
    const formattedString = '#' + groups.join('-');
    return formattedString;
  }

  static setCodeToData(data: any) {
    return {
      code: uuidv4(),
      label: data,
    };
  }

  static setIdToData(data: any) {
    return {
      id: uuidv4(),
      value: data,
    };
  }

  static buildClaimantOrDefData(key: string, partyType: PartyType) {
    const commonPartyData = {
      type: partyType,
      partyEmail: `${key}@${partyType.toLowerCase()}.com`,
      partyPhone: '07987332384',
      primaryAddress: this.buildAddressData(key),
      partyTypeDisplayValue: StringHelper.capitalise(partyType),
    };

    switch (partyType) {
      case PartyType.INDIVIDUAL:
        return {
          ...commonPartyData,
          individualTitle: 'Mr',
          individualFirstName: `${key}FirstName`,
          individualLastName: `${key}LastName`,
          individualDateOfBirth: '1980-10-12',
        };

      case PartyType.COMPANY:
        return {
          ...commonPartyData,
          companyName: `${key} ${StringHelper.capitalise(partyType)}`,
        };

      case PartyType.SOLE_TRADER:
        return {
          ...commonPartyData,
          soleTraderTitle: 'Mr',
          soleTraderFirstName: `${key}FirstName`,
          soleTraderLastName: `${key}LastName`,
          soleTraderTradingAs: `${key}TradingAs`,
          soleTraderDateOfBirth: '1985-06-20',
        };
      case PartyType.ORGANISATION:
        return {
          ...commonPartyData,
          organisationName: `${key} ${StringHelper.capitalise(partyType)}`,
        };
    }
  }

  static buildAddressData(key: string) {
    return {
      AddressLine1: `Flat 12 - ${key}`,
      AddressLine2: `${key} House 15 - 17`,
      AddressLine3: `${key} Street`,
      PostTown: `${key} Town`,
      County: `${key} County`,
      Country: 'England',
      PostCode: 'RG4 7AA',
    };
  }

  static getClaimValue(claimTrack: ClaimTrack) {
    switch (claimTrack) {
      case ClaimTrack.SMALL_CLAIM:
        return 100;
      case ClaimTrack.FAST_CLAIM:
        return 11000;
      case ClaimTrack.INTERMEDIATE_CLAIM:
        return 26000;
      case ClaimTrack.MULTI_CLAIM:
        return 110000;
    }
  }
}
