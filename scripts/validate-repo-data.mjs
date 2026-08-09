import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { transform } from "esbuild";

const GH_OWNER = "tafreeman";
const REPO_DATA_FILE = "repo-data.jsx";
const SOCIAL_CARDS_FILE = "social-cards.jsx";
const README_FILE = "README.md";
// The table this validator mirrors lives under exactly this README heading.
// Rows are parsed from that section only: the orphan check below rejects any
// row it cannot map to a repo, so an unrelated table elsewhere in the README
// must not be read as portfolio rows.
const README_SECTION = "Selected public work";
// Public-facing JSX surfaces that hardcode repo links but are NOT derived from
// PORTFOLIO.REPOS. Stale references here (e.g. a link to an archived/removed
// repo) slip past the repo-data and social-card checks, so we scan their raw
// source for owner-repo references too.
// landing.jsx was retired (T2-B, 2026-07-09): it was never loaded by index.html
// (the canonical Pages entry uses profile.jsx + the Console design system) and
// its own entry points, landing.html / "Landing Page.html", were removed along
// with it. profile.jsx is the only live surface left to scan.
// dist/profile.js — the compiled copy index.html actually loads — is
// deliberately NOT listed: scripts/build-js.mjs generates it from profile.jsx
// and `npm run verify:build` proves the two match, so scanning it could only
// report the same reference a second time, while a genuinely stale link would
// still have to pass through the source scanned here to reach the page.
const SURFACE_FILES = ["profile.jsx"];
// social-cards.jsx carries a self-referential portfolio-hub card that has no
// matching entry in PORTFOLIO.REPOS; it is the only id allowed to be absent.
const SOCIAL_ONLY_IDS = new Set(["tafreeman"]);
// The profile intentionally lists only selected public, active repositories.
const EXPECTED_IDS = new Set([
  "agentic-evalkit",
  "agentic-runtime-platform",
  "executionkit",
  "financial-scenario-engine",
]);

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function evaluatePortfolio(source) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: REPO_DATA_FILE });
  return sandbox.window.PORTFOLIO;
}

// social-cards.jsx contains JSX (component bodies), so it cannot be VM-eval'd
// raw. Transpile it with esbuild (same toolchain as validate-jsx.mjs), then run
// the result: only top-level statements execute — the `const REPOS = [...]` and
// `window.REPOS = REPOS` assignment — without invoking any React component.
async function evaluateSocialCards(source) {
  const { code } = await transform(source, { loader: "jsx", logLevel: "silent" });
  const sandbox = {
    window: {},
    // SocialCard/Glyph bodies reference React, but they are never called here;
    // a stub keeps the module from throwing if any top-level code touches it.
    React: { useMemo: () => undefined, createElement: () => null },
  };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: SOCIAL_CARDS_FILE });
  return sandbox.window.REPOS;
}

function validateSocialCardsConsistency(portfolio, socialRepos) {
  assert(Array.isArray(socialRepos), "social-cards.jsx must expose window.REPOS as an array");
  if (!Array.isArray(socialRepos)) return;

  const portfolioRepos = Array.isArray(portfolio.REPOS) ? portfolio.REPOS : [];
  const portfolioById = new Map(portfolioRepos.map((repo) => [repo.id, repo]));
  // Build the social-cards index, rejecting any malformed/null card up front so
  // a bad entry yields a clear assertion instead of a TypeError on `.id` later.
  const socialById = new Map();
  for (const card of socialRepos) {
    assert(
      card && typeof card.id === "string",
      "social-cards.jsx contains an invalid or malformed card (expected an object with a string id)",
    );
    socialById.set(card.id, card);
  }

  // 1. Every canonical PORTFOLIO repo id must appear in social-cards REPOS.
  for (const repo of portfolioRepos) {
    assert(socialById.has(repo.id), `social-cards.jsx is missing a card for portfolio repo: ${repo.id}`);
  }

  // 2. No social-cards id may be absent from PORTFOLIO except the self-
  //    referential hub card(s).
  for (const card of socialById.values()) {
    assert(
      portfolioById.has(card.id) || SOCIAL_ONLY_IDS.has(card.id),
      `social-cards.jsx card "${card.id}" has no matching PORTFOLIO.REPOS entry (and is not an allowed hub card)`,
    );
  }

  // 3. The FULL status label must agree across both sources — social-cards is
  //    a hand-maintained copy, and a stale version tag slips through every
  //    other check (ExecutionKit shipped v0.1.0 on cards against a released
  //    v0.2.0, uncaught; career-signal audit 2026-07-06, TAF ship-now #8).
  //    PORTFOLIO.REPOS.status is itself checked against the latest GitHub
  //    release above, so transitively the cards now track live state too.
  for (const repo of portfolioRepos) {
    const card = socialById.get(repo.id);
    if (!card) continue;
    assert(
      card.status === repo.status,
      `${repo.id}: status drift — PORTFOLIO "${repo.status}" vs social-cards "${card.status}"`,
    );
  }
}

