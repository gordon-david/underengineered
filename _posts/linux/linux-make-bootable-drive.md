---
title: "Make a Bootable USB Drive With Linux"
author: "David Gordon"
date: "2021-10-18"
excerpt: "Making a bootable device with linux is trivial but easy to forget"
tags: ["linux"]
---

Creating a bootable device is trivial using `dd` under a unix system. Note that `dd` will overwrite the entire drive. `dd` should be available for any flavor of linux, unix, and most unix-like operating systems.

#### Resources
- [dd man pages](https://man7.org/linux/man-pages/man1/dd.1.html)
- [dd gnu coreutil man page](https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html)
- [dd (Unix) Wikipedia](https://en.wikipedia.org/wiki/Dd_(Unix))

## Steps

1. use `dd` on an unmounted drive (i.e. it's location should not appear under `lsblk`)
2. dd usage: `sudo dd bs=4M if=path/to/input.iso of=dev/sd<?> conv=fdatasync status=progress`
  - target (i.e. `of=...`) should be the drive itself rather than a particular partition of the drive.