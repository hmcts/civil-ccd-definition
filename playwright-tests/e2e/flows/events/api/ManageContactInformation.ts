import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers } from '../../../../helpers/SessionHelper.ts';
import { MciChange, MciSpec, mciSessionUser } from '../../manageContactInformation/manageContactInformationSpecs.ts';
import { buildManageContactInformationPayload } from './payloads/manageContactInformationPayload.ts';

// Updates contact details (MANAGE_CONTACT_INFORMATION) as the admin or a solicitor through the CCD API, instead of
// going through the event's pages in XUI
export class ManageContactInformation {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, spec: MciSpec, change: MciChange) {
    const user = sessionUsers[mciSessionUser(spec)].credentials;
    const started = await this.ccdApiHelper.startEvent(user, 'MANAGE_CONTACT_INFORMATION', caseId);
    const payload = buildManageContactInformationPayload(started.caseData, spec, change);
    await this.ccdApiHelper.submitEvent(user, 'MANAGE_CONTACT_INFORMATION', started.token, payload, caseId);
    console.log(`MANAGE_CONTACT_INFORMATION submitted through the API as ${spec.user} for ${spec.party} on case ${caseId}`);
  }
}
