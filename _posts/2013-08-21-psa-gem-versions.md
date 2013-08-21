---
layout: post
title: "PSA: Specifying Your Gem Version Requirements"
description: "Know your tiddly-wakka""
category: community
tags: 
- ruby
- rubygems
published: true
---
{% include JB/setup %}

I too-frequently see rubyists misunderstand the meaning of the '~>' tiddly-wakka.

So, I'm providing this public service announcment by just quoting from the [rubygems docs on versioning](http://docs.rubygems.org/read/chapter/16)

Got it?  Using the ~> correctly makes the lives of everyone who depends on your gem easier.

Relevant background reading:

- [Semantic Versioning: Major / Minor / Patch](http://semver.org/) Breaking changes, new functionality, bug fix.
- [Pessimistic Versioning](http://joncairns.com/2013/07/using-the-pessimistic-version-constraint-operator-with-ruby-gem-versions/)
- Rubygems discussion on what to call the ~> operator [1](https://github.com/rubygems/rubygems/pull/123), [2](https://github.com/rubygems/rubygems/pull/124)
