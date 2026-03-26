---
title: Some thoughts on writing tests
date: 2021-09-04
tags: ["test", "software-engineering", "testing"]
published: true
---

It isn't difficult to realise that testing in general and unit tests are important. It ensures your code work as expected and it guarantees that your code won't be broken in the future. If it's so important, let's write as many tests as possible. If we're able to cover all scenarios, our software will be perfect and there'll be no bug.

Well, tests don't come free. It needs time and effort to write good tests. But why do we need good tests? When we write software, we rely on tests to make sure of the correctness. But how can we make sure of the correctness of our tests? We can't just write tests for our tests. Therefore, we need to make sure tests are easy to read and easy to understand. It should be so simple that it's hard to make mistakes.

Maintaining is another problem. Like software, we don't write tests and leave them there untouched forever. Tests should be maintainable so they always work correctly to verify your code. Maintaining tests are probably more important as they are prone to break than your software. Therefore, when writing tests, we shouldn't have it in mind that we only write the test once. Believe me, it'll backfire very soon.

Writing good tests is difficult and maintaining them isn't easy. That's why I always believe that we should have a balance of the number of tests. We should have enough tests that cover the most important logic branches. We shouldn't have too many tests that become a burden. When you find that you spend more time maintaining your tests than maintain your software, then you probably have too many tests.
