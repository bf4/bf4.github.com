---
layout: page
title: "YAML Resources"
---
{% include JB/setup %}

<section class="content">

## YAML, what is it good for?

YAML (YAML Ain't Markup Language)  has been a structured data format frequently used in of Ruby development for some time.  It has many useful features that often go unnoticed.  Its ability to store serialized objects has recently made much news in the form of very serious vulnerabilities in the Rails framework. 

Let's explore ways of using YAML beyond a simple store of arrays and hashes of data, as well as the risks and benefits of doing so.  

We will discuss YAML databases, configuration files, conversion into and from Ruby objects, incompatibilities between parsers (Syck and Psych) and the reasons for them, and some gotchas.   

Some reference will be made to YAML libraries in Ruby and other languages.  http://www.yaml.org/

In progress notes on the topic follow

## YAML Spec and Terminology

* [YAML Ain’t Markup Language (YAML™) Version 1.2](http://yaml.org/spec/1.2/spec.html)

{% highlight yaml %}
%YAML 1.2
---
YAML: YAML Ain't Markup Language

What It Is: YAML is a human friendly data serialization
  standard for all programming languages.
{% endhighlight %}

* Symbols
* Classes
* [JSON superset](http://yaml.org/spec/1.2/spec.html#id2759572)

<span style="font-size: 0.5em;">
The primary objective of this revision is to bring YAML into compliance with JSON as an official subset. YAML 1.2 is compatible with 1.1 for most practical applications - this is a minor revision. An expected source of incompatibility with prior versions of YAML, especially the syck implementation, is the change in implicit typing rules. We have removed unique implicit typing rules and have updated these rules to align them with JSON's productions. In this version of YAML, boolean values may be serialized as “true” or “false”; the empty scalar as “null”. Unquoted numeric values are a superset of JSON's numeric production. Other changes in the specification were the removal of the Unicode line breaks and production bug fixes. We also define 3 built-in implicit typing rule sets: untyped, strict JSON, and a more flexible YAML rule set that extends JSON typing.
</span>

###  Terms

<div style="font-size: 0.5em;">

    Collections
      Sequence
      Mapping

      Mapping-in-Sequence Shortcut
      Sequence-in-Mapping Shortcut

      Merge key

    Basic Types
      Strings
      Indicators in Strings
      Plain scalars
      Null
      Boolean
      Integers
      Integers as Map Keys
      Floats
      Time
      Date
      Blocks
      Single ending newline
      The '+' indicator
      Three trailing newlines in literals
      Extra trailing newlines with spaces
      Folded Block in a Sequence

    Aliases and Anchors

    Documents
    Trailing Document Separator
    Leading Document Separator
    YAML Header

    YAML For Ruby
    Symbols
    Ranges
    Regexps
    Perl Regexps
    Struct class
    Nested Structs
    Objects
    Extending Kernel::Array
    Extending Kernel::Hash

</div>

## YAML Ruby Library Code

* [YAML MRI 2.0.0](https://github.com/ruby/ruby/blob/v2_0_0_0/lib/yaml.rb)
* [YAML MRI 1.9.3](https://github.com/ruby/ruby/blob/v1_9_3_392/lib/yaml.rb)
* [YAML MRI 1.8.7](https://github.com/ruby/ruby/blob/v1_8_7_371/lib/yaml.rb)

### Psych and Syck

* [Psych isn't Syck](http://blog.tddium.com/2011/12/01/psych-isnt-syck/)
* [Psych vs. Syck](http://docs.tddium.com/troubleshooting/step-by-step-troubleshooting-guide/psych-vs-syck-yaml-parsing/)

## Guides

* [YAML homepage](http://yaml.org/)
* [Complete idiot's guide to YAML (config.yml)](http://dev.bukkit.org/server-mods/craftirc/pages/complete-idiots-guide-to-yaml-config-yml/)
* [YAML Tutorial](http://rhnh.net/2011/01/31/yaml-tutorial) [2](http://ess.khhq.net/wiki/YAML_Tutorial)
* [YAML Cookbook](http://yaml.org/YAML_for_ruby.html)

## Gotchas

* [Yaml, Psych and Ruby 1.9.2-p180 – Here there be dragons](http://pivotallabs.com/yaml-psych-and-ruby-1-9-2-p180-here-there-be-dragons/)

Ruby

* 1.8 : uses Syck
* 1.9 YAML == Psych, but can YAML::ENGINE.yamler = 'syck'
* 2.0 YAML == Psych, Syck removed from stlibi

## Tricks

{% highlight yaml %}
defaults: &defaults
  adapter: mysql2
  encoding: utf8
  reconnect: false
  pool: 5
  username: sqluser
  password: s3cret
  host: localhost

development:
  <<: *defaults
  database: app_development

test: &test
  <<: *defaults
  database: app_test

production:
  <<: *defaults
  username: productionsqluser
  password: productions3cret
  database: app_production
{% endhighlight %}



## [Security](/2013/03/20/yaml-and-security-in-ruby/)

* [What this means for your startup](http://www.kalzumeus.com/2013/01/31/what-the-rails-security-issue-means-for-your-startup/)
* [YAML F7U12](http://tenderlovemaking.com/2013/02/06/yaml-f7u12.html)
* [Rails' Remote Code Execution Vulnerability Explained
](http://blog.codeclimate.com/blog/2013/01/10/rails-remote-code-execution-vulnerability-explained/)
* [Analysis of Rails XML Parameter Parsing Vulnerability](http://www.insinuator.net/2013/01/rails-yaml/)
* [Reddit Discussion Of: Serious vulnerability in Ruby on Rails allowing arbitrary Ruby code execution in any Rails application  (groups.google.com)
](http://www.reddit.com/r/netsec/comments/167c11/serious_vulnerability_in_ruby_on_rails_allowing/)
* [HackerNews discussion of POC](https://news.ycombinator.com/item?id=5028270)

* [Psych issue to consider adding #safe_load](https://github.com/tenderlove/psych/issues/119#issuecomment-12875715)
* [[SEC][ANN] Rails 3.2.12, 3.1.11, and 2.3.17 have been released!](http://weblog.rubyonrails.org/2013/2/11/SEC-ANN-Rails-3-2-12-3-1-11-and-2-3-17-have-been-released/)
* [Multiple vulnerabilities in parameter parsing in Action Pack (CVE-2013-0156)
](https://groups.google.com/forum/?fromgroups=#!topic/rubyonrails-security/61bkgvnSGTQ)
* [Rails PoC exploits for CVE-2013-0156 and CVE-2013-0155](http://ronin-ruby.github.com/blog/2013/01/09/rails-pocs.html)
* [Metasploit Framework: Ruby on Rails XML Processor YAML Deserialization Scanner](https://github.com/rapid7/metasploit-framework/blob/master/modules/auxiliary/scanner/http/rails_xml_yaml_scanner.rb)
* [Serialization Mischief in Ruby Land (CVE-2013-0156)](https://community.rapid7.com/community/metasploit/blog/2013/01/09/serialization-mischief-in-ruby-land-cve-2013-0156)
* [Exploiting Ruby on Rails with Metasploit (CVE-2013-0156)
](https://community.rapid7.com/community/metasploit/blog/2013/01/10/exploiting-ruby-on-rails-with-metasploit-cve-2013-0156)
* [Analysis of Rails XML Parameter Parsing Vulnerability](http://www.insinuator.net/2013/01/rails-yaml/) and [the commit that introduced it](https://github.com/rails/rails/commit/27ba5edef1c4264a8d1c0e54675723d37a391dd8#L5R133)


## Interesting

* [YAML Support and Hash Representer In representable-1.2.7!](http://nicksda.apotomo.de/2012/10/yaml-support-and-hash-representer-in-representable-1-2-7/)
* [Putting YAML at the top of a Markdown file with Metadown](http://rubydoc.info/github/steveklabnik/metadown/master/file/README.md)

## Misc dump for now

* [YAML is terrible and should be driven from the face of the Earth.](https://github.com/markbates/configatron/issues/48#issuecomment-21877344)
* Psych 2.0
  * [Psych.safe_lod commit](https://github.com/tenderlove/psych/commit/2c644e184192975b261a81f486a04defa3172b3f)
  * [Whitelistied types](https://github.com/tenderlove/psych/blob/2cd98a2f/lib/psych.rb#L248-L282)
* Rails 4 uses [Josh Peek's sprockets-rails 2](https://github.com/rails/rails/pull/7964/files#L5L154) manifest files are now json, not yaml. In communication: JSON has better support in non-Ruby languages. 
* [How RubyGems.org patched Psych/Syck following the 2013 January attacks](https://github.com/rubygems/rubygems.org/issues/579)
* [Rails Allow to_xml and from_xml to work with AR models that have serialized fields](http://web.archive.org/web/20071218105822/http://dev.rubyonrails.org/ticket/7502)
* [Psych: Strings that look like dates should be treated as strings and not dates.](https://github.com/ruby/ruby/commit/9f688d53c2b5af5960d1e8d8fb09b26aa9d8b5f9)
* [Fun with Syck and Psych on Heroku. This is one of those posts that's inspired by a desire never to have to investigate the same bug again.](http://effectif.com/ruby-on-rails/syck-and-psych-yaml-parsers-on-heroku)
* [Psych-based yaml in Ruby 1.9.3 too slow](https://github.com/tenderlove/psych/issues/84)
* [Psych can't parse YML in RefineryCMS that syck can](https://github.com/tenderlove/psych/issues/10)
* [Delayed job 3.0.1 not working, breaks on to_yaml](https://github.com/collectiveidea/delayed_job/issues/350)
* [Convert Syck to Psych YAML format](http://darwinweb.net/articles/convert-syck-to-psych-yaml-format)
* [[Bug #3112] require "yaml" doesn't use psych as default](http://www.ruby-forum.com/topic/207565)
* [[ruby-trunk - Feature #6163][Open] Remove syck YAML extension](http://www.ruby-forum.com/topic/3869916)
* [Removing Syck from ruby](http://www.ruby-forum.com/topic/204389)
* [VCR: Request/Response data is saved to disk as YAML by default](https://www.relishapp.com/vcr/vcr/v/2-0-0-beta2/docs/cassettes/cassette-format#request/response-data-is-saved-to-disk-as-yaml-by-default)
  * [YAML issues in VCR](http://myronmars.to/n/dev-blog/2011/11/cassettes-in-vcr-2-0)
  * [hiding vcr recorded api credentials](https://github.com/mislav/movieapp/blob/28897b1afe56bea40c05e418ddaf3aad1deaf2ca/spec/support/vcr.rb#L134-L136)
* [Parsing YAML 1.1 with Ruby](http://www.opinionatedprogrammer.com/2011/04/parsing-yaml-1-1-with-ruby/)
* [Shaving A YAML Yak](http://blog.rubygems.org/2011/08/31/shaving-the-yaml-yak.html)
* [Force YAML to use syck rather than psych. Eventually delayed_job should be made compatible with both.](https://github.com/collectiveidea/delayed_job/commit/cbb4060)
* [work around the syck/psych confusion yaml brings to ruby 1.9.2 by trying to load psych before yaml](https://github.com/ahoward/systemu/pull/7)
* [SafeYAML: Support for custom deserializer?](https://github.com/dtao/safe_yaml/issues/21)
* [JRuby 1.9 problem with Syck](https://github.com/padrino/padrino-framework/issues/649)
* Q&A
  * [Why the difference in behavior of YAML parsers (syck and psych)?](http://stackoverflow.com/questions/8763498/why-the-difference-in-behavior-of-yaml-parsers-syck-and-psych)
  * [rails error, couldn't parse YAML](http://stackoverflow.com/questions/4980877/rails-error-couldnt-parse-yaml)

</section>
