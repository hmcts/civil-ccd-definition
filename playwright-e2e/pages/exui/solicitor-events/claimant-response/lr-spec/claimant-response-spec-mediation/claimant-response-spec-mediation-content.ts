export const mediationParagraphs = {
  p1: 'Test Inc has automatically been registered to take part in free mediation from HM Courts and Tribunals Service.',
  p2: 'Using a mediator can help settle a dispute without going to court which can be quicker, cheaper and less stressful for all parties.',
  p3: {
    text: 'Find out more about',
    containerSelector:
      "div[id='applicant1ClaimMediationSpecRequiredLip_applicant1ClaimMediationSpecRequiredLip'] dl[id='claimMediationLabel'] p:nth-child(1)",
  },
};

export const mediationRadioForm = {
  legend: 'Mediation Decision',
  agreeButton: {
    label: 'I have read and understood the above',
    selector: '#applicant1ClaimMediationSpecRequiredLip_hasAgreedFreeMediation-Yes',
  },
  optOutButton: {
    label: 'Opt out of mediation',
    selector: '#applicant1ClaimMediationSpecRequiredLip_hasAgreedFreeMediation-No',
  },
};
