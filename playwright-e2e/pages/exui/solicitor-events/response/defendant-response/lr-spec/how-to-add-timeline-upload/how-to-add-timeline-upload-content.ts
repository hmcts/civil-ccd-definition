import { Party } from '../../../../../../../models/partys';

export const heading = 'Upload claim timeline template';

export const inputs = {
  upload: {
    label: 'Upload files',
    selector: (party: Party) =>
      `#specResponseTimelineDocumentFiles${party.number === 1 ? '' : party.number}`,
  },
};
