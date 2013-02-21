---
comments: true
date: 2011-11-01 12:49:23
layout: post
slug: bundler-ruby-gem-development-tricks
title: Bundler Ruby Gem Development Tricks
wordpress_id: 586
categories:
- Code
- Ruby
---

Developing your own gem for your own application can be a pain-- after you think you're done with the gem, push it, and load it into your application, and there's a defect, you need to go back to the gem, fix it, push it, and repeat. Or do you?

You don't.

**First:**

There are some variations on this solution, but here's my version.

In my `$HOME/.bash_profile` I add and source

`export APP_GEMS_DIR=$HOME/workspace/gemsdev`

(I also set it in my config/setup_load_paths.rb file that I use for passenger: `ENV["APP_GEMS_DIR"] = File.expand_path("../../../", __FILE__)`)

**Second:**

In my Gemfile I add

`
if ENV['APP_GEMS_DIR']
  # for local gem development, use local gem directory so gem changes don't need to be pushed to test
  gem 'my_gem', :path => "#{ENV['APP_GEMS_DIR']}/my_gem", :require => "namespace/my_gem"
else
  gem 'my_gem', :require => "namespace/my_gem", :git => path_to_git_repo, :tag => tagname
end
`

As to why in the else clause I specified the repo and the tag, that is to allow parallel gem development. I could also set it to `:branch => branchname`, or `:ref => ref_hash` for using a consistant gem branch for release development or to freeze the gem at a know good revision. In fact, with this technique, you could, if you wanted, never bump the gem version again!

On benefit of this technique, is that when using the local gem, after you bundle install, you don't have to keep do it again while you continue developing the gem.

To go back to non-gem-development mode, remove the lines you added from your bash_profile and setup_load_path.rb and unset $APP_GEMS_DIR

For an alternate way to manage gem development, see [Andy Maleh's post More Productive Rails Engine Development via Symlinking](http://andymaleh.blogspot.com/2011/09/more-productive-rails-engine.html)
