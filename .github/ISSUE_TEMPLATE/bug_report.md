---
name: 🐞 Bug Report
about: Report a reproducible software defect or functional anomaly in the browser extension.
title: "[BUG]: Short, descriptive summary of the issue"
labels: ['type: bug', 'priority: medium', 'status: triage', 'needs-repro']
assignees: ['chirag127']
---

# 🐞 ClipContext Software Defect Report

Thank you for helping us maintain the integrity of the **ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension**. We adhere to the "Zero-Defect" mandate and the **F.I.R.S.T.** testing principle (Repeatable). Your detailed report is critical for high-velocity resolution.

---

## 1. Environment Details (Mandatory)

Please provide the specific environment where you encountered the issue. These details ensure test isolation and repeatability.

*   **Extension Version:** [e.g., v1.0.3, or `main` branch commit hash]
*   **Browser:** [e.g., Chrome, Edge, Firefox (State Manifest V2 or V3)]
*   **Browser Version:** [e.g., 120.0.6099.199 (Official Build)]
*   **Operating System:** [e.g., macOS Sonoma 14.2, Windows 11, Ubuntu 22.04]
*   **AI Backend Configured:** [e.g., Gemini API (Self-Hosted), Local LLM]

## 2. Describe the Bug

A clear and concise description of what the bug is. Why is this behavior incorrect from an expected functional standpoint?

## 3. Steps to Reproduce

**CRITICAL:** Please list the **exact, deterministic** steps to reproduce the behavior. If we cannot reliably reproduce the issue, resolution time will increase exponentially.

1. Go to '...' (e.g., specific website or extension popup)
2. Click on '....'
3. Perform action '....'
4. Observe actual behavior

## 4. Expected Behavior

A clear and concise description of the behavior expected according to the product requirements or common sense usability standards.

## 5. Actual Behavior

A clear and concise description of what actually happened, noting any failed commands, incorrect outputs, or unexpected UI states.

## 6. Screenshots or Video (Optional but Recommended)

If applicable, add screenshots or a screen recording to visually demonstrate the issue.

## 7. Diagnostic Log Output (If Applicable)

If the issue involves errors, crashes, or network failures, please capture the relevant output from the Browser Developer Console (F12).

text
// Paste console output, network request failures, or error stack traces here


## 8. Related Issues & Security Disclosure

*   Have you searched for similar open or closed issues? [Yes/No]
*   Is this bug a potential security vulnerability (e.g., XSS, injection, data leakage)?
    *   **IF YES:** Please **DO NOT** use this public issue template. Security disclosures must follow the **DevSecOps Protocol** and be reported privately. Consult our guidelines: [ClipContext Security Policy](https://github.com/chirag127/ClipContext-AI-Powered-Clipboard-Manager-Browser-Extension/blob/main/.github/SECURITY.md)