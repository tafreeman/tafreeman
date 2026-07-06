/* @ds-bundle: {"format":4,"namespace":"ConsoleDesignSystem_e08854","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"CodeSnippet","sourcePath":"components/content/CodeSnippet.jsx"},{"name":"Tag","sourcePath":"components/content/Tag.jsx"},{"name":"Tile","sourcePath":"components/content/Tile.jsx"},{"name":"InlineNotification","sourcePath":"components/feedback/InlineNotification.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"140f6dfe4ed8","components/actions/IconButton.jsx":"4088deddee2e","components/content/CodeSnippet.jsx":"d1c2894df454","components/content/Tag.jsx":"ee0865e5b75d","components/content/Tile.jsx":"901dc5fa0ea1","components/feedback/InlineNotification.jsx":"494ef250529f","components/feedback/Modal.jsx":"1bdabbe6aff0","components/feedback/Tooltip.jsx":"12539d79a87d","components/forms/Checkbox.jsx":"9299147e323f","components/forms/RadioGroup.jsx":"296ea1cdee6f","components/forms/Select.jsx":"894203d1660f","components/forms/TextInput.jsx":"03851c476ef5","components/forms/Toggle.jsx":"e639cbb58b66","components/navigation/Tabs.jsx":"dbf1d5fd98af","ui_kits/arp/screens.jsx":"7c661e9bda30","ui_kits/arp/tweaks-panel.jsx":"6591467622ed","ui_kits/arp/workflow-builder.jsx":"3ed60ce7fdac","ui_kits/console/screens.jsx":"fb0a0be0dc0b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConsoleDesignSystem_e08854 = window.ConsoleDesignSystem_e08854 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
const css = `
.con-btn {
  appearance: none; border: 1px solid transparent; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: space-between;
  white-space: nowrap; flex: none;
  gap: var(--spacing-05); border-radius: var(--radius-0);
  font: var(--type-body-01); letter-spacing: var(--tracking-body);
  padding: 0 var(--spacing-05); text-decoration: none;
  transition: background-color var(--duration-fast-02) var(--ease-productive),
              border-color var(--duration-fast-02) var(--ease-productive),
              color var(--duration-fast-02) var(--ease-productive);
}
.con-btn:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-btn--sm { height: var(--size-sm); }
.con-btn--md { height: var(--size-md); }
.con-btn--lg { height: var(--size-lg); padding-right: var(--spacing-10); }
.con-btn--primary { background: var(--interactive); color: var(--text-on-color); }
.con-btn--primary:hover { background: var(--interactive-hover); }
.con-btn--primary:active { background: var(--interactive-active); }
.con-btn--secondary { background: transparent; color: var(--text-primary); border-color: var(--gray-10); }
.con-btn--secondary:hover { background: var(--gray-10); color: var(--text-inverse); }
.con-btn--ghost { background: transparent; color: var(--link-primary); }
.con-btn--ghost:hover { background: var(--background-hover); color: var(--link-primary-hover); }
.con-btn--danger { background: var(--support-error); color: var(--white); }
.con-btn--danger:hover { background: #ee0713; }
.con-btn[disabled], .con-btn--disabled {
  background: var(--gray-80); color: var(--text-disabled);
  border-color: transparent; cursor: not-allowed;
}
.con-btn__icon { width: 16px; height: 16px; flex: none; display: inline-flex; }
.con-btn__icon svg, .con-btn__icon img { width: 100%; height: 100%; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon = null,
  href,
  onClick,
  style
}) {
  useInjectedCss('con-btn-css', css);
  const cls = ['con-btn', `con-btn--${variant}`, `con-btn--${size}`, disabled ? 'con-btn--disabled' : ''].filter(Boolean).join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, children), icon ? /*#__PURE__*/React.createElement("span", {
    className: "con-btn__icon",
    "aria-hidden": "true"
  }, icon) : null);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", {
      className: cls,
      href: href,
      style: style
    }, inner);
  }
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    disabled: disabled,
    onClick: onClick,
    style: style,
    type: "button"
  }, inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
