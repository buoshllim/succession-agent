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
          { text: 'CFO (최고재무책임자)', link: '/succession/cfo' },
          { text: 'CAIO (최고AI책임자)', link: '/succession/caio' },
          { text: 'CHRO (최고인사책임자)', link: '/succession/chro' },
          { text: 'CSO (최고전략책임자)', link: '/succession/cso' },
        ]
      },
      {
        text: '이사회',
        items: [
          { text: '🏛️ 이사회 현황', link: '/succession/board/' },
          { text: '👥 이사회 위원', link: '/succession/members/' },
        ]
      },
    ],
    sidebar: {
      '/succession/': [
        {
          text: '포지션별',
          items: [
            { text: 'CIO (최고투자책임자)', link: '/succession/cio' },
            { text: 'CFO (최고재무책임자)', link: '/succession/cfo' },
            { text: 'CAIO (최고AI책임자)', link: '/succession/caio' },
            { text: 'CHRO (최고인사책임자)', link: '/succession/chro' },
            { text: 'CSO (최고전략책임자)', link: '/succession/cso' },
          ]
        }
      ],
      '/succession/board/': [
        {
          text: '이사회',
          items: [
            { text: '🏛️ 이사회 현황', link: '/succession/board/' },
            { text: '👥 이사회 위원', link: '/succession/members/' },
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
