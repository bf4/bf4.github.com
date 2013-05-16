---
layout: page
title: "YAML Resources"
---
{% include JB/setup %}

<section class="content">

## YAML Spec and Terminology

* Symbols
* Classes
* JSON superset

## YAML Ruby Library Code

* [YAML MRI 2.0.0](https://github.com/ruby/ruby/blob/v2_0_0_0/lib/yaml.rb)
* [YAML MRI 1.9.3](https://github.com/ruby/ruby/blob/v1_9_3_392/lib/yaml.rb)
* [YAML MRI 1.8.7](https://github.com/ruby/ruby/blob/v1_8_7_371/lib/yaml.rb)

## Gotchas

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

</section>
