---
title: Error Handling when Consuming Streams
date: 2020-06-13
tags: ["backend"]
---

## Streams?

Stream is a confusing term and it is used in multiple situations. The stream I discuss in this post refers a stream of events which is usually implemented by [Kafka](https://kafka.apache.org/) where the order of events matters. in . Such implementation can be found in [Event Sourcing pattern](https://martinfowler.com/eaaDev/EventSourcing.html) to de-couple services. In some simpler cases, a stream can be used to get updates of remote resources asynchronously instead of consuming remote endpoints synchronously to improve the resiliency.

Normally such patterns come with a cost. By consuming the stream, we no longer have the control of what and how we want to consume. Therefore, we need to handle errors in such a way that other events are not impact. In other words, we need a more complicated error handling mechanism than just retrying to call remote endpoints. In this post, I would like to introduce few approaches that I find effective and useful.

### Error when Consuming Streams

What is error when consuming?
How does it happen?

### Why we should handle error?

How does it impact?
=> Why we should handle it?
What is the problem hand handling it

## How to handle errors?

Errors can come from many cases, it could come from bad codes or some dependency errors like DB or networks. The easiest approach is to skip those errors if possible. However, most of the time, we need to handle the error gracefully.

### In memory retry

I would say this approach is quite straight forward. All we need is just an in-memory retry and good back-off mechanism.

### Failure queue to offload

#### How to implement?

#### Pros?

#### Cons?

### Summary
