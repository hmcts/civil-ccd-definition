import { v4 as uuidv4 } from 'uuid';
import StringHelper from './string-helper';
import ClaimTrack from '../enums/claim-track';
import { Party } from '../models/partys';
import partys from '../constants/partys';
import { ClaimantDefendantPartyType } from '../models/claimant-defendant-party-types';
import claimantDefendantPartyTypes from '../constants/claimant-defendant-party-types';

export default class CaseDataHelper {
  static getNextClaimNumber() {
    return '00' + Math.random().toString(36).slice(-6);
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

  static getPartyDateOfBirth(party: Party) {
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
    }
  }

  static getPartyPhoneNumber(party: Party) {
    switch (party) {
      case partys.CLAIMANT_1:
        return '07123456789';
      case partys.CLAIMANT_2:
        return '07890123456';
      case partys.CLAIMANT_1_LITIGATION_FRIEND:
        return '07984234567';
      case partys.CLAIMANT_2_LITIGATION_FRIEND:
        return '07456987654';
      case partys.CLAIMANT_EXPERT_1:
        return '07688543210';
      case partys.CLAIMANT_EXPERT_2:
        return '07872345678';
      case partys.CLAIMANT_WITNESS_1:
        return '07501234567';
      case partys.CLAIMANT_WITNESS_2:
        return '07984112233';
      case partys.CLAIMANT_1_MEDIATION_FRIEND:
        return '07984224466';
      case partys.DEFENDANT_1:
        return '07853654321';
      case partys.DEFENDANT_2:
        return '07712345678';
      case partys.DEFENDANT_1_LITIGATION_FRIEND:
        return '07906789012';
      case partys.DEFENDANT_2_LITIGATION_FRIEND:
        return '07321654987';
      case partys.DEFENDANT_SOLICITOR_1:
        return '07987654321';
      case partys.DEFENDANT_SOLICITOR_2:
        return '07987654325';
      case partys.DEFENDANT_1_EXPERT_1:
        return '07311987654';
      case partys.DEFENDANT_1_EXPERT_2:
        return '07615876543';
      case partys.DEFENDANT_2_EXPERT_1:
        return '07893654321';
      case partys.DEFENDANT_2_EXPERT_2:
        return '07456123890';
      case partys.DEFENDANT_1_WITNESS_1:
        return '07865432109';
      case partys.DEFENDANT_1_WITNESS_2:
        return '07713659876';
      case partys.DEFENDANT_2_WITNESS_1:
        return '07592345612';
      case partys.DEFENDANT_2_WITNESS_2:
        return '07985674230';
      case partys.DEFENDANT_1_MEDIATION_FRIEND:
        return '07985366442';
      case partys.DEFENDANT_2_MEDIATION_FRIEND:
        return '07985685321';
    }
  }

  static getPartyPostCode(party: Party) {
    switch (party) {
      case partys.CLAIMANT_1:
        return 'W1A 1AA';
      case partys.CLAIMANT_2:
        return 'BS1 4ST';
      case partys.CLAIMANT_1_LITIGATION_FRIEND:
        return 'CF10 1EP';
      case partys.CLAIMANT_2_LITIGATION_FRIEND:
        return 'LS1 4AP';
      case partys.CLAIMANT_SOLICITOR_1:
        return 'SW1A 1AA';
      case partys.DEFENDANT_1:
        return 'M1 1AE';
      case partys.DEFENDANT_2:
        return 'TN23 1LE';
      case partys.DEFENDANT_1_LITIGATION_FRIEND:
        return 'SO15 2JY';
      case partys.DEFENDANT_2_LITIGATION_FRIEND:
        return 'EX1 1JG';
      case partys.DEFENDANT_SOLICITOR_1:
        return 'B1 1AA';
      case partys.DEFENDANT_SOLICITOR_2:
        return 'M4 5DL';
    }
  }

