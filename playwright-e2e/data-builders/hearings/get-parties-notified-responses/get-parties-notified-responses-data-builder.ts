import BaseDataBuilder from '../../../base/base-data-builder';
import HearingNoticeScenario from '../../../constants/hearings/hearing-notice-scenario';
import { AllMethodsStep } from '../../../decorators/test-steps';
import getPartiesNotifiedResponsesDataBuilderComponents from './get-parties-notified-responses-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class GetPartiesNotifiedResponsesDataBuilder extends BaseDataBuilder {
  async buildSingleHmcResponse(): Promise<Record<string, any>[]> {
    return [];
  }

  async buildSkipNoticeCurrentVersionNotified(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.currentVersionNotifiedResponse(
        HearingNoticeScenario.SKIP_NOTICE_CURRENT_VERSION_NOTIFIED,
        listedHearing,
      ),
    ];
  }

  async buildNotifyCurrentVersionMultiHmcResponses(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.previousVersionChangedScheduleResponse(
        HearingNoticeScenario.NOTIFY_CURRENT_VERSION_MULTI_HMC_RESPONSES,
        listedHearing,
      ),
      getPartiesNotifiedResponsesDataBuilderComponents.currentVersionChangedScheduleResponse(
        HearingNoticeScenario.NOTIFY_CURRENT_VERSION_MULTI_HMC_RESPONSES,
        listedHearing,
      ),
    ];
  }

  async buildGenerateNoticeRelistedVersion(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.oldVersionChangedScheduleResponse(
        HearingNoticeScenario.GENERATE_NOTICE_RELISTED_VERSION,
        listedHearing,
      ),
    ];
  }

  async buildAcknowledgeHearingWithoutNotice(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.pastResponseReceivedNotifiedResponse(
        HearingNoticeScenario.ACKNOWLEDGE_HEARING_WITHOUT_NOTICE,
        listedHearing,
      ),
    ];
  }

  async buildAvoidDuplicateNoticeWithoutGeneratingNotice(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.currentVersionNotifiedResponse(
        HearingNoticeScenario.AVOID_DUPLICATE_NOTICE_WITHOUT_GENERATING_NOTICE,
        listedHearing,
      ),
    ];
  }

  async buildGenerateNoticePartialHmcResponse(listedHearing: Record<string, any>): Promise<Record<string, any>[]> {
    return [
      getPartiesNotifiedResponsesDataBuilderComponents.partialChangedScheduleResponse(
        HearingNoticeScenario.GENERATE_NOTICE_PARTIAL_HMC_RESPONSE,
        listedHearing,
      ),
    ];
  }

  protected async buildData(): Promise<Record<string, any>[]> {
    throw new Error('Method not implemented');
  }
}
