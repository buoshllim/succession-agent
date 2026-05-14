import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import AppearanceToggle from './components/AppearanceToggle.vue'
import MobileDrawer from './components/MobileDrawer.vue'
import BoardChat from './components/BoardChat.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BoardChat', BoardChat)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => [
        h(AppearanceToggle),
        h(MobileDrawer),
      ],
    })
  }
}
