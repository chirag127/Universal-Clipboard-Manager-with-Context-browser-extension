<div align="center">
  <img src="https://raw.githubusercontent.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/main/assets/clipcontext-logo.svg" alt="ClipContext Logo" width="180">
  <h1>ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension</h1>
  <p>An intelligent, AI-powered browser extension offering a persistent, searchable, and context-aware clipboard history.</p>

  <p>
    <!-- Build Status -->
    <a href="https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/actions/workflows/ci.yml">
      <img src="https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/actions/workflows/ci.yml/badge.svg?branch=main&event=push" alt="Build Status" style="max-width: 100%;">
    </a>
    <!-- Code Coverage -->
    <a href="https://codecov.io/gh/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension">
      <img src="https://codecov.io/gh/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/branch/main/graph/badge.svg" alt="Code Coverage" style="max-width: 100%;">
    </a>
    <!-- Top Language -->
    <img src="https://img.shields.io/github/languages/top/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension?style=flat-square" alt="Top Language" style="max-width: 100%;">
    <!-- Tech Stack -->
    <img src="https://img.shields.io/badge/Stack-TS%20%7C%20Vite%20%7C%20WXT%20%7C%20TailwindCSS-2E8B57?style=flat-square" alt="Tech Stack" style="max-width: 100%;">
    <!-- Linter -->
    <img src="https://img.shields.io/badge/Lint/Format-Biome-0E76FD?style=flat-square" alt="Linter/Formatter" style="max-width: 100%;">
    <!-- Test Frameworks -->
    <img src="https://img.shields.io/badge/Tests-Vitest%20%7C%20Playwright-B74106?style=flat-square" alt="Test Frameworks" style="max-width: 100%;">
    <!-- AI Integration -->
    <img src="https://img.shields.io/badge/AI-Gemini%20Pro-F4C202?style=flat-square" alt="AI Integration" style="max-width: 100%;">
    <!-- License -->
    <a href="https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-blue.svg?style=flat-square" alt="License" style="max-width: 100%;">
    </a>
  </p>

  <p>
    <a href="https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/stargazers">
      <img src="https://img.shields.io/github/stars/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension?style=social" alt="GitHub Stars">
    </a>
    <br>
    Star ⭐ this Repo! Your support fuels innovation.
  </p>
</div>

---

## 🚀 Overview: The AI-Powered Clipboard Reinvented

ClipContext is an intelligent, AI-powered browser extension designed to revolutionize your clipboard experience. It provides a persistent, searchable, and context-aware history of everything you copy, enhancing productivity by leveraging advanced AI to categorize content, automatically record source URLs and titles, and facilitate effortless retrieval and management. Built on the bleeding-edge 2026 Apex Tech Stack, ClipContext ensures unparalleled performance, security, and user experience.

## ✨ Core Features

*   **AI-Powered Categorization:** Automatically classifies copied content (code, links, text, images) using Gemini Pro.
*   **Context-Aware History:** Records source URL, title, and timestamp for every clip.
*   **Persistent & Searchable:** Never lose a clip again; quickly find what you need with robust search and filtering.
*   **Smart Suggestions:** Proactive AI suggestions for reusing relevant clips based on your current browsing context.
*   **Secure & Private:** Local-first storage with optional cloud sync, ensuring your data remains private and encrypted.
*   **Manifest V3 Compliant:** Future-proof architecture designed for the latest browser extension standards.
*   **Liquid Glass UI:** Modern, intuitive, and highly performant user interface with fluid animations.

## 🏗️ Architecture: Feature-Sliced Design (FSD)

ClipContext employs the Feature-Sliced Design (FSD) methodology, ensuring a highly modular, scalable, and maintainable codebase. This architecture promotes clear separation of concerns, improves development velocity, and simplifies testing.


.
├── extension/                 # Root for the browser extension (WXT build target)
│   ├── public/                # Static assets
│   ├── src/                   # Source code following FSD principles
│   │   ├── app/               # Global configuration, routing, and providers
│   │   │   ├── index.ts
│   │   │   └── providers/
│   │   ├── pages/             # Entry points for different extension pages (popup, options, devtools)
│   │   │   ├── popup/
│   │   │   ├── options/
│   │   │   └── devtools/
│   │   ├── widgets/           # Composed UI blocks from features and entities
│   │   │   ├── clip-list/
│   │   │   └── search-bar/
│   │   ├── features/          # Self-contained business logic (e.g., ai-categorization, clipboard-sync)
│   │   │   ├── ai-categorization/
│   │   │   ├── clipboard-management/
│   │   │   └── smart-suggestions/
│   │   ├── entities/          # Business entities, UI components, data models (e.g., clip, user, settings)
│   │   │   ├── clip/
│   │   │   ├── user/
│   │   │   └── ui/
│   │   ├── shared/            # Reusable utilities, UI kit, API wrappers
│   │   │   ├── api/
│   │   │   ├── lib/
│   │   │   └── ui/
│   │   └── processes/         # Orchestration of features and entities for complex user flows
│   │       └── background-script-orchestration/
│   ├── tests/                 # Dedicated directory for all tests (Unit, E2E)
│   │   ├── unit/
│   │   └── e2e/
│   └── wxt.config.ts          # WXT configuration
├── .github/                   # GitHub Actions workflows and community templates
├── assets/                    # Project assets (logo, screenshots)
├── .biome.json                # Biome configuration
├── biome.json                 # Biome configuration for root
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration (if applicable for some parts)
└── ...


