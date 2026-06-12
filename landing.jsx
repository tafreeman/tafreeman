/* tafreeman.github.io — portfolio landing
   REAL DATA ONLY. Repos, languages, links, and contact are verified against
   the live GitHub account and each repo's README. No fabricated metrics
   (stars, commit counts, contribution heat) appear here. */

// Repo + language data is the single source of truth in repo-data.jsx, which
// MUST be loaded (as <script type="text/babel" src="repo-data.jsx">) BEFORE
// this file. landing.jsx only needs {id,name,img,url}; the richer objects work
const { GH, REPOS, LANGS, SHOW_TWEAKS } = window.PORTFOLIO || {};

const DECKS = "https://tafreeman.github.io/architecture-deck-system/";

// --- lightweight inline icons ---
const Icon = ({ name, size = 14 }) => {
  const paths = {
    "arrow": <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    "github": <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
    "linkedin": <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
};

// ===================================================================
// NAV
// ===================================================================
function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <a className="brand" href="#top">
          <span className="mark">af</span>
          <span className="b-text">
            <span className="b-name">Andy Freeman</span>
            <span className="b-handle">@tafreeman</span>
          </span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#systems">Systems</a>
          <a href="#now">Now</a>
          <a href={DECKS} className="ext" target="_blank" rel="noopener">Decks</a>
        </div>
        <a className="nav-cta" href={GH} target="_blank" rel="noopener">github.com/tafreeman</a>
      </div>
    </nav>
  );
}

// ===================================================================
// HERO
// ===================================================================
function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="grid"></div>
        <div className="glow"></div>
        <div className="glow two"></div>
      </div>
      <div className="wrap">
        <h1 className="hero-h1">
          <span className="accent glow-text">AI engineering</span> systems.
        </h1>

        <p className="hero-lede">
          Reusable LLM execution primitives, multi-agent orchestration,
          deterministic business apps with AI interfaces, QA enablement,
          and architecture comms.
        </p>

        <div className="hero-term">
          <span className="prompt">$</span> <span className="cmd">whoami</span> → tafreeman · Mobile, AL → Lake Mary, FL<span className="caret"></span>
        </div>

        <div className="hero-cta">
          <a className="btn primary" href="#work">
            Explore the systems <Icon name="arrow" size={15} />
          </a>
          <a className="btn ghost" href={GH} target="_blank" rel="noopener">
            <Icon name="github" size={15} /> <span className="mono">github.com/tafreeman</span>
          </a>
        </div>

        <div className="hero-stats">
          <div className="hs"><div className="v accent">6</div><div className="l">Interconnected repos</div></div>
          <div className="hs"><div className="v">34</div><div className="l">Deck layouts</div></div>
          <div className="hs"><div className="v">8+</div><div className="l">LLM providers routed</div></div>
          <div className="hs"><div className="v">DAG</div><div className="l">+ ReAct + Consensus</div></div>
        </div>
      </div>
    </header>
  );
}

