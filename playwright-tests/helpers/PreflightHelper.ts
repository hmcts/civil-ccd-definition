import { APIRequestContext, request } from '@playwright/test';
import {
  authProviderApiBaseUrl,
  ccdDataStoreApiBaseUrl,
  civilServiceUrl,
  documentManagementStoreApiBaseUrl,
  envUrl,
  feesRegisterApiBaseUrl,
  idamApiBaseUrl,
  paymentApiBaseUrl,
  systemupdate,
  workAllocation,
} from '../civilConfig.ts';
import { TokensHelper } from './TokensHelper.ts';
import { sessionUsers } from './SessionHelper.ts';
import { sessionUsersForRun } from '../e2e/journey/sessionUsersForRun.ts';

// Checks, before any test starts, that the run has everything it needs: its settings, the services it calls and the
// users it signs in as. A problem here would otherwise only show up part way through a journey, often as a confusing
// timeout. Required checks stop the run; optional ones (services only some journeys use) are reported as warnings.

export type PreflightResult = {
  check: string;
  target: string;
  ok: boolean;
  required: boolean;
  detail: string;
};

// Settings every run needs. Only the names are ever reported, never the values, as some are secrets.
const requiredSettings = [
  'URL',
  'IDAM_API_URL',
  'IDAM_WEB_URL',
  'SERVICE_AUTH_PROVIDER_API_BASE_URL',
  'CCD_DATA_STORE_URL',
  'DM_STORE_URL',
  'CIVIL_SERVICE_URL',
  'DEFAULT_PASSWORD',
  'JUDGE_DEFAULT_PASSWORD',
  'S2S_SECRET',
  'CCD_API_GATEWAY_IDAM_CLIENT_SECRET',
];

const healthTimeoutMs = 10_000;

// Addresses on the internal network only answer over the VPN
function failureHint(url: string, message: string): string {
  if (url.includes('.internal') && /ENOTFOUND|ETIMEDOUT|ECONNREFUSED|Timeout|EAI_AGAIN/i.test(message)) {
    return `${message} (is the VPN connected?)`;
  }
  return message;
}

// The first line of an error, without Playwright's "apiRequestContext.get: " prefix
function firstLine(message: string): string {
  return message.split('\n')[0].replace(/^apiRequestContext\.\w+: /, '').slice(0, 200);
}

export class PreflightHelper {
  private api: APIRequestContext;

  async run(): Promise<PreflightResult[]> {
    const missing = this.checkSettings();
    if (missing.length > 0) {
      // Without the settings the other checks can only fail, so they are not run
      return missing;
    }

    this.api = await request.newContext({ ignoreHTTPSErrors: true });
    try {
      const health = await Promise.all(this.services().map(({ name, url, required }) => this.checkHealth(name, url, required)));
      const s2s = await this.checkS2S();
      const users = await this.checkUsers();
      return [...health, s2s, ...users];
    } finally {
      await this.api.dispose();
    }
  }

  private checkSettings(): PreflightResult[] {
    return requiredSettings
      .filter((name) => !process.env[name])
      .map((name) => ({ check: 'Setting', target: name, ok: false, required: true, detail: 'not set' }));
  }

  // The services the journeys call. Every journey pays the claim fee through the payment service (in the UI, or through
  // the API with API_UNTIL), and the API create looks the fees up in the fees register. Work allocation is only checked
  // on a preview (where it has its own Camunda and WA task monitor) and is optional, as only journeys that reach the
  // judge's directions order need it.
  private services() {
    const services = [
      { name: 'XUI', url: `${envUrl}/health`, required: true },
      { name: 'IDAM API', url: `${idamApiBaseUrl}/health`, required: true },
      { name: 'IDAM web', url: `${process.env.IDAM_WEB_URL}/health`, required: true },
      { name: 'S2S', url: `${authProviderApiBaseUrl}/health`, required: true },
      { name: 'CCD data store', url: `${ccdDataStoreApiBaseUrl}/health`, required: true },
      { name: 'Document store', url: `${documentManagementStoreApiBaseUrl}/health`, required: true },
      { name: 'civil-service', url: `${civilServiceUrl}/health`, required: true },
      { name: 'Payment service', url: `${paymentApiBaseUrl}/health`, required: true },
      { name: 'Fees register', url: `${feesRegisterApiBaseUrl}/health`, required: true },
    ];
    if (envUrl.includes('://xui-')) {
      services.push(
        { name: 'Camunda', url: `${workAllocation.camundaUrl}/engine`, required: false },
        { name: 'WA task monitor', url: `${workAllocation.taskMonitorUrl}/health`, required: false },
      );
    }
    return services;
  }

  // A service is up when its health check answers 200 and, where it reports one, its status is UP. The full health
  // check is used rather than liveness, as that also covers the service's database and the services it depends on.
  private async checkHealth(name: string, url: string, required: boolean): Promise<PreflightResult> {
    const result = { check: name, target: url, required };
    try {
      const response = await this.api.get(url, { timeout: healthTimeoutMs, maxRedirects: 0 });
      const body = await response.json().catch(() => undefined);
      const status = Array.isArray(body) ? undefined : body?.status;
      if (response.status() === 200 && (status === undefined || status === 'UP')) {
        return { ...result, ok: true, detail: status ?? `HTTP ${response.status()}` };
      }
      const down = Object.entries(body?.components ?? {})
        .filter(([, component]: [string, any]) => component?.status === 'DOWN')
        .map(([component]) => component);
      const downDetail = down.length > 0 ? `, DOWN: ${down.join(', ')}` : '';
      return { ...result, ok: false, detail: `HTTP ${response.status()}${status ? ` ${status}` : ''}${downDetail}` };
    } catch (error) {
      return { ...result, ok: false, detail: failureHint(url, firstLine(error instanceof Error ? error.message : String(error))) };
    }
  }

  private async checkS2S(): Promise<PreflightResult> {
    const result = { check: 'S2S token', target: 'civil_service', required: true };
    try {
      await new TokensHelper().getS2SToken();
      return { ...result, ok: true, detail: 'available' };
    } catch (error) {
      return { ...result, ok: false, detail: firstLine(error instanceof Error ? error.message : String(error)) };
    }
  }

  // Gets an IDAM token for each user the run signs in as, plus the system user the API calls use. A token that is
  // still valid in the token cache is reused, and a user is only tried once, so this never adds repeated sign-ins
  // (several failed sign-ins in a row lock an account).
  private async checkUsers(): Promise<PreflightResult[]> {
    const users = [
      ...sessionUsersForRun().map((key) => sessionUsers[key].credentials),
      { name: 'System user', ...systemupdate },
    ];
    const results: PreflightResult[] = [];
    for (const user of users) {
      const result = { check: `Sign in: ${user.name}`, target: user.username, required: true };
      try {
        const token = await new TokensHelper().getAccessToken(user);
        results.push(token ? { ...result, ok: true, detail: 'IDAM token' } : { ...result, ok: false, detail: 'no username or password' });
      } catch (error) {
        results.push({ ...result, ok: false, detail: firstLine(error instanceof Error ? error.message : String(error)) });
      }
    }
    return results;
  }
}

export function formatPreflightResults(results: PreflightResult[]): string {
  const rows = results.map((r) => [
    r.ok ? 'OK' : r.required ? 'FAIL' : 'WARN',
    r.check,
    r.target,
    r.detail,
  ]);
  const widths = [0, 1, 2].map((i) => Math.max(...rows.map((row) => row[i].length)));
  return rows.map((row) => row.map((cell, i) => (i < 3 ? cell.padEnd(widths[i]) : cell)).join('  ')).join('\n');
}
