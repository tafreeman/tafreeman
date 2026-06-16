/* GitHub profile redesign — data + components
   REAL DATA ONLY. Every repo, link, and label below is verified against the
   live GitHub account (gh repo list tafreeman) and each repo's own README.
   No star/fork/contribution/achievement metrics are shown because none are
   real (all six repos currently sit at 0 stars / 0 forks / no releases). */

// Repo + language data is the single source of truth in repo-data.jsx, which
// MUST be loaded (as <script src="repo-data.jsx">) BEFORE
// this file. profile.jsx consumes the rich fields (eyebrow/title/desc/etc.).
const { REPOS, LANGS } = window.PORTFOLIO;
const PROFILE_GH = window.PORTFOLIO.GH;

// Gate the dev/edit TweaksPanel: only on localhost or with an explicit ?tweaks
// flag. Hidden on the public github.io site.
const SHOW_TWEAKS = (() => {
  try {
    if (new URLSearchParams(location.search).has('tweaks')) return true;
    return /^(localhost|127\.0\.0\.1|\[?::1\]?)$/.test(location.hostname);
  } catch (e) { return false; }
})();

// --- icons (lightweight inline SVGs) ---
const Icon = ({ name, size = 14 }) => {
  const paths = {
    "search": <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    "git-commit": <><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></>,
    "git-branch": <><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
    "git-fork": <><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/></>,
    "star": <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    "pin": <><path d="m21 16-3-3 3-3"/><path d="M9 12h12"/><path d="M3 5v14"/><path d="M3 9h6"/><path d="M3 15h6"/></>,
    "book": <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    "users": <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    "package": <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    "map-pin": <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    "link": <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    "linkedin": <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    "ext": <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    "lightning": <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
    "cpu": <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="15" x2="4" y2="15"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

// ===================================================================
// TOP BAR + TABS  (GitHub chrome — links point to real GitHub destinations)
// ===================================================================
function TopBar() {
  return (
    <div className="gh-topbar">
      <div className="gh-mark">
        <svg viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </div>
      <a className="gh-search" href={PROFILE_GH + "?tab=repositories"}>
        <Icon name="search" size={14} />
        <span>Browse <span style={{color: 'var(--fg-2)'}}>tafreeman</span> repositories</span>
      </a>
      <nav className="gh-nav-links">
        <a href={PROFILE_GH + "?tab=repositories"}>Repositories</a>
        <a href={PROFILE_GH + "?tab=projects"}>Projects</a>
        <a href={PROFILE_GH + "?tab=packages"}>Packages</a>
        <a href="https://github.com/explore">Explore</a>
      </nav>
      <div className="gh-top-actions">
        <a className="gh-avatar-btn" href={PROFILE_GH} title="Andy Freeman on GitHub">AF</a>
      </div>
    </div>
  );
}

function ProfileTabs({ active = "Overview" }) {
  // Repo count intentionally omitted — GitHub's own profile omits it too, and
  // any static integer silently drifts on visibility changes. CI validates the
  // portfolio repo list in scripts/validate-repo-data.mjs instead.
  const tabs = [
    { name: "Overview", icon: "book", href: PROFILE_GH },
    { name: "Repositories", icon: "git-fork", href: PROFILE_GH + "?tab=repositories" },
    { name: "Stars", icon: "star", href: PROFILE_GH + "?tab=stars" },
  ];
  return (
    <div className="profile-tabs">
      {tabs.map(t => (
        <a key={t.name} className={`tab ${t.name === active ? "active" : ""}`} href={t.href}>
          <Icon name={t.icon} size={14} />
          <span>{t.name}</span>
          {t.count != null && <span className="count">{t.count}</span>}
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
        <span className="status-dot"></span>
      </div>

      <div className="sb-id">
        <h1 className="name">Andy Freeman</h1>
        <p className="handle">tafreeman</p>
        <p className="pronouns">he / him</p>
      </div>

      <p className="sb-tagline">
        AI engineering systems — LLM primitives, multi-agent orchestration, deterministic apps with AI interfaces.
      </p>

      <div className="sb-cta">
        <a className="sb-btn primary" href={PROFILE_GH} target="_blank" rel="noopener"><Icon name="users" size={13} /> Follow on GitHub</a>
      </div>

      <div className="sb-meta">
        <div className="sb-meta-row"><Icon name="map-pin" size={14} /><span>Mobile, AL · works out of Lake Mary, FL</span></div>
        <div className="sb-meta-row"><Icon name="linkedin" size={14} /><a href="https://www.linkedin.com/in/andy-freeman-architect/" target="_blank" rel="noopener">in/andy-freeman-architect</a></div>
        <div className="sb-meta-row"><Icon name="link" size={14} /><a href={PROFILE_GH} target="_blank" rel="noopener" style={{fontFamily: 'var(--font-mono)', fontSize: 12}}>github.com/tafreeman</a></div>
      </div>

      <div>
        <div className="sb-section-h">Languages across pinned repos</div>
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
              <span className="pct">{REPOS.filter(r => r.lang === l.name).length} repos</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sb-section-h">Status</div>
        <div className="now-card">
          <div className="label">Open to work</div>
          <div className="line"><span className="k">roles:</span> Principal / Staff AI eng · solutions arch</div>
          {/* Intentional prose — "forthcoming" conveys the planned release; count is derived below in ReadmeBanner */}
          <div className="line"><span className="k">repos:</span> public · one forthcoming</div>
        </div>
      </div>
    </aside>
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
          <a className="readme-action-btn" href={PROFILE_GH + "/tafreeman"} target="_blank" rel="noopener" title="Open repository"><Icon name="ext" size={13} /></a>
        </div>
      </div>

      <h1 className="readme-title">
        {/* Intentional prose — "forthcoming" conveys planned release cadence; numeric count rendered below */}
        <span className="accent">AI engineering systems</span> — public repos, one forthcoming.
      </h1>

      <p className="readme-sub">
        LLM execution primitives, multi-agent orchestration, deterministic business apps with AI interfaces, QA tooling, and architecture comms.
      </p>

      <div className="readme-stats">
        <div className="r-stat">
          {/* Derived at render time from REPOS — no bare integer that drifts on visibility changes */}
          <span className="v accent">{REPOS.filter(r => r.status !== 'PRIVATE').length}</span>
          <span className="l">Public repos (1 forthcoming)</span>
        </div>
        {/* last-verified: 2026-06-11 from architecture-deck-system@main (layouts registry) */}
        <div className="r-stat">
          <span className="v">39</span>
          <span className="l">Deck layouts · deck-system</span>
        </div>
        <div className="r-stat">
          <span className="v">8+</span>
          <span className="l">LLM providers routed</span>
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
        <h2>The systems</h2>
        <span className="right"><a href={PROFILE_GH + "?tab=repositories"} target="_blank" rel="noopener">All repositories →</a></span>
      </div>
      <div className="pinned-grid">
        {REPOS.map(r => <RepoCard key={r.id} r={r} />)}
      </div>
    </section>
  );
}

function RepoCard({ r }) {
  const inner = (
    <>
      <div className="repo-head">
        <div className="repo-mark">{r.title?.[0] || ""}</div>
        <div className="repo-head-text">
          <span className="repo-eyebrow">{r.eyebrow}</span>
          <p className="repo-name">{r.name}</p>
        </div>
        <span className="repo-pin"><Icon name="pin" size={14} /></span>
      </div>
      <p className="repo-desc">{r.desc}</p>
      <div className="repo-meta">
        <span className="item"><span className={`repo-lang-dot ${r.langClass}`}></span> {r.lang}</span>
        <span className={`status ${r.statusClass}`}>{r.status}</span>
      </div>
    </>
  );
  return r.url ? (
    <a className="repo-card" href={r.url} target="_blank" rel="noopener">{inner}</a>
  ) : (
    // data-private suppresses hover lift/glow (see styles.css .repo-card[data-private])
    // No aria-disabled — that attribute has no a11y effect on a generic div; the
    // PRIVATE badge in the card body is the visible status indicator.
    <div className="repo-card" data-private title="Private — public release planned">{inner}</div>
  );
}

// ===================================================================
// ARCHITECTURE MAP — how the six repos connect (real composition)
// ===================================================================
function ArchitectureMap() {
  return (
    <section className="map-card">
      <div className="map-card-head">
        <div>
          <span className="eyebrow">// Systems graph</span>
          <h3>How the repositories compose</h3>
          <p className="sub">Primitives flow upward into platforms; platforms emit telemetry into research and communication surfaces. Click any node to open it.</p>
        </div>
        <div className="legend">
          <span><span className="ld lp"></span> Platform</span>
          <span><span className="ld ll"></span> Library</span>
          <span><span className="ld lr"></span> Surface</span>
        </div>
      </div>

      <svg viewBox="0 0 1000 360" className="map-svg">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: "var(--accent)" }} />
          </marker>
        </defs>

        {/* Layer rails */}
        <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" style={{ fill: "var(--fg-3)" }} aria-hidden="true">
          <text x="20" y="60">L3 · COMMUNICATION + APPLIED</text>
          <line x1="20" y1="68" x2="980" y2="68" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="155">L2 · PLATFORM</text>
          <line x1="20" y1="163" x2="980" y2="163" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="250">L1 · PRIMITIVES</text>
          <line x1="20" y1="258" x2="980" y2="258" strokeDasharray="2 4" style={{ stroke: "var(--border)" }} />
          <text x="20" y="340">L0 · R&D</text>
        </g>

        {/* L3 — Communication / Applied */}
        <Node x={170} y={90} w={210} title="Architecture Deck System" sub="React · Storybook · export" kind="surface" href="https://tafreeman.github.io/architecture-deck-system/" />
        <Node x={420} y={90} w={210} title="Financial Scenario Engine" sub="TS · local-first · SQLite" kind="surface" href="https://tafreeman.github.io/financial-scenario-engine/" />
        <Node x={670} y={90} w={210} title="QA Automation Academy" sub="Playwright · Copilot · private" kind="surface" />

        {/* L2 — Platform */}
        <Node x={295} y={185} w={210} title="Agentic Runtime Platform" sub="DAG · routing · failover" kind="platform" featured href="https://tafreeman.github.io/agentic-runtime-platform/" />

        {/* L1 — Library */}
        <Node x={545} y={185} w={210} title="ExecutionKit" sub="consensus · ReAct · budget" kind="library" featured href="https://tafreeman.github.io/executionkit/" />

        {/* L0 — R&D */}
        <Node x={420} y={290} w={210} title="Agentic Systems Lab" sub="security · evals · prototypes" kind="lab" href="https://github.com/tafreeman/agentic-systems-lab" />

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

function Node({ x, y, w, title, sub, kind, featured, href }) {
  // Colors are design-system tokens (SVG attrs don't take var(), so apply
  // them via style). Featured layers (platform/library) carry the live accent.
  const colors = {
    platform: { fill: "var(--surface-2)",    stroke: "var(--accent)",   accent: "var(--accent)" },
    library:  { fill: "var(--surface-2)",    stroke: "var(--accent-2)", accent: "var(--accent-2)" },
    surface:  { fill: "var(--surface-deep)", stroke: "var(--border)",   accent: "var(--fg-3)" },
    lab:      { fill: "var(--surface-deep)", stroke: "var(--border)",   accent: "var(--fg-3)" },
  };
  const c = colors[kind];
  const h = 64;
  return (
    <a href={href} target="_blank" rel="noopener">
      <g transform={`translate(${x - w/2}, ${y - h/2})`}>
        <rect x="0" y="0" width={w} height={h} rx="10"
              style={{ fill: c.fill, stroke: c.stroke }} strokeWidth={featured ? 1.5 : 1} />
        <rect x="0" y="0" width="3" height={h} style={{ fill: c.accent }} />
        <text x="14" y="26" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" style={{ fill: "var(--fg-1)" }}>{title}</text>
        <text x="14" y="46" fontFamily="var(--font-mono)" fontSize="10" letterSpacing=".5" style={{ fill: "var(--fg-2)" }}>{sub}</text>
      </g>
    </a>
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
        </div>
      </main>
      <footer className="profile-footer">
        <span>© 2026 Andy Freeman · tafreeman</span>
        <span>tokens: <span style={{color: 'var(--accent)'}}>{tweaks.accent}</span> · mode: {tweaks.mode}</span>
      </footer>

      {SHOW_TWEAKS && window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Theme">
            <window.TweakRadio label="Mode" value={tweaks.mode}
              options={[{ value: "dark", label: "Dark" }, { value: "light", label: "Light" }]}
              onChange={v => setTweak('mode', v)} />
            <window.TweakSelect label="Accent" value={tweaks.accent}
              options={[
                { value: "ember",  label: "Ember" },
                { value: "indigo", label: "Indigo (Linear)" },
                { value: "cobalt", label: "Cobalt" },
                { value: "mint",   label: "Mint" },
              ]}
              onChange={v => setTweak('accent', v)} />
          </window.TweakSection>
          <window.TweakSection label="Sections">
            <window.TweakToggle label="Systems graph" value={tweaks.showMap} onChange={v => setTweak('showMap', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.ProfilePage = ProfilePage;
