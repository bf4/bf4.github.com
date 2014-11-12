---
comments: true
date: 2010-12-01 12:56:51
layout: post
slug: unintentional-homebrew-pull-request-results
title: Unintentional Homebrew Pull Request Results
wordpress_id: 452
categories:
- Code
- top
tags:
- github
- homebrew
- perl
- perlbrew
- python
- pythonbrew
- ruby
---

> I'd go further than that and say we should consider removing python altogether in favour of pythonbrew.


via [Pull Request — Python26 by bf4 for mxcls homebrew - GitHub](https://github.com/mxcl/homebrew/pull/3432).

I wanted to install [Mozilla Labs Raindrop](http://mozillalabs.com/raindrop/) and needed to install Mercurial. So, I ran "brew install mercurial" and was greeted with the message


> Mercurial can be install thusly:
brew install pip && pip install mercurial


So began a journey of failed builds of Raindrop with Python 2.7, so I tried to go back to Python 2.6, but it was no longer in Homebrew, so I extracted the latest version and sent a pull request.

It turns out, there is a Python package manager called [PythonBrew](https://github.com/utahta/pythonbrew) (based on [PerlBrew](http://github.com/gugod/App-perlbrew)) and the Python formula may now be removed from Homebrew as a result of my work, though I closed my pull request to cancel it.

p.s. I haven't gotten Raindrop working yet and have given up for the time being.  [Contacts](http://mozillalabs.com/contacts/) I do enjoy and is easier to install.
