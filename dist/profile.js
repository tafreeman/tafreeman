// GENERATED FILE — do not edit. Compiled from profile.jsx by
// scripts/build-js.mjs (npm run build:js). GitHub Pages serves what is
// committed, so this output is committed too; npm run verify:build fails if it
// drifts from its source.
//
// The IIFE is load-bearing. index.html loads this as a classic <script>, so
// every top-level binding would otherwise share ONE global lexical scope with
// repo-data.jsx and the sibling compiled file — where a duplicate name is a
// page-blanking SyntaxError, not a warning (repo-data.jsx's header documents
// the collision that was already dodged by hand). Wrapping makes the window
// assignments at the end of profile.jsx the file's entire contract.
(() => {
const { Button, IconButton, Tile, Tag, Tabs, Tooltip } = window.ConsoleDesignSystem_e08854;
const { REPOS, LANGS } = window.PORTFOLIO;
const PROFILE_GH = window.PORTFOLIO.GH;
const SHOW_TWEAKS = (() => {
  try {
    if (new URLSearchParams(location.search).has("tweaks")) return true;
    return /^(localhost|127\.0\.0\.1|\[?::1\]?)$/.test(location.hostname);
  } catch (e) {
    return false;
  }
})();
const IC = "console-ds/assets/icons";
const inv = { filter: "invert(96%)" };
const TIER_TAG_COLOR = { l1: "gray", l2: "teal", l3: "green" };
const SYSTEM_META = {
  "agentic-evalkit": {
    eyebrow: "FEATURED \xB7 EVALUATION",
    order: 0,
    arch: "Measures agent behavior, compares results, and records evidence of whether a change improved the system."
  },
  "agentic-runtime-platform": {
    tier: "l2",
    eyebrow: "PLATFORM",
    order: 1,
    arch: "Coordinates AI agents while keeping human approvals, safety checks, service choices, and issues visible to operators."
  },
  "executionkit": {
    tier: "l1",
    eyebrow: "PYTHON LIBRARY",
    order: 2,
    arch: "Offers reusable Python building blocks for comparing responses, improving drafts, using tools, returning structured data, and managing cost."
  },
  "financial-scenario-engine": {
    tier: "l3",
    eyebrow: "APPLIED AI",
    order: 3,
    arch: "Keeps financial calculations in tested application code while AI interprets requests and explains results."
  }
};
const SYSTEMS = REPOS.map((r) => ({
  id: r.id,
  tier: SYSTEM_META[r.id]?.tier,
  eyebrow: SYSTEM_META[r.id]?.eyebrow || r.eyebrow,
  arch: SYSTEM_META[r.id]?.arch,
  name: r.title,
  blurb: r.desc,
  lang: r.lang,
  url: r.url,
  repo: r.repo,
  status: r.status
})).sort((a, b) => (SYSTEM_META[a.id]?.order ?? 99) - (SYSTEM_META[b.id]?.order ?? 99));
function Wordmark() {
  return /* @__PURE__ */ React.createElement("a", { href: "#", onClick: (e) => e.preventDefault(), style: {
    font: "600 1rem/1 var(--font-mono)",
    color: "var(--fg-1)",
    textDecoration: "none",
    letterSpacing: "-0.3px",
    display: "inline-flex"
  } }, "tafreeman", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--accent)" } }, "\u258A"));
}
function Header({ view, onNav }) {
  const item = (label, target, active) => /* @__PURE__ */ React.createElement("a", { href: "#", onClick: (e) => {
    e.preventDefault();
    onNav(target);
  }, style: {
    font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: active ? "var(--fg-1)" : "var(--fg-2)",
    textDecoration: "none",
    padding: "0 var(--sp-sm)",
    height: 48,
    display: "inline-flex",
    alignItems: "center",
    boxShadow: active ? "inset 0 -2px 0 var(--accent)" : "none"
  } }, label);
  return /* @__PURE__ */ React.createElement("header", { style: {
    position: "sticky",
    top: 0,
    zIndex: 40,
    height: 48,
    display: "flex",
    alignItems: "center",
    gap: "var(--sp-md)",
    padding: "0 var(--sp-md)",
    background: "rgba(0,0,0,0.85)",
    borderBottom: "1px solid var(--border-soft)"
  } }, /* @__PURE__ */ React.createElement(Wordmark, null), /* @__PURE__ */ React.createElement("nav", { style: { display: "flex", height: 48 } }, item("Projects", "home", view === "home" || view === "detail"), item("Approach", "stance", view === "stance")), /* @__PURE__ */ React.createElement("div", { className: "profile-header-actions", style: { marginLeft: "auto", display: "flex", gap: 4 } }, /* @__PURE__ */ React.createElement(Tooltip, { text: "github.com/tafreeman" }, /* @__PURE__ */ React.createElement(IconButton, { label: "GitHub", onClick: () => window.open(PROFILE_GH, "_blank", "noopener") }, /* @__PURE__ */ React.createElement("img", { src: `${IC}/launch.svg`, style: inv, alt: "" }))), /* @__PURE__ */ React.createElement(IconButton, { label: "Search", onClick: () => window.open(PROFILE_GH + "?tab=repositories", "_blank", "noopener") }, /* @__PURE__ */ React.createElement("img", { src: `${IC}/search.svg`, style: inv, alt: "" }))));
}
function Hero({ onNav }) {
  return /* @__PURE__ */ React.createElement("section", { style: { position: "relative", minHeight: 520, display: "flex", alignItems: "flex-end", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: "console-ds/assets/hero-cinematic.jpg", alt: "", style: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 100%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1, padding: "var(--sp-2xl) var(--sp-xl) var(--sp-xl)", maxWidth: 900, width: "100%", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("div", { style: {
    font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)",
    letterSpacing: "var(--tracking-label)",
    textTransform: "uppercase",
    color: "var(--accent-hover)",
    marginBottom: "var(--sp-sm)"
  } }, "ANDY FREEMAN \xB7 @TAFREEMAN \xB7 AI ENGINEERING"), /* @__PURE__ */ React.createElement("h1", { className: "profile-hero-title", style: { font: "300 4.25rem/1.13 var(--font-display)", letterSpacing: "var(--tracking-hero)", margin: 0, color: "var(--fg-1)" } }, "Building reliable", /* @__PURE__ */ React.createElement("br", null), "AI systems."), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "1rem", lineHeight: 1.5, fontFamily: "var(--font-display)", color: "var(--fg-2)", maxWidth: 560, margin: "var(--sp-md) 0 var(--sp-lg)" } }, "I build software that uses AI with clear controls, practical testing, and alignment with real business needs."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "var(--sp-sm)" } }, /* @__PURE__ */ React.createElement(Button, { icon: /* @__PURE__ */ React.createElement("img", { src: `${IC}/arrow--right.svg`, alt: "" }), onClick: () => onNav("detail", SYSTEMS[0].id) }, "View public projects"), /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: () => onNav("stance") }, "How I work"))));
}
function HorizonRule() {
  return /* @__PURE__ */ React.createElement("div", { style: { height: 1, background: "var(--gradient-brand)", margin: "0 var(--sp-xl)" } });
}
function SystemTile({ s, onOpen }) {
  return /* @__PURE__ */ React.createElement(
    Tile,
    {
      tier: s.tier,
      eyebrow: s.eyebrow,
      onClick: () => onOpen(s.id),
      actionLabel: s.name,
      style: s.tier ? void 0 : { borderTop: "3px solid var(--border)" }
    },
    /* @__PURE__ */ React.createElement("h3", { style: { font: "400 1.25rem/1.4 var(--font-display)", margin: "0 0 var(--sp-xs)" } }, s.name),
    /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 var(--sp-sm)", color: "var(--fg-2)" } }, s.blurb),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(Tag, { color: TIER_TAG_COLOR[s.tier] }, s.lang.toLowerCase()), s.status && /* @__PURE__ */ React.createElement(Tag, { color: TIER_TAG_COLOR[s.tier] }, s.status.toLowerCase()))
  );
}
function SystemsIndex({ onOpen }) {
  return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--bg)", padding: "var(--sp-3xl) var(--sp-xl)" } }, /* @__PURE__ */ React.createElement("div", { className: "profile-project-heading", style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "var(--sp-sm)" } }, /* @__PURE__ */ React.createElement("h2", { style: { font: "400 1.25rem/1.4 var(--font-display)", margin: 0 } }, "Selected public work"), /* @__PURE__ */ React.createElement("span", { style: { font: "var(--fw-regular) 0.875rem/1.42857 var(--font-mono)", color: "var(--fg-2)" } }, SYSTEMS.length, " public projects")), /* @__PURE__ */ React.createElement("p", { style: { margin: "0 0 var(--sp-lg)", color: "var(--fg-2)", maxWidth: "68ch" } }, "Evaluation, agent coordination, reusable Python tools, and an applied financial product. Each project links to source code and docs where available."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "var(--sp-sm)" } }, SYSTEMS.map((s) => /* @__PURE__ */ React.createElement(SystemTile, { key: s.id, s, onOpen }))));
}
function Stance() {
  return /* @__PURE__ */ React.createElement("section", { className: "profile-approach", style: { background: "var(--bg-deep)", padding: "var(--sp-3xl) var(--sp-xl)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sp-xl)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: "var(--sp-sm)" } }, "HOW I WORK"), /* @__PURE__ */ React.createElement("p", { style: { font: "italic 300 1.5rem/1.3 var(--font-serif)", color: "var(--fg-1)", margin: 0, maxWidth: "26ch" } }, "\u201CAI should make software more useful without making it harder to understand or control.\u201D")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "var(--sp-md)" } }, [
    ["Useful", "Start with a real workflow, decision, or user need."],
    ["Controlled", "Make approvals, limits, costs, and failures visible."],
    ["Tested", "Keep core behavior repeatable and assess AI output using evidence."]
  ].map(([t, d]) => /* @__PURE__ */ React.createElement("div", { className: "profile-approach-item", key: t, style: { display: "flex", gap: "var(--sp-sm)", borderTop: "1px solid var(--border-soft)", paddingTop: "var(--sp-md)" } }, /* @__PURE__ */ React.createElement("span", { className: "profile-approach-label", style: { font: "var(--fw-regular) 0.875rem/1.42857 var(--font-mono)", color: "var(--warning)", width: 140, flex: "none" } }, t), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--fg-2)" } }, d)))));
}
function SystemDetail({ system, onBack, onOpen }) {
  const s = system;
  const idx = SYSTEMS.findIndex((x) => x.id === s.id);
  const stats = [["language", s.lang], s.status ? ["status", s.status] : null].filter(Boolean);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "100vh" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "var(--sp-lg) var(--sp-xl) 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: {
    appearance: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)",
    color: "var(--accent)"
  } }, /* @__PURE__ */ React.createElement("img", { src: `${IC}/arrow--left.svg`, style: { width: 14, height: 14, filter: "invert(59%) sepia(75%) saturate(1500%) hue-rotate(177deg)" }, alt: "" }), "all projects"), /* @__PURE__ */ React.createElement("div", { className: "profile-detail-heading", style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: "var(--sp-md)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: s.tier ? `var(--tier-${s.tier})` : "var(--fg-2)", marginBottom: "var(--sp-xs)" } }, s.eyebrow), /* @__PURE__ */ React.createElement("h1", { style: { font: "300 2.625rem/1.199 var(--font-display)", margin: 0 } }, s.name)), /* @__PURE__ */ React.createElement("div", { className: "profile-detail-actions", style: { display: "flex", gap: "var(--sp-sm)" } }, s.repo && /* @__PURE__ */ React.createElement(Button, { variant: "secondary", icon: /* @__PURE__ */ React.createElement("img", { src: `${IC}/launch.svg`, style: inv, alt: "" }), href: s.repo }, "View source"), s.url && s.url !== s.repo && /* @__PURE__ */ React.createElement(Button, { icon: /* @__PURE__ */ React.createElement("img", { src: `${IC}/play.svg`, alt: "" }), href: s.url }, "Open project"))), stats.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "var(--sp-xl)", margin: "var(--sp-md) 0" } }, stats.map(([k, v]) => /* @__PURE__ */ React.createElement("div", { key: k, style: { display: "flex", flexDirection: "column", gap: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { font: "400 2rem/1.25 var(--font-mono)", color: "var(--fg-1)" } }, v), /* @__PURE__ */ React.createElement("span", { style: { font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)", color: "var(--fg-2)" } }, k))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 var(--sp-xl) var(--sp-xl)" } }, /* @__PURE__ */ React.createElement(Tabs, { tabs: [
    {
      label: "Overview",
      content: /* @__PURE__ */ React.createElement("div", { style: { paddingTop: "var(--sp-md)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: "1rem", lineHeight: 1.5, fontFamily: "var(--font-display)", color: "var(--fg-2)", margin: "0 0 var(--sp-md)", maxWidth: "58ch" } }, s.blurb))
    },
    {
      label: "Approach",
      content: /* @__PURE__ */ React.createElement("p", { style: { margin: 0, paddingTop: "var(--sp-md)", color: "var(--fg-2)", maxWidth: "64ch" } }, s.arch)
    }
  ] })), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border-soft)", padding: "var(--sp-sm) var(--sp-xl)", display: "flex", justifyContent: "space-between" } }, idx > 0 ? /* @__PURE__ */ React.createElement(Button, { variant: "ghost", onClick: () => onOpen(SYSTEMS[idx - 1].id) }, "\u2190 ", SYSTEMS[idx - 1].name) : /* @__PURE__ */ React.createElement("span", null), idx < SYSTEMS.length - 1 ? /* @__PURE__ */ React.createElement(Button, { variant: "ghost", onClick: () => onOpen(SYSTEMS[idx + 1].id) }, SYSTEMS[idx + 1].name, " \u2192") : /* @__PURE__ */ React.createElement("span", null)));
}
function LanguagesStrip() {
  return /* @__PURE__ */ React.createElement("section", { style: { background: "var(--bg-deep)", padding: "var(--sp-lg) var(--sp-xl)", borderTop: "1px solid var(--border-soft)" } }, /* @__PURE__ */ React.createElement("div", { style: { font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: "var(--sp-sm)" } }, "Primary language of ", REPOS.length, " featured repos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", height: 8, overflow: "hidden", background: "var(--bg)", border: "1px solid var(--border-soft)", marginBottom: "var(--sp-sm)" } }, LANGS.map((l) => /* @__PURE__ */ React.createElement("span", { key: l.name, style: { width: `${l.pct}%`, background: l.color, display: "block" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "var(--sp-lg)" } }, LANGS.map((l) => /* @__PURE__ */ React.createElement("div", { key: l.name, style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: l.color, display: "inline-block" } }), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--fg-1)" } }, l.name), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", color: "var(--fg-2)" } }, REPOS.filter((r) => r.lang === l.name).length, " ", REPOS.filter((r) => r.lang === l.name).length === 1 ? "project" : "projects")))));
}
function Footer() {
  return /* @__PURE__ */ React.createElement("footer", { className: "profile-footer", style: { background: "var(--bg-deep)", borderTop: "1px solid var(--border-soft)", padding: "var(--sp-md) var(--sp-xl)", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(Wordmark, null), /* @__PURE__ */ React.createElement("span", { style: { font: "var(--fw-regular) 0.75rem/1.33333 var(--font-mono)", color: "var(--fg-2)" } }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Andy Freeman \xB7 public AI engineering portfolio"));
}
function ProfilePage() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [window.TWEAK_DEFAULTS, () => {
  }];
  const [view, setView] = React.useState("home");
  const [systemId, setSystemId] = React.useState(null);
  const open = (id) => {
    setSystemId(id);
    setView("detail");
    window.scrollTo(0, 0);
  };
  const nav = (target, id) => {
    if (target === "detail" && id) return open(id);
    setView(target === "stance" ? "stance" : "home");
    window.scrollTo(0, 0);
  };
  const system = SYSTEMS.find((x) => x.id === systemId);
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", "dark");
    root.setAttribute("data-accent", "console");
  }, []);
  return /* @__PURE__ */ React.createElement("div", { "data-screen-label": view === "detail" ? `Project detail \u2014 ${system && system.name}` : view === "stance" ? "Approach" : "Home" }, /* @__PURE__ */ React.createElement(Header, { view, onNav: nav }), view === "detail" && system ? /* @__PURE__ */ React.createElement(SystemDetail, { system, onBack: () => setView("home"), onOpen: open }) : view === "stance" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Stance, null), /* @__PURE__ */ React.createElement(HorizonRule, null), /* @__PURE__ */ React.createElement(SystemsIndex, { onOpen: open }), /* @__PURE__ */ React.createElement(LanguagesStrip, null)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Hero, { onNav: nav }), /* @__PURE__ */ React.createElement(HorizonRule, null), /* @__PURE__ */ React.createElement(SystemsIndex, { onOpen: open }), /* @__PURE__ */ React.createElement(Stance, null), /* @__PURE__ */ React.createElement(LanguagesStrip, null)), /* @__PURE__ */ React.createElement(Footer, null), SHOW_TWEAKS && window.TweaksPanel && /* @__PURE__ */ React.createElement(window.TweaksPanel, { title: "Tweaks" }, /* @__PURE__ */ React.createElement(window.TweakSection, { label: "Sections" }, /* @__PURE__ */ React.createElement(window.TweakToggle, { label: "Languages strip", value: tweaks.showMap !== false, onChange: (v) => setTweak("showMap", v) }))));
}
window.ProfilePage = ProfilePage;
})();
