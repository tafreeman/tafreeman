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
const { REPOS } = window.PORTFOLIO;
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
  'groundkit': {
    eyebrow: 'RETRIEVAL', order: 4,
    arch: 'Splits and indexes your documents, then checks every citation it returns against the source file before handing it back.',
  },
};

// ---------------------------------------------------------------------
// CASE STUDIES — problem / contribution / tradeoff / measured result /
// reproducible link, for the three projects deep enough to support one.
// Every number below is sourced from a committed, reproducible artifact in
// the named repo (see the link) — none is invented, and each result states
// what it proves and what it does not. Rendered as a third SystemDetail tab
// only for the ids present here (see SystemDetail below).
// ---------------------------------------------------------------------
const CASE_STUDIES = {
  'agentic-runtime-platform': {
    // Short, period-free summary for ProofPoint (the numbers below contain
    // decimal points, so ProofPoint never derives its headline from `result`
    // by splitting on ".").
    headline: '2.25x throughput at 3 replicas · 200/200 exact under concurrent writes',
    problem: 'Running many LLM agents reliably takes more than a working demo — it needs visible provider failover, and proof that safety-critical shared state holds up under real concurrent load, not just in one process.',
    contribution: "Built the SmartModelRouter's three-state circuit breakers, the Redis compare-and-swap store that keeps breaker counts exact across replicas, and the local k6 + Docker Compose load harness that proves it.",
    tradeoff: 'A CAS write costs an extra round trip under contention versus a plain in-memory counter — the payoff is a shared circuit-breaker count that is provably exact instead of merely likely-correct.',
    result: 'At 3 replicas vs 1: throughput scaled 2.25x (250.74 → 565.37 req/s), p95 latency fell 120.53ms → 95.55ms. A separate 4-worker concurrent test recorded exactly 200/200 expected failures, 0 lost or double-counted. Proves horizontal scale-out and shared circuit-breaker consistency are real on the production save path. Does not prove an end-to-end path: the captured API load run did not itself reach the model client, so the CAS proof exercises the same production code directly rather than through the HTTP accept path — the report says so.',
    link: { href: 'https://tafreeman.github.io/agentic-runtime-platform/load-report/', label: 'ARP load report (live docs)' },
  },
  'agentic-evalkit': {
    headline: '48/48 cases graded end-to-end · noise floor stated, not hidden',
    problem: "LLM-as-judge grading is easy to overclaim: uncalibrated judges, runs compared without checking they're even comparable, and operational failures quietly counted as task failures.",
    contribution: 'Built the calibration-gated judge (TNR/TPR floors, Wilson lower bound), provenance-gated run comparison, and the typed harness-unavailable boundary that refuses to fake a benchmark verdict it cannot back.',
    tradeoff: 'Gating on calibration evidence means an uncalibrated judge can score a run but can never hard-gate a release — stricter validity in exchange for weaker default coverage until real human labels exist.',
    result: "A real 48-case eval of ARP's own reviewer agent: 48/48 executed, mean weighted score 0.9575 (95% CI 0.9431–0.9719). Six repeated runs of the identical suite ranged 0.9575–0.9709 — the published run had zero timeouts yet the lowest mean of the six, which the report itself flags as judge noise, not a quality change. Proves the pipeline runs end-to-end against a real target and reports its own noise floor; it does not prove the judge's absolute correctness — the report calls its scores 'indicative, not authoritative.'",
    link: { href: 'https://github.com/tafreeman/agentic-evalkit/blob/main/scripts/reports/2026-07-26-agent-workflow-eval/README.md', label: 'Full eval report (GitHub)' },
  },
  'financial-scenario-engine': {
    problem: 'Handing financial math to an LLM risks silent arithmetic errors and prompt injection that steers its output — a wrong number in a budget scenario is worse than a wrong sentence.',
    contribution: 'Split the system so the LLM only extracts structured intent (a Zod-validated schema) and every dollar calculation runs in deterministic TypeScript; built the intent-eval harness and its adversarial corpus to test injection resistance specifically.',
    tradeoff: 'The parser fails safe to a no-op read on any ambiguous or adversarial input rather than guessing — correct for safety, but it costs real accuracy on genuinely ambiguous, non-adversarial asks.',
    result: 'A committed 48-case corpus (18 adversarial/prompt-injection, 30 core) gates CI at ≥85% action accuracy. The scheduled run of 2026-09-06 (Actions run 34016868828) against nvidia/nemotron-3-ultra scored 44/48 = 91.7% overall and 29/30 = 96.7% excluding the adversarial subset. Proves the deterministic-math/LLM-intent split holds, and that the gate is real: the next day the identical commit scored 40/48 = 83.3% and failed the build, because four provider calls timed out and a timeout is deliberately counted as a miss. It does not prove a stable accuracy figure — CI enforces only the 85% floor, and the number moves with the model, the provider and the day.',
    link: { href: 'https://github.com/tafreeman/financial-scenario-engine/blob/main/server/evals/eval-config.ts', label: 'Eval config + accuracy floor (GitHub)' },
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
    <section style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'flex-end', overflow: 'hidden', background: 'var(--void, #000000)' }}>
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

