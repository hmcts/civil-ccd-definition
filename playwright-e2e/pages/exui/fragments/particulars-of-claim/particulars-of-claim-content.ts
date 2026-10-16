export const subheadings = {
  uploadDocuments: 'Upload documents',
  particularsOfClaim: 'Particulars of claim (Optional)',
  scheduleOfLoss: 'Schedule of loss',
  certificateOfSuitability: 'Certificate of suitability',
};

export const inputs = {
  uploadParticularsOfClaim: {
    title: 'Document (Optional)',
    selector: '#servedDocumentFiles_particularsOfClaimDocument_value',
    claimText: {
      selector: '#servedDocumentFiles_particularsOfClaimText',
    },
  },
  uploadMedicalReports: {
    title: 'Document (Optional)',
    selector: '#servedDocumentFiles_medicalReport_0_document',
  },
  uploadScheduleOfLoss: {
    title: 'Document (Optional)',
    selector: '#servedDocumentFiles_scheduleOfLoss_0_document',
  },
  uploadCertificateOfSuitability: {
    title: 'Document (Optional)',
    selector: '#servedDocumentFiles_certificateOfSuitability_0_document',
  },
};

export const buttons = {
  addParticularsOfClaim: {
    title: 'Add new',
    selector:
      "div[id='servedDocumentFiles_particularsOfClaimDocument'] button[class='button write-collection-add-item__top']",
  },
  addMedicalReports: {
    title: 'Add new',
    selector:
      "div[id='servedDocumentFiles_medicalReport'] button[class='button write-collection-add-item__top']",
  },
  addScheduleOfLoss: {
    title: 'Add new',
    selector:
      "div[id='servedDocumentFiles_scheduleOfLoss'] button[class='button write-collection-add-item__top']",
  },
  addCertificateOfSuitability: {
    title: 'Add new',
    selector:
      "div[id='servedDocumentFiles_certificateOfSuitability'] button[class='button write-collection-add-item__top']",
  },
};
