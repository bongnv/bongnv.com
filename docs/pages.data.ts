import { createContentLoader } from 'vitepress'

interface Page {
  url: string
  frontmatter: {
    title: string
    navOrder?: number
  }
}

export declare const data: Page[]

export default createContentLoader('pages/*.md', {
  transform(rawData): Page[] {
    return rawData
      .filter((p) => p.frontmatter.navOrder !== undefined)
      .sort(
        (a, b) =>
          (a.frontmatter.navOrder ?? 0) - (b.frontmatter.navOrder ?? 0),
      )
  },
})
