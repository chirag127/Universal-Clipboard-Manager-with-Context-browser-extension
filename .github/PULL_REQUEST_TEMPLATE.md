# Pull Request Template for ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension

## 1. 🚀 PR Overview & Context

**Before submitting, ensure you have:**
1.  Run all local linters/formatters (`npm run format`).
2.  Executed all unit tests (`npm run test:unit`).
3.  Updated documentation (`README.md`, `AGENTS.md`) if necessary.
4.  Adhered to the Conventional Commits specification.

**Type of Change:** (Check all that apply)

- [ ] `feat`: A new feature (non-breaking change which introduces new functionality).
- [ ] `fix`: A bug fix (non-breaking change which fixes an issue).
- [ ] `docs`: Documentation only changes.
- [ ] `style`: Code style changes (formatting, missing semicolons, etc.).
- [ ] `refactor`: A code change that neither fixes a bug nor adds a feature.
- [ ] `perf`: A code change that improves performance.
- [ ] `test`: Adding missing tests or correcting existing tests.
- [ ] `chore`: Changes to the build process or auxiliary tools and libraries (e.g., updating dependencies).

## 2. 🧠 Architectural Alignment & Verification

This PR must align with the **Apex Technical Authority** principles (SOLID, DRY, Self-Documenting Code).

### What does this PR do?
<!-- Describe the core purpose and motivation for this change. Link to related issues if applicable. -->

### Critical Architectural Considerations

- [ ] **CQS Adherence:** Does this PR introduce new Commands or Queries? Are they clearly separated?
- [ ] **Guard Clauses Used:** Have complex nesting been replaced with early returns?
- [ ] **Error Handling:** Is all I/O wrapped for resilience? (Fail Fast/Recovery Logic).
- [ ] **Performance:** Does this PR adhere to the INP < 200ms goal? (Especially relevant for AI/clipboard operations).

## 3. Testing Strategy

Detail how this change was verified. Since this is a **Browser Extension (TS/Vite)** project, verification should cover UI interaction and background service worker logic.

- [ ] **Unit Tests:** Were new unit tests added/updated in `tests/unit/`?
- [ ] **E2E Tests:** Were necessary integration paths covered in `tests/e2e/` (Playwright)?
- [ ] **Manual QA Steps:** (If applicable, provide steps for reviewer to test specific functionality)

markdown
<!-- Reviewer Steps -->
1. Navigate to Extension Popup.
2. Copy item X.
3. Verify item X appears in history with correct AI tag.


## 4. Documentation Impact

- [ ] `README.md` updated to reflect new functionality/features (if applicable).
- [ ] `AGENTS.md` reviewed for necessary technology stack updates (if dependencies changed).
- [ ] **Security:** Were any new external integrations added that require input sanitization (OWASP compliance)?

---

**Self-Review Checklist (Apex Standard):**

- [ ] Code is self-documenting (Zero unnecessary comments).
- [ ] Configuration resides in environment/settings, not hardcoded.
- [ ] All imports are clean and comply with FSD structure.
- [ ] PR Title follows Conventional Commits format (`<type>: <subject>`).
