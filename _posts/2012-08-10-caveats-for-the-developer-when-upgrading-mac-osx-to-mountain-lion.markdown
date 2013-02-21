---
comments: false
date: 2012-08-10 10:11:15
layout: post
slug: caveats-for-the-developer-when-upgrading-mac-osx-to-mountain-lion
title: Caveats for the developer when upgrading Mac OSX to Mountain Lion
wordpress_id: 640
categories:
- IT
- tech
tags:
- mountain lion
- osx
---


	
  1. Make a copy of your /etc/hosts and anything in your /etc/apache2 as the upgrade totally blows these away.

	
  2. You will also have to reinstall any apache plugins, such as phusion passenger.

	
  3. If you had set iChat to log messages, this setting will not be carried forward to the new messages app

	
  4. You'll have to re-install all developer tools

	
  5. Mountain Lion moved the XCode directory, so uninstall the old one `sudo /Developer/Library/uninstall-devtools --mode=xcodedir`


To use homebrew, you'll have to fix some references:

	
  * `sudo chown -R `whoami` /usr/local`

	
  * `sudo chown -R mysql:mysql `brew --prefix`/mysql`

	
  * `brew update `



	
  * gcc:

	
  * `sudo ln -sf /usr/bin/llvm-gcc-4.2 /usr/bin/gcc-4.2`

	
  *      OR

	
  * `export CC=/usr/local/bin/gcc-4.2 `

	
  *      OR

	
  * `brew tap homebrew/dupes; brew install apple-gcc42`



	
  * x11:  (install [XQuartz](http://xquartz.macosforge.org/landing/))

	
  * `sudo ln -s /opt/X11/ /usr/X11`

	
  *      OR

	
  * `export CPPFLAGS=-I/opt/X11/include `


Other links

	
  * http://osxdaily.com/2012/02/20/uninstall-xcode/

	
  * http://robots.thoughtbot.com/post/27985816073/the-hitchhikers-guide-to-riding-a-mountain-lion

	
  * http://apple.stackexchange.com/questions/48099/gcc-not-found-but-xcode-is-installed

	
  * http://coderwall.com/p/dtbuqg

	
  * http://stackoverflow.com/questions/9353444/how-to-use-install-gcc-on-mac-os-x-10-8-xcode-4-4


