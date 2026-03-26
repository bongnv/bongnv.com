import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Bong Nguyen',
  description: 'Notes on software engineering, distributed systems, and things I find interesting.',
  srcDir: './docs',
  outDir: './build',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  markdown: {
    theme: 'github-light',
  },
  ignoreDeadLinks: [/^https?:\/\/localhost/],
  // exclude old Docusaurus dirs and tutorial docs from being treated as pages
  srcExclude: ['**/README.md', 'docs/**', 'blog/**'],
})
