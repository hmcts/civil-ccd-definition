import { Party } from '../../../../../../../models/partys';

export const heading = 'Upload claim timeline template';

export const inputs = {
  upload: {
    label: 'Upload files',
    selector: (defendantParty: Party) =>
      `#specResponseTimelineDocumentFiles${defendantParty.number === 1 ? '' : defendantParty.number}`,
  },
};
