# Loop history: 2026-08-29T13-29-14+09-00

- Run date: 2026-08-29 KST
- Trigger: manual
- Base: `main` at `efacc57d45f68222039ce6b4bb195068852fdc7c`
- Branch: `codex/data-refresh-2026-08-29`
- Previous run: none
- Final status: `blocked`

## Stage timeline

| Stage | Started | Finished | Status | Artifact | SHA-256 |
|---|---|---|---|---|---|
| Company eligibility | 2026-08-29 13:29:15 KST | 2026-08-29 13:37:00 KST | blocked | `01-company-eligibility.json` | `6e760aee7158ffbe7d9b14998d86d59212cf2f866d2489754c3e9ae0d3f8c4a8` |
| Revenue evidence | — | — | queued | — | — |
| Final review | — | — | queued | — | — |

## Result

- Candidates received: 100
- INCLUDE: 0
- EXCLUDE: 0
- REVIEW: 100
- Production data changes: none

The company audit could not complete the required two-source reconciliation for
all candidates. It therefore promoted no company to INCLUDE or EXCLUDE and left
every candidate in REVIEW. Per the circuit breaker, the revenue and final-review
agents were not started.

## Source activity

- KRX listed-company lookup
- OpenDART corporate-overview guidance and disclosure system
- Company-official latest-news sample
- Independent latest-news sample

The detailed URLs and access dates are recorded in `01-company-eligibility.json`.
