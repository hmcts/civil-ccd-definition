import RequestsFactory from '../requests/requests-factory';

export default abstract class BaseDataBuilderFactory {
  private _requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory) {
    this._requestsFactory = requestsFactory;
  }

  protected get requestsFactory() {
    return this._requestsFactory;
  }
}