<script setup lang="ts">
import { computed } from 'vue'
import { Content, useData } from 'vitepress'
import Header from './Header.vue'
import Footer from './Footer.vue'

const { page } = useData()

const isPost = computed(() => page.value.relativePath.startsWith('posts/'))

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <div class="app">
    <Header />
    <main class="main">
      <div class="prose">
        <header v-if="isPost" class="post-header">
          <h1>{{ page.frontmatter.title }}</h1>
          <time class="post-date-header">{{ formatDate(page.frontmatter.date) }}</time>
        </header>
        <Content />
      </div>
    </main>
    <Footer />
  </div>
</template>
