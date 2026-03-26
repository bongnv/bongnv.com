import { createContentLoader } from 'vitepress'

interface Post {
  url: string
  frontmatter: {
    title: string
    date: string
    published?: boolean
  }
}

export declare const data: Post[]

export default createContentLoader('posts/*.md', {
  transform(rawData): Post[] {
    return rawData
      .filter((p) => p.frontmatter.published !== false)
      .sort(
        (a, b) =>
          +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date),
      )
  },
})
