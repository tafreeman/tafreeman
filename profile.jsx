/* Console portfolio profile — Andy Freeman (tafreeman)
   Adopts the Console design language (console-ds/) using the same
   Header / Hero / HorizonRule / SystemsIndex / Stance / SystemDetail /
   Footer structure as ui_kits/console/screens.jsx, composed from the
   vendored design-system primitives in console-ds/_ds_bundle.js.

   REAL DATA ONLY. Every public project below is mapped 1:1 to a repo-data.jsx
   PORTFOLIO.REPOS entry (single source of truth, verified against the
   live GitHub account). Stats shown are only real values already present
   in repo-data.jsx (language, status); the kit's illustrative numbers
   (tests 312, p95 340ms, decks 14, …) are never shipped. */

const { Button, IconButton, Tile, Tag, Tabs, Tooltip } =
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

// Tier-colored tags remain available for the three established project types.
const TIER_TAG_COLOR = { l1: 'gray', l2: 'teal', l3: 'green' };

/* ---------------------------------------------------------------------
   PROJECTS — selected public work, ordered for a profile visitor.
   Name, URL, description, language, and status come from repo-data.jsx.
   --------------------------------------------------------------------- */
const SYSTEM_META = {
  'agentic-evalkit': {
    eyebrow: 'FEATURED · EVALUATION', order: 0,
    arch: 'Measures agent behavior, compares results, and records evidence of whether a change improved the system.',
  },
  'agentic-runtime-platform': {
    tier: 'l2', eyebrow: 'PLATFORM', order: 1,
    arch: 'Coordinates AI agents while keeping human approvals, safety checks, service choices, and issues visible to operators.',
  },
  'executionkit': {
    tier: 'l1', eyebrow: 'PYTHON LIBRARY', order: 2,
    arch: 'Offers reusable Python building blocks for comparing responses, improving drafts, using tools, returning structured data, and managing cost.',
  },
  'financial-scenario-engine': {
    tier: 'l3', eyebrow: 'APPLIED AI', order: 3,
    arch: 'Keeps financial calculations in tested application code while AI interprets requests and explains results.',
  },
};

