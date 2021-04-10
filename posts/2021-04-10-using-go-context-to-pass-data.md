---
title: Using Go Context to Pass Data
date: 2021-04-10
tags: ["go", "golang", "context"]
excerpt: Go context is an excellent and controversial feature. It's handy to pass data to deep level functions without exploding the complexity of codes. However, its convenience could also be a source of bugs in your program. This post will discuss one common problem when using Go context.
published: false
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