const css = `
.con-iconbtn {
  appearance: none; background: transparent; border: 1px solid transparent;
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
  color: var(--icon-primary); border-radius: var(--radius-0);
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-iconbtn:hover { background: var(--background-hover); }
.con-iconbtn:active { background: var(--background-active); }
.con-iconbtn:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-iconbtn--sm { width: var(--size-sm); height: var(--size-sm); }
.con-iconbtn--md { width: var(--size-md); height: var(--size-md); }
.con-iconbtn--lg { width: var(--size-lg); height: var(--size-lg); }
.con-iconbtn[disabled] { color: var(--icon-disabled); cursor: not-allowed; background: transparent; }
.con-iconbtn > * { width: 16px; height: 16px; }
.con-iconbtn--lg > * { width: 20px; height: 20px; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function IconButton({
  children,
  label,
  size = 'md',
  disabled = false,
  onClick,
  style
}) {
  useInjectedCss('con-iconbtn-css', css);
  return /*#__PURE__*/React.createElement("button", {
    className: `con-iconbtn con-iconbtn--${size}`,
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    style: style,
    type: "button"
  }, children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/content/CodeSnippet.jsx
try { (() => {
const css = `
.con-snippet { background: var(--layer-01); border: 1px solid var(--border-subtle-00); border-radius: var(--radius-0); position: relative; }
.con-snippet__bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--spacing-02) var(--spacing-02) var(--spacing-02) var(--spacing-05);
  border-bottom: 1px solid var(--border-subtle-00);
}
.con-snippet__title { font: var(--type-code-01); color: var(--text-helper); }
.con-snippet__copy {
  appearance: none; background: transparent; border: none; cursor: pointer;
  width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-snippet__copy:hover { background: var(--background-hover); }
.con-snippet__copy:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-snippet__copy img { width: 16px; height: 16px; filter: invert(96%); }
.con-snippet__copied { font: var(--type-code-01); color: var(--support-success); margin-right: var(--spacing-03); }
.con-snippet pre { margin: 0; padding: var(--spacing-05); font: var(--type-code-02); color: var(--text-primary); overflow-x: auto; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function CodeSnippet({
  children,
  code,
  title,
  copyIconSrc,
  style
}) {
  useInjectedCss('con-snippet-css', css);
  const [copied, setCopied] = React.useState(false);
  const text = code !== undefined ? code : typeof children === 'string' ? children : '';
  const copy = () => {
    if (navigator.clipboard && text) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "con-snippet",
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "con-snippet__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "con-snippet__title"
  }, title || 'snippet'), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, copied ? /*#__PURE__*/React.createElement("span", {
    className: "con-snippet__copied"
  }, "copied") : null, /*#__PURE__*/React.createElement("button", {
    className: "con-snippet__copy",
    onClick: copy,
    "aria-label": "Copy code",
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: copyIconSrc || 'assets/icons/copy.svg',
    alt: ""
  })))), /*#__PURE__*/React.createElement("pre", null, children || code));
}
Object.assign(__ds_scope, { CodeSnippet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CodeSnippet.jsx", error: String((e && e.message) || e) }); }

// components/content/Tag.jsx
try { (() => {
const css = `
.con-tag {
  display: inline-flex; align-items: center; gap: var(--spacing-02);
  height: 20px; padding: 0 var(--spacing-03);
  font: var(--type-code-01); letter-spacing: 0.32px;
  border-radius: var(--radius-full); white-space: nowrap;
}
.con-tag--gray { background: var(--gray-80); color: var(--gray-20); }
.con-tag--horizon { background: #012749; color: #82cfff; }
.con-tag--teal { background: #022b30; color: #3ddbd9; }
.con-tag--green { background: #022d0d; color: #6fdc8c; }
.con-tag--red { background: #520408; color: var(--red-40); }
.con-tag--yellow { background: #302400; color: var(--yellow-30); }
.con-tag--blue { background: #001d6c; color: var(--blue-40); }
.con-tag--outline { background: transparent; border: 1px solid var(--border-strong-01); color: var(--text-secondary); }
.con-tag__dot { width: 6px; height: 6px; border-radius: var(--radius-full); background: currentColor; flex: none; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Tag({
  children,
  color = 'gray',
  dot = false,
  style
}) {
  useInjectedCss('con-tag-css', css);
  return /*#__PURE__*/React.createElement("span", {
    className: `con-tag con-tag--${color}`,
    style: style
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: "con-tag__dot",
    "aria-hidden": "true"
  }) : null, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/Tile.jsx
try { (() => {
const css = `
.con-tile {
  background: var(--layer-01); border: 1px solid var(--border-subtle-00);
  border-radius: var(--radius-0); padding: var(--spacing-05);
  color: var(--text-primary); display: block; text-decoration: none;
  transition: background-color var(--duration-fast-02) var(--ease-productive),
              border-color var(--duration-fast-02) var(--ease-productive);
}
a.con-tile:hover, .con-tile--clickable:hover { background: var(--layer-hover-01); text-decoration: none; color: var(--text-primary); cursor: pointer; }
.con-tile--selected { border-left: 3px solid var(--horizon-40); padding-left: calc(var(--spacing-05) - 2px); }
.con-tile--tier-l1 { border-top: 3px solid var(--tier-l1); }
.con-tile--tier-l2 { border-top: 3px solid var(--tier-l2); }
.con-tile--tier-l3 { border-top: 3px solid var(--tier-l3); }
.con-tile__eyebrow {
  font: var(--type-label-01); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-helper); display: block;
  margin-bottom: var(--spacing-03);
}
.con-tile--tier-l1 .con-tile__eyebrow { color: var(--tier-l1); }
.con-tile--tier-l2 .con-tile__eyebrow { color: var(--tier-l2); }
.con-tile--tier-l3 .con-tile__eyebrow { color: var(--tier-l3); }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Tile({
  children,
  eyebrow,
  tier,
  selected = false,
  href,
  onClick,
  style
}) {
  useInjectedCss('con-tile-css', css);
  const cls = ['con-tile', tier ? `con-tile--tier-${tier}` : '', selected ? 'con-tile--selected' : '', onClick ? 'con-tile--clickable' : ''].filter(Boolean).join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "con-tile__eyebrow"
  }, eyebrow) : null, children);
  if (href) return /*#__PURE__*/React.createElement("a", {
    className: cls,
    href: href,
    style: style
  }, inner);
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    onClick: onClick,
    style: style
  }, inner);
}
Object.assign(__ds_scope, { Tile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/InlineNotification.jsx
try { (() => {
const css = `
.con-note {
  display: flex; align-items: flex-start; gap: var(--spacing-04);
  background: var(--layer-01); border: 1px solid var(--border-subtle-00);
  border-left: 3px solid var(--gray-40); padding: var(--spacing-04) var(--spacing-05);
  font: var(--type-body-01); color: var(--text-primary);
}
.con-note--error { border-left-color: var(--support-error); }
.con-note--success { border-left-color: var(--support-success); }
.con-note--warning { border-left-color: var(--support-warning); }
.con-note--info { border-left-color: var(--support-info); }
.con-note__icon { width: 16px; height: 16px; flex: none; margin-top: 2px; }
.con-note--error .con-note__icon { filter: invert(58%) sepia(52%) saturate(2878%) hue-rotate(325deg); }
.con-note__body { display: flex; flex-direction: column; gap: 2px; }
.con-note__title { font-weight: var(--fw-semibold); }
.con-note__sub { color: var(--text-secondary); }
.con-note__close {
  appearance: none; background: transparent; border: none; cursor: pointer;
  width: 32px; height: 32px; margin: -6px -8px 0 auto; flex: none;
  display: inline-flex; align-items: center; justify-content: center;
}
.con-note__close:hover { background: var(--background-hover); }
.con-note__close img { width: 16px; height: 16px; filter: invert(96%); }
`;
const glyphs = {
  error: 'error--filled.svg',
  success: 'checkmark--filled.svg',
  warning: 'warning--filled.svg',
  info: 'information.svg'
};
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function InlineNotification({
  kind = 'info',
  title,
  subtitle,
  iconBase = 'assets/icons',
  onClose,
  style
}) {
  useInjectedCss('con-note-css', css);
  return /*#__PURE__*/React.createElement("div", {
    className: `con-note con-note--${kind}`,
    role: "status",
    style: style
  }, /*#__PURE__*/React.createElement("img", {
    className: "con-note__icon",
    src: `${iconBase}/${glyphs[kind] || glyphs.info}`,
    alt: "",
    style: {
      filter: 'invert(96%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "con-note__body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "con-note__title"
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    className: "con-note__sub"
  }, subtitle) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    className: "con-note__close",
    "aria-label": "Dismiss",
    onClick: onClose,
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${iconBase}/close.svg`,
    alt: ""
  })) : null);
}
Object.assign(__ds_scope, { InlineNotification });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/InlineNotification.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
const css = `
.con-modal__overlay {
  position: fixed; inset: 0; background: var(--overlay); z-index: 100;
  display: flex; align-items: center; justify-content: center;
  animation: con-modal-fade var(--duration-moderate-02) var(--ease-productive-entrance);
}
.con-modal__overlay--inline { position: absolute; }
@keyframes con-modal-fade { from { opacity: 0; } }
.con-modal {
  background: var(--layer-01); border: 1px solid var(--border-subtle-00);
  box-shadow: var(--shadow-overlay); border-radius: var(--radius-0);
  width: min(560px, calc(100% - 64px)); max-height: 84%; display: flex; flex-direction: column;
}
.con-modal__head { display: flex; align-items: flex-start; justify-content: space-between; padding: var(--spacing-05) var(--spacing-05) 0; }
.con-modal__label { font: var(--type-label-01); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-helper); display: block; margin-bottom: var(--spacing-02); }
.con-modal__title { font: var(--type-heading-03); color: var(--text-primary); margin: 0; }
.con-modal__close {
  appearance: none; background: transparent; border: none; cursor: pointer;
  width: 40px; height: 40px; margin: -8px -8px 0 0; flex: none;
  display: inline-flex; align-items: center; justify-content: center;
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-modal__close:hover { background: var(--background-hover); }
.con-modal__close img { width: 16px; height: 16px; filter: invert(96%); }
.con-modal__body { padding: var(--spacing-05); color: var(--text-secondary); font: var(--type-body-01); overflow-y: auto; }
.con-modal__actions { display: flex; justify-content: flex-end; }
.con-modal__actions > * { flex: 1; max-width: 50%; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Modal({
  open = false,
  label,
  title,
  children,
  actions,
  inline = false,
  closeIconSrc,
  onClose
}) {
  useInjectedCss('con-modal-css', css);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: `con-modal__overlay${inline ? ' con-modal__overlay--inline' : ''}`,
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "con-modal",
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "con-modal__head"
  }, /*#__PURE__*/React.createElement("div", null, label ? /*#__PURE__*/React.createElement("span", {
    className: "con-modal__label"
  }, label) : null, /*#__PURE__*/React.createElement("h2", {
    className: "con-modal__title"
  }, title)), /*#__PURE__*/React.createElement("button", {
    className: "con-modal__close",
    "aria-label": "Close",
    onClick: onClose,
    type: "button"
  }, /*#__PURE__*/React.createElement("img", {
    src: closeIconSrc || 'assets/icons/close.svg',
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "con-modal__body"
  }, children), actions ? /*#__PURE__*/React.createElement("div", {
    className: "con-modal__actions"
  }, actions) : null));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
const css = `
.con-tip { position: relative; display: inline-flex; }
.con-tip__bubble {
  position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  background: var(--gray-10); color: var(--text-inverse);
  font: var(--type-code-01); padding: var(--spacing-02) var(--spacing-04);
  white-space: nowrap; z-index: 50; pointer-events: none;
  opacity: 0; transition: opacity var(--duration-moderate-01) var(--ease-productive);
}
.con-tip__bubble::after {
  content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
  border: 5px solid transparent; border-top-color: var(--gray-10);
}
.con-tip:hover .con-tip__bubble, .con-tip:focus-within .con-tip__bubble { opacity: 1; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Tooltip({
  children,
  text,
  style
}) {
  useInjectedCss('con-tip-css', css);
  return /*#__PURE__*/React.createElement("span", {
    className: "con-tip",
    style: style
  }, children, /*#__PURE__*/React.createElement("span", {
    className: "con-tip__bubble",
    role: "tooltip"
  }, text));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
const css = `
.con-check { display: inline-flex; align-items: center; gap: var(--spacing-03); cursor: pointer; font: var(--type-body-01); color: var(--text-primary); }
.con-check__box {
  width: 16px; height: 16px; flex: none; border: 1px solid var(--icon-primary);
  border-radius: var(--radius-0); display: inline-flex; align-items: center; justify-content: center;
  transition: background-color var(--duration-fast-02) var(--ease-productive);
  background: transparent;
}
.con-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.con-check--checked .con-check__box { background: var(--gray-10); border-color: var(--gray-10); }
.con-check__mark { width: 12px; height: 12px; display: none; }
.con-check--checked .con-check__mark { display: block; }
.con-check--disabled { color: var(--text-disabled); cursor: not-allowed; }
.con-check--disabled .con-check__box { border-color: var(--icon-disabled); background: transparent; }
.con-check input:focus-visible + .con-check__box { outline: 2px solid var(--focus); outline-offset: 1px; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Checkbox({
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  style
}) {
  useInjectedCss('con-check-css', css);
  const [internal, setInternal] = React.useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internal;
  const cls = ['con-check', isChecked ? 'con-check--checked' : '', disabled ? 'con-check--disabled' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: isChecked,
    disabled: disabled,
    onChange: e => {
      if (checked === undefined) setInternal(e.target.checked);
      if (onChange) onChange(e.target.checked);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "con-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "con-check__mark",
    viewBox: "0 0 32 32",
    fill: "#161616"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13 24L4 15l1.414-1.414L13 21.171 26.586 7.586 28 9 13 24z"
  }))), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
const css = `
.con-radiogroup { display: flex; flex-direction: column; gap: var(--spacing-03); }
.con-radiogroup__legend {
  font: var(--type-label-01); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-secondary); margin-bottom: var(--spacing-02);
}
.con-radio { display: inline-flex; align-items: center; gap: var(--spacing-03); cursor: pointer; font: var(--type-body-01); color: var(--text-primary); }
.con-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.con-radio__dot {
  width: 16px; height: 16px; flex: none; border: 1px solid var(--icon-primary);
  border-radius: var(--radius-full); display: inline-flex; align-items: center; justify-content: center;
}
.con-radio__dot::after {
  content: ''; width: 8px; height: 8px; border-radius: var(--radius-full);
  background: var(--horizon-40); transform: scale(0);
  transition: transform var(--duration-fast-02) var(--ease-productive);
}
.con-radio--checked .con-radio__dot::after { transform: scale(1); }
.con-radio--disabled { color: var(--text-disabled); cursor: not-allowed; }
.con-radio--disabled .con-radio__dot { border-color: var(--icon-disabled); }
.con-radio input:focus-visible + .con-radio__dot { outline: 2px solid var(--focus); outline-offset: 1px; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function RadioGroup({
  legend,
  name,
  options = [],
  value,
  defaultValue,
  disabled = false,
  onChange,
  style
}) {
  useInjectedCss('con-radio-css', css);
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value !== undefined ? value : internal;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: "con-radiogroup",
    style: {
      border: 'none',
      margin: 0,
      padding: 0,
      ...style
    }
  }, legend ? /*#__PURE__*/React.createElement("legend", {
    className: "con-radiogroup__legend"
  }, legend) : null, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const isChecked = current === opt.value;
    const isDisabled = disabled || opt.disabled;
    const cls = ['con-radio', isChecked ? 'con-radio--checked' : '', isDisabled ? 'con-radio--disabled' : ''].filter(Boolean).join(' ');
    return /*#__PURE__*/React.createElement("label", {
      key: opt.value,
      className: cls
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: opt.value,
      checked: isChecked,
      disabled: isDisabled,
      onChange: () => {
        if (value === undefined) setInternal(opt.value);
        if (onChange) onChange(opt.value);
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "con-radio__dot",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("span", null, opt.label));
  }));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
const css = `
.con-select { display: flex; flex-direction: column; gap: var(--spacing-03); }
.con-select__label {
  font: var(--type-label-01); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-secondary);
}
.con-select__wrap { position: relative; }
.con-select__el {
  appearance: none; width: 100%; height: var(--size-md);
  background: var(--field-01); color: var(--text-primary);
  border: none; border-bottom: 1px solid var(--border-strong-01);
  border-radius: var(--radius-0); padding: 0 var(--spacing-08) 0 var(--spacing-05);
  font: var(--type-body-01); cursor: pointer;
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-select__el:hover { background: var(--field-hover-01); }
.con-select__el:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-select__chev {
  position: absolute; right: 12px; top: 50%; width: 16px; height: 16px;
  transform: translateY(-50%); pointer-events: none; filter: invert(96%);
}
.con-select__el[disabled] { color: var(--text-disabled); cursor: not-allowed; border-bottom-color: transparent; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Select({
  label,
  options = [],
  value,
  defaultValue,
  disabled = false,
  onChange,
  iconSrc,
  style
}) {
  useInjectedCss('con-select-css', css);
  return /*#__PURE__*/React.createElement("label", {
    className: "con-select",
    style: style
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "con-select__label"
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    className: "con-select__wrap"
  }, /*#__PURE__*/React.createElement("select", {
    className: "con-select__el",
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange ? e => onChange(e.target.value) : undefined
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("img", {
    className: "con-select__chev",
    src: iconSrc || 'assets/icons/chevron--down.svg',
    alt: ""
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
const css = `
.con-field { display: flex; flex-direction: column; gap: var(--spacing-03); }
.con-field__label {
  font: var(--type-label-01); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-secondary);
}
.con-field__input {
  height: var(--size-md); background: var(--field-01); color: var(--text-primary);
  border: none; border-bottom: 1px solid var(--border-strong-01);
  border-radius: var(--radius-0); padding: 0 var(--spacing-05);
  font: var(--type-body-01); letter-spacing: var(--tracking-body);
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-field__input::placeholder { color: var(--text-placeholder); }
.con-field__input:hover { background: var(--field-hover-01); }
.con-field__input:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-field--invalid .con-field__input { outline: 2px solid var(--support-error); outline-offset: -2px; }
.con-field--mono .con-field__input { font: var(--type-code-02); }
.con-field__helper { font: var(--type-code-01); color: var(--text-helper); }
.con-field--invalid .con-field__helper { color: var(--text-error); }
.con-field__input[disabled] { color: var(--text-disabled); border-bottom-color: transparent; cursor: not-allowed; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function TextInput({
  label,
  value,
  defaultValue,
  placeholder,
  helperText,
  invalid = false,
  mono = false,
  disabled = false,
  onChange,
  style
}) {
  useInjectedCss('con-field-css', css);
  const cls = ['con-field', invalid ? 'con-field--invalid' : '', mono ? 'con-field--mono' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    style: style
  }, label ? /*#__PURE__*/React.createElement("span", {
    className: "con-field__label"
  }, label) : null, /*#__PURE__*/React.createElement("input", {
    className: "con-field__input",
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange ? e => onChange(e.target.value) : undefined
  }), helperText ? /*#__PURE__*/React.createElement("span", {
    className: "con-field__helper"
  }, helperText) : null);
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
const css = `
.con-toggle { display: inline-flex; align-items: center; gap: var(--spacing-03); cursor: pointer; }
.con-toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
.con-toggle__track {
  width: 32px; height: 16px; flex: none; border-radius: var(--radius-full);
  background: var(--gray-60); position: relative;
  transition: background-color var(--duration-fast-02) var(--ease-productive);
}
.con-toggle__track::after {
  content: ''; position: absolute; top: 3px; left: 3px; width: 10px; height: 10px;
  border-radius: var(--radius-full); background: var(--gray-10);
  transition: transform var(--duration-fast-02) var(--ease-productive);
}
.con-toggle--on .con-toggle__track { background: var(--support-success); }
.con-toggle--on .con-toggle__track::after { transform: translateX(16px); background: var(--gray-100); }
.con-toggle__label { font: var(--type-body-01); color: var(--text-primary); }
.con-toggle__state { font: var(--type-code-01); color: var(--text-helper); min-width: 24px; }
.con-toggle--disabled { cursor: not-allowed; }
.con-toggle--disabled .con-toggle__track { background: var(--gray-80); }
.con-toggle--disabled .con-toggle__label { color: var(--text-disabled); }
.con-toggle input:focus-visible + .con-toggle__track { outline: 2px solid var(--focus); outline-offset: 1px; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Toggle({
  label,
  checked,
  defaultChecked = false,
  disabled = false,
  showState = true,
  onChange,
  style
}) {
  useInjectedCss('con-toggle-css', css);
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const cls = ['con-toggle', isOn ? 'con-toggle--on' : '', disabled ? 'con-toggle--disabled' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    style: style
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    checked: isOn,
    disabled: disabled,
    onChange: e => {
      if (checked === undefined) setInternal(e.target.checked);
      if (onChange) onChange(e.target.checked);
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "con-toggle__track",
    "aria-hidden": "true"
  }), label ? /*#__PURE__*/React.createElement("span", {
    className: "con-toggle__label"
  }, label) : null, showState ? /*#__PURE__*/React.createElement("span", {
    className: "con-toggle__state"
  }, isOn ? 'on' : 'off') : null);
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const css = `
.con-tabs { display: flex; flex-direction: column; }
.con-tabs__list { display: flex; border-bottom: 1px solid var(--border-subtle-00); }
.con-tabs__tab {
  appearance: none; background: transparent; border: none; cursor: pointer;
  height: var(--size-md); padding: 0 var(--spacing-05);
  font: var(--type-body-01); color: var(--text-secondary);
  border-bottom: 2px solid transparent; margin-bottom: -1px;
  transition: color var(--duration-fast-02) var(--ease-productive);
}
.con-tabs__tab:hover { color: var(--text-primary); }
.con-tabs__tab:focus-visible { outline: 2px solid var(--focus); outline-offset: -2px; }
.con-tabs__tab--active {
  color: var(--text-primary); font-weight: var(--fw-semibold);
  border-bottom-color: var(--horizon-40);
}
.con-tabs__panel { padding: var(--spacing-05) 0; }
`;
function useInjectedCss(id, text) {
  if (typeof document !== 'undefined' && !document.getElementById(id)) {
    const el = document.createElement('style');
    el.id = id;
    el.textContent = text;
    document.head.appendChild(el);
  }
}
function Tabs({
  tabs = [],
  selected,
  defaultSelected = 0,
  onChange,
  style
}) {
  useInjectedCss('con-tabs-css', css);
  const [internal, setInternal] = React.useState(defaultSelected);
  const idx = selected !== undefined ? selected : internal;
  const current = tabs[idx];
  return /*#__PURE__*/React.createElement("div", {
    className: "con-tabs",
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "con-tabs__list",
    role: "tablist"
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    role: "tab",
    "aria-selected": i === idx,
    className: `con-tabs__tab${i === idx ? ' con-tabs__tab--active' : ''}`,
    onClick: () => {
      if (selected === undefined) setInternal(i);
      if (onChange) onChange(i);
    },
    type: "button"
  }, t.label))), current && current.content !== undefined ? /*#__PURE__*/React.createElement("div", {
    className: "con-tabs__panel",
    role: "tabpanel"
  }, current.content) : null);
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/arp/screens.jsx
try { (() => {
/* ARP — Agentic Runtime Platform console, v2 (DevEx-focused rethink).
   Master–detail runs view, ⌘K command bar, copyable IDs, keyboard nav,
   CLI-parity strip. Composes design-system primitives from _ds_bundle.js. */
const {
  Button,
  IconButton,
  Tile,
  Tag,
  Tabs,
  CodeSnippet,
  InlineNotification,
  Tooltip,
  TextInput,
  Select,
  Toggle
} = window.ConsoleDesignSystem_e08854;
const IC = '../../assets/icons';
const inv = {
  filter: 'invert(96%)'
};
const mono = size => ({
  font: `var(--type-code-0${size || 2})`
});
const eyebrow = {
  font: 'var(--type-label-01)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
  color: 'var(--text-helper)'
};

/* ---------- data ---------- */
const RUNS = [{
  id: 'run_0412',
  wf: 'scenario_pricing',
  status: 'PASSING',
  c: 'green',
  dur: '340ms',
  spans: 1382,
  tier: 'tier-1',
  when: '14m ago'
}, {
  id: 'run_0411',
  wf: 'scenario_pricing',
  status: 'PASSING',
  c: 'green',
  dur: '355ms',
  spans: 1379,
  tier: 'tier-1',
  when: '2h ago'
}, {
  id: 'run_0410',
  wf: 'consensus_review',
  status: 'FAILED',
  c: 'red',
  dur: '2.1s',
  spans: 214,
  tier: 'tier-0 → tier-1',
  when: '6h ago'
}, {
  id: 'run_0409',
  wf: 'etl_reconcile',
  status: 'PASSING',
  c: 'green',
  dur: '1.8s',
  spans: 3021,
  tier: 'tier-2',
  when: '9h ago'
}, {
  id: 'run_0408',
  wf: 'consensus_review',
  status: 'DEGRADED',
  c: 'yellow',
  dur: '4.4s',
  spans: 240,
  tier: 'tier-0',
  when: '12h ago'
}, {
  id: 'run_0407',
  wf: 'qa_regression',
  status: 'QUEUED',
  c: 'blue',
  dur: '—',
  spans: 0,
  tier: 'pending',
  when: '12h ago'
}];
const DAG = [{
  col: 0,
  id: 'parse',
  label: 'parse_intent',
  kind: 'llm',
  status: 'green',
  ms: '120ms'
}, {
  col: 1,
  id: 'plan',
  label: 'compile_dag',
  kind: 'core',
  status: 'green',
  ms: '4ms'
}, {
  col: 2,
  id: 'exec_a',
  label: 'exec · pricing',
  kind: 'core',
  status: 'green',
  ms: '96ms'
}, {
  col: 2,
  id: 'exec_b',
  label: 'exec · risk',
  kind: 'core',
  status: 'green',
  ms: '104ms'
}, {
  col: 2,
  id: 'exec_c',
  label: 'exec · audit',
  kind: 'core',
  status: 'red',
  ms: 'timeout'
}, {
  col: 3,
  id: 'verify',
  label: 'verify_quorum',
  kind: 'core',
  status: 'green',
  ms: '11ms'
}, {
  col: 4,
  id: 'narrate',
  label: 'narrate_result',
  kind: 'llm',
  status: 'green',
  ms: '210ms'
}];
const YAML = `workflow: scenario_pricing
route: tiered            # tier-0 → tier-1 → tier-2
failover: true
budget_per_call: 0.02
telemetry: otel
nodes:
  - parse_intent:   { boundary: llm }
  - compile_dag:    { core: true }
  - exec:           { fan_out: [pricing, risk, audit] }
  - verify_quorum:  { quorum: 2 }
  - narrate_result: { boundary: llm }`;

/* ---------- shared devex bits ---------- */
function CopyId({
  text
}) {
  const [ok, setOk] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    },
    title: `Copy ${text}`,
    style: {
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: 0,
      font: 'var(--type-code-02)',
      color: 'var(--link-primary)'
    }
  }, text, ok ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--support-success)'
    }
  }, "copied") : /*#__PURE__*/React.createElement("img", {
    src: `${IC}/copy.svg`,
    style: {
      width: 12,
      height: 12,
      filter: 'invert(60%)',
      opacity: 0.7
    },
    alt: ""
  }));
}
function CliStrip({
  cmd
}) {
  const [ok, setOk] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      zIndex: 30,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '0 var(--spacing-05)',
      background: 'var(--void)',
      borderTop: '1px solid var(--border-subtle-00)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: eyebrow
  }, "CLI"), /*#__PURE__*/React.createElement("code", {
    style: {
      ...mono(1),
      color: 'var(--text-secondary)',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)'
    }
  }, "$ "), cmd), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (navigator.clipboard) navigator.clipboard.writeText(cmd);
      setOk(true);
      setTimeout(() => setOk(false), 1200);
    },
    style: {
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      ...mono(1),
      color: ok ? 'var(--support-success)' : 'var(--link-primary)',
      padding: 0
    }
  }, ok ? 'copied' : 'copy'), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, "every UI action has a CLI twin"));
}
function Kbd({
  k
}) {
  return /*#__PURE__*/React.createElement("kbd", {
    style: {
      font: 'var(--type-code-01)',
      color: 'var(--text-secondary)',
      background: 'var(--layer-02)',
      padding: '1px 5px',
      border: '1px solid var(--border-subtle-01)',
      borderBottomWidth: 2
    }
  }, k);
}

/* ---------- chrome ---------- */
function TopBar({
  onHome,
  query,
  setQuery,
  inputRef
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      height: 48,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-05)',
      padding: '0 var(--spacing-05)',
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle-00)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -1,
      height: 1,
      background: 'var(--gradient-horizon)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onHome();
    },
    style: {
      font: '600 0.875rem/1 var(--font-mono)',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      flex: 'none'
    }
  }, "console", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--horizon-40)'
    }
  }, "\u258A")), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)',
      flex: 'none'
    }
  }, "/ agentic-runtime"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 520,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/search.svg`,
    style: {
      position: 'absolute',
      left: 10,
      top: 8,
      width: 14,
      height: 14,
      filter: 'invert(60%)'
    },
    alt: ""
  }), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search runs, workflows, actions\u2026",
    style: {
      width: '100%',
      height: 30,
      background: 'var(--layer-01)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle-00)',
      padding: '0 64px 0 32px',
      font: 'var(--type-code-01)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 8,
      top: 5,
      display: 'flex',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement(Kbd, {
    k: "\u2318"
  }), /*#__PURE__*/React.createElement(Kbd, {
    k: "K"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      ...mono(1),
      color: 'var(--support-success)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: 'var(--support-success)'
    }
  }), "prod \xB7 live"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Settings"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/settings.svg`,
    style: inv,
    alt: ""
  })));
}
function SideNav({
  view,
  go
}) {
  const item = (icon, label, target, kbd) => {
    const active = view === target;
    return /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go(target);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 40,
        padding: '0 var(--spacing-04)',
        font: 'var(--type-body-01)',
        textDecoration: 'none',
        color: active ? 'var(--text-primary)' : 'var(--text-helper)',
        background: active ? 'var(--layer-01)' : 'transparent',
        boxShadow: active ? 'inset 3px 0 0 var(--horizon-40)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `${IC}/${icon}`,
      style: {
        width: 16,
        height: 16,
        filter: 'invert(96%)',
        opacity: active ? 1 : 0.6
      },
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), /*#__PURE__*/React.createElement(Kbd, {
      k: kbd
    }));
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 200,
      flex: 'none',
      borderRight: '1px solid var(--border-subtle-00)',
      paddingTop: 'var(--spacing-03)',
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, item('renew.svg', 'Runs', 'runs', 'g r'), item('play.svg', 'Execution', 'live', 'g e'), item('flow.svg', 'Workflows', 'workflows', 'g w'), item('document.svg', 'Review', 'review', 'g v'), item('checkmark.svg', 'Evals', 'evals', 'g l'), item('branch.svg', 'Routing', 'routing', 'g o'), item('catalog.svg', 'Telemetry', 'telemetry', 'g t'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: 'var(--spacing-04)',
      borderTop: '1px solid var(--border-subtle-00)',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: eyebrow
  }, "SHORTCUTS"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, /*#__PURE__*/React.createElement(Kbd, {
    k: "j"
  }), " ", /*#__PURE__*/React.createElement(Kbd, {
    k: "k"
  }), " move \xB7 ", /*#__PURE__*/React.createElement(Kbd, {
    k: "\u21B5"
  }), " inspect"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, /*#__PURE__*/React.createElement(Kbd, {
    k: "esc"
  }), " close panel")));
}
function StatCell({
  k,
  v,
  highlight
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px var(--spacing-05)',
      borderRight: '1px solid var(--border-subtle-00)',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-05)',
      fontFamily: 'var(--font-mono)',
      color: highlight ? 'var(--text-highlight)' : 'var(--text-primary)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)',
      marginTop: 2
    }
  }, k));
}