  static getExpertEstimatedCost(party: Party) {
    switch (party) {
      case partys.CLAIMANT_EXPERT_1:
        return '587';
      case partys.CLAIMANT_EXPERT_2:
        return '344';
      case partys.DEFENDANT_1_EXPERT_1:
        return '762';
      case partys.DEFENDANT_1_EXPERT_2:
        return '231';
      case partys.DEFENDANT_2_EXPERT_1:
        return '915';
      case partys.DEFENDANT_2_EXPERT_2:
        return '478';
    }
  }

  static buildAddressData(party: Party) {
    return {
      AddressLine1: `Flat 12 - ${party.key}`,
      AddressLine2: `House 15 - 17 - ${party.key}`,
      AddressLine3: `Street - ${party.key} `,
      PostTown: `Town - ${party.key}`,
      County: `County - ${party.key}`,
      Country: `Country - ${party.key}`,
      PostCode: this.getPartyPostCode(party),
    };
  }

  static buildClaimantAndDefendantData(party: Party, partyType: ClaimantDefendantPartyType): any {
    const commonPartyData = {
      type: partyType.type,
      partyEmail: `${party.key}@${partyType.key}.com`,
      partyPhone: this.getPartyPhoneNumber(party),
      primaryAddress: this.buildAddressData(party),
    };

    const partyKey = StringHelper.capitalise(party.key);
    const partyTypeKey = StringHelper.capitalise(partyType.key);

    switch (partyType) {
      case claimantDefendantPartyTypes.INDIVIDUAL:
        return {
          ...commonPartyData,
          individualTitle: 'Mx',
          individualFirstName: partyKey,
          individualLastName: partyTypeKey,
          individualDateOfBirth: this.getPartyDateOfBirth(party),
        };

      case claimantDefendantPartyTypes.COMPANY:
        return {
          ...commonPartyData,
          companyName: `${partyKey} ${partyTypeKey}`,
        };

      case claimantDefendantPartyTypes.SOLE_TRADER:
        return {
          ...commonPartyData,
          soleTraderTitle: 'Mx',
          soleTraderFirstName: partyKey,
          soleTraderLastName: partyTypeKey,
          soleTraderTradingAs: `${partyKey} Trade`,
          soleTraderDateOfBirth: this.getPartyDateOfBirth(party),
        };
      case claimantDefendantPartyTypes.ORGANISATION:
        return {
          ...commonPartyData,
          organisationName: `${partyKey} ${partyTypeKey}`,
        };
    }
  }

  static buildUnregisteredOrganisationData(party: Party) {
    return {
      address: this.buildAddressData(party),
      organisationName: `${party.key} - Solicitors`,
      phoneNumber: this.getPartyPhoneNumber(party),
      email: `${party.key}@solicitor.com`,
      DX: '123',
      fax: '5550234',
    };
  }

  static buildLitigationFriendData(party: Party) {
    return {
      firstName: StringHelper.capitalise(party.key),
      lastName: 'Litigation',
      emailAddress: `${party.key}@litigants.com`,
      phoneNumber: this.getPartyPhoneNumber(party),
      hasSameAddressAsLitigant: 'No',
      primaryAddress: this.buildAddressData(party),
    };
  }

  static buildExpertData(party: Party) {
    return {
      firstName: StringHelper.capitalise(party.key),
      lastName: 'Expert',
      emailAddress: `${party.key}@experts.com`,
      phoneNumber: this.getPartyPhoneNumber(party),
      fieldOfExpertise: `Field of expertise - ${party.key}`,
      whyRequired: `Reason required - ${party.key}`,
      estimatedCost: this.getExpertEstimatedCost(party),
    };
  }

  static buildMediationData(party: Party) {
    return {
      firstName: StringHelper.capitalise(party.key),
      lastName: 'Mediation',
      emailAddress: `${party.key}@mediation.com`,
      phoneNumber: this.getPartyPhoneNumber(party),
    };
  }

  static buildWitnessData(party: Party) {
    return {
      firstName: StringHelper.capitalise(party.key),
      lastName: 'Witness',
      phoneNumber: this.getPartyPhoneNumber(party),
      emailAddress: `${party.key}@witnesses.com`,
      reasonForWitness: `Reason for witness - ${party.key}`,
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
