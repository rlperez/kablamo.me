---
title: About
permalink: /about/index.html
description: This is a personal development blog that will be used to showcase any interesting work I have been doing.
layout: page
---

## About Me

### Professional

### Personal

## About the Site

### Purpose
This blog is effectively a place for me to document my projects and experimentations that involve technology. I find using just GitHub to look through someone's work can be challenging. Github can be cluttered with little one off trials and forks without much actual change to fit one small change. A site like this where I can provide that adding context and pictures, highlighting the specific projects I find interesting is more useful. It is useful in conveying the details but also presenting in a way that does not necessarily require an understanding of the underlying technology.

### Technology
This site itself is an experimentation. Having worked with other static site generators such as [Hugo](https://gohugo.io/) and [Jekyll](https://jekyllrb.com/) I decided to look to see what is currently trending. During my research I came across [11ty](https://www.11ty.dev/) which hit much of what I would look for in a tool. 11ty has deployments by at least a few large shops. In this case there is Google, [jamstack.org](https://jamstack.org), Jetbrains, and many others. Next I looked at flexibility. 11ty appears quite flexible in configuration with a much less opinionated approach than some other static site generation tools.

In choosing configuration options, the number of officially [supported template languages](https://www.11ty.dev/docs/languages/) are numerous. In this case I chose to use [Nunjucks](https://mozilla.github.io/nunjucks/) which I had never previously used. One could even implementing their own handling using [Hiccup](https://github.com/weavejester/hiccup) for instance. Styles are handled by [TailwindCSS](https://tailwindcss.com/). I had very little experience working with Tailwind prior to this however it has become an industry standard and I should learn the basics. Wanting to get up running quickly I looked for a theme that had a structure I liked and picked [Eleventy Excellence](https://github.com/madrilene/eleventy-excellent/) as my starting point but over time I am sure it will diverge.

Since I already use [Vercel](https://vercel.com/) for other projects it is also where this lives. They already have a zero configuration deployment option for 11ty. The only changes required to get up and running was that I use [Bun](https://bun.sh) instead of standard [NodeJS](https://nodejs.org/) so I had to update the default commands used to build, test, and install dependencies. It also supports lambda style functions which I needed to support my contact form implementation. The primary reason is momentum as I have adopted it in most of my personal projects that require a Node runtime. Some of the perks are that Typescript it is effectively first class, Node.js compatible, and otherwise comes packaged with utilities I would have to install myself if I used the official NodeJS install.

Anyway, that is enough about me and this site.
<br />
_**HAPPY HACKING,**_
_**Rigoberto P.**_
