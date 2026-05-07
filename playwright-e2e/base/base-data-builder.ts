import RequestsFactory from "../requests/requests-factory";

export default abstract class BaseDataBuilder {
  protected requestsFactory: RequestsFactory;

  constructor(requestsFactory: RequestsFactory) {
    this.requestsFactory = requestsFactory;
  }

  protected abstract buildData(...args: any[]): any;
}
