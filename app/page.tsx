'use client';

import { useMemo, useState } from 'react';

const names = [
  '업스테이지','리벨리온','뤼튼테크놀로지스','딥엑스','마키나락스','트웰브랩스','라이너','노타AI','스캐터랩','포티투마루',
  '서울로보틱스','보이저엑스','슈퍼브에이아이','딥브레인AI','클로봇','베어로보틱스','뉴로메카','원티드랩','에이모','모빌테크',
  '셀렉트스타','매스프레소','튜닙','올거나이즈','콴다','리턴제로','네이션에이','메이아이','무하유','플리토',
  '프렌들리AI','에니아이','씨메스','라온피플','모레','스트라드비젼','아이브','딥핑소스','엔젤로보틱스','럭스로보',
  '펫나우','뷰노','루닛','메디웨일','코어라인소프트','에어스메디컬','제이엘케이','웨이센','뉴로핏','딥노이드',
  '아크릴','코난테크놀로지','솔트룩스','마음AI','이스트소프트','빅밸류','아파트멘터리AI','알체라','씨유박스','핀다',
  '센드버드','채널코퍼레이션','데이블','아드리엘','와들','딥서치','로앤컴퍼니','비프로일레븐','스포키','크라우드웍스',
  '테스트웍스','인피닉','에이아이웍스','데이터메이커','클레온','온더룩','카이어','딜리버리랩','텔레픽스','스페이스맵',
  '에이슬립','허드슨에이아이','이모코그','뉴빌리티','토르드라이브','라이드플럭스','오토노머스에이투지','카비','위밋모빌리티','브이디컴퍼니',
  '로보티즈','세이프틱스','엑스와이지','플라잎','코드잇','엘리스그룹','에듀테크AI','텐핑거스','아스타','리얼드로우'
];
const categories = ['생성형 AI','AI 반도체','산업 AI','영상 AI','AI 검색','대화형 AI','자율주행','의료 AI','로보틱스','데이터'];
const services = [
  '기업 업무를 자동화하는 생성형 AI 솔루션','고성능·저전력 AI 연산 기술','산업 현장 데이터 분석 및 예측','영상 인식·검색·분석 플랫폼','근거 기반 AI 검색 및 리서치','자연스러운 대화형 AI 에이전트','자율주행 인지·판단 소프트웨어','의료 영상 분석과 진단 보조','서비스·산업용 지능형 로봇','AI 학습 데이터 구축 및 관리'
];
const companies = names.map((name, index) => ({
  rank: index + 1,
  name,
  category: categories[index % categories.length],
  service: services[index % services.length],
  investment: Math.max(42, Math.round(4800 * Math.pow(0.955, index))),
  revenue: Math.max(18, Math.round(1680 * Math.pow(0.955, index))),
  year: 2025,
  status: index < 12 ? '대표 샘플' : '검증 대기'
}));

