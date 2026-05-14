---
name: succession-orchestrator
description: 승계 이사회 오케스트레이터. "승계 심의", "이사회 열어", "CIO 후보 심의해줘", "succession", "후보자 평가", "다시 실행", "재심의" 등의 요청이 오면 반드시 이 스킬을 사용하라. 에이전트 이사 9명 병렬 평가 → 에이전트 팀 실시간 토론 → JK 최종 선언 → 웹 퍼블리시 전체 워크플로우를 담당한다.
---

# 승계 이사회 오케스트레이터

## 실행 모드 판단

스킬 트리거 시 가장 먼저 컨텍스트를 확인한다:

- `_workspace/` 존재 + 부분 수정 요청 → **부분 재실행**
- `_workspace/` 존재 + 새 입력 → `_workspace/` → `_workspace_prev/` 이동 후 **새 실행**
- `_workspace/` 미존재 → **초기 실행**

---

## Phase 0: 컨텍스트 로드 + 후보자 데이터 수집

### 0-1. Knowledge 파일 읽기

| 파일 | 목적 |
|------|------|
| `knowledge/leadership-philosophy.md` | 이사회 운영 철학·준비도 계산 기준 |
| `knowledge/position-rules.md` | 포지션별 역량 기준·이사 가중치 테이블 |
| `knowledge/candidates/{후보자슬러그}.md` | 후보자별 프로파일·평가 이력 |

### 0-2. 후보자 데이터 수집

오케스트레이터가 직접 수행하거나 `references/data-fetcher.md` 참고:
- LinkedIn WebFetch — 공개 프로파일 수집 (URL이 있는 경우)
- 뉴스 검색 — 후보자명 + 현 회사명으로 최근 6개월 뉴스
- DART 공시 — 상장사 임원인 경우 임원 현황·주식 보유
- candidates 파일의 사내 서베이·인터뷰 기록 통합

데이터 품질 가드레일:
- 데이터가 매우 부족하면 (이름+직함만) → Telegram 알림 + 확신도 낮음으로 진행
- 외부 후보자 공개 데이터 없음 → CHRO에게 LinkedIn URL 또는 추가 정보 요청

---

## Phase 1: 이사 병렬 독립 평가 (Round 1)

**실행 모드: 서브에이전트 (병렬)**

포지션 유형에 따라 가중치를 확인한다 (`knowledge/position-rules.md`).
가중치 0.00인 이사는 Phase 1에서 제외한다.

9개 이사 에이전트를 병렬로 호출한다. 각 에이전트: `.claude/agents/board-{name}.md`

```
[Vision 그룹]  board-vision-jensen
[Scale 그룹]   board-scale-bezos
[Integrity 그룹] board-integrity-buffett
[Principles 그룹] board-principles-dalio
[Transform 그룹] board-transform-nadella
[Strategy 그룹] board-strategy-thiel
[Performance 그룹] board-performance-welch
[Contraverse 그룹] board-contraverse-munger
[Foundation 그룹] board-foundation-drucker
```

각 에이전트에게 전달하는 데이터 패키지:
- Phase 0에서 수집한 후보자 프로파일 전체
- knowledge/leadership-philosophy.md 요약
- 포지션 정보 + 이 이사의 가중치
- 현재 비즈니스 국면 (position-rules.md 참고)

각 에이전트 출력: 스탠스 + 확신도 + 핵심 논거 2~3문장

타임아웃: 에이전트별 120초. 초과 시 "의견 없음" 처리.

---

## Phase 1.5: Round 1 출력 압축 (컨텍스트 폭발 방지)

**반드시 Phase 2 진입 전에 실행한다.**

각 이사의 Round 1 출력을 아래 형식으로 압축한다:

```
{이사명}: {스탠스 이모지} {확신도} — {핵심 근거 1문장}
```

예시:
```
Vision·Jensen: 🟢 높음 — AI 투자 전략 수립 경험 탁월, DT 전환 실행력 검증됨
Integrity·Buffett: 🟡 중간 — 성과는 있으나 integrity 검증 데이터 부족
Contraverse·Munger: 🔴 높음 — 과거 팀 실패 패턴 반복 징후, 리스크 높음
```

**규칙:**
- 이사당 80토큰 이하로 압축
- 이후 모든 에이전트 호출(Round 2, 토론)에는 이 compact summary만 전달
- 원본 Round 1 출력은 오케스트레이터가 로컬 변수로만 보관 — Phase 4 리포트 작성 시에만 참조

