const { expect } = require('chai');
const dataProvider = require('../utils/dataProvider');

const field = 'invalidHearingNoticeProcessed';
const type = 'InvalidHearingNoticeProcessed';

dataProvider.exclusions.forEach((value, environment) => {
  describe(`Invalid hearing response tracking: ${environment}`, () => {
    const config = sheet => dataProvider.getConfig(`../../../../ccd-definition/civil/${sheet}`, environment);

    it('defines a collection with the complete hearing response identity', () => {
      const fields = config('CaseField').filter(row => row.ID === field);
      expect(fields).to.have.length(1);
      expect(fields[0]).to.include({ FieldType: 'Collection', FieldTypeParameter: type });
      const elements = config('ComplexTypes').filter(row => row.ID === type);
      expect(elements.map(row => [row.ListElementCode, row.FieldType])).to.have.deep.members([
        ['hearingId', 'Text'], ['requestVersion', 'Number'], ['responseReceivedDateTime', 'DateTime']
      ]);
    });

    it('allows only the system update role to maintain the collection', () => {
      const permissions = config('AuthorisationCaseField').filter(row => row.CaseFieldID === field);
      expect(permissions).to.have.length(1);
      expect(permissions[0]).to.include({ UserRole: 'caseworker-civil-systemupdate', CRUD: 'CRU' });
    });

    it('persists the optional record on the same event that initiates the WA task', () => {
      const mappings = config('CaseEventToFields').filter(row => row.CaseFieldID === field);
      expect(mappings).to.have.length(1);
      expect(mappings[0]).to.include({ CaseEventID: 'INVALID_HEARING_NOTICE', DisplayContext: 'OPTIONAL' });
      expect(config('CaseEvent').find(row => row.ID === 'INVALID_HEARING_NOTICE').Publish).to.equal('Y');
    });
  });
});