/* ---------- inspector panel ---------- */
function DagNode({
  n,
  st = 'done',
  anim = true,
  speed = 1
}) {
  const failed = n.status === 'red';
  const border = st === 'active' ? 'var(--horizon-40)' : st === 'pending' ? 'var(--border-subtle-01)' : failed ? 'var(--support-error)' : n.kind === 'llm' ? 'var(--horizon-40)' : 'var(--border-subtle-01)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--layer-01)',
      border: `1px solid ${border}`,
      padding: '8px 10px',
      width: 150,
      opacity: st === 'pending' ? 0.45 : 1,
      transition: 'opacity .3s',
      animation: anim && st === 'active' ? `arp-node-pulse ${(1.2 / speed).toFixed(2)}s ease-in-out infinite` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      color: n.kind === 'llm' ? 'var(--horizon-30)' : 'var(--text-helper)'
    }
  }, n.kind === 'llm' ? 'LLM · BOUNDARY' : 'CORE'), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-01)',
      margin: '3px 0 1px'
    }
  }, n.label), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: st === 'active' ? 'var(--horizon-40)' : st === 'pending' ? 'var(--text-helper)' : failed ? 'var(--text-error)' : 'var(--support-success)'
    }
  }, st === 'active' ? 'running…' : st === 'pending' ? 'queued' : n.ms));
}
function DagStrip({
  run,
  anim = true,
  speed = 1
}) {
  const cols = [0, 1, 2, 3, 4].map(c => DAG.filter(n => n.col === c));
  const [step, setStep] = React.useState(0);
  React.useEffect(() => {
    setStep(anim ? 0 : cols.length);
  }, [run.id, anim]);
  React.useEffect(() => {
    if (!anim) return;
    const t = setInterval(() => setStep(s => s > cols.length + 1 ? 0 : s + 1), Math.round(900 / speed));
    return () => clearInterval(t);
  }, [anim, speed, run.id]);
  const replaying = anim && step < cols.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-subtle-00)',
      background: 'var(--void)',
      padding: 'var(--spacing-04) var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: eyebrow
  }, "EXECUTION \xB7 ", run.id), /*#__PURE__*/React.createElement(Tag, {
    color: replaying ? 'blue' : run.c,
    dot: true
  }, replaying ? 'REPLAYING' : run.status), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, run.wf, " \xB7 ", run.tier, " \xB7 ", run.dur)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto'
    }
  }, cols.map((nodes, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      flex: 'none',
      height: 2,
      background: i <= step ? 'var(--horizon-40)' : 'var(--border-subtle-01)',
      transition: 'background .3s'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 'none'
    }
  }, nodes.map(n => /*#__PURE__*/React.createElement(DagNode, {
    key: n.id,
    n: n,
    st: i < step ? 'done' : i === step ? 'active' : 'pending',
    anim: anim,
    speed: speed
  })))))));
}
function SpanRow({
  name,
  start,
  width,
  color,
  ms
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr 64px',
      alignItems: 'center',
      height: 26,
      ...mono(1)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 8,
      background: 'var(--layer-01)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${start}%`,
      width: `${width}%`,
      top: 0,
      bottom: 0,
      background: color
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)',
      textAlign: 'right'
    }
  }, ms));
}
function Inspector({
  run,
  onClose,
  setCli
}) {
  React.useEffect(() => {
    setCli(`arp runs inspect ${run.id} --trace`);
  }, [run.id]);
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'min(520px, 46vw)',
      flex: 'none',
      borderLeft: '1px solid var(--border-subtle-00)',
      background: 'var(--background)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    "data-screen-label": `ARP — Inspector ${run.id}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 'var(--spacing-04) var(--spacing-05)',
      borderBottom: '1px solid var(--border-subtle-00)'
    }
  }, /*#__PURE__*/React.createElement(CopyId, {
    text: run.id
  }), /*#__PURE__*/React.createElement(Tag, {
    color: run.c,
    dot: true
  }, run.status), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, run.tier), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    text: "Replay with same inputs"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Replay",
    size: "sm"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/renew.svg`,
    style: inv,
    alt: ""
  }))), /*#__PURE__*/React.createElement(Tooltip, {
    text: "Open trace in OTel"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Trace",
    size: "sm"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/launch.svg`,
    style: inv,
    alt: ""
  }))), /*#__PURE__*/React.createElement(IconButton, {
    label: "Close",
    size: "sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/close.svg`,
    style: inv,
    alt: ""
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--spacing-05) var(--spacing-05)',
      overflowY: 'auto'
    }
  }, run.status === 'FAILED' ? /*#__PURE__*/React.createElement(InlineNotification, {
    kind: "error",
    title: "exec \xB7 audit timed out on tier-0",
    subtitle: "failover engaged \u2192 tier-1 \xB7 retry 2/3",
    iconBase: IC,
    style: {
      margin: 'var(--spacing-04) 0 0'
    }
  }) : null, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      label: 'Spans',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          paddingTop: 'var(--spacing-04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 5
        }
      }, /*#__PURE__*/React.createElement(SpanRow, {
        name: "parse_intent",
        start: 0,
        width: 12,
        color: "var(--horizon-40)",
        ms: "120ms"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "compile_dag",
        start: 12,
        width: 2,
        color: "var(--teal-30)",
        ms: "4ms"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "exec \xB7 pricing",
        start: 14,
        width: 28,
        color: "var(--teal-30)",
        ms: "96ms"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "exec \xB7 risk",
        start: 14,
        width: 31,
        color: "var(--teal-30)",
        ms: "104ms"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "exec \xB7 audit",
        start: 14,
        width: 62,
        color: "var(--support-error)",
        ms: "timeout"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "verify_quorum",
        start: 48,
        width: 3,
        color: "var(--teal-30)",
        ms: "11ms"
      }), /*#__PURE__*/React.createElement(SpanRow, {
        name: "narrate_result",
        start: 52,
        width: 22,
        color: "var(--horizon-40)",
        ms: "210ms"
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          ...mono(1),
          color: 'var(--text-helper)',
          marginTop: 6
        }
      }, "cyan = LLM boundary \xB7 teal = deterministic core"))
    }, {
      label: 'YAML',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          paddingTop: 'var(--spacing-04)'
        }
      }, /*#__PURE__*/React.createElement(CodeSnippet, {
        title: "scenario_pricing.yaml",
        code: YAML,
        copyIconSrc: `${IC}/copy.svg`
      }, YAML))
    }]
  })));
}

