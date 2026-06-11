import { readFile } from "node:fs/promises";
import vm from "node:vm";

const GH_OWNER = "tafreeman";
const REPO_DATA_FILE = "repo-data.jsx";
const EXPECTED_IDS = new Set([
  "agentic-runtime-platform",
  "executionkit",
  "financial-scenario-engine",
  "architecture-deck-system",
  "qa-automation-academy",
  "agentic-systems-lab",
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

async function fetchGithubRepo(repoId) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "tafreeman-profile-validator",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`https://api.github.com/repos/${GH_OWNER}/${repoId}`, { headers });
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
  await validatePublicGithubState(portfolio, repos);
}

if (failures.length > 0) {
  console.error("Repo metadata validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Repo metadata validation passed for ${repos.length} portfolio repos.`);
