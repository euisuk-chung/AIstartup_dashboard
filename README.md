# AI Startup Index

한국 비상장 AI 스타트업을 매출액 기준으로 비교하는 데이터룸입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

배포용 빌드는 `npm run build`로 확인합니다.

## 주간 데이터 검수

주간 갱신 규칙은 `.codex/workflows/weekly-data-refresh.toml`에 정의되어 있습니다.
작업은 다음 세 에이전트가 mailbox 산출물을 통해 순차적으로 인계합니다.

1. `private_company_auditor`: 비상장 국내 AI 스타트업 자격 검수
2. `revenue_research_auditor`: OpenDART, 회사 공식 자료, 최신 뉴스 기반 매출 검수
3. `data_pr_reviewer`: 품질 게이트 확인 후 검토용 브랜치와 PR 생성

자동 병합은 허용하지 않으며, 차단 또는 실패 상태가 발생하면 다음 단계로 진행하지 않습니다.
주간 데이터 변경은 `main`에 직접 반영하지 않고 `codex/data-refresh-YYYY-MM-DD`
브랜치에서 `main` 대상 PR로만 제안합니다.
각 실행의 mailbox는 `audit/mailbox/YYYY-MM-DD/<run_id>`에 누적되며, PR 본문에는
이전 실행 ID, 단계별 상태·소요시간·산출물 체크섬과 기업 추가·제외·매출 변경 내역을 기록합니다.

TOP100은 매주 전체 `INCLUDE + VERIFIED 매출` 후보군을 다시 정렬해 산정합니다.
신규 기업이 100위 안에 진입하면 `NEW_ENTRY`, 그 영향으로 밀려난 기업은
`DROPPED_OUT`으로 기록합니다. 상장·인수 등 자격 상실은 `REMOVED_INELIGIBLE`,
매출 근거 부족은 `UNRANKED_UNVERIFIED`로 구분하며 과거 이력은 삭제하지 않습니다.