function validateStaticShape(portfolio) {
  assert(portfolio && typeof portfolio === "object", "window.PORTFOLIO must be defined");
  if (!portfolio || typeof portfolio !== "object") return [];

  assert(portfolio.GH === `https://github.com/${GH_OWNER}`, "PORTFOLIO.GH must match the GitHub owner URL");
  assert(Array.isArray(portfolio.REPOS), "PORTFOLIO.REPOS must be an array");
  assert(Array.isArray(portfolio.LANGS), "PORTFOLIO.LANGS must be an array");

  const repos = Array.isArray(portfolio.REPOS) ? portfolio.REPOS : [];
  assert(repos.length === EXPECTED_IDS.size, `Expected ${EXPECTED_IDS.size} portfolio repos, found ${repos.length}`);

  const ids = repos.map((repo) => repo.id);
  assert(new Set(ids).size === ids.length, "Repo ids must be unique");
  for (const expectedId of EXPECTED_IDS) {
    assert(ids.includes(expectedId), `Missing portfolio repo: ${expectedId}`);
  }

  for (const repo of repos) {
    assert(typeof repo.id === "string" && repo.id.length > 0, "Each repo needs an id");
    assert(repo.name === repo.id, `${repo.id}: name must match id`);
    assert(typeof repo.title === "string" && repo.title.length > 0, `${repo.id}: title is required`);
    assert(typeof repo.desc === "string" && repo.desc.length > 0, `${repo.id}: desc is required`);
    assert(typeof repo.lang === "string" && repo.lang.length > 0, `${repo.id}: lang is required`);
    assert(typeof repo.img === "string" && repo.img.startsWith("social-previews/"), `${repo.id}: img must point at social-previews/`);

    assert(repo.repo === `${portfolio.GH}/${repo.id}`, `${repo.id}: repo URL must match PORTFOLIO.GH/id`);
    assert(typeof repo.url === "string" && repo.url.length > 0, `${repo.id}: public repos need a destination URL`);
  }

  return repos;
}

function validateLanguageSplit(portfolio, repos) {
  const languageCounts = new Map();
  for (const repo of repos) {
    languageCounts.set(repo.lang, (languageCounts.get(repo.lang) ?? 0) + 1);
  }

  const langs = Array.isArray(portfolio.LANGS) ? portfolio.LANGS : [];
  const totalPct = langs.reduce((sum, lang) => sum + lang.pct, 0);
  assert(totalPct === 100, `Language percentages must sum to 100, found ${totalPct}`);

  for (const lang of langs) {
    const expectedPct = Math.round(((languageCounts.get(lang.name) ?? 0) / repos.length) * 100);
    assert(lang.pct === expectedPct, `${lang.name}: expected ${expectedPct}% from repo data, found ${lang.pct}%`);
  }
}

// Scan the public-facing JSX surfaces for hardcoded owner-repo references —
// both GitHub repo URLs (github.com/<owner>/<id>) and Pages URLs
// (<owner>.github.io/<id>). Every referenced id must be a current portfolio
// repo (or the owner's own profile repo). This catches links to archived,
// renamed, or deleted repos on surfaces that are NOT generated from
// PORTFOLIO.REPOS, which the checks above never inspect.
async function validateSurfaceRepoReferences(repos) {
  const validRepoIds = new Set(repos.map((repo) => repo.id));
  // The owner's own profile/Pages repo (github.com/<owner>/<owner> and
  // <owner>.github.io/<owner>) is canonical and self-referential.
  validRepoIds.add(GH_OWNER);

  const referencePattern = new RegExp(
    `(?:github\\.com/${GH_OWNER}/|${GH_OWNER}\\.github\\.io/)([A-Za-z0-9._-]+)`,
    "g",
  );

  for (const file of SURFACE_FILES) {
    let source;
    try {
      source = await readFile(file, "utf8");
    } catch (error) {
      failures.push(
        `${file}: could not read surface for repo-reference scan (${error instanceof Error ? error.message : String(error)})`,
      );
      continue;
    }

    for (const match of source.matchAll(referencePattern)) {
      // The character class can absorb a trailing ".git" (clone URLs) or a
      // trailing "." / "-" from surrounding prose/punctuation, which would flag
      // an otherwise-valid repo as stale (e.g. "executionkit." or
      // "agentic-runtime-platform.git"). Normalize those off first; a genuinely
      // stale id still fails after stripping.
      let referencedId = match[1];
      if (referencedId.endsWith(".git")) referencedId = referencedId.slice(0, -4);
      referencedId = referencedId.replace(/[.-]+$/, "");
      assert(
        validRepoIds.has(referencedId),
        `${file}: references repo "${referencedId}" (${match[0]}) which is not a current portfolio repo — remove the stale/archived reference or add the repo to ${REPO_DATA_FILE}`,
      );
    }
  }
}

