import DefaultTheme from 'vitepress/theme'
import BoardChat from './components/BoardChat.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BoardChat', BoardChat)
  }
}
