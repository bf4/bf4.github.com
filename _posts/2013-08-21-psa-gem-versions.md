---
layout: post
title: "PSA: Specifying Your Gem Version Requirements"
description: "Know your tiddly-wakka"
categories: [ 'community', 'top' ]
tags:
- ruby
- rubygems
published: true
---
{% include JB/setup %}

I too-frequently see rubyists misunderstand the meaning of the '~>' tiddly-wakka.

So, I'm providing this public service announcment by just quoting from the [rubygems docs on versioning](http://docs.rubygems.org/read/chapter/16)

> *gem 'library', '>= 2.2.0', '< 3.0'*
>
> Doing this is cumbersome, so RubyGems provides a pessimistic operator ~> (read: approximately greater than). Using the pessimistic operator, we get:
>
> *gem 'library', '~> 2.2'*
>
> Notice that we only include 2 digits of the version. The operator will drop the final digit of a version, then increment the remaining final digit to get the upper limit version number. Therefore '~> 2.2' is equivalent to: ['>= 2.2', '< 3.0']. Had we said '~> 2.2.0', it would have been equivalent to: ['>= 2.2.0', '< 2.3.0']. The last digit specifies the level of granularity of version control. (Remember, you can alway supply an explicit upper limit if the pessimistic operator is too limited for you).

Got it?  Using the ~> correctly makes the lives of everyone who depends on your gem easier.

Relevant background reading:

- [Semantic Versioning: Major / Minor / Patch](http://semver.org/) Breaking changes, new functionality, bug fix.
- [Pessimistic Versioning](http://joncairns.com/2013/07/using-the-pessimistic-version-constraint-operator-with-ruby-gem-versions/)
- Rubygems discussion on what to call the ~> operator [1](https://github.com/rubygems/rubygems/pull/123), [2](https://github.com/rubygems/rubygems/pull/124)