const SYSTEMS = REPOS
  .map((r) => ({
    id: r.id,
    tier: SYSTEM_META[r.id]?.tier,
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
      tafreeman<span style={{ color: 'var(--accent)' }}>▊</span>
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
        {item('Projects', 'home', view === 'home' || view === 'detail')}
        {item('Approach', 'stance', view === 'stance')}
      </nav>
      <div className="profile-header-actions" style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
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
      <div style={{ position: 'relative', zIndex: 1, padding: 'var(--sp-2xl) var(--sp-xl) var(--sp-xl)', maxWidth: 900, width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase',
          color: 'var(--accent-hover)', marginBottom: 'var(--sp-sm)',
        }}>ANDY FREEMAN · @TAFREEMAN · AI ENGINEERING</div>
        <h1 className="profile-hero-title" style={{ font: '300 4.25rem/1.13 var(--font-display)', letterSpacing: 'var(--tracking-hero)', margin: 0, color: 'var(--fg-1)' }}>
          Building reliable<br />AI systems.
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.5, fontFamily: 'var(--font-display)', color: 'var(--fg-2)', maxWidth: 560, margin: 'var(--sp-md) 0 var(--sp-lg)' }}>
          I build software that uses AI with clear controls, practical testing,
          and alignment with real business needs.
        </p>
        <div style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
          <Button icon={<img src={`${IC}/arrow--right.svg`} alt="" />} onClick={() => onNav('detail', SYSTEMS[0].id)}>
            View public projects
          </Button>
          <Button variant="secondary" onClick={() => onNav('stance')}>How I work</Button>
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
    <Tile tier={s.tier} eyebrow={s.eyebrow} onClick={() => onOpen(s.id)} actionLabel={s.name}
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

function SystemsIndex({ onOpen }) {
  return (
    <section style={{ background: 'var(--bg)', padding: 'var(--sp-3xl) var(--sp-xl)' }}>
      <div className="profile-project-heading" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--sp-sm)' }}>
        <h2 style={{ font: '400 1.25rem/1.4 var(--font-display)', margin: 0 }}>Selected public work</h2>
        <span style={{ font: 'var(--fw-regular) 0.875rem/1.42857 var(--font-mono)', color: 'var(--fg-2)' }}>{SYSTEMS.length} public projects</span>
      </div>
      <p style={{ margin: '0 0 var(--sp-lg)', color: 'var(--fg-2)', maxWidth: '68ch' }}>
        Evaluation, agent coordination, reusable Python tools, and an applied financial product.
        Each project links to source code and docs where available.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--sp-sm)' }}>
        {SYSTEMS.map((s) => <SystemTile key={s.id} s={s} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function Stance() {
  return (
    <section className="profile-approach" style={{ background: 'var(--bg-deep)', padding: 'var(--sp-3xl) var(--sp-xl)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-xl)' }}>
      <div>
        <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' }}>HOW I WORK</div>
        <p style={{ font: 'italic 300 1.5rem/1.3 var(--font-serif)', color: 'var(--fg-1)', margin: 0, maxWidth: '26ch' }}>
          &ldquo;AI should make software more useful without making it harder to understand or control.&rdquo;
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)' }}>
        {[['Useful', 'Start with a real workflow, decision, or user need.'],
          ['Controlled', 'Make approvals, limits, costs, and failures visible.'],
          ['Tested', 'Keep core behavior repeatable and assess AI output using evidence.']].map(([t, d]) => (
          <div className="profile-approach-item" key={t} style={{ display: 'flex', gap: 'var(--sp-sm)', borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--sp-md)' }}>
            <span className="profile-approach-label" style={{ font: 'var(--fw-regular) 0.875rem/1.42857 var(--font-mono)', color: 'var(--warning)', width: 140, flex: 'none' }}>{t}</span>
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
          all projects
        </button>
        <div className="profile-detail-heading" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 'var(--sp-md)' }}>
          <div>
            <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: s.tier ? `var(--tier-${s.tier})` : 'var(--fg-2)', marginBottom: 'var(--sp-xs)' }}>{s.eyebrow}</div>
            <h1 style={{ font: '300 2.625rem/1.199 var(--font-display)', margin: 0 }}>{s.name}</h1>
          </div>
          <div className="profile-detail-actions" style={{ display: 'flex', gap: 'var(--sp-sm)' }}>
            {s.repo && (
              <Button variant="secondary" icon={<img src={`${IC}/launch.svg`} style={inv} alt="" />} href={s.repo}>
                View source
              </Button>
            )}
            {s.url && s.url !== s.repo && (
              <Button icon={<img src={`${IC}/play.svg`} alt="" />} href={s.url}>Open project</Button>
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
              </div>
            ),
          },
          {
            label: 'Approach',
            content: (
              <p style={{ margin: 0, paddingTop: 'var(--sp-md)', color: 'var(--fg-2)', maxWidth: '64ch' }}>
                {s.arch}
              </p>
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
// LANGUAGES STRIP — real language split across selected public projects
// ===================================================================
function LanguagesStrip() {
  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'var(--sp-lg) var(--sp-xl)', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' }}>
        Primary project languages
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
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>
              {REPOS.filter((r) => r.lang === l.name).length} {REPOS.filter((r) => r.lang === l.name).length === 1 ? 'project' : 'projects'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="profile-footer" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-soft)', padding: 'var(--sp-md) var(--sp-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Wordmark />
      <span style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', color: 'var(--fg-2)' }}>© {new Date().getFullYear()} Andy Freeman · public AI engineering portfolio</span>
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
    <div data-screen-label={view === 'detail' ? `Project detail — ${system && system.name}` : view === 'stance' ? 'Approach' : 'Home'}>
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
