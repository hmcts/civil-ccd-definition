import BaseRequest from '../base/base-request';
import { TOTP } from 'totp-generator';
import { AllMethodsStep } from '../decorators/test-steps';
import config from '../config/config';
import RequestOptions from '../types/request-options';
import urls from '../config/urls';

export default function ServiceAuthProviderRequests<
  TBase extends abstract new (...args: any[]) => BaseRequest,
>(Base: TBase) {
  @AllMethodsStep()
  abstract class ServiceAuthProviderRequests extends Base {
    private static civilS2sToken: string;

    async fetchCivilS2sToken() {
      if (!ServiceAuthProviderRequests.civilS2sToken) {
        console.log('Fetching s2s token...');
        const url = `${urls.authProviderApi}/lease`;
        const requestOptions: RequestOptions = {
          method: 'POST',
          body: {
            microservice: config.s2s.microservice,
            oneTimePassword: TOTP.generate(config.s2s.secret).otp,
          },
        };
        const response = await super.retriedRequest(url, requestOptions);
        console.log('s2s token fetched successfully');
        ServiceAuthProviderRequests.civilS2sToken = await response.text();
      }
      return ServiceAuthProviderRequests.civilS2sToken;
    }
  }

  return ServiceAuthProviderRequests;
}
