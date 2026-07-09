/* Console portfolio profile — Andy Freeman (tafreeman)
   Adopts the Console design language (console-ds/) using the same
   Header / Hero / HorizonRule / SystemsIndex / Stance / SystemDetail /
   Footer structure as ui_kits/console/screens.jsx, composed from the
   vendored design-system primitives in console-ds/_ds_bundle.js.

   REAL DATA ONLY. Every system below is mapped 1:1 to a repo-data.jsx
   PORTFOLIO.REPOS entry (single source of truth, verified against the
   live GitHub account). Stats shown are only real values already present
   in repo-data.jsx (language, status); the kit's illustrative numbers
   (tests 312, p95 340ms, decks 14, …) are never shipped. */

const { Button, IconButton, Tile, Tag, Tabs, InlineNotification, Tooltip } =
  window.ConsoleDesignSystem_e08854;

// Repo + language data is the single source of truth in repo-data.jsx, which
// MUST be loaded (as <script src="repo-data.jsx">) BEFORE this file.
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

const IC = 'console-ds/assets/icons';
const inv = { filter: 'invert(96%)' };

// Tier-colored Tag palette matches Tile top-bar tiers (l1 gray / l2 teal / l3 green).
const TIER_TAG_COLOR = { l1: 'gray', l2: 'teal', l3: 'green' };

/* ---------------------------------------------------------------------
   SYSTEMS — the five real portfolio repos, mapped to Console's L1→L3
   tier table. Eyebrow/tier/blurb text is the FIXED canonical copy from
   the adoption spec; name/url/repo/lang are read live from PORTFOLIO so
   this list never drifts from repo-data.jsx.
   --------------------------------------------------------------------- */
// Two independent axes (see README "How they compose"): the RUNTIME axis
// composes upward L1 -> L2 -> L3; the VERIFICATION axis deliberately stands
// outside that call graph and proves the runtime work rather than joining
// it. `tier` is only set for runtime-axis systems — it drives the L1/L2/L3
// Tile color; verification systems render tier-less (neutral) on purpose,
// not "unranked by omission". `arch` is the per-system Architecture-tab
// claim: only text the repo actually supports — the three LLM-interface
// systems share the deterministic-core/LLM-boundary paragraph because the
// architecture diagram in README backs it for exactly those three; every
// other system gets its own true claim instead of that paragraph by default.
const ARCH_LLM_BOUNDARY = 'Deterministic, fully-tested core. The LLM sits at the interface boundary — parsing intent on the way in, narrating results on the way out — and never in the critical path.';

// architecture-deck-system was dropped from the portfolio (owner decision,
// 2026-07-09 — private repo, links would 404). It is intentionally absent
// from SYSTEM_META and repo-data.jsx; do not re-add without a new decision.
const SYSTEM_META = {
  'executionkit': { tier: 'l1', axis: 'runtime', eyebrow: 'L1 · PRIMITIVES', order: 0, arch: ARCH_LLM_BOUNDARY },
  'agentic-runtime-platform': { tier: 'l2', axis: 'runtime', eyebrow: 'L2 · PLATFORM', order: 1, arch: ARCH_LLM_BOUNDARY },
  'financial-scenario-engine': { tier: 'l3', axis: 'runtime', eyebrow: 'L3 · APPLIED', order: 2, arch: ARCH_LLM_BOUNDARY },
  'agentic-evalkit': {
    axis: 'verification', eyebrow: 'VERIFICATION · EVALUATION', order: 3,
    arch: "An evaluation toolkit, not a runtime. It reaches a system under test only through its ExecutionTarget protocol (callable, subprocess, or HTTP) — a contract test forbids importing the runtimes it evaluates, so it can never join their call graph.",
  },
  'qa-automation-academy': {
    axis: 'verification', eyebrow: 'VERIFICATION · ENABLEMENT', order: 4,
    arch: "A Playwright + GitHub Copilot training curriculum and practice app, not a runtime system. It builds the testing skills the runtime repos' CI gates assume, rather than sharing their architecture.",
  },
};

const SYSTEMS = REPOS
  .map((r) => ({
    id: r.id,
    tier: SYSTEM_META[r.id]?.tier,
    axis: SYSTEM_META[r.id]?.axis || 'runtime',
    eyebrow: SYSTEM_META[r.id]?.eyebrow || r.eyebrow,
    arch: SYSTEM_META[r.id]?.arch,
    name: r.title,
    blurb: r.desc,
    lang: r.lang,
    url: r.url,
    repo: r.repo,
    status: r.status,
  }))
  .sort((a, b) => (SYSTEM_META[a.id]?.order ?? 99) - (SYSTEM_META[b.id]?.order ?? 99));

