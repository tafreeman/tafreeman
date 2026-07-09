/* =====================================================================
   Repo glyphs — horizon-cyan + cream line-art, viewBox 0 0 200 200.
   Drawn crisp (not sketchy) so they export sharp at any size and stay
   consistent across the set.
   ===================================================================== */

const C = "#33b1ff";       // horizon (primary accent)
const CB = "#82cfff";      // horizon-bright
const CR = "#f4f4f4";      // text-primary
const DM = "#6f6f6f";      // dim

// little reusable 4-point sparkle
function Spark({ x, y, s = 7, c = CB }) {
  return (
    <path d={`M${x} ${y - s} L${x + s * 0.28} ${y - s * 0.28} L${x + s} ${y} L${x + s * 0.28} ${y + s * 0.28} L${x} ${y + s} L${x - s * 0.28} ${y + s * 0.28} L${x - s} ${y} L${x - s * 0.28} ${y - s * 0.28} Z`} fill={c} />
  );
}

// 1 — BLACK HOLE · agentic-runtime-platform
function GlyphBlackHole() {
  return (
    <svg viewBox="0 0 200 200">
      <g transform="rotate(-22 100 100)">
        <ellipse cx="100" cy="100" rx="92" ry="30" fill="none" stroke={C} strokeWidth="3" opacity="0.30" />
        <ellipse cx="100" cy="100" rx="78" ry="25" fill="none" stroke={C} strokeWidth="4" opacity="0.55" />
        <ellipse cx="100" cy="100" rx="62" ry="19" fill="none" stroke={CB} strokeWidth="5" opacity="0.95" />
        <ellipse cx="100" cy="100" rx="46" ry="13" fill="none" stroke={CB} strokeWidth="3.5" opacity="0.7" />
      </g>
      <circle cx="100" cy="100" r="30" fill="#000000" />
      <circle cx="100" cy="100" r="30" fill="none" stroke={C} strokeWidth="3.5" />
      <circle cx="100" cy="100" r="30" fill="none" stroke={CB} strokeWidth="6" opacity="0.35" />
      <Spark x={168} y={48} s={6} />
      <Spark x={34} y={150} s={5} />
    </svg>
  );
}

// 2 — CUBE + ORBIT · executionkit
function GlyphCube() {
  return (
    <svg viewBox="0 0 200 200">
      <g transform="rotate(-16 100 100)">
        <ellipse cx="100" cy="104" rx="94" ry="34" fill="none" stroke={C} strokeWidth="3.5" strokeDasharray="2 9" opacity="0.8" />
      </g>
      {/* iso cube */}
      <g fill="none" stroke={CR} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M100 44 L150 72 L100 100 L50 72 Z" />
        <path d="M50 72 L50 128 L100 156 L100 100" />
        <path d="M150 72 L150 128 L100 156 L100 100" />
      </g>
      {/* play primitive on the front-left face */}
      <path d="M70 96 L70 122 L92 109 Z" fill={C} />
      {/* orbit node */}
      <circle cx="182" cy="88" r="7" fill={CB} stroke="#000000" strokeWidth="2" />
      <Spark x={28} y={150} s={5} />
    </svg>
  );
}

// 3 — FLASK · research / R&D glyph
function GlyphFlask() {
  return (
    <svg viewBox="0 0 200 200">
      <ellipse cx="100" cy="108" rx="86" ry="30" fill="none" stroke={C} strokeWidth="2.5" strokeDasharray="3 8" opacity="0.55" transform="rotate(-12 100 108)" />
      {/* flask body */}
      <path d="M86 38 L86 84 L48 150 a14 14 0 0 0 12 21 H140 a14 14 0 0 0 12 -21 L114 84 L114 38"
            fill="none" stroke={CR} strokeWidth="4.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M78 38 H122" stroke={CR} strokeWidth="4.5" strokeLinecap="round" />
      {/* liquid */}
      <path d="M70 118 q15 -10 30 0 t30 0 L150.5 150 a14 14 0 0 1 -12 21 H61.5 a14 14 0 0 1 -12 -21 Z"
            fill={C} opacity="0.9" />
      <circle cx="86" cy="150" r="5" fill={CB} />
      <circle cx="112" cy="158" r="4" fill={CB} />
      <circle cx="100" cy="138" r="3" fill={CR} opacity="0.9" />
      <Spark x={150} y={56} s={7} />
    </svg>
  );
}

