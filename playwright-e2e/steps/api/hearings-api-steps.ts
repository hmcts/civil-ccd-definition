import BaseApi from '../../base/base-api';
import { civilSystemUpdate } from '../../config/users/exui-users';
import urls from '../../config/urls';
import CamundaProcess from '../../constants/camunda/camunda-processes';
import GetPartiesNotifiedResponsesDataBuilder from '../../data-builders/hearings/get-parties-notified-responses/get-parties-notified-responses-data-builder';
import ListedHearingDataBuilder from '../../data-builders/hearings/listed-hearing/unspec/listed-hearing-data-builder';
import ListedHearingSpecDataBuilder from '../../data-builders/hearings/listed-hearing/lr-spec/listed-hearing-spec-data-builder';
import WireMockStudsDataBuilder from '../../data-builders/wire-mock-studs/wire-mock-studs-data-builder';
import { AllMethodsStep } from '../../decorators/test-steps';
import CrossWorkerLockHelper from '../../helpers/cross-worker-lock-helper';
import TestData from '../../models/test-utils/test-data';
import RequestsFactory from '../../requests/requests-factory';

// The hearing-notice scheduler reads WireMock stubs that every hearings test rewrites: the
// '/unNotifiedHearings/.*' and '/partiesNotified/.*' stubs match any hearing, so they can't be
// made per test. When two hearings tests ran in parallel, one test's stubs replaced the other's
// mid-scheduler and the waiting test timed out after 300s. withHearingStubs runs the stub set-up
// and the scheduler run that depends on it one test at a time; claim set-up still runs in parallel.
@AllMethodsStep({
  methodNamesToIgnore: ['generateHearingNotice', 'generateHearingNoticeExpectingNoNotice', 'withHearingStubs'],
})
export default class HearingsApiSteps extends BaseApi {
  private wireMockStudsDataBuilder: WireMockStudsDataBuilder;
  private listedHearingDataBuilder: ListedHearingDataBuilder;
  private listedHearingSpecDataBuilder: ListedHearingSpecDataBuilder;
  private getPartiesNotifiedResponsesDataBuilder: GetPartiesNotifiedResponsesDataBuilder;

  constructor(
    requestsFactory: RequestsFactory,
    wireMockStudsDataBuilder: WireMockStudsDataBuilder,
    listedHearingDataBuilder: ListedHearingDataBuilder,
    listedHearingSpecDataBuilder: ListedHearingSpecDataBuilder,
    getPartiesNotifiedResponsesDataBuilder: GetPartiesNotifiedResponsesDataBuilder,
    testData: TestData,
  ) {
    super(requestsFactory, testData);
    this.wireMockStudsDataBuilder = wireMockStudsDataBuilder;
    this.listedHearingDataBuilder = listedHearingDataBuilder;
    this.listedHearingSpecDataBuilder = listedHearingSpecDataBuilder;
    this.getPartiesNotifiedResponsesDataBuilder = getPartiesNotifiedResponsesDataBuilder;
  }

  async SetupStaticMocks() {
    const staticMockStuds = [
      await this.wireMockStudsDataBuilder.buildGetPartiesNotifiedStub(),
      await this.wireMockStudsDataBuilder.buildPutPartiesNotifiedStub(),
    ];

    await this.withHearingStubs(() => super.createUpdateStud(staticMockStuds));
  }

  private withHearingStubs<T>(fn: () => Promise<T>): Promise<T> {
    return CrossWorkerLockHelper.withLock('hearing-wiremock-stubs', urls.wiremockUrl ?? 'wiremock', fn);
  }

  async GenerateDisposalHearingNoticeSpec() {
    await this.generateHearingNotice(
      await this.listedHearingSpecDataBuilder.buildDisposal(),
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  async GenerateSingleHmcResponseHearingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSingleHmcResponse(),
    );
  }

