import trackType from '../../../../enums/track.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';

// The Standard Direction Order (CREATE_SDO) once the claim is in JUDICIAL_REFERRAL, as the judge (or for a small claim
// the legal adviser) through the CCD API, instead of the event's pages in XUI. As in the UI the fast and small claims
// tracks are coded: a standard directions order on the claim's track, with civil-service's directions as they are and a
// one hour hearing (a fast track claim without a complexity band). A noise induced hearing loss claim gets the NIHL
// directions, which civil-service fills in completely.
//
// The track page's mid event callback says which directions page follows (setSmallClaimsFlag, setFastTrackFlag, and
// isSdoR2NewScreen for the newer pages), and the directions page's callback generates the order document the preview
// page shows and the order is issued with.
export class CreateSdo {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, user: SessionUserKey, track: trackType, noiseInducedHearingLoss: boolean = false) {
    if (track !== trackType.FAST && track !== trackType.SMALL) {
      throw new Error(`CreateSdo only has the fast and small claims tracks coded, not ${track}`);
    }
    const small = track === trackType.SMALL;
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'CREATE_SDO', caseId, [
      // A standard directions order rather than a draft directions order
      { page: 'SDO', answers: { drawDirectionsOrderRequired: 'No' } },
      {
        page: 'ClaimsTrack',
        answers: small
          ? { claimsTrack: 'smallClaimsTrack' }
          : { claimsTrack: 'fastTrack', ...(noiseInducedHearingLoss ? { fastClaims: ['fastClaimNoiseInducedHearingLoss'] } : {}) },
      },
      {
        page: 'SmallClaims',
        when: (data) => data.setSmallClaimsFlag === 'Yes' && data.isSdoR2NewScreen !== 'Yes',
        answers: (data) => ({ smallClaimsHearing: { ...data.smallClaimsHearing, time: 'ONE_HOUR' } }),
      },
      { page: 'SdoR2SmallClaims', when: (data) => data.setSmallClaimsFlag === 'Yes' && data.isSdoR2NewScreen === 'Yes' },
      {
        page: 'FastTrack',
        when: (data) => data.setFastTrackFlag === 'Yes' && data.isSdoR2NewScreen !== 'Yes',
        answers: (data) => ({
          fastTrackAllocation: { ...data.fastTrackAllocation, assignComplexityBand: 'No' },
          fastTrackHearingTime: { ...data.fastTrackHearingTime, hearingDuration: 'ONE_HOUR' },
        }),
      },
      { page: 'SdoR2FastTrack', when: (data) => data.setFastTrackFlag === 'Yes' && data.isSdoR2NewScreen === 'Yes' },
      { page: 'OrderPreview' },
    ]);
    console.log(`CREATE_SDO (${track}${noiseInducedHearingLoss ? ', NIHL' : ''}) submitted through the API as ${user} on case ${caseId}`);
  }
}
