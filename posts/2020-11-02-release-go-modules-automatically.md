---
title: Release Go modules automatically
date: 2020-11-02
tags: ["golang", "semantic-release"]
excerpt: I write about how to release a Go module automatically via semantic-release and Github Actions. I also include some tips to handle pre-releases.
published: true
---

If you happen to have some awesome Golang codes, you probably want to share it with others. Once sharing it, you will need to turn it into a [Go module](https://golang.org/ref/mod) and to version it. Therefore it can be managed easier and to be more friendly to users.

Well, releasing a Go module isn't so difficult but neither is it straightforward. Moreover, you're an engineer so you want to automate everything including this manual work.

Below is my experience when trying to automate the process of releasing Go modules via [`semantic-release`](https://github.com/semantic-release/semantic-release) and Github Actions. It wasn't so smooth but life is much easier after that.

## Prerequisites

### Commit message format

Our commit messages format must follow a convention that is understood by `semantic-release`. By default, `semantic-release` uses [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) but it can be changed by the configuration.

Here is an example of the release type that will be done based on commit messages:

| Commit message                                                                                                                                                                                   | Release type             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release            |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | Minor (Feature) Release  |
| `perf(pencil): remove graphiteWidth option`<br /><br />`BREAKING CHANGE: The graphiteWidth option has been removed.`<br />`The default graphite width of 10mm is always used for performance reasons.` | Major (Breaking) Release |

### Automated tests

We all want our modules to be released with its best in quality. The only way to achieve that is to take testing seriously. Since releasing is done automatically, so be testing.
Therefore, I would assume the CI is already implemented with proper automated testing. And we will only trigger the release step if all test cases are passed.

## Setup semantic-release

### Configuration

For Node modules, we can straightly use the default configuration. For Go modules, it requires some modifications as Golang doesn't use NPM repository. Thus, we will need to add `.releaserc.json`, which is `semantic-release`'s configure file, to the root folder in our repository:

```json
{
  "branches": [
    "main",
    {
      "name": "beta",
      "prerelease": true
    }
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

There are a few things I would like to highlight here:

- `@semantic-release/npm` is removed from the default `plugins` config because we don't need to publish our Go module to NPM repo. It's obvious, right?
- `main` is used instead of `master` which is the release branch by default. For those who may not know, Github recently renames the default branch from `master` to `main`. [Reference](https://github.com/github/renaming).
- `beta` is used as a pre-release branch when we're in a heavy development phase with frequent breaking changes. To learn more about release workflow, you can look into [`semantic-release` wiki](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration). I'm really impressed by how well it's documented.

For generating changelog, we will need to include two more plugins:

- [`@semantic-release/changlog`](https://github.com/semantic-release/changelog): to generate the changelog file. By default, it's `CHANGELOG.md`.
- [`@semantic-release/git`](https://github.com/semantic-release/git): to commit the generated changelog file to the repository.

I don't see `CHANGELOG.md` scale well and we already have git history so not including these steps makes things easier.

### Github Actions

Then, we add a new job in Github Actions workflow for releasing. It should look simple like this:

```yaml
jobs:
  test:
    # an amazing test configs
  release:
    name: Release
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release
```

- `needs: test` means the release job is only executed if the `test` job is successful.
- `npx semantic-release` is the command to execute `semantic-release`. `GITHUB_TOKEN` will be needed for tagging.
- `semantic-release` is able to detect if the job is triggered by pull_request and ignore it. Therefore, we won't need to worry about skipping the job from pull requests.

## Pre-releases

Sometimes, the module is in a heavy development and it's expected to have multiple breaking changes. In this situation, a pre-release version like v1.0.0-beta.12 is needed before a stable one. `semantic-release` supports this pretty well. All we need to do is:

- Create a `beta` branch and commit your changes here. Relevant commits in this branch will trigger `semantic-release` to create a new pre-release.
- Once the module becomes stable, we merge it to the `main` branch. The merge should trigger `semantic-release` to create a new stable version.

## Summary

`semantic-release` is a handy library. It can free your hands from release modules in a timely manner. One downside is that a buggy module can be released if automated tests are not properly implemented.

`semantic-release` is not the only package out there to automate the process. Another alternative written in Golang is [`go-semantic-release`](https://github.com/go-semantic-release/semantic-release). `go-semantic-release` doesn't have as many plugins as `semantic-release` but it works better with Go module. Especially, it allows starting versioning with `0.x.x` which is a Go's convention for pre-releases.

### References

- https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/pre-releases.md
- https://dev.to/zaracooper/18-essential-go-module-tidbits-for-a-newbie-4455
- Sample Repo: https://github.com/bongnv/inject
- https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md