/* ---------- runs (master–detail) ---------- */
function RunsView({
  query,
  setCli,
  anim = true,
  speed = 1
}) {
  const [selected, setSelected] = React.useState(null);
  const [cursor, setCursor] = React.useState(0);
  const rows = RUNS.filter(r => !query || r.id.includes(query) || r.wf.includes(query) || r.status.toLowerCase().includes(query.toLowerCase()));
  React.useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'j') setCursor(c => Math.min(c + 1, rows.length - 1));
      if (e.key === 'k') setCursor(c => Math.max(c - 1, 0));
      if (e.key === 'Enter' && rows[cursor]) setSelected(rows[cursor]);
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [rows, cursor]);
  const grid = selected ? 'minmax(110px,130px) minmax(140px,1fr) 110px 80px' : 'minmax(110px,130px) minmax(160px,1.4fr) 120px 90px 70px minmax(90px,150px) 80px';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    },
    "data-screen-label": "ARP \u2014 Runs (master\u2013detail)"
  }, selected ? /*#__PURE__*/React.createElement(DagStrip, {
    run: selected,
    anim: anim,
    speed: speed
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--border-subtle-00)'
    }
  }, /*#__PURE__*/React.createElement(StatCell, {
    k: "runs / 24h",
    v: "312"
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "p95",
    v: "340ms"
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "failovers",
    v: "3",
    highlight: true
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "spend / 24h",
    v: "$4.87"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-04)',
      alignItems: 'center',
      padding: 'var(--spacing-04) var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    options: ['status: all', 'passing', 'failed', 'degraded', 'queued'],
    iconSrc: `${IC}/chevron--down.svg`,
    style: {
      width: 150
    }
  }), /*#__PURE__*/React.createElement(Select, {
    options: ['workflow: all', 'scenario_pricing', 'consensus_review', 'etl_reconcile'],
    iconSrc: `${IC}/chevron--down.svg`,
    style: {
      width: 190
    }
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Live tail",
    defaultChecked: true,
    showState: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/play.svg`,
      alt: ""
    }),
    onClick: () => setCli('arp runs trigger scenario_pricing --env prod')
  }, "Trigger run"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--spacing-05) var(--spacing-06)',
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: selected ? 440 : 720
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: grid,
      height: 30,
      alignItems: 'center',
      ...eyebrow,
      borderBottom: '1px solid var(--border-subtle-01)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "run"), /*#__PURE__*/React.createElement("span", null, "workflow"), /*#__PURE__*/React.createElement("span", null, "status"), /*#__PURE__*/React.createElement("span", null, "duration"), !selected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "spans"), /*#__PURE__*/React.createElement("span", null, "route"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "when")) : null), rows.map((r, i) => {
    const active = selected && selected.id === r.id;
    const focused = i === cursor;
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: () => {
        setSelected(r);
        setCursor(i);
      },
      style: {
        display: 'grid',
        gridTemplateColumns: grid,
        height: 42,
        alignItems: 'center',
        cursor: 'pointer',
        borderBottom: '1px solid var(--border-subtle-00)',
        ...mono(2),
        background: active ? 'var(--layer-01)' : 'transparent',
        boxShadow: active ? 'inset 3px 0 0 var(--horizon-40)' : focused ? 'inset 3px 0 0 var(--border-strong-01)' : 'none'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'var(--layer-01)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(CopyId, {
      text: r.id
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-primary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, r.wf), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tag, {
      color: r.c,
      dot: true
    }, r.status)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, r.dur), !selected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)'
      }
    }, r.spans || '—'), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-helper)'
      }
    }, r.tier), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-helper)',
        textAlign: 'right'
      }
    }, r.when)) : null);
  }), rows.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--spacing-06)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(2),
      color: 'var(--text-secondary)'
    }
  }, "No runs match \u201C", query, "\u201D."), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, "Trigger one: ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: 'var(--link-primary)'
    }
  }, "$ arp runs trigger <workflow>"))) : null))), selected ? /*#__PURE__*/React.createElement(Inspector, {
    run: selected,
    onClose: () => setSelected(null),
    setCli: setCli
  }) : null));
}

/* WorkflowBuilder lives in workflow-builder.jsx (window.WorkflowBuilder) */

/* ---------- workflows ---------- */
function WorkflowsView({
  setCli
}) {
  const wfs = [['scenario_pricing', '5 nodes · 2 LLM boundary', 'green', 'PASSING'], ['consensus_review', '7 nodes · quorum 3', 'yellow', 'DEGRADED'], ['etl_reconcile', '12 nodes · tier-2 only', 'green', 'PASSING'], ['qa_regression', '9 nodes · nightly', 'blue', 'QUEUED']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)'
    },
    "data-screen-label": "ARP \u2014 Workflows"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: 0
    }
  }, "Workflows"), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/add.svg`,
      alt: ""
    }),
    onClick: () => setCli('arp wf new --from template/tiered')
  }, "New workflow")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: 'var(--spacing-05)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-04)'
    }
  }, wfs.map(([name, meta, c, st]) => /*#__PURE__*/React.createElement(Tile, {
    key: name,
    onClick: () => setCli(`arp wf show ${name}`)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(2),
      color: 'var(--text-primary)',
      flex: 1
    }
  }, name), /*#__PURE__*/React.createElement(Tag, {
    color: c,
    dot: true
  }, st)), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)',
      marginTop: 6
    }
  }, meta)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WorkflowBuilder, {
    setCli: setCli
  }))));
}

/* ---------- routing ---------- */
function RoutingView({
  setCli
}) {
  const tiers = [['tier-0', 'frontier', '$0.020 / call', '38%', 'var(--horizon-40)'], ['tier-1', 'fast', '$0.004 / call', '51%', 'var(--teal-30)'], ['tier-2', 'local', '$0.000 / call', '11%', 'var(--green-30)']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)'
    },
    "data-screen-label": "ARP \u2014 Routing"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: '0 0 var(--spacing-05)'
    }
  }, "Model routing"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 'var(--spacing-05)',
      marginBottom: 'var(--spacing-06)'
    }
  }, tiers.map(([t, kind, cost, share, color]) => /*#__PURE__*/React.createElement(Tile, {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(2),
      color: 'var(--text-primary)'
    }
  }, t, " \xB7 ", kind), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-05)',
      fontFamily: 'var(--font-mono)',
      color
    }
  }, share)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: 'var(--layer-02)',
      margin: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      width: share,
      background: color
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, cost, " \xB7 of routed traffic")))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 480,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-04)'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Automatic failover",
    defaultChecked: true,
    onChange: v => setCli(`arp routing set failover ${v}`)
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Budget enforcement ($0.02 ceiling)",
    defaultChecked: true,
    onChange: v => setCli(`arp routing set budget-enforce ${v}`)
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Route dry-runs to tier-2",
    onChange: v => setCli(`arp routing set dryrun-tier2 ${v}`)
  })));
}