  async GenerateCurrentVersionMultiHmcResponsesHearingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildDisposalV2();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildNotifyCurrentVersionMultiHmcResponses(hearing),
    );
  }

  async GenerateRelistedVersionHearingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildTrailV2();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildGenerateNoticeRelistedVersion(hearing),
    );
  }

  async GeneratePartialHmcResponseHearingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildGenerateNoticePartialHmcResponse(hearing),
    );
  }

  async SkipCurrentVersionNotifiedHearingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildTrail();
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSkipNoticeCurrentVersionNotified(hearing),
    );
  }

  async AcknowledgeUnchangedHearingWithoutNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildDisposal();
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildAcknowledgeHearingWithoutNotice(hearing),
    );
  }

  async AvoidDuplicateNoticeWithoutGeneratingNoticeSpec() {
    const hearing = await this.listedHearingSpecDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSingleHmcResponse(),
    );
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildAvoidDuplicateNoticeWithoutGeneratingNotice(hearing),
    );
  }

  async GenerateTrailHearingNoticeSpec() {
    await this.generateHearingNotice(
      await this.listedHearingSpecDataBuilder.buildTrail(),
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  async GenerateDRHearingNoticeSpec() {
    await this.generateHearingNotice(
      await this.listedHearingSpecDataBuilder.buildDrh(),
      CamundaProcess.SPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  async GenerateDisposalHearingNotice() {
    await this.generateHearingNotice(
      await this.listedHearingDataBuilder.buildDisposal(),
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  async GenerateSingleHmcResponseHearingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSingleHmcResponse(),
    );
  }

  async GenerateCurrentVersionMultiHmcResponsesHearingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildDisposalV2();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildNotifyCurrentVersionMultiHmcResponses(hearing),
    );
  }

  async GenerateRelistedVersionHearingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildTrailV2();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildGenerateNoticeRelistedVersion(hearing),
    );
  }

  async GeneratePartialHmcResponseHearingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildGenerateNoticePartialHmcResponse(hearing),
    );
  }

  async SkipCurrentVersionNotifiedHearingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildTrail();
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSkipNoticeCurrentVersionNotified(hearing),
    );
  }

  async AcknowledgeUnchangedHearingWithoutNotice() {
    const hearing = await this.listedHearingDataBuilder.buildDisposal();
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildAcknowledgeHearingWithoutNotice(hearing),
    );
  }

  async AvoidDuplicateNoticeWithoutGeneratingNotice() {
    const hearing = await this.listedHearingDataBuilder.buildDisposal();
    await this.generateHearingNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildSingleHmcResponse(),
    );
    await this.generateHearingNoticeExpectingNoNotice(
      hearing,
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
      await this.getPartiesNotifiedResponsesDataBuilder.buildAvoidDuplicateNoticeWithoutGeneratingNotice(hearing),
    );
  }

  async GenerateTrailHearingNotice() {
    await this.generateHearingNotice(
      await this.listedHearingDataBuilder.buildTrail(),
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  async GenerateDRHearingNotice() {
    await this.generateHearingNotice(
      await this.listedHearingDataBuilder.buildDrh(),
      CamundaProcess.UNSPEC_AUTOMATED_HEARING_NOTICE_SCHEDULER,
    );
  }

  private async generateHearingNotice(
    hearing: Record<string, any>,
    schedulerProcess: CamundaProcess,
    partiesNotifiedResponses: Record<string, any>[] = [],
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const hearingId = hearing.requestDetails.hearingRequestID;
    const studs = [
      await this.wireMockStudsDataBuilder.buildHearingStub(hearing, hearingId),
      await this.wireMockStudsDataBuilder.buildUnnotifiedHearingStub([hearingId]),
      await this.wireMockStudsDataBuilder.buildGetPartiesNotifiedStub(partiesNotifiedResponses),
    ];

    await this.withHearingStubs(async () => {
      await super.createUpdateStud(studs);

      const process = await civilServiceRequests.triggerCamundaProcess(
        civilSystemUpdate,
        schedulerProcess,
      );

      await civilServiceRequests.waitForCompletedCamundaProcess(civilSystemUpdate, undefined, process.id);
      await civilServiceRequests.waitForCompletedCamundaProcess(
        civilSystemUpdate,
        CamundaProcess.NOTIFY_HEARING_PARTIES,
        undefined,
        `hearingId_eq_${hearingId}`,
      );
    });
  }

  private async generateHearingNoticeExpectingNoNotice(
    hearing: Record<string, any>,
    schedulerProcess: CamundaProcess,
    partiesNotifiedResponses: Record<string, any>[] = [],
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const hearingId = hearing.requestDetails.hearingRequestID;
    const noticeProcessVariables = `hearingId_eq_${hearingId}`;
    const completedCamundaProcessCountBefore = await civilServiceRequests.getCompletedCamundaProcessCount(
      civilSystemUpdate,
      schedulerProcess,
      noticeProcessVariables,
    );
    const studs = [
      await this.wireMockStudsDataBuilder.buildHearingStub(hearing, hearingId),
      await this.wireMockStudsDataBuilder.buildUnnotifiedHearingStub([hearingId]),
      await this.wireMockStudsDataBuilder.buildGetPartiesNotifiedStub(partiesNotifiedResponses),
    ];

    await this.withHearingStubs(async () => {
      await super.createUpdateStud(studs);

      const process = await civilServiceRequests.triggerCamundaProcess(
        civilSystemUpdate,
        schedulerProcess,
      );

      await civilServiceRequests.waitForCompletedCamundaProcess(civilSystemUpdate, undefined, process.id);

      await civilServiceRequests.getCompletedCamundaProcessCount(
        civilSystemUpdate,
        schedulerProcess,
        noticeProcessVariables,
        { expectCount: completedCamundaProcessCountBefore },
      );
    });
  }
}
