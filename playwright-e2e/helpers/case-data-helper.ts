import { v4 as uuidv4 } from 'uuid';
import StringHelper from './string-helper';
import ClaimTrack from '../enums/claim-track';
import { Party } from '../models/partys';
import partys from '../constants/partys';
import { PartyType } from '../models/party-types';
import partyTypes from '../constants/party-types';

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

  static getDateOfBirth(party: Party) {
    switch (party) {
      case partys.CLAIMANT_1:
        return '1980-05-24';
      case partys.CLAIMANT_2:
        return '1992-08-11';
      case partys.CLAIMANT_1_LITIGATION_FRIEND:
        return '1987-03-17';
      case partys.CLAIMANT_2_LITIGATION_FRIEND:
        return '1995-12-02';
      case partys.DEFENDANT_1:
        return '1984-01-30';
      case partys.DEFENDANT_2:
        return '1990-07-19';
      case partys.DEFENDANT_1_LITIGATION_FRIEND:
        return '1982-09-25';
      case partys.DEFENDANT_2_LITIGATION_FRIEND:
        return '1989-04-06';
      default:
        return '1980-10-12';
    }
  }

  static getPhoneNumber(party: Party) {
    switch (party) {
      case partys.CLAIMANT_1:
        return '07123456789';
      case partys.CLAIMANT_2:
        return '07890123456';
      case partys.CLAIMANT_1_LITIGATION_FRIEND:
        return '07984234567';
      case partys.CLAIMANT_2_LITIGATION_FRIEND:
        return '07456987654';
      case partys.DEFENDANT_1:
        return '07853654321';
      case partys.DEFENDANT_2:
        return '07712345678';
      case partys.DEFENDANT_1_LITIGATION_FRIEND:
        return '07906789012';
      case partys.DEFENDANT_2_LITIGATION_FRIEND:
        return '07321654987';
      default:
        return '07688543210';
    }
  }

  static getPostCode(party: Party) {
    switch (party) {
      case partys.CLAIMANT_1:
        return 'W1A 1AA';
      case partys.CLAIMANT_2:
        return 'BS1 4ST';
      case partys.CLAIMANT_1_LITIGATION_FRIEND:
        return 'CF10 1EP';
      case partys.CLAIMANT_2_LITIGATION_FRIEND:
        return 'LS1 4AP';
      case partys.DEFENDANT_1:
        return 'M1 1AE';
      case partys.DEFENDANT_2:
        return 'TN23 1LE';
      case partys.DEFENDANT_1_LITIGATION_FRIEND:
        return 'SO15 2JY';
      case partys.DEFENDANT_2_LITIGATION_FRIEND:
        return 'EX1 1JG';
      default:
        return 'L1 8JQ';
    }
  }

  static buildAddressData(party: Party) {
    return {
      AddressLine1: `Flat 12 - ${party.key}`,
      AddressLine2: `${party.key} House 15 - 17`,
      AddressLine3: `${party.key} Street`,
      PostTown: `${party.key} Town`,
      County: `${party.key} County`,
      Country: `${party.key} Country`,
      PostCode: this.getPostCode(party),
    };
  }

  static buildClaimantAndDefendantData(party: Party, partyType: PartyType): any {
    const commonPartyData = {
      type: partyType.type,
      partyEmail: `${party.key}@${partyType.key}.com`,
      partyPhone: this.getPhoneNumber(party),
      primaryAddress: this.buildAddressData(party),
    };

    const partyKey = StringHelper.capitalise(party.key);
    const partyTypeKey = StringHelper.capitalise(partyType.key);

    switch (partyType) {
      case partyTypes.INDIVIDUAL:
        return {
          ...commonPartyData,
          individualTitle: 'Mx',
          individualFirstName: `${partyKey}First`,
          individualLastName: `${partyKey}Last`,
          individualDateOfBirth: this.getDateOfBirth(party),
        };

      case partyTypes.COMPANY:
        return {
          ...commonPartyData,
          companyName: `${partyKey} ${partyTypeKey}`,
        };

      case partyTypes.SOLE_TRADER:
        return {
          ...commonPartyData,
          soleTraderTitle: 'Mx',
          soleTraderFirstName: `${partyKey}First`,
          soleTraderLastName: `${partyKey}Last`,
          soleTraderTradingAs: `${partyKey}TradingAs`,
          soleTraderDateOfBirth: this.getDateOfBirth(party),
        };
      case partyTypes.ORGANISATION:
        return {
          ...commonPartyData,
          organisationName: `${party.key} ${partyTypeKey}`,
        };
    }
  }

  static buildLitigationFriendData(party: Party) {
    return {
      firstName: `${party.key}First`,
      lastName: `${party.key}Last`,
      emailAddress: `${party.key}@litigants.com`,
      phoneNumber: this.getPhoneNumber(party),
      hasSameAddressAsLitigant: 'No',
      primaryAddress: CaseDataHelper.buildAddressData(party),
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
