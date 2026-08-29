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
commit a weekly data refresh directly to `main`, and never auto-merge the PR.
When an upstream stage is `blocked` or `failed`, later agents remain queued. The
orchestrator may push the run branch and open an audit-only PR containing only
the dated mailbox, loop history, and orchestration-policy changes. It must not
change approved application data in that PR.
