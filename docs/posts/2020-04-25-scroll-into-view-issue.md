---
title: scrollIntoView issue with vue-router
date: 2020-04-25
excerpt: An issue with scrollIntoView which I bumped into while playing with GridSome. I fixed it by hacking vue-router initialization.
published: true
tags: ["vue", "gridsome"]
---

_Updated (2020-04-30):_

It turned out that `vue-router` couldn't handle the hash from the URL due to encoding issue and some weird behaviour in their scrolling logic. A more elegant fix is to override the `scrollBehavior` function in `main.js` like:

```
  router.options.scrollBehavior = (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        selector: decodeURI(to.hash),
        offset: { x: 0, y: 80 },
      };
    }

    return { x: 0, y: 0 };
  };
```

With this fix, we can discard all below fixes.

_Original:_

While I was adding a sidebar for my blog with [GridSome](https://gridsome.org/), I realized that headings wasn't clickable. It's supposed to move the screen to the heading. I was wondering whether it's a wrong link, so I checked the source codes. However they were generated properly:

```html
<a
  href="#the-issue"
  class="relative flex items-center py-1 text-sm transition transform hover:translate-x-1 font-bold text-primary"
  >The issue</a
>
```

Clicking `#the-issue` should scroll the page to that heading.

### scrollIntoView doesn't work properly

After googling, it looks like `vue-router` doesn't work well with `scrollTo` and `sticky` div element ([link](https://github.com/vuejs/vue-router/issues/1459#issuecomment-333827211)). And I use `sticky` for my sidebar. Luckily there is a comment to hack around the issue. A guy suggested to add these lines to use `scrollIntoView` instead of `scrollTo`:

```js
router.afterEach((to, from) => {
  document.getElementById("app").scrollIntoView();
});
```

Thus, I've added these lines to my `main.js`:

```js
router.afterEach((to) => {
  const id = decodeURI(to.hash).slice(1);
  if (id.length !== 0) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView();
    }
  }
});
```

These codes find the element by ID and then scroll the page into it.

### Open a link with hash

The above solution works for most cases except when you open the site via the link with heading anchor for the first time. In order to be able scroll to heading I added:

```js
  mounted() {
    this.$nextTick(() => {
      this.initObserver();
      const id = this.$route.hash.slice(1);
      if (id.length !== 0) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
        }
      }
    });
  },
```

### anchor with Vietnamese headings

You may wonder why that I uses `decodeURI` to get the decoded heading anchor. By `vue-router`'s implementation, `hash` param in the url is encoded for URI safe. Therefore, it has to be decoded to allow `getElementById` find the element properly.
