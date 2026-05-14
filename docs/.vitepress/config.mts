import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Succession Agent',
  description: 'AI 이사회 기반 C-Suite 승계 심의 기록',
  lang: 'ko-KR',
  appearance: true,
  themeConfig: {
    nav: [
      {
        text: '포지션별',
        items: [
          { text: 'CIO (최고투자책임자)', link: '/succession/cio' },
          { text: 'MD (투자담당)',        link: '/succession/md' },
          { text: 'CFO (최고재무책임자)', link: '/succession/cfo' },
          { text: 'CAIO (최고AI책임자)', link: '/succession/caio' },
          { text: 'AI/DT 담당',          link: '/succession/aidt' },
          { text: 'CISO (정보보호담당)', link: '/succession/ciso' },
          { text: 'CHRO (최고인사책임자)', link: '/succession/chro' },
          { text: 'CSO (최고전략책임자)', link: '/succession/cso' },
          { text: 'CLO (최고법무책임자)', link: '/succession/clo' },
          { text: 'CIRO (최고IR책임자)', link: '/succession/ciro' },
        ]
      },
      {
        text: '에이전트 이사회',
        items: [
          { text: '🏛️ 이사회 현황', link: '/succession/board/' },
          { text: '👥 이사회 멤버', link: '/succession/members/' },
          { text: '📐 운영 원칙 & 가중치', link: '/succession/board/principles' },
        ]
      },
    ],
    sidebar: {
      '/succession/': [
        {
          text: '포지션별',
          items: [
            { text: 'CIO (최고투자책임자)', link: '/succession/cio' },
            { text: 'MD (투자담당)',        link: '/succession/md' },
            { text: 'CFO (최고재무책임자)', link: '/succession/cfo' },
            { text: 'CAIO (최고AI책임자)', link: '/succession/caio' },
            { text: 'AI/DT 담당',          link: '/succession/aidt' },
            { text: 'CISO (정보보호담당)', link: '/succession/ciso' },
            { text: 'CHRO (최고인사책임자)', link: '/succession/chro' },
            { text: 'CSO (최고전략책임자)', link: '/succession/cso' },
            { text: 'CLO (최고법무책임자)', link: '/succession/clo' },
            { text: 'CIRO (최고IR책임자)', link: '/succession/ciro' },
          ]
        }
      ],
      '/succession/board/': [
        {
          text: '에이전트 이사회',
          items: [
            { text: '🏛️ 이사회 현황', link: '/succession/board/' },
            { text: '👥 이사회 멤버', link: '/succession/members/' },
            { text: '📐 운영 원칙 & 가중치', link: '/succession/board/principles' },
          ]
        },
        {
          text: '포지션별 이사회 기록',
          items: [
            { text: 'CIO (최고투자책임자)', link: '/succession/debate/cio' },
            { text: 'MD (투자담당)',        link: '/succession/debate/md' },
            { text: 'CFO (최고재무책임자)', link: '/succession/debate/cfo' },
            { text: 'CAIO (최고AI책임자)', link: '/succession/debate/caio' },
            { text: 'AI/DT 담당',          link: '/succession/debate/aidt' },
            { text: 'CISO (정보보호담당)', link: '/succession/debate/ciso' },
            { text: 'CHRO (최고인사책임자)', link: '/succession/debate/chro' },
            { text: 'CSO (최고전략책임자)', link: '/succession/debate/cso' },
            { text: 'CLO (최고법무책임자)', link: '/succession/debate/clo' },
            { text: 'CIRO (최고IR책임자)', link: '/succession/debate/ciro' },
          ]
        }
      ],
      '/succession/debate/': [
        {
          text: '에이전트 이사회',
          items: [
            { text: '🏛️ 이사회 현황', link: '/succession/board/' },
            { text: '👥 이사회 멤버', link: '/succession/members/' },
          ]
        },
        {
          text: '포지션별 이사회 기록',
          items: [
            { text: 'CIO (최고투자책임자)', link: '/succession/debate/cio' },
            { text: 'MD (투자담당)',        link: '/succession/debate/md' },
            { text: 'CFO (최고재무책임자)', link: '/succession/debate/cfo' },
            { text: 'CAIO (최고AI책임자)', link: '/succession/debate/caio' },
            { text: 'AI/DT 담당',          link: '/succession/debate/aidt' },
            { text: 'CISO (정보보호담당)', link: '/succession/debate/ciso' },
            { text: 'CHRO (최고인사책임자)', link: '/succession/debate/chro' },
            { text: 'CSO (최고전략책임자)', link: '/succession/debate/cso' },
            { text: 'CLO (최고법무책임자)', link: '/succession/debate/clo' },
            { text: 'CIRO (최고IR책임자)', link: '/succession/debate/ciro' },
          ]
        }
      ],
      '/succession/members/': [
        {
          text: '에이전트 이사회',
          items: [
            { text: '🏛️ 이사회 현황', link: '/succession/board/' },
            { text: '👥 이사회 멤버', link: '/succession/members/' },
          ]
        },
        {
          text: '이사회 의장',
          items: [
            { text: 'JK (CEO)', link: '/succession/members/jk' },
          ]
        },
        {
          text: '에이전트 이사 (11인)',
          items: [
            { text: 'Jensen Huang', link: '/succession/members/vision-jensen' },
            { text: 'Jeff Bezos',   link: '/succession/members/scale-bezos' },
            { text: 'Warren Buffett', link: '/succession/members/integrity-buffett' },
            { text: 'Ray Dalio',    link: '/succession/members/principles-dalio' },
            { text: 'Satya Nadella', link: '/succession/members/transform-nadella' },
            { text: 'Peter Thiel',  link: '/succession/members/strategy-thiel' },
            { text: 'Jack Welch',   link: '/succession/members/performance-welch' },
            { text: 'Charlie Munger', link: '/succession/members/contraverse-munger' },
            { text: 'Peter Drucker', link: '/succession/members/foundation-drucker' },
            { text: 'Steve Jobs',    link: '/succession/members/innovation-jobs' },
            { text: 'Elon Musk',     link: '/succession/members/execution-musk' },
          ]
        }
      ],
    },
    socialLinks: [],
    footer: {
      message: '© 2026 Succession Agent · Powered by S',
    }
  }
})
