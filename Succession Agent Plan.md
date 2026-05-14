# Succession Agent Plan

> 설계 결정일: 2026-05-14 (그릴미 세션 기반)

---

## 1. 시스템 개요

멀티 에이전트 이사회 시스템. 전설적 CEO 페르소나를 가진 에이전트 이사들이 C-Suite 후보자를 심의하고, 실시간으로 토론한 결과를 웹으로 출력한다.

- **용도**: C-Suite 승계 심의 지원 (Succession Planning)
- **첫 포지션**: CIO (최고투자책임자)
- **최종 사용자**: CHRO → 이사회 보고 (CEO가 AI 도구 활용을 공식 보고)
- **프로젝트 위치**: `~/Projects/succession-agent/` (투심위와 완전 별도)
- **웹 출력**: 완전 별도 사이트 (별도 Vercel)
- **시작 방식**: 가상 CIO 후보자 3명으로 테스트 후 실제 운영

---

## 2. 왜 이게 필요한가 (설계 배경)

### 승계 심의의 본질적 어려움
- 단일 관점으로 판단하면 편향이 생긴다
- "지금 잘하는 사람"과 "앞으로 잘할 사람"이 다르다
- 회사의 현재 국면(M&A 통합 / 신사업 개척 / 효율화)에 따라 필요한 리더십이 달라진다

### 투심위 시스템에서 검증된 구조를 HR로 이식
투심위(투자심의위원회)에서 구루 9인이 병렬 평가 → 토론 → 합의로 투자 판단 품질을 높인 것처럼, 승계 심의에서도 동일한 구조가 작동한다:

| 투심위 | Succession Agent |
|--------|----------------|
| 6개 종목 | C-Suite 포지션별 후보자 |
| 구루 9인 (Buffett, Wood...) | 에이전트 이사 9~11명 (CEO 페르소나) |
| 스탠스 5단계 (매수~매도) | 준비도 3단계 (Ready Now / 2Y / Not Ready) |
| 매수강도 % | 준비도 점수 % |
| JK 위원장 최종 결재 | 의장 이사 최종 결재 |

---

## 3. 에이전트 이사 구성

### 정체성 설계 원칙
- **이름 표시**: `{가치 키워드} · {CEO 이름}` → 예: `Vision · Jensen Huang`
- **사진**: CEO 실제 사진
- **소울**: 해당 CEO의 공개된 경영 철학을 페르소나로 구현

### 11명 전체 목록

| # | 가치 키워드 | CEO 페르소나 | 핵심 관점 |
|---|------------|-------------|---------|
| 1 | Vision·Tech | 젠슨 황 (Jensen Huang) | AI/기술 전환기 리더십 |
| 2 | Scale·System | 제프 베이조스 (Jeff Bezos) | 인프라 구축·장기 확장성 |
| 3 | Integrity·Value | 워렌 버핏 (Warren Buffett) | 투자 판단 본질·신뢰·integrity |
| 4 | Principles·Risk | 레이 달리오 (Ray Dalio) | 원칙 기반 시스템·리스크 관리 |
| 5 | Transform·Culture | 사티아 나델라 (Satya Nadella) | 조직 문화 전환·성장 마인드셋 |
| 6 | Strategy·Edge | 피터 틸 (Peter Thiel) | 차별화된 독점 전략 |
| 7 | Performance·People | 잭 웰치 (Jack Welch) | 성과주의·인재 차별화·후계자 육성 |
| 8 | Contraverse·Bias | 찰리 멍거 (Charlie Munger) | 인지 편향 제거·역발상·부적합 이유 찾기 |
| 9 | Foundation·Mgmt | 피터 드러커 (Peter Drucker) | 경영자의 본질·조직 철학 |
| 10 | Innovation·Design | 스티브 잡스 (Steve Jobs) | 비전 완결성·제품 심미 (CAIO/CSO 포지션에서 활성화) |
| 11 | Execution·Break | 일론 머스크 (Elon Musk) | 불가능 돌파·퍼스트 프린시플 (CAIO 포지션에서 활성화) |

### CIO 포지션 가중치 배분 (합계 = 1.00)

| 에이전트 | CIO 가중치 | 이유 |
|---------|----------|------|
| Vision·Tech (젠슨황) | 0.22 | AI 전환기 CIO에 가장 적합한 관점 |
| Scale·System (베이조스) | 0.18 | 투자 인프라 구축 능력 핵심 |
| Integrity·Value (버핏) | 0.17 | 투자 판단의 본질·신뢰성 |
| Principles·Risk (달리오) | 0.15 | 리스크 관리 시스템 |
| Transform·Culture (나델라) | 0.10 | 조직 변화 관리 |
| Strategy·Edge (틸) | 0.08 | 차별화된 투자 전략 |
| Performance·People (웰치) | 0.05 | 성과 트랙레코드 |
| Contraverse·Bias (멍거) | 0.03 | 후보자 약점·인지 편향 발견 |
| Foundation·Mgmt (드러커) | 0.02 | 경영자 기본기 검증 |
| Innovation·Design (잡스) | 0.00 | CIO 비적합 — 다른 포지션 활성화 |
| Execution·Break (머스크) | 0.00 | CIO 비적합 — CAIO에서 활성화 |

---

## 4. 스탠스 구조

```
🟢 Ready Now    — 지금 당장 선임 가능 (+1점)
🟡 Ready in 2Y  — 2년 내 조건부 준비  ( 0점)
🔴 Not Ready    — 추가 육성 또는 외부 영입 검토 (-1점)
```

