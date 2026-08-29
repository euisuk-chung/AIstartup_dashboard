# Weekly data refresh orchestration

When the user asks to run, test, resume, or schedule the weekly AI startup data
refresh, read `.codex/workflows/weekly-data-refresh.toml` and follow it as the
source of truth.

Create a KST `run_date` and unique `run_id`, then initialize
`audit/mailbox/<run_date>/<run_id>/manifest.json` against
`.codex/mailbox/manifest.schema.json`. Invoke the three named custom agents in
the workflow strictly in order. Wait for each agent to finish and validate its
mailbox output before invoking the next agent. Never run these stages in
parallel. Stop immediately on `blocked` or `failed`.

The mailbox files are the authoritative handoff between stages. Conversation
messages may summarize progress but must not replace or override mailbox data.
Append every status transition and artifact checksum to the manifest and update
`audit/mailbox/index.json`; never overwrite or reuse a prior run directory.
Only `data_pr_reviewer` may change approved application data. Every scheduled
or manual weekly refresh must start from `main`, use a
`codex/data-refresh-YYYY-MM-DD` branch, and open a PR targeting `main`. Never
commit a weekly data refresh directly to `main`. After deterministic validation,
classify the PR as `AUTO-PASSED` or `NEED-REVIEW`, add the matching label and title
prefix, and auto-merge it according to the workflow policy. `NEED-REVIEW` means
post-merge human follow-up for the MVP; it does not block a technically valid
merge.
When an upstream stage is `blocked` or `failed`, later agents remain queued. The
orchestrator may push the run branch and open an audit-only PR containing only
the dated mailbox and loop history. It must not change approved application data.
Tag that audit-only PR `NEED-REVIEW` and auto-merge it after its deterministic
checks pass. A failed build, lint, schema/checksum validation, merge conflict, or
unexpected base/head branch is a hard stop and must never be auto-merged.
