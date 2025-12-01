# Security Policy: ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension

At the Apex Technical Authority, security and user privacy are paramount. We adhere to the highest industry standards (2026 DevSecOps Protocol) to ensure the integrity of the `ClipContext` extension.

We appreciate the efforts of security researchers and the community in disclosing vulnerabilities responsibly.

---

## 1. Responsible Disclosure & Zero Trust Mandate

We enforce a **Zero Trust** architecture, sanitizing all inputs and strictly controlling data flow, especially concerning clipboard data and external AI integrations (Gemini Protocol).

**DO NOT** report vulnerabilities using public GitHub issues or discussions. Public disclosure puts the system and its users at immediate risk.

### Reporting Procedure (Confidential)

All security issues must be reported confidentially using GitHub's Private Security Advisory feature:

*   **Secure Reporting Link:** [Report a Vulnerability to ClipContext Security Team](https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/security/policy)

### Required Submission Information

To ensure rapid triage and remediation, please include the following details in your report:

1.  **Component Affected:** (e.g., Background service worker, Content script injection, Local storage encryption, Gemini API handler).
2.  **Vulnerability Description:** A clear explanation of the flaw, its classification (e.g., XSS, Logic Flaw, Privilege Escalation).
3.  **Impact:** Detail the potential damage or unauthorized access resulting from the exploit.
4.  **Proof of Concept (PoC):** A concise, non-destructive script or set of steps required to reproduce the vulnerability reliably.
5.  **Suggested Fix:** (Optional, but appreciated) Any known mitigating factors or suggested patch implementations.

## 2. Response and Triage SLAs (Service Level Agreements)

We commit to rapid response times based on the CVSS severity score of the reported vulnerability:

| Severity | CVSS Range | Initial Triage Time | Fix Deployment Target |
| :--- | :--- | :--- | :--- |
| **Critical** | 9.0 - 10.0 | < 12 hours | 7 calendar days |
| **High** | 7.0 - 8.9 | < 24 hours | 14 calendar days |
| **Medium** | 4.0 - 6.9 | < 48 hours | Next scheduled minor release |
| **Low** | 0.1 - 3.9 | < 72 hours | Next scheduled patch release |

We will keep the reporter updated throughout the remediation process. Public disclosure of the vulnerability will occur simultaneously with the release of the official patch.

## 3. DevSecOps Posture and Architecture

Our development process integrates security checks continuously, aligning with Section 8 of the `AGENTS.md` directive:

*   **Supply Chain Security:** Automated dependency scanning using Dependabot and periodic manual audits for supply chain risks in the TypeScript/Vite/WXT ecosystem.
*   **Input Handling:** Clipboard contents and user settings are treated as untrusted input and are aggressively sanitized before rendering or processing by the AI handler.
*   **Manifest V3 Strictness:** The extension architecture strictly adheres to the principle of least privilege required by Manifest V3, minimizing API access and ensuring secure context separation (isolated worker threads).
*   **Local Storage Protection:** Sensitive data (clipboard history, source URLs) is stored using secure browser storage APIs, with encryption applied where supported and necessary.