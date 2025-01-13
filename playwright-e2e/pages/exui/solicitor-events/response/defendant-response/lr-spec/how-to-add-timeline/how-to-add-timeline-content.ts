import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  howToAddTimeline: 'How do you want to add the claim timeline?',
};

export const radioButtons = {
  upload: {
    label: 'Upload claim timeline template',
    selector: (party: Party) =>
      `#specClaimResponseTimelineList${party.number === 1 ? '' : party.number}-UPLOAD`,
  },
  manual: {
    label: 'Add manually',
    selector: (party: Party) =>
      `#specClaimResponseTimelineList${party.number === 1 ? '' : party.number}-MANUAL`,
  },
};
