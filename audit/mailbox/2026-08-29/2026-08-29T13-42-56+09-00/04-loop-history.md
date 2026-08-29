## Weekly data refresh

<!-- DATA_REFRESH_LOOP_HISTORY -->

This is an explicitly bounded five-company SAMPLE run. It is not the full TOP100 and it does not modify production application data.

- Run ID: `2026-08-29T13-42-56+09-00`
- Previous run ID: `null` (no prior run)
- Run date (KST): `2026-08-29`
- Trigger: manual
- Base SHA: `697b4a4b1092e2988ca1fbe77dd277fe7d7cf064`
- Branch: `codex/data-refresh-2026-08-29`
- PR mode: audit-only; production application data changed: no

### Stage timeline

| Stage | Started | Finished | Status | Artifact | SHA-256 |
|---|---|---|---|---|---|
| Company eligibility | 2026-08-29T13:47:10+09:00 | 2026-08-29T13:49:24+09:00 | completed | `01-company-eligibility.json` | `e63fab02584065ea9af12d008d8540032713678cd072069136107a74aaf6e5da` |
| Revenue evidence | 2026-08-29T13:57:28+09:00 | 2026-08-29T14:01:11+09:00 | completed | `02-revenue-evidence.json` | `eb51b3450e1bde7517629472d7a46c00d7bc38eac188016330b9167278a452a3` |
| Final review | 2026-08-29T14:03:23+09:00 | 2026-08-29T14:05:09+09:00 | completed | `03-final-review.json` | `4ea4d369b0b04aecc89ae83f09e294b97d575e9a9884732a23e322317635b84a` |

### Changes since previous run

| Change type | Count | Companies and rationale |
|---|---:|---|
| Added | 3 | 뤼튼테크놀로지스 (47,117,211,348원), 리벨리온 (32,021,696,412원), 업스테이지 (24,801,523,461원); first sample run and verified 2025 OpenDART evidence |
| Removed | 1 | 마키나락스; Stage 1 confirms KOSDAQ listing |
| Revenue changed | 0 | No previous run exists |
| New entry | 3 | 뤼튼테크놀로지스 current rank 1, 리벨리온 current rank 2, 업스테이지 current rank 3; previous ranks unavailable because this is the first run |
| Re-entry | 0 | No previous run exists |
| Moved up | 0 | No previous run exists |
| Moved down | 0 | No previous run exists |
| Dropped out of TOP100 | 0 | No previous run exists |
| Removed: ineligible | 1 | 마키나락스; current KOSDAQ listing makes it ineligible |
| Unranked: unverified revenue | 1 | 트웰브랩스; secondary Catch/NICE value excluded because no official Korean-entity 2025 statement was found |
| Watchlist | 0 | Sample scope only; no outside-cutoff eligible verified company |
| Unchanged | 0 | No previous run exists |

Ranked output is exactly the Stage 1 INCLUDE ∩ Stage 2 VERIFIED 2025 set, sorted by `revenue_krw` descending and `company_id` ascending for ties. The three published sample records are: 1) 뤼튼테크놀로지스, 2) 리벨리온, 3) 업스테이지. TwelveLabs is retained only as `UNRANKED_UNVERIFIED`; MakinaRocks is retained only as `REMOVED_INELIGIBLE`.

### Evidence coverage

- Common fiscal year: 2025 for all ranked companies and the reviewed unverified record
- OpenDART-backed: 3/3 ranked companies
- Company-official-backed: 0/3 ranked revenue values; official materials supported eligibility and operating-status checks
- Latest-news check completed: all four Stage 2 INCLUDE companies, with Stage 1 latest-news checks covering all five sample candidates
- Unverified values excluded: yes; TwelveLabs' 6,491,040,000원 Catch/NICE figure was not promoted to VERIFIED
- Search snippets used as evidence: no

### Warnings and circuit breakers

- Fetch failure rate: 0.0% (below 20% circuit breaker)
- Published count change: no prior published baseline; not applicable (0.0% recorded)
- Revenue changes over 30%: 0; no prior revenue baseline
- Blocked or failed stages: none
- Duplicate run/open same-week PR check: passed at review time
- Production data update: none; this sample produces mailbox audit artifacts only

### Validation

- [x] Mailbox manifest schema passed after final manifest update
- [x] All artifact checksums match recorded values
- [x] Revenue is descending and limited to 100 companies
- [x] Build passed (`npm run build`)
- [x] Lint passed (`npm run lint`)
- [x] No direct update to `main`
- [x] Automatic merge is disabled

### Artifacts

- `00-candidates.json`: `3761ef9d70afefb07719213c079d7bccba51c7ac41824291ef4dfdde23f0fbac`
- `01-company-eligibility.json`: `e63fab02584065ea9af12d008d8540032713678cd072069136107a74aaf6e5da`
- `02-revenue-evidence.json`: `eb51b3450e1bde7517629472d7a46c00d7bc38eac188016330b9167278a452a3`
- `03-final-review.json`: `4ea4d369b0b04aecc89ae83f09e294b97d575e9a9884732a23e322317635b84a`
