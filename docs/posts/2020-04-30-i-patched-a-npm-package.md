---
title: I patched a npm package
date: 2020-04-30 14:27:00
excerpt: The post gives a convenient way to patch a npm package for personal usage.
published: true
tags: ["npm", "javascript"]
---

I was using [Gridsome](https://gridsome.org/) to write this blog from Markdown contents. However, the [`transformer-remark`](https://gridsome.org/plugins/@gridsome/transformer-remark) plugin which transforms a Markdown content to a HTML content doesn't have the functionality to generate an excerpt automatically from the content itself. It requires the `excerpt` field to be filled manually in front matter. Plus I wanted it so bad that I couldn't wait for [the PR](https://github.com/gridsome/gridsome/pull/1085) to be merged and published to the npm repository. I then decided to create a patch for it so I can have the feature in my own blog as early as possible.

At first, I was thinking of publishing my own package which is a clone of `transformer-remark` plus the patch. [The document](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages) is pretty straightforward and I actually used it. However I soon realized that:

- It requires couple of steps to publish to npm.
- We need to maintain the version of the package for new changes.
- It would spam npm with unnecessary content if I keep doing it for every customization.

Later I found out that `npm` and `yarn` support to install a package from a `git` repository. It is so simple that you only need to:

- Patch the change & push it to your own git repository (I would do the same thing for all of my codes).
- Use the `npm` or `yarn` command like below to install it:

```bash
yarn add https://github.com/bongnv/transformer-remark
// or
npm install https://github.com/bongnv/transformer-remark
```

As the repository is a public one, any CI should have no problem to install the package from it. You won't need to register for a npm account nor to maintain a version of your package.

It's cool, right? I also happen to learn that beside git repository we can add from a local directory. We can also use `yarn link` or `npm link` to link a local fork of the package for testing purpose.