---

## Phase 2: 이사회 실시간 토론 (Round 1 → Round 2)

**실행 모드: 에이전트 팀 (하네스)**

### 2-1. 팀 구성

```
TeamCreate(
  team_name="succession-board",
  members=["ceo-jk", "board-vision-jensen", "board-scale-bezos", 
           "board-integrity-buffett", "board-principles-dalio",
           "board-transform-nadella", "board-strategy-thiel",
           "board-performance-welch", "board-contraverse-munger",
           "board-foundation-drucker"]
)
```

### 2-2. 긴장 쌍 식별

Phase 1.5 compact summary 기준 → 스탠스 거리 + 가중치 합으로 **최대 4개** 긴장 쌍 식별

긴장 쌍 우선순위:
1. 고가중치 이사 간 충돌 (예: Vision·Jensen vs Integrity·Buffett)
2. 준비도 반대 의견 (🟢 vs 🔴)
3. 중간 확신도 이사 — 토론으로 스탠스 변화 가능성 높음

### 2-3. 토론 진행

각 긴장 쌍마다:
1. JK(의장)가 `SendMessage`로 긴장 쌍 A에게 B의 논거를 전달하며 반박 요청
2. A가 응답 → B가 최종 입장 확정
3. **방관자 이사 1명 지목** — 논점과 가장 관련성 높은 미발언 이사에게 의견 요청

9명 전원 최소 1회 발언 목표.

모든 토론 내역은 `_workspace/debate-log.md`에 실시간 저장한다.

### 2-4. Round 2 스탠스 확정

토론 결과 반영 → 각 이사 최종 스탠스 확정
전달 컨텍스트: compact summary + 본인 관련 토론 내용만

---

## Phase 3: 집계 및 JK 최종 선언

### 3-1. 이사 가중 투표 집계

```
raw_score = Σ(이사 스탠스 점수 × 가중치)
준비도   = (raw_score + 1) / 2 → % 표기
동방향   = 최종 스탠스 동일 이사 수 (N/9명)
```

스탠스 점수: 🟢 Ready Now = +1, 🟡 Ready in 2Y = 0, 🔴 Not Ready = -1

### 3-2. JK 최종 선언

`ceo-jk` 에이전트 호출.

전달 내용:
- Phase 1.5 compact summary
- Phase 2 토론 핵심 쟁점 요약
- 3-1 집계 결과 (raw_score, 준비도 %, 동방향)
- 현재 비즈니스 국면 (position-rules.md 참고)

JK는 5단계 필터를 적용하여:
- 최종 준비도 단계 확정 (이사 합의 추인 또는 오버라이드)
- **의장 최종 코멘트** 작성 (2~3문장)

---

## Phase 4: 출력 파일 작성

**`references/output-writer.md`를 반드시 읽고 그 형식을 따른다.**

섹션 순서:
1. 헤더 (포지션 + 심의 배너)
2. 후보자 핵심 데이터
3. 이사별 스탠스 요약
4. JK 의장 최종 선언
5. 핵심 토론 쟁점
6. 행동 지침 (선임 권고 / 육성 계획 / 외부 영입 검토)
7. 하단 링크

debate 파일은 **반드시 Vue 컴포넌트 형식으로 신규 작성**한다. 마지막 줄은 반드시 `<DebateChat v-bind="debate" />`.

---

## Phase 5: 배포

1. `git add docs/succession/ docs/.vitepress/config.mts && git commit -m "feat: {후보자명} {포지션} {날짜} 이사회 심의 결과" && git push`
2. Vercel 자동 배포 확인

---

## 테스트 시나리오

**정상 흐름:**
- 입력: "CIO 후보자 김철수, 이영희, 박민준 이사회 심의해줘"
- Phase 0: candidates/ 파일 읽기 + LinkedIn 수집
- Phase 1: 9개 이사 병렬 평가
- Phase 1.5: compact summary 압축
- Phase 2: 팀 구성 → 긴장쌍 토론
- Phase 3: 집계 → JK 선언
- Phase 4: MD + Vue 파일 작성
- Phase 5: git push

**에러 흐름:**
- 후보자 candidates 파일 없음 → "데이터 없음, 확신도 낮음으로 평가 진행" 알림 후 계속
- 이사 타임아웃 → "의견 없음" 처리, 나머지 이사 결과로 집계
