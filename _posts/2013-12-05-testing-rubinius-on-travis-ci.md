---
layout: post
title: "Testing against Rubinius on Travis CI"
description: "Get your rbx tests to pass on Travis"
categories: [ 'ruby', 'top' ]
tags: [ 'ruby' , 'docs' , 'hack' ]
published: true
---
{% include JB/setup %}

## Background:

Fourteen (14) days ago, my [Rubinius builds on Travis CI began erroring](https://travis-ci.org/metricfu/metric_fu/jobs/14269663)

Since, I can't seem to find a write-up on the final state of affairs, I've written-up a summary of what I did,
and how [I got the tests reliably passing](https://travis-ci.org/metricfu/metric_fu/jobs/14902745) one (1) day ago.

## *Update 2014-02-10*

The [Rubinius 2.2.5 release now includes the standard library](https://github.com/rubinius/rubinius/releases/tag/v2.2.5), and so, you [no longer need a special :rbx group, only to specify rbx-2 in your travis.yml](https://github.com/tarcieri/http/pull/79#issuecomment-34628465)

[Changelog](https://github.com/rubinius/rubinius/releases/tag/v2.2.5):

> Standard library gems 'racc', 'minitest', and 'rubysl-test-unit' are now pre-installed, in addition to json and the RubySL gems. (Brian Shirai)

[Brian Shirai](https://github.com/tarcieri/http/pull/79#issuecomment-34628465):

> The 'rbx-2' is to limit testing on Rubinius 2.x since there will be other versions of Rubinius > 2.x soon. This part is unrelated to loading gems.

> I've changed Rubinius code loading to avoid Bundler stripping pre-installed gems. I'll be making a patch to Bundler so it will specifically consider pre-installed gems but in any case, Bundler will no longer prevent eg rubysl-securerandom or whatever from being loaded. I'm writing a Migrating from MRI guide that will cover this.

The now-recommended part of `.travis.yml`

{% highlight yaml %}
rvm:
  - rbx-2
{% endhighlight %}


## Original Fix:

1. Update travis.yml to specify `rbx` wherever you had `rbx-whatever`
2. Add a special travis gemfile or modify your gemfile to have some subset of

{% highlight ruby %}
platforms :rbx do
  gem 'psych'                    # if using yaml
  gem 'rubysl', '~> 2.0'         # if using anything in the ruby standard library (meta-gem)

  gem 'minitest'                 # if using minitest
  gem 'rubysl-test-unit'         # if using test-unit with minitest 5.x https://github.com/rubysl/rubysl-test-unit/issues/1

  gem 'racc'                     # if using gems like ruby_parser or parser
  gem 'rubinius', '~> 2.0'       # if using any of rubinius-developer_tools and/or rubinius-build_tools

  gem 'rubinius-build_tools'     # if using any ast parsing, processing, or building
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
cache: bundler
{% endhighlight %}

Notice the [`cache: bundler`](http://about.travis-ci.org/docs/user/caching/) line?
Since there are *a lot* of rubysl downloads, you can get a significant speed-up by telling Travis to cache them.

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

### Examples of rbx-specific Gemfile entries:

- [parser PR by @brixen](https://github.com/whitequark/parser/pull/118/):

  > I'm submitting a patch to Bundler after discussing with Andre that will
  > enable Rubinius to designate rubysl as gems that are bundled with the
  > distribution and Bundler will use that information while resolving.
  >
  > This patch is a stop-gap measure and I can submit another PR to remove
  > this once Bundler with that patch is released.

  {% highlight ruby %}
  platforms :rbx do
    gem 'rubysl', '~> 2.0'
    gem 'rubinius', '~> 2.0'
  end
  {% endhighlight %}

- [rubinius](https://github.com/rubinius/rubinius/blob/0a59255/Gemfile#L7):

  {% highlight ruby %}
  platform :rbx do
    gem "rubysl-rake", "~> 2.0"
    gem "rubysl-bundler", "~> 2.0"
    gem "rubysl-digest", "~> 2.0"
  end
  {% endhighlight %}

- [rspec-rails](https://github.com/rspec/rspec-rails/pull/871/)

  {% highlight ruby %}
  -  require 'test/unit/assertions'
  +  begin
  +    require 'test/unit/assertions'
  +  rescue LoadError
  +    # work around for Rubinius not having a std std-lib
  +    require 'rubysl-test-unit' if defined?(RUBY_ENGINE) && RUBY_ENGINE == 'rbx'
  +    require 'test/unit/assertions'
  +  end
  {% endhighlight %}

## References:

- [Twitter conversation about the failures](https://twitter.com/judofyr/status/404994491998044160)
- [It appears part of the issue is whether or not the gem spec PLATFORM can/should/does refer to RUBY_ENGINE](https://github.com/rubygems/rubygems/issues/722)
- [Rubinius Post: Testing Your Project with Rubinius on Travis](http://rubini.us/2013/12/03/testing-with-rbx-on-travis/)
- Rubinius meta-gems: [rubinius.gemspec](https://github.com/rubinius/rubinius/blob/master/rubinius.gemspec), [rubinius-developer_tools](https://github.com/rubinius/rubinius/blob/master/rubinius-developer_tools.gemspec),
  [rubinius-build_tools](https://github.com/rubinius/rubinius/blob/master/rubinius-build_tools.gemspec), [ruby-sl](https://github.com/rubysl/rubysl/blob/2.0/rubysl.gemspec),
  [rubysl-rake](https://github.com/rubysl/rubysl/blob/2.0/rubysl-rake.gemspec), [rubysl-bundler](https://github.com/rubysl/rubysl/blob/2.0/rubysl-bundler.gemspec),
  [rubysl-rspec](https://github.com/rubysl/rubysl/issues/7)

Original content source: [my comment on travis-ci issue](https://github.com/travis-ci/travis-ci/issues/1641#issuecomment-29773392)
