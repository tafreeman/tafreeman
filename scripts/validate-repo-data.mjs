import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { transform } from "esbuild";

const GH_OWNER = "tafreeman";
const REPO_DATA_FILE = "repo-data.jsx";
const SOCIAL_CARDS_FILE = "social-cards.jsx";
// Public-facing JSX surfaces that hardcode repo links but are NOT derived from
// PORTFOLIO.REPOS. Stale references here (e.g. a link to an archived/removed
// repo) slip past the repo-data and social-card checks, so we scan their raw
// source for owner-repo references too.
const SURFACE_FILES = ["landing.jsx", "profile.jsx"];
// social-cards.jsx carries a self-referential portfolio-hub card that has no
// matching entry in PORTFOLIO.REPOS; it is the only id allowed to be absent.
const SOCIAL_ONLY_IDS = new Set(["tafreeman"]);
const EXPECTED_IDS = new Set([
  "agentic-runtime-platform",
  "executionkit",
  "financial-scenario-engine",
  "architecture-deck-system",
  "qa-automation-academy",
]);
const PRIVATE_IDS = new Set(["qa-automation-academy"]);

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

function isPrivateSocialCard(card) {
  return card.isPrivate === true || card.status === "PRIVATE";
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

  // 3. Private status must agree across both sources.
  for (const repo of portfolioRepos) {
    const card = socialById.get(repo.id);
    if (!card) continue;
    const portfolioPrivate = repo.status === "PRIVATE";
    const socialPrivate = isPrivateSocialCard(card);
    assert(
      portfolioPrivate === socialPrivate,
      `${repo.id}: private flag drift — PORTFOLIO ${portfolioPrivate ? "PRIVATE" : "public"} vs social-cards ${socialPrivate ? "PRIVATE" : "public"}`,
    );
  }

  // 4. The FULL status label must agree across both sources — social-cards is
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

    if (PRIVATE_IDS.has(repo.id)) {
      assert(repo.status === "PRIVATE", `${repo.id}: private repo must be labeled PRIVATE`);
      assert(repo.repo === null, `${repo.id}: private repo must not expose a source URL`);
      assert(repo.url === null, `${repo.id}: private repo must not expose a public URL`);
      continue;
    }

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

// Guard against the "Interconnected repos" hero stat regressing to a bare
// integer literal (e.g. `<div className="v accent">6</div>`) instead of the
// live REPOS.length expression. Scoped to the single labeled stat block —
// not a blanket ban on digits in landing.jsx, which legitimately displays
// other static figures (deck layout count, provider count, etc.).
async function validateSurfaceRepoCountLiteral() {
  const file = "landing.jsx";
  let source;
  try {
    source = await readFile(file, "utf8");
  } catch (error) {
    failures.push(
      `${file}: could not read surface for repo-count literal scan (${error instanceof Error ? error.message : String(error)})`,
    );
    return;
  }

  // Match the stat block immediately preceding the "Interconnected repos"
  // label, capturing whatever sits inside the value <div>.
  const statPattern = /<div className="v accent">([^<]*)<\/div>\s*<div className="l">Interconnected repos<\/div>/;
  const match = source.match(statPattern);
  assert(match, `${file}: could not locate the "Interconnected repos" hero stat to check for a hardcoded count`);
  if (!match) return;

  const value = match[1].trim();
  assert(
    /^\{.*REPOS\??\.length.*\}$/.test(value),
    `${file}: "Interconnected repos" stat must render a live REPOS.length expression, found "${value}" — use {REPOS.length} instead of a static number`,
  );
}

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

async function validatePublicGithubState(portfolio, repos) {
  for (const repo of repos) {
    if (PRIVATE_IDS.has(repo.id)) continue;

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

  for (const repo of repos.filter((entry) => PRIVATE_IDS.has(entry.id))) {
    assert(repo.url === null && repo.repo === null, `${repo.id}: private repo must remain linkless without authenticated metadata`);
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
  await validateSurfaceRepoCountLiteral();

  await validatePublicGithubState(portfolio, repos);
}

if (failures.length > 0) {
  console.error("Repo metadata validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Repo metadata validation passed for ${repos.length} portfolio repos.`);
