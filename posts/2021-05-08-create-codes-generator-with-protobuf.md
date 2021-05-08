---
title: Create a code generator with protoc
tags: ["go", "golang", "protoc", "protobuf", "code-generator", "protocol-buffer"]
excerpt: If your system happens to have a microservices architecture, you may find it repetitive to scaffold new services or to add new endpoints. In such scenarios, protobuf emerges to be an excellent choice for writing API contracts and generating code. However, you sometimes may want to add a custom code and it's actually quite simple with protoc though.
published: false
---

If your system happens to have a microservices architecture, you may find it repetitive to scaffold new services or to add new endpoints. In such scenarios, [`Protocol Buffer`](https://developers.google.com/protocol-buffers/) emerges to be an excellent choice for writing API contracts and generating code. However, you sometimes may want to add a custom code and it's actually quite simple with `protoc` though.

Before getting started, make sure you have [Go](https://golang.org/doc/install) environment ready. It's also important to be familiar with [Google protobuf](https://developers.google.com/protocol-buffers/). I highly recommend to run through the [Go tutorial](https://developers.google.com/protocol-buffers/docs/gotutorial) to generates Go code for any given protocol definition if you're new to the stuff.

While running through the tutorial, you may know that we will need install `protoc-gen-go` in order generate Go code. Yep, `protoc-gen-go` is a plugin of the `protoc` command written by Google and you can check out [its source code](https://github.com/golang/protobuf/blob/master/protoc-gen-go/main.go). We will write a similar program called `protoc-gen-my-plugin` to generate custom code. If the command to execute `protoc-gen-go` like below:
```shell
protoc --proto_path=. --go_out=. --go_opt=paths=source_relative foo.proto
```

The command to execute our plugin will be like:

```shell
protoc --proto_path=. --my-plugin_out=. --my-plugin_opt=paths=source_relative foo.proto
```
In the command, `my-plugin_out` specifies the output directory of the generated files and it also tells that `protoc` uses `protoc-gen-my-plugin` to generate the custom code. `my-plugin_opt` specifies the option for running the plugin. 

create folder, project

write code to setup

command to run

summarize