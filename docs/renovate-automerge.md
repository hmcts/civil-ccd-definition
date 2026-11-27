# Renovate automerge

## Current configuration

`civil-ccd-definition` uses `.github/renovate.json`, extending the shared HMCTS preset and `local>hmcts/.github//renovate/automerge-all`, which sets `automerge: true` for every update, majors included.

Repo-level settings:

- `timezone`: `Europe/London`.
- `schedule` and `automergeSchedule`: after 7am and before 9am, and after 5pm and before 8pm, every weekday.
- `platformAutomerge`: `false`, so Renovate enforces the configured merge windows instead of queuing GitHub auto-merge.
- `rebaseWhen`: `behind-base-branch`, so Renovate refreshes branches that fall behind `master`.
- `automergeStrategy`: `squash`.
- `prConcurrentLimit`: `5`.
- `lockFileMaintenance`: enabled, so Renovate also refreshes `yarn.lock` on its own branch.

Groups, in the order they appear in `packageRules`:

| Group | Matches | Automerge |
|---|---|---|
| All non-major updates | every minor and patch update | yes |
| Jenkins library | `hmcts/cnp-jenkins-library` | yes (from the preset) |
| Helm chart updates | `helmv3` manager | yes |
| Playwright | `@playwright/test`, `playwright-core`, `@axe-core/playwright` | yes |
| Allure reporting | `allure-*` | yes |
| ESLint | `eslint`, `typescript-eslint`, `@eslint/*`, `@typescript-eslint/*`, `eslint-*` | yes |
| TypeScript | `typescript`, `@types/*` | yes |
| Java dependencies | `org.junit.*`, `org.slf4j` | yes |
| Build tools | `node`, `gradle`, `yarn` | yes |

When several package rules match, later values win. The named groups come after "All non-major updates", so their packages get their own PRs for every update type, including majors. Nothing turns automerge off, so **major updates automerge too** once their checks pass, for example #7092 (TypeScript 6 and `@types/node` 26).

## Code-owner review

`CODEOWNERS` assigns `*` to `@hmcts/civil`, then lists the files Renovate updates without an owner, so Renovate PRs that only touch them don't need code-owner review: `.nvmrc`, `.yarnrc.yml`, `.yarn/releases/`, `build.gradle`, the Gradle wrapper files, `package.json`, `yarn.lock`, `charts/**/Chart.yaml`, `Dockerfile`, `.github/workflows/*.yaml` and `*.yml`, and `Jenkinsfile_CNP` and `Jenkinsfile_nightly`, which the Jenkins library PRs update.

The Jenkinsfiles are exempt so Jenkins library PRs can automerge. This also means any other change that only touches them doesn't need code-owner review, so pipeline changes rely on the repository's general review rules.

## Merge window and Jenkins availability

PTL Jenkins runs on `cft-ptl-00-aks`, which [`hmcts/auto-shutdown`](https://github.com/hmcts/auto-shutdown) normally stops from 20:00 to 06:30 daily. There is no scheduled weekend startup.

If Renovate updates or rebases a PR while Jenkins is unavailable, the required check can't complete and automerge stays blocked. Branch creation and automerge therefore share the 07:00–09:00 and 17:00–20:00 weekday windows, when Jenkins is online and developer activity is lower. A PR rebased late in the evening window may not finish its build before the 20:00 shutdown; it then merges in a later window.

`platformAutomerge` must stay `false`; otherwise Renovate enables GitHub auto-merge and GitHub can merge whenever checks pass, regardless of `automergeSchedule`.

## Holds

| Package | Hold | In use | Reason |
|---|---|---|---|
| `typescript` | below 6.1.0 | 6.0.3 | typescript-eslint 8 only supports TypeScript below 6.1.0. Remove once typescript-eslint supports TypeScript 7 |
| `mocha` | below 12 | 11.8.0 | Mocha 12 broke the full functional tests (#6981). `mocha-multi` loads reporters with `require('mocha/lib/reporters/base')` from the top-level mocha, and mocha 12 is ESM-only. CodeceptJS 4 uses its own nested mocha 12 |
| `allure-playwright` | disabled | 2.15.1 | Version 3 drops the `outputFolder` reporter option for `resultsDir`, which `playwright.config.ts` and the `allure generate` scripts rely on (#6484). Re-enable after moving them to `resultsDir`; otherwise the Allure reporting group would update it |
| `lint-staged` | disabled | ^15.2.10 | ^17 was rolled back in #6514 ("Fix Pipelines") without a recorded reason. lint-staged 17 needs Node 22.22.1 or later and is ESM-only. Check the pre-commit hook and pipelines on a newer version before re-enabling |

Each rule gives its reason in its `description`. When a Renovate PR fails the build on every rebase, find the cause and add a hold with its reason rather than leaving the PR open: with `rebaseWhen: behind-base-branch`, a PR that can never pass is rebuilt on every merge to `master`.

## Stalled-queue alert

`civil-service`'s `.github/workflows/renovate-stalled-alert.yml` also checks this repository's open Renovate PRs each weekday morning and reports any older than three days.

## Release freeze

Use a Renovate package rule for a planned release freeze, so the freeze is reviewable and recorded in the repository. Add it as the final item under `packageRules` in `.github/renovate.json`:

```json
{
  "description": "Release freeze: disable Renovate automerge",
  "matchPackageNames": ["*"],
  "automerge": false
}
```

It must stay last: later rules win, and most groups above set `automerge: true`. The rule stops automerge but leaves Renovate opening and rebasing PRs, including lock file maintenance.

### Start a freeze

1. Add the freeze rule in a pull request, with the release or change reference and the intended end date in the description.
2. Merge it before the freeze starts, then run Renovate manually or wait for its next scheduled run.
3. Confirm in the Mend job log that the rule resolves to `automerge: false`, and record that in the release ticket.

### End a freeze

1. Remove the freeze rule through a pull request once the release is approved.
2. Merge it, then run Renovate manually or wait for its next scheduled run.
3. Check that a clean Renovate PR automerges only after all required checks pass.

## Pausing Renovate

Pausing is broader than a release freeze: it also stops new PRs, rebases and PR maintenance.

| | Release freeze (`automerge: false` rule) | Pause |
|---|---|---|
| New PRs and rebases | continue | stop |
| Automerge | stops | stops |
| Renovate's PR queue | stays current; merges are manual | builds up until turned back on |

There are two ways to pause:

- **In the repository:** set `"enabled": false` at the top level of `.github/renovate.json` in a pull request, with the reason and expected end. It takes effect once merged and Renovate next runs. Revert the pull request to turn Renovate back on.
- **In the Mend Developer Portal:** an organisation admin can pause the repository at `https://developer.mend.io/github/hmcts/civil-ccd-definition/-/settings`. This takes effect without a merge, so it suits a freeze that has to start straight away. Turn it back on in the portal.

Changing branch protection is not recommended as a routine toggle: it affects all contributors and makes intentional freezes look like authorisation failures.
