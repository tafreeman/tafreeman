// repo-data.jsx — single source of truth for portfolio repo + language data.
// Loaded as <script type="text/babel"> BEFORE profile.jsx.
// REAL DATA ONLY. Every repo, link, and label below is verified against the
// live GitHub account (gh repo list tafreeman) and each repo's own README.
// No fork, contribution, or achievement metrics are shown. The profile is a
// concise introduction to current public work, not a repository dashboard.

const GH = "https://github.com/tafreeman";

// Gate the dev/edit TweaksPanel: only on localhost or with an explicit ?tweaks
// flag. Hidden on the public github.io site. Exposed ONLY as a window.PORTFOLIO
// property (computed inline below) — deliberately NOT a top-level binding,
// because profile.jsx declares its own top-level `const SHOW_TWEAKS` and both
// scripts share global lexical scope on index.html (a top-level const here would
// make profile.jsx fail with "SHOW_TWEAKS has already been declared").
// profile.jsx reads window.PORTFOLIO.SHOW_TWEAKS directly.

// Only public, active repositories are listed. `url` is the primary visitor
// destination (a project site where available, otherwise the repository),
// `repo` is the public source, and `img` is the matching social card.
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
      id: "agentic-evalkit",
      name: "agentic-evalkit",
      eyebrow: "FEATURED · EVALUATION",
      title: "agentic-evalkit",
      desc: "Tools for measuring how well AI agents perform, comparing runs, and producing evidence that teams can review.",
      lang: "Python", langClass: "lang-py",
      status: "v0.3.0", statusClass: "",
      url: GH + "/agentic-evalkit",
      repo: GH + "/agentic-evalkit",
      img: "social-previews/agentic-evalkit.png",
    },
    {
      id: "agentic-runtime-platform",
      name: "agentic-runtime-platform",
      eyebrow: "PLATFORM",
      title: "Agentic Runtime Platform",
      desc: "A platform for coordinating AI agents with human approval steps, safety controls, and automatic fallback when an AI service is unavailable.",
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
      desc: "A Python library for repeatable AI workflows such as comparing responses, improving drafts, using tools, returning structured data, and managing cost.",
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
      desc: "A local-first financial planning application that keeps calculations in tested code and uses AI to interpret requests and explain results.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "BETA", statusClass: "beta",
      url: "https://tafreeman.github.io/financial-scenario-engine/",
      repo: GH + "/financial-scenario-engine",
      img: "social-previews/financial-scenario-engine.png",
    },
  ],
  // Real primary-language split across the four selected public repos.
  // Percentages are validated against these counts by validate-repo-data.mjs
  // (round(count/total*100)), so they must track the REPOS list above.
  LANGS: [
    { name: "Python",     pct: 75, color: "#3776ab" },
    { name: "TypeScript", pct: 25, color: "#3178c6" },
  ],
};
