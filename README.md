<!--
  Profile README for tafreeman/tafreeman.
  CONSTRAINTS (GitHub-Flavored Markdown): no <style>, external CSS, JSX, or JS
  executes here, and custom fonts (JetBrains Mono) do NOT render. The design
  system is therefore applied through (1) shields.io badge colors (?color=d97757,
  the ember accent), (2) committed on-brand SVG/PNG header art, and (3) layout via
  tables / <div align> / <picture>. React components from the live site cannot be
  embedded — the live, fully-styled experience is at https://tafreeman.github.io/.
  REAL DATA ONLY: no hardcoded star/fork/commit counts; live numbers come from
  dynamic badges or are omitted.
-->

<div align="center">

[![tafreeman — production-grade AI engineering systems](social-previews/hero-vector.png)](https://tafreeman.github.io/)

# Andy Freeman · `@tafreeman`

**Principal AI & Software Engineering Architect** · he / him

![Available](https://img.shields.io/badge/available-senior_AI_architecture_·_Q3_2026-d97757?style=flat-square)
![Based](https://img.shields.io/badge/Mobile,_AL_→_Lake_Mary,_FL-101018?style=flat-square)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-andy--freeman--architect-d97757?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andy-freeman-architect/)
[![Email](https://img.shields.io/badge/email-tandfreeman@gmail.com-101018?style=flat-square&logo=gmail&logoColor=d97757)](mailto:tandfreeman@gmail.com)

</div>

---

> **Production-grade AI engineering systems, shipped with the discipline of platform infrastructure.**

Architect of **six interconnected repositories** spanning reusable LLM execution primitives, multi-agent orchestration platforms, deterministic business apps with AI interfaces, QA enablement, and architecture communication tooling. Built on a foundation of enterprise and federal systems delivery, now focused on AI-native architecture — systems that pair deterministic, auditable cores with LLM-driven interfaces.

**Start here:** [Agentic Runtime Platform](https://tafreeman.github.io/agentic-runtime-platform/) (the platform) → [ExecutionKit](https://tafreeman.github.io/executionkit/) (the primitive layer) → [Financial Scenario Engine](https://tafreeman.github.io/financial-scenario-engine/) (an applied example).

## The architecture, in one diagram

Every project follows the same pattern — a deterministic, fully-tested core insulated from the non-determinism of LLMs, which sit at the interface boundary rather than in the critical path:

```mermaid
flowchart LR
    User(["User · natural language"])

    subgraph Iface["LLM Interface Layer — the boundary"]
        direction TB
        I1["NLU + generation"]
        I2["structured output · tool-calling"]
    end

    subgraph Core["Deterministic Core — the center"]
        direction TB
        C1["pure · typed · fully tested logic"]
        C2["no LLM in the critical path"]
    end

    Obs[("Observability")]

    User --> Iface
    Iface -->|"typed, validated calls"| Core
    Core -->|"typed result"| Iface
    Iface --> User
    Core -->|"structured logs, traces, reproducible runs"| Obs
```

## The six systems

Each repository has its own styled GitHub Pages site (links below). All are public; none are archived.

| System | What it is | Stack | Live |
|---|---|---|---|
| **[Agentic Runtime Platform](https://tafreeman.github.io/agentic-runtime-platform/)** · `PLATFORM` | Multi-agent orchestration — declarative YAML workflows compiled to executable DAGs, tiered model routing across 8+ providers, failover, evaluation, and live observability. | Python | [docs ↗](https://tafreeman.github.io/agentic-runtime-platform/) · [repo ↗](https://github.com/tafreeman/agentic-runtime-platform) |
| **[ExecutionKit](https://tafreeman.github.io/executionkit/)** · `LIBRARY` | Provider-agnostic LLM execution primitives — consensus, refinement, ReAct tool loops, structured output, budget-aware calls. Zero runtime dependencies. | Python | [docs ↗](https://tafreeman.github.io/executionkit/) · [repo ↗](https://github.com/tafreeman/executionkit) |
| **[Financial Scenario Engine](https://tafreeman.github.io/financial-scenario-engine/)** · `APPLIED AI` | Local-first project finance — a deterministic TypeScript engine produces every number; the LLM only parses intent and narrates. SQLite-backed, GitHub Models or local Ollama. | TypeScript | [site ↗](https://tafreeman.github.io/financial-scenario-engine/) · [repo ↗](https://github.com/tafreeman/financial-scenario-engine) |
| **[Architecture Deck System](https://tafreeman.github.io/architecture-deck-system/)** · `COMMUNICATION` | React 19 + Vite presentation platform — 34 layouts across 8 families, 15 themes × 4 style modes, runtime content-pack swapping, Storybook, and HTML/image/PDF export. | TypeScript | [site ↗](https://tafreeman.github.io/architecture-deck-system/) · [repo ↗](https://github.com/tafreeman/architecture-deck-system) |
| **[QA Automation Academy](https://tafreeman.github.io/qa-automation-academy/)** · `ENABLEMENT` | Playwright + GitHub Copilot training — 53 interactive modules, a practice app with intentional bugs, and 59 reference specs moving QA teams from manual to automated testing. | TypeScript | [docs ↗](https://tafreeman.github.io/qa-automation-academy/) · [repo ↗](https://github.com/tafreeman/qa-automation-academy) |
| **[Agentic Systems Lab](https://github.com/tafreeman/agentic-systems-lab)** · `R&D` | Research and prototyping companion to the runtime platform — runnable examples, security-hardening sprints, evaluation patterns, and orchestration ideas before they upstream. | Python | [repo ↗](https://github.com/tafreeman/agentic-systems-lab) |

<sub>Live repo signal (updates automatically — no hardcoded counts):</sub>

[![arp last commit](https://img.shields.io/github/last-commit/tafreeman/agentic-runtime-platform?label=arp&color=d97757&style=flat-square)](https://github.com/tafreeman/agentic-runtime-platform)
[![ek last commit](https://img.shields.io/github/last-commit/tafreeman/executionkit?label=executionkit&color=d97757&style=flat-square)](https://github.com/tafreeman/executionkit)
[![fse last commit](https://img.shields.io/github/last-commit/tafreeman/financial-scenario-engine?label=fse&color=d97757&style=flat-square)](https://github.com/tafreeman/financial-scenario-engine)
[![ads last commit](https://img.shields.io/github/last-commit/tafreeman/architecture-deck-system?label=deck-system&color=d97757&style=flat-square)](https://github.com/tafreeman/architecture-deck-system)
[![qaa last commit](https://img.shields.io/github/last-commit/tafreeman/qa-automation-academy?label=qa-academy&color=d97757&style=flat-square)](https://github.com/tafreeman/qa-automation-academy)
[![asl last commit](https://img.shields.io/github/last-commit/tafreeman/agentic-systems-lab?label=systems-lab&color=d97757&style=flat-square)](https://github.com/tafreeman/agentic-systems-lab)

## How they compose

Primitives flow upward into platforms; platforms emit telemetry into research and communication surfaces:

- **L1 · Primitives** — `ExecutionKit` (consensus · ReAct · budget-aware calls)
- **L2 · Platform** — `Agentic Runtime Platform` (DAG · routing · failover · observability)
- **L3 · Communication + Applied** — `Architecture Deck System`, `Financial Scenario Engine`, `QA Automation Academy`
- **L0 · R&D** — `Agentic Systems Lab` (security · evals · prototypes upstreamed into the platform)

The interactive, fully-styled version of this graph lives on the portfolio site → **[tafreeman.github.io](https://tafreeman.github.io/)**

---

<div align="center">

**Open to Principal / Staff AI engineering and AI solutions-architecture roles.**

Reach me at **[tandfreeman@gmail.com](mailto:tandfreeman@gmail.com)** or on **[LinkedIn](https://www.linkedin.com/in/andy-freeman-architect/)**.

</div>
