---
title: Type checking for Gatsby with TypeScript
date: 2020-05-08
excerpt: I was looking for TypeScript support in Gatsby and fortunately there is native one which is ongoingly built by the Gatsby team. I then find it simple and would like to share it here for those who are looking for it.
published: true
tags: ["react", "gatsby", "typescript"]
---

Coming from Golang background, writing codes without type is somehow uncomfortable. Therefore, I was looking for TypeScript support in Gatsby to accommodate that and [`gatsby-plugin-typescript`](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/) is one of them. However, without core integration, the plugin has a couple of limitations like [this issue](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/#caveats). Fortunately, Gatsby is recently developing native support for Typescript ([link](https://www.gatsbyjs.org/blog/2020-01-23-why-typescript-chose-gatsby/)) to allow us to enable TypeScript easier without a plugin.

## Create a new site

Firstly, make sure `gatsby-cli` is installed or we can use this quick command to install it:

```shell
yarn global add gatsby-cli
```

Then create a new website by the bellowing command and follow the instruction

```shell
gatsby new gatsby-site
```

Just to ensure that the site is created successfully:

```shell
cd gatsby-site
gatsby develop
```

With the above command, Gatsby will start a hot-reloading development environment that is accessible by default at http://localhost:8000.

## Add type checking

You may notice that `page-2.tsx` is created with the default stater which means TypeScript is natively supported by Gatsby. However, there is still no type checking yet. We will implement it by installing these packages:

```shell
yarn add -D typescript @types/node @types/react @types/react-dom @types/react-helmet
```

Next, we need to add `tsconfig.json`. My laziness guided me to copy the file from [this file](https://github.com/gatsbyjs/gatsby/blob/master/examples/using-typescript/tsconfig.json) in `gatsby` repo:

```json
{
  "include": ["./src/**/*"],
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["dom", "es2017"],
    // "allowJs": true,
    // "checkJs": true,
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

To verify it, I run `tsc --noEmit`. Sadly, I got this error and the reason is that the `gatsby` module is not resolved properly:

```shell
~/projects/gatsby-site % tsc --noEmit
src/pages/page-2.tsx:3:33 - error TS2307: Cannot find module 'gatsby'.

3 import { PageProps, Link } from "gatsby"
                                  ~~~~~~~~

src/pages/page-2.tsx:5:20 - error TS7016: Could not find a declaration file for module '../components/layout'. '/Users/van.bong/projects/gatsby-site/src/components/layout.js' implicitly has an 'any' type.

5 import Layout from "../components/layout"
                     ~~~~~~~~~~~~~~~~~~~~~~

src/pages/page-2.tsx:6:17 - error TS7016: Could not find a declaration file for module '../components/seo'. '/Users/van.bong/projects/gatsby-site/src/components/seo.js' implicitly has an 'any' type.

6 import SEO from "../components/seo"
                  ~~~~~~~~~~~~~~~~~~~


Found 3 errors.
```

Checking `node_modules/gatsby`, it does define types in [`index.d.ts`](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby/index.d.ts) so the configuration is missing something. Actually, the fix is quite simple, I just add `"moduleResolution": "node",` to `complierOptions` in `tsconfig.json`.

Now, run `tsc --noEmit` again, `gatsby` module is resolved but there are some errors with importing `layout.js` and `seo.js`. It is totally fine, we will re-write those files in TypeScript.

For convenience, I added a script in `package.json` like `"type-check": "tsc --noEmit",` to have `yarn type-check` command.

## Rewrite codes in TypeScript

Type checking will fail because some components are not declared with types. We can fix it by simply rewriting those files in TypeScript, defining props and declaring types. Let's take `seo.js` as an example. I first rename the file to `seo.tsx` for the sake of convention, then adding types for props:

```ts
interface SEOProps {
  description?: string;
  lang?: string;
  title: string;
  meta?: Array<any>;
}
```

And add default values:

```ts
const SEO: React.FC<SEOProps> = ({
  description = "",
  lang = "",
  meta = [],
  title,
}) => {
  // some codes here
};
```

The type error should be gone if we run `yarn type-check` again.

## Summary

We have added type checking for the Gatsby default starter without any additional plugins thanks to the recent TypeScript support from Gatsby team. For your reference, all the codes are pushed to https://github.com/bongnv/gatsby-typescript-starter.

Furthermore, due to the strong integration with TypeScript, VSCode should work nicely with the project including type checking as well as intellisense.

If your project happens to use eslint, you can add these packages for TypeScript support:

```shell
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

and you might need to exclude some TypeScript rules from your js files in `.eslintrc.js` like I did:

```js
{
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
  ],
}
```

Follow [this issue](https://github.com/gatsbyjs/gatsby/issues/18983) for latest updates for TypeScript from Gatsby team and enjoy type checking when creating your great website!
