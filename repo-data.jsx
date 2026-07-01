// repo-data.jsx — single source of truth for portfolio repo + language data.
// Loaded as <script type="text/babel"> BEFORE profile.jsx / landing.jsx.
// REAL DATA ONLY. Every repo, link, and label below is verified against the
// live GitHub account (gh repo list tafreeman) and each repo's own README.
// No star/fork/contribution/achievement metrics are shown because none are
// real (all five repos currently sit at 0 stars / 0 forks / no releases).

const GH = "https://github.com/tafreeman";

// Single source of truth for the architecture-deck-system layout count,
// referenced by landing.jsx, profile.jsx, and social-cards.jsx so the number
// only needs updating in one place. This is a MANUAL-SYNC value — nothing
// fetches it live from the deck-system repo (see repo-data.jsx header) — so
// bump the count AND the last-verified date together whenever the deck
// registry changes.
// last-verified: 2026-06-11 from architecture-deck-system@main (layouts registry)
window.DECK_LAYOUT_COUNT = 39;

// Gate the dev/edit TweaksPanel: only on localhost or with an explicit ?tweaks
// flag. Hidden on the public github.io site. Exposed ONLY as a window.PORTFOLIO
// property (computed inline below) — deliberately NOT a top-level binding,
// because profile.jsx declares its own top-level `const SHOW_TWEAKS` and both
// scripts share global lexical scope on index.html (a top-level const here would
// make profile.jsx fail with "SHOW_TWEAKS has already been declared").
// landing.jsx reads window.PORTFOLIO.SHOW_TWEAKS. Mirrors profile.jsx detection.

// Five real, non-archived repositories (four public, one private). `url` is
// the primary destination (live Pages where published, repo otherwise; null
// while a repo is private — cards render without a link); `repo` is the
// GitHub source where public; `img` is the on-brand social card.
// Descriptions and language are pulled from each repo.
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
      status: "v0.2.0", statusClass: "",
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
      id: "architecture-deck-system",
      name: "architecture-deck-system",
      eyebrow: "COMMUNICATION",
      title: "Architecture Deck System",
      // last-verified: 2026-06-11 from architecture-deck-system@main (layouts registry, theme config)
      // Layout count is interpolated from window.DECK_LAYOUT_COUNT (defined above).
      desc: `React 19 + Vite presentation platform — ${window.DECK_LAYOUT_COUNT} registered layouts across 8 families, 15 themes × 4 style modes, runtime content-pack swapping, Storybook, and HTML/image/PDF export.`,
      lang: "TypeScript", langClass: "lang-ts",
      status: "LIVE", statusClass: "live",
      url: "https://tafreeman.github.io/architecture-deck-system/",
      repo: GH + "/architecture-deck-system",
      img: "social-previews/architecture-deck-system.png",
    },
    {
      id: "qa-automation-academy",
      name: "qa-automation-academy",
      eyebrow: "ENABLEMENT",
      title: "QA Automation Academy",
      desc: "Playwright + GitHub Copilot training platform — a guided curriculum of interactive modules, a practice app with intentional bugs, and a growing library of reference specs that move manual QA engineers to automated testing.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "PRIVATE", statusClass: "",
      // Repo is private ahead of its public release — no public links yet,
      // so the card renders without navigation (null href is omitted).
      url: null,
      repo: null,
      img: "social-previews/qa-automation-academy.png",
    },
  ],
  // Real primary-language split across the five pinned repos (2 Python, 3 TypeScript).
  LANGS: [
    { name: "Python",     pct: 40, color: "#3776ab" },
    { name: "TypeScript", pct: 60, color: "#3178c6" },
  ],
};
