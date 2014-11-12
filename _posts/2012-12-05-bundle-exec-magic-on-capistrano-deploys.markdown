---
comments: false
date: 2012-12-05 16:58:43
layout: post
slug: bundle-exec-magic-on-capistrano-deploys
title: Bundle exec magic on Capistrano deploys
wordpress_id: 665
categories:
- Code
- top
tags:
- bundler
- capistrano
- deployment
- rails
- ruby
---

Today the deploy failed, with the helpful message "You have already activated rake 0.9.2, but your Gemfile requires rake 0.8.7. Using bundle exec may solve this."  Rake 0.9.2 somehow go installed on our production server.  I checked my Gemfile and, yes, I had '0.8.7' specified. It looked like I could add `bundler/capistrano` to my `deploy.rb` file, but that seemed to change too many things.. so I just added

`set :rake, "bundle exec rake"`

and that did the trick. Magic ;)
