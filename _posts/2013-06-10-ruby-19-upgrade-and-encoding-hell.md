---
comments: false
date: 2013-06-10 00:00:00Z
layout: post
slug: ruby-19-upgrade-and-encoding-hell
title: Ruby 1.9 Upgrade and Encoding Hell
description: "Sometimes the encoding problem isn't in your code, it's in your cache"
categories: [Code]
tags: [ruby, encoding, utf8]
---
{% include JB/setup %}

TL;DR Sometimes the encoding problem isn't in your code, it's in your cache:
Clear the cache when ugrading to ruby 1.9

I pushed to production today an app that had been running on ruby 1.8.7-p72
Now, it's running on ruby 1.9.3-p392. We were ready to upgrade our ruby on
Friday, but decided to wait till today, Monday, just in case.  There weren't
any issues or much code to change, but it's better to be safe, right?

Shortly after we sent out the success email to the team, we started getting bug
reports of 500 errors that we saw in the logs were of the type
`ActionView::Template::Error (incompatible character encodings: UTF-8 and ASCII-8BIT)`
and `invalid multibyte escape`.

We first tried changing the encoding of our files, but caused exceptions on app start up

    find . -type f -name *.haml | xargs vim +"argdo se bomb | se fileencoding=utf-8 | w"
    # or
    git ls-files | xargs vim +"argdo se bomb | se fileencoding=utf-8 | w"

For whatever reason, trying to recode the files with `iconv` or `recode` didn't do anything.

We added the [Rack UTF8 Sanitizer middleware](http://whitequark.org/blog/2013/03/05/rack-utf8sanitizer/), but that didn't help

So, we added magic comments to all our relevant files

    prepend() {
       printf '%s\n' H 1i "${1}" . wq | ed -s "${2}"
     }
    find {app,config,lib/public} -name '*.rb' | while read 'x' ; do  prepend '# -*- encoding: utf-8 -*-' $x ;  done
    find {app,config,lib/public} -name '*.haml' | while read 'x' ; do  prepend '-# -*- encoding: utf-8 -*-' $x ;  done
    find {app,config,lib,public} -name '*.erb' | while read 'x' ; do  prepend '<%# -*- encoding: utf-8 -*- %>' $x ;  done

Still broken

The fix for multibyte escape error seemed pretty ugly, but worked easily enough

    # help out copy and pasting errors of good-looking email addresses
    # by stripping out non-ASCII characters
    def clean_ascii_text(text)
      # avoids invalid multi-byte escape error
      ascii_text = text.encode( 'ASCII', invalid: :replace, undef: :replace, replace: '' )
      # see http://www.ruby-forum.com/topic/183413
      pattern = Regexp.new('[\x80-\xff]', nil, 'n')
      ascii_text.gsub(pattern, '')
    end

We ensured our rails config set the encoding to utf8, that our database adapter was utf8, that our database tables
were collated as utf8. No dice.

We added to the top of `config/application.rb`

    +Encoding.default_external = Encoding::UTF_8
    +Encoding.default_internal = Encoding::UTF_8

No dice.

We had a breaththrough when we realized that re-saving items we surfaced on 500 made the page work.
And then realized in `config/environments/production.rb` we had set the cache store as

     config.cache_store = :file_store, "public/system/cache"

The errors were coming from ascii files in the file system cache.  We cleared the cache and everything worked.
That took 3 hours. I hope this saved you some time.

Links

* [Joel Spolsky: The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)](http://www.joelonsoftware.com/articles/Unicode.html)
* [Ruby 1.9.1 - invalid multibyte escape: // (RegexpError)](http://www.ruby-forum.com/topic/183413) [2](http://stackoverflow.com/a/3588872/879854)
* [Working with Encodings in Ruby 1.9](http://nuclearsquid.com/writings/ruby-1-9-encodings/)
* [Understanding M17n](http://web.archive.org/web/20120805034228/http://blog.grayproductions.net/articles/understanding_m17n), [Ruby 1.9's String](http://web.archive.org/web/20121013163453/http://blog.grayproductions.net/articles/ruby_19s_string)
* [Stripping Invalid UTF-8](http://www.spacevatican.org/2012/7/7/stripping-invalid-utf-8/) [2](http://www.ruby-forum.com/topic/208730)
* [Ruby 1.9 Encodings: A Primer and the Solution for Rails](http://yehudakatz.com/2010/05/05/ruby-1-9-encodings-a-primer-and-the-solution-for-rails/)
* [Upgrading From REE 1.8.7 to Ruby 1.9.3](http://nerds.airbnb.com/upgrading-from-ree-187-to-ruby-193/)
* [Lessons Learned Upgrading Harvest to Ruby 1.9.3](http://techtime.getharvest.com/blog/harvest-is-now-on-ruby-1-dot-9-3) [Code](https://gist.github.com/jeffyip/4091200#file_additional_monkey_patches.rb)
* [Ruby 1.9.2 encoding issues with Rails 2.3.10](http://jasoncodes.com/posts/ruby19-rails2-encodings)
* [UserVoice: How to upgrade a Rails 2.3.14 app to Ruby 1.9.3](http://wayback.archive.org/web/20120327041708/http://developer.uservoice.com/entries/how-to-upgrade-a-rails-2.3.14-app-to-ruby-1.9.3/) [Code](https://gist.github.com/1976864)
