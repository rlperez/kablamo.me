---
title: Switched to Bazzite, Mostly good.
description: Switching to Bazzite has been interesting exploring how to work within an immutable linux.
date: 2024-29-09
draft: false
tags: ['linux', 'bazzite', 'universal blue',]
---

## Bazzite? Immutable?

My primary computer is Linux. It has been Linux exclusively for about 5 years now. Also used at work for my entire career. At this point I had distro hopped plenty but had been using Fedora workstation for a year. But as is usual eventually something starts acting up. Perhaps library versions are shifting from tested dependencies here and there. You need this version but those things are tested on that version. Eventually the computer is intermittently crashing or applications are freezing up.

One of the problems it seems that an [atomic distro](https://itsfoss.com/immutable-linux-distros/) may prevent. There are a few options however I was already using Fedora so I went with [Silverblue](https://fedoraproject.org/atomic-desktops/silverblue/). Knowing I would likely have to install some proprietary codecs or drivers. This computer is used for gaming as well as programming. This led me to investigate was spins of Silverblue were out there which led me to [Universal Blue](https://universal-blue.org/), then their flavors [Bluefin](https://projectbluefin.io/) and [Bazzite](https://bazzite.gg/). Bluefin is more of a general workstation image and also has an additional option with developer tools are installed. Bazzite comes with [Wine](https://www.winehq.org/), [Bottles](https://usebottles.com/), [Steam](https://store.steampowered.com/), and other applications you would want for gaming and streaming. I chose Bazzite as I thought it would be easier to add developer tools than everything related to gaming.

 This system is much more like a cell phone where the core system is an immutable image and your user files are on top of it. When you update it typically would create/download a new image and swap it out. On boot which you would still have the previous version to revert back to should something go wrong. You have the `/etc` and `/var/home/{user}` directories to keep your files and make configuration changes.

Applications are typically [Flatpak](https://www.flatpak.org/) and [AppImage](https://appimage.org/) as they are self contained with the option of using [rpm-ostree](https://coreos.github.io/rpm-ostree/) to layer more to your image. The operating system is much like a Docker image. The issues here are that it's incredibly slow and also depending on your binaries you may have problems with dependencies which you can do nothing about. The more common workflow would be to use [Distrobox](https://distrobox.it/) to add tools in containers and if you need them in your standard workflows you would export them from the container. This works for both CLI binary tools as well as GUI applications. Both come with Distrobox, I didn't try Bluefin, however Bazzite also has another option that works great. [Homebrew for Linux](https://brew.sh/), the popular Mac tool but working on Linux. You don't get casks but you can manage your install with a Brewfile and make it easier to stand up a new machine.

At the moment my order of precedence for looking to install software is Flatpak, Homebrew, packages in Arch Distrobox, and lastly using `rpm-ostree` to add it as a layer. As of now all of applications, if they have a GUI are installed with Flatpak except for [Emacs](https://www.gnu.org/software/emacs/), [Visual Studio Code](https://code.visualstudio.com/), and [1Password](https://1password.com/). I personally really don't like trying to use Flatpak development tools. Bazzite ships with [Flatseal](https://github.com/tchx84/Flatseal) to help mitigate the permissions and access pains but it's just all annoying. All of my CLI tools so far are available with Homebrew and what isn't is absolutely in [AUR](https://aur.archlinux.org/).

## Problems?

### Huh, can't build anything

The first worth mentioning has to do with the terminal. Bazzite ships with [Ptyxis](https://devsuite.app/ptyxis/), a container aware terminal, and adds a bling script to dress it up. The feel largely is a slightly dressed up default GNOME terminal. Some changes `ls` to use [`exa`](https://the.exa.website/) and adds a number of other aliases for common flags. One of the ones they add however is `ld` which shadows the [linking tool](https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_mono/ld.html). Given Bazzite was originally made as a bit of a SteamDeck replacement operating system I guess this wouldn't matter to most. Though, even installing some tools have to natively compile and this breaks it. I am a [fish](https://fishshell.com/) user so I can just delete their fish function in my `config.fish` with adding the following:

```fish
functions -e ld
```

If one wanted they could just perhaps rename it to another command, perhaps `lsd`.

### Something just isn't working with distrobox export
The second issue encountered shows up setting up my development environment. Some suggested just installing everything in a container and exporting an IDE from there. My attempts all pretty much failed. Two things I believe encountered had to do with environment variables and the other almost seemed as if perhaps a symlink was not being followed. As of now all of my tools are installed by Homebrew however I am working on building a base container to use as [Devcontainers](https://containers.dev/) for Emacs [Tramp Mode](https://www.gnu.org/software/tramp/) and VS Code [Devcontainer support](https://github.com/microsoft/vscode-docs/blob/main/docs/devcontainers/create-dev-container.md).

### Spend a while installing software to fnially reboot to a bricked install
The last issue is actually the first one encountered. The base for this was a clean install of Fedora Silverblue and rebased (yes like git rebase sort of) to Bazzite. The first reboot on boot there was a message stating root is locked. Completely baffled using a recovery disk to use `chroot` to sort this out. This did not work, there appears to be some nuance needed here for Silverblue based systems. Starting from scratch again at some point in a terminal it actually says what needs to be done. If you catch this you will need to use `passwd` to set a root password. Even though it is in an info block of the documentation I didn't notice that it mentions the default root password is 'universalblue'. This problem was really me not catching a potential problem that may occur. It seems as though it may be an SELinux issue but I am not going to dig in any further.

### Opinions?
Recommended so far? Absolutely. Everything otherwise just works. Good performance in gaming on Steam. My Nintendo Switch, PS4, 8bitdo, and GameSir Cyclone all worked without any manual configuration. My IDEs work. No other idosyncracies that I have experienced at all. This sort of container focused Linux might be the future with a little more polish. Bazzite in particular seems extremely well suited to being a home theater PC since it can be configured with all manors of gaming emulators, ability to play Android applications, and Wine right out of the box you have a good gaming platform to start with. It already has major media codecs so streaming should be workign as well.