- **준비도 점수**: `(raw_score + N) / M` → % 표기 (투심위 매수강도와 동일 로직)
- **확신도**: 높음 / 중간 / 낮음 (데이터 부족 시 자동으로 낮음)
- **데이터 부족 처리**: 판단 유보 없이 확신도 낮음으로 표시 → 이사회가 인지한 상태에서 결정

---

## 5. 아키텍처 (하이브리드 패턴)

```
Phase 0  컨텍스트 로드 + 후보자 데이터 수집
         Knowledge 파일 (position-rules, philosophy, candidates)
         LinkedIn WebFetch + 뉴스 검색 + DART 공시

Phase 1  에이전트 이사 병렬 독립 평가 [서브에이전트]
         각자 후보자를 자신의 관점으로 평가
         출력: 스탠스 + 확신도 + 핵심 논거

Phase 1.5  compact summary 압축 (80토큰/이사)
           컨텍스트 폭발 방지 — 이후 모든 호출은 이 요약만 사용

Phase 2  에이전트 팀 실시간 토론 [에이전트 팀 — 하네스]
         TeamCreate → 긴장 쌍 이사들이 SendMessage로 직접 토론
         대화 내역 파일 저장 → 웹 debate 컴포넌트 원본

Phase 3  가중 집계 + 의장 최종 결재
         raw_score 집계 → 준비도 점수
         의장 이사 5단계 필터 적용 → 최종 스탠스 확정

Phase 4  출력 파일 작성 (MD + Vue 컴포넌트)
         투심위 output-writer.md 패턴 동일 적용

Phase 5  배포 (Vercel git push + 알림)
```

### Phase 2 에이전트 팀 구조 (투심위와의 차이점)
- 투심위: 오케스트레이터가 긴장쌍 에이전트를 순차 호출 → 토론 시뮬레이션
- SUCCESSION: TeamCreate로 이사들이 실제 SendMessage 직접 토론 → 대화 내역 실시간 생성

---

## 6. 데이터 소스

| 소스 | 자동화 가능 | 방식 |
|------|-----------|------|
| 후보자 프로파일 | 수작업 | `knowledge/candidates/{이름}.md` (thesis 파일) |
| LinkedIn 경력 | 반자동 | LinkedIn URL → WebFetch 공개 프로파일 수집 |
| 뉴스 기사 | 자동 | 후보자 이름 + 회사 검색 |
| DART 공시 | 자동 | 임원 현황, 주식 보유 |
| 사내 서베이 | 수작업 | CHRO가 요약 후 thesis 파일에 기재 |
| 인터뷰 기록 | 수작업 | 텍스트로 thesis 파일에 추가 |

---

## 7. 포지션별 가중치 테이블 (position-rules.md 관리)

| 포지션 | 상위 3 에이전트 | 하위/비활성 |
|--------|--------------|-----------|
| CIO | 젠슨황·베이조스·버핏 | 잡스·머스크 |
| CFO | 버핏·달리오·멍거 | 잡스·머스크 |
| CAIO | 머스크·젠슨황·틸 | 드러커·웰치 |
| CHRO | 나델라·웰치·드러커 | 머스크·틸 |
| CSO | 틸·베이조스·잡스 | 웰치·멍거 |
| CLO | 달리오·멍거·드러커 | 머스크·잡스 |

---

## 8. 기술 스택

투심위(investment-agent)와 동일한 패턴 재사용:

- **에이전트**: Claude Code `.claude/agents/` + `.claude/skills/`
- **프론트엔드**: VitePress + Vue 3
- **컴포넌트**: DebateChat.vue (투심위 컴포넌트 베이스로 수정)
- **배포**: Vercel
- **데이터**: Supabase 선택적 연동 (심의 이력 저장)

---

## 9. 구현 단계

- [ ] Step 1: 프로젝트 구조 생성 + CLAUDE.md 작성
- [ ] Step 2: Knowledge 파일
  - `knowledge/position-rules.md` — 포지션별 역량 기준 + 에이전트 가중치
  - `knowledge/leadership-philosophy.md` — 이사회 운영 철학
- [ ] Step 3: 에이전트 파일 9개 작성
  - `.claude/agents/board-vision-jensen.md`
  - `.claude/agents/board-scale-bezos.md`
  - `.claude/agents/board-integrity-buffett.md`
  - `.claude/agents/board-principles-dalio.md`
  - `.claude/agents/board-transform-nadella.md`
  - `.claude/agents/board-strategy-thiel.md`
  - `.claude/agents/board-performance-welch.md`
  - `.claude/agents/board-contraverse-munger.md`
  - `.claude/agents/board-foundation-drucker.md`
  - (잡스·머스크는 포지션 확장 시 추가)
- [ ] Step 4: SKILL.md 작성 (Phase 0~5, 하이브리드 명시)
  - `references/data-fetcher.md`
  - `references/output-writer.md`
- [ ] Step 5: VitePress 사이트 셋업 + DebateChat 컴포넌트 수정
- [ ] Step 6: 가상 CIO 후보자 3명 thesis 작성
  - `knowledge/candidates/candidate-a.md` (내부 임원)
  - `knowledge/candidates/candidate-b.md` (계열사 임원)
  - `knowledge/candidates/candidate-c.md` (외부 후보)
- [ ] Step 7: 첫 심의 실행 + 검증

---

## 10. 미결 사항

| 항목 | 옵션 | 우선순위 |
|------|------|--------|
| 의장 역할 | **JK (CEO)** — 투심위와 동일 | ✅ 확정 |
| 웹사이트 이름 | succession-brief.vercel.app 등 | 중간 |
| Supabase 연동 | 심의 이력 저장 여부 | 낮음 |
| 잡스·머스크 활성화 | CAIO/CSO 포지션 구현 시 추가 | 낮음 |
