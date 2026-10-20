import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { envUrl } from '../civilConfig.ts';

export type XuiStorageState = Awaited<ReturnType<APIRequestContext['storageState']>>;

// The hidden fields of the page's form (such as IDAM's _csrf), which are posted back with the field the page asks for
function hiddenFields(html: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const tag of html.match(/<input\b[^>]*>/gs) ?? []) {
    if (!/type="hidden"/.test(tag)) {
      continue;
    }
    const name = tag.match(/name="([^"]+)"/)?.[1];
    if (name) {
      fields[name] = tag.match(/value="([^"]*)"/)?.[1] ?? '';
    }
  }
  return fields;
}

const hasField = (html: string, name: string) => new RegExp(`<input\\b[^>]*name="${name}"`, 's').test(html);

// Signs a user in to XUI without a browser, by following XUI's sign-in over HTTP: XUI's /auth/login redirects to
// IDAM, IDAM asks for the email and then the password (each page a form posted back with its hidden _csrf field), and
// IDAM then redirects to XUI's /oauth2/callback, where XUI creates its session and sets its cookies. This is the same
// sign-in the browser does, without rendering any pages, so it takes a second or two instead of a page load per step.
// Returns the session as Playwright storage state, for a session file or for adding to a browser's cookies.
// XUI keeps its session on its own server, so an IDAM token on its own (as the API events use) does not sign in to
// XUI: its sign-in has to be gone through for XUI to make the session.
export async function signInToXuiOverHttp(credentials: { username: string; password: string }): Promise<XuiStorageState> {
  const context = await request.newContext();
  try {
    let response: APIResponse = await context.get(`${envUrl}/auth/login`);
    for (const step of [{ field: 'email', value: credentials.username }, { field: 'password', value: credentials.password }]) {
      const html = await response.text();
      if (!response.ok() || !hasField(html, step.field)) {
        throw new Error(`expected IDAM's ${step.field} page but got ${response.status()} at ${response.url()}`);
      }
      response = await context.post(response.url(), { form: { ...hiddenFields(html), [step.field]: step.value } });
    }
    if (!response.url().startsWith(envUrl)) {
      throw new Error(`IDAM did not send ${credentials.username} back to XUI (ended at ${response.status()} ${response.url()})`);
    }
    const details = await context.get(`${envUrl}/api/user/details`, { maxRedirects: 0 });
    if (!details.ok()) {
      throw new Error(`XUI did not accept the new session for ${credentials.username} (user details returned ${details.status()})`);
    }
    return await context.storageState();
  } finally {
    await context.dispose();
  }
}
