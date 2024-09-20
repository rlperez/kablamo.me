---
title: DIY Trackball | Why? Parts so far.
description: The trackball market essentially sucks. So, I am going to use what I know to make one.
date: 2024-09-19
draft: true
tags: ['diy', 'trackball' ]
---

## Current Market

The goal is something with around a 1000 Hz polling rate and 10,000+ dpi. This would put it in the realm of a budget performance mouse like the [Logitech G203](https://www.lenovo.com/us/en/p/accessories-and-software/keyboards-and-mice/mice/78016745) or [Razer Viper](https://www.amazon.com/Razer-Viper-Ultralight-Ambidextrous-Gaming/dp/B08QVM2JMQ). A pretty tall order when you consider the rather stagnant options in the trackball market. Where the [Kensington Slim Blade](https://www.amazon.com/Kensington-SlimBlade-Trackball-Mouse-K72327U/dp/B001MTE32Y) is considered one of the best. It is in a lot of ways but in power it is not with a fixed 1600 DPI and 125 Hz polling rate.

### The Options

However there are handful of options.

#### GameBall

Like the [GameBall](https://www.gamingtrackball.com/products/gameball-standard-edition-black-ball) I purchased to try out a new formfactor in the meantime. A rather nice device. Though, I feel like in making an ambidextrous design makes sacrifices in ergonomics. There is no apparent way to lock the LED color change button either and it's constantly touches accidentally. Performance wise it works pretty flawlessly as it's specs would indicate. Handles flicking from one end of the screen no problem.

#### Ploopy Classic

There is also the open source [Ploopy](https://ploopy.co/) family of devices. Which were the inspriration for me to undertake this endeavor. Selecting the right device you hit the performance numbers I was aspiring for. However, assembled these are quite steep at $155 assembled. You can save money buying it as a kit. And as a base I would have loved to buy the electronics kit for the Classic Trackball internals and play with the shell a bit. Such as using a slightly modified case to use ball bearings instead of roller bearings. Roller bearings being effectively pins that only are oriented for some directions in which the ball can roll.

#### L-Trac

Lastly, we have the [CST L-Trac](https://xkeys.com/l-tracblue.html) which is a rather archaic looking option. I've never personally used one however I hear they are built like tanks and their hardware would indicate that they also hit the polling rate and dpi requirements I set. The reason I didn't select this device as a hold over while working on this project was the lack of buttons. While I hear good things about the scrolling having just 2 buttons was a bit of a dealbreaker.


## Tools
* [Weller](https://www.amazon.com/gp/product/B077JDGY1J) soldering iron
* [Breadboard](https://www.amazon.com/gp/product/B00XW2N1LI)
* Random assortment of jumpers
* 3d printer I don't yet have...maybe this [Creality](https://www.creality3dofficial.com/products/creality-store-ender-3-v3-ke-3d-printer-on-sale)?
* Rust compiler
* My Linux computer
* [Doom Emacs](https://github.com/doomemacs/doomemacs) because I am cool

## Parts List So Far
* [PMW3389 Motion Sensor](https://www.tindie.com/products/citizenjoe/pmw3389-motion-sensor/)
* [Raspberry Pi Pico](https://www.adafruit.com/product/5525) or other RP2040 variant such as this [Sparkfun](https://www.sparkfun.com/products/17745) or this [waveshare](https://www.waveshare.com/rp2040-plus.htm?sku=23504)
* Extra snooker ball from [GameBall](https://www.gamingtrackball.com/)
* 10x [Kailh GM8.0 V2 Micro Switches](https://www.amazon.com/dp/B0CMQ8XFC6)
* Cheap [mouse wheel encoder](https://www.amazon.com/dp/B0C142P465)
* Replacement Logitech [mouse wheel](https://www.amazon.com/dp/B0BWTVGBQV)
* Simple [custom PCBs](https://jlcpcb.com/) printed to hold mouse switches (more on this later)
* Assorted loose resistors and LEDs to maybe add some glow
* 3x [Bosch-Rexroth R053010810](https://buyrexroth.com/product/R053010810-ku-b8-ofk) bearings

As you can see this isn't exactly going to be saving money. There are things to be gained to make it worth the trouble. First, I get to have a trackball with the specs I want and whatever ergonomics that work for me. Then there are the skills to be gained from working with a programming a microcontroller in Rust to read from a sensor and act as an HID mouse. 
