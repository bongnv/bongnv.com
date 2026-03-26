<script setup lang="ts">
interface Post {
  url: string
  frontmatter: {
    title: string
    date: string
  }
}

defineProps<{ posts: Post[] }>()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <ul class="post-list">
    <li v-for="post in posts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-title">{{ post.frontmatter.title }}</a>
      <time class="post-date">{{ formatDate(post.frontmatter.date) }}</time>
    </li>
  </ul>
</template>
