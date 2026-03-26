---
title: Create a blazing fast blog via NextJS
date: 2020-05-25
excerpt: NextJS gives me more control as well as more configurations to optimize the blog. The post here describes how I created a blog via NextJS which helped me to improve the speed of the site from 1.8s FCP to 1.6s FCP.
published: true
tags: ["nextjs", "react", "jamstack"]
---

TLDR; I'm happy with Gatsby. However NextJS gives me more control as well as more configurations to optimize the blog. The post here describes how I created a blog via NextJS which helped me to improve the speed of the site from 1.8s FCP to 1.6s FCP.

## Why NextJS?

Building a blog, I want it to be performant and blazing fast, and pre-rendered sites seems to be the best option out there. Pre-rendered sites allow browsers to render as early as possible. They then are hydrated to become SPA in order to inherit the smoother navigation any other cool stuff of SPA. Beside that, SEO is much more optimized with pre-rendered HTML sites.

[JAMStack](https://jamstack.org/) is popular due to those benefits. And in the JAMStack + React world, [NextJS](https://nextjs.org/) and [GatsbyJS](https://www.gatsbyjs.org/) are the best options to pre-render or generate static sites. I chose NextJS for the reason that it allows me to customize for optimization and to learn. As a result, I was able to reduce the [FP, FCP](https://web.dev/user-centric-performance-metrics/?utm_source=devtools#user-centric_performance_metrics) from 1.8s using Gatsby to 1.6s using NextJS with the same content & functionalities.

### Pre-rendering

JAMStack doesn't specify what technology it includes. I, therefore, find it better to share some context about pre-rendering and the stack that will be used before we continue.

Simply, pre-rendering is a mechanism where the site is rendered in advance which is different from SPA where browsers evaluate Javascript codes to build the web site at client site. In pre-rendered sites, browsers only need to hydrate it and turn it into a SPA; hence the initial loading time is faster. There are two forms of pre-rendering:

- **Static Generation** is the mechanism to generate sites in the form of HTML at build time and they will be served statically. Therefore, it can be easily scaled by CDN.
- **Server-side rendering** is the mechanism to generate sites in the form of HTML on the server side for each request. Therefore, it allows for more personalized content.

NextJS supports both. However, we will use static generation for blogging as we don't need to customize content for each user request.

## Build a NextJS blog

I've been writing via Markdown and I like it. Therefore, this blog will basically be started from a NextJS app with addition of rendering Markdown files.

### Create a NextJS app

Scaffolding a NextJS app is simple:

```shell
npm init next-app nextjs-blog
cd nextjs-blog
```

I select the default starter in the prompt screen so I can understand NextJS more by adding features.

I will starting with routing, NextJS has an opinionated implementation of it. Files in `/pages` folder will be converted into a route. In the default starter, `/pages/index.js` and `/pages/api/hello.js` will be translated into two routes:

- `/` for `/pages/index.js`
- `/api/hello` for `/pages/api/hello.js`

I don't need `/api/hello` so I will remove `hello.js`.

After that, I use `yarn dev` and head to `localhost:3000` to make sure everything works. The website should be up and running at this point.

### Render Markdown files

I'm going to build two types of pages. One index page for listing blog posts and another for showing a blog post.

#### Page for a post

First, I create `blog/[slug].jsx`, so NextJS will generate a route `/blog/:slug`:

```jsx
const BlogPost = ({ post }) => {
  return (
    <main>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.html }} />
    </main>
  );
};

export default BlogPost;

export const getStaticProps = async ({ params }) => {
  const { getPostBySlug } = await import("../../lib/api");
  const post = await getPostBySlug(params.slug, ["title", "html"]);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths = async () => {
  const { getPostSlugs } = await import("../../lib/api");
  const slugs = await getPostSlugs();

  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
};
```

Beside the React component `BlogPost`, I provide 2 exported functions: `getStaticProps` and `getStaticPaths`.

- **getStaticProps** provides props data for the page at build time. Thus, it allows the page to be rendered at build time. In the above example, `getStaticProps` provides `title` and `html` attributes from a markdown file so the page can be rendered.
- **getStaticPaths** specify the list of routes to be generated at build time. It's only required for dynamic-routed pages. In the above example, `getStaticPaths` provides an array of slugs which refer to markdown files.

For the implementation of `api.js`, you can check out [this file](https://github.com/bongnv/nextjs-blog-example/blob/master/lib/api.js). It can be implemented by using `remark` and `remark-html` to parse the Markdown files.

#### Page for listing posts

Creating the listing is very similar. I add `blog/index.jsx` so NextJS will generate the route `/blog` for listing posts.

```jsx
const BlogIndex = ({ posts }) => {
  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogIndex;

export const getStaticProps = async ({ params }) => {
  const { getAllPosts } = await import("../../lib/api");
  const posts = await getAllPosts(["title", "slug"]);

  return {
    props: {
      posts,
    },
  };
};
```

**getStaticPops** here provides the props data for the build time which is the list of posts. I don't need to implement `getStaticPaths` for this file as the route is not dynamic.

Up until now, I already have basic functionalities of a blog. Next steps, we will discuss optimizations to improve the loading time.

## Optimization

There are two optimizations I would like to implement here:

- **Images lazy loading** improves the initial loading time.
- **Tweaking webpack** improves code splitting, hence initial loading time.

### Images lazy loading

The idea of images lazy loading is quite simple. We will put a placeholder in the image first and we only load the full image when it's visible on the screen. In order to generate the placeholder, I use a Webpack loader which is [`image-trace-loader`](https://github.com/EmilTholin/image-trace-loader). The loader will load an image as an object with two fields like:

```js
import { src, trace } from "./image.png";
```

In it, `trace` is a svg data and it will be used as the placeholder. `src` is the original source of the image. My webpack configuration will be like:

```js
config.module.rules.push({
  test: /\.(jpg|jpeg|png|svg|webp|gif|ico)$/,
  use: [
    "image-trace-loader",
    {
      loader: "file-loader",
      options: {
        outputPath: `${options.isServer ? "../" : ""}static/images/`,
        publicPath: "/_next/static/images",
      },
    },
    {
      loader: "image-webpack-loader",
      options: {
        disable: options.dev,
      },
    },
  ],
});
```

`file-loader` copies images to static folder and `image-webpack-load` optimizes images.

However, this is not enough as I need to process the markdown file to modify image components:

```ts
const resolve = require.context("../content", true, /\.jpg$/, "lazy");

const remarkImages = (): Attacher => {
  return (): Transformer => {
    return (tree: Node, file: VFile, next) => {
      const nodes: Node[] = [];
      visit(tree, "image", (node: Node) => {
        nodes.push(node);
      });

      Promise.all(
        nodes.map(async (node) => {
          const alt = node.alt ? `alt="${node.alt}"` : "";
          const result = await resolve(<string>node.url);
          const rawHtml = `<img class="lazy" src="${result.trace}" data-src="${result.src}" ${alt}>`;
          node.type = "html";
          node.value = rawHtml;
        }),
      )
        .then(() => next && next(null, tree, file))
        .catch((err) => {
          next && next(err, tree, file);
        });
    };
  };
};
```

The transformer will add `lazy` class to images and put the placeholder into `src`. Meanwhile, the original source is placed under `data-src`.

Beside, we need some Javascript codes to handle those `lazy` images after they are mounted. You can take a look at an example below:

```ts
React.useEffect(() => {
  const handleRouteChange = () => {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
      const lazyImageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src as string;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Possibly fall back to a more compatible method here
      lazyImages.forEach(function (lazyImage: HTMLImageElement) {
        lazyImage.src = lazyImage.dataset.src as string;
        lazyImage.classList.remove("lazy");
      });
    }
  };

  handleRouteChange();
  Router.events.on("routeChangeComplete", handleRouteChange);
  return () => {
    Router.events.off("routeChangeComplete", handleRouteChange);
  };
}, []);
```

There are few things regarding above codes:

- The code scans all images with the `lazy` class and utilizes `IntersectionObserver` api to load images whenever it's on the screen.
- `useEffect` is used to hook the mounted event and we will process lazy images whenever there is a route change.
- If the api is not available, it fallbacks to the default behaviour which means all images are loaded.
- For convenience, I add the code directly to `pages/_app.js` so it will impacts all pages.

### Tweaking Webpack

NextJS introduced [granular chunking](https://github.com/vercel/next.js/issues/7631) which helps to reduce the size of the initial bundle in most cases. However, in a simple blog, I find it more efficient to pack all common modules into one bundle instead of splitting them. Therefore, I just need to disable that option from NextJS. The change is quite simple:

```js
 {
    experimental: {
      granularChunks: false,
    },
  }
```

I then use [Lighthouse](https://developers.google.com/web/tools/lighthouse#devtools) to examine the loading time. Without it, we do not know whether an optimization is effective or not. You can try multiple configurations for the best result.

## Summary

NextJS is not just a simple SSR framework. Instead, it is actually a powerful framework by making things so easy to create a static website with `getStaticProps`. However, Hot Reload does not work well at the moment due to [this issue](https://github.com/vercel/next.js/discussions/12149). I hope that the development team will improve it in the near future.

One more thing, `getStaticProps` can be called multiple times for a same Markdown file and it can be optimized. I have done it by writing [a Webpack loader](https://github.com/bongnv/markdown-loader) to load those files to leverage Webpack caching mechanism. Also, Webpack loaders are much more reusable, it helps me save amount of working when playing with other frameworks like NuxtJS.

### References

Last but not least, here are some links for reference if you want to dig deeper:

- Github codes: https://github.com/bongnv/nextjs-blog-example
- Dynamic routes with NextJS: https://nextjs.org/learn/basics/dynamic-routes
- Creating NextJS app: https://nextjs.org/learn/basics/create-nextjs-app
- JAMStack: https://jamstack.org
