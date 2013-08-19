---
layout: post
title: "All Your Open Source Code Are Belong To Us"
description: "All Your Open Source Code Are Belong To Us"
category: community
tags: 
- open source software
- github
published: true
---
{% include JB/setup %}

## TL;DR Own your OSS Code

* Share problems
* Share fixes
  * including documentation, create issues

### Using OSS Code

_Disclaimer: This post is still in progress, but has sat in Draft long-enough_

Have you ever had trouble using a gem?

* "It doesn't work in some way" or
* "It's missing a feature" or
* "There is no/missing documentation"

What can you do about it?

Customarily:  Give up, complain, write ugly hack, blog about it

I used to give up, then one day, I made a monkey patch.  I submitted it as a pull request, but without tests, and it took me about a year
to pair with Andy Lindman and fix it. It was a great experience. Time passed.

I added more and more issues, made hacks, and forked repos for personal use, until one day, a light went on in my head.

"I can share what I learned. I can give back. I am part of the code community."

1. Ask a question / discuss the issue on the mailing list, if any
2. Create an issue in the repository.
  * Benefits: Learn to write a good bug report
3. Fix it
  * Fork the repository and make a Pull Request
    * Benefits: Read a lot of source code (-> understand!), get feedback, meet people, feel good, own it
  * Add documentation or helpful information to the wiki (not just on your blog!)

Share the problem, share the solution

#### Ways to Contribute to Open Source Code

* Create an issue
 * Good bug report: why doesn't work
 * New feature
 * No / Wrong / Hard to understand documentation
* Update wiki
* [Fork and submit PR](http://www.element84.com/github-pull-requests-made-easy.html)
 * Benefits:
   - Get feedback
   - Read code
   - meet ppl
   - feel good
   - learn

*Don't blog without adding an issue. Be nice to community*

### Maintaining OSS Code

How can you be a good maintainer of a gem?

* If the project is stale,
  * kill it.  Update the source repository with the project status.
  * Use 'stillmaintained'
  * Announce need for maintainers
* Attend to issues, pull requests, and mailing list messages
  * in a timely manner as reasonable
  * as politely as possible
  * to make people feel good about their efforts
* Have instructions on how to build the project, develop on it, contribute, etc.
  * History messages, commit style, code style

* Attend issues, PR's
* Ask for help / maintainer
* Label issues. Provide a 'jump in'
* Rejecting issues: be nice, 'nope'
* Publish updates / releases
* Document what it's for, how it's used
* Document how to contribute
* [Still Maintained badge](http://stillmaintained.com)
* [Semantic Versioning: Major / Minor / Patch](http://semver.org), Breaking changes, new functionality, bug fix. And see [pessimistic versioning](http://joncairns.com/2013/07/using-the-pessimistic-version-constraint-operator-with-ruby-gem-versions/)
* [Include a license in your repo and in your gemspec](https://github.com/bf4/gemproject/issues/1)

## Afterword

I was listening to a podcast recently where Aaron Patterson pleaded with people to make bug reports.  If we don't report the bugs,
he can't try to fix them!  For example, if there's a scenario where calling super in an ActiveRecord model doesn't work as excepted,
report it!

### Github

* [Github patterns](http://blog.quickpeople.co.uk/2013/07/10/useful-github-patterns/)
* [Git and Github secrets](http://zachholman.com/talk/more-git-and-github-secrets/)

I maintain some of the following projects if you want a place to jump in.

* [metric_fu](https://github.com/metricfu/metric_fu)
* [rubyfriends](https://github.com/rubyrogues/rubyfriends)
* [pair program with me](https://github.com/avdi/ppwm) and [ppwm-matcher](https://github.com/rubyrogues/ppwm-matcher/)
* [Saikuro](https://github.com/metricfu/Saikuro)
* [YUI-rails](https://github.com/nextmat/yui-rails)
