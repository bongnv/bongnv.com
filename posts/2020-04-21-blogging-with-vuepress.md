---
title: Blogging with VuePress
date: 2020-04-21
description: This article guides you not only how to create your blog but also how to continuously deploy with Github Actions. Even you are completely new to static site generators, it is very easy to get started with.
published: true
tags: ["vue", "vuepress"]
---

[Tiếng Việt](/blog/2020-04-21-viet-blog-bang-vuepress/)

TLDR; This article guides you not only how to create your blog but also how to continuously deploy with [Github Actions](https://github.com/features/actions). Even you are completely new to [static site generators](https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators), it is very easy to get started with.

## Why VuePress?

When it comes to blogging, there are millions of ways to create one. So why did I choose [VuePress](https://vuepress.vuejs.org/)?

Frankly, there was no particular reason for me to start with VuePress over other static site generators like [Gatsby](https://www.gatsbyjs.org/) or [Hugo](https://gohugo.io/). It's mainly because of that I was learning [VueJS](https://vuejs.org/). After using it, I would say VuePress is worth trying. Like VueJS, its tooling is friendly and the documentation is awesome.

## Getting started with VuePress

### Installation

Let's start with installing `vuepress` and the blog theme `@vuepress/theme-blog`:

```bash
mkdir my-blog && cd my-blog
yarn add vuepress @vuepress/theme-blog -D
```

- `vuepress` is a minimalistic static site generator.
- `@vuepress/theme-blog` provides blog plugin as well as the default blog theme for VuePress.

### Configuration

VuePress configuration file is `.vuepress/config.js`. Its parameters are well documented [here](https://vuepress.vuejs.org/config/). However, for the sake of simplicity, we begin with:

```js
module.exports = {
  title: "My blog",
  description: "This is another blog.",
};
```

VuePress also provides some commands to make things easy:

- `vuepress dev` starts the blog locally for testing & debugging
- `vuepress build` generates static sites in `.vuepress/dist` for deployment

I'll add them to `package.json` for convenience:

```json
{
  ...
  "scripts": {
    ...
    "dev": "vuepress dev", // starts a development server with automatic reload.
    "build": "vuepress build" // builds your website.
  }
}
```

You can check more commands in its [documentation](https://vuepress.vuejs.org/api/cli.html).

Cool, now you can run `yarn dev` and head to `localhost:8080` to see your blog!

> You should see the 404 page as there is no content yet.

### Home page

VuePress uses Markdown for preparing content. For example, `README.md` will automatically be converted into `index.html`. I'll add these few lines to `README.md` as an example for the home page:

```
---
title: About
---
<h1> Hi world! </h1>

This is my blog.
```

> The section between `---` at the beginning of the Markdown file is called [Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html). There are other parameters like `date` or `tags`.

### Theming

The default theme looks pretty and it works well for me. I'm going to use it for this blog which is [`@vuepress/blog`](https://vuepress-theme-blog.ulivz.com/). Applying a theme is as simple as one line change in `config.js`:

```js
module.exports = {
  ...
  theme: "@vuepress/blog" // @vuepress/theme-blog also works
}
```

You can find more themes from [here](https://github.com/vuepressjs/awesome-vuepress).

### Blog posts

Conventions is the key, blog posts will be placed inside `_posts` and we will have the following directories structure:

```
my-blog
├── _posts
│   └── 2020-04-29-hello-world.md
├── .vuepress
│   └── config.js
├── README.md
└── package.json
```

No one would stop you from having your own structure; however you will need to experiment it on your own. I'm starting the very first entry for this blog:

```
---
title: The first entry
date: 2020-04-29
---
This is my first blog entry.
```

VuePress then will generate the post in `localhost:8080/post/2020/04/29/hello-world.html` and the index page in `localhost:8080/`.

> Ops, my home page is overriden!

No problem, we can move the index page to a different path (`/posts/`) by adding these lines to `config.js`:

```js
module.exports = {
  ...
  themeConfig: {
    directories: [
      {
        // Unique ID of current classification
        id: "post",
        // Target directory
        dirname: "_posts",
        // Path of the `entry page` (or `list page`)
        path: "/posts/",
      }
    ],
    nav: [
      {
        text: "Blog",
        link: "/posts/",
      },
    ],
  }
}
```

- `directories` allows to configure [document classifiers](https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#directory-classifier). So you can add `writing` or `photography` there.
- `nav` is for the navigation bar. I prefer simplicity so `Blog` is enough for me.

## Deployment with Github Actions

### Deployment

Thanks to Github, CD (aka continuous delivery) is now a no-brainer task. Everything you need is just to create `.github/workflows/deploy.yml` with these lines:

```yml
name: Deploy
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install and Build
        run: yarn && yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vuepress/dist
```

And push it to your repository, mine is `https://github.com/bongnv/my-blog`. Deployment will be triggered for every push to master.

Don't forget to add `.gitignore` to exclude some generated files from your repository. Your commands should be like:

```
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore
git init
git add .
git commit -m "first commit"
git remote add origin git@github.com:bongnv/my-blog.git
git push -u origin master
```

### Base path

In my case, the blog URL is `https://bongnv.github.io/my-blog`. However, it shows `404` because the base path by default is root (`/`). Adding this line to `config.js` will make it work:

```js
module.exports = {
  ...
  base: "/my-blog/"
}
```

Your local blog will become `localhost:8080/my-blog` instead.

## Summary

Those are simplified steps to blog with VuePress, it should give you a simple blog to start writing. There are many things to explore deeper like Vue components inside Markdown, the plugins system. You could check out:

- [The official blog plugin](https://vuepress-theme-blog.ulivz.com/)
- [VuePress documentation](https://vuepress.vuejs.org/)
- [Awesome VuePress](https://github.com/vuepressjs/awesome-vuepress)
