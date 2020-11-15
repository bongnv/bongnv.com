---
title: Another ibus-unikey
date: 2016-03-15
published: false
---

Trong một khoảng thời gian dài, [IBus-Unikey][ibus-unikey-github] (tác giả [Lê Quốc Tuấn](mailto:mr.lequoctuan@gmail.com)) được biết đến như một bộ gõ tốt nhất cho cộng đồng người Việt sử dụng Linux.
Tuy nhiên, bộ gõ này vẫn tồn tại không ít nhược điểm:

- Lỗi bỏ dấu với một số từ chẳng hạn như "giờ, gió".
- Lỗi đang gõ khi chuyển cửa sổ bằng Alt+Tab hoặc click chuột.
- Lỗi random crash.

Khi mới chuyển sang dùng Linux, gặp mấy lỗi đó thấy khó chịu nên mình đã lấy source về để fix. Hầu hết lỗi đã được fix và commit lên [GitHub][github-link].
Đây là hướng dẫn để sử dụng:

**Ubuntu Trusty**

Ubuntu Trusty (14.04) thì đơn giản vì mình đã tạo bản build có sẵn ở [ppa:ankeoque/another-ibus-unikey][launchpad-link]. Để cài đặt:

```bash
sudo add-apt-repository ppa:ankeoque/another-ibus-unikey
sudo apt-get update
sudo apt-get install another-ibus-unikey
```

**Others**

Các bạn có thể download source về build từ [GitHub][github-link].

[github-link]: https://github.com/bongnv/ibus-unikey
[launchpad-link]: https://launchpad.net/~ankeoque/+archive/ubuntu/another-ibus-unikey
[ibus-unikey-github]: https://github.com/mrlequoctuan/ibus-unikey