// README.md's "Selected public work" table hand-types a description column
// that is meant to mirror repo-data.jsx's REPOS[].desc (the file's own header
// calls itself the "single source of truth"). Nothing generates the table
// from repo-data.jsx, so the two copies can silently diverge. Match each
// table row to its repo by the repo link URL in the row (not the display
// name, which differs from repo.id for some rows, e.g. "Agentic Runtime
// Platform" vs "agentic-runtime-platform") and assert the description cells
// are byte-for-byte equal.
function extractReadmeTableRows(readmeSource) {
  const rows = [];
  let inSection = false;
  let sectionLevel = 0;
  // Tracks whether the previous line was a pushed data row, so the row sitting
  // directly above a separator can be identified as the column-label header.
  let previousLineWasRow = false;

  for (const line of readmeSource.split("\n")) {
    const trimmed = line.trim();

    const heading = trimmed.match(/^(#{1,6})\s+(.*?)\s*$/);
    if (heading) {
      const level = heading[1].length;
      if (heading[2] === README_SECTION) {
        inSection = true;
        sectionLevel = level;
      } else if (inSection && level <= sectionLevel) {
        inSection = false;
      }
      previousLineWasRow = false;
      continue;
    }

    if (!inSection || !trimmed.startsWith("|")) {
      previousLineWasRow = false;
      continue;
    }

    // Separator row, e.g. |---|---|---|. The "-" MUST come last in the
    // character class: written as [\s:-|] it parses as \s plus the RANGE
    // ":".."|", which excludes "-" and so never matched a real separator at
    // all — leaving the separator and header rows in `rows` as if they were
    // data. Harmless while only the repo->row direction was checked; a
    // false-positive generator for the row->repo direction added below.
    if (/^\|[\s:|-]+\|[\s:|-]*$/.test(trimmed)) {
      // A separator always follows the column-label row, so whatever was
      // pushed immediately above it is a header, not data. Drop it — the
      // orphan check would otherwise report "| Project | ... | Links |".
      if (previousLineWasRow) rows.pop();
      previousLineWasRow = false;
      continue;
    }

    const cells = trimmed.slice(1, -1).split("|").map((cell) => cell.trim());
    if (cells.length < 3) {
      previousLineWasRow = false;
      continue;
    }
    rows.push(cells);
    previousLineWasRow = true;
  }
  return rows;
}

// Does this table row point at `repo`? Matched on the repo link URL in the
// row's Links cell, never the display name. Shared by both directions of the
// check below so the two can never disagree about what "this row is that
// repo's row" means.
function rowLinksToRepo(cells, repo) {
  const linksCell = cells[2] ?? "";
  const index = linksCell.indexOf(repo.repo);
  if (index === -1) return false;
  // Guard the boundary so ".../executionkit" does not match a row that only
  // links ".../executionkit-archive". A trailing "/" or ")" is a real match
  // (e.g. ".../agentic-evalkit/releases/latest").
  const nextChar = linksCell[index + repo.repo.length];
  return nextChar === undefined || !/[A-Za-z0-9._-]/.test(nextChar);
}

function validateReadmeDescriptions(readmeSource, repos) {
  const rows = extractReadmeTableRows(readmeSource);
  assert(rows.length > 0, `${README_FILE}: found no "${README_SECTION}" table rows to validate`);

  // 1. Every portfolio repo needs a row, and that row's description cell must
  //    be byte-for-byte equal to its repo-data.jsx desc.
  for (const repo of repos) {
    const row = rows.find((cells) => rowLinksToRepo(cells, repo));
    assert(row, `${README_FILE}: no table row links to ${repo.repo} (expected a row for portfolio repo "${repo.id}")`);
    if (!row) continue;

    const readmeDesc = row[1];
    assert(
      readmeDesc === repo.desc,
      `${repo.id}: ${README_FILE} description column does not match ${REPO_DATA_FILE} desc — README: "${readmeDesc}" | ${REPO_DATA_FILE}: "${repo.desc}"`,
    );
  }

  // 2. ...and the reverse: no row may outlive its repo. The loop above only
  //    ever goes looking for rows it expects to find, so a row left behind
  //    when a repo is dropped from PORTFOLIO.REPOS (archived, renamed,
  //    de-listed) passed silently. The sibling social-cards check has been
  //    bidirectional since it was written; this closes the same gap here.
  //    If a row for a deliberately non-portfolio repo is ever wanted, exempt
  //    it by id the way SOCIAL_ONLY_IDS exempts the self-referential hub card.
  for (const cells of rows) {
    assert(
      repos.some((repo) => rowLinksToRepo(cells, repo)),
      `${README_FILE}: table row "${cells[0]}" links to no current ${REPO_DATA_FILE} repo — remove the stale row or add the repo to ${REPO_DATA_FILE}`,
    );
  }
}

// NOTE: this file used to also guard landing.jsx's "Interconnected repos"
// hero stat against regressing to a bare integer literal instead of a live
// REPOS.length expression (validateSurfaceRepoCountLiteral). landing.jsx was
// retired (T2-B, 2026-07-09) — it was never loaded by index.html and had no
// equivalent labeled stat block on the live surface (profile.jsx's "Systems"
// header already renders {runtime.length}/{verification.length}, which are
// live expressions, not literals, by construction). The check was removed
// rather than retargeted at a pattern that no longer exists.

function githubApiHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tafreeman-profile-validator",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchGithubRepo(repoId) {
  const response = await fetch(`https://api.github.com/repos/${GH_OWNER}/${repoId}`, { headers: githubApiHeaders() });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Returns the latest release payload, or null when the repo has no releases
// (GitHub reports that as a 404 on this endpoint — not an error condition,
// just "nothing to compare against yet"). Any other non-OK status is a real
// failure and is thrown, matching fetchGithubRepo's error style.
async function fetchLatestRelease(repoId) {
  const response = await fetch(`https://api.github.com/repos/${GH_OWNER}/${repoId}/releases/latest`, {
    headers: githubApiHeaders(),
  });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// The private/archived checks below are the single guard against a listed
// repo silently going private or archived — generic over whatever is in
// PORTFOLIO.REPOS, not a per-id named guard. tests/smoke.spec.ts deliberately
// does NOT duplicate this check (it used to hardcode two specific repo ids,
// which only covered repos someone remembered to name): that spec is part of
// the required, offline smoke suite and must not depend on network access to
// api.github.com, whereas this script already does (validate:repos, run via
// `npm run validate`). A repo going private or archived fails here, without
// anyone adding a new named guard anywhere.
async function validatePublicGithubState(portfolio, repos) {
  for (const repo of repos) {
    try {
      const githubRepo = await fetchGithubRepo(repo.id);
      assert(githubRepo.full_name === `${GH_OWNER}/${repo.id}`, `${repo.id}: GitHub full_name mismatch`);
      assert(githubRepo.html_url === repo.repo, `${repo.id}: GitHub html_url mismatch`);
      assert(githubRepo.private === false, `${repo.id}: public portfolio repo is private on GitHub`);
      assert(githubRepo.archived === false, `${repo.id}: portfolio repo is archived on GitHub`);
      assert(githubRepo.language === repo.lang, `${repo.id}: language is ${repo.lang}, GitHub reports ${githubRepo.language}`);

      // Only repos that *display* a version tag as their status (e.g.
      // executionkit's "v0.1.0") are checked against the latest release.
      // Others intentionally show a lifecycle label (ACTIVE/BETA/LIVE) that
      // is not meant to track the release tag 1:1 — exempt those, same as
      // PRIVATE_IDS are exempt from the block above.
      if (/^v\d/.test(repo.status)) {
        const latestRelease = await fetchLatestRelease(repo.id);
        // No releases yet: exempt — nothing to drift-check against.
        if (latestRelease !== null) {
          assert(
            repo.status === latestRelease.tag_name,
            `${repo.id}: displayed status "${repo.status}" does not match latest GitHub release "${latestRelease.tag_name}"`,
          );
        }
      }
    } catch (error) {
      failures.push(`${repo.id}: GitHub metadata check failed (${error instanceof Error ? error.message : String(error)})`);
    }
  }

  assert(portfolio.GH === `https://github.com/${GH_OWNER}`, "Portfolio owner URL drifted during GitHub checks");
}

const source = await readFile(REPO_DATA_FILE, "utf8");
const portfolio = evaluatePortfolio(source);
const repos = validateStaticShape(portfolio);
if (portfolio && repos.length > 0) {
  validateLanguageSplit(portfolio, repos);

  const socialSource = await readFile(SOCIAL_CARDS_FILE, "utf8");
  const socialRepos = await evaluateSocialCards(socialSource);
  validateSocialCardsConsistency(portfolio, socialRepos);

  await validateSurfaceRepoReferences(repos);

  const readmeSource = await readFile(README_FILE, "utf8");
  validateReadmeDescriptions(readmeSource, repos);

  await validatePublicGithubState(portfolio, repos);
}

if (failures.length > 0) {
  console.error("Repo metadata validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Repo metadata validation passed for ${repos.length} portfolio repos.`);