// ===================================================================
// CHROME — wordmark + header
// ===================================================================
function Wordmark() {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} style={{
      font: '600 1rem/1 var(--font-mono)', color: 'var(--fg-1)',
      textDecoration: 'none', letterSpacing: '-0.3px', display: 'inline-flex',
    }}>
      console<span style={{ color: 'var(--accent)' }}>▊</span>
    </a>
  );
}

function Header({ view, onNav }) {
  const item = (label, target, active) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav(target); }} style={{
      font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
      color: active ? 'var(--fg-1)' : 'var(--fg-2)', textDecoration: 'none',
      padding: '0 var(--sp-sm)', height: 48, display: 'inline-flex', alignItems: 'center',
      boxShadow: active ? 'inset 0 -2px 0 var(--accent)' : 'none',
    }}>{label}</a>
  );
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40, height: 48,
      display: 'flex', alignItems: 'center', gap: 'var(--sp-md)',
      padding: '0 var(--sp-md)', background: 'rgba(0,0,0,0.85)',
      borderBottom: '1px solid var(--border-soft)',
    }}>
      <Wordmark />
      <nav style={{ display: 'flex', height: 48 }}>
        {item('Systems', 'home', view === 'home' || view === 'detail')}
        {item('Stance', 'stance', view === 'stance')}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
        <Tooltip text="github.com/tafreeman">
          <IconButton label="GitHub" onClick={() => window.open(PROFILE_GH, '_blank', 'noopener')}>
            <img src={`${IC}/launch.svg`} style={inv} alt="" />
          </IconButton>
        </Tooltip>
        <IconButton label="Search" onClick={() => window.open(PROFILE_GH + '?tab=repositories', '_blank', 'noopener')}>
          <img src={`${IC}/search.svg`} style={inv} alt="" />
        </IconButton>
      </div>
    </header>
  );
}

// ===================================================================
// HOME — cinematic hero, horizon rule, systems index, stance
// ===================================================================
function Hero({ onNav }) {
  return (
    <section style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
      <img src="console-ds/assets/hero-cinematic.jpg" alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)' }}></div>
      <div style={{ position: 'relative', zIndex: 1, padding: 'var(--sp-2xl) var(--sp-xl) var(--sp-xl)', maxWidth: 900 }}>
        <div style={{
          font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: 'var(--accent-hover)', marginBottom: 'var(--sp-sm)',
        }}>ANDY FREEMAN · @TAFREEMAN · AI ENGINEERING</div>
        <h1 style={{ font: '300 4.25rem/1.13 var(--font-display)', letterSpacing: 'var(--tracking-hero)', margin: 0, color: 'var(--fg-1)' }}>
          Deterministic core.<br />LLM at the boundary.
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.5, fontFamily: 'var(--font-display)', color: 'var(--fg-2)', maxWidth: 560, margin: 'var(--sp-md) 0 var(--sp-lg)' }}>
          Five systems, layered L1→L3 — from zero-dependency execution primitives to applied engines.
          Precise, typed, reproducible. Nothing decorative that isn't tokenized.
        </p>
        <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
          <Button icon={<img src={`${IC}/arrow--right.svg`} alt="" />} onClick={() => onNav('detail', SYSTEMS[0].id)}>
            Explore the systems
          </Button>
          <Button variant="secondary" onClick={() => onNav('stance')}>Read the stance</Button>
        </div>
      </div>
    </section>
  );
}

function HorizonRule() {
  return <div style={{ height: 1, background: 'var(--gradient-brand)', margin: '0 var(--sp-xl)' }}></div>;
}

function SystemTile({ s, onOpen }) {
  return (
    <Tile tier={s.tier} eyebrow={s.eyebrow} onClick={() => onOpen(s.id)}
          style={s.tier ? undefined : { borderTop: '3px solid var(--border)' }}>
      <h3 style={{ font: '400 1.25rem/1.4 var(--font-display)', margin: '0 0 var(--sp-xs)' }}>{s.name}</h3>
      <p style={{ margin: '0 0 var(--sp-sm)', color: 'var(--fg-2)' }}>{s.blurb}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Tag color={TIER_TAG_COLOR[s.tier]}>{s.lang.toLowerCase()}</Tag>
        {s.status && <Tag color={TIER_TAG_COLOR[s.tier]}>{s.status.toLowerCase()}</Tag>}
      </div>
    </Tile>
  );
}

function AxisLabel({ children }) {
  return (
    <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', margin: '0 0 var(--sp-sm)' }}>
      {children}
    </div>
  );
}

