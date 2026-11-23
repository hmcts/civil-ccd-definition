import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { MciChange, MciSpec, mciSessionUser } from '../shared_api_ui/manageContactInformationSpecs.ts';
import { buildManageContactInformationPayload } from './payloads/manageContactInformationPayload.ts';

// Updates contact details (MANAGE_CONTACT_INFORMATION) as the admin or a solicitor through the CCD API, instead of
// going through the event's pages in XUI
export class ManageContactInformation {
  private ccdApiHelper = new CcdApiHelper();

  // sessionUser is who runs it, the spec's user unless someone else now represents that party (NOTICE_OF_CHANGE)
  async submit(caseId: string, spec: MciSpec, change: MciChange, sessionUser: SessionUserKey = mciSessionUser(spec)) {
    const user = sessionUsers[sessionUser].credentials;
    const started = await this.ccdApiHelper.startEvent(user, 'MANAGE_CONTACT_INFORMATION', caseId);
    const payload = buildManageContactInformationPayload(started.caseData, spec, change);
    await this.ccdApiHelper.submitEvent(user, 'MANAGE_CONTACT_INFORMATION', started.token, payload, caseId);
    console.log(`MANAGE_CONTACT_INFORMATION submitted through the API as ${spec.user} for ${spec.party} on case ${caseId}`);
  }
}