// A concrete result, right after the hero and before anything else —
// the review finding this answers: "the large atmospheric hero delays
// concrete project evidence." Both figures are sourced in CASE_STUDIES
// above and link straight to the reproducible report they came from.
function ProofPoint() {
  const items = [
    { cs: CASE_STUDIES['agentic-runtime-platform'], name: 'ARP' },
    { cs: CASE_STUDIES['agentic-evalkit'], name: 'EvalKit' },
  ];
  return (
    <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-soft)', padding: 'var(--sp-md) var(--sp-xl)', display: 'flex', gap: 'var(--sp-xl)', flexWrap: 'wrap' }}>
      {items.map(({ cs, name }) => (
        <a key={name} href={cs.link.href} target="_blank" rel="noopener" style={{
          display: 'flex', alignItems: 'baseline', gap: 8, textDecoration: 'none',
          font: 'var(--fw-regular) 0.8125rem/1.4 var(--font-mono)', color: 'var(--fg-2)',
        }}>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{name} ↗</span>
          <span>{cs.headline}</span>
        </a>
      ))}
    </section>
  );
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
        Evaluation, agent coordination, reusable Python tools, citation-verified retrieval, and an
        applied financial product. Each project links to source code and docs where available.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'var(--sp-sm)' }}>
        {SYSTEMS.map((s) => <SystemTile key={s.id} s={s} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

// Shared link-button look for the reading-path entries below — matches the
// "all projects" back-link style already used in SystemDetail.
const pathLinkStyle = {
  appearance: 'none', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
  font: 'var(--fw-regular) 0.8125rem/1.4 var(--font-mono)', color: 'var(--accent)', textDecoration: 'none',
};

// Reviewer reading path + developer chooser — compact navigation aids so a
// visitor with a specific reason to be here (hiring review vs. "I need code
// for X") doesn't have to read every project to find the right one.
function ReadingPaths({ onOpen }) {
  const REVIEWER_PATH = [
    { id: 'agentic-runtime-platform', label: 'ARP', note: 'architecture' },
    { id: 'agentic-evalkit', label: 'EvalKit', note: 'evaluation judgment' },
    { id: 'financial-scenario-engine', label: 'FSE', note: 'an applied outcome' },
  ];
  const DEV_CHOOSER = [
    { need: 'Building agent workflows', id: 'agentic-runtime-platform', label: 'ARP' },
    { need: 'Model-call patterns', id: 'executionkit', label: 'ExecutionKit' },
    { need: 'Evaluations', id: 'agentic-evalkit', label: 'EvalKit' },
    { need: 'Document retrieval', id: 'groundkit', label: 'GroundKit' },
  ];
  const labelStyle = { font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' };
  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'var(--sp-lg) var(--sp-xl)', borderTop: '1px solid var(--border-soft)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'var(--sp-xl)' }}>
      <div>
        <div style={labelStyle}>REVIEWING FOR A ROLE</div>
        <p style={{ margin: '0 0 8px', color: 'var(--fg-2)', fontSize: 13 }}>
          Read in this order — architecture, then evaluation judgment, then an applied outcome:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          {REVIEWER_PATH.map((s, i) => (
            <React.Fragment key={s.id}>
              {i > 0 && <span style={{ color: 'var(--fg-2)' }}>→</span>}
              <button onClick={() => onOpen(s.id)} style={pathLinkStyle}>{s.label}</button>
            </React.Fragment>
          ))}
        </div>
        <p style={{ margin: '8px 0 0', color: 'var(--fg-2)', fontSize: 12 }}>
          GroundKit and ExecutionKit add focused implementation depth; Architecture Deck System
          (outside this hub) supports communication and frontend roles.
        </p>
      </div>
      <div>
        <div style={labelStyle}>LOOKING FOR CODE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {DEV_CHOOSER.map((d) => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
              <span style={{ color: 'var(--fg-2)' }}>{d.need}</span>
              <button onClick={() => onOpen(d.id)} style={pathLinkStyle}>{d.label} →</button>
            </div>
          ))}
        </div>
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

// Five labeled rows (problem, contribution, tradeoff, measured result,
// reproducible link) for the CASE_STUDIES entry of one system. Mirrors the
// label/description row pattern Stance already uses below, so a case study
// reads as part of the same design language rather than a bolted-on block.
function CaseStudyRows({ cs }) {
  const rows = [
    ['Problem', cs.problem],
    ['Contribution', cs.contribution],
    ['Tradeoff', cs.tradeoff],
    ['Measured result', cs.result],
  ];
  return (
    <div style={{ paddingTop: 'var(--sp-md)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-md)', maxWidth: '68ch' }}>
      {rows.map(([t, d]) => (
        <div key={t} style={{ display: 'flex', gap: 'var(--sp-sm)', borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--sp-sm)' }}>
          <span style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--warning)', width: 130, flex: 'none' }}>{t}</span>
          <span style={{ color: 'var(--fg-2)' }}>{d}</span>
        </div>
      ))}
      <a href={cs.link.href} target="_blank" rel="noopener" style={{ font: 'var(--fw-regular) 0.8125rem/1.4 var(--font-mono)', color: 'var(--accent)', textDecoration: 'none' }}>
        → Reproduce: {cs.link.label}
      </a>
    </div>
  );
}

// ===================================================================
// SYSTEM DETAIL — stats + Overview/Approach/Case study tabs + prev/next
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
          ...(CASE_STUDIES[s.id] ? [{
            label: 'Case study',
            content: <CaseStudyRows cs={CASE_STUDIES[s.id]} />,
          }] : []),
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
// EVIDENCE LINKS — replaces the old language-count bar. A repo-count ratio
// of Python vs. TypeScript told a visitor nothing about whether the work
// holds up; these four link straight to a committed, reproducible artifact
// instead (three overlap with CASE_STUDIES above; GroundKit's entry is
// honest about carrying no number, matching its README's own policy of
// never hardcoding a metric that could go stale).
// ===================================================================
function EvidenceLinks() {
  const items = [
    {
      id: 'agentic-runtime-platform',
      href: CASE_STUDIES['agentic-runtime-platform'].link.href,
      label: CASE_STUDIES['agentic-runtime-platform'].headline,
      sub: 'ARP load report — generated from committed k6 JSON, reproducible via load/run_load.sh',
    },
    {
      id: 'agentic-evalkit',
      href: CASE_STUDIES['agentic-evalkit'].link.href,
      label: CASE_STUDIES['agentic-evalkit'].headline,
      sub: "EvalKit's real agent-workflow eval report, reproducible against ARP's reviewer agent",
    },
    {
      id: 'financial-scenario-engine',
      href: CASE_STUDIES['financial-scenario-engine'].link.href,
      label: CASE_STUDIES['financial-scenario-engine'].headline,
      sub: 'FSE intent-parsing eval — gated nightly in CI, reproducible via npm run eval:intent',
    },
    {
      id: 'groundkit',
      href: 'https://github.com/tafreeman/groundkit#which-retrieval-mode-should-i-use',
      label: 'Hybrid retrieval beats a BM25 baseline on every metric — no number is hardcoded here by policy',
      sub: 'GroundKit eval harness — reproduce with uv run grk eval --dense',
    },
  ];
  return (
    <section style={{ background: 'var(--bg-deep)', padding: 'var(--sp-lg) var(--sp-xl)', borderTop: '1px solid var(--border-soft)' }}>
      <div style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)', marginBottom: 'var(--sp-sm)' }}>
        Evidence, not a language count
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--sp-md)' }}>
        {items.map((it) => (
          <a key={it.id} href={it.href} target="_blank" rel="noopener" style={{ display: 'block', textDecoration: 'none', borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--sp-sm)' }}>
            <div style={{ color: 'var(--fg-1)', fontSize: 13, lineHeight: 1.4 }}>{it.label}</div>
            <div style={{ color: 'var(--fg-2)', fontSize: 12, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{it.sub} ↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}

// Visible contact route — both links are already published on this same
// site (README.md, and the Header's GitHub button), never sourced from
// anywhere private.
function ContactBar() {
  const linkStyle = { font: 'var(--fw-regular) 0.8125rem/1.4 var(--font-mono)', color: 'var(--accent)', textDecoration: 'none' };
  return (
    <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border-soft)', padding: 'var(--sp-md) var(--sp-xl)', display: 'flex', gap: 'var(--sp-lg)', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ font: 'var(--fw-regular) 0.75rem/1.33333 var(--font-mono)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--fg-2)' }}>Contact</span>
      <a href="https://www.linkedin.com/in/andy-freeman-architect/" target="_blank" rel="noopener" style={linkStyle}>LinkedIn ↗</a>
      <a href={PROFILE_GH} target="_blank" rel="noopener" style={linkStyle}>GitHub ↗</a>
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
        <React.Fragment><Stance /><HorizonRule /><SystemsIndex onOpen={open} /><ReadingPaths onOpen={open} /><EvidenceLinks /></React.Fragment>
      ) : (
        <React.Fragment><Hero onNav={nav} /><ProofPoint /><HorizonRule /><SystemsIndex onOpen={open} /><ReadingPaths onOpen={open} /><Stance /><EvidenceLinks /></React.Fragment>
      )}
      <ContactBar />
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
