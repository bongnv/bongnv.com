---
title: Why group and order imports in Go?
date: 2022-03-09
tags: ["go", "conventions", "import", "best-practices", "golang"]
excerpt: "Why should I group and order imports in Go?"
published: true
---

When reviewing Go code, I usually find imports are not orderly grouped. For example, 3rd party imports could be in the middle of builtin imports or a local import is placed before 3rd party imports. Besides the readability concern, there is a possibility of impacting the logic. In Go, the order of import packages will decide the order of package initialisations. Therefore, if you want to initialise built-in packages first, you should import all built-in packages before any other. And, you also may want to import 3rd party packages before any local packages. Naturally, the order will become built-in packages, 3rd party packages then local packages.

However, you may ask why do I need to initialise packages in order? The reason is that you don't know if any of those packages will have any explicit or implicit dependencies and if any of them will require a certain order of initialisation. As a safety measure, it's always good to import them in a reasonable.