## 📝 Table of Contents

*   [🚀 Overview: The AI-Powered Clipboard Reinvented](#--overview-the-ai-powered-clipboard-reinvented)
*   [✨ Core Features](#-core-features)
*   [🏗️ Architecture: Feature-Sliced Design (FSD)](#%EF%B8%8F-architecture-feature-sliced-design-fsd)
*   [📝 Table of Contents](#-table-of-contents)
*   [🤖 AI Agent Directives](#-ai-agent-directives)
*   [🛠️ Development Setup](#%EF%B8%8F-development-setup)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Running Locally](#running-locally)
    *   [Build for Production](#build-for-production)
*   [📜 Available Scripts](#-available-scripts)
*   [🛡️ Principles & Standards](#%EF%B8%8F-principles--standards)
*   [🤝 Contributing](#-contributing)
*   [©️ License](#%C2%A9%EF%B8%8F-license)

---

## 🤖 AI Agent Directives

<details>
<summary>⚡️ Click to Expand: Core Directives for Autonomous Agents (2026 Standard)</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

## 2. INPUT PROCESSING & COGNITION
* **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    * **Context:** User inputs may contain phonetic errors (homophones, typos).
    * **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    * **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
* **MANDATORY MCP INSTRUMENTATION:**
    * **No Guessing:** Do not hallucinate APIs.
    * **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    * **Validation:** Use `docfork` to verify *every* external API signature.
    * **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** This project is a **Web Extension** built with TypeScript.
* **SCENARIO A: WEB EXTENSION (TypeScript)**
    * **Stack:** **TypeScript 6.x** (Strict), **Vite 7** (Rolldown for build optimization), **WXT v0.17+** (Browser Extension Framework), **TailwindCSS v4.x** (Atomic CSS).
    * **State Management:** **Signals** (Standardized via `signals/preact` or similar).
    * **Lint/Test:** **Biome** (Speed, Linter/Formatter/Bundler) + **Vitest** (Unit/Integration Testing) + **Playwright** (End-to-End Testing).
    * **AI Integration:** **Gemini-3-Pro** for advanced natural language understanding and categorization.

---

## 4. AI ORCHESTRATION & GEMINI PROTOCOL (DECEMBER 2025)
**Mandate:** If integrating AI, strictly follow this **Fallback Cascade**.
* **Tier 1 (Intelligence):** `gemini-3-pro` (Stable Dec 2025) - Multimodal Reasoning (Primary).
* **Tier 2 (Reasoning):** `gemini-2.5-pro` (Legacy Stable) - Deep analysis/STEM (Fallback).
* **Tier 3 (Balanced):** `gemini-2.5-flash` - High Volume/Low Latency (Fallback for speed).
* **Tier 4 (Speed):** `gemini-2.5-flash-lite` - Cost-efficiency (Last resort).
* **Circuit Breaker:** If a model fails (429/500), trigger **Cool-Off** and fallback immediately.

---

## 5. RECURSIVE PERFECTION LOOP (THE "ZERO-ERROR" MANDATE)
**The Loop:**
1.  **Analyze:** Scan the codebase.
2.  **Fix:** Apply architectural patterns and fixes.
3.  **Lint/Format:** Run the stack's strictest linter (Biome).
4.  **Test:** Run the test suite (Vitest, Playwright).
5.  **DECISION GATE:**
    * **IF** Errors/Warnings exist -> **GO TO STEP 2** (Self-Correct).
    * **IF** Clean -> **COMMIT** and Present.
**Constraint:** **DO NOT STOP** until the build is perfectly clean.

---

## 6. CORE ARCHITECTURAL PRINCIPLES
* **SOLID MANDATE:** SRP, OCP, LSP, ISP, DIP.
* **ROOT DIRECTORY HYGIENE (ANTI-BLOAT):**
    * **Config Only:** The root directory (`/`) is reserved **STRICTLY** for configuration (`package.json`, `README.md`, `.gitignore`, `tsconfig.json`, `biome.json`, `wxt.config.ts`).
    * **No Root Scripts:** Do not create a `scripts/` folder in the root.
    * **Containment:** All source code for the extension goes into `extension/src/`. All verification code goes to `extension/tests/`.
* **MODULARITY:** Feature-First Structure (`extension/src/features/auth`), not type.
* **CQS:** Methods must be **Commands** or **Queries**, never both.
* **12-Factor App:** Config in environment; backing services attached.

---

## 7. CODE HYGIENE & STANDARDS (READABILITY FIRST)
* **SEMANTIC NAMING PROTOCOL:**
    * **Descriptive Verbs:** `categorizeClipContent` (Good) vs `clipCat` (Bad).
    * **Casing:** `camelCase` (JS/TS), `PascalCase` (Components, Types).
* **CLEAN CODE RULES:**
    * **Verticality:** Optimize for reading down.
    * **No Nesting:** Use **Guard Clauses** (`return early`).
    * **DRY & KISS:** Automate repetitive tasks. Keep logic simple.
    * **Zero Comments:** Code must be **Self-Documenting**. Use comments *only* for "Why" (e.g., explaining a complex algorithm's reasoning or a workaround for a specific browser bug).

---

## 8. RELIABILITY, SECURITY & SUSTAINABILITY
* **DEVSECOPS PROTOCOL:**
    * **Zero Trust:** Sanitize **ALL** inputs (OWASP Top 10 2025 for Web Extensions).
    * **Supply Chain:** Generate **SBOMs** for all builds via `npm audit` and `snyk`.
    * **Fail Fast:** Throw errors immediately on invalid state.
    * **Encryption:** Secure sensitive data at rest (IndexedDB encryption) and in transit (HTTPS, Web Crypto API).
* **EXCEPTION HANDLING:**
    * **Resilience:** App must **NEVER** crash. Wrap critical I/O (e.g., browser storage, AI API calls) in `try-catch-finally`.
    * **Recovery:** Implement retry logic with exponential backoff for external API calls.
* **GREEN SOFTWARE:**
    * **Rule of Least Power:** Choose the lightest tool for the job.
    * **Efficiency:** Optimize loops ($O(n)$ over $O(n^2)$), memoization for expensive computations.
    * **Lazy Loading:** Load resources (e.g., UI components, heavy AI models) only when needed.

---

## 9. COMPREHENSIVE TESTING & VERIFICATION STRATEGY
* **FOLDER SEPARATION PROTOCOL (STRICT):**
    * **Production Purity:** The `extension/src/` folder is a **Production-Only Zone**. It must contain **ZERO** test files and **ZERO** test scripts.
    * **Total Containment:** **ALL** verification scripts, validation runners, static analysis tools, and test specs must reside exclusively in `extension/tests/`.
    * **Structure:**
        * `extension/tests/unit/`: Vitest for unit tests of functions, components, and hooks.
        * `extension/tests/e2e/`: Playwright for end-to-end tests simulating user interactions within the extension (popup, options page, content scripts).
        * `extension/tests/scripts/`: Verification/Validation scripts (e.g., `verify-manifest.ts`, `audit-permissions.ts`).
* **TESTING PYRAMID (F.I.R.S.T.):**
    * **Fast:** Unit tests run in milliseconds.
    * **Isolated:** No external dependencies. Mock browser APIs.
    * **Repeatable:** Deterministic results.
* **COVERAGE MANDATE:**
    * **1:1 Mapping:** Every source file in `extension/src/` **MUST** have a corresponding test file in `extension/tests/unit/`.
    * **Target:** 100% Branch Coverage for `extension/src/`.
    * **Zero-Error Standard:** Software must run with 0 console errors in both development and production builds.

---

## 10. UI/UX AESTHETIC SINGULARITY (2026 STANDARD)
* **VISUAL LANGUAGE:**
    * **Style:** Blend **Liquid Glass** + **Neo-Brutalist** + **Material You 3.0**. Focus on clean lines, subtle gradients, and functional yet aesthetically pleasing elements.
    * **Motion:** **MANDATORY** fluid animations (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`) for state changes, navigation, and feedback.
* **PERFORMANCE UX:**
    * **INP Optimization:** Interaction to Next Paint < 200ms. Leverage `requestAnimationFrame` for animations.
    * **Optimistic UI:** UI updates instantly; AI categorization or cloud sync happens in the background.
* **INTERACTION DESIGN:**
    * **Hyper-Personalization:** Adapt layouts and feature visibility based on user preferences and usage patterns.
    * **Micro-interactions:** Every click, hover, and input must have subtle, informative feedback.
* **HYPER-CONFIGURABILITY:**
    * **Mandate:** Every core feature, visual theme, and AI behavior setting must be user-configurable via the extension's options page.

---

## 11. DOCUMENTATION & VERSION CONTROL
* **HERO-TIER README (SOCIAL PROOF):**
    * **BLUF:** Bottom Line Up Front. Value prop first.
    * **Live Sync:** Update README **IN THE SAME TURN** as code changes.
    * **Visuals:** High-Res Badges (Shields.io), ASCII Architecture Trees.
    * **AI Replication Block:** Include `<details>` with stack info for other agents.
    * **Social Proof:** Explicitly ask users to **"Star ⭐ this Repo"**.
* **ADVANCED GIT OPERATIONS:**
    * **Context Archaeology:** Use `git log`/`git blame`.
    * **Conventional Commits:** Strict format (`feat:`, `fix:`, `docs:`).
    * **Semantic Versioning:** Enforce `Major.Minor.Patch` for releases.

---

## 12. AUTOMATION SINGULARITY (GITHUB ACTIONS)
* **Mandate:** Automate CI/CD immediately.
* **Workflows:**
    1.  **Integrity:** Lint + Test (Unit & E2E) on Push and Pull Request.
    2.  **Security:** Audit dependencies + SBOM generation.
    3.  **Release:** Semantic Versioning + Extension Artifact Upload (to GitHub Releases).
    4.  **Deps:** Auto-merge non-breaking dependency updates (e.g., Dependabot).

---

## 13. THE ATOMIC EXECUTION CYCLE
**You must follow this loop for EVERY logical step:**
1.  **Audit:** Scan state (`ls -R extension/`) & History (`git log`).
2.  **Research:** Query Best Practices & Trends for Web Extensions, TypeScript, WXT.
3.  **Plan:** Architect via `clear-thought-two`.
4.  **Act:** Fix Code + Polish + Add Settings + Write Tests (in `extension/tests/`).
5.  **Automate:** Create/Update CI/CD YAMLs.
6.  **Docs:** Update `README.md` (Replication Ready).
7.  **Verify:** Run Tests & Linters.
8.  **REITERATE:** If *any* error/warning exists, fix it immediately.
    **DO NOT STOP** until the build is perfectly clean.
9.  **Commit:** `git commit` immediately (Only when clean).
</details>

---

## 🛠️ Development Setup

Follow these steps to set up ClipContext for local development.

### Prerequisites

*   Node.js (v18.x or higher)
*   npm (or yarn/pnpm)
*   A modern web browser (Chrome, Firefox, Edge)

### Installation

1.  **Clone the repository:**
    bash
    git clone https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension.git
    cd ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension
    

2.  **Install dependencies:**
    bash
    npm install
    

### Running Locally

To run the extension in development mode with hot-reloading:

bash
npm run dev


This will build the extension and open a browser window with the extension loaded (or provide instructions to manually load it). Changes to your source code will automatically trigger a rebuild and reload.

### Build for Production

To create a production-ready build of the extension:

bash
npm run build


The compiled extension files will be located in the `dist/` directory, ready for packaging and distribution.

## 📜 Available Scripts

| Script                | Description                                                          |
| :-------------------- | :------------------------------------------------------------------- |
| `npm run dev`         | Starts the development server with hot-reloading.                    |
| `npm run build`       | Compiles the extension for production.                               |
| `npm run preview`     | Previews the production build locally.                               |
| `npm run lint`        | Runs Biome linter and formatter.                                     |
| `npm run format`      | Formats code using Biome.                                            |
| `npm run test`        | Runs unit tests with Vitest.                                         |
| `npm run test:e2e`    | Runs end-to-end tests with Playwright.                               |
| `npm run coverage`    | Generates test coverage report.                                      |
| `npm run typecheck`   | Checks TypeScript types.                                             |

## 🛡️ Principles & Standards

This project adheres to the highest standards of software engineering:

*   **SOLID Principles:** Ensuring maintainable, flexible, and scalable code.
*   **DRY (Don't Repeat Yourself):** Maximizing code reusability and reducing redundancy.
*   **KISS (Keep It Simple, Stupid):** Prioritizing simplicity and clarity in design.
*   **YAGNI (You Aren't Gonna Need It):** Focusing on current requirements and avoiding premature optimization or complexity.
*   **Feature-Sliced Design (FSD):** A robust architectural pattern for building complex frontend applications.
*   **Clean Code:** Emphasizing readability, testability, and clear intent.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](.github/CONTRIBUTING.md) for guidelines on how to get started, report bugs, and suggest features.

## ©️ License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) License](LICENSE).

---