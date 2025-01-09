import Party from '../../../../../../../enums/party';

export const subheadings = {
  uploadDefence: 'Upload defence',
};

export const getInputs = (party: Party) => ({
  uploadDoc: {
    label: "Defendant's defence",
    selector: `#${party}ClaimResponseDocument_file`,
  },
});