/* ---------- telemetry ---------- */
function TelemetryView() {
  const bars = [42, 55, 38, 61, 47, 70, 52, 44, 66, 58, 49, 73, 60, 51, 45, 68, 54, 62, 48, 57, 41, 64, 56, 50];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)'
    },
    "data-screen-label": "ARP \u2014 Telemetry"
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: '0 0 var(--spacing-05)'
    }
  }, "Telemetry"), /*#__PURE__*/React.createElement(Tile, null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 12
    }
  }, "P95 LATENCY \xB7 LAST 24H \xB7 MS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4,
      height: 120
    }
  }, bars.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${h}%`,
      background: i === 11 ? 'var(--text-highlight)' : 'var(--horizon-50)'
    },
    title: `${300 + h}ms`
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      ...mono(1),
      color: 'var(--text-helper)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "00:00"), /*#__PURE__*/React.createElement("span", null, "peak 373ms \xB7 11:00"), /*#__PURE__*/React.createElement("span", null, "23:00"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-05)',
      marginTop: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement(StatCell, {
    k: "spans exported",
    v: "412,882"
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "error rate",
    v: "0.4%"
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "failovers",
    v: "3",
    highlight: true
  }), /*#__PURE__*/React.createElement(StatCell, {
    k: "dropped spans",
    v: "0"
  })));
}

/* ---------- live execution watch ---------- */
const LIVE_LOG = [['00:00.012', 'core', 'compile_dag · 5 nodes · 0 warnings'], ['00:00.140', 'llm', 'parse_intent → tier-1 · tokens 412 · $0.0031'], ['00:00.148', 'core', 'exec fan-out · pricing, risk, audit'], ['00:00.244', 'core', 'exec·pricing done · 96ms'], ['00:00.252', 'core', 'exec·risk done · 104ms'], ['00:01.401', 'warn', 'exec·audit slow on tier-0 · 1.2s elapsed'], ['00:02.150', 'err ', 'exec·audit timeout · failover → tier-1 · retry 1/3'], ['00:02.410', 'core', 'exec·audit done on tier-1 · 233ms'], ['00:02.428', 'core', 'verify_quorum · 3/3 · 11ms'], ['00:02.680', 'llm', 'narrate_result → tier-1 · streaming…']];
function LiveView({
  setCli,
  anim = true,
  speed = 1,
  replayNonce = 0
}) {
  const [tick, setTick] = React.useState(3);
  const [paused, setPaused] = React.useState(false);
  const logRef = React.useRef(null);
  React.useEffect(() => {
    setCli('arp runs watch run_0413 --follow');
  }, []);
  React.useEffect(() => {
    if (replayNonce > 0) {
      setTick(0);
      setPaused(false);
      setCli('arp runs replay run_0413 --speed ' + speed);
    }
  }, [replayNonce]);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setTick(n => n >= LIVE_LOG.length ? n : n + 1), Math.round(900 / speed));
    return () => clearInterval(t);
  }, [paused, speed]);
  React.useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [tick]);
  const nodeState = i => {
    const done = [1, 2, 3, 4, 6, 7, 8, 9];
    const doneCount = Math.min(tick, LIVE_LOG.length);
    return doneCount >= done.length ? 'done' : i < doneCount * 0.7 ? 'done' : 'pending';
  };
  const running = tick < LIVE_LOG.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    },
    "data-screen-label": "ARP \u2014 Live execution"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: 0
    }
  }, "Execution"), /*#__PURE__*/React.createElement(CopyId, {
    text: "run_0413"
  }), /*#__PURE__*/React.createElement(Tag, {
    color: running ? 'blue' : 'green',
    dot: true
  }, running ? 'RUNNING' : 'PASSING'), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, "scenario_pricing \xB7 tier-1 \xB7 started 4s ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => setPaused(!paused)
  }, paused ? 'Resume tail' : 'Pause tail'), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm",
    onClick: () => setCli('arp runs kill run_0413 --drain')
  }, "Kill"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 'var(--spacing-05)',
      flex: 1,
      minHeight: 0,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "DAG PROGRESS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, DAG.map((n, i) => {
    const st = nodeState(i);
    const active = running && st === 'pending' && (i === 0 || nodeState(i - 1) === 'done');
    return /*#__PURE__*/React.createElement("div", {
      key: n.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 40,
        padding: '0 12px',
        background: 'var(--layer-01)',
        borderLeft: `3px solid ${st === 'done' ? 'var(--support-success)' : active ? 'var(--horizon-40)' : 'var(--border-subtle-01)'}`,
        animation: anim && active ? `arp-node-pulse ${(1.2 / speed).toFixed(2)}s ease-in-out infinite` : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...eyebrow,
        width: 96,
        color: n.kind === 'llm' ? 'var(--horizon-30)' : 'var(--text-helper)'
      }
    }, n.kind === 'llm' ? 'LLM' : 'CORE'), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono(2),
        color: 'var(--text-primary)',
        flex: 1
      }
    }, n.label), /*#__PURE__*/React.createElement("span", {
      style: {
        ...mono(1),
        color: st === 'done' ? 'var(--support-success)' : active ? 'var(--horizon-40)' : 'var(--text-helper)'
      }
    }, st === 'done' ? n.ms : active ? 'running…' : 'queued'));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "LOG TAIL \xB7 OTEL-LINKED"), /*#__PURE__*/React.createElement("div", {
    ref: logRef,
    style: {
      background: 'var(--void)',
      border: '1px solid var(--border-subtle-00)',
      padding: 'var(--spacing-04)',
      overflowY: 'auto',
      flex: 1,
      minHeight: 260,
      maxHeight: 420
    }
  }, LIVE_LOG.slice(0, tick).map(([t, kind, msg], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...mono(1),
      display: 'flex',
      gap: 12,
      lineHeight: '20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)',
      flex: 'none'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 34,
      color: kind === 'err ' ? 'var(--support-error)' : kind === 'warn' ? 'var(--support-warning)' : kind === 'llm' ? 'var(--horizon-30)' : 'var(--teal-30)'
    }
  }, kind.trim()), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, msg))), running ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: 'var(--horizon-40)',
      animation: anim ? 'arp-blink 1s step-end infinite' : 'none'
    }
  }, "\u258B") : null))));
}

/* ---------- workflow review ---------- */
const DIFF = [[' ', 'workflow: scenario_pricing'], [' ', 'route: tiered'], ['-', 'budget_per_call: 0.05'], ['+', 'budget_per_call: 0.02'], [' ', 'failover: true'], ['+', 'telemetry: otel'], [' ', 'nodes:'], [' ', '  - parse_intent:   { boundary: llm }'], ['-', '  - exec:           { fan_out: [pricing, risk] }'], ['+', '  - exec:           { fan_out: [pricing, risk, audit] }'], ['+', '  - verify_quorum:  { quorum: 2 }'], [' ', '  - narrate_result: { boundary: llm }']];
function ReviewView({
  setCli
}) {
  const [decided, setDecided] = React.useState(null);
  React.useEffect(() => {
    setCli('arp wf review scenario_pricing --change cr_0091');
  }, []);
  const checks = [['compile', 'passed · 6 nodes · 0 warnings', 'green'], ['dry-run vs golden set', '24/24 outputs identical', 'green'], ['budget delta', '-$0.03 per call (ceiling lowered)', 'green'], ['new node coverage', 'exec·audit has no eval suite yet', 'yellow']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)'
    },
    "data-screen-label": "ARP \u2014 Workflow review"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: 0
    }
  }, "Review"), /*#__PURE__*/React.createElement(CopyId, {
    text: "cr_0091"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, "scenario_pricing \xB7 proposed by tafreeman \xB7 20m ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => {
      setDecided('changes');
      setCli('arp wf review cr_0091 --request-changes');
    }
  }, "Request changes"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => {
      setDecided('approved');
      setCli('arp wf review cr_0091 --approve --deploy');
    }
  }, "Approve & deploy"))), decided ? /*#__PURE__*/React.createElement(InlineNotification, {
    kind: decided === 'approved' ? 'success' : 'warning',
    title: decided === 'approved' ? 'Approved · deploying to prod' : 'Changes requested',
    subtitle: decided === 'approved' ? 'rollout: canary 10% → 100% over 30m' : 'author notified · change stays staged',
    iconBase: IC,
    style: {
      marginBottom: 'var(--spacing-05)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(340px, 1.3fr) minmax(280px, 1fr)',
      gap: 'var(--spacing-05)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "DIFF \xB7 scenario_pricing.yaml"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--void)',
      border: '1px solid var(--border-subtle-00)',
      padding: 'var(--spacing-04) 0'
    }
  }, DIFF.map(([sign, line], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      ...mono(2),
      display: 'flex',
      lineHeight: '22px',
      background: sign === '+' ? 'rgba(66,190,101,0.12)' : sign === '-' ? 'rgba(250,77,86,0.12)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      textAlign: 'center',
      flex: 'none',
      color: sign === '+' ? 'var(--support-success)' : sign === '-' ? 'var(--support-error)' : 'var(--text-helper)'
    }
  }, sign), /*#__PURE__*/React.createElement("span", {
    style: {
      color: sign === ' ' ? 'var(--text-secondary)' : 'var(--text-primary)',
      whiteSpace: 'pre'
    }
  }, line))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "CHECKS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, checks.map(([name, detail, c]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--layer-01)',
      border: '1px solid var(--border-subtle-00)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: c,
    dot: true,
    style: {
      flex: 'none'
    }
  }, c === 'green' ? 'PASS' : 'WARN'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(2),
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, detail))))))));
}

/* ---------- evals ---------- */
function EvalsView({
  setCli
}) {
  const [running, setRunning] = React.useState(false);
  React.useEffect(() => {
    setCli('arp evals list --workflow scenario_pricing');
  }, []);
  const suites = [['accuracy · pricing', 'golden set · 240 cases', '98.3%', 'green'], ['groundedness · narration', 'LLM grader · quorum 3', '96.1%', 'green'], ['cost ceiling', 'budget ≤ $0.02 / call', '100%', 'green'], ['audit coverage', 'new node · no suite yet', '—', 'yellow']];
  const results = [['eval_0088', 'accuracy · pricing', '98.3%', '≥ 97%', 'PASS', 'green', '1h ago'], ['eval_0087', 'groundedness', '96.1%', '≥ 95%', 'PASS', 'green', '1h ago'], ['eval_0086', 'accuracy · pricing', '96.8%', '≥ 97%', 'FAIL', 'red', '1d ago'], ['eval_0085', 'cost ceiling', '100%', '= 100%', 'PASS', 'green', '1d ago']];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: 'var(--spacing-05) var(--spacing-06)'
    },
    "data-screen-label": "ARP \u2014 Evals"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-04)',
      margin: 0
    }
  }, "Evals"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/play.svg`,
      alt: ""
    }),
    onClick: () => {
      setRunning(true);
      setCli('arp evals run --suite all --workflow scenario_pricing');
      setTimeout(() => setRunning(false), 2500);
    }
  }, running ? 'Running…' : 'Run all suites')), running ? /*#__PURE__*/React.createElement(InlineNotification, {
    kind: "info",
    title: "Eval batch queued",
    subtitle: "4 suites \xB7 golden sets pinned \xB7 results land below",
    iconBase: IC,
    style: {
      marginBottom: 'var(--spacing-05)'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.2fr',
      gap: 'var(--spacing-05)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "SETUP \xB7 NEW SUITE"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--layer-01)',
      border: '1px solid var(--border-subtle-00)',
      padding: 'var(--spacing-05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement(TextInput, {
    label: "SUITE NAME",
    placeholder: "audit_coverage",
    mono: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "DATASET",
    options: ['golden_pricing_240', 'audit_cases_60 (draft)', 'upload csv…'],
    iconSrc: `${IC}/chevron--down.svg`
  }), /*#__PURE__*/React.createElement(Select, {
    label: "GRADER",
    options: ['exact match (deterministic)', 'numeric tolerance ±0.5%', 'LLM grader · quorum 3'],
    iconSrc: `${IC}/chevron--down.svg`
  }), /*#__PURE__*/React.createElement(TextInput, {
    label: "PASS THRESHOLD",
    defaultValue: "\u2265 97%",
    mono: true,
    helperText: "suite fails the run below this"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => setCli('arp evals create audit_coverage --dataset audit_cases_60 --grader exact --threshold 0.97')
  }, "Create suite"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Docs"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      margin: '16px 0 8px'
    }
  }, "SUITES"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, suites.map(([name, meta, score, c]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      background: 'var(--layer-01)',
      border: '1px solid var(--border-subtle-00)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(2),
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)'
    }
  }, meta)), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-03)',
      fontFamily: 'var(--font-mono)',
      color: c === 'yellow' ? 'var(--text-highlight)' : 'var(--support-success)'
    }
  }, score))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...eyebrow,
      marginBottom: 8
    }
  }, "RESULTS \xB7 LAST 7D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(88px,100px) minmax(130px,1fr) 64px 84px 78px 60px',
      columnGap: 10,
      height: 30,
      alignItems: 'center',
      ...eyebrow,
      borderBottom: '1px solid var(--border-subtle-01)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "eval"), /*#__PURE__*/React.createElement("span", null, "suite"), /*#__PURE__*/React.createElement("span", null, "score"), /*#__PURE__*/React.createElement("span", null, "threshold"), /*#__PURE__*/React.createElement("span", null, "verdict"), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right'
    }
  }, "when")), results.map(([id, suite, score, th, verdict, c, when]) => /*#__PURE__*/React.createElement("div", {
    key: id,
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(88px,100px) minmax(130px,1fr) 64px 84px 78px 60px',
      columnGap: 10,
      height: 42,
      alignItems: 'center',
      borderBottom: '1px solid var(--border-subtle-00)',
      ...mono(2)
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(CopyId, {
    text: id
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, suite), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, score), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)'
    }
  }, th), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Tag, {
    color: c,
    dot: true
  }, verdict)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)',
      textAlign: 'right'
    }
  }, when))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono(1),
      color: 'var(--text-helper)',
      marginTop: 10
    }
  }, "failing evals block Review approval \u2014 see ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--link-primary)'
    }
  }, "cr_0091 \xB7 audit coverage WARN")))));
}

/* ---------- app ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flowAnimation": true,
  "flowSpeed": 1
} /*EDITMODE-END*/;
function App() {
  const [view, setView] = React.useState('runs');
  const [query, setQuery] = React.useState('');
  const [cli, setCli] = React.useState('arp runs list --env prod --limit 50');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [replayNonce, setReplayNonce] = React.useState(0);
  const searchRef = React.useRef(null);
  React.useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchRef.current) searchRef.current.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    onHome: () => setView('runs'),
    query: query,
    setQuery: setQuery,
    inputRef: searchRef
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      alignItems: 'stretch',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(SideNav, {
    view: view,
    go: setView
  }), view === 'workflows' ? /*#__PURE__*/React.createElement(WorkflowsView, {
    setCli: setCli
  }) : view === 'live' ? /*#__PURE__*/React.createElement(LiveView, {
    setCli: setCli,
    anim: t.flowAnimation,
    speed: t.flowSpeed,
    replayNonce: replayNonce
  }) : view === 'review' ? /*#__PURE__*/React.createElement(ReviewView, {
    setCli: setCli
  }) : view === 'evals' ? /*#__PURE__*/React.createElement(EvalsView, {
    setCli: setCli
  }) : view === 'routing' ? /*#__PURE__*/React.createElement(RoutingView, {
    setCli: setCli
  }) : view === 'telemetry' ? /*#__PURE__*/React.createElement(TelemetryView, null) : /*#__PURE__*/React.createElement(RunsView, {
    query: query,
    setCli: setCli,
    anim: t.flowAnimation,
    speed: t.flowSpeed
  })), /*#__PURE__*/React.createElement(CliStrip, {
    cmd: cli
  }), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Flow animation"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Animate flow",
    value: t.flowAnimation,
    onChange: v => setTweak('flowAnimation', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Playback speed",
    value: t.flowSpeed,
    min: 0.25,
    max: 3,
    step: 0.25,
    unit: "\xD7",
    onChange: v => setTweak('flowSpeed', v)
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "Replay run_0413",
    onClick: () => {
      setView('live');
      setReplayNonce(n => n + 1);
    }
  })));
}
({render:function(){/* console-ds: demo kit auto-render disabled when vendored as a library */}}).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/arp/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/arp/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/arp/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/arp/workflow-builder.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* workflow-builder.jsx — production workflow editor for the ARP Workflows view.
   Stages run left→right; nodes stacked in a stage run in parallel.
   Production buildout pipeline: chart → name → wire edges → configure →
   validate → compile → deploy. Every action has a CLI twin.
   Exposes window.WorkflowBuilder. */

