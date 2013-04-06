---
comments: false
date: 2012-07-03 10:42:53
layout: post
slug: look-inside-your-ruby-classes-with-drx
title: Look inside your ruby classes with DrX
wordpress_id: 623
categories:
- Ruby
- software
tags:
- drx
- introspection
- visualization
---

[Justin Love](http://justinlove.name/) introduced me to a really interesting gem called [DrX that can visually display the internals of any ruby class, interactively](http://drx.rubyforge.org/)!

I had some trouble getting it to work, so I'll include my steps here:




	
  1. Ruby must be compiled with pthread. e.g. `rvm install 1.8.7-p72 -C --enable-pthread`

	
  2. You must have tk/tcl. This is most easily installed via [ActiveState ActiveTcl](http://www.activestate.com/activetcl). (I'm using [ActiveTcl 8.5.11.1](http://downloads.activestate.com/ActiveTcl/releases/8.5.11.1/ActiveTcl8.5.11.1.295590-macosx10.5-i386-x86_64-threaded.dmg))

	
  3. Install graphviz `brew install graphviz`

	
  4. Now, add `gem 'drx'` to your Gemfile, bundle, and load your console. try `ActiveRecord::Base.see` for example. (I leave the gem commented out of my Gemfile except when I want to use it).



[![DrX console for ActiveRecord::Base](/wp-content/uploads/2012/07/activerecord_base_drx1-300x181.png)](/2012/07/03/look-inside-your-ruby-classes-with-drx/activerecord_base_drx-2/) DrX console for ActiveRecord::Base

[![Full DrX diagram of ActiveRecord::Base, you'll need to zoom in](/wp-content/uploads/2012/07/activerecord_base-150x150.gif)](/2012/07/03/look-inside-your-ruby-classes-with-drx/activerecord_base/) Full DrX diagram of ActiveRecord::Base, you'll need to zoom in

Other introspection-type libraries I'm aware of (I'll update this)



	
  * rubydeps: [https://github.com/dcadenas/rubydeps](https://github.com/dcadenas/rubydeps)

	
  * railroady: [https://github.com/preston/railroady](https://github.com/preston/railroady) (fork of the older railroad [https://github.com/tobias/RailRoad](https://github.com/tobias/RailRoad) )

	
  * pelusa: [https://github.com/codegram/pelusa](https://github.com/codegram/pelusa)

	
  * laser: [https://github.com/michaeledgar/laser](https://github.com/michaeledgar/laser)


