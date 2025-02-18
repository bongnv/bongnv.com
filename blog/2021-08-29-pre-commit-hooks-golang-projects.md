---
title: Pre-commit hooks with Go
date: 2021-08-29
tags: ["go", "golang", "pre-commit", "hooks", "git", "git-hook"]
excerpt: "Git hook scripts are becoming more and more popular. We run our hooks on every commit to automatically point out some simple issues in code before submission to code review. By pointing out these issues in this early phase, it allows a faster feedback loop than waiting for CI."
published: true
---

Git hook scripts are becoming more and more popular. We run our hooks on every commit to automatically point out some simple issues in code before submission to code review. By pointing out these issues in this early phase, it allows a faster feedback loop than waiting for CI. In Javascript world, it's [husky](https://typicode.github.io/husky/#/) that makes Git hooks easy. While in Go, Git hooks are still uncommon. In this post, we'll go through steps to use [pre-commit](https://pre-commit.com/) to set up Git hook for a Go project.

The installation's pretty easy by following [their document](https://pre-commit.com/#install). I have a Macbook so I'll use `brew` to install it:

```bash
brew install pre-commit
```

Next, we'll add pre-commit configuration by creating a file named `.pre-commit-config.yaml`. You can either create the file from scratch or from a provided sample like:

```bash
 pre-commit sample-config > .pre-commit-config.yaml
```

The configuration file will look like:

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v3.2.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
```

Then I'll add the following lines in order to run [`golangci-lint`](https://golangci-lint.run/) before every commit that has Go files:

```yaml
- repo: https://github.com/golangci/golangci-lint
  rev: v1.41.1
  hooks:
    - id: golangci-lint
```

For the full set of options, please check [their document](https://pre-commit.com/#plugins).

After that, run the below command to set up the git scripts:

```bash
pre-commit install
```

Now `pre-commit` will run automatically on `git commit`. You can also use `pre-commit run -a` to run the git hook against all files.

Yeap, that's all about it. For reference, you can find an example of using `pre-commit` in a Go project in [this repo](https://github.com/bongnv/go-pre-commit-sample).
