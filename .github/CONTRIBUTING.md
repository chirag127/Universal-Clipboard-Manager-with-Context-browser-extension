# Contributing to ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension

Welcome to the Apex Project Contributor Guide. As a high-precision, zero-defect repository, we mandate adherence to elite architectural and procedural standards. By contributing, you agree to uphold the **Apex Technical Authority** principles.

## 1. CORE PHILOSOPHY AND PRINCIPLES

All contributions must align with the following directives, derived from the **AGENTS.md** file:

*   **SOLID Mandate:** Ensure all new logic adheres to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
*   **DRY & KISS:** Code must be self-documenting. Avoid complexity; automate repetition.
*   **Zero-Defect Standard:** No runtime errors are acceptable. Failure to pass static analysis or unit/E2E tests will result in automatic rejection.
*   **Architecture:** Contributions must respect the Feature-Sliced Design (FSD) structure within `src/`.

## 2. LOCAL DEVELOPMENT ENVIRONMENT SETUP

Ensure your environment mirrors the production runtime for accurate testing.

1.  **Fork and Clone:** Fork this repository and clone your fork locally.
    bash
    git clone https://github.com/YOUR_USERNAME/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension.git
    cd ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension
    
2.  **Install Dependencies (Apex Stack):** We use `npm` managed by `pnpm` for optimal performance and lockfile integrity.
    bash
    npm install -g pnpm
    pnpm install
    
3.  **Environment Variables:** Create a `.env` file in the root directory if required by feature development (e.g., API keys for Gemini integration). *Never commit sensitive `.env` files.*
4.  **Start Dev Server (Hot Reload):**
    bash
    pnpm dev
    

## 3. CONTRIBUTION WORKFLOW (SEMI-AUTOMATED)

Follow these steps meticulously for every Pull Request (PR).

### A. Branching Strategy

All feature work must originate from and merge back into `main` via a feature branch using **Conventional Commits**.

bash
# Create a new branch based on latest main
git checkout main
git pull
git checkout -b feat/descriptive-feature-name


### B. Code Implementation & Testing

**MANDATORY:** New features **MUST** include comprehensive tests. Uncovered code paths are considered defects.

1.  **Feature Code:** Implement logic within `src/features/...` or necessary utility layers.
2.  **Unit Tests:** Write corresponding unit tests in `tests/unit/`.
3.  **E2E Tests (If applicable):** Update Playwright scenarios in `tests/e2e/`.
4.  **Static Analysis:** Run the primary linter/formatter locally to pre-validate.
    bash
    pnpm lint:check # Runs Biome check
    pnpm format:write # Runs Biome format
    

### C. Verification Gate

Run the full CI pipeline locally to ensure full alignment before pushing.

bash
# Run all unit tests and CI checks
pnpm test:ci


### D. Commit and Push

Use clear, semantic commit messages.

bash
# Stage all changes
git add .

# Commit using conventional commits format
git commit -m "feat: context-aware clipboard entry categorization"

# Push to your fork
git push origin feat/descriptive-feature-name


## 4. PULL REQUEST SUBMISSION

Navigate to the main repository: `https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension` and open a new PR targeting the `main` branch.

**PR Template Enforcement:**

*   **CRITICAL:** You **MUST** fill out the entire **PULL_REQUEST_TEMPLATE.md** provided in the repository.
*   **Verification Summary:** Briefly describe the tests you ran locally and confirm 100% coverage was achieved for the modified paths.
*   **Agent Alignment:** Confirm that the changes do not violate any stated principle in `AGENTS.md`.

## 5. CODE REVIEW PROCESS

Reviewers will strictly enforce **Apex Standards**. Be prepared to address feedback related to:

1.  Performance Bottlenecks ($O(n)$ efficiency).
2.  Architectural Purity (FSD adherence).
3.  Security Vulnerabilities (Input sanitization, Manifest V3 compliance).
4.  Readability and Verticality.

*Do not take review comments personally; they are quality gates enforced by the Authority.*