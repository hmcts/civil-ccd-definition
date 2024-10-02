import BaseRequestsFactory from '../base/base-requests-factory';
import CcdRequests from './ccd-requests';
import IdamRequests from './idam-requests';

export default class RequestsFactory extends BaseRequestsFactory {
  get ccdRequests() {
    return new CcdRequests(this.requestContext);
  }

  get idamRequests() {
    return new IdamRequests(this.requestContext);
  }
}
