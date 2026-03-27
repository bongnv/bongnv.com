<script setup lang="ts">
import { useRoute } from 'vitepress'
import { data as pages } from '../../docs/pages.data'

const route = useRoute()

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <a href="/" class="site-name">Bong Nguyen</a>
      <nav class="nav">
        <a
          v-for="page in pages"
          :key="page.url"
          :href="page.url"
          :class="{ active: isActive(page.url) || (page.url === '/pages/blog' && isActive('/posts/')) }"
        >{{ page.frontmatter.title }}</a>
      </nav>
    </div>
  </header>
</template>
