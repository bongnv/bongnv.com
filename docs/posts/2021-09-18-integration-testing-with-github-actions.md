---
title: Integration Testing with Github Actions
date: 2021-09-18
tags: ["test", "testing", "go", "github-actions", "postgresql", "flyway"]
excerpt: "This is a short guide on how to implement integration testing with Github Actions, PostgreSQL, Flyway."
published: true
---

Integration testing is another layer of testing after unit testing. It groups multiple modules together and applies functional tests to those groups. In the scope of a backend service, it could be testing your module against a database or an external service. In this post, we'll go through setting integration testing with [Go](https://golang.org/), [PostgreSQL](https://www.postgresql.org/), [Flyway](https://flywaydb.org/), [Github Actions](https://github.com/features/actions).

Let's start with this [sample Go app](https://github.com/bongnv/go-app-integration-testing/tree/073b6c92d7ee8f54f7f1b872f7107a09f270e721). It includes `Test_LoadDataFromDB` to test the function `LoadDataFromDB` which has interactions with a PostgreSQL database. And looking at `goapp_integration_test.go`, you may notice these `go:build` lines:

```go
//go:build integration
// +build integration
```

They are added so these tests will only run with a specific build tag:

```shell
go test -tags=integration
```

It'll help to separate integration tests from unit tests so you'll only run them for specific occasions.

The next step is to create a PostgreSQL service in our CI via [service containers](https://docs.github.com/en/actions/guides/creating-postgresql-service-containers) by adding these lines:

```yaml
services:
  postgres:
    image: postgres:13
    env:
      # Provide the password for postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - 5432:5432
    # Set health checks to wait until postgres has started
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
```

If you need to set up the database before your integration tests, you could use `flyway` to run the migration script. And luckily, there is [a Github action](https://github.com/joshuaavalon/flyway-action) for that:

```yaml
- uses: joshuaavalon/flyway-action@v1
  with:
    url: jdbc:postgresql://postgres:5432/postgres
    user: postgres
    password: postgres
    locations: filesystem:./migration/sql
```

In the above config, `./migration/sql` is the path to migration SQL scripts.

Finally, you can just add the `go test` command to run integration tests. It will also run unit tests so no need to have a separate step for that:

```yaml
- name: Run Tests
  run: |
    go test -v ./... -tags=integration
```

The work could be found in [this repository](https://github.com/bongnv/go-app-integration-testing). Although this is just a simplified version, you can just add more docker containers into your CI if your system is more complicated.
