---
title: Dependency injection with Go
date: 2021-05-25
tags: ["go", "golang", "dependency-injection", "dependency-inversion"]
excerpt: One of the advantages of using Go is that programmers can quickly onboard and start writing code. And I've seen a colleague who was able to read Go code in the first day and submit code change for review in the third day. Because the language is simple and straightforward, Go programmers can start writing production code without much knowledge about OOP or design patterns like dependency injection. In this post, we'll discuss the importance of dependency injection and how to apply it in Go effectively.
published: true
---

One of the advantages of using Go is that programmers can quickly onboard and start writing code. And I've seen a colleague who was able to read Go code in the first day and submit code change for review in the third day. Because the language is simple and straightforward, Go programmers can start writing production code without much knowledge about OOP or design patterns like dependency injection. In this post, we'll discuss the importance of dependency injection and how to apply it in Go effectively.

## What is dependency injection?

> In software engineering, dependency injection is a technique in which an object receives other objects that it depends on. These other objects are called dependencies. In the typical "using" relationship the receiving object is called a client and the passed (that is, "injected") object is called a service. The code that passes the service to the client can be many kinds of things and is called the injector. Instead of the client specifying which service it will use, the injector tells the client what service to use. The "injection" refers to the passing of a dependency (a service) into the object (a client) that would use it.

The above is quoted from [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection) but I find it rather vague in Go context. So let's see how I understand it.

Firstly, what is a dependency? In my understanding, when a Go object or module (named A) depends on or relying on some functionalities from another Go object or module (named B), we will say B is a dependency of A. Then A can have multiple dependencies and B can be the dependency of different objects/modules. In reality, these connections only become more complicated over time when your business logic grow.

In this particular context, dependency injection is a technique in which the dependency B is passed ("injected") to A. This work can be done manually but it's usually boring and repetitive. Therefore, it's usually done with the help of a library. And in Java world, [Dagger](https://dagger.dev/) and [Spring](https://spring.io/) are famous libraries that handles dependency injection very well. In Go, [dig](https://github.com/uber-go/dig) works quite well.

## Why should we use dependency injection?

Dependency injection basically implements [the dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle). Therefore, it allows to decouple modules or a high-level modules should not depend on low-level modules, instead both should depend on abstractions (in Go, it's interfaces).

- Modules are replacable and they can be replaced with mocks in order to improve Unit testing.
- The application becomes more flexible as each module can be replaced, extended or upgraded easily.
- Because modules are loose coupling, they can be developed in parallel hence to improve the development velocity.

In Go, proper dependency injection can help to stucture codes much better. Firstly, dependencies are clearly organized and defined by contracts and global variables are avoided as dependencies are now injected instead. Secondly, it also means better modularisation and the code itself becomes easier to understand or to read.

## How to implement in Go?

However, manually injecting dependencies injection isn't clean and could be verbose. Without the help of a good library, the work can be manual and error-prone. Luckily there are some good libraries out there:

- [dip](https://github.com/uber-go/dig): Only supports to identify dependencies by types. As a result, there is a high chance of conflicts.
- [wire](https://github.com/google/wire): Supprots dependency injection by generating code automatically. It's an interesting approach but still there is a huge amount of code generated which could be hard to review.

Considering writing an injector isn't difficult. I also wrote my own [`injector`](https://github.com/bongnv/injector). It uses struct tags to indicate injection and then the library will use `reflect` to inject the dependencies.

```go
// ServiceAImpl is the example of an implementation.
type ServiceAImpl struct {}

// ServiceBImpl is another example of implementation that need to be injected.
type ServiceBImpl struct {
	// Here you can notice that ServiceBImpl requests a dependency with the type of *ServiceAImpl.
	ServiceA *ServiceAImpl `injector:"auto"`
}

func yourInitFunc() {
  i := injector.New()

  // add ServiceAImpl to the injector
  i.Component(&ServiceAImpl{})

  // create an instance of ServiceBImpl and inject its dependencies
  b := &ServiceBImpl{}
  i.Component(b)
}
```

It also allows initializing a dependency by functions and factories:

```go
// ServiceA has Logger as a dependency
type ServiceA struct {
  Logger Logger `injector:"logger"`
}

func newServiceA() (*ServiceA, error) {
  // init your serviceA here
}

type ServiceB struct {
  Logger Logger `injector:"logger"`
}

// Create creates a new instance of ServiceA
func (f ServiceBFactory) Create() (interface{}, error) {
  // logic to create A via Config
  return &ServiceB{}, nil
}

// init func
func yourInitFunc() {
  i := injector.New()
  i.Component("logger", Logger{}),
  // serviceA will be created and registered, logger will also be injected
  i.ComponentFromFunc(newServiceA),

  // Create ServiceB via Factory, dependencies will be injected.
  i.ComponentFromFactory(&ServiceBFactory{})
}
```

## To sum up

Usually, if the service is small, it maybe not worth to approach a library for dependency injection but you should always keep it in mind and always starting with the pattern. Otherwise, it will become a mess when the service scales to next level. It will be also easy to migrate if needs to.
