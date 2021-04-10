---
title: Safely Use Go Context to Pass Data
date: 2021-04-10
tags: ["go", "golang", "context"]
excerpt: Go context is an excellent and controversial feature. It's handy to pass data to deep level functions without exploding the complexity of codes. However, its convenience could also be a source of bugs in your program. This post will discuss one common problem when using Go context.
published: true
---

Go context is an effective way to pass request-scoped data to like requestID, authenticated users, locale information or logger. Instead of having a complex list of parameters in a function, we can use context.Context to pass data and then to simplify the function. Below is a function with and without using context to pass data.
```go
// the function must take all request-scoped data.
func handlerLogic(w http.ResponseWriter, r *http.Request, requestID string, *user *User, locale string, logger Logger) {
  // some handler magic logic
}
```

and

```go
// the function uses context.Context to store data; therefore, function signature is much simpler.
// ctx.Value is used to retrieve data when needed.
func handlerLogic(w http.ResponseWriter, r *http.Request) {
  ctx := r.Context()
  requestID, ok := ctx.Value(ctxKeyRequestID)
  // some handler magic logic
}
```

With `context.Context`, function signature becomes simpler and consistent. We, therefore, can easily write a middleware to add functionality which is much harder before. Below is an example of a middleware to inject requestID into the context:

```go
func addRequestID(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    ctx := context.WithValue(r.Context(), ctxKeyRequestID, uuid.NewString())
    next.ServeHTTP(w, r.WithContext(ctx))
  })
}
```

However, such convenience doesn't come with zero downside. Firstly, the dependency and input of a function become hidden. For example, a generic function `func handlerLogic(w http.ResponseWriter, r *http.Request)` isn't enough to tell whether `requestID` is needed for the internal logic. We'll need to read `requestID, ok := ctx.Value(ctxKeyRequestID)` to know that requestID is needed and is extracted from the context. Such implicity isn't good for maintenance and is prone to error. Engineers will need to read the whole function in order to be aware of such dependencies.

The best solution is not to use context at all. However, if there is no better way, the data stored in context should be minimal and commonly accepted. My suggestion to mitigate that issue is to have descriptive comments to explicitly explain the dependency and input. The comment should include all information that is retrieved from the context.

Another compromise when using Go context is the missing of type information. Go context gives up type checking in order to gain the ability to write more versatile code. `context.WithValue()` and `context.Value` use `interface{}` to support different types of data and therefore there is no type checking at compile time. This is unclear to determine the what data is required and what data is expected. For example, `ctx.Value(ctxKeyRequestID)` can return a `string` or `UUID` object and which is unclear when reading the code.

One approach that I usually use is to implement a wrapper library to inject and retrieve data from context. First, it will centralize all pieces of information that we may expect from context. Secondly, it allows us to enforce what data should be injected and expected from context. Take requestID as an example, I would implement a wrapper like below:

```
package contextutil

type ctxKey int

const (
  _ ctxKey = iota
  ctxKeyRequestID
)

// WithRequestID creates a new context that has requestID injected.
func WithRequestID(ctx context.Context, requestID string) context.Context {
  return context.WithValue(ctx, ctxKeyRequestID, requestID)
}

// RequestID tries to retrieve requestID from the given context.
// If it doesn't exist, an empty string is returned.
func RequestID(ctx context.Context) string {
  if requestID, ok := ctx.Value(ctxKeyRequestID); ok {
    return requestId.(string)
  }

  return ""
}
```

`WithRequestID` and `RequestID` are provided to ensure that `requestID` will always be a string. `contextutil` is also a good place to list all common information which could be found from the context. Once it becomes a convention, it's less likely to be surprised about what data we can retrieve from context hence to make the codes more predictable.

In general, I like Go context idea to pass data through the program while processing a request which helps to make codes cleaner. However, I find it useful, handy and prone to errors at the same time. Although having a wrapper somehow limits the downside, I believe the best solution is still to limit the use of Go context to pass data.