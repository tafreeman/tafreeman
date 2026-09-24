// repo-data.jsx — single source of truth for portfolio repo + language data.
// Despite the extension this is plain JS with no JSX in it, and index.html
// loads it as a plain <script src> BEFORE dist/profile.js — which destructures
// window.PORTFOLIO at top level, so the order is not optional. It is also the
// one script on the page that still ships to browsers as raw source rather
// than through scripts/build-js.mjs; keep it JSX-free so it stays that way.
// REAL DATA ONLY. Every repo, link, and label below is verified against the
// live GitHub account (gh repo list tafreeman) and each repo's own README.
// No fork, contribution, or achievement metrics are shown. The profile is a
// concise introduction to current public work, not a repository dashboard.

const GH = "https://github.com/tafreeman";

// Gate the dev/edit TweaksPanel: only on localhost or with an explicit ?tweaks
// flag. Hidden on the public github.io site. Exposed ONLY as a window.PORTFOLIO
// property (computed inline below) — deliberately NOT a top-level binding.
// Originally it could not be one: profile.jsx declares its own top-level
// `const SHOW_TWEAKS` and both files shared a single global lexical scope on
// index.html, so a top-level const of that name here failed the page outright
// with "SHOW_TWEAKS has already been declared". profile.jsx now ships wrapped
// in an IIFE (scripts/build-js.mjs), so that particular collision can no
// longer fire — but this file is still loaded as raw source into the scope it
// shares with index.html's inline block, so keep new values on
// window.PORTFOLIO instead of finding out which name collides next.

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
      desc: "Grades AI agent output against checks you define, and writes up the evidence behind each score.",
      lang: "Python", langClass: "lang-py",
      // v0.4.1 is the latest GitHub release (live-verified 2026-09-23); the
      // validator checks this literal against the release tag, so bump both
      // together.
      status: "v0.4.1", statusClass: "",
      url: GH + "/agentic-evalkit",
      repo: GH + "/agentic-evalkit",
      img: "social-previews/agentic-evalkit.png",
    },
    {
      id: "agentic-runtime-platform",
      name: "agentic-runtime-platform",
      eyebrow: "PLATFORM",
      title: "Agentic Runtime Platform",
      desc: "Runs multi-agent LLM workflows defined in YAML, with fail-closed approval checks on high-impact tool calls and automatic failover when a provider goes down.",
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
      desc: "A Python library of LLM calling patterns — voting, retry-and-refine, tool loops, structured output — with no dependencies outside the standard library.",
      lang: "Python", langClass: "lang-py",
      // v0.4.0 is the latest GitHub release (live-verified 2026-09-23); the
      // validator checks this literal against the release tag, so bump both
      // together.
      status: "v0.4.0", statusClass: "",
      url: "https://tafreeman.github.io/executionkit/",
      repo: GH + "/executionkit",
      img: "social-previews/executionkit.png",
    },
    {
      id: "financial-scenario-engine",
      name: "financial-scenario-engine",
      eyebrow: "APPLIED AI",
      title: "Financial Scenario Engine",
      desc: "A local what-if simulator for project budgets: an AI reads your question, and tested code does all the math.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "BETA", statusClass: "beta",
      // The Pages root serves the VitePress docs; the product overview site is
      // nested at /overview/ (one composed artifact, see the repo's
      // deploy-pages.yml). Linking the bare root lands visitors on docs, not
      // the project site this card advertises. Keep in sync with README.md.
      url: "https://tafreeman.github.io/financial-scenario-engine/overview/",
      repo: GH + "/financial-scenario-engine",
      img: "social-previews/financial-scenario-engine.png",
    },
    {
      id: "groundkit",
      name: "groundkit",
      eyebrow: "RETRIEVAL",
      title: "GroundKit",
      desc: "A citation-verified retrieval engine for your own documents — every answer points at an exact passage, and the citation is checked against the source before it's returned.",
      lang: "Python", langClass: "lang-py",
      // v0.2.1 is the latest GitHub release (live-verified 2026-09-23); the
      // validator checks this literal against the release tag, so bump both
      // together.
      status: "v0.2.1", statusClass: "",
      url: "https://tafreeman.github.io/groundkit/",
      repo: GH + "/groundkit",
      img: "social-previews/groundkit.png",
    },
  ],
  // Real primary-language split — a REPO-COUNT ratio across the selected
  // public repos above (each repo counted once, by its one primary
  // language), NOT a lines-of-code measure. Kept for validate-repo-data.mjs's
  // internal consistency check (round(count/total*100) against the REPOS
  // list above) even though profile.jsx no longer renders it as a bar — the
  // rendered page replaced that section with evidence links (see
  // EvidenceLinks in profile.jsx); a language-count ratio was judged less
  // useful to a visitor than a link to a real, reproducible result.
  LANGS: [
    { name: "Python",     pct: 80, color: "#3776ab" },
    { name: "TypeScript", pct: 20, color: "#3178c6" },
  ],
};