const wbMono = s => ({
  font: `var(--type-code-0${s || 2})`
});
const wbEyebrow = {
  font: 'var(--type-label-01)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
  color: 'var(--text-helper)'
};
const WB_TYPES = [{
  label: 'orchestrator',
  kind: 'orch',
  hint: 'plans + delegates to agents'
}, {
  label: 'agent',
  kind: 'agent',
  hint: 'LLM worker · runs in parallel'
}, {
  label: 'core_step',
  kind: 'core',
  hint: 'deterministic · no LLM'
}, {
  label: 'verify_quorum',
  kind: 'gate',
  hint: 'fan-in gate · quorum vote'
}];
const WB_TIERS = ['tier-1', 'tier-0', 'tier-2'];
const WB_COST = {
  'tier-0': 0.02,
  'tier-1': 0.004,
  'tier-2': 0
};
const WB_CONDS = ['on_success', 'on_fail', 'always'];
const WB_CONDC = {
  on_success: 'var(--support-success)',
  on_fail: 'var(--support-error)',
  always: 'var(--text-helper)'
};
let wbId = 100;
const wbNode = (label, kind, tier) => ({
  id: wbId++,
  label,
  kind,
  tier: tier || (kind === 'core' || kind === 'gate' ? '—' : 'tier-1'),
  retries: kind === 'core' || kind === 'gate' ? 0 : 1,
  timeoutS: kind === 'gate' ? 5 : 30,
  quorum: kind === 'gate' ? 2 : undefined
});
const wbIsPlaceholder = label => /^(agent|node)_\d+$/.test(label);
const WB_PRESETS = {
  fanout: {
    label: 'orchestrator → 3 agents',
    cli: 'arp wf scaffold --pattern orchestrator-fanout',
    stages: () => [[wbNode('parse_intent', 'agent')], [wbNode('orchestrator', 'orch', 'tier-0')], [wbNode('agent_pricing', 'agent'), wbNode('agent_risk', 'agent'), wbNode('agent_audit', 'agent')], [wbNode('verify_quorum', 'gate')], [wbNode('narrate_result', 'agent')]]
  },
  steps: {
    label: 'step by step',
    cli: 'arp wf scaffold --pattern sequential',
    stages: () => [[wbNode('parse_intent', 'agent')], [wbNode('compile_dag', 'core')], [wbNode('exec_pricing', 'agent')], [wbNode('verify_output', 'gate')], [wbNode('narrate_result', 'agent')]]
  }
};
const wbKindColor = k => k === 'orch' ? 'var(--text-highlight)' : k === 'agent' ? 'var(--horizon-30)' : k === 'gate' ? 'var(--teal-30)' : 'var(--text-helper)';
const wbKindBorder = k => k === 'orch' ? 'var(--support-warning)' : k === 'agent' ? 'var(--horizon-40)' : k === 'gate' ? 'var(--teal-30)' : 'var(--border-subtle-01)';
const wbKindTag = k => k === 'orch' ? 'ORCHESTRATOR' : k === 'agent' ? 'LLM · AGENT' : k === 'gate' ? 'GATE · FAN-IN' : 'CORE';

/* ---------- small controls ---------- */
function WbStepper({
  value,
  onChange,
  min = 0,
  max = 9,
  unit
}) {
  const btn = (d, ch) => /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(Math.min(max, Math.max(min, value + d))),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      width: 20,
      height: 20,
      padding: 0,
      background: 'var(--layer-02)',
      border: '1px solid var(--border-subtle-01)',
      color: 'var(--text-secondary)',
      font: 'var(--type-code-01)'
    }
  }, ch);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, btn(-1, '−'), /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-primary)',
      minWidth: 34,
      textAlign: 'center'
    }
  }, value, unit || ''), btn(1, '+'));
}
function WbField({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      minHeight: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)'
    }
  }, label), children);
}