// ===================================================================
// WORK — six repo social cards as imagery
// ===================================================================
function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// Pinned</span>
          <h2>The systems</h2>
          <p>Each repository is a production surface — primitives at the base, platforms in the middle, communication and applied tools on top.</p>
        </div>
        <div className="work-grid">
          {REPOS.map(r => (
            <a key={r.id} className="work-card" href={r.url} target="_blank" rel="noopener">
              <img src={r.img} alt={r.name} loading="lazy" />
              <div className="work-foot">
                <span className="path">github.com/tafreeman/<b>{r.id}</b></span>
                <span className="go"><Icon name="arrow" size={14} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// SYSTEMS GRAPH
// ===================================================================
function ArchitectureMap() {
  return (
    <section className="section" id="systems">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// Systems graph</span>
          <h2>How the repositories compose</h2>
          <p>Primitives flow upward into platforms; platforms emit telemetry into research and communication surfaces. Click any node to open it.</p>
        </div>
        <div className="map-card">
          <div className="map-card-head">
            <div>
              <span className="eyebrow">Layered dependency map</span>
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
                <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
              </marker>
            </defs>
            <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="1.5" aria-hidden="true">
              <text x="20" y="60">L3 · COMMUNICATION + APPLIED</text>
              <line x1="20" y1="68" x2="980" y2="68" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="155">L2 · PLATFORM</text>
              <line x1="20" y1="163" x2="980" y2="163" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="250">L1 · PRIMITIVES</text>
              <line x1="20" y1="258" x2="980" y2="258" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="340">L0 · R&amp;D</text>
            </g>
            <Node x={170} y={90} w={210} title="Architecture Deck System" sub="React · Storybook · export" kind="surface" href="https://tafreeman.github.io/architecture-deck-system/" />
            <Node x={420} y={90} w={210} title="Financial Scenario Engine" sub="TS · local-first · SQLite" kind="surface" href="https://tafreeman.github.io/financial-scenario-engine/" />
            <Node x={670} y={90} w={210} title="QA Automation Academy" sub="Playwright · Copilot · private" kind="surface" />
            <Node x={295} y={185} w={210} title="Agentic Runtime Platform" sub="DAG · routing · failover" kind="platform" featured href="https://tafreeman.github.io/agentic-runtime-platform/" />
            <Node x={545} y={185} w={210} title="ExecutionKit" sub="consensus · ReAct · budget" kind="library" featured href="https://tafreeman.github.io/executionkit/" />
            <Node x={420} y={290} w={210} title="Agentic Systems Lab" sub="security · evals · prototypes" kind="lab" href="https://github.com/tafreeman/agentic-systems-lab" />
            <Edge from={[400, 215]} to={[400, 122]} />
            <Edge from={[650, 215]} to={[400, 122]} />
            <Edge from={[650, 215]} to={[525, 122]} />
            <Edge from={[650, 215]} to={[775, 122]} />
            <Edge from={[400, 215]} to={[775, 122]} />
            <Edge from={[525, 290]} to={[400, 215]} />
            <Edge from={[525, 290]} to={[650, 215]} />
          </svg>
        </div>
      </div>
    </section>
  );
}

function Node({ x, y, w, title, sub, kind, featured, href }) {
  const stroke = kind === "platform" ? "var(--accent)" : kind === "library" ? "var(--accent-2)" : "var(--border)";
  const fill = (kind === "platform" || kind === "library") ? "var(--surface-2)" : "var(--surface-deep)";
  const accent = kind === "platform" ? "var(--accent)" : kind === "library" ? "var(--accent-2)" : "var(--fg-3)";
  const h = 64;
  return (
    <a href={href} target="_blank" rel="noopener">
      <g transform={`translate(${x - w / 2}, ${y - h / 2})`}>
        <rect x="0" y="0" width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth={featured ? 1.5 : 1} />
        <rect x="0" y="0" width="3" height={h} fill={accent} />
        <text x="14" y="26" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="var(--fg-1)">{title}</text>
        <text x="14" y="46" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)" letterSpacing=".5">{sub}</text>
      </g>
    </a>
  );
}

function Edge({ from, to }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mid = (y1 + y2) / 2;
  const d = `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
  return <path d={d} stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.2" fill="none" markerEnd="url(#arrow)" />;
}

// ===================================================================
// NOW + LANGS  (real availability + real language split; no fake activity)
// ===================================================================
function NowStrip() {
  return (
    <section className="section" id="now">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// Now</span>
          <h2>Current focus</h2>
        </div>
        <div className="now-strip">
          <div className="now-block">
            <div className="now-label">$ status</div>
            <div className="now-log">
              <div><span className="k">open to:</span> <span className="v accent">Principal / Staff AI eng · solutions arch</span></div>
              <div><span className="k">based:</span> <span className="v">Mobile, AL · Lake Mary, FL (Orlando metro)</span></div>
              <div><span className="k">building:</span> <span className="v">agentic runtimes · LLM execution primitives</span></div>
            </div>
          </div>
          <div className="now-block lang-block">
            <div className="now-label">// Primary languages · across the repos</div>
            <div className="lang-bar">
              {LANGS.map(l => <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }}></span>)}
            </div>
            <div className="lang-list">
              {LANGS.map(l => (
                <div key={l.name} className="row">
                  <span className="dot" style={{ background: l.color }}></span>
                  <span className="name">{l.name}</span>
                  <span className="pct">3 repos</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// CONTACT + FOOTER
// ===================================================================
function Contact() {
  return (
    <section className="contact">
      <div className="contact-glow" aria-hidden="true"></div>
      <div className="wrap">
        <span className="eyebrow">// Get in touch</span>
        <h2>Get in touch.</h2>
        <p>Open to Principal / Staff AI engineering and AI solutions-architecture roles.</p>
        <div className="contact-cta">
          <a className="btn primary" href={GH} target="_blank" rel="noopener"><Icon name="github" size={15} /> github.com/tafreeman</a>
          <a className="btn ghost" href="https://www.linkedin.com/in/andy-freeman-architect/" target="_blank" rel="noopener"><Icon name="linkedin" size={15} /> LinkedIn</a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter({ tweaks }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© 2026 Andy Freeman · tafreeman</span>
        <div className="foot-links">
          <a href={GH} target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/andy-freeman-architect/" target="_blank" rel="noopener">LinkedIn</a>
          <a href={DECKS} target="_blank" rel="noopener">Decks</a>
        </div>
        <span>{tweaks.mode} · {tweaks.accent}</span>
      </div>
    </footer>
  );
}

// ===================================================================
// PAGE
// ===================================================================
function LandingPage() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS || {}, () => {}];

  React.useEffect(() => {
    // Theme + accent live entirely in tokens.css. We only toggle the two
    // attributes the design system reads — no palette duplicated in JS.
    const root = document.documentElement;
    if (tweaks?.mode) {
      root.setAttribute("data-mode", tweaks.mode);
    }
    if (tweaks?.accent) {
      root.setAttribute("data-accent", tweaks.accent);
    }
  }, [tweaks?.accent, tweaks?.mode]);

  return (
    <div className="site" data-screen-label="tafreeman.github.io">
      <SiteNav />
      <Hero />
      <Work />
      {tweaks.showSystems && <ArchitectureMap />}
      {tweaks.showNow && <NowStrip />}
      <Contact />
      <SiteFooter tweaks={tweaks} />

      {SHOW_TWEAKS && window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Theme">
            <window.TweakRadio label="Mode" value={tweaks.mode}
              options={[{ value: "dark", label: "Console" }, { value: "light", label: "Paper" }]}
              onChange={v => setTweak("mode", v)} />
            <window.TweakSelect label="Accent" value={tweaks.accent}
              options={[
                { value: "ember",  label: "Ember (brand)" },
                { value: "indigo", label: "Indigo (Linear)" },
                { value: "cobalt", label: "Cobalt" },
                { value: "mint",   label: "Mint" },
              ]}
              onChange={v => setTweak("accent", v)} />
          </window.TweakSection>
          <window.TweakSection title="Sections">
            <window.TweakToggle label="Systems graph" value={tweaks.showSystems} onChange={v => setTweak("showSystems", v)} />
            <window.TweakToggle label="Current focus" value={tweaks.showNow} onChange={v => setTweak("showNow", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.LandingPage = LandingPage;
