---
layout: post
title: "Testing against Rubinius on Travis CI"
description: "Get your rbx tests to pass on Travis"
categories: [ 'ruby' ]
tags: [ 'ruby' , 'docs' , 'hack' ]
published: true
---
{% include JB/setup %}

## Background:

Fourteen (14) days ago, my [Rubinius builds on Travis CI began erroring](https://travis-ci.org/metricfu/metric_fu/jobs/14269663)

Since, I can't seem to find a write-up on the final state of affairs, I've written-up a summary of what I did,
and how [I got the tests reliably passing](https://travis-ci.org/metricfu/metric_fu/jobs/14902745) one (1) day ago.

## The Fix:

1. Update travis.yml to specify `rbx` wherever you had `rbx-whatever`
2. Add a special travis gemfile or modify your gemfile to have some subset of

{% highlight ruby %}
platforms :rbx do
  gem 'rubysl', '~> 2.0'         # if using anything in the ruby standard library
  gem 'psych'                    # if using yaml
  gem 'racc'                     # if using gems like ruby_parser or parser
  gem 'minitest'                 # if using minitest
  gem 'rubysl-test-unit'         # if having test-unit problems
  gem 'rubinius-developer_tools' # if using any of coverage, debugger, profiler
end
{% endhighlight %}

Selected parts of my `.travis.yml`

{% highlight yaml %}
language: ruby
gemfile:
  - gemfiles/Gemfile.travis
rvm:
  - 2.0.0
  - 1.9.3
  - jruby-19mode # JRuby in 1.9 mode
  - rbx
matrix:
  allow_failures:
    - rvm: rbx
{% endhighlight %}

Selected parts of my `Gemfile.travis`

{% highlight ruby %}
source 'https://rubygems.org'

# to use, from the app root run
# export BUNDLE_GEMFILE=$PWD/gemfiles/Gemfile.travis
# when done, unset BUNDLE_GEMFILE

platforms :rbx do
  gem 'racc'
  gem 'rubysl', '~> 2.0'
  gem 'psych'
end

eval_gemfile File.expand_path('../../Gemfile', __FILE__)
{% endhighlight %}

For completeness, the working commands that now run on travis are

{% highlight ruby %}
rvm use rbx --install --binary --fuzzy
# rubinius 2.2.1 (2.1.0 3ed43137 2013-11-17 JI) [x86_64-linux-gnu]
rvm --version
# rvm 1.24.5 (latest-minor) by Wayne E. Seguin <wayneeseguin@gmail.com>, Michal Papis <mpapis@gmail.com> [https://rvm.io/]
{% endhighlight %}

## References:

- [Twitter conversation about the failures](https://twitter.com/judofyr/status/404994491998044160)
- [It appears part of the issue is whether or not the gem spec PLATFORM can/should/does refer to RUBY_ENGINE](https://github.com/rubygems/rubygems/issues/722)
- [Rubinius Post: Testing Your Project with Rubinius on Travis](http://rubini.us/2013/12/03/testing-with-rbx-on-travis/)

Original content source: [my comment on travis-ci issue](https://github.com/travis-ci/travis-ci/issues/1641#issuecomment-29773392)