/* ---------- main ---------- */
function WorkflowBuilder({
  setCli
}) {
  const [preset, setPreset] = React.useState('fanout');
  const [stages, setStages] = React.useState(WB_PRESETS.fanout.stages);
  const [dropAt, setDropAt] = React.useState(null);
  const [selected, setSelected] = React.useState(null); // node id
  const [edgeConds, setEdgeConds] = React.useState({}); // 'aId->bId' -> cond
  const [rev, setRev] = React.useState(1);
  const [compiledRev, setCompiledRev] = React.useState(null);
  const [deployedRev, setDeployedRev] = React.useState(null);
  const [yaml, setYaml] = React.useState(null);
  const counts = React.useRef({});
  const touch = () => {
    setRev(r => r + 1);
    setYaml(null);
  };
  const named = t => {
    if (t.label !== 'agent') return t.label;
    counts.current.agent = (counts.current.agent || 0) + 1;
    return `agent_${counts.current.agent}`;
  };
  const loadPreset = key => {
    setPreset(key);
    counts.current = {};
    setSelected(null);
    setEdgeConds({});
    setCompiledRev(null);
    setDeployedRev(null);
    setYaml(null);
    setStages(WB_PRESETS[key].stages());
    setRev(r => r + 1);
    setCli(WB_PRESETS[key].cli);
  };
  const addParallel = (t, si) => {
    const label = named(t);
    const n = wbNode(label, t.kind);
    setStages(ss => ss.map((s, i) => i === si && s.length < 4 ? [...s, n] : s));
    setSelected(n.id);
    touch();
    setCli(`arp wf add-node ${label} --branch-of step-${si + 1} --parallel`);
  };
  const addStage = (t, gi) => {
    const label = named(t);
    const n = wbNode(label, t.kind);
    setStages(ss => [...ss.slice(0, gi), [n], ...ss.slice(gi)]);
    setSelected(n.id);
    touch();
    setCli(`arp wf add-node ${label} --after step-${gi}`);
  };
  const removeNode = (si, id, label) => {
    setStages(ss => ss.map((s, i) => i === si ? s.filter(n => n.id !== id) : s).filter(s => s.length > 0));
    if (selected === id) setSelected(null);
    touch();
    setCli(`arp wf rm-node ${label}`);
  };
  const patchNode = (id, patch, cli) => {
    setStages(ss => ss.map(s => s.map(n => n.id === id ? {
      ...n,
      ...patch
    } : n)));
    touch();
    if (cli) setCli(cli);
  };
  const onDrop = (e, target) => {
    e.preventDefault();
    setDropAt(null);
    let t;
    try {
      t = JSON.parse(e.dataTransfer.getData('text/plain'));
    } catch (err) {
      return;
    }
    if (!t || !t.label) return;
    if (target.stage !== undefined) addParallel(t, target.stage);else addStage(t, target.gap);
  };
  const dragProps = (key, target) => ({
    onDragOver: e => {
      e.preventDefault();
      setDropAt(key);
    },
    onDragLeave: () => setDropAt(d => d === key ? null : d),
    onDrop: e => onDrop(e, target)
  });

  /* ---------- derived: nodes, edges, validation ---------- */
  const flat = stages.flat();
  const nodeCount = flat.length;
  const maxFan = Math.max(0, ...stages.map(s => s.length));
  const cost = flat.reduce((a, n) => a + (WB_COST[n.tier] || 0) * (1 + n.retries * 0.25), 0);
  const selNode = flat.find(n => n.id === selected) || null;
  const selStage = stages.findIndex(s => s.some(n => n.id === selected));
  const edges = [];
  stages.forEach((s, i) => {
    if (!stages[i + 1]) return;
    s.forEach(a => stages[i + 1].forEach(b => {
      const key = `${a.id}->${b.id}`;
      edges.push({
        key,
        a,
        b,
        cond: edgeConds[key] || 'on_success'
      });
    }));
  });
  const cycleEdge = (key, a, b) => {
    const next = WB_CONDS[(WB_CONDS.indexOf(edgeConds[key] || 'on_success') + 1) % WB_CONDS.length];
    setEdgeConds(m => ({
      ...m,
      [key]: next
    }));
    touch();
    setCli(`arp wf set-edge ${a.label}:${b.label} --when ${next}`);
  };
  const labels = flat.map(n => n.label);
  const dupes = labels.filter((l, i) => labels.indexOf(l) !== i);
  const placeholders = labels.filter(wbIsPlaceholder);
  const warnings = [];
  if (dupes.length) warnings.push(`duplicate node name: ${dupes[0]}`);
  if (placeholders.length) warnings.push(`${placeholders.length} node${placeholders.length > 1 ? 's' : ''} still placeholder-named (${placeholders[0]}…)`);
  stages.forEach((s, i) => {
    if (s.length > 1 && !(stages[i + 1] && stages[i + 1].some(n => n.kind === 'gate' || n.kind === 'core'))) {
      warnings.push(`step ${i + 1} fans out ×${s.length} with no verify gate after it`);
    }
    if (s.some(n => n.kind === 'orch') && !(stages[i + 1] && stages[i + 1].length > 1)) {
      warnings.push(`orchestrator at step ${i + 1} has no parallel agents to delegate to`);
    }
  });

  /* ---------- production steps rail ---------- */
  const graphValid = nodeCount >= 2 && warnings.length === 0;
  const steps = [{
    label: 'chart DAG',
    done: nodeCount >= 2,
    hint: 'drag node types onto the canvas'
  }, {
    label: 'name nodes',
    done: nodeCount > 0 && placeholders.length === 0 && dupes.length === 0,
    hint: 'rename placeholder agents in node config'
  }, {
    label: 'wire edges',
    done: edges.length > 0 && !warnings.some(w => w.includes('fan')),
    hint: 'set edge conditions · gate every fan-out'
  }, {
    label: 'configure',
    done: flat.every(n => n.tier === '—' || n.retries >= 1),
    hint: 'tier, retries, timeout per node'
  }, {
    label: 'validate',
    done: graphValid,
    hint: 'resolve all warnings'
  }, {
    label: 'compile',
    done: compiledRev === rev,
    hint: 'compile graph → YAML'
  }, {
    label: 'deploy',
    done: deployedRev === rev,
    hint: 'ship to the runtime'
  }];
  const activeStep = steps.findIndex(s => !s.done);

  /* ---------- compile / deploy ---------- */
  const compile = () => {
    if (!graphValid) {
      setCli('arp wf compile --strict   # blocked: fix validation first');
      return;
    }
    const lines = ['workflow: scenario_pricing', 'route: tiered', 'failover: true', 'telemetry: otel', 'nodes:'];
    flat.forEach(n => {
      const bits = [n.kind === 'core' ? 'core: true' : n.kind === 'gate' ? `quorum: ${n.quorum}` : `boundary: llm, tier: ${n.tier}`];
      if (n.retries) bits.push(`retries: ${n.retries}`);
      bits.push(`timeout: ${n.timeoutS}s`);
      lines.push(`  - ${n.label}:`.padEnd(22) + `{ ${bits.join(', ')} }`);
    });
    lines.push('edges:');
    edges.forEach(e => lines.push(`  - ${e.a.label} -> ${e.b.label}:`.padEnd(34) + e.cond));
    setYaml(lines.join('\n'));
    setCompiledRev(rev);
    setCli('arp wf compile scenario_pricing --strict');
  };
  const deploy = () => {
    if (compiledRev !== rev) return;
    setDeployedRev(rev);
    setCli('arp wf deploy scenario_pricing --canary 10%');
  };

  /* ---------- render bits ---------- */
  const gap = gi => /*#__PURE__*/React.createElement("div", _extends({
    key: `gap-${gi}`
  }, dragProps(`gap-${gi}`, {
    gap: gi
  }), {
    title: "Drop to add a sequential step",
    style: {
      alignSelf: 'stretch',
      width: 34,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'copy',
      background: dropAt === `gap-${gi}` ? 'var(--layer-02)' : 'transparent'
    }
  }), dropAt === `gap-${gi}` ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(2),
      color: 'var(--horizon-40)'
    }
  }, "+") : /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: 2,
      background: 'var(--border-subtle-01)'
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 'var(--spacing-05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: wbEyebrow
  }, "BUILDER"), Object.entries(WB_PRESETS).map(([key, p]) => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => loadPreset(key),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      padding: '3px 10px',
      ...wbMono(1),
      background: preset === key ? 'var(--layer-02)' : 'transparent',
      border: '1px solid var(--border-subtle-01)',
      boxShadow: preset === key ? 'inset 0 -2px 0 var(--horizon-40)' : 'none',
      color: preset === key ? 'var(--text-primary)' : 'var(--text-helper)'
    }
  }, p.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)',
      marginLeft: 'auto'
    }
  }, "rev ", rev, deployedRev === rev ? ' · deployed' : compiledRev === rev ? ' · compiled' : ' · draft')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      border: '1px solid var(--border-subtle-00)',
      background: 'var(--layer-01)',
      marginBottom: 10,
      overflowX: 'auto'
    }
  }, steps.map((s, i) => {
    const active = i === activeStep;
    return /*#__PURE__*/React.createElement("div", {
      key: s.label,
      title: s.hint,
      style: {
        flex: 1,
        minWidth: 92,
        padding: '6px 10px',
        borderRight: i < steps.length - 1 ? '1px solid var(--border-subtle-00)' : 'none',
        boxShadow: active ? 'inset 0 2px 0 var(--horizon-40)' : 'none',
        background: active ? 'var(--layer-02)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...wbMono(1),
        color: s.done ? 'var(--support-success)' : active ? 'var(--horizon-30)' : 'var(--text-helper)'
      }
    }, s.done ? '✓' : `0${i + 1}`), /*#__PURE__*/React.createElement("div", {
      style: {
        ...wbMono(1),
        color: s.done || active ? 'var(--text-primary)' : 'var(--text-helper)',
        whiteSpace: 'nowrap'
      }
    }, s.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 10,
      flexWrap: 'wrap'
    }
  }, WB_TYPES.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    draggable: true,
    onDragStart: e => e.dataTransfer.setData('text/plain', JSON.stringify(t)),
    title: `${t.hint} · drop on a step to run in parallel, between steps to run after`,
    style: {
      cursor: 'grab',
      padding: '5px 10px',
      background: 'var(--layer-01)',
      border: `1px dashed ${wbKindBorder(t.kind)}`,
      ...wbMono(1),
      color: wbKindColor(t.kind)
    }
  }, "\u283F ", t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      padding: 'var(--spacing-04)',
      overflowX: 'auto',
      border: '1px solid var(--border-subtle-00)',
      background: 'var(--void)',
      minHeight: 150
    }
  }, stages.map((s, si) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: si
  }, si > 0 ? gap(si) : null, /*#__PURE__*/React.createElement("div", _extends({}, dragProps(`stage-${si}`, {
    stage: si
  }), {
    title: "Drop to add a parallel branch",
    style: {
      flex: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 8,
      padding: 6,
      outline: dropAt === `stage-${si}` ? '1px dashed var(--horizon-40)' : 'none',
      background: dropAt === `stage-${si}` ? 'var(--layer-01)' : 'transparent'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)',
      textAlign: 'center'
    }
  }, "step ", si + 1, s.length > 1 ? ` · ∥×${s.length}` : ''), s.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    onClick: () => {
      setSelected(n.id);
      setCli(`arp wf show-node ${n.label}`);
    },
    style: {
      width: 148,
      background: selected === n.id ? 'var(--layer-02)' : 'var(--layer-01)',
      position: 'relative',
      border: '1px solid var(--border-subtle-01)',
      borderLeft: `3px solid ${wbKindBorder(n.kind)}`,
      outline: selected === n.id ? '1px solid var(--horizon-40)' : 'none',
      padding: '7px 20px 7px 10px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbEyebrow,
      color: wbKindColor(n.kind)
    }
  }, wbKindTag(n.kind)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-heading-01)',
      margin: '3px 0 2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: wbIsPlaceholder(n.label) ? 'var(--support-warning)' : 'var(--text-primary)'
    }
  }, n.label), n.tier === '—' ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)'
    }
  }, n.kind === 'gate' ? `quorum ${n.quorum}` : 'deterministic') : /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--link-primary)'
    }
  }, n.tier, " \xB7 r", n.retries, " \xB7 ", n.timeoutS, "s"), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      removeNode(si, n.id, n.label);
    },
    title: `Remove ${n.label}`,
    style: {
      position: 'absolute',
      top: 2,
      right: 6,
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-helper)',
      font: 'var(--type-code-02)',
      padding: 0
    }
  }, "\xD7"))), si > 0 && stages[si - 1].length > 1 && s.length === 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbMono(1),
      color: 'var(--teal-30)',
      textAlign: 'center'
    }
  }, "fan-in") : null, s.length > 1 ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbMono(1),
      color: 'var(--horizon-30)',
      textAlign: 'center'
    }
  }, "fan-out \xD7", s.length) : null))), gap(stages.length), stages.length === 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)',
      alignSelf: 'center'
    }
  }, "drop nodes here to chart a workflow") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 10,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle-00)',
      background: 'var(--layer-01)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbEyebrow,
      marginBottom: 8
    }
  }, "NODE CONFIG"), !selNode ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)'
    }
  }, "select a node on the canvas to name and configure it") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(WbField, {
    label: "name"
  }, /*#__PURE__*/React.createElement("input", {
    value: selNode.label,
    onChange: e => patchNode(selNode.id, {
      label: e.target.value.replace(/[^a-z0-9_]/gi, '_').toLowerCase()
    }),
    onBlur: e => setCli(`arp wf rename-node --id n${selNode.id} ${e.target.value}`),
    style: {
      width: 170,
      height: 24,
      background: 'var(--field-01)',
      color: wbIsPlaceholder(selNode.label) ? 'var(--support-warning)' : 'var(--text-primary)',
      border: '1px solid var(--border-subtle-01)',
      padding: '0 8px',
      font: 'var(--type-code-01)',
      outline: 'none'
    }
  })), /*#__PURE__*/React.createElement(WbField, {
    label: "kind"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: wbKindColor(selNode.kind)
    }
  }, wbKindTag(selNode.kind))), selNode.tier !== '—' ? /*#__PURE__*/React.createElement(WbField, {
    label: "model tier"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4
    }
  }, WB_TIERS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => patchNode(selNode.id, {
      tier: t
    }, `arp wf set-node ${selNode.label} --tier ${t.replace('tier-', '')}`),
    style: {
      appearance: 'none',
      cursor: 'pointer',
      padding: '2px 8px',
      ...wbMono(1),
      background: selNode.tier === t ? 'var(--layer-02)' : 'transparent',
      border: '1px solid var(--border-subtle-01)',
      boxShadow: selNode.tier === t ? 'inset 0 -2px 0 var(--horizon-40)' : 'none',
      color: selNode.tier === t ? 'var(--text-primary)' : 'var(--text-helper)'
    }
  }, t)))) : null, selNode.kind === 'gate' ? /*#__PURE__*/React.createElement(WbField, {
    label: "quorum"
  }, /*#__PURE__*/React.createElement(WbStepper, {
    value: selNode.quorum,
    min: 1,
    max: Math.max(1, selStage > 0 ? stages[selStage - 1].length : 4),
    onChange: v => patchNode(selNode.id, {
      quorum: v
    }, `arp wf set-node ${selNode.label} --quorum ${v}`)
  })) : null, /*#__PURE__*/React.createElement(WbField, {
    label: "retries"
  }, /*#__PURE__*/React.createElement(WbStepper, {
    value: selNode.retries,
    max: 3,
    onChange: v => patchNode(selNode.id, {
      retries: v
    }, `arp wf set-node ${selNode.label} --retries ${v}`)
  })), /*#__PURE__*/React.createElement(WbField, {
    label: "timeout"
  }, /*#__PURE__*/React.createElement(WbStepper, {
    value: selNode.timeoutS,
    min: 1,
    max: 120,
    unit: "s",
    onChange: v => patchNode(selNode.id, {
      timeoutS: v
    }, `arp wf set-node ${selNode.label} --timeout ${v}s`)
  })), selNode.tier !== '—' ? /*#__PURE__*/React.createElement(WbField, {
    label: "est cost / run"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-highlight)'
    }
  }, "$", ((WB_COST[selNode.tier] || 0) * (1 + selNode.retries * 0.25)).toFixed(3))) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border-subtle-00)',
      background: 'var(--layer-01)',
      padding: '10px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wbEyebrow,
      marginBottom: 8
    }
  }, "EDGES \xB7 ", edges.length), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      maxHeight: 168,
      overflowY: 'auto'
    }
  }, edges.length === 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)'
    }
  }, "add a second step to create edges") : null, edges.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.key,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-secondary)',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, e.a.label, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-helper)'
    }
  }, "\u2192"), " ", e.b.label), /*#__PURE__*/React.createElement("button", {
    onClick: () => cycleEdge(e.key, e.a, e.b),
    title: "Cycle edge condition",
    style: {
      appearance: 'none',
      cursor: 'pointer',
      padding: '1px 8px',
      background: 'transparent',
      border: '1px solid var(--border-subtle-01)',
      ...wbMono(1),
      color: WB_CONDC[e.cond]
    }
  }, e.cond)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'baseline',
      marginTop: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-secondary)'
    }
  }, stages.length, " steps \xB7 ", nodeCount, " nodes \xB7 ", edges.length, " edges \xB7 max fan-out \xD7", maxFan, " \xB7 est $", cost.toFixed(3), " / run"), warnings.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      ...wbMono(1),
      color: 'var(--support-warning)'
    }
  }, "\u26A0 ", w)), warnings.length === 0 && nodeCount >= 2 ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--support-success)'
    }
  }, "\u2713 valid DAG \xB7 named \xB7 gated \xB7 configured") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: compile,
    disabled: !graphValid,
    style: {
      appearance: 'none',
      cursor: graphValid ? 'pointer' : 'not-allowed',
      padding: '6px 14px',
      background: graphValid ? 'var(--background-brand)' : 'var(--layer-02)',
      border: 'none',
      font: 'var(--type-code-01)',
      fontWeight: 600,
      color: graphValid ? 'var(--text-on-color)' : 'var(--text-disabled)'
    }
  }, "Compile"), /*#__PURE__*/React.createElement("button", {
    onClick: deploy,
    disabled: compiledRev !== rev || deployedRev === rev,
    style: {
      appearance: 'none',
      cursor: compiledRev === rev && deployedRev !== rev ? 'pointer' : 'not-allowed',
      padding: '5px 14px',
      background: 'transparent',
      border: '1px solid var(--border-subtle-01)',
      font: 'var(--type-code-01)',
      color: compiledRev === rev && deployedRev !== rev ? 'var(--text-primary)' : 'var(--text-disabled)'
    }
  }, "Deploy \xB7 canary 10%"), deployedRev === rev ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--support-success)'
    }
  }, "\u2713 deployed rev ", rev, " \xB7 canary healthy") : compiledRev === rev ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--support-success)'
    }
  }, "\u2713 compiled \xB7 ", nodeCount, " nodes \xB7 ", edges.length, " edges \xB7 0 errors") : /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)'
    }
  }, graphValid ? 'compile to generate YAML' : 'fix validation to unlock compile')), yaml ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      border: '1px solid var(--border-subtle-00)',
      background: 'var(--void)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 12px',
      borderBottom: '1px solid var(--border-subtle-00)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...wbMono(1),
      color: 'var(--text-helper)',
      flex: 1
    }
  }, "scenario_pricing.yaml \xB7 compiled rev ", compiledRev), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (navigator.clipboard) navigator.clipboard.writeText(yaml);
      setCli('arp wf export scenario_pricing --format yaml');
    },
    style: {
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      ...wbMono(1),
      color: 'var(--link-primary)'
    }
  }, "copy")), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      padding: '10px 12px',
      font: 'var(--type-code-01)',
      color: 'var(--text-secondary)',
      overflowX: 'auto',
      maxHeight: 220
    }
  }, yaml)) : null);
}
Object.assign(window, {
  WorkflowBuilder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/arp/workflow-builder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/screens.jsx
try { (() => {
/* Console portfolio — UI kit screens.
   Composes design-system primitives from the compiled bundle. */
const {
  Button,
  IconButton,
  Tile,
  Tag,
  Tabs,
  CodeSnippet,
  InlineNotification,
  Tooltip
} = window.ConsoleDesignSystem_e08854;
const IC = '../../assets/icons';
const inv = {
  filter: 'invert(96%)'
};

/* ---------- data ---------- */
const SYSTEMS = [{
  id: 'executionkit',
  tier: 'l1',
  eyebrow: 'L1 · PRIMITIVES',
  name: 'ExecutionKit',
  blurb: 'Provider-agnostic LLM execution primitives — consensus, ReAct, budget-aware calls. Zero runtime dependencies.',
  stack: ['python', '0 deps'],
  stats: [['tests', '312'], ['providers', '6'], ['deps', '0']],
  code: {
    title: 'consensus.py',
    text: `def consensus(calls: list[Call], quorum: int = 3) -> Result:\n    votes = execute_parallel(calls, budget=0.02)\n    return tally(votes, quorum)`
  }
}, {
  id: 'runtime',
  tier: 'l2',
  eyebrow: 'L2 · PLATFORM',
  name: 'Agentic Runtime Platform',
  blurb: 'Multi-agent orchestration. YAML workflows compile to DAGs; tiered model routing with failover; every span lands in OpenTelemetry.',
  stack: ['python', 'otel'],
  stats: [['p95', '340ms'], ['failover', '<2s'], ['spans/run', '1.4k']],
  code: {
    title: 'workflow.yaml',
    text: `route: tiered\nfailover: true\ntelemetry: otel\nagents:\n  - plan\n  - execute\n  - verify`
  }
}, {
  id: 'scenario',
  tier: 'l3',
  eyebrow: 'L3 · APPLIED',
  name: 'Financial Scenario Engine',
  blurb: 'Deterministic TypeScript engine. The LLM only parses intent and narrates — never in the critical path.',
  stack: ['typescript', 'deterministic'],
  stats: [['tests', '147'], ['llm in core', '0'], ['reproducible', '100%']],
  code: {
    title: 'engine.ts',
    text: `const result = engine.run(scenario); // pure, typed\nconst prose = llm.narrate(result);   // boundary only`
  }
}, {
  id: 'decks',
  tier: 'l3',
  eyebrow: 'L3 · COMMS',
  name: 'Architecture Deck System',
  blurb: 'React/Vite presentation platform. Diagrams are code; every deck builds from the same tokens.',
  stack: ['react', 'vite'],
  stats: [['decks', '14'], ['build', '1.8s'], ['tokens', '171']],
  code: {
    title: 'slide.tsx',
    text: `<Slide layout="comparison">\n  <Diagram src={dag} />\n</Slide>`
  }
}, {
  id: 'academy',
  tier: 'l3',
  eyebrow: 'L3 · COMMS',
  name: 'QA Automation Academy',
  blurb: 'Playwright + Copilot curriculum. Tests are the teaching material; every lesson runs green in CI.',
  stack: ['playwright', 'ci'],
  stats: [['lessons', '24'], ['flakes/wk', '0'], ['cohorts', '3']],
  code: {
    title: 'lesson-07.spec.ts',
    text: `test('checkout survives provider timeout', async ({ page }) => {\n  await expect(fallback).toBeVisible();\n});`
  }
}];

/* ---------- chrome ---------- */
function Wordmark() {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      font: '600 1rem/1 var(--font-mono)',
      color: 'var(--text-primary)',
      textDecoration: 'none',
      letterSpacing: '-0.3px',
      display: 'inline-flex'
    }
  }, "console", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--horizon-40)'
    }
  }, "\u258A"));
}
function Header({
  view,
  onNav
}) {
  const item = (label, target, active) => /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(target);
    },
    style: {
      font: 'var(--type-label-01)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: active ? 'var(--text-primary)' : 'var(--text-helper)',
      textDecoration: 'none',
      padding: '0 var(--spacing-05)',
      height: 48,
      display: 'inline-flex',
      alignItems: 'center',
      boxShadow: active ? 'inset 0 -2px 0 var(--horizon-40)' : 'none'
    }
  }, label);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-06)',
      padding: '0 var(--spacing-06)',
      background: 'rgba(0,0,0,0.85)',
      borderBottom: '1px solid var(--border-subtle-00)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      height: 48
    }
  }, item('Systems', 'home', view === 'home' || view === 'detail'), item('Stance', 'stance', view === 'stance')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    text: "github.com/tafreeman"
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "GitHub"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/launch.svg`,
    style: inv,
    alt: ""
  }))), /*#__PURE__*/React.createElement(IconButton, {
    label: "Search"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/search.svg`,
    style: inv,
    alt: ""
  }))));
}

