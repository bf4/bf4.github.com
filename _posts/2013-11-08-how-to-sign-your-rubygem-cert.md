---
layout: post
title: "How to crypytographically sign your rubygem"
description: "The steps to generate your gem cert, add it to your gem spec, and distribute your gem"
category: community
tags: 
- ruby
- rubygems
- docs
published: true
---
{% include JB/setup %}

I recently decided to [distribute MetricFu as a cryptographically signed gem](https://github.com/metricfu/metric_fu/commit/ed2f96d8ce514ea0c647736d67f6ec3e863d0bb1), using the RubyGems gemspec.

I found it really hard to find documentation, so I'm sharing what I learned.


## Signing and building your gem

1) Create self-signed gem cert

```sh
cd ~/.ssh
gem cert --build your@email.com
chmod 600 gem-p*
```

- use the email address you specify in your gemspecs

2) Configure gemspec with cert

- Add cert public key to your repository

```sh
cd /path/to/your/gem
mkdir certs
cp ~/.ssh/gem-public_cert.pem certs/yourhandle.pem
git add certs/yourhandle.pem
```

I named the cert in metric_fu bf4.pem since that is my github username


- Add cert paths to your gemspec

```ruby
 s.cert_chain  = ['certs/yourhandle.pem']
 s.signing_key = File.expand_path("~/.ssh/gem-private_key.pem") if $0 =~ /gem\z/
```

3) Add your own cert to your approved list, just like anyone else

```sh
gem cert --add certs/bf4.pem
```

4) Build gem and test that you can install it

```sh
gem build metric_fu.gemspec
gem install metric_fu-4.5.1.gem -P HighSecurity
```

## Example instructions for others to install

> MetricFu is cryptographically signed. To be sure the gem you install hasn't been tampered with:

> Add my public key (if you haven't already) as a trusted certificate 
> gem cert --add <(curl -Ls https://raw.github.com/metricfu/metric_fu/master/certs/bf4.pem)
> gem install metric_fu -P HighSecurity
> This may cause installation to fail if non-signed dependent gems are also being installed.

References:

- [Signing rubygems - Pasteable instructions](http://developer.zendesk.com/blog/2013/02/03/signing-gems/)
- [Twitter gem gemspec](https://github.com/sferik/twitter/blob/master/twitter.gemspec)
- [Rubygems Trust Model](https://github.com/rubygems-trust/rubygems.org/wiki/Overview), [doc](http://goo.gl/ybFIO), [publishing guide](http://guides.rubygems.org/publishing/)
- [Let’s figure out a way to start signing RubyGems](http://tonyarcieri.com/lets-figure-out-a-way-to-start-signing-rubygems)
- Alternative: [Rubygems OpenPGP signing](https://web.archive.org/web/20130914152133/http://www.rubygems-openpgp-ca.org/), [gem](https://github.com/grant-olson/rubygems-openpgp)
- Also: [MetricFu release task that saves a checksum of the built gem](https://github.com/metricfu/metric_fu/blob/9fd4b347f78a922c6cfb79ada5de3cc87dc045de/gem_tasks/build.rake)
