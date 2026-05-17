# Position Rules — 포지션별 역량 기준 및 이사 가중치

## 이사 가중치 사용 원칙

- 포지션별로 이사 10인의 기본 가중치(BASE_WEIGHTS)를 사용한다
- 비즈니스 국면(1개 이상 멀티셀렉트)에 따라 가중치를 ± 조정한다
- 가중치 0.00인 이사는 해당 포지션 심의에서 발언 생략 가능
- WeightBoard.vue 의 데이터와 이 파일은 동일하게 유지된다

---

## 이사 식별자 (key)

| key | 이름 |
|-----|------|
| vision-jensen | Vision · Jensen Huang |
| scale-bezos | Scale · Jeff Bezos |
| integrity-buffett | Integrity · Buffett |
| principles-dalio | Principles · Dalio |
| transform-nadella | Transform · Nadella |
| innovation-wood | Innovation · Cathie Wood |
| performance-welch | Performance · Jack Welch |
| inversion-munger | Inversion · Charlie Munger |
| execution-musk | Execution · Elon Musk |
| lean-sandberg | Lean · Sheryl Sandberg |

---

## 기본 가중치 테이블 (BASE_WEIGHTS)

> 각 포지션 열의 합계는 ≈ 1.00

| 이사 | CIO | MD | CFO | CAIO | AIDT | CISO | CHRO | CSO | CLO | CIRO |
|------|----|----|-----|------|------|------|------|-----|-----|------|
| vision-jensen | 0.22 | 0.15 | 0.00 | 0.30 | 0.25 | 0.05 | 0.02 | 0.18 | 0.00 | 0.05 |
| scale-bezos | 0.18 | 0.12 | 0.10 | 0.12 | 0.15 | 0.08 | 0.07 | 0.20 | 0.02 | 0.20 |
| integrity-buffett | 0.17 | 0.22 | 0.25 | 0.05 | 0.05 | 0.15 | 0.12 | 0.10 | 0.15 | 0.25 |
| principles-dalio | 0.15 | 0.18 | 0.20 | 0.08 | 0.07 | 0.25 | 0.10 | 0.15 | 0.28 | 0.15 |
| transform-nadella | 0.10 | 0.05 | 0.05 | 0.15 | 0.18 | 0.05 | 0.28 | 0.07 | 0.05 | 0.07 |
| innovation-wood | 0.12 | 0.08 | 0.00 | 0.18 | 0.15 | 0.00 | 0.00 | 0.15 | 0.00 | 0.08 |
| performance-welch | 0.05 | 0.10 | 0.07 | 0.05 | 0.05 | 0.10 | 0.22 | 0.02 | 0.07 | 0.05 |
| inversion-munger | 0.03 | 0.08 | 0.15 | 0.03 | 0.05 | 0.22 | 0.04 | 0.03 | 0.25 | 0.08 |
| execution-musk | 0.00 | 0.00 | 0.00 | 0.22 | 0.20 | 0.00 | 0.00 | 0.05 | 0.00 | 0.00 |
| lean-sandberg | 0.00 | 0.00 | 0.03 | 0.05 | 0.05 | 0.03 | 0.25 | 0.05 | 0.05 | 0.08 |

---

## 포지션별 핵심 역량

| 포지션 | 핵심 역량 |
|--------|----------|
| CIO | AI 기반 투자 의사결정 · 투자 인프라 · 리스크 관리 |
| MD (투자센터MD) | 직접 투자 실행 · 포트폴리오 운용 · 딜소싱 · 밸류에이션 |
| CFO | 재무 전략 · 자본 배분 · 투자자 관계 |
| CAIO | AI 전략 수립 · AI 조직 구축 · 기술-비즈니스 연결 |
| AIDT (AI/DT담당) | AI/DT 실행 · 내부 시스템 혁신 · 데이터 전략 |
| CISO | 사이버 보안 · 정보 보호 체계 · 보안 리스크 관리 |
| CHRO | 인재 전략 · 조직 문화 · 리더십 개발 |
| CSO | 중장기 전략 · 시장 분석 · M&A · 신사업 |
| CLO | 법무 리스크 · 컴플라이언스 · 지배구조 |
| CIRO | IR 전략 · 투자자 관계 · ESG 공시 · 자본시장 커뮤니케이션 |

---

## 비즈니스 국면 — 정의 및 가중치 조정값

국면은 멀티셀렉트 가능. 복수 선택 시 조정값을 합산한다.

### 1. AI·반도체 슈퍼사이클 (supercycle)
HBM·AI 투자 집행, SK하이닉스 NAV 극대화 구간. AI 비전과 실행력 우선.

| 이사 | 조정 |
|------|------|
| vision-jensen | +0.03 |
| innovation-wood | +0.02 |
| execution-musk | +0.02 |
| principles-dalio | -0.02 |
| performance-welch | -0.02 |
| lean-sandberg | -0.02 |

### 2. NAV 할인 해소기 (nav-resolve)
Korea Discount 정책 + 주주환원 공약 집행 구간. 재무·법무·IR 역량 우선.

| 이사 | 조정 |
|------|------|
| integrity-buffett | +0.03 |
| inversion-munger | +0.02 |
| principles-dalio | +0.02 |
| vision-jensen | -0.02 |
| innovation-wood | -0.02 |
| execution-musk | -0.02 |

### 3. 포트폴리오 재편기 (portfolio)
비핵심 자산 정리, AI 포트폴리오 집중 구간. 전략·M&A 역량 우선.

| 이사 | 조정 |
|------|------|
| scale-bezos | +0.03 |
| transform-nadella | +0.02 |
| inversion-munger | +0.02 |
| innovation-wood | -0.02 |
| vision-jensen | -0.02 |
| execution-musk | -0.02 |

### 4. 신규 투자 개척기 (new-invest)
T&G스퀘어 통한 VC 딜소싱, 해외 AI 투자 확대 구간. 투자·혁신 역량 우선.

| 이사 | 조정 |
|------|------|
| innovation-wood | +0.03 |
| vision-jensen | +0.02 |
| execution-musk | +0.02 |
| performance-welch | -0.02 |
| integrity-buffett | -0.02 |
| lean-sandberg | -0.02 |

### 5. 다운사이클 대응기 (downcycle)
반도체 사이클 전환 시 리스크 관리, 유동성 방어 구간. 원칙·역발상 역량 우선.

| 이사 | 조정 |
|------|------|
| principles-dalio | +0.03 |
| inversion-munger | +0.02 |
| integrity-buffett | +0.02 |
| innovation-wood | -0.03 |
| execution-musk | -0.02 |
| vision-jensen | -0.02 |

---

## 조정 후 가중치 계산 공식

```
adjusted = max(0, base + delta)   # base > 0인 이사에만 delta 적용
```

복수 국면 선택 시 delta를 합산한 뒤 적용한다.
