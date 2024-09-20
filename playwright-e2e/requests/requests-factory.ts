import BaseRequestsFactory from '../base/base-requests-factory';
import CcdRequests from './ccd-requests';
import ClaimStoreRequests from './claim-store-requests';
import IdamRequests from './idam-requests';

export default class RequestsFactory extends BaseRequestsFactory {
  get ccdRequests() {
    return new CcdRequests(this.requestContext);
  }

  get claimsStoreRequests() {
    return new ClaimStoreRequests(this.requestContext);
  }

  get idamRequests() {
    return new IdamRequests(this.requestContext);
  }
}
