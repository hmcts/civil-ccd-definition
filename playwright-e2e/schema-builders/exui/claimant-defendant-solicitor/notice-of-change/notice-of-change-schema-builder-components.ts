import { z } from 'zod';
import ClaimType from '../../../../constants/cases/claim-type';
import partys from '../../../../constants/users/partys';
import { Party } from '../../../../models/users/partys';


const claimant1Undefined = (party: Party) => {
  if (party === partys.CLAIMANT_1) {
    return {
      solicitorReferences: z.looseObject({
        applicantSolicitor1Reference: z.undefined().optional(),
      }).optional(),
      applicantSolicitor1UserDetails: z.looseObject({
        id: z.undefined().optional(),
      }).optional(),
      applicantSolicitor1PbaAccounts: z.undefined().optional(),
      applicantSolicitor1ServiceAddress: z.undefined().optional(),
      specApplicantCorrespondenceAddressdetails: z.undefined().optional(),
      applicant1OrganisationPolicy: z.looseObject({
        OrgPolicyReference: z.undefined().optional(),
      }),
    };
  }

  return {};
};

const defendant1Undefined = (party: Party) => {
  if (party === partys.DEFENDANT_1) {
    return {
      solicitorReferences: z.looseObject({
        respondentSolicitor1Reference: z.undefined().optional(),
      }).optional(),
      specRespondentCorrespondenceAddressdetails: z.undefined().optional(),
      respondentSolicitor1ServiceAddress: z.undefined().optional(),
      respondent1OrganisationPolicy: z.looseObject({
        OrgPolicyReference: z.undefined().optional(),
      }),
      caseListDisplayDefendantSolicitorReferences: z.undefined().optional(),
      addLegalRepDeadlineRes1: z.undefined().optional(),
    };
  }
  return {};
};

const defendant2Undefined = (party: Party) => {
  if (party === partys.DEFENDANT_2) {
    return {
      respondentSolicitor2Reference: z.undefined().optional(),
      specRespondent2CorrespondenceAddressdetails: z.undefined().optional(),
      specRespondent2CorrespondenceAddressRequired: z.undefined().optional(),
      respondentSolicitor2ServiceAddress: z.undefined().optional(),
      respondent2OrganisationPolicy: z.looseObject({
        OrgPolicyReference: z.undefined().optional(),
      }),
      caseListDisplayDefendantSolicitorReferences: z.undefined().optional(),
      solicitorReferences: z.looseObject({
        respondentSolicitor2Reference: z.undefined().optional(),
      }).optional(),
      addLegalRepDeadlineRes2: z.undefined().optional(),
    };
  }
  return {};
};

const ignore = {
  unassignedCaseListDisplayOrganisationReferences: z.any().optional(),
  caseListDisplayDefendantSolicitorReferences: z.any().optional(),
};


export default {
  claimant1Undefined,
  defendant1Undefined,
  defendant2Undefined,
  ignore,
};
