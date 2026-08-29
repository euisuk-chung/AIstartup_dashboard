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
