import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import BlogList from './BlogList.vue'
import './style.css'

export default {
  Layout,
  enhanceApp({ app }) {
    app.component('BlogList', BlogList)
  },
} satisfies Theme
