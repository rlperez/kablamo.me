---
title: Home Server Pt. 1
description: Setting up a home server for containers.
date: 2026-03-17
draft: false
tags: ["home server", "containers", "podman", "nomad", "vault", "consul", "fedora server"]
---

## Motivation

## self hosted git

learning ansible

learning kubernetes...but then nomad

## Components

### Hardware

* HP EliteDesk 800 G2 DM
  * 4x Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz
  * 16GB RAM
  * 256GB SSD

Certainly prior to the claimed RAM supply chain issues, these mini PCs were an affordable low power option to build a home server. Especially when you intend to cluster them together. This particular model can be either a 35W or a 65W model. There is a wide range of CPU options from older dual core i5 to a quad core hyperthreaded i7. The chipset used in this machine is available in mini pc form factor but also as an all in one or mini tower. Since I want a compact multi node cluster, I will be using the mini pc form factor.

The particular model I found at my price point, with my NewEgg credits, was the i5 quad core model I have provided the specifications for. This model is also expandable to 32GB RAM if you can find an affordable set of DDR4 SODIMM modules. Right now, mine came with 16GB RAM and the prices for compatible used RAM is a little more than the budget permits at the moment. If I start hitting limits, my Raspberry Pi 8GB 4B could be added to the cluster until I find a good deal on RAM or another mini PC.

* Netgear Nighthawk AXE3000 USB Wireless Network Adapter
  * USB 3.0
  * WiFi 6e

Unfortunately, the model I purchased did not come with a WiFi adapter. The chipset used in this model does have a PCI slot available for a WiFi card, if you can find one that fits the form factor. After looking on eBay, I didn't find a good deal so I used a Netgear Nighthawk AXE3000 USB Wireless Network Adapter which was being used on a now retired laptop. My desktop reports around 1Gbps network speed and lives farther than where this server will reside so the speed and latency are acceptable until I run ethernet to that location. The connection has been stable, fast, and should perform well enough.

### Operating System

### Infrastructure as Code

### Container Orchestration

## Next Steps
### Pi Hole? Caddy?
