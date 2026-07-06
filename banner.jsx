/* =====================================================================
   HeroBanner (profile README, 1280×400) + Avatar (org mark, 460×460)
   ===================================================================== */

function hbStars(seed, n) {
  let s = seed;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const out = [];
  for (let i = 0; i < n; i++) out.push({ left: 4 + rand() * 92, top: 8 + rand() * 84, size: rand() > 0.85 ? 2.5 : 1.5, op: 0.25 + rand() * 0.5 });
  return out;
}
const HBStars = ({ seed, n, cls }) => (
  <div className={cls}>
    {hbStars(seed, n).map((st, i) => (
      <span key={i} className="sc-star" style={{ position: "absolute", left: `${st.left}%`, top: `${st.top}%`, width: st.size, height: st.size, background: "#f4f4f4", borderRadius: "50%", opacity: st.op }} />
    ))}
  </div>
);

function HeroBanner({ mode = "vector", art }) {
  if (mode === "cine") {
    return (
      <div className="hb cine" data-screen-label="profile README hero · cinematic">
        <div className="hb-cine-bg" style={{ backgroundImage: `url(${art})` }} />
        <div className="hb-cine-scrim" />
        <div className="sc-titlebar">
          <div className="sc-tb-left">
            <span className="sc-tb-mark" />
            <span className="sc-tb-path">tafreeman&nbsp;/&nbsp;<b>tafreeman</b>&nbsp;/&nbsp;<span style={{ color: "var(--muted)" }}>README.md</span></span>
          </div>
          <div className="sc-tb-right"><span className="sc-tb-tag">~/portfolio</span></div>
        </div>
        <div className="hb-cine-body">
          <span className="hb-eyebrow">AI ENGINEERING · MOBILE, AL</span>
          <h1 className="hb-name">Andy <span className="accent">Freeman</span></h1>
          <p className="hb-handle"><span className="at">$</span> whoami → @tafreeman</p>
          <p className="hb-tagline">AI engineering systems — LLM primitives, multi-agent orchestration, deterministic apps.</p>
          <div className="hb-chips">
            <span className="hb-chip"><span className="cdot" />6 interconnected repos</span>
            <span className="hb-chip"><span className="cdot" style={{ background: "#3776ab" }} />Python</span>
            <span className="hb-chip"><span className="cdot" style={{ background: "#3178c6" }} />TypeScript</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="hb" data-screen-label="profile README hero">
      <HBStars seed={97} n={26} cls="sc-stars" />
      <div className="sc-titlebar">
        <div className="sc-tb-left">
          <span className="sc-tb-mark" />
          <span className="sc-tb-path">tafreeman&nbsp;/&nbsp;<b>tafreeman</b>&nbsp;/&nbsp;<span style={{ color: "var(--muted)" }}>README.md</span></span>
        </div>
        <div className="sc-tb-right"><span className="sc-tb-tag">~/portfolio</span></div>
      </div>

      <div className="hb-body">
        <div className="hb-left">
          <span className="hb-eyebrow">AI ENGINEERING · MOBILE, AL</span>
          <h1 className="hb-name">Andy <span className="accent">Freeman</span></h1>
          <p className="hb-handle"><span className="at">$</span> whoami → @tafreeman · he/him</p>
          <p className="hb-tagline">AI engineering systems — LLM primitives, multi-agent orchestration, deterministic apps.</p>
          <div className="hb-chips">
            <span className="hb-chip"><span className="cdot" />6 interconnected repos</span>
            <span className="hb-chip"><span className="cdot" style={{ background: "#3776ab" }} />Python</span>
            <span className="hb-chip"><span className="cdot" style={{ background: "#3178c6" }} />TypeScript</span>
          </div>
        </div>
        {art ? (
          <div className="hb-art">
            <span className="sc-tick tl" /><span className="sc-tick tr" />
            <span className="sc-tick bl" /><span className="sc-tick br" />
            <img src={art} alt="tafreeman" />
          </div>
        ) : (
          <div className="hb-glyph">
            <window.Glyph name="astro-cat" />
          </div>
        )}
      </div>
    </div>
  );
}

function Avatar({ kind = "monogram", img }) {
  if (kind === "art") {
    return (
      <div className="av av-art" data-screen-label="avatar · art">
        <img src={img} alt="tafreeman" />
      </div>
    );
  }
  return (
    <div className="av" data-screen-label={`avatar · ${kind}`}>
      <HBStars seed={kind.length * 41 + 5} n={16} cls="av-stars" />
      <span className="av-tick tl" /><span className="av-tick tr" />
      <span className="av-tick bl" /><span className="av-tick br" />
      {kind === "monogram" && (
        <div className="av-mono">
          <span className="av-mark" />
          <span className="av-letters"><span className="a">a</span><span className="f">f</span></span>
          <span className="av-prompt">tafreeman</span>
        </div>
      )}
      {kind === "blackhole" && <div className="av-glyph"><window.Glyph name="black-hole" /></div>}
      {kind === "astrocat" && <div className="av-glyph"><window.Glyph name="astro-cat" /></div>}
    </div>
  );
}

window.HeroBanner = HeroBanner;
window.Avatar = Avatar;
