export const subheadings = {
  uploadDocuments: 'Upload documents',
  partiularsOfClaim: 'Particulars of claim (Optional)',
  medicalReports: 'Medical reports',
  scheduleOfLoss: 'Schedule of loss',
  certificateOfSuitability: 'Certificate of suitability',
};

export const inputs = {
  uploadPartiularsOfClaim: {
    title: 'Choose file',
    selector: '#servedDocumentFiles_particularsOfClaimDocument_value',
  },
  uploadMedicalReports: {
    title: 'Choose file',
    selector: '#servedDocumentFiles_medicalReport_0_document',
  },
  uploadScheduleOfLoss: {
    title: 'Choose file',
    selector: '#servedDocumentFiles_scheduleOfLoss_0_document',
  },
  uploadCertificateOfSuitability: {
    title: 'Choose file',
    selector: '#servedDocumentFiles_certificateOfSuitability_0_document',
  },
};

export const buttons = {
  addPartiularsOfClaim: {
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
