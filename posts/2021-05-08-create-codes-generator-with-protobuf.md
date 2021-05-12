---
title: Create a code generator with protoc
date: 2021-05-08
tags: ["go", "golang", "protoc", "protobuf", "code-generator", "protocol-buffer"]
excerpt: If your system happens to have a microservices architecture, you may find it repetitive to scaffold new services or to add new endpoints. In such scenarios, protobuf emerges to be an excellent choice for writing API contracts and generating code. However, you sometimes may want to add a custom code and it's actually quite simple with protoc though. In this post, we will walk through how to create a code generate with protoc.
published: false
---

If your system happens to have a microservices architecture, you may find it repetitive to scaffold new services or to add new endpoints. In such scenarios, [`Protocol Buffer`](https://developers.google.com/protocol-buffers/) emerges to be an excellent choice for writing API contracts and generating code. However, you sometimes may want to add a custom code and it's actually quite simple with `protoc` though. In this post, we will walk through how to create a code generate with protoc.

## Getting started

Before getting started, make sure you have [Go](https://golang.org/doc/install) environment ready. It's also important to be familiar with [Google protobuf](https://developers.google.com/protocol-buffers/). I highly recommend to run through the [Go tutorial](https://developers.google.com/protocol-buffers/docs/gotutorial) to generates Go code for any given protocol definition if you're new to the stuff.

While running through the tutorial, you may notice that we need install `protoc-gen-go` in order generate Go code. Yep, `protoc-gen-go` is a plugin of the `protoc` command written by Google and you can check out [its source code](https://github.com/golang/protobuf/blob/master/protoc-gen-go/main.go). In this guide, we will write a similar program called `protoc-gen-my-plugin` to generate custom code. The command to execute `protoc-gen-go` is like below:
```shell
protoc --proto_path=. --go_out=. --go_opt=paths=source_relative foo.proto
```

The command to execute our plugin will be like:

```shell
protoc --proto_path=. --my-plugin_out=. --my-plugin_opt=paths=source_relative foo.proto
```
In the above command, `my-plugin_out` specifies the output directory of the generated files and it also tells `protoc` to use `protoc-gen-my-plugin` to generate the custom code. `my-plugin_opt` specifies the option for running the plugin. 

Okay, let's write a simple program to test it. I simply use these commands to set up a new Go project:
```shell
mkdir protoc-gen-my-plugin
cd protoc-gen-my-plugin
go mod init github.com/bongnv/protoc-gen-my-plugin
export PATH=$PATH:"$(pwd)" # so protoc can find our plugin
```

Next, create simple `main.go` to just print a log:

```go
package main

import (
	"log"
)

func main() {
	log.Println("protoc-gen-my-plugin is called")
}
```

We also need to draft a simple `foo.proto` as an example:

```
syntax = "proto3";

message Foo {}
```
After all, we can try our plugin and the log should be printed like below:
```shell
% go build && protoc --proto_path=. --my-plugin_out=. --my-plugin_opt=paths=source_relative foo.proto

2021/05/08 16:28:31 protoc-gen-my-plugin is called
```

## Write logic to generate code

Now, `protoc` can find our plugin and execute it. We then can start to write logic to generate code.

create folder, project

write code to setup

command to run

summarize