---
title: Dependency injection with Go
date: 2021-05-25
tags: ["go", "golang", "dependency-injection", "dependency-inversion"]
excerpt: One of the advantages of using Go is that programmers can quickly onboard and start writing code. And I've seen a colleague who was able to read Go code in the first day and submit code change for review in the third day. Because the language is simple and straightforward, Go programmers can start writing production code without much knowledge about OOP or design patterns like dependency injection. In this post, we'll discuss the importance of dependency injection and how to apply it in Go effectively.
published: false
---

One of the advantages of using Go is that programmers can quickly onboard and start writing code. And I've seen a colleague who was able to read Go code in the first day and submit code change for review in the third day. Because the language is simple and straightforward, Go programmers can start writing production code without much knowledge about OOP or design patterns like dependency injection. In this post, we'll discuss the importance of dependency injection and how to apply it in Go effectively.

## What is dependency injection?

> In software engineering, dependency injection is a technique in which an object receives other objects that it depends on. These other objects are called dependencies. In the typical "using" relationship the receiving object is called a client and the passed (that is, "injected") object is called a service. The code that passes the service to the client can be many kinds of things and is called the injector. Instead of the client specifying which service it will use, the injector tells the client what service to use. The "injection" refers to the passing of a dependency (a service) into the object (a client) that would use it.

The above is quoted from [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection) but I find it rather vague in Go context. So let's see how I understand it.

Firstly, what is a dependency? In my understanding, when a Go object or module (named A) depends on or relying on some functionalities from another Go object or module (named B), we will say B is a dependency of A. Then A can have multiple dependencies and B can be the dependency of different objects/modules. In reality, these connections only become more complicated over time when your business logic grow.

In this particular context, dependency injection is a technique in which the dependency B is passed ("injected") to A. This work can be done manually but it's usually boring and repetitive. Therefore, it's usually done with the help of a library. And in Java world, [Dagger](https://dagger.dev/) and [Spring](https://spring.io/) are famous libraries that handles dependency injection very well. In Go, [dig](https://github.com/uber-go/dig) works quite well.

## Why should we use dependency injection?

- inversion of control
- separation of concerns

## How to implement in Go?
