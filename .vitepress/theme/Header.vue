<script setup lang="ts">
import { useRoute } from 'vitepress'

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
        <a href="/blog" :class="{ active: isActive('/blog') || isActive('/posts/') }">Blog</a>
      </nav>
    </div>
  </header>
</template>
