import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { CaseFlagHolder } from '../../caseFlags/caseFlagHolders.ts';
import { holderFlags } from './caseFlagData.ts';

// Updates a case flag (MANAGE_CASE_FLAGS) as the hearing centre admin through the CCD API, instead of XUI's flag
// component
export class ManageCaseFlag {
  private ccdApiHelper = new CcdApiHelper();

  // Makes the holder's active flag with this code inactive, with the reason as the update comment, as the component does
  async makeInactive(caseId: string, holder: CaseFlagHolder, flagCode: string, reason: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'MANAGE_CASE_FLAGS', caseId, [
      {
        page: 'ManageCaseFlags',
        answers: (data) => {
          const flags = holderFlags(data, holder);
          const index = flags.details.findIndex((detail) => detail.value?.flagCode === flagCode && detail.value?.status === 'Active');
          if (index < 0) {
            throw new Error(`${holder} has no active ${flagCode} flag to make inactive`);
          }
          flags.details[index] = {
            ...flags.details[index],
            value: { ...flags.details[index].value, status: 'Inactive', flagUpdateComment: reason, dateTimeModified: new Date().toISOString() },
          };
          return flags.toCaseData();
        },
      },
    ]);
    console.log(`MANAGE_CASE_FLAGS (${flagCode} on ${holder} made inactive) submitted through the API on case ${caseId}`);
  }
}
