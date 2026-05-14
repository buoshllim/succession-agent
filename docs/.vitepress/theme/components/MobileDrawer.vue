<template>
  <div class="mobile-nav">
    <!-- 햄버거 -->
    <button class="mobile-hamburger" @click="open = true" aria-label="메뉴 열기">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <!-- 오버레이 -->
    <Transition name="fade">
      <div v-if="open" class="drawer-overlay" @click="open = false" />
    </Transition>

    <!-- 우측 드로어 -->
    <Transition name="slide">
      <div v-if="open" class="drawer" role="dialog">
        <!-- 닫기 버튼 -->
        <button class="drawer-close" @click="open = false" aria-label="닫기">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Appearance -->
        <div class="drawer-section appearance-row">
          <span class="drawer-label">Appearance</span>
          <button class="appearance-btn" @click="isDark = !isDark" :aria-label="isDark ? '라이트 모드' : '다크 모드'">
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
        </div>

        <!-- 포지션별 -->
        <div class="drawer-section">
          <span class="drawer-label">포지션별</span>
          <nav class="drawer-links">
            <a v-for="p in positions" :key="p.link" :href="p.link" @click="open = false">
              {{ p.name }}<span>{{ p.sub }}</span>
            </a>
          </nav>
        </div>

        <!-- 에이전트 이사회 -->
        <div class="drawer-section">
          <span class="drawer-label">에이전트 이사회</span>
          <nav class="drawer-links">
            <a href="/succession/board/" @click="open = false">🏛️ 이사회 현황</a>
            <a href="/succession/members/" @click="open = false">👥 이사회 멤버</a>
          </nav>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const open = ref(false)

const positions = [
  { name: 'CIO',    sub: '최고투자책임자', link: '/succession/cio' },
  { name: 'MD',     sub: '투자',           link: '/succession/md' },
  { name: 'AI혁신', sub: 'AI혁신담당',     link: '/succession/caio' },
  { name: 'AI/DT',  sub: 'AI/DT담당',     link: '/succession/aidt' },
  { name: '정보보호', sub: '정보보호담당', link: '/succession/ciso' },
  { name: '전략',   sub: '전략담당',       link: '/succession/cso' },
  { name: '재무',   sub: '재무담당',       link: '/succession/cfo' },
  { name: '법무',   sub: '법무담당',       link: '/succession/clo' },
  { name: 'IR',     sub: 'IR담당',         link: '/succession/ciro' },
  { name: 'HR',     sub: 'HR담당',         link: '/succession/chro' },
]
</script>

<style scoped>
.mobile-nav { display: none; }

@media (max-width: 768px) {
  .mobile-nav { display: flex; align-items: center; }
}

.mobile-hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}
.bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--vp-c-text-1);
  border-radius: 2px;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
}

.drawer {
  position: fixed;
  top: 0; right: 0;
  width: 280px;
  height: 100vh;
  background: var(--vp-c-bg);
  border-left: 1px solid var(--vp-c-divider);
  z-index: 101;
  overflow-y: auto;
  padding: 12px 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.drawer-close {
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: none;
  color: var(--vp-c-text-2);
  cursor: pointer;
  margin-bottom: 4px;
  transition: all 0.15s ease;
}
.drawer-close:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.appearance-row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.drawer-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.appearance-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px; height: 34px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color 0.15s;
}
.appearance-btn:hover { border-color: var(--vp-c-brand-1); }

.drawer-links { display: flex; flex-direction: column; gap: 2px; }
.drawer-links a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background 0.15s;
}
.drawer-links a:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand-1);
}
.drawer-links a span {
  font-size: 11px;
  color: var(--vp-c-text-3);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.28s cubic-bezier(0.4,0,0.2,1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
