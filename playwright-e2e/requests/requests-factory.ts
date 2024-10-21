import BaseRequestsFactory from '../base/base-requests-factory';
import CCDRequests from './ccd-requests';
import IdamRequests from './idam-requests';
import ServiceAuthProviderRequests from './service-auth-provider-requests';

export default class RequestsFactory extends BaseRequestsFactory {
  get ccdRequests() {
    return new CCDRequests(this.requestContext);
  }

  get idamRequests() {
    return new IdamRequests(this.requestContext);
  }
}
