/* tafreeman.github.io — portfolio landing
   Reuses content + the systems-graph / contribution-grid logic from the
   profile redesign, reframed as a real, deployable personal site. */

const REPOS = [
  { id: "agentic-runtime-platform", name: "agentic-runtime-platform", img: "social-previews/agentic-runtime-platform.png", tag: "FLAGSHIP" },
  { id: "executionkit",             name: "executionkit",             img: "social-previews/executionkit.png" },
  { id: "financial-scenario-engine",name: "financial-scenario-engine",img: "social-previews/financial-scenario-engine.png" },
  { id: "architecture-deck-system", name: "architecture-deck-system", img: "social-previews/architecture-deck-system.png" },
  { id: "qa-automation-academy",    name: "qa-automation-academy",    img: "social-previews/qa-automation-academy.png" },
  { id: "agentic-systems-lab",      name: "agentic-systems-lab",      img: "social-previews/agentic-systems-lab.png" },
];

const LANGS = [
  { name: "TypeScript", pct: 48, color: "#3178c6" },
  { name: "Python",     pct: 34, color: "#f7d046" },
  { name: "React",      pct: 12, color: "#61dafb" },
  { name: "Other",      pct:  6, color: "#545870" },
];

const GH = "https://github.com/tafreeman";

// --- deterministic contribution heat (53 weeks × 7 days) ---
function generateContribGrid() {
  const cells = [];
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let w = 0; w < 53; w++) {
    const col = [];
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

// --- lightweight inline icons ---
const Icon = ({ name, size = 14 }) => {
  const paths = {
    "git-commit": <><circle cx="12" cy="12" r="3"/><path d="M3 12h6m6 0h6"/></>,
    "arrow": <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    "mail": <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    "github": <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
    "deck": <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>,
    "map-pin": <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    "link": <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
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
          <a href="#signal">Signal</a>
          <a href="https://tafreeman.dev" className="ext">Decks</a>
        </div>
        <a className="nav-cta" href="mailto:a@tafreeman.dev">a@tafreeman.dev</a>
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
        <div className="hero-status">
          <span className="dot"></span>
          <span>Available · senior AI architecture · Q3 2026</span>
        </div>

        <h1 className="hero-h1">
          Production-grade <span className="accent glow-text">AI engineering</span> systems.
        </h1>

        <p className="hero-lede">
          Shipped with the discipline of platform infrastructure. Reusable LLM execution
          primitives, multi-agent orchestration, deterministic business apps with AI
          interfaces, QA enablement, and architecture comms.
        </p>

        <div className="hero-term">
          <span className="prompt">$</span> <span className="cmd">whoami</span> → tafreeman · Toronto, ON<span className="caret"></span>
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
          <div className="hs"><div className="v accent">6</div><div className="l">Production repos</div></div>
          <div className="hs"><div className="v">1.4k</div><div className="l">Commits · 12mo</div></div>
          <div className="hs"><div className="v">17</div><div className="l">Deck layouts</div></div>
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
          <h2>Six interconnected systems</h2>
          <p>Each repository is a production surface — primitives at the base, platforms in the middle, communication and applied tools on top.</p>
        </div>
        <div className="work-grid">
          {REPOS.map(r => (
            <a key={r.id} className="work-card" href={`${GH}/${r.id}`} target="_blank" rel="noopener">
              <img src={r.img} alt={r.name} loading="lazy" />
              <div className="work-foot">
                <span className="path">github.com/tafreeman/<b>{r.id}</b></span>
                {r.tag && <span className="tag">{r.tag}</span>}
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
          <h2>How the six repositories compose</h2>
          <p>Primitives flow upward into platforms; platforms emit telemetry into research and communication surfaces.</p>
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
          <svg viewBox="0 0 1000 360" className="map-svg" aria-hidden="true">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
              </marker>
            </defs>
            <g fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-3)" letterSpacing="1.5">
              <text x="20" y="60">L3 · COMMUNICATION</text>
              <line x1="20" y1="68" x2="980" y2="68" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="155">L2 · PLATFORM</text>
              <line x1="20" y1="163" x2="980" y2="163" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="250">L1 · PRIMITIVES</text>
              <line x1="20" y1="258" x2="980" y2="258" stroke="var(--border)" strokeDasharray="2 4" />
              <text x="20" y="340">L0 · R&amp;D</text>
            </g>
            <Node x={170} y={90} w={210} title="Architecture Deck System" sub="React · Storybook · PPTX" kind="surface" />
            <Node x={420} y={90} w={210} title="Financial Scenario Engine" sub="TS · local-first · Zod" kind="surface" />
            <Node x={670} y={90} w={210} title="QA Automation Academy" sub="Playwright · Copilot" kind="surface" />
            <Node x={295} y={185} w={210} title="Agentic Runtime Platform" sub="DAG · routing · failover" kind="platform" featured />
            <Node x={545} y={185} w={210} title="ExecutionKit" sub="consensus · ReAct · budget" kind="library" featured />
            <Node x={420} y={290} w={210} title="Agentic Systems Lab" sub="security · evals · prototypes" kind="lab" />
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

function Node({ x, y, w, title, sub, kind, featured }) {
  const stroke = kind === "platform" ? "var(--accent)" : kind === "library" ? "var(--accent-2)" : "var(--border)";
  const fill = (kind === "platform" || kind === "library") ? "var(--surface-2)" : "var(--surface-deep)";
  const accent = kind === "platform" ? "var(--accent)" : kind === "library" ? "var(--accent-2)" : "var(--fg-3)";
  const h = 64;
  return (
    <g transform={`translate(${x - w / 2}, ${y - h / 2})`}>
      <rect x="0" y="0" width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth={featured ? 1.5 : 1} />
      <rect x="0" y="0" width="3" height={h} fill={accent} />
      <text x="14" y="26" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="var(--fg-1)">{title}</text>
      <text x="14" y="46" fontFamily="var(--font-mono)" fontSize="10" fill="var(--fg-2)" letterSpacing=".5">{sub}</text>
    </g>
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
// COMMIT SIGNAL
// ===================================================================
function ContributionCard() {
  const [range, setRange] = React.useState("12mo");
  const grid = React.useMemo(() => generateContribGrid(), []);
  const totals = React.useMemo(() => {
    let t = 0, streak = 0, longest = 0, cur = 0;
    grid.forEach(col => col.forEach(c => {
      t += [0, 1, 3, 6, 12][c];
      if (c > 0) { cur += 1; if (cur > longest) longest = cur; } else cur = 0;
    }));
    for (let w = grid.length - 1; w >= 0; w--) {
      for (let d = 6; d >= 0; d--) {
        if (grid[w][d] > 0) streak += 1; else return { total: t, streak, longest };
      }
    }
    return { total: t, streak, longest };
  }, [grid]);

  return (
    <section className="section" id="signal">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// Signal</span>
          <h2>Commit signal</h2>
          <p>53 weeks of public and private contribution activity across the six systems.</p>
        </div>
        <div className="contrib-card">
          <div className="contrib-head">
            <div><h3>Activity heatmap</h3></div>
            <span className="sub">// trailing 53 weeks</span>
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
              <span style={{ gridRow: 2 }}>Mon</span>
              <span style={{ gridRow: 4 }}>Wed</span>
              <span style={{ gridRow: 6 }}>Fri</span>
            </div>
            <div className="contrib-grid">
              {grid.map((col, i) => (
                <div key={i} className="contrib-col">
                  {col.map((lvl, j) => (
                    <div key={j} className={`contrib-cell ${lvl ? `l${lvl}` : ""}`}
                         title={`Week ${i + 1}, day ${j + 1}: ${[0,1,3,6,12][lvl]} commits`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="contrib-footer">
            <span>Updated 12 min ago · <span style={{ color: "var(--accent)" }}>UTC-5</span></span>
            <span className="contrib-legend">
              Less
              <span className="scale">
                <span style={{ background: "var(--bg-deep)", border: "1px solid var(--border-soft)" }}></span>
                <span style={{ background: "color-mix(in srgb, var(--accent) 20%, transparent)" }}></span>
                <span style={{ background: "color-mix(in srgb, var(--accent) 42%, transparent)" }}></span>
                <span style={{ background: "color-mix(in srgb, var(--accent) 70%, transparent)" }}></span>
                <span style={{ background: "var(--accent)" }}></span>
              </span>
              More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===================================================================
// NOW + LANGS
// ===================================================================
function NowStrip() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">// Now</span>
          <h2>Current focus</h2>
        </div>
        <div className="now-strip">
          <div className="now-block">
            <div className="now-label">$ git log --since="14 days"</div>
            <div className="now-log">
              <div><span className="k">repo:</span> <span className="v accent">agentic-runtime-platform</span></div>
              <div><span className="k">branch:</span> <span className="v">feat/consensus-v2</span></div>
              <div><span className="k">focus:</span> <span className="v">tiered routing + provider failover</span></div>
              <div><span className="k">since:</span> <span className="v">14 days · 23 commits</span></div>
              <div><span className="k">status:</span> <span className="green">▲ available for senior engagements · Q3 2026</span></div>
            </div>
          </div>
          <div className="now-block lang-block">
            <div className="now-label">// Language mix · trailing 12mo</div>
            <div className="lang-bar">
              {LANGS.map(l => <span key={l.name} style={{ width: `${l.pct}%`, background: l.color }}></span>)}
            </div>
            <div className="lang-list">
              {LANGS.map(l => (
                <div key={l.name} className="row">
                  <span className="dot" style={{ background: l.color }}></span>
                  <span className="name">{l.name}</span>
                  <span className="pct">{l.pct}%</span>
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
        <h2>Available for senior AI<br />architecture engagements.</h2>
        <p>Reusable LLM primitives, multi-agent platforms, and the architecture comms to ship them. Currently booking Q3 2026.</p>
        <div className="contact-cta">
          <a className="btn primary" href="mailto:a@tafreeman.dev"><Icon name="mail" size={15} /> a@tafreeman.dev</a>
          <a className="btn ghost" href={GH} target="_blank" rel="noopener"><Icon name="github" size={15} /> github.com/tafreeman</a>
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
          <a href="https://tafreeman.dev" target="_blank" rel="noopener">Decks</a>
          <a href="mailto:a@tafreeman.dev">Email</a>
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
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {}];

  React.useEffect(() => {
    const root = document.documentElement;
    const palettes = {
      clay:   ["#d97757", "#e2906f", "#c05f3f", "rgba(217,119,87,0.22)", "rgba(217,119,87,0.10)", "#e8954a"],
      indigo: ["#5E6AD2", "#6E7BE5", "#4D58B8", "rgba(94,106,210,0.22)", "rgba(94,106,210,0.10)", "#8B7CE8"],
      cobalt: ["#2A6FDB", "#3C82EE", "#1F58B8", "rgba(42,111,219,0.22)", "rgba(42,111,219,0.10)", "#6CA0EE"],
      mint:   ["#1F8A5B", "#2BA471", "#16704A", "rgba(31,138,91,0.22)", "rgba(31,138,91,0.10)", "#65C4A0"],
    };
    const p = palettes[tweaks.accent] || palettes.clay;
    root.style.setProperty("--accent", p[0]);
    root.style.setProperty("--accent-hover", p[1]);
    root.style.setProperty("--accent-press", p[2]);
    root.style.setProperty("--accent-glow", p[3]);
    root.style.setProperty("--accent-soft", p[4]);
    root.style.setProperty("--accent-2", p[5]);
    root.style.setProperty("--gradient-brand", `linear-gradient(135deg, ${p[0]} 0%, ${p[5]} 100%)`);
    root.setAttribute("data-mode", tweaks.mode);
  }, [tweaks.accent, tweaks.mode]);

  return (
    <div className="site" data-screen-label="tafreeman.github.io">
      <SiteNav />
      <Hero />
      <Work />
      {tweaks.showSystems && <ArchitectureMap />}
      {tweaks.showSignal && <ContributionCard />}
      {tweaks.showNow && <NowStrip />}
      <Contact />
      <SiteFooter tweaks={tweaks} />

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Theme">
            <window.TweakRadio label="Mode" value={tweaks.mode}
              options={[{ value: "dark", label: "Console" }, { value: "light", label: "Paper" }]}
              onChange={v => setTweak("mode", v)} />
            <window.TweakSelect label="Accent" value={tweaks.accent}
              options={[
                { value: "clay",   label: "Clay / Ember (brand)" },
                { value: "indigo", label: "Indigo (Linear)" },
                { value: "cobalt", label: "Cobalt" },
                { value: "mint",   label: "Mint" },
              ]}
              onChange={v => setTweak("accent", v)} />
          </window.TweakSection>
          <window.TweakSection title="Sections">
            <window.TweakToggle label="Systems graph" value={tweaks.showSystems} onChange={v => setTweak("showSystems", v)} />
            <window.TweakToggle label="Commit signal" value={tweaks.showSignal} onChange={v => setTweak("showSignal", v)} />
            <window.TweakToggle label="Current focus" value={tweaks.showNow} onChange={v => setTweak("showNow", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.LandingPage = LandingPage;
