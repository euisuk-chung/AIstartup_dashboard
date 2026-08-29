import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function fail(message) {
  console.error(`[merge-loop] ${message}`);
  process.exit(1);
}

function gh(commandArgs, { capture = false } = {}) {
  const result = spawnSync('gh', commandArgs, {
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
  });

  if (result.error) fail(`gh 실행 실패: ${result.error.message}`);
  if (result.status !== 0) {
    if (capture && result.stderr) console.error(result.stderr.trim());
    fail(`gh ${commandArgs.join(' ')} 명령이 종료 코드 ${result.status}로 실패했습니다.`);
  }

  return capture ? result.stdout.trim() : '';
}

const prNumber = option('--pr');
const tag = option('--tag');
const reason = option('--reason') ?? 'No additional review signal.';
const dryRun = args.includes('--dry-run');

if (!prNumber || !/^\d+$/.test(prNumber)) fail('--pr에는 PR 번호가 필요합니다.');
if (!['AUTO-PASSED', 'NEED-REVIEW'].includes(tag)) {
  fail('--tag는 AUTO-PASSED 또는 NEED-REVIEW여야 합니다.');
}

const pr = JSON.parse(
  gh(
    [
      'pr', 'view', prNumber,
      '--json', 'number,title,state,isDraft,baseRefName,headRefName,headRefOid,mergeable',
    ],
    { capture: true },
  ),
);

if (pr.state !== 'OPEN') fail(`PR #${prNumber} 상태가 OPEN이 아닙니다: ${pr.state}`);
if (pr.isDraft) fail(`PR #${prNumber}는 draft 상태입니다.`);
if (pr.baseRefName !== 'main') fail(`예상하지 않은 base 브랜치입니다: ${pr.baseRefName}`);
if (!pr.headRefName.startsWith('codex/data-refresh-')) {
  fail(`예상하지 않은 head 브랜치입니다: ${pr.headRefName}`);
}
if (pr.mergeable !== 'MERGEABLE') fail(`PR을 안전하게 병합할 수 없습니다: ${pr.mergeable}`);

const cleanTitle = pr.title.replace(/^\[(AUTO-PASSED|NEED-REVIEW)\]\s*/, '');
const taggedTitle = `[${tag}] ${cleanTitle}`;
const oppositeTag = tag === 'AUTO-PASSED' ? 'NEED-REVIEW' : 'AUTO-PASSED';
const color = tag === 'AUTO-PASSED' ? '1f883d' : 'bf8700';
const description = tag === 'AUTO-PASSED'
  ? 'Codex loop validated and automatically merged'
  : 'Automatically merged; post-merge human review requested';

console.log(`[merge-loop] PR #${prNumber}: ${tag} / ${reason}`);
if (dryRun) {
  console.log(`[merge-loop] dry-run: ${taggedTitle}`);
  process.exit(0);
}

gh(['label', 'create', tag, '--color', color, '--description', description, '--force']);
gh(['pr', 'edit', prNumber, '--title', taggedTitle, '--add-label', tag]);

// Remove a stale opposite disposition label, but do not fail when it is absent.
spawnSync('gh', ['pr', 'edit', prNumber, '--remove-label', oppositeTag], { stdio: 'ignore' });

gh([
  'pr', 'comment', prNumber,
  '--body', `Loop disposition: **${tag}**\n\n${reason}\n\nThis MVP policy merges technically valid PRs automatically. NEED-REVIEW requests post-merge follow-up.`,
]);
gh(['pr', 'merge', prNumber, '--squash', '--match-head-commit', pr.headRefOid]);

const merged = JSON.parse(
  gh(['pr', 'view', prNumber, '--json', 'state,mergedAt,mergeCommit,url'], { capture: true }),
);
if (merged.state !== 'MERGED') fail(`병합 확인에 실패했습니다: ${merged.state}`);

const result = {
  pr: Number(prNumber),
  tag,
  state: merged.state,
  merged_at: merged.mergedAt,
  merge_commit_sha: merged.mergeCommit?.oid ?? null,
  url: merged.url,
};

gh([
  'pr', 'comment', prNumber,
  '--body', `Loop merge completed: **${tag}**\n\n- Merged at: ${result.merged_at}\n- Squash commit: \`${result.merge_commit_sha}\``,
]);
console.log(JSON.stringify(result));
