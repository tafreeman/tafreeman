## Andy Freeman

Enterprise software architect and engineering manager focused on production AI systems for
federal and regulated environments. I build and ship multi-agent orchestration platforms,
LLM evaluation frameworks, and developer tooling — and use those same repos to onboard
Deloitte engineers into applied AI engineering.

---

### What I'm building

**[Agentic Runtimes](https://github.com/tafreeman/agentic-runtimes)** — A production-grade
multi-agent workflow engine. DAG-based execution (Kahn's algorithm), tiered model routing
with circuit breakers across 8+ providers, rubric-based LLM evaluation, and a React 19
live dashboard. ~187K lines of Python, 379 tests, 17 ADRs. Zero-credential dev mode for
fast onboarding.

**[ExecutionKit](https://github.com/tafreeman/executionkit)** — Composable LLM reasoning
patterns: consensus voting, iterative refinement, ReAct tool loops. Works with any
OpenAI-compatible endpoint. Zero SDK dependencies.

**[Midnight Automation Voyage](https://github.com/tafreeman/midnight-automation-voyage)** —
Guided Playwright learning modules with AI-assisted test generation. Used for developer
upskilling programs.

---

### Stack

![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?logo=langchain&logoColor=white)
![OpenTelemetry](https://img.shields.io/badge/OpenTelemetry-000000?logo=opentelemetry)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

---

### Current focus

Evaluation rigor for agentic systems — specifically, how to gate production deployments on
rubric-scored, multi-dimensional LLM output quality rather than pass/fail unit tests.
Sprint B just shipped: mypy --strict across the full monorepo, SLO p95 gate hardened,
and automated Python↔TypeScript wire-format drift detection.
