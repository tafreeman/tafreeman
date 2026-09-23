# Security policy

## Supported code

Security fixes go to the default branch (`main`), which GitHub Pages serves
as-is. Older commits have no guaranteed support window.

## Scope

This repository is a GitHub profile README plus a static Pages site. There is
no backend and no runtime CDN: React is vendored under `vendor/`. The Node
scripts under `scripts/` build the site and, in CI, validate its content
against the GitHub API.

In scope: the site's pages and scripts, the vendored files, the CI workflows,
and the dependency tree in `package-lock.json`.

## Report a vulnerability

Do not open a public issue for a suspected vulnerability.

Use a private
[GitHub Security Advisory](https://github.com/tafreeman/tafreeman/security/advisories/new).
If that path is unavailable, contact the maintainer privately and ask for a
secure reporting channel. Do not send exploit details, credentials, or private
data through a public issue.

Include:

- the affected file, page, or commit;
- minimal reproduction steps or a proof of concept;
- the expected and observed behavior; and
- the impact, and a suggested mitigation if you have one.

The maintainer will confirm receipt, assess severity, coordinate a fix, and
agree on disclosure timing with the reporter. This is a single-maintainer
project with no published response time.
