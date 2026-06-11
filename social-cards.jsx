/* =====================================================================
   SocialCard — a 1280×640 GitHub social-preview card, console style.
   REAL DATA ONLY. Languages, statuses, and commands are verified against
   each repo's README. Star/fork counts are intentionally omitted because
   every repo is currently at 0/0 — showing them would be noise, and the
   earlier fabricated counts (142/18, 88/9, …) must never reappear (G2).
   ===================================================================== */

const REPOS = [
  {
    id: "agentic-runtime-platform",
    eyebrow: "PLATFORM",
    name: "agentic-runtime-platform",
    tagline: "Multi-agent orchestration — declarative YAML workflows compiled to executable DAGs, tiered model routing, provider failover, and live observability.",
    cmd: "agentic run test_deterministic",
    glyph: "black-hole",
    lang: "Python", langColor: "#3776ab",
    status: "ACTIVE", statusClass: "live",
  },
  {
    id: "executionkit",
    eyebrow: "LIBRARY",
    name: "executionkit",
    tagline: "Provider-agnostic LLM primitives: consensus, refinement, ReAct loops, structured output, and budget-aware calls. Zero runtime dependencies.",
    cmd: "pip install executionkit",
    glyph: "cube",
    lang: "Python", langColor: "#3776ab",
    status: "v0.1.0", statusClass: "",
  },
  {
    id: "financial-scenario-engine",
    eyebrow: "APPLIED AI",
    name: "financial-scenario-engine",
    tagline: "Local-first project finance — a deterministic TypeScript engine produces every number; the LLM only parses intent and narrates results.",
    cmd: "npm start",
    glyph: "planet-chart",
    lang: "TypeScript", langColor: "#3178c6",
    status: "BETA", statusClass: "beta",
  },
  {
    id: "architecture-deck-system",
    eyebrow: "COMMUNICATION",
    name: "architecture-deck-system",
    // last-verified: 2026-06-11 from architecture-deck-system@main (layouts registry, theme config)
    tagline: "React 19 + Vite presentation platform — 39 layouts, 15 themes × 4 style modes, runtime content-pack swapping, Storybook, and HTML/image/PDF export.",
    cmd: "npm run dev",
    glyph: "deck",
    lang: "TypeScript", langColor: "#3178c6",
    status: "LIVE", statusClass: "live",
  },
  {
    id: "qa-automation-academy",
    eyebrow: "ENABLEMENT",
    name: "qa-automation-academy",
    tagline: "Playwright + Copilot training platform — interactive modules and reference specs that move QA teams from manual to automated testing.",
    cmd: "pnpm dev",
    glyph: "rocket-check",
    lang: "TypeScript", langColor: "#3178c6",
    status: "PRIVATE", statusClass: "",
    isPrivate: true,
  },
  {
    id: "agentic-systems-lab",
    eyebrow: "RESEARCH",
    name: "agentic-systems-lab",
    tagline: "Research and prototyping companion to the runtime platform — runnable examples, security-hardening sprints, evaluation patterns, and orchestration ideas.",
    cmd: "python examples/01_hello_workflow.py",
    glyph: "flask",
    lang: "Python", langColor: "#3776ab",
    status: "R&D", statusClass: "beta",
  },
  {
    id: "tafreeman",
    eyebrow: "PORTFOLIO HUB",
    name: "tafreeman",
    tagline: "AI engineering systems — LLM primitives, multi-agent orchestration, deterministic apps.",
    cmd: "whoami → tafreeman",
    glyph: "astro-cat",
    lang: "Andy Freeman", langColor: "#d97757", langPlain: true,
    status: "PROFILE", statusClass: "flagship",
    isHub: true,
  },
];

// deterministic starfield so it doesn't flicker across renders
function starField(seed, n) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      left: 4 + rand() * 92,
      top: 8 + rand() * 84,
      size: rand() > 0.85 ? 2.5 : 1.5,
      op: 0.25 + rand() * 0.5,
    });
  }
  return out;
}

function SocialCard({ r }) {
  const stars = React.useMemo(() => starField(r.id.length * 31 + 7, 26), [r.id]);
  return (
    <div className="sc-card" data-screen-label={r.name}>
      <div className="sc-stars">
        {stars.map((st, i) => (
          <span key={i} className="sc-star" style={{ left: `${st.left}%`, top: `${st.top}%`, width: st.size, height: st.size, opacity: st.op }} />
        ))}
      </div>

      <div className="sc-titlebar">
        <div className="sc-tb-left">
          <span className="sc-tb-mark" />
          <span className="sc-tb-path">tafreeman&nbsp;/&nbsp;<b>{r.name}</b></span>
        </div>
        <div className="sc-tb-right">
          <span className="sc-tb-tag">{r.isHub ? "OVERVIEW" : r.isPrivate ? "PRIVATE" : "PUBLIC"}</span>
        </div>
      </div>

      <div className="sc-body">
        <div className="sc-left">
          <span className="sc-eyebrow">{r.eyebrow}</span>
          <h1 className="sc-name">{renderName(r.name)}</h1>
          <p className="sc-tagline">{r.tagline}</p>
          <div className="sc-cmd">
            <span className="prompt">$</span>
            <span>{r.cmd}</span>
            <span className="cursor" />
          </div>
          <div className="sc-meta">
            <span className="mi">
              <span className="ldot" style={{ background: r.langColor }} />
              <span className="val">{r.lang}</span>
            </span>
          </div>
        </div>

        <div className="sc-glyph">
          <span className="sc-tick tl" /><span className="sc-tick tr" />
          <span className="sc-tick bl" /><span className="sc-tick br" />
          <window.Glyph name={r.glyph} />
        </div>
      </div>

      <div className="sc-footer">
        <span className="sc-url"><span className="at">↳</span> github.com/tafreeman/{r.name}</span>
        <span className={`sc-status ${r.statusClass}`}>
          <span className="sdot" />{r.status}
        </span>
      </div>
    </div>
  );
}

// clay-accent the final hyphen segment of the repo name
function renderName(name) {
  if (!name) return <span></span>;
  if (!name.includes("-")) return <span>{name}</span>;
  const i = name.lastIndexOf("-");
  return (<><span>{name.slice(0, i + 1)}</span><span className="accent">{name.slice(i + 1)}</span></>);
}

window.SocialCard = SocialCard;
window.REPOS = REPOS;
