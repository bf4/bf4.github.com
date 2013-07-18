---
layout: post
title: "Ruby requires confusion"
description: "How should you load code: require, require_relative, or autoload?"
categories:
  - Code
  - Ruby
tags:
  - ruby
  - rubygems
comments: false
published: false
---
{% include JB/setup %}

## Message to Ruby Rogues maling list

TL;DR autoload looks great and is used all over rails, but it's not threadsafe and Matz said not to use it, prefer require or require_relative.  What should is true; is somebody wrong on the internet?

Content-Encoding: links, quotes and discussion
Content-Disposition: confused

Some time ago I got in the habit of always calling require with an absolute path

    require File.expand_path('../foo', __FILE__)

to ensure that all require arguments are full-paths and hence the same file is never loaded twice by a require statement.  I also do this when loading files, but there's no benefit I'm aware of.

In reading Jose Valim's Crafting Rails Applications (awesome!) I notice he uses autoload a lot, which I thought was frowned upon due to race-conditions or something.. but then all over the rails code base, I see

    autoload :Foo, 'relative/path/to/foo'

Since it always uses relative paths, as long as my code has a single entry point, such as in a gem, shouldn't this be a really a really common technique? I mean, unless I want to load a file that doesn't have a class in it, I should always use it, and then we don't need something like https://github.com/rspec/rspec-core/blob/master/lib/rspec/core.rb#L1


    require_rspec = if defined?(require_relative)
    
      lambda do |path|
    
        require_relative path
      end
    
    else
      lambda do |path|
    
        require "rspec/#{path}"
    
      end
    end

which is basically how rails autoloads files in https://github.com/rails/rails/blob/b025fca0c5/activesupport/lib/active_support/dependencies/autoload.rb  where it just tries to guess the autoload path if not given


    # This module allows you to define autoloads based on

    # Rails conventions (i.e. no need to define the path

    # it is automatically guessed based on the filename)
    #
    #   module MyLib

    #     extend ActiveSupport::Autoload
    #

    #     autoload :Model

so, autoload is great.. but wait, the old discussions are fairly serious that autoload isn't threadsafe and shouldn't be used

* http://bugs.ruby-lang.org/issues/show/921 and https://www.ruby-forum.com/topic/172385 in 2008 where Charles Nutter wrote

    Currently autoload is not safe to use in a multi-threaded application. To put it more bluntly, it's broken.
    
    The current logic for autoload is as follows:
    
    1. A special object is inserted into the target constant table, used as a marker for autoloading
    2. When that constant is looked up, the marker is found and triggers autoloading
    3. The marker is first removed, so the constant now appears to be undefined if retrieved concurrently
    4. The associated autoload resource is required, and presumably redefines the constant in question
    5. The constant lookup, upon completion of autoload, looks up the constant again and either returns its new value or proceeds with normal constant resolution
    
    The problem arises when two or more threads try to access the constant. Because autoload is stateful and unsynchronized, the second thread may encounter the constant table in any number of states:
    
    1. It may see the autoload has not yet fired, if the first thread has encountered the marker but not yet removed it. It would then proceed along the same autoload path, requiring the same file a second time.
    2. It may not find an autoload marker, and assume the constant does not exist.
    3. It may see the eventual constant the autoload was intended to define.
    
    Of these combinations, (3) is obviously the desired behavior. (1) can only happen on native-threaded implementations that do not have a global interpreter lock, since it requires concurrency during autoload's internal logic. (2) can happen on any implementation, since while the required file is processing the original autoload constant appears to be undefined.
* https://www.ruby-forum.com/topic/3036681 where Matz said in 2011 'autoload will be dead, I strongly discourage the use of autoload in any standard libraries'

other refs
* https://practicingruby.com/articles/shared/tmxmprhfrpwq
* http://www.rubyinside.com/ruby-techniques-revealed-autoload-1652.html
* https://www.ruby-forum.com/topic/1940423


## Summary of discussion on the Ruby Rogues mailing list

So, to boil it all down, our consensus recommendations:

1. When writing code that only uses rails
  * use autoload :ClassName, relative_path
  * this is okay since rails makes autoload not broken, and lazy loading is good.
  * otherwise, autoload isn't threadsafe and should not be used

2. Else,
  1. in a gem or library that is in the load path, (e.g. lib)
     * use vanilla :require since in all rubies the argument will searched for via the load paths. e.g. require 'foo/bar' in lib/foo.rb and in lib/foo/bar.rb use require 'bar/baz' to require 'lib/foo/bar/baz.rb'
       * to achieve lazy loading, put the require statement in a method or block to be evaluated when needed
     * using :require_relative can speed up require time as it essentially uses the absolute path (equivalent to File.expand_path("../#{argument}", __FILE__)
       * some prefer that library authors not use require_relative since it makes it impossible to mock/override the require in the test environment by manipulating the load path order. e.g. $:.unshift '.'; require 'foo_gem'
         * avoid using require File.expand_path('../foo', __FILE__) for the above reason
       * others prefer :require_relative whenever possible as it is faster https://rubyforge.org/pipermail/rspec-users/2011-November/020760.html
  2. in your own codebase e.g. your web app
    * :require_relative is usually the better route, even in rails.
    * beware that it doesn't work for evaluated (e.g. rack) apps https://gist.github.com/tjsingleton/5957780

Appendix:
  * never use Bundler or require 'rubygems' or anything like that in your gem (unless you are pry?)
  * you can also optimize load time by using Bundler.setup instead of Bundler.require in your project at the cost of having to require every library explicitly. Bundler.setup will add all your libraries to the load path, but won't actually require them. http://myronmars.to/n/dev-blog/2012/12/5-reasons-to-avoid-bundler-require
  * never use :autoload except as above https://practicingruby.com/articles/shared/tmxmprhfrpwq https://www.ruby-forum.com/topic/3036681  http://bugs.ruby-lang.org/issues/show/921
  * never manipulate the $LOAD_PATH in your library code. in test code it is okay. http://yehudakatz.com/2009/07/24/rubygems-good-practice/
  * worrying about double-loading via :require is legacy 1.8 http://devblog.avdi.org/2009/10/22/double-load-guards-in-ruby/
  * when using :load, do whatever you want?


## Other comments from the discussion

* http://myronmars.to/n/dev-blog/2012/12/5-reasons-to-avoid-bundler-require