/* ---------- home ---------- */
function Hero({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: 520,
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/hero-cinematic.jpg",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--gradient-scrim)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      padding: 'var(--spacing-12) var(--spacing-10) var(--spacing-10)',
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label-01)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--horizon-30)',
      marginBottom: 'var(--spacing-05)'
    }
  }, "ANDY FREEMAN \xB7 @TAFREEMAN \xB7 AI ENGINEERING"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-display-01)',
      letterSpacing: 'var(--tracking-display)',
      margin: 0,
      color: 'var(--text-primary)'
    }
  }, "Deterministic core.", /*#__PURE__*/React.createElement("br", null), "LLM at the boundary."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-body-02)',
      color: 'var(--text-secondary)',
      maxWidth: 560,
      margin: 'var(--spacing-06) 0 var(--spacing-07)'
    }
  }, "Five systems, layered L1\u2192L3 \u2014 from zero-dependency execution primitives to applied engines. Precise, typed, reproducible. Nothing decorative that isn't tokenized."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-04)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/arrow--right.svg`,
      alt: ""
    }),
    onClick: () => onNav('detail', 'executionkit')
  }, "Explore the systems"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Read the stance"))));
}
function HorizonRule() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--gradient-horizon)',
      margin: '0 var(--spacing-10)'
    }
  });
}
function SystemsIndex({
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--background)',
      padding: 'var(--spacing-11) var(--spacing-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 'var(--spacing-07)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: 'var(--type-heading-06)',
      margin: 0
    }
  }, "Systems"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-code-01)',
      color: 'var(--text-helper)'
    }
  }, "5 systems \xB7 3 tiers \xB7 one language")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'var(--spacing-05)'
    }
  }, SYSTEMS.map(s => /*#__PURE__*/React.createElement(Tile, {
    key: s.id,
    tier: s.tier,
    eyebrow: s.eyebrow,
    onClick: () => onOpen(s.id)
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: 'var(--type-heading-03)',
      margin: '0 0 var(--spacing-03)'
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--spacing-05)',
      color: 'var(--text-secondary)'
    }
  }, s.blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, s.stack.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    color: s.tier === 'l1' ? 'gray' : s.tier === 'l2' ? 'teal' : 'green'
  }, t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px dashed var(--border-subtle-01)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 160,
      font: 'var(--type-code-01)',
      color: 'var(--text-helper)'
    }
  }, "next system loading\u2026")));
}
function Stance() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--void)',
      padding: 'var(--spacing-11) var(--spacing-10)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--spacing-10)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label-01)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: 'var(--text-helper)',
      marginBottom: 'var(--spacing-05)'
    }
  }, "THE STANCE"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: 'var(--type-quotation)',
      color: 'var(--text-primary)',
      margin: 0,
      maxWidth: '26ch'
    }
  }, "\u201CThe LLM sits at the interface boundary \u2014 never in the critical path.\u201D")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-04)'
    }
  }, [['Deterministic', 'Same input, same output. The core is pure and fully tested.'], ['Typed', 'Contracts everywhere — YAML schemas, TS types, Python protocols.'], ['Reproducible', 'Every run has a trace; every trace replays.']].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 'var(--spacing-05)',
      borderTop: '1px solid var(--border-subtle-00)',
      paddingTop: 'var(--spacing-04)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-code-02)',
      color: 'var(--text-highlight)',
      width: 140,
      flex: 'none'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, d)))));
}

/* ---------- detail ---------- */
function SystemDetail({
  system,
  onBack,
  onOpen
}) {
  const s = system;
  const idx = SYSTEMS.findIndex(x => x.id === s.id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--background)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--spacing-07) var(--spacing-10) 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: 0,
      font: 'var(--type-code-01)',
      color: 'var(--link-primary)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IC}/arrow--left.svg`,
    style: {
      width: 14,
      height: 14,
      filter: 'invert(59%) sepia(75%) saturate(1500%) hue-rotate(177deg)'
    },
    alt: ""
  }), "all systems"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginTop: 'var(--spacing-06)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-label-01)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: `var(--tier-${s.tier})`,
      marginBottom: 'var(--spacing-03)'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--type-heading-06)',
      margin: 0
    }
  }, s.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-04)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/launch.svg`,
      style: inv,
      alt: ""
    })
  }, "View source"), /*#__PURE__*/React.createElement(Button, {
    icon: /*#__PURE__*/React.createElement("img", {
      src: `${IC}/play.svg`,
      alt: ""
    })
  }, "Run demo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-08)',
      margin: 'var(--spacing-06) 0'
    }
  }, s.stats.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-heading-05)',
      fontFamily: 'var(--font-mono)',
      color: 'var(--text-primary)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-code-01)',
      color: 'var(--text-helper)'
    }
  }, k))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--spacing-10) var(--spacing-10)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: [{
      label: 'Overview',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 'var(--spacing-07)',
          paddingTop: 'var(--spacing-04)'
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        style: {
          font: 'var(--type-body-02)',
          color: 'var(--text-secondary)',
          margin: '0 0 var(--spacing-06)',
          maxWidth: '58ch'
        }
      }, s.blurb), /*#__PURE__*/React.createElement(InlineNotification, {
        kind: "success",
        title: "CI green",
        subtitle: "last run 14m ago \xB7 all suites",
        iconBase: IC
      })), /*#__PURE__*/React.createElement(CodeSnippet, {
        title: s.code.title,
        code: s.code.text,
        copyIconSrc: `${IC}/copy.svg`
      }, s.code.text))
    }, {
      label: 'Architecture',
      content: /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          paddingTop: 'var(--spacing-04)',
          color: 'var(--text-secondary)',
          maxWidth: '64ch'
        }
      }, "Deterministic, fully-tested core. The LLM sits at the interface boundary \u2014 parsing intent on the way in, narrating results on the way out \u2014 and never in the critical path.")
    }, {
      label: 'Runs',
      content: /*#__PURE__*/React.createElement("div", {
        style: {
          paddingTop: 'var(--spacing-04)',
          display: 'flex',
          flexDirection: 'column'
        }
      }, [['run_0412', 'PASSING', 'green', '14m ago', '340ms'], ['run_0411', 'PASSING', 'green', '2h ago', '355ms'], ['run_0410', 'FAILED', 'red', '6h ago', 'timeout → failover']].map(([id, st, c, when, meta]) => /*#__PURE__*/React.createElement("div", {
        key: id,
        style: {
          display: 'grid',
          gridTemplateColumns: '160px 120px 1fr 120px',
          alignItems: 'center',
          height: 44,
          borderBottom: '1px solid var(--border-subtle-00)',
          font: 'var(--type-code-02)'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-primary)'
        }
      }, id), /*#__PURE__*/React.createElement(Tag, {
        color: c,
        dot: true
      }, st), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-helper)'
        }
      }, meta), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-helper)',
          textAlign: 'right'
        }
      }, when))))
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-subtle-00)',
      padding: 'var(--spacing-05) var(--spacing-10)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, idx > 0 ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onOpen(SYSTEMS[idx - 1].id)
  }, "\u2190 ", SYSTEMS[idx - 1].name) : /*#__PURE__*/React.createElement("span", null), idx < SYSTEMS.length - 1 ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => onOpen(SYSTEMS[idx + 1].id)
  }, SYSTEMS[idx + 1].name, " \u2192") : /*#__PURE__*/React.createElement("span", null)));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--void)',
      borderTop: '1px solid var(--border-subtle-00)',
      padding: 'var(--spacing-06) var(--spacing-10)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--type-code-01)',
      color: 'var(--text-helper)'
    }
  }, "\xA9 2026 Andy Freeman \xB7 built from tokens, not taste"));
}

/* ---------- app ---------- */
function App() {
  const [view, setView] = React.useState('home');
  const [systemId, setSystemId] = React.useState(null);
  const open = id => {
    setSystemId(id);
    setView('detail');
    window.scrollTo(0, 0);
  };
  const nav = (target, id) => {
    if (target === 'detail' && id) return open(id);
    setView(target === 'stance' ? 'stance' : 'home');
    window.scrollTo(0, 0);
  };
  const system = SYSTEMS.find(s => s.id === systemId);
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": view === 'detail' ? `System detail — ${system && system.name}` : view === 'stance' ? 'Stance' : 'Home'
  }, /*#__PURE__*/React.createElement(Header, {
    view: view,
    onNav: nav
  }), view === 'detail' && system ? /*#__PURE__*/React.createElement(SystemDetail, {
    system: system,
    onBack: () => setView('home'),
    onOpen: open
  }) : view === 'stance' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stance, null), /*#__PURE__*/React.createElement(HorizonRule, null), /*#__PURE__*/React.createElement(SystemsIndex, {
    onOpen: open
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(HorizonRule, null), /*#__PURE__*/React.createElement(SystemsIndex, {
    onOpen: open
  }), /*#__PURE__*/React.createElement(Stance, null)), /*#__PURE__*/React.createElement(Footer, null));
}
({render:function(){/* console-ds: demo kit auto-render disabled when vendored as a library */}}).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.CodeSnippet = __ds_scope.CodeSnippet;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Tile = __ds_scope.Tile;

__ds_ns.InlineNotification = __ds_scope.InlineNotification;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.Toggle = __ds_scope.Toggle;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
