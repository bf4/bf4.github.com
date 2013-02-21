---
comments: true
date: 2010-12-13 16:37:22
layout: post
slug: passenger-trust-issue-on-rvm-1-1-4-fix
title: Passenger Trust issue on RVM 1.1.4 Fix
wordpress_id: 496
categories:
- Code
- Ruby
- software
tags:
- passenger
- rvm
---

> 

>     
>     if ENV['MY_RUBY_HOME'] && ENV['MY_RUBY_HOME'].include?('rvm')
>       begin
>         rvm_path     = File.dirname(File.dirname(ENV['MY_RUBY_HOME']))
>         rvm_lib_path = File.join(rvm_path, 'lib')
>         $LOAD_PATH.unshift rvm_lib_path
>         require 'rvm'
>         #RVM.use_from_path! File.dirname(File.dirname(__FILE__)) #REMOVE THIS LINE
>       rescue LoadError
>         # RVM is unavailable at this point.
>         raise "RVM ruby lib is currently unavailable."
>       end
>     end
> 
> 



via [RVM: Ruby Version Manager - Passenger - Come on, ride the train, hey, ride it, woo woo...](http://rvm.beginrescueend.com/integration/passenger/).

On my Snow Leopard OS X Mac today I typed "rvm update" and then my Phusion Passenger apps stopped working. I got a message about trusting the rvmrc in my gemset.  Well, it seemed that for whatever reason, in the 1.0 version or RVM for Passenger 3, the RVM.use_from_path! is broken and not necessary.  After much fuss and reviewing the recommended setup_load_paths.rb, I just removed that line and my app began working in Passenger again.

rvm rvmrc {trust,untrust} "app path" didn't fix it.

Putting "set rvm_trust_rvmrcs_flag=1" in my ~/.bash_profile didn't fix it either

And FWIW, though I'm on Bundler 1.0.7, I use this because it works.


> 

>     
>     # # Or Bundler 0.9...
>      if File.exist?(".bundle/environment.rb")
>        require '.bundle/environment'
>      else
>        require 'rubygems'
>        require 'bundler'
>        Bundler.setup
>      end
> 
> 

