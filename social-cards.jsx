/* =====================================================================
   SocialCard — a 1280×640 GitHub social-preview card, console style.
   REAL DATA ONLY. Languages, statuses, and commands are verified against
   each public repository. Star and fork counts are intentionally omitted;
   this is a profile introduction, not a popularity dashboard.
   ===================================================================== */

const REPOS = [
  {
    id: "agentic-evalkit",
    eyebrow: "FEATURED · EVALUATION",
    name: "agentic-evalkit",
    tagline: "Measure agent performance, compare runs, and produce evidence that teams can review.",
    cmd: "pip install agentic-evalkit",
    glyph: "flask",
    lang: "Python", langColor: "#3776ab",
    status: "v0.3.0", statusClass: "",
  },
  {
    id: "agentic-runtime-platform",
    eyebrow: "PLATFORM",
    name: "agentic-runtime-platform",
    tagline: "Coordinate AI agents with human approvals, safety controls, and automatic fallback between AI services.",
    cmd: "agentic run test_deterministic",
    glyph: "black-hole",
    lang: "Python", langColor: "#3776ab",
    status: "ACTIVE", statusClass: "live",
  },
  {
    id: "executionkit",
    eyebrow: "LIBRARY",
    name: "executionkit",
    tagline: "Repeatable AI workflows in Python, including tool use, structured data, and cost controls.",
    cmd: "pip install executionkit",
    glyph: "cube",
    lang: "Python", langColor: "#3776ab",
    // Kept in lockstep with repo-data.jsx (validator asserts card.status ===
    // repo.status); executionkit's latest GitHub release is v0.3.0.
    status: "v0.3.0", statusClass: "",
  },
  {
    id: "financial-scenario-engine",
    eyebrow: "APPLIED AI",
    name: "financial-scenario-engine",
    tagline: "Local-first financial planning with tested calculations and AI-assisted requests and explanations.",
    cmd: "npm start",
    glyph: "planet-chart",
    lang: "TypeScript", langColor: "#3178c6",
    status: "BETA", statusClass: "beta",
  },
  {
    id: "tafreeman",
    eyebrow: "PORTFOLIO HUB",
    name: "tafreeman",
    tagline: "Public work in AI evaluation, agent platforms, reusable Python tools, and applied AI software.",
    cmd: "whoami → tafreeman",
    glyph: "astro-cat",
    lang: "Andy Freeman", langColor: "#33b1ff", langPlain: true,
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
          <span className="sc-tb-tag">{r.isHub ? "OVERVIEW" : "PUBLIC"}</span>
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
