/* GitHub profile redesign — data + components */

const REPOS = [
  {
    id: "agentic-runtime-platform",
    name: "agentic-runtime-platform",
    eyebrow: "PLATFORM",
    title: "Agentic Runtime Platform",
    desc: "Multi-agent workflow runtime with DAG execution, tiered model routing, provider failover, evaluation, and live observability.",
    lang: "TypeScript", langClass: "lang-ts",
    stars: 142, forks: 18, status: "FLAGSHIP",
    statusClass: "",
  },
  {
    id: "executionkit",
    name: "executionkit",
    eyebrow: "LIBRARY",
    title: "ExecutionKit",
    desc: "Provider-agnostic Python primitives for consensus, refinement, ReAct loops, structured output, and budget-aware LLM calls.",
    lang: "Python", langClass: "lang-py",
    stars: 88, forks: 9, status: "v0.4",
    statusClass: "",
  },
  {
    id: "financial-scenario-engine",
    name: "financial-scenario-engine",
    eyebrow: "APPLIED AI",
    title: "Financial Scenario Engine",
    desc: "Local-first project financial analysis combining deterministic TypeScript calculations with optional LLM-assisted intent parsing.",
    lang: "TypeScript", langClass: "lang-ts",
    stars: 41, forks: 4, status: "LIVE",
    statusClass: "live",
  },
  {
    id: "architecture-deck-system",
    name: "architecture-deck-system",
    eyebrow: "COMMUNICATION",
    title: "Architecture Deck System",
    desc: "React presentation platform — reusable layouts, design tokens, content packs, Storybook, PPTX/PDF export.",
    lang: "React", langClass: "lang-react",
    stars: 67, forks: 11, status: "LIVE",
    statusClass: "live",
  },
  {
    id: "qa-automation-academy",
    name: "qa-automation-academy",
    eyebrow: "ENABLEMENT",
    title: "QA Automation Academy",
    desc: "Playwright + Copilot training platform for QA teams moving from manual testing to automated test authoring.",
    lang: "TypeScript", langClass: "lang-ts",
    stars: 29, forks: 6, status: "v1.2",
    statusClass: "",
  },
  {
    id: "agentic-systems-lab",
    name: "agentic-systems-lab",
    eyebrow: "R&D",
    title: "Agentic Systems Lab",
    desc: "Research lab for agentic workflows, security hardening, orchestration experiments, and evaluation patterns.",
    lang: "Python", langClass: "lang-py",
    stars: 23, forks: 2, status: "BETA",
    statusClass: "beta",
  },
];