function SystemsIndex({ onOpen }) {
  // Two axes, not one list — see the ARCH_LLM_BOUNDARY comment above
  // SYSTEM_META. Filtering here (rather than a single flat grid) is what
  // makes the axis split visible on the page, not just in README prose.
  const runtime = SYSTEMS.filter((s) => s.axis === 'runtime');
  const verification = SYSTEMS.filter((s) => s.axis === 'verification');
  return (
    <section style={{ background: 'var(--bg)', padding: 'var(--sp-3xl) var(--sp-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-sm)' }}>
        <h2 style={{ font: '400 1.25rem/1.4 var(--font-display)', margin: 0 }}>Systems</h2>
        <span style={{ font: 'var(--fw-regular) 0.875rem/1.42857 var(--font-mono)', color: 'var(--fg-2)' }}>{runtime.length} runtime · {verification.length} verification · one language per repo</span>
      </div>
      <p style={{ margin: '0 0 var(--sp-lg)', color: 'var(--fg-2)', maxWidth: '68ch' }}>
        Two independent axes, not one list. Runtime composes upward — primitives into the platform,
        the platform into applied and communication systems. Verification never joins that call
        graph; it proves the runtime work from outside.
      </p>

      <AxisLabel>Runtime axis</AxisLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-sm)' }}>
        {runtime.map((s) => <SystemTile key={s.id} s={s} onOpen={onOpen} />)}
      </div>

      <div style={{ marginTop: 'var(--sp-xl)' }}>
        <AxisLabel>Verification axis</AxisLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--sp-sm)' }}>
          {verification.map((s) => <SystemTile key={s.id} s={s} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
}

function Stance() {
  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'var(--sp-3xl) var(--sp-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-xl)' }}>
      <div>
        <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' }}>THE STANCE</div>
        <p style={{ font: 'italic 300 1.5rem/1.3 var(--font-serif)', color: 'var(--fg-1)', margin: 0, maxWidth: '26ch' }}>
          &ldquo;The LLM sits at the interface boundary — never in the critical path.&rdquo;
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {[['Deterministic', 'Same input, same output. The core is pure and fully tested.'],
          ['Typed', 'Contracts everywhere — YAML schemas, TS types, Python protocols.'],
          ['Reproducible', 'Every run has a trace; every trace replays.']].map(([t, d]) => (
          <div key={t} style={{ display: 'flex', gap: 'var(--sp-sm)', borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--sp-md)' }}>
            <span style={{ font: 'var(--fw-regular) 0.875rem/1.42857 var(--font-mono)', color: 'var(--warning)', width: 140, flex: 'none' }}>{t}</span>
            <span style={{ color: 'var(--fg-2)' }}>{d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===================================================================
// SYSTEM DETAIL — stats + Overview/Architecture/Runs tabs + prev/next
// ===================================================================
function SystemDetail({ system, onBack, onOpen }) {
  const s = system;
  const idx = SYSTEMS.findIndex((x) => x.id === s.id);
  // Stats are real values already in repo-data.jsx (language, status) — no
  // fabricated test counts, latencies, or build times. Absent stats are
  // omitted rather than filled with the kit's placeholder numbers.
  const stats = [['language', s.lang], s.status ? ['status', s.status] : null].filter(Boolean);
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ padding: 'var(--sp-lg) var(--sp-xl) 0' }}>
        <button onClick={onBack} style={{
          appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: 0,
          font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', color: 'var(--accent)',
        }}>
          <img src={`${IC}/arrow--left.svg`} style={{ width: 14, height: 14, filter: 'invert(59%) sepia(75%) saturate(1500%) hue-rotate(177deg)' }} alt="" />
          all systems
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 'var(--sp-md)' }}>
          <div>
            <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: s.tier ? `var(--tier-${s.tier})` : 'var(--fg-2)', marginBottom: 'var(--sp-xs)' }}>{s.eyebrow}</div>
            <h1 style={{ font: '300 2.625rem/1.199 var(--font-display)', margin: 0 }}>{s.name}</h1>
          </div>
          <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
            {s.repo && (
              <Button variant="secondary" icon={<img src={`${IC}/launch.svg`} style={inv} alt="" />} href={s.repo}>
                View source
              </Button>
            )}
            {s.url ? (
              <Button icon={<img src={`${IC}/play.svg`} alt="" />} href={s.url}>Open live</Button>
            ) : (
              <Button variant="secondary" disabled>Private repo</Button>
            )}
          </div>
        </div>
        {stats.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--sp-xl)', margin: 'var(--sp-md) 0' }}>
            {stats.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ font: '400 2rem/1.25 var(--font-mono)', color: 'var(--fg-1)' }}>{v}</span>
                <span style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', color: 'var(--fg-2)' }}>{k}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: '0 var(--sp-xl) var(--sp-xl)' }}>
        <Tabs tabs={[
          {
            label: 'Overview',
            content: (
              <div style={{ paddingTop: 'var(--sp-md)' }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.5, fontFamily: 'var(--font-display)', color: 'var(--fg-2)', margin: '0 0 var(--sp-md)', maxWidth: '58ch' }}>{s.blurb}</p>
                {!s.url && !s.repo && (
                  <InlineNotification kind="info" title="Private repo" subtitle="Public release planned — no live links yet." iconBase={IC} />
                )}
              </div>
            ),
          },
          {
            label: 'Architecture',
            content: (
              <p style={{ margin: 0, paddingTop: 'var(--sp-md)', color: 'var(--fg-2)', maxWidth: '64ch' }}>
                {s.arch}
              </p>
            ),
          },
          {
            label: 'Runs',
            content: (
              <div style={{ paddingTop: 'var(--sp-md)' }}>
                <InlineNotification kind="info" title="No run telemetry published yet" subtitle="This repo does not expose a public runs feed — check the repo's own CI badge for current build status." iconBase={IC} />
              </div>
            ),
          },
        ]} />
      </div>
      <div style={{ borderTop: '1px solid var(--border-soft)', padding: 'var(--sp-sm) var(--sp-xl)', display: 'flex', justifyContent: 'space-between' }}>
        {idx > 0 ? (
          <Button variant="ghost" onClick={() => onOpen(SYSTEMS[idx - 1].id)}>← {SYSTEMS[idx - 1].name}</Button>
        ) : <span></span>}
        {idx < SYSTEMS.length - 1 ? (
          <Button variant="ghost" onClick={() => onOpen(SYSTEMS[idx + 1].id)}>{SYSTEMS[idx + 1].name} →</Button>
        ) : <span></span>}
      </div>
    </div>
  );
}

