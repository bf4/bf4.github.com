---
comments: false
date: 2013-03-20 00:00:00Z
layout: post
slug: yaml-and-security-in-ruby
title: YAML and security in Ruby
categories:
- Code
tags:
- yaml
---

## Vulnerability Summary

* YAML allows the de/serialization of arbitrary objects
* YAML libraries in Ruby allow the de/serialization of arbitary ruby objects
  * If the Ruby YAML implementation allocates and initializs the Ruby objects upon deserialization
    * Since symbols in Ruby aren't garbage collected, a hash can be crafted to crash the stack
    * Some system calls can be sent

There are relevant differences in the Syck and Psych implementations I will later expand upon.

## Required Reading

* [What this means for your startup](http://www.kalzumeus.com/2013/01/31/what-the-rails-security-issue-means-for-your-startup/)


## Recommended Reading

* http://tenderlovemaking.com/2013/02/06/yaml-f7u12.html
* http://blog.codeclimate.com/blog/2013/01/10/rails-remote-code-execution-vulnerability-explained/
* http://www.insinuator.net/2013/01/rails-yaml/
* http://www.reddit.com/r/netsec/comments/167c11/serious_vulnerability_in_ruby_on_rails_allowing/
* https://news.ycombinator.com/item?id=5028270

## Supplemental Reading

* https://github.com/tenderlove/psych/issues/119#issuecomment-12875715
* http://weblog.rubyonrails.org/2013/2/11/SEC-ANN-Rails-3-2-12-3-1-11-and-2-3-17-have-been-released/
* https://groups.google.com/forum/?fromgroups=#!topic/rubyonrails-security/61bkgvnSGTQ
* http://ronin-ruby.github.com/blog/2013/01/09/rails-pocs.html
* https://github.com/ronin-ruby/ronin-ruby.github.com/blob/rails-pocs/blog/_posts/2013-01-09-rails-pocs.md
* https://github.com/rapid7/metasploit-framework/blob/master/modules/auxiliary/scanner/http/rails_xml_yaml_scanner.rb
* https://community.rapid7.com/community/metasploit/blog/2013/01/09/serialization-mischief-in-ruby-land-cve-2013-0156
* https://community.rapid7.com/community/metasploit/blog/2013/01/10/exploiting-ruby-on-rails-with-metasploit-cve-2013-0156

## Workarounds

### [SafeYaml](https://github.com/dtao/safe_yaml)

{% highlight ruby %}

    SafeYAML::OPTIONS[:default_mode] = :unsafe
    SafeYAML::OPTIONS[:default_mode] = :safe

    # Ruby >= 1.9.3
    YAML.load(yaml, filename, :safe => true) # calls safe_load
    YAML.load(yaml, filename, :safe => false) # calls unsafe_load

    # Ruby < 1.9.3
    YAML.load(yaml, :safe => true) # calls safe_load
    YAML.load(yaml, :safe => false) # calls unsafe_load
    # The way that SafeYAML works is by restricting the kinds of objects that can be deserialized via YAML.load. More specifically, only the following types of objects can be deserialized by default:

    # Hashes
    # Arrays
    # Strings
    # Numbers
    # Dates
    # Times
    # Booleans
    # Nils

    # Using Syck (unfortunately, Syck and Psych use different tagging schemes)
    SafeYAML::OPTIONS[:whitelisted_tags] = ["tag:ruby.yaml.org,2002:object:OpenStruct"]

    # Using Psych
    SafeYAML::OPTIONS[:whitelisted_tags] = ["!ruby/object:OpenStruct"]

    # Don't sanitize disallowed types silently
    SafeYAML::OPTIONS[:raise_on_unknown_tag] = true

    # Symbols in Ruby are not garbage-collected; therefore enabling symbol deserialization in your application may leave you vulnerable to DOS attacks.
    # Guard: Uses YAML as a serialization format for notifications. The data serialized uses symbolic keys, so setting `SafeYAML::OPTIONS[:deserialize_symbols] = true` is necessary to allow Guard to work.
    # sidekiq: Uses a YAML configiuration file with symbolic keys, so setting `SafeYAML::OPTIONS[:deserialize_symbols] = true` should allow it to work.

{% endhighlight %}

see re: [PsychShield](https://github.com/dtao/safe_yaml/issues/22)

### [PsychShield](https://github.com/rapid7/psych_shield)

{% highlight ruby %}

    # By default, Psych Shield allows the following types of objects:

    # Hash Array String Range
    # Numeric Fixnum Integer Bignum Float Rational Complex
    # Time DateTime
    # NilClass TrueClass FalseClass
    # To enable additional classes, add the stringified form using the "add" method:

    PsychShield.add('MyClass::IsAwesome::And::Safe')
    # To disable all classes (even the defaults), use the clear method:

    PsychShield.clear

{% endhighlight %}
