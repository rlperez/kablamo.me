---
title: DIY Trackball | Hello World!
description: Baby steps, getting an application to run! 
date: 2024-12-04
draft: true
tags: ['diy', 'trackball' 'rust' 'raspberry pi' 'pico']
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

This will vary depending on whether you have a Pico H or either the Pico or Pico W. In my case my Pico H did not have an SH connector or header pins on the debug locations so I soldered a three pin header in place. The Pico also already has an embedded LED however that may not be the case for other RP2040 boards.

{% image "./src/assets/images/blog/diy-trackball-pt2/probe-wiring.png", "Raspberry Pi Pico and debug probe wiring", "Image courtesy of raspberrypi.com" %}
