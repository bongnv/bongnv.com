---
title: Releases with Semantic-release
date: 2020-05-03
excerpt: I used semantic-release to speed up the handy work when publishing npm packages.
published: true
tags: ["npm", "semantic-release", "javascript"]
---

I have been writing a coupe of [NPM packages](https://www.npmjs.com/) recently and publishing those NPM packages was quite manual and repetitive. Including bumping versions, changelog and Github releases, the amount of manual work will cost plenty of time. It could easily take up to 30 minutes to have a nicely published NPM package. I then googled the problem and found [`sementic-release`](https://github.com/semantic-release/semantic-release). The tool is very handy as it provides a bunch of cool features due to its plugins system.

`semantic-release` supports CI workflow as well as local workflow; however, I only used it with a local workflow.

## Installation

In order to start using `semantic-release`, you will need to setup both NPM token as well as Github token in environment variables. I store them in one of my dotfiles for convenience. An example of my `.localrc`:

```bash
export GH_TOKEN=someveryrandomgithubtoken
export NPM_TOKEN=anothersuperrandomnpmtoken
```

If you not sure how to generate those tokens, [`semantic-release-cli`](https://github.com/semantic-release/cli) can help to generate them in few minutes and initialize configurations for a project. I used it in my first project to get tokens and to be familiar with the tool. I then no longer use it as it keeps asking passwords and MFA token which is inconvenient:

```bash
yarn global add semantic-release-cli
semantic-release-cli setup
```

`semantic-release-cli` basically adds `semantic-release` as a development dependency and a couple of configs to `package.json`.

If `GH_TOKEN` and `NPM_TOKEN` are configured, it might be faster to add `semantic-release` manually:

```bash
npm install --save-dev semantic-release
```

I updated `scripts` in `package.json` for convenience:

```json
{
  "scripts": {
    "release": "semantic-release"
  }
}
```

So I only need `yarn release` to access its commands.

## Configurations

I use `release.config.js` for storing configurations. By default, the configuration should be like this:

```js
module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};
```

With the default configurations, `semantic-release` will analyze commits using [Angular conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) to generate release notes. It then publishes to NPM repository and publishes a new release in Github. It also update `package.json` for the new package version but committing it. Therefore, an additional plugin is required in order to push the change to Github.

As I also want to generate `CHANGELOG` and commit the change to my repository automatically, I added two more plugins:

```bash
yarn add -D @semantic-release/changelog @semantic-release/git
```

and in `release.config.js`:

```js
module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    "@semantic-release/git",
  ],
};
```

The two new plugins will generate `CHANGELOG.md` and push it together with `package.json` to github. You can read more about them in:

- https://github.com/semantic-release/git
- https://github.com/semantic-release/changelog

## Release

After all of those configurations, Release is super simple. After saving your changes to the repository, you can run:

```bash
yarn release -d
```

to review your release notes. After verifying, you can use the following command to publish:

```bash
yarn release --no-ci
```

Then a new version of your package will be published to NPM and Github.

## CI

I didn't set up a CI as one-command release is more than enough for me. If you want to get of your hands free, you can try with Github Actions via [this document](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md). Another cool thing about `semantic-release` is that it can analyze the commit history to decide to change the version accordingly. Basically, everything can be automated.
