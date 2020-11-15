---
title: Viết blog bằng VuePress
date: 2020-04-21
excerpt: Bài viết này không chỉ hướng dẫn bạn tạo một blog cá nhân bằng mà còn giới thiệu cách tự động đưa lên Github Pages. Bài được viết một cách dễ hiểu nhất để ai có thể làm dù bạn mới lần đầu tiếp xúc với trang nội dung tĩnh.
published: true
tags: ["vue", "vuepress"]
---

[English](/blog/2020-04-21-blogging-with-vuepress/)

TLDR; Bài viết này không chỉ hướng dẫn bạn tạo một blog cá nhân bằng [VuePress](https://vuepress.vuejs.org/) mà còn giới thiệu cách tự động đưa lên [Github Pages](https://pages.github.com/). Bài được viết một cách dễ hiểu nhất để ai có thể làm dù bạn mới lần đầu tiếp xúc với [trang nội dung tĩnh](https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators).

## Sao lại dùng VuePress?

Thực ra lúc bắt đầu, mình cũng không có lý do cụ thể nào để chọn VuePress. Lúc đó mình đang học [VueJS](https://vuejs.org/) nên tiện thể vọc luôn VuePress. Sau khi dùng thử thì thấy khá dạo của nó diện đơn giản. Không những cài đặt đơn giản mà tài liệu của VuePress cũng rất cụ thể, chắc do cùng core team của VueJS.

## Bắt đầu với VuePress

### Cài đặt

Để bắt đầu, bạn cài `vuepress` và `@vuepress/theme-blog` bằng `yarn` (`npm` cũng tương tự):

```bash
mkdir my-blog && cd my-blog
yarn add vuepress @vuepress/theme-blog -D
```

Ở đây:

- `vuepress` là công cụ để tạo ra trang web tĩnh.
- `@vuepress/theme-blog` sẽ cho bạn một bộ plugin để làm blog và một giao diện mặc định.

### Cấu hình

Cấu hình của VuePress được lưu ở `.vuepress/config.js`. Bạn có thể tham khảo thêm thông tin chi tiết ở [đây](https://vuepress.vuejs.org/config/). Tuy nhiên, mình bắt đầu đơn giản thôi:

```js
module.exports = {
  title: "My blog",
  description: "This is another blog.",
};
```

Khi dùng VuePress, có hai lệnh cơ bản sau đây:

- `vuepress dev` để chạy thử ở máy cá nhân
- `vuepress build` để tạo ra trang web tĩnh và đặt ở thư mục `.vuepress/dist`. Sau đó mình có thể đưa trang này lên Internet.

Để cho tiện, mình sẽ đưa hai lệnh này vào `package.json`:

```json
{
  ...
  "scripts": {
    ...
    "dev": "vuepress dev", // starts a development server with automatic reload.
    "build": "vuepress build" // builds your website.
  }
}
```

Bạn cũng có thể tham khảo thêm ở [đây](https://vuepress.vuejs.org/api/cli.html).

Sau đó, bạn hãy chạy `yarn dev` và thử truy cập vào `localhost:8080` để kiểm tra.

> Bạn sẽ nhìn thấy trang 404 bởi vì blog vẫn chưa có nội dung.

### Trang chủ

VuePress dùng ngôn ngữ Markdown để viết. Trong đó, `README.md` sẽ được xử lý thành `index.html`. Để lấy ví dụ, mình sẽ sửa `README.md` với nội dung cho trang giới thiệu:

```
---
title: About
---
<h1> Hi world! </h1>

This is my blog.
```

> Vùng giữa `---` ở trên cùng được gọi là [Frontmatter](https://vuepress.vuejs.org/guide/frontmatter.html). Ngoài `title` ra còn nhiều cấu hình khác như: `date` hoặc `tags`.

### Trang trí

Giao diện mặc định của VuePress blog ([`@vuepress/blog`](https://vuepress-theme-blog.ulivz.com/)) khá ổn, nên mình sẽ sử dụng nó luôn. `config.js` sẽ được thêm như sau:

```js
module.exports = {
  ...
  theme: "@vuepress/blog" // dùng @vuepress/theme-blog cũng được
}
```

Bạn nào muốn giao diện khác có thể xem tại [đây](https://github.com/vuepressjs/awesome-vuepress).

### Bài viết

Bài viết sẽ được lưu mặc định ở `_posts`, khi đó cấu trúc thư mục sẽ trở thành như sau:

```
my-blog
├── _posts
│   └── 2020-04-29-hello-world.md
├── .vuepress
│   └── config.js
├── README.md
└── package.json
```

Mình tạo một bài viết đơn giản:

```
---
title: The first entry
date: 2020-04-29
---
This is my first blog entry.
```

Nếu bạn chưa tắt `yarn dev`, VuePress sẽ tạo ra một trang ở `localhost:8080/post/2020/04/29/hello-world.html` và một trang tổng hợp bài viết ở `localhost:8080/`.

> Ops, thế trang giới thiệu đi đâu?

Trang giới thiệu bị ghi đè mất, việc lấy lại khá đơn giản. Bạn chỉ cần đưa trang tổng hợp blog đến đường dẫn khác, ví dụ `/posts/`. Mình thêm vào `config.js` như sau:

```js
module.exports = {
  ...
  themeConfig: {
    directories: [
      {
        // Unique ID of current classification
        id: "post",
        // Target directory
        dirname: "_posts",
        // Path of the `entry page` (or `list page`)
        path: "/posts/",
      }
    ],
    nav: [
      {
        text: "Blog",
        link: "/posts/",
      },
    ],
  }
}
```

- `directories` dùng đề cấu hình [document classifiers](https://vuepress-plugin-blog.ulivz.com/guide/getting-started.html#directory-classifier). Bạn có thể thêm `writing` hoặc `photography` bằng cách tạo thêm thư mục mới.
- `nav` dùng để cấu hình thanh định hướng bên trên. Mình đơn giản tạo mỗi `Blog`.

## Đưa lên Github Pages

### Cài đặt

Github miễn phí rất nhiều thứ. Trong đó có Github Pages và Github Actions. Ở đây, mình sẽ dùng Github Pages để lưu blog (`https://bongnv.github.io/my-blog`) và Github Actions để đưa bài viết của mình lên đó tự động. Cấu hình rất đơn giản, bạn chỉ cần tạo file `.github/workflows/deploy.yml` như sau:

```yml
name: Deploy
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install and Build
        run: yarn && yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .vuepress/dist
```

Sau đó bạn đưa toàn bộ codes lên repository, của mình là `https://github.com/bongnv/my-blog`. Github Actions sẽ được kích hoạt tự động và đưa trang web của bạn lên, trang blog của mình là `https://bongnv.github.io/my-blog`.

Xém quên, bạn nên tạo `.gitignore` để tránh đưa những file không cần thiết lên repository. Đơn giản hoá thì bạn có thể chạy mấy lệnh tương tự như sau:

```
echo "node_modules" >> .gitignore
echo "dist" >> .gitignore
git init
git add .
git commit -m "first commit"
git remote add origin git@github.com:bongnv/my-blog.git
git push -u origin master
```

### Base path

Sau khi kiểm tra `https://bongnv.github.io/my-blog`, mình nhận ra có một số lỗi `404` vì đường dẫn chưa đúng. Nếu bạn giống mình thì thêm cấu hình này vào `config.js`:

```js
module.exports = {
  ...
  base: "/my-blog/"
}
```

Mặc định, VuePress để `base: "/"`, trong trường hợp của mình, nó cần phải là `/my-blog/`, vì thế blog không hiển thị được tốt.

## Tổng kết

Bài viết cố gắng đơn giản hoá các bước để ai cũng thể bắt đầu. Tài liệu của Vue cũng rất tốt, các bạn có thể dễ dàng tìm hiểu ở mấy trang sau:

- [Trang chính thức của VuePress](https://vuepress.vuejs.org/)
- [Trang chính thức của VuePress blog](https://vuepress-theme-blog.ulivz.com/)
- [Awesome VuePress](https://github.com/vuepressjs/awesome-vuepress)
