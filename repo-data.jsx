// repo-data.jsx — single source of truth for portfolio repo + language data.
// Loaded as <script type="text/babel"> BEFORE profile.jsx.
// REAL DATA ONLY. Every repo, link, and label below is verified against the
// live GitHub account (gh repo list tafreeman) and each repo's own README.
// No fork/contribution/achievement metrics are shown; star counts are also
// omitted because they are not meaningfully differentiated across the five
// repos as of 2026-07-09 (0-3 stars each, live-verified via the GitHub API).

const GH = "https://github.com/tafreeman";

// Gate the dev/edit TweaksPanel: only on localhost or with an explicit ?tweaks
// flag. Hidden on the public github.io site. Exposed ONLY as a window.PORTFOLIO
// property (computed inline below) — deliberately NOT a top-level binding,
// because profile.jsx declares its own top-level `const SHOW_TWEAKS` and both
// scripts share global lexical scope on index.html (a top-level const here would
// make profile.jsx fail with "SHOW_TWEAKS has already been declared").
// profile.jsx reads window.PORTFOLIO.SHOW_TWEAKS directly.

// Five repositories listed (four public, one private). `url` is
// the primary destination (live Pages where published, repo otherwise; null
// while a repo is private — cards render without a link); `repo` is the
// GitHub source where public; `img` is the on-brand social card.
// Descriptions and language are pulled from each repo.
// NOTE 2026-07-06: qa-automation-academy is ARCHIVED on GitHub while private
// (live-verified via `gh repo view`). The validator's live checks skip private
// repos, so that state is recorded here and in README's Status column.
// agentic-evalkit went public 2026-07-08 (career-signal audit) and is listed
// below as a normal public repo — live-verified 2026-07-09 (private: false,
// archived: false, has_pages: false, latest release v0.1.1). It has no
// GitHub Pages site, so `url` points at the repo itself (see the `url`
// convention above: "repo otherwise").
// NOTE 2026-07-09: architecture-deck-system was DROPPED from the portfolio by
// owner decision — the repo is private (recruiters would 404 on its links),
// and unlike QAA it is removed entirely rather than shown as a private/
// unlinked entry. Do not re-add it here without a new owner decision.
window.PORTFOLIO = {
  GH,
  SHOW_TWEAKS: (() => {
    if (typeof location === "undefined") return false;
    try {
      if (new URLSearchParams(location.search).has("tweaks")) return true;
      return /^(localhost|127\.0\.0\.1|\[?::1\]?)$/.test(location.hostname);
    } catch (e) {
      return false;
    }
  })(),
  REPOS: [
    {
      id: "agentic-runtime-platform",
      name: "agentic-runtime-platform",
      eyebrow: "PLATFORM",
      title: "Agentic Runtime Platform",
      desc: "Multi-agent orchestration — declarative YAML workflows compiled to executable DAGs, tiered model routing across 8 model backends (plus any OpenAI-compatible endpoint), failover, evaluation, and live observability.",
      lang: "Python", langClass: "lang-py",
      status: "ACTIVE", statusClass: "",
      url: "https://tafreeman.github.io/agentic-runtime-platform/",
      repo: GH + "/agentic-runtime-platform",
      img: "social-previews/agentic-runtime-platform.png",
    },
    {
      id: "executionkit",
      name: "executionkit",
      eyebrow: "LIBRARY",
      title: "ExecutionKit",
      desc: "Provider-agnostic Python library for composable LLM execution patterns — consensus, refinement, ReAct tool loops, structured output, and budget-aware calls. Zero runtime deps.",
      lang: "Python", langClass: "lang-py",
      // v0.3.0 is the latest GitHub release (live-verified 2026-07-09); the
      // validator checks this literal against the release tag, so bump both
      // together. Was stale at v0.2.0 through the 0.3.0 ship.
      status: "v0.3.0", statusClass: "",
      url: "https://tafreeman.github.io/executionkit/",
      repo: GH + "/executionkit",
      img: "social-previews/executionkit.png",
    },
    {
      id: "financial-scenario-engine",
      name: "financial-scenario-engine",
      eyebrow: "APPLIED AI",
      title: "Financial Scenario Engine",
      desc: "Local-first financial scenario analysis — a deterministic TypeScript engine produces every number; the LLM only parses intent and narrates. SQLite-backed, GitHub Models or local Ollama.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "BETA", statusClass: "beta",
      url: "https://tafreeman.github.io/financial-scenario-engine/",
      repo: GH + "/financial-scenario-engine",
      img: "social-previews/financial-scenario-engine.png",
    },
    {
      id: "agentic-evalkit",
      name: "agentic-evalkit",
      eyebrow: "EVALUATION",
      title: "agentic-evalkit",
      desc: "Evaluation toolkit for agentic systems — structurally independent of the runtimes it evaluates (a contract test forbids importing them); evaluates through public execution targets only.",
      lang: "Python", langClass: "lang-py",
      status: "v0.1.1", statusClass: "",
      // No GitHub Pages site (has_pages: false, live-verified) — url points at
      // the repo itself per the `url` convention above ("repo otherwise").
      url: GH + "/agentic-evalkit",
      repo: GH + "/agentic-evalkit",
      img: "social-previews/agentic-evalkit.png",
    },
    {
      id: "qa-automation-academy",
      name: "qa-automation-academy",
      eyebrow: "ENABLEMENT",
      title: "QA Automation Academy",
      desc: "Playwright + GitHub Copilot training platform — a guided curriculum of interactive modules, a practice app with intentional bugs, and a growing library of reference specs that move manual QA engineers to automated testing.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "PRIVATE", statusClass: "",
      // Repo is private (and archived on GitHub as of 2026-07-06) — no public
      // links, so the card renders without navigation (null href is omitted).
      url: null,
      repo: null,
      img: "social-previews/qa-automation-academy.png",
    },
  ],
  // Real primary-language split across the five pinned repos (3 Python, 2 TypeScript).
  // Percentages are validated against these counts by validate-repo-data.mjs
  // (round(count/total*100)), so they must track the REPOS list above.
  LANGS: [
    { name: "Python",     pct: 60, color: "#3776ab" },
    { name: "TypeScript", pct: 40, color: "#3178c6" },
  ],
};
