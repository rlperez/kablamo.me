---
title: DIY Trackball | Hello World!
description: Baby steps, getting an application to run!
date: 2024-12-04
draft: true
tags: ['diy', 'trackball', 'rust', 'raspberry pi', 'pico']
---

## Introduction

I am finally getting around to beginning this work so let's get started. Today I will walk through starting with [Rust](https://www.rust-lang.org/) and getting a basic blinky application running on a [Raspberry Pi Pico](https://www.adafruit.com/product/5525). Rust is all of the crazy but more importantly it provides a lot of safety around memory management. As I am not an embedded developer that immediately adds value.

## Inventory
- Editor
- Terminal
- Raspberry Pi Pico
- [Breadboard](https://www.amazon.com/gp/product/B00XW2N1LI)
- Rust toolchain (Try [RustUp](https://rustup.rs/) for quickstart)
- [Raspberry Pi Debug Probe](https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html)

## Assembly

As you can see the inventory includes a debug probe. This was not in the initial parts list and is not fully required. An alternative approach, if you have another Pico, you can use it to act as a debug probe. This [article](https://mcuoneclipse.com/2022/09/17/picoprobe-using-the-raspberry-pi-pico-as-debug-probe/) shows how to configure that scenario. Since I am not experienced with programming a board like this I chose the easiest path, the debug probe linked in the inventory.

### Setup Your Device

This will vary depending on whether you have a Pico H, Pico, or Pico W. In my case my Pico H did not have an SH connector or header pins on the debug locations so I soldered a three pin header in place. It appears there are a number of Pico H boards sold that do have this connector present. The Pico also already has an embedded LED however that may not be the case for other RP2040 boards. In this picture you can see the LED to the left below the screw hole. This still works if you wire your own LED with minor code tweaking. More on that later.

{% image "./src/assets/images/blog/diy-trackball-pt2/probe-wiring.png", "Raspberry Pi Pico and debug probe wiring", "Image courtesy of raspberrypi.com" %}

At this point, just plug the USB cables from the probe and from the Pico into your computer. Next, configuring the build tools.

### Configure Build Tools

The fastest way to get started is with [rp-rs](https://github.com/rp-rs/rp-hal) which provides drivers for this board but also others as well. Fork this [template](https://github.com/rp-rs/rp2040-project-template) and this will form the basis of your project. Navigate to the directory and lets proceed to configure our tooling.

First, add the thumbv6m target that will support our RP2040 with two Cortex-M0+ cores.

```shell
❯ rustup self update
info: checking for self-update
  rustup unchanged - 1.27.1

❯ rustup update stable
info: syncing channel updates for 'stable-x86_64-unknown-linux-gnu'

  stable-x86_64-unknown-linux-gnu unchanged - rustc 1.83.0 (90b35a623 2024-11-26)

info: checking for self-update

❯ rustup target add thumbv6m-none-eabi
info: downloading component 'rust-std' for 'thumbv6m-none-eabi'
info: installing component 'rust-std' for 'thumbv6m-none-eabi'
```

Next, if you don't have systemd-devel installed it will need to be added.

```shell
❯ sudo zypper install systemd-devel
Loading repository data...
Reading installed packages...
Resolving package dependencies...

The following NEW package is going to be installed:
  systemd-devel

1 new package to install.

Package download size:   147.5 KiB

Package install size change:
              |     213.1 KiB  required by packages that will be installed
   213.1 KiB  |  -      0 B    released by packages that will be removed
```

With that installed, we can now install [elf2uf2-rs](https://github.com/jonil/elf2uf2-rs?) to generate our build artifact.

```shell
❯ cargo install elf2uf2-rs --locked

    Updating crates.io index
  Installing elf2uf2-rs v2.1.1
  ...
  Compiling elf2uf2-rs v2.1.1
    Finished `release` profile [optimized] target(s) in 6.94s
  Installing /home/fr0bar/.cargo/bin/elf2uf2-rs
   Installed package `elf2uf2-rs v2.1.1` (executable `elf2uf2-rs`)
```

In order to support our debug probe we should also install [probe-rs-tools](https://github.com/probe-rs/probe-rs)

```shell
❯ cargo install --locked probe-rs-tools
    Updating crates.io index
  Downloaded probe-rs-tools v0.25.0
  Downloaded 1 crate (206.1 KB) in 0.89s
  ...
  Installing /home/fr0bar/.cargo/bin/probe-rs
   Installed package `probe-rs-tools v0.25.0` (executables `cargo-embed`, `cargo-flash`, `probe-rs`)
```