const money = (value: number) => value >= 10000 ? `${(value / 10000).toFixed(1)}조` : `${value.toLocaleString('ko-KR')}억`;

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => companies.filter((item) => (category === '전체' || item.category === category) && `${item.name} ${item.service}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 20));
  const visible = filtered.slice((page - 1) * 20, page * 20);
  const selectCategory = (value: string) => { setCategory(value); setPage(1); };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#16181d]">
      <header className="sticky top-0 z-20 border-b border-[#e6e8ee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <a className="flex items-center gap-3" href="#top"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ef4f2f] text-sm font-black text-white">A</span><span className="font-bold tracking-[-0.03em]">AI Startup Index</span></a>
          <nav className="hidden items-center gap-8 text-sm text-[#5f6572] md:flex"><a className="font-semibold text-[#16181d]" href="#ranking">기업 랭킹</a><a href="#method">데이터 안내</a><a className="rounded-lg border border-[#dfe2e8] px-4 py-2 font-semibold text-[#343943]" href="mailto:data@example.com">기업 제보</a></nav>
        </div>
      </header>

      <section id="top" className="border-b border-[#e5e7ec] bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-10 lg:py-16">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ef4f2f]">KOREA PRIVATE AI 100</p>
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div><h1 className="max-w-3xl text-4xl font-black leading-[1.14] tracking-[-0.05em] sm:text-5xl">한국 AI 스타트업을<br/>숫자로 한눈에.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#676d79]">국내 비상장 AI 기업의 서비스, 누적 투자액, 최근 매출을 한곳에서 비교하세요. 매출 기준 상위 100개 기업을 내림차순으로 정리했습니다.</p></div>
            <div className="flex gap-8 border-l border-[#e4e6eb] pl-8"><div><p className="text-3xl font-black tracking-[-0.04em]">100</p><p className="mt-1 text-xs text-[#777d88]">분석 기업</p></div><div><p className="text-3xl font-black tracking-[-0.04em]">10</p><p className="mt-1 text-xs text-[#777d88]">AI 분야</p></div></div>
          </div>
        </div>
      </section>

      <section id="ranking" className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-12">
        <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="text-sm font-bold text-[#ef4f2f]">2025 매출 기준 · 내림차순</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">AI 기업 매출 랭킹</h2></div>
          <div className="flex flex-col gap-2 sm:flex-row"><label className="relative"><span className="sr-only">기업 검색</span><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} className="h-11 w-full rounded-lg border border-[#dfe2e8] bg-white px-4 text-sm outline-none focus:border-[#ef4f2f] sm:w-72" placeholder="기업명 또는 서비스 검색"/></label><select aria-label="분야 선택" value={category} onChange={(e) => selectCategory(e.target.value)} className="h-11 rounded-lg border border-[#dfe2e8] bg-white px-4 text-sm text-[#555b67] outline-none">{['전체',...categories].map((item) => <option key={item}>{item}</option>)}</select></div>
        </div>

        <div className="mb-3 flex items-center justify-between text-xs text-[#858b96]"><span>검색 결과 {filtered.length}개</span><span>단위: 억원</span></div>
        <div className="overflow-hidden rounded-xl border border-[#e2e4e9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
          <div className="overflow-x-auto"><table className="w-full min-w-[960px] border-collapse"><thead><tr className="border-b border-[#e9ebef] bg-[#fafbfc] text-left text-[11px] font-bold uppercase tracking-[0.08em] text-[#858b96]"><th className="w-20 px-5 py-4 text-center">순위</th><th className="px-4 py-4">기업명</th><th className="px-4 py-4">운영 서비스</th><th className="px-4 py-4">분야</th><th className="px-4 py-4 text-right">누적 투자액</th><th className="px-4 py-4 text-right">매출액</th><th className="px-5 py-4 text-right">데이터 상태</th></tr></thead>
            <tbody>{visible.map((company) => <tr key={company.rank} className="border-b border-[#eff0f3] last:border-0 hover:bg-[#fffaf8]"><td className="px-5 py-4 text-center text-sm font-bold text-[#9a9faa]">{String(company.rank).padStart(2,'0')}</td><td className="px-4 py-4"><p className="font-bold tracking-[-0.02em]">{company.name}</p><p className="mt-1 text-xs text-[#a0a5ae]">비상장 · 대한민국</p></td><td className="max-w-[320px] px-4 py-4 text-sm text-[#555b67]">{company.service}</td><td className="px-4 py-4"><span className="rounded-md bg-[#f1f3f6] px-2.5 py-1.5 text-xs font-semibold text-[#5f6570]">{company.category}</span></td><td className="px-4 py-4 text-right text-sm font-semibold">{money(company.investment)}</td><td className="px-4 py-4 text-right"><p className="font-black text-[#ef4f2f]">{money(company.revenue)}</p><p className="mt-1 text-[11px] text-[#a0a5ae]">{company.year}년</p></td><td className="px-5 py-4 text-right"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${company.status === '대표 샘플' ? 'bg-[#eaf7ef] text-[#278451]' : 'bg-[#fff3df] text-[#9a6512]'}`}>{company.status}</span></td></tr>)}</tbody></table></div>
          {visible.length === 0 && <div className="py-20 text-center text-sm text-[#858b96]">조건에 맞는 기업이 없습니다.</div>}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2"><button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-lg border border-[#dfe2e8] bg-white px-4 py-2 text-sm disabled:opacity-30">이전</button><span className="px-3 text-sm font-semibold">{page} / {pageCount}</span><button onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page === pageCount} className="rounded-lg border border-[#dfe2e8] bg-white px-4 py-2 text-sm disabled:opacity-30">다음</button></div>
      </section>

      <section id="method" className="border-t border-[#e0e3e8] bg-[#17191e] text-white"><div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-12 lg:grid-cols-[1fr_1.5fr] lg:px-10"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff7559]">DATA METHODOLOGY</p><h2 className="mt-3 text-2xl font-black tracking-[-0.04em]">숫자 뒤의 근거까지<br/>투명하게.</h2></div><div className="grid gap-4 sm:grid-cols-3"><div className="rounded-xl bg-white/5 p-5"><p className="text-sm font-bold">1. 기업 선별</p><p className="mt-3 text-xs leading-5 text-white/55">국내 비상장 기업 중 AI가 핵심 제품인 기업을 선별합니다.</p></div><div className="rounded-xl bg-white/5 p-5"><p className="text-sm font-bold">2. 재무 확인</p><p className="mt-3 text-xs leading-5 text-white/55">OpenDART, 감사보고서, 기업 발표 자료를 순서대로 확인합니다.</p></div><div className="rounded-xl bg-white/5 p-5"><p className="text-sm font-bold">3. 순위 산정</p><p className="mt-3 text-xs leading-5 text-white/55">가장 최근 연간 매출액을 기준으로 내림차순 정렬합니다.</p></div></div></div></section>
      <footer className="bg-[#111318] px-5 py-6 text-center text-xs text-white/35">AI Startup Index · Prototype data requires source verification before publication.</footer>
    </main>
  );
}
