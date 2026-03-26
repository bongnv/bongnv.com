---
title: Debloat my Huawei P30 Pro
date: 2020-05-15
published: true
tags: ["huawei", "hack"]
---

This is more like a note on how I debloated my Huawei P30 Pro than a technical post. It also worked for Mate 20 so I assume it works for Mate & P series and probably Honor series.

Before we start, please make sure that the device is connected to your laptop/computer. You can run the below command to verify it:

```shell
adb devices
```

It should list your device to the screen. To make the post short, installing ADB or connecting phones to computers would be out of topic here.

After connecting the phone to the laptop, I run this command to list all packages:

```shell
	adb shell 'pm list packages -f' | sed -e 's/.*=//' | sort
```

Reading through that together with [this guide](https://forum.xda-developers.com/honor-6x/how-to/guide-list-bloat-software-emui-safe-to-t3700814), I get some packages to disable. I choose to disable over to uninstall as it allows me to enable packages later if something goes wrong. Here are some commands to disable them:

```shell
adb shell pm disable-user --user 0 com.huawei.intelligent
adb shell pm disable-user --user 0 com.huawei.search
adb shell pm disable-user --user 0 com.huawei.hitouch
adb shell pm disable-user --user 0 com.huawei.hicard
adb shell pm disable-user --user 0 com.huawei.browser
adb shell pm disable-user --user 0 com.huawei.hifolder
adb shell pm disable-user --user 0 com.huawei.KoBackup
adb shell pm disable-user --user 0 com.huawei.hiaction
adb shell pm disable-user --user 0 com.huawei.vassistant
```

You can enable back those packages by using App section in Settings.

A bit off topic, this is for those who also want to get rid of some icons like NFC. I enable NFC all the time, it is redundant to show the icon in the status bar. Luckily, there is a way to do that with Huawei devices:

```shell
adb shell settings put secure icon_blacklist nfc,eyes_protect
```

This command requires a restart to take effect.
