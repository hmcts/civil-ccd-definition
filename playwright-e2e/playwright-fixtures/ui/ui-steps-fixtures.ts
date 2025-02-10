import { test as uiActionsFactories } from './ui-actions-fixtures';
import { test as requestFactories } from '../api/request-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import { mergeTests } from '@playwright/test';
import CaseworkerSteps from '../../steps/ui/exui/caseworker-steps';
import ClaimantSolicitorSpecSteps from '../../steps/ui/exui/claimant-solicitor-spec-steps';
import ClaimantSolcitorSteps from '../../steps/ui/exui/claimant-solicitor-steps';
import DefendantSolicitor1SpecSteps from '../../steps/ui/exui/defendant-solicitor-1-spec-steps';
import DefendantSolicitor1Steps from '../../steps/ui/exui/defendant-solicitor-1-steps';
import JudgeSteps from '../../steps/ui/exui/judge.steps';
import IdamSteps from '../../steps/ui/exui/idam-steps';
import ExuiDashboardSteps from '../../steps/ui/exui/exui-dashboard-steps';
import DefendantSolicitor2SpecSteps from '../../steps/ui/exui/defendant-solicitor-2-spec-steps';
import DefendantSolicitor2Steps from '../../steps/ui/exui/defendant-solicitor-2-steps';

type UiStepsFixtures = {
  IdamSteps: IdamSteps;
  ExuiDashboardSteps: ExuiDashboardSteps;
  ClaimantSolicitorSteps: ClaimantSolcitorSteps;
  ClaimantSolicitorSpecSteps: ClaimantSolicitorSpecSteps;
  DefendantSolicitor1Steps: DefendantSolicitor1Steps;
  DefendantSolicitor1SpecSteps: DefendantSolicitor1SpecSteps;
  DefendantSolicitor2Steps: DefendantSolicitor2Steps;
  DefendantSolicitor2SpecSteps: DefendantSolicitor2SpecSteps;
  CaseworkerSteps: CaseworkerSteps;
  JudgeSteps: JudgeSteps;
};

export const test = mergeTests(testUtils, uiActionsFactories, requestFactories).extend<UiStepsFixtures>({
  IdamSteps: async ({ _idamActions }, use) => {
    await use(new IdamSteps(_idamActions));
  },
  ExuiDashboardSteps: async ({ _exuiDashboardActions, _idamActions }, use) => {
    await use(new ExuiDashboardSteps(_exuiDashboardActions, _idamActions));
  },
  ClaimantSolicitorSteps: async ({ _exuiDashboardActions, _idamActions, _claimantSolicitor1ActionsFactory }, use) => {
    await use(new ClaimantSolcitorSteps(_exuiDashboardActions, _idamActions, _claimantSolicitor1ActionsFactory));
  },
  ClaimantSolicitorSpecSteps: async ({ _exuiDashboardActions, _idamActions, _claimantSolicitor1ActionsFactory }, use) => {
    await use(new ClaimantSolicitorSpecSteps(_exuiDashboardActions, _idamActions, _claimantSolicitor1ActionsFactory));
  },
  DefendantSolicitor1Steps: async ({ _exuiDashboardActions, _idamActions, _defendantActionsFactory }, use) => {
    await use(new DefendantSolicitor1Steps(_exuiDashboardActions, _idamActions, _defendantActionsFactory));
  },
  DefendantSolicitor1SpecSteps: async ({ _exuiDashboardActions, _idamActions, _defendantActionsFactory }, use) => {
    await use(new DefendantSolicitor1SpecSteps(_exuiDashboardActions, _idamActions, _defendantActionsFactory));
  },
  DefendantSolicitor2Steps: async ({ _exuiDashboardActions, _idamActions, _defendantActionsFactory }, use) => {
    await use(new DefendantSolicitor2Steps(_exuiDashboardActions, _idamActions, _defendantActionsFactory));
  },
  DefendantSolicitor2SpecSteps: async ({ _exuiDashboardActions, _idamActions, _defendantActionsFactory }, use) => {
    await use(new DefendantSolicitor2SpecSteps(_exuiDashboardActions, _idamActions, _defendantActionsFactory));
  },
  CaseworkerSteps: async ({ _exuiDashboardActions, _idamActions, _caseworkerActionsFactory }, use) => {
    await use(new CaseworkerSteps(_exuiDashboardActions, _idamActions, _caseworkerActionsFactory));
  },
  JudgeSteps: async ({ _exuiDashboardActions, _idamActions, _judgeActionsFactory }, use) => {
    await use(new JudgeSteps(_exuiDashboardActions, _idamActions, _judgeActionsFactory));
  }
});
