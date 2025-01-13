export const heading = 'Respond to claim';

export const radioButtons = {
  defendant1Address: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: '#specAoSApplicantCorrespondenceAddressRequired_Yes',
    },
    no: {
      label: 'no',
      selector: '#specAoSApplicantCorrespondenceAddressRequired_No',
    },
  },
  defendant2Address: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: '#specAoSRespondent2CorrespondenceAddressRequired_Yes',
    },
    no: {
      label: 'no',
      selector: '#specAoSRespondent2CorrespondenceAddressRequired_No',
    },
  },
  defendant2AddressFastTrack: {
    label: 'Is this address correct?',
    yes: {
      label: 'Yes',
      selector: '#specAoSRespondent2HomeAddressRequired_Yes',
    },
    no: {
      label: 'no',
      selector: '#specAoSRespondent2HomeAddressRequired_No',
    },
  },
};
