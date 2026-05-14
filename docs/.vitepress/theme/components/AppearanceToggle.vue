<template>
  <button class="pc-appearance" @click="isDark = !isDark" :aria-label="isDark ? '라이트 모드' : '다크 모드'">
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  </button>
</template>

<script setup>
import { useData } from 'vitepress'
const { isDark } = useData()
</script>

<style scoped>
.pc-appearance {
  display: none;
}

@media (min-width: 769px) {
  .pc-appearance {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: none;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: all 0.15s ease;
    margin-left: 8px;
  }
  .pc-appearance:hover {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-brand-1);
  }
}
</style>
