# Pull Request Template

**Please follow the [Apex Technical Authority standards](https://github.com/your-org/your-repo/blob/main/README.md#development-standards) for all contributions.**

**Before submitting your PR, please ensure:**

-   [ ] Your code adheres to the **Apex Toolchain** for JavaScript/TypeScript extensions.
-   [ ] All tests in the `tests/` directory pass.
-   [ ] The codebase has been linted and formatted by Biome.
-   [ ] The code includes comprehensive tests (100% branch coverage target).
-   [ ] Your commit messages follow **Conventional Commits**.
-   [ ] You have updated the **README.md** to reflect any significant changes.

--- ---

## 1. PR Title

Provide a concise and descriptive title. Use **Conventional Commits** format.

*   **Example:** `feat: Implement AI-powered content categorization`
*   **Example:** `fix: Resolve issue with history persistence on browser restart`

--- ---

## 2. Description

**What does this PR do?**

*   Provide a clear, concise summary of the changes.
*   Explain the problem this PR solves and how.
*   Link to any relevant issues (e.g., `Closes #123`).

**Why is this change necessary?**

*   Justify the need for this modification.

**How was this tested?**

*   Describe the testing approach: unit tests, e2e tests, manual testing.
*   Mention specific test cases or scenarios covered.

**Screenshots/GIFs (Optional but Recommended):**

*   Include visual evidence of the changes, especially for UI modifications.

--- ---

## 3. Checklist

*   [ ] I have read the **Contributing Guidelines**.
*   [ ] My code follows the **Apex Technical Authority** standards.
*   [ ] I have performed a self-review of my own code.
*   [ ] I have commented my code, particularly in hard-to-understand areas.
*   [ ] I have made corresponding changes to the documentation.
*   [ ] My changes generate no new warnings or errors (linters, tests, console).
*   [ ] I have updated the relevant **GitHub Actions** workflows if applicable.
*   [ ] I have ensured no sensitive information is committed.
*   [ ] I have added or updated unit tests for new functionality or bug fixes.
*   [ ] I have added or updated e2e tests for critical user flows.

--- ---

## 4. AI Agent Directives (For Future Automation)

This repository operates under the **Apex Technical Authority** framework. Key directives include:

*   **Language:** JavaScript (with potential for TypeScript adoption).
*   **Environment:** Browser Extension (Chrome, Firefox, etc.).
*   **Core Stack:** Vite, Browser Extension APIs.
*   **Linting/Formatting:** Biome.
*   **Testing:** Vitest (Unit), Playwright (E2E).
*   **Architecture:** Modular, Feature-First structure; adherence to SOLID principles.
*   **AI Integration:** Leverages AI for content categorization and context awareness. Model selection follows the **Gemini Protocol Fallback Cascade** if applicable.
*   **Build/CI:** GitHub Actions for linting, testing, and deployment.
*   **Security:** OWASP Top 10 2025 principles, input sanitization.
*   **UI/UX:** Hyper-configurable, fluid animations, responsive design.

--- ---

**Thank you for contributing to ClipContext!**
