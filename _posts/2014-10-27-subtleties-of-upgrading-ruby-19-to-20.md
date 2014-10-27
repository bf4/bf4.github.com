---
layout: post
title: "Subtleties of upgrading Ruby 1.9 to 2.0"
description: "Upgrading from Ruby 1.9 to 2.0 mostly painless"
tags: ["ruby"]
categories: [ 'ruby' ]
published: true
---
{% include JB/setup %}

There are six notable incompatibilities from Ruby 1.9.3 to 2.0.0:

- **UTF-8 by default**: The default encoding for ruby scripts is now UTF-8 [#6679]. Some people report that it affects existing programs, such as some benchmark programs becoming very slow [ruby-dev:46547].
- **Iconv was removed**, which had already been deprecated when M17N was introduced in ruby 1.9. Use String#encode, etc. instead.
- There is **ABI breakage** [ruby-core:48984]. We think that normal users can/should just reinstall extension libraries. You should be aware: DO NOT COPY .so OR .bundle FILES FROM 1.9.
- **#lines, #chars, #codepoints, #bytes now returns an Array instead of an Enumerator** [#6670]. This change allows you to avoid the common idiom "lines.to_a". Use #each_line, etc. to get an Enumerator.
- **Object#inspect no longer delegates to #to_s**.  It always returns a string like #<ClassName:0x…> [#2152]
- **Objects no longer respond_to? protected methods by default**

This last one bit me.  Protected methods treated like `private` for `#respond_to?` unless true is passed as a second argument.

e.g.

{% highlight ruby%}
f.respond_to?(:bar)         #=> false
f.respond_to?(:bar, true)   #=> true
{% endhighlight %}

References:

- [http://globaldev.co.uk/2013/03/ruby-2-0-0-in-detail](http://globaldev.co.uk/2013/03/ruby-2-0-0-in-detail)/
- [http://tenderlovemaking.com/2012/09/07/protected-methods-and-ruby-2-0.html](http://tenderlovemaking.com/2012/09/07/protected-methods-and-ruby-2-0.html)
- [https://bugs.ruby-lang.org/issues/3562](https://bugs.ruby-lang.org/issues/3562)
- [http://www.infoq.com/news/2012/11/ruby-20-preview1](http://www.infoq.com/news/2012/11/ruby-20-preview1)
- [https://www.ruby-lang.org/en/news/2013/02/24/ruby-2-0-0-p0-is-released](https://www.ruby-lang.org/en/news/2013/02/24/ruby-2-0-0-p0-is-released)/