const ACTIVITY = [
  { time: "2h",  icon: "git-commit", text: <>Pushed <span className="repo">10 commits</span> to <span className="repo">agentic-runtime-platform</span>/<span className="muted">main</span></>, meta: <><span className="plus">+842</span>  <span className="minus">−203</span></> },
  { time: "5h",  icon: "tag", text: <>Released <span className="repo">executionkit</span> <span className="muted">v0.4.2 — budget-aware refinement</span></>, meta: "PyPI" },
  { time: "1d",  icon: "pr", text: <>Merged PR <span className="repo">#142</span> in <span className="repo">architecture-deck-system</span> <span className="muted">— add scorecard layout</span></>, meta: "+1.2k −430" },
  { time: "2d",  icon: "issue", text: <>Closed issue <span className="repo">#88</span> in <span className="repo">agentic-runtime-platform</span> <span className="muted">— provider failover edge case</span></>, meta: "resolved" },
  { time: "3d",  icon: "star", text: <>Starred <span className="repo">openai/openai-python</span></>, meta: "stars" },
  { time: "4d",  icon: "git-branch", text: <>Created branch <span className="repo">feat/consensus-v2</span> in <span className="repo">executionkit</span></>, meta: "branch" },
];

const LANGS = [
  { name: "TypeScript", pct: 48, color: "#3178c6" },
  { name: "Python",     pct: 34, color: "#f7d046" },
  { name: "React",      pct: 12, color: "#61dafb" },
  { name: "Other",      pct:  6, color: "#545870" },
];

// --- contribution grid: deterministic pseudo-random heat ---
function generateContribGrid() {
  // 53 weeks × 7 days
  const cells = [];
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let w = 0; w < 53; w++) {
    const col = [];
    // recent weeks are hotter; weekday > weekend
    const recencyBoost = w / 53;
    for (let d = 0; d < 7; d++) {
      const r = rand();
      const weekdayBoost = (d === 0 || d === 6) ? 0.3 : 1.0;
      const score = r * weekdayBoost + recencyBoost * 0.35;
      let lvl = 0;
      if (score > 0.95) lvl = 4;
      else if (score > 0.75) lvl = 3;
      else if (score > 0.5) lvl = 2;
      else if (score > 0.28) lvl = 1;
      col.push(lvl);
    }
    cells.push(col);
  }
  return cells;
}

// --- icons (lightweight inline SVGs) ---
const Icon = ({ name, size = 14 }) => {
  const paths = {
    "search": <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    "bell": <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></>,
    "plus": <><path d="M5 12h14"/><path d="M12 5v14"/></>,
    "git-commit": <><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></>,
    "git-branch": <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
    "git-fork": <><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></>,
    "star": <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    "pin": <><path d="m21 16-3-3 3-3"/><path d="M9 12h12"/><path d="M3 5v14"/><path d="M3 9h6"/><path d="M3 15h6"/></>,
    "pr": <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></>,
    "issue": <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/></>,
    "tag": <><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    "book": <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    "users": <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    "package": <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    "building": <><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="9" y1="6" x2="4" y2="6"/><line x1="9" y1="14" x2="4" y2="14"/></>,
    "map-pin": <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    "link": <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    "mail": <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    "copy": <><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>,
    "edit": <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    "ext": <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    "lightning": <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    "shield": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    "cpu": <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

// ===================================================================
// TOP BAR + TABS
// ===================================================================
function TopBar() {
  return (
    <div className="gh-topbar">
      <div className="gh-mark">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </div>
      <div className="gh-search">
        <Icon name="search" size={14} />
        <span>Type <span style={{color: 'var(--fg-2)'}}>/</span> to search</span>
        <span className="kbd">⌘K</span>
      </div>
      <nav className="gh-nav-links">
        <a href="#">Pull requests</a>
        <a href="#">Issues</a>
        <a href="#">Marketplace</a>
        <a href="#">Explore</a>
      </nav>
      <div className="gh-top-actions">
        <button className="gh-icon-btn" title="Notifications">
          <Icon name="bell" size={15} />
          <span className="badge"></span>
        </button>
        <button className="gh-icon-btn" title="New"><Icon name="plus" size={15} /></button>
        <div className="gh-avatar-btn">AF</div>
      </div>
    </div>
  );
}

function ProfileTabs({ active = "Overview" }) {
  const tabs = [
    { name: "Overview", icon: "book" },
    { name: "Repositories", icon: "git-fork", count: 7 },
    { name: "Projects", icon: "package" },
    { name: "Packages", icon: "package", count: 2 },
    { name: "Stars", icon: "star", count: 41 },
  ];
  return (
    <div className="profile-tabs">
      {tabs.map(t => (
        <a key={t.name} className={`tab ${t.name === active ? "active" : ""}`} href="#">
          <Icon name={t.icon} size={14} />
          <span>{t.name}</span>
          {t.count && <span className="count">{t.count}</span>}
        </a>
      ))}
    </div>
  );
}

// ===================================================================
// SIDEBAR
// ===================================================================
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-avatar">
        <span className="glyph">af</span>
        <span className="status-dot" title="Available"></span>
      </div>

      <div className="sb-id">
        <h1 className="name">Andy Freeman</h1>
        <p className="handle">tafreeman</p>
        <p className="pronouns">he / him · architect</p>
      </div>

      <p className="sb-tagline">
        Production-grade AI engineering systems. Reusable LLM primitives, multi-agent orchestration, deterministic business apps with AI interfaces.
      </p>

      <div className="sb-cta">
        <a className="sb-btn primary" href="#"><Icon name="users" size={13} /> Follow</a>
        <a className="sb-btn icon" href="#" title="Sponsor"><Icon name="lightning" size={13} /></a>
      </div>

      <div className="sb-followers">
        <a href="#"><Icon name="users" size={13} /><span className="num">312</span> followers</a>
        <span style={{color: 'var(--fg-3)'}}>·</span>
        <a href="#"><span className="num">48</span> following</a>
      </div>

      <div className="sb-meta">
        <div className="sb-meta-row"><Icon name="building" size={14} /><span>Independent architecture practice</span></div>
        <div className="sb-meta-row"><Icon name="map-pin" size={14} /><span>Toronto, ON</span></div>
        <div className="sb-meta-row"><Icon name="link" size={14} /><a href="#">tafreeman.dev</a></div>
        <div className="sb-meta-row"><Icon name="mail" size={14} /><span style={{fontFamily: 'var(--font-mono)', fontSize: 12}}>a@tafreeman.dev</span></div>
      </div>

      <div>
        <div className="sb-section-h">Achievements <span className="count-pill">7</span></div>
        <div className="achievements">
          <Achievement name="Pair Extraordinaire" tier="×3" color="#FFB224" glyph="P" />
          <Achievement name="Pull Shark" tier="×2" color="#5E6AD2" glyph="◄" />
          <Achievement name="Quickdraw" tier="" color="#4CC38A" glyph="⚡" />
          <Achievement name="YOLO" tier="" color="#E5484D" glyph="!" />
          <Achievement name="Galaxy Brain" tier="" color="#8B7CE8" glyph="★" />
          <Achievement name="Public Sponsor" tier="" color="#FF8A65" glyph="❤" />
          <Achievement name="Starstruck" tier="" color="#FFD56B" glyph="✦" />
        </div>
      </div>

      <div>
        <div className="sb-section-h">Top languages</div>
        <div className="lang-bar">
          {LANGS.map(l => (
            <span key={l.name} style={{width: `${l.pct}%`, background: l.color}}></span>
          ))}
        </div>
        <div className="lang-list">
          {LANGS.map(l => (
            <div key={l.name} className="row">
              <span className="dot" style={{background: l.color}}></span>
              <span className="name">{l.name}</span>
              <span className="pct">{l.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sb-section-h">Now</div>
        <div className="now-card">
          <div className="label">Current focus</div>
          <div className="line"><span className="k">repo:</span> agentic-runtime-platform</div>
          <div className="line"><span className="k">branch:</span> feat/consensus-v2</div>
          <div className="line"><span className="k">since:</span> 14 days · 23 commits</div>
        </div>
      </div>

      <div>
        <div className="sb-section-h">Orgs</div>
        <div className="org-stack">
          <div className="org-tile" title="Andy Freeman portfolio">AF</div>
          <div className="org-tile" title="Architecture deck system">ADS</div>
          <div className="org-tile" title="ExecutionKit">EK</div>
          <div className="org-tile" title="Agentic Lab">AL</div>
        </div>
      </div>
    </aside>
  );
}

function Achievement({ name, tier, color, glyph }) {
  return (
    <div className="ach" title={name + (tier ? ' ' + tier : '')}>
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id={`g-${name.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon points="32,4 56,18 56,46 32,60 8,46 8,18"
          fill={`url(#g-${name.replace(/\s/g, '')})`}
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <text x="32" y="40" fontSize="22" fill={color} textAnchor="middle"
              fontFamily="var(--font-display)" fontWeight="700">{glyph}</text>
      </svg>
      {tier && <span className="tier">{tier}</span>}
    </div>
  );
}

// ===================================================================
// MAIN: README banner
// ===================================================================
function ReadmeBanner() {
  return (
    <section className="readme" data-screen-label="01 README">
      <div className="grid-bg"></div>
      <div className="readme-head">
        <div className="readme-path">
          <Icon name="book" size={13} />
          <span>tafreeman</span>
          <span className="slash">/</span>
          <span>tafreeman</span>
          <span className="slash">/</span>
          <span className="file">README.md</span>
        </div>
        <div className="readme-actions">
          <button className="readme-action-btn" title="Edit"><Icon name="edit" size={13} /></button>
          <button className="readme-action-btn" title="Copy raw"><Icon name="copy" size={13} /></button>
          <button className="readme-action-btn" title="Open"><Icon name="ext" size={13} /></button>
        </div>
      </div>

      <div className="readme-eyebrow">
        <span className="dot"></span>
        <span>Available for senior AI architecture engagements · Q3 2026</span>
      </div>

      <h1 className="readme-title">
        Production-grade <span className="accent">AI engineering systems</span>, shipped with the discipline of platform infrastructure.
      </h1>

      <p className="readme-sub">
        Architect of six interconnected repositories spanning reusable LLM execution primitives, multi-agent orchestration platforms, deterministic business apps with AI interfaces, QA enablement, and architecture communication tooling.
      </p>

      <div className="readme-stats">
        <div className="r-stat">
          <span className="v accent">6</span>
          <span className="l">Production repos</span>
        </div>
        <div className="r-stat">
          <span className="v">17</span>
          <span className="l">Deck layouts shipped</span>
        </div>
        <div className="r-stat">
          <span className="v">1.4k</span>
          <span className="l">Commits · trailing 12mo</span>
        </div>
        <div className="r-stat">
          <span className="v">DAG</span>
          <span className="l">+ ReAct + Consensus</span>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// PINNED REPO GRID
// ===================================================================
function PinnedGrid() {
  return (
    <section>
      <div className="section-h2">
        <span className="eyebrow">// Pinned</span>
        <h2>Flagship repositories</h2>
        <span className="right"><a href="#">Customize pins →</a></span>
      </div>
      <div className="pinned-grid">
        {REPOS.map(r => <RepoCard key={r.id} r={r} />)}
      </div>
    </section>
  );
}

function RepoCard({ r }) {
  return (
    <a className="repo-card" href={`#${r.id}`}>
      <div className="repo-head">
        <div className="repo-mark">{r.title[0]}</div>
        <div className="repo-head-text">
          <span className="repo-eyebrow">{r.eyebrow}</span>
          <p className="repo-name">{r.name}</p>
        </div>
        <span className="repo-pin"><Icon name="pin" size={14} /></span>
      </div>
      <p className="repo-desc">{r.desc}</p>
      <div className="repo-meta">
        <span className="item"><span className={`repo-lang-dot ${r.langClass}`}></span> {r.lang}</span>
        <span className="item"><Icon name="star" size={11} /> {r.stars}</span>
        <span className="item"><Icon name="git-fork" size={11} /> {r.forks}</span>
        <span className={`status ${r.statusClass}`}>{r.status}</span>
      </div>
    </a>
  );
}

// ===================================================================
// ARCHITECTURE MAP — novel "how my repos connect"
// ===================================================================
function ArchitectureMap() {
  return (
    <section className="map-card">
      <div className="map-card-head">
        <div>
          <span className="eyebrow">// Systems graph</span>
          <h3>How the six repositories compose</h3>
          <p className="sub">Primitives flow upward into platforms; platforms emit telemetry into research and communication surfaces.</p>
        </div>
        <div className="legend">
          <span><span className="ld lp"></span> Platform</span>
          <span><span className="ld ll"></span> Library</span>
          <span><span className="ld lr"></span> Surface</span>
        </div>
      </div>

      <svg viewBox="0 0 1000 360" className="map-svg" aria-hidden="true">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Layer rails */}
        <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" style={{ fill: "var(--fg-3)" }}>
          <text x="20" y="60">L3 · COMMUNICATION</text>
          <line x1="20" y1="68" x2="980" y2="68" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="155">L2 · PLATFORM</text>
          <line x1="20" y1="163" x2="980" y2="163" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="250">L1 · PRIMITIVES</text>
          <line x1="20" y1="258" x2="980" y2="258" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="340">L0 · R&D</text>
        </g>

        {/* L3 — Communication / Applied */}
        <Node x={170} y={90} w={210} title="Architecture Deck System" sub="React · Storybook · PPTX" kind="surface" />
        <Node x={420} y={90} w={210} title="Financial Scenario Engine" sub="TS · local-first · Zod" kind="surface" />
        <Node x={670} y={90} w={210} title="QA Automation Academy" sub="Playwright · Copilot" kind="surface" />

        {/* L2 — Platform */}
        <Node x={295} y={185} w={210} title="Agentic Runtime Platform" sub="DAG · routing · failover" kind="platform" featured />

        {/* L1 — Library */}
        <Node x={545} y={185} w={210} title="ExecutionKit" sub="consensus · ReAct · budget" kind="library" featured />

        {/* L0 — R&D */}
        <Node x={420} y={290} w={210} title="Agentic Systems Lab" sub="security · evals · prototypes" kind="lab" />

        {/* Connections — primitives flow up */}
        <Edge from={[400, 215]} to={[400, 122]} />
        <Edge from={[650, 215]} to={[400, 122]} />
        <Edge from={[650, 215]} to={[525, 122]} />
        <Edge from={[650, 215]} to={[775, 122]} />
        <Edge from={[400, 215]} to={[775, 122]} />
        <Edge from={[525, 290]} to={[400, 215]} />
        <Edge from={[525, 290]} to={[650, 215]} />
      </svg>
    </section>
  );
}

function Node({ x, y, w, title, sub, kind, featured }) {
  // Colors are design-system tokens (SVG attrs don't take var(), so apply
  // them via style). Featured layers (platform/library) carry the live
  // accent; supporting surfaces stay neutral.
  const colors = {
    platform: { fill: "var(--surface-2)",    stroke: "var(--accent)",   accent: "var(--accent)" },
    library:  { fill: "var(--surface-2)",    stroke: "var(--accent-2)", accent: "var(--accent-2)" },
    surface:  { fill: "var(--surface-deep)", stroke: "var(--border)",   accent: "var(--fg-3)" },
    lab:      { fill: "var(--surface-deep)", stroke: "var(--border)",   accent: "var(--fg-3)" },
  };
  const c = colors[kind];
  const h = 64;
  return (
    <g transform={`translate(${x - w/2}, ${y - h/2})`}>
      <rect x="0" y="0" width={w} height={h} rx="10"
            style={{ fill: c.fill, stroke: c.stroke }} strokeWidth={featured ? 1.5 : 1} />
      <rect x="0" y="0" width="3" height={h} style={{ fill: c.accent }} />
      <text x="14" y="26" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" style={{ fill: "var(--fg-1)" }}>{title}</text>
      <text x="14" y="46" fontFamily="var(--font-mono)" fontSize="10" letterSpacing=".5" style={{ fill: "var(--fg-2)" }}>{sub}</text>
    </g>
  );
}

function Edge({ from, to }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mid = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
  return <path d={d} style={{ stroke: "var(--accent)" }} strokeOpacity="0.5" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />;
}

// ===================================================================
// CONTRIBUTION GRID
// ===================================================================
function ContributionCard() {
  const [range, setRange] = React.useState("12mo");
  const grid = React.useMemo(() => generateContribGrid(), []);
  // count totals
  const totals = React.useMemo(() => {
    let t = 0; let streak = 0; let longest = 0; let cur = 0;
    grid.forEach(col => col.forEach(c => {
      const dayCount = [0, 1, 3, 6, 12][c];
      t += dayCount;
      if (c > 0) { cur += 1; if (cur > longest) longest = cur; }
      else cur = 0;
    }));
    // current streak = trailing
    for (let w = grid.length - 1; w >= 0; w--) {
      for (let d = 6; d >= 0; d--) {
        if (grid[w][d] > 0) streak += 1;
        else return { total: t, streak, longest };
      }
    }
    return { total: t, streak, longest };
  }, [grid]);

  return (
    <section className="contrib-card">
      <div className="contrib-head">
        <div>
          <h3>Commit signal</h3>
        </div>
        <span className="sub">// 53 weeks · public + private</span>
        <div className="toggle">
          {["3mo", "12mo", "ALL"].map(r => (
            <button key={r} className={range === r ? "active" : ""} onClick={() => setRange(r)}>{r}</button>
          ))}
        </div>
      </div>

      <div className="contrib-summary">
        <div className="cs-item">
          <div className="v"><span className="accent">{totals.total.toLocaleString()}</span></div>
          <div className="l">Contributions</div>
          <div className="delta">↑ 28% vs prior 12mo</div>
        </div>
        <div className="cs-item">
          <div className="v">{totals.streak}</div>
          <div className="l">Day streak · current</div>
          <div className="delta">↑ longest active</div>
        </div>
        <div className="cs-item">
          <div className="v">{totals.longest}</div>
          <div className="l">Longest streak</div>
          <div className="delta">across 12mo</div>
        </div>
        <div className="cs-item">
          <div className="v">142</div>
          <div className="l">Reviews authored</div>
          <div className="delta">↑ 11% vs 90d</div>
        </div>
      </div>

      <div className="contrib-grid-wrap">
        <div className="contrib-days" aria-hidden="true">
          <span style={{gridRow: 2}}>Mon</span>
          <span style={{gridRow: 4}}>Wed</span>
          <span style={{gridRow: 6}}>Fri</span>
        </div>
        <div className="contrib-grid">
          {grid.map((col, i) => (
            <div key={i} className="contrib-col">
              {col.map((lvl, j) => (
                <div key={j} className={`contrib-cell ${lvl ? `l${lvl}` : ''}`}
                     title={`Week ${i + 1}, day ${j + 1}: ${[0,1,3,6,12][lvl]} commits`} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="contrib-footer">
        <span>Updated 12 min ago · <span style={{color: 'var(--accent)'}}>UTC-5</span></span>
        <span className="contrib-legend">
          Less
          <span className="scale">
            <span style={{background: 'var(--bg-deep)', border: '1px solid var(--border-soft)'}}></span>
            <span style={{background: 'color-mix(in srgb, var(--accent) 20%, transparent)'}}></span>
            <span style={{background: 'color-mix(in srgb, var(--accent) 42%, transparent)'}}></span>
            <span style={{background: 'color-mix(in srgb, var(--accent) 70%, transparent)'}}></span>
            <span style={{background: 'var(--accent)'}}></span>
          </span>
          More
        </span>
      </div>
    </section>
  );
}

// ===================================================================
// ACTIVITY LEDGER
// ===================================================================
function ActivityLedger() {
  return (
    <section className="activity-card">
      <div className="section-h2" style={{margin: '0 0 12px', paddingBottom: 0, borderBottom: 'none'}}>
        <span className="eyebrow">// Ledger</span>
        <h2 style={{fontSize: 18}}>Recent activity</h2>
        <span className="right">last 7 days · <a href="#">all events →</a></span>
      </div>
      <div className="activity-list">
        {ACTIVITY.map((a, i) => (
          <div key={i} className="activity-row">
            <span className="time">{a.time} ago</span>
            <span className="icon"><Icon name={a.icon} size={14} /></span>
            <span className="text">{a.text}</span>
            <span className="meta">{a.meta}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================================================================
// PAGE
// ===================================================================
function ProfilePage() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {}];

  React.useEffect(() => {
    // Theme + accent live entirely in tokens.css. We only toggle the two
    // attributes the design system reads — no palette duplicated here.
    const root = document.documentElement;
    root.setAttribute('data-mode', tweaks.mode);
    root.setAttribute('data-accent', tweaks.accent);
  }, [tweaks.accent, tweaks.mode]);

  return (
    <div data-screen-label="GitHub profile · tafreeman">
      <TopBar />
      <ProfileTabs active="Overview" />
      <main className="profile-shell">
        <Sidebar />
        <div className="main">
          <ReadmeBanner />
          <PinnedGrid />
          {tweaks.showMap && <ArchitectureMap />}
          {tweaks.showContrib && <ContributionCard />}
          {tweaks.showActivity && <ActivityLedger />}
        </div>
      </main>
      <footer className="profile-footer">
        <span>© 2026 GitHub, Inc. · Profile redesign by tafreeman</span>
        <span>tokens: <span style={{color: 'var(--accent)'}}>{tweaks.accent}</span> · mode: {tweaks.mode}</span>
      </footer>

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Theme">
            <window.TweakRadio label="Mode" value={tweaks.mode}
              options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
              onChange={v => setTweak('mode', v)} />
            <window.TweakSelect label="Accent" value={tweaks.accent}
              options={[
                { value: "indigo", label: "Indigo (Linear)" },
                { value: "cobalt", label: "Cobalt" },
                { value: "ember",  label: "Ember" },
                { value: "mint",   label: "Mint" },
              ]}
              onChange={v => setTweak('accent', v)} />
          </window.TweakSection>
          <window.TweakSection label="Sections">
            <window.TweakToggle label="Systems graph" value={tweaks.showMap} onChange={v => setTweak('showMap', v)} />
            <window.TweakToggle label="Commit signal" value={tweaks.showContrib} onChange={v => setTweak('showContrib', v)} />
            <window.TweakToggle label="Activity ledger" value={tweaks.showActivity} onChange={v => setTweak('showActivity', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.ProfilePage = ProfilePage;