// 4 — PLANET + CHART · financial-scenario-engine
function GlyphPlanetChart() {
  return (
    <svg viewBox="0 0 200 200">
      <circle cx="92" cy="100" r="50" fill="none" stroke={CR} strokeWidth="4.5" />
      <circle cx="74" cy="86" r="8" fill="none" stroke={CR} strokeWidth="2.5" opacity="0.6" />
      <circle cx="104" cy="120" r="5" fill="none" stroke={CR} strokeWidth="2.5" opacity="0.6" />
      <circle cx="110" cy="80" r="3.5" fill="none" stroke={CR} strokeWidth="2.5" opacity="0.5" />
      <ellipse cx="92" cy="100" rx="84" ry="26" fill="none" stroke={C} strokeWidth="4" transform="rotate(-22 92 100)" />
      {/* rising chart */}
      <polyline points="60,128 82,108 100,118 124,88 146,66" fill="none" stroke={CB} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M138 66 L150 62 L146 76 Z" fill={CB} />
      <circle cx="82" cy="108" r="4.5" fill="#000000" stroke={CB} strokeWidth="3" />
      <circle cx="124" cy="88" r="4.5" fill="#000000" stroke={CB} strokeWidth="3" />
      <Spark x={36} y={52} s={5} />
    </svg>
  );
}

// (removed) 5 — ECLIPSE + DECK · architecture-deck-system — the deck repo was
// dropped from the portfolio (owner decision, 2026-07-09), so its glyph is
// gone with it. Later glyph numbers are left unchanged for history continuity.

// 6 — ROCKET + CHECKLIST · qa-automation-academy
function GlyphRocketCheck() {
  return (
    <svg viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="84" fill="none" stroke={DM} strokeWidth="2.5" strokeDasharray="2 7" />
      {/* rocket */}
      <g transform="rotate(-12 78 100)">
        <path d="M78 36 C96 52 100 80 96 104 H60 C56 80 60 52 78 36 Z" fill="none" stroke={CR} strokeWidth="4.5" strokeLinejoin="round" />
        <circle cx="78" cy="74" r="9" fill="none" stroke={C} strokeWidth="4" />
        <path d="M60 92 L44 112 L60 104 Z" fill="none" stroke={CR} strokeWidth="4" strokeLinejoin="round" />
        <path d="M96 92 L112 112 L96 104 Z" fill="none" stroke={CR} strokeWidth="4" strokeLinejoin="round" />
        <path d="M70 104 L70 118 M78 104 L78 124 M86 104 L86 118" stroke={C} strokeWidth="4.5" strokeLinecap="round" />
      </g>
      {/* checklist */}
      <g stroke={C} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M128 78 l6 6 l11 -13" />
        <path d="M128 104 l6 6 l11 -13" />
        <path d="M128 130 l6 6 l11 -13" />
      </g>
      <g stroke={CR} strokeWidth="3.5" strokeLinecap="round" opacity="0.5">
        <line x1="150" y1="82" x2="170" y2="82" />
        <line x1="150" y1="108" x2="170" y2="108" />
        <line x1="150" y1="134" x2="168" y2="134" />
      </g>
    </svg>
  );
}

// 7 — ASTRONAUT + CAT · tafreeman (hub)
function GlyphAstroCat() {
  return (
    <svg viewBox="0 0 200 200">
      {/* star */}
      <Spark x={150} y={48} s={11} c={CB} />
      <Spark x={44} y={66} s={5} />
      <Spark x={176} y={104} s={4} />
      {/* moon ground */}
      <path d="M2 168 A150 150 0 0 1 198 168 L198 200 L2 200 Z" fill="#000000" stroke={DM} strokeWidth="3" />
      <ellipse cx="58" cy="170" rx="9" ry="4" fill="none" stroke={DM} strokeWidth="2" />
      <ellipse cx="150" cy="176" rx="7" ry="3" fill="none" stroke={DM} strokeWidth="2" />
      {/* astronaut — back view, seated */}
      <g fill="none" stroke={CR} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="74" cy="96" r="22" />
        <path d="M56 112 C50 132 52 150 56 164 L96 164 C98 150 98 130 92 112" />
        <rect x="66" y="120" width="16" height="26" rx="0" />
      </g>
      {/* cat — back view, seated, tail curl */}
      <g fill="#000000" stroke={CR} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M118 164 C112 144 120 122 134 122 C148 122 156 144 150 164 Z" />
        <path d="M122 128 L118 112 L130 122 Z" />
        <path d="M146 128 L150 112 L138 122 Z" />
        <path d="M150 158 C168 158 168 132 156 132" fill="none" />
      </g>
    </svg>
  );
}

const GLYPHS = {
  "black-hole": GlyphBlackHole,
  "cube": GlyphCube,
  "flask": GlyphFlask,
  "planet-chart": GlyphPlanetChart,
  "rocket-check": GlyphRocketCheck,
  "astro-cat": GlyphAstroCat,
};

function Glyph({ name }) {
  const G = GLYPHS[name] || GlyphBlackHole;
  return <G />;
}

window.Glyph = Glyph;
