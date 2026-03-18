---
title: Home Server Pt. 1
description: Setting up a home server for containers.
date: 2026-03-17
draft: false
tags: ["home server", "containers", "podman", "nomad", "vault", "consul", "fedora server"]
---

## Motivation

When I first purchased the computer I intended to use as my home server, I was intending to use it to help solidify my Kubernetes and Terraform skills for my role at Allegion but also with the added benefit of having a home server. Well, I was laid off and decided I would still use it to learn, however, I had more flexibility in how I would use it.

So, what did I want?
- Self hosting my own source code repositories
- Self hosting my own CICD pipeline to support those code repositories
- Self hosting Bitwarden, ending my password manager subscription
- Run personal projects locally for testing

As you will see below I have a rather modest mini PC to make all of this work so my choices revolve around stretching limited hardware, ease adding compute power, and ease of maintenance.

## Components

### Software

- [Fedora Server](https://getfedora.org/en/server/): Linux distribution
- [Ansible](https://www.ansible.com/): Configuration management
- [Consul](https://www.consul.io/): Service discovery
- [Vault](https://www.vaultproject.io/): Secret management
- [Nomad](https://www.nomadproject.io/): Container orchestration

#### Fedora Server

There are a lot of options in this space. My final choice was [Fedora Server](https://fedoraproject.org/server/). One reason for the choice was familiarity with Fedora spins, but one could really use any Linux distribution that supports the hardware on hand. Fedora Server does have some special features that make it a good fit for a home server.

- Comes preconfigured to run container workloads with libvrt or Podman
- Configured with reasonable defaults for a fresh server installation
- Excellent hardware compatibility with up to date kernels
- Runs on a wide range of hardware including Raspberry Pi
- Cockpit, preinstalled, gives an easy web interface to manage and monitor the server

{% image "./src/assets/images/blog/home-server-pt-1/cockpit-overview-1.png", "Fedora Server Cockpit overview page", "Screenshot of Fedora Server Cockpit overview page" %}

##### Setup

It really was very straight forward. This

- Make install USB with Fedora Media Writer
- Install simply following along with the installer
- Configure network settings and hostname
- Set up initial admin account and permissions
- Finish installation
- Reboot into running Fedora Server
- Copy SSH keys to server
- Make sure sshd is enabled as a service and running
- Disable admin password login for SSH
- Disable root login for SSH

The single configuration change here is my `sshd_config` file. You can edit the file at `/etc/ssh/sshd_config` or place a `sshd_config` file elsewhere and configure the service to use that configuration with the `-f` flag. This was my configuration change:

```
AllowUsers admin
Match User admin
        X11Forwarding no
        PasswordAuthentication no
```

##### Other options
- [Ubuntu Server](https://ubuntu.com/server): I generally avoid Ubuntu because of their decision to replace core executables with [Rust rewrites](https://lunduke.substack.com/p/ubuntu-replaces-sudo-with-untested) that do not pass all regression tests of what they replaced including `sudo`. Their `sudo` rewrite already introduced [vulnerabilities](https://www.phoronix.com/news/sudo-rs-security-ubuntu-25.10).
- [Alpine Linux](https://alpinelinux.org/): If you want minimal and lightweight, Alpine Linux could be a good choice. The reason I moved on from this choice was the amount of manual configuration required to get a fully functional server. It is totally possible and I was largely there but it was not worth the effort for me.
- [Fedora IoT](https://www.fedoraproject.org/iot/): This could be a very good choice if you are willing to try an immutable distro. Fedora IoT is similar to [Fedora CoreOS](https://fedoraproject.org/coreos/) however it comes with WiFi support out of the box. CoreOS on the other hand required ethernet to initially configure the system for my uses. My choice to skip it came from minor system differences that required additional work on my end as well as minor frustrations using Butane to configure the system and build those preconfigured images.
- [Void Linux](https://voidlinux.org/): Void Linux is a lightweight highly configurable original distro. The installation process is a straightforward terminal installer that allows you to install just the packages you need. While the core applications I intended to use were not available [xbps-src](https://github.com/void-linux/void-packages) can be used to integrate them as any other package. Normally, xbps-src is used to build and install packages from source, but I have also used it to add prebuilt binaries to my system. The sole reason I did not choose Void was I didn't want to make additional work for myself installing my main HashiCorp applications. If you have never used Void Linux, it is worth trying out if you already know your way around Linux.

#### Ansible

Since in the future I would like to add more nodes to my cluster, it seemed like a good idea to create a repeatable process to set up a server and configure my stack. My choice was [Ansible](https://www.ansible.com/), that I have never used before. A part of the reason of this project is learning so I used it to configure my server. There is no claim that it is idiomatic to an Ansible professional. My [ansible playbook](https://github.com/rlperez/home_server/tree/master/ansible) does work for my needs though it definitely could use some improvements and will likely need more work when I add more servers.

#### Nomad

When I was shopping for hardware I originally thought I would be using some flavor of Kubernetes such as [K3s](https://k3s.io/) or [k0s](https://k0sproject.io/). However, I decided to go with [Nomad](https://www.nomadproject.io/) because it is a more lightweight, open-source, and less complex orchestrator that can run independently or as part of a cluster. Nomad actually has another interesting feature, it can manage containers but also plain executables and scripts. You can see how I configured it [here](https://github.com/rlperez/home_server/tree/master/ansible/roles/nomad). The one addition to Nomad chosen was the [Nomad Podman Driver](https://developer.hashicorp.com/nomad/plugins/drivers/podman) so that I could use Podman for my containers. Here is approximately how I configured it:

```hcl
{% raw %}
datacenter = "homelab"
data_dir   = "/opt/nomad/data"

bind_addr = "0.0.0.0"

acl {
  enabled = true
}

advertise {
  http = "{{ ansible_default_ipv4.address }}:4646"
  rpc  = "{{ ansible_default_ipv4.address }}:4647"
  serf = "{{ ansible_default_ipv4.address }}:4648"
}

client {
  enabled = true
  network_interface = "{{ ansible_default_ipv4.interface }}"
  network_speed = 1000
  cni_path = "/opt/cni/bin:/usr/libexec/cni"
}

consul {
  address = "127.0.0.1:8500"
  token = "{{ nomad_server.consul.nomad_token }}"
  auto_advertise = true
  server_service_name = "nomad"
  client_service_name = "nomad-client"
}

server {
  enabled = true
  bootstrap_expect = 1
}

telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  prometheus_metrics         = true
}

tls {
  http = true
  rpc  = true

  ca_file   = "{{ nomad_vault.ca_file }}"
  cert_file = "{{ nomad_vault.cert_file }}"
  key_file  = "{{ nomad_vault.key_file }}"
}

ui {
  enabled = true

  consul {
    ui_url = "https://home-server-1.local:8501/ui"
  }

  vault {
    ui_url = "https://home-server-1.local:8200/ui"
  }
}

vault {
  enabled = true
  address = "{{ nomad_server.vault.addr }}"
  create_from_role = "{{ nomad_server.vault.get('nomad', {}).get('role', 'nomad-cluster') }}"
  token = "{{ nomad_vault_token }}"
  ca_file = "{{ nomad_vault.ca_file }}"
}

plugin "nomad-driver-podman" {
  config {
    volumes {
      enabled = true
    }
  }
}
{% endraw %}
```

As you can see, there is a configuration block for Consul which Nomad uses for service discovery, health checks, and finding more Nomad servers. It also uses Vault for centralized secret management but in conjunction with Consul, when a job is scheduled, it can register the service with Consul and inject a Vault token into the job's context allowing secrets retrieval.

```
··• nomad job run ./test/nomad/jobs/hello-world.nomad

==> View this job in the Web UI: https://127.0.0.1:4646/ui/jobs/hello-world@default

==> 2026-03-17T23:22:34-04:00: Monitoring evaluation "e4b528d5"
    2026-03-17T23:22:34-04:00: Evaluation triggered by job "hello-world"
    2026-03-17T23:22:34-04:00: Evaluation within deployment: "e1f5a0b7"
    2026-03-17T23:22:34-04:00: Allocation "7d72a164" created: node "aaad5279", group "web"
    2026-03-17T23:22:34-04:00: Evaluation status changed: "pending" -> "complete"
==> 2026-03-17T23:22:34-04:00: Evaluation "e4b528d5" finished with status "complete"
==> 2026-03-17T23:22:34-04:00: Monitoring deployment "e1f5a0b7"
  ✓ Deployment "e1f5a0b7" successful

    2026-03-17T23:22:46-04:00
    ID          = e1f5a0b7
    Job ID      = hello-world
    Job Version = 0
    Status      = successful
    Description = Deployment completed successfully

    Deployed
    Task Group  Desired  Placed  Healthy  Unhealthy  Progress Deadline
    web         1        1       1        0          2026-03-17T23:32:44-04:00
```

{% image "./src/assets/images/blog/home-server-pt-1/nomad-overview-1.png", "Nomad overview page", "Screenshot of Nomad overview page" %}


### Hardware

- HP EliteDesk 800 G2 DM ([pdf](https://h30434.www3.hp.com/psg/attachments/psg/Business-PC-Workstation-POS/52089/1/HP%20EliteDesk%20800%20G2%20QuickSpecs%20v31.pdf))
  - 4x Intel(R) Core(TM) i5-6500 CPU @ 3.20GHz
  - 16GB RAM
  - 256GB SSD

Certainly prior to the claimed RAM supply chain issues, these mini PCs were an affordable low power option to build a home server. Especially when you intend to cluster them together. This particular model can be either a 35W or a 65W model. There is a wide range of CPU options from older dual core i3 to a quad core hyper-threaded i7. The chipset used in this machine is available in mini pc form factor but also as an all in one or mini tower. Since I want a compact multi node cluster, I will be using the mini pc form factor.

The particular model I found at my price point, with my NewEgg credits, was the i5-6500 quad core model I have provided the specifications for. This model is also expandable to 32GB RAM if you can find an affordable set of DDR4 SODIMM modules. Right now, mine came with 16GB RAM and the prices for compatible used RAM is a little more than the budget permits at the moment. Should you want 32GB RAM, you may want to buy it already installed if you really need it. Opening the case it looks like the CPU heatsink may need to be pulled to change RAM. If I start hitting limits, my Raspberry Pi 8GB 4B could be added to the cluster until I find a good deal on RAM or another mini PC.

* Netgear Nighthawk AXE3000 USB Wireless Network Adapter
  * USB 3.0
  * WiFi 6e

Unfortunately, the model I purchased did not come with a WiFi adapter. The chipset used in this model does have a PCI slot available for a WiFi card, if you can find one that fits the form factor. After looking on eBay, I didn't find a good deal so I used a Netgear Nighthawk AXE3000 USB Wireless Network Adapter which was being used on a now retired laptop. My desktop reports around 1Gbps network speed and lives farther than where this server will reside so the speed and latency are acceptable until I run ethernet to that location. The connection has been stable, fast, and should perform well enough.

### Operating System

### Infrastructure as Code

### Container Orchestration

## Next Steps
### Pi Hole? Caddy?
