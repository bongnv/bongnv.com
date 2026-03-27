---
title: Blog
navOrder: 0
---

<script setup>
import { data as posts } from '../posts.data.ts'
</script>

<BlogList :posts="posts" />