// ===================================================================
// LANGUAGES STRIP — real language split across the five pinned repos
// ===================================================================
function LanguagesStrip() {
  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'var(--sp-lg) var(--sp-xl)', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' }}>
        Languages across the systems
      </div>
      <div style={{ display: 'flex', height: 8, overflow: 'hidden', background: 'var(--bg)', border: '1px solid var(--border-soft)', marginBottom: 'var(--sp-sm)' }}>
        {LANGS.map((l) => (
          <span key={l.name} style={{ width: `${l.pct}%`, background: l.color, display: 'block' }}></span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 'var(--sp-lg)' }}>
        {LANGS.map((l) => (
          <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: l.color, display: 'inline-block' }}></span>
            <span style={{ color: 'var(--fg-1)' }}>{l.name}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{REPOS.filter((r) => r.lang === l.name).length} repos</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-soft)', padding: 'var(--sp-md) var(--sp-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Wordmark />
      <span style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', color: 'var(--fg-2)' }}>© 2026 Andy Freeman · built from tokens, not taste</span>
    </footer>
  );
}

// ===================================================================
// PAGE
// ===================================================================
function ProfilePage() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {}];
  const [view, setView] = React.useState('home');
  const [systemId, setSystemId] = React.useState(null);

  const open = (id) => { setSystemId(id); setView('detail'); window.scrollTo(0, 0); };
  const nav = (target, id) => {
    if (target === 'detail' && id) return open(id);
    setView(target === 'stance' ? 'stance' : 'home');
    window.scrollTo(0, 0);
  };
  const system = SYSTEMS.find((x) => x.id === systemId);

  React.useEffect(() => {
    // Console is a single fixed dark palette — no mode/accent switching. We
    // still set the two attributes so a lingering styleguide/tweaks toggle
    // resolves to the same tokens rather than an unstyled fallback.
    const root = document.documentElement;
    root.setAttribute('data-mode', 'dark');
    root.setAttribute('data-accent', 'console');
  }, []);

  return (
    <div data-screen-label={view === 'detail' ? `System detail — ${system && system.name}` : view === 'stance' ? 'Stance' : 'Home'}>
      <Header view={view} onNav={nav} />
      {view === 'detail' && system ? (
        <SystemDetail system={system} onBack={() => setView('home')} onOpen={open} />
      ) : view === 'stance' ? (
        <React.Fragment><Stance /><HorizonRule /><SystemsIndex onOpen={open} /><LanguagesStrip /></React.Fragment>
      ) : (
        <React.Fragment><Hero onNav={nav} /><HorizonRule /><SystemsIndex onOpen={open} /><Stance /><LanguagesStrip /></React.Fragment>
      )}
      <Footer />

      {SHOW_TWEAKS && window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Sections">
            <window.TweakToggle label="Languages strip" value={tweaks.showMap !== false} onChange={(v) => setTweak('showMap', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

window.ProfilePage = ProfilePage;
