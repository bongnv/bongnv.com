---
title: Integration Testing with Github Actions
date: 2021-09-18
tags: ["test", "testing", "go", "github-actions", "postgresql", "flyway"]
excerpt: "This is a short guide on how to implement integration testing with Github Actions, PostgreSQL, Flyway."
published: false
---

Integration testing is another layer of testing after unit testing. It groups multiple modules together and applies functional tests on those groups. In the scope of a backend service, it could be testing your module against a database or an external service. In this post, we'll go through setting integration testing with [Go](https://golang.org/), [PostgreSQL](https://www.postgresql.org/), [Flyway](https://flywaydb.org/), [Github Actions](https://github.com/features/actions).
