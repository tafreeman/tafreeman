// repo-data.jsx — single source of truth for portfolio repo + language data.
// Loaded as <script type="text/babel"> BEFORE profile.jsx / landing.jsx.
// REAL DATA ONLY. Every repo, link, and label below is verified against the
// live GitHub account (gh repo list tafreeman) and each repo's own README.
// No star/fork/contribution/achievement metrics are shown because none are
// real (all six repos currently sit at 0 stars / 0 forks / no releases).

const GH = "https://github.com/tafreeman";

// Six real, public, non-archived repositories. `url` is the primary
// destination (live Pages where published, repo otherwise); `repo` is always
// the GitHub source; `img` is the on-brand social card. Descriptions and
// language are pulled from each repo.
window.PORTFOLIO = {
  GH,
  REPOS: [
    {
      id: "agentic-runtime-platform",
      name: "agentic-runtime-platform",
      eyebrow: "PLATFORM",
      title: "Agentic Runtime Platform",
      desc: "Multi-agent orchestration — declarative YAML workflows compiled to executable DAGs, tiered model routing across 8+ providers, failover, evaluation, and live observability.",
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
      status: "v0.1.0", statusClass: "",
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
      desc: "React 19 + Vite presentation platform — 34 registered layouts across 8 families, 15 themes × 4 style modes, runtime content-pack swapping, Storybook, and HTML/image/PDF export.",
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
      desc: "Playwright + GitHub Copilot training platform — 49 interactive modules, a practice app with intentional bugs, and 59 reference specs that move manual QA engineers to automated testing.",
      lang: "TypeScript", langClass: "lang-ts",
      status: "WIP", statusClass: "",
      url: "https://tafreeman.github.io/qa-automation-academy/",
      repo: GH + "/qa-automation-academy",
      img: "social-previews/qa-automation-academy.png",
    },
    {
      id: "agentic-systems-lab",
      name: "agentic-systems-lab",
      eyebrow: "R&D",
      title: "Agentic Systems Lab",
      desc: "Research and prototyping companion to the runtime platform — runnable workflow examples, security-hardening sprints, evaluation patterns, and orchestration ideas before they upstream.",
      lang: "Python", langClass: "lang-py",
      status: "R&D", statusClass: "beta",
      // Pages not yet enabled — links to the repo until the Phase 3 PR lands.
      url: GH + "/agentic-systems-lab",
      repo: GH + "/agentic-systems-lab",
      img: "social-previews/agentic-systems-lab.png",
    },
  ],
  // Real primary-language split across the six pinned repos (3 Python, 3 TypeScript).
  LANGS: [
    { name: "Python",     pct: 50, color: "#3776ab" },
    { name: "TypeScript", pct: 50, color: "#3178c6" },
  ],
};
