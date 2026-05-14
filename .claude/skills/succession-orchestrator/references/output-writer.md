# 출력 파일 작성 가이드

승계 이사회 심의 결과를 마크다운 파일과 Vue 컴포넌트로 작성한다.

---

## 파일 경로 규칙

```
~/Projects/succession-agent/docs/succession/{YYYY-MM-DD}-{포지션슬러그}-{후보자슬러그}.md
```

debate 파일:
```
~/Projects/succession-agent/docs/succession/debate/{동일 파일명}
```

- 포지션 슬러그: `cio` / `cfo` / `caio` / `chro` / `cso` / `clo` / `ciro`
- 후보자 슬러그: candidates 파일명 기반 (예: `kim-cheolsu`, `lee-younghee`)
- 예시: `2026-05-14-cio-lee-younghee.md`

---

## 출력 섹션 순서

```
1. 헤더 (포지션 + 결의 배너)
2. 후보자 핵심 데이터
3. 이사별 스탠스 요약
4. JK 의장 최종 선언
5. 핵심 토론 쟁점
6. 행동 지침
7. 하단 링크
```

---

## 섹션별 작성 형식

### 1. 헤더

```markdown
## {후보자명} → {포지션} — 승계 이사회 ({YYYY-MM-DD})

> **{준비도 이모지} {준비도 단계}** | 준비도 {X}% | 9명 중 {N}명 동방향
```

준비도 이모지: 🟢 Ready Now / 🟡 Ready in 2Y / 🔴 Not Ready

---

### 2. 후보자 핵심 데이터

```markdown
### 후보자 개요

| 항목 | 내용 |
|------|------|
| 이름 | {후보자명} |
| 현직 | {현직 직함 · 회사} |
| 경력 | {총 연차} |
| 후보 유형 | 내부 임원 / 계열사 임원 / 외부 후보 |
| 데이터 품질 | 높음 / 중간 / 낮음 |
| 추천인 | {추천인} |
```

---

### 3. 이사별 스탠스 요약

```markdown
### 이사별 심의 결과

| 이사 | 가중치 | Round 1 | Round 2 | 확신도 |
|------|--------|---------|---------|--------|
| Vision·Jensen | 0.22 | 🟢 | 🟢 | 높음 |
| Scale·Bezos | 0.18 | 🟡 | 🟢 | 중간 |
...
```

---

### 4. JK 의장 최종 선언

```markdown
### 👑 JK 의장 최종 선언

> **{준비도 이모지} {준비도 단계}** {이사 합의 오버라이드 시: → 오버라이드: 이유}

**JK 코멘트:**
{2~3문장. 5단계 필터 중 결정적 근거 + 이사회에 전하는 핵심 메시지.}
```

---

### 5. 핵심 토론 쟁점

```markdown
### 핵심 쟁점

**쟁점 1: {쟁점명}**
- {이사A}: {논거 요약}
- {이사B}: {반론 요약}
- 결론: {합의 방향}
```

---

### 6. 행동 지침

```markdown
### 행동 지침

**{준비도 단계}에 따른 권고:**

- {구체적 행동 1}
- {구체적 행동 2}
- {구체적 행동 3}
```

준비도별 권고 프레임:
- 🟢 Ready Now: 선임 일정, 온보딩 준비, 인수인계 계획
- 🟡 Ready in 2Y: 육성 프로그램, 역할 확대 기회, 멘토링 매칭
- 🔴 Not Ready: 외부 영입 검토, 재심의 기준, 내부 후보 재발굴

---

### 7. 하단 링크

```markdown
---

[← 이사회 현황](/succession/board/) · [← {포지션} 이사회 기록](/succession/debate/{포지션슬러그}) · [🏛️ 이사회 위원](/succession/members/)
```

---

## debate 파일 작성 규칙

debate 파일은 **반드시 Vue 컴포넌트 형식**으로 신규 작성한다.

```vue
<script setup>
const debate = {
  position: "{포지션명}",
  positionSlug: "{포지션슬러그}",
  date: "{YYYY-MM-DD}",
  agenda: "{후보자명} {포지션} 후보자 심의",
  snapshot: [
    { label: "후보자", value: "{이름}" },
    { label: "현직", value: "{현직}" },
    { label: "데이터 품질", value: "{높음/중간/낮음}" },
    { label: "후보 유형", value: "{내부/계열사/외부}" },
  ],
  finalReadiness: "🟢 Ready Now",  // 또는 🟡 Ready in 2Y / 🔴 Not Ready
  readinessScore: 0.72,            // 준비도 점수 (0.00~1.00)
  dissension: "9명 중 7명 동방향",
  rationale: [
    "첫 번째 근거 문장.",
    "두 번째 근거 문장.",
  ],
  nextReview: "권고 사항 또는 조건",
  blocks: [
    { type: "section", label: "── Round 1: 이사 초기 평가 ──" },
    {
      type: "bubble",
      board: "vision-jensen",
      stance: "🟢 Ready Now",
      text: "이사 평가 내용..."
    },
    // ... 나머지 이사들
    { type: "section", label: "── Round 2: 긴장 쌍 토론 ──" },
    {
      type: "exchange",
      tension: "{긴장 쌍 설명}",
      messages: [
        { speaker: "JK", text: "의장 질문..." },
        { speaker: "Vision·Jensen Huang", board: "vision-jensen", text: "응답..." },
        { speaker: "Integrity·Buffett", board: "integrity-buffett", text: "반론..." },
      ]
    },
    // ...
    {
      type: "closing",
      text: "JK 최종 코멘트..."
    }
  ]
}
</script>

<BoardChat v-bind="debate" />
```

**규칙:**
- 마지막 줄은 반드시 `<BoardChat v-bind="debate" />`
- board 키는 `.claude/agents/board-{키}.md` 파일명에서 `board-` 제거한 값
  - 예: `board-vision-jensen.md` → `"vision-jensen"`
- readinessScore는 소수점 2자리 (예: 0.72)

---

## config.mts 업데이트 규칙

심의 파일 작성 후 `docs/.vitepress/config.mts`의 **2곳만** 업데이트한다:

1. **nav의 "날짜별 심의" items** — 최신 4개 유지
2. **sidebar의 "/succession/" 날짜별 심의 items** — 최신 4개 유지

board/members 사이드바는 날짜별 심의 섹션 없음 — 건드리지 않는다.

---

## git 커밋 규칙

```
git add docs/succession/ docs/.vitepress/config.mts && git commit -m "feat: {후보자명} {포지션} {날짜} 이사회 심의 결과" && git push
```
