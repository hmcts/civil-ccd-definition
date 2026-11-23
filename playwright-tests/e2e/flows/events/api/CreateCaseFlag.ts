import { randomUUID } from 'node:crypto';
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { CaseFlagHolder } from '../../caseFlags/caseFlagHolders.ts';
import { CaseFlagType } from '../../caseFlags/caseFlagTypes.ts';
import { CreateCaseFlagAnswers } from '../ui/CreateCaseFlag.ts';
import { holderFlags } from './caseFlagData.ts';

// Adds a case flag (CREATE_CASE_FLAGS) as the hearing centre admin through the CCD API, instead of XUI's flag
// component. The flag is added to the holder's flags as the component adds it: the flag type's name, code, reference
// data path and hearing relevance, the language for an interpreter flag, the description for an "Other" flag and the
// comment. Flags court staff create are active.
export class CreateCaseFlag {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, holder: CaseFlagHolder, flagType: CaseFlagType, answers: CreateCaseFlagAnswers) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'CREATE_CASE_FLAGS', caseId, [
      {
        page: 'CreateCaseFlags',
        answers: (data) => {
          const flags = holderFlags(data, holder);
          flags.details.push({ id: randomUUID(), value: this.flagDetail(flagType, answers) });
          return flags.toCaseData();
        },
      },
    ]);
    console.log(`CREATE_CASE_FLAGS (${flagType.code} on ${holder}) submitted through the API on case ${caseId}`);
  }

  private flagDetail(flagType: CaseFlagType, answers: CreateCaseFlagAnswers): Record<string, any> {
    const detail: Record<string, any> = {
      name: flagType.name,
      flagCode: flagType.code,
      path: flagType.refDataPath.map((value) => ({ id: randomUUID(), value })),
      hearingRelevant: flagType.hearingRelevant ? 'Yes' : 'No',
      status: 'Active',
      flagComment: answers.comment,
      dateTimeCreated: new Date().toISOString(),
    };
    if (flagType.hasListOfValues) {
      const languageName = answers.language ?? (flagType.code === 'RA0042' ? 'British Sign Language (BSL)' : 'Welsh');
      const language = flagType.listOfValues.find((entry) => entry.value === languageName);
      if (!language) {
        throw new Error(`${languageName} is not one of the languages reference data offers for ${flagType.code}`);
      }
      detail.subTypeKey = language.key;
      detail.subTypeValue = language.value;
    }
    if (flagType.code === 'OT0001') {
      detail.otherDescription = answers.otherDescription ?? 'Other flag added by the journey';
    }
    return detail;
  }
}
