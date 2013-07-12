---
layout: post
title: "Make the world a better place; put a license in your gemspec"
slug:  'put-a-license-in-your-gemspec'
description: "Be a good ruby citizen, put a license in your gemspec"
category:
tags: ['ruby','rubygems','command-line']
published: true
comments: false
---
{% include JB/setup %}

## TL;DR "Be a good ruby citizen, put a license in your gemspec"

### Background

Some companies [will only use gems with a certain license](https://github.com/rubygems/rubygems.org/issues/363#issuecomment-5079786).
The canonical and easy way to check is [via the gemspec](http://docs.rubygems.org/read/chapter/20#license)
which is configured as e.g.

    spec.license = 'MIT'
    # or
    spec.licenses = ['MIT', 'GPL-2']

There is even a [License Finder](https://github.com/pivotal/LicenseFinder) to help companies ensure all gems they use
meet their licensing needs. This tool depends on license information being available in the gemspec.
Including a license in your gemspec is a good practice, in any case. It makes you a better Ruby citizen.

### Gem stats

[Steve Klabnick](http://steveklabnik.com/) gave a talk at RubyNation 2013 about his work on [Resque](https://github.com/resque/resque) wherein
he mentioned that he could estimate the userbase of Resque by looking at the rate and number of downloads of Resque when he released
a new version of the gem.  I became interested in looking at gem download trends to generate statistics on a wider basis, as a proxy
for helping to determine which gems are worth looking at.  ([Yes, ruby-toolbox can sort of do that](http://ruby-toolbox.com)).

I was spurred into action when getting a number of issues for [metric_fu](https://github.com/metricfu/metric_fu) that turned out to be related to
old releases or even [metrical (which is no longer necessary)](https://github.com/metricfu/metric_fu/blob/master/HISTORY.md#metricfu-300--2013-02-07).
I realized I could look at gem download statistics to determine the extend of the usage of old releases of metric_fu.  I also realized I have published
and abandoned forks of gems on some occassions that people really should not be using.  I could see if that is a problem
as well.

### Making an issue of a missing license

I began using the [gems gem](https://github.com/rubygems/gems) to collect the download stats for my gems, their dependencies,
and some libraries of interest.  While I was collecting download stats, I decided to collect other data such as licenses,
urls, etc.  Then I started collecting data on all recently updated or released gems.  As I looked at the number of gems
without licenses, I remembered about LicenseFinder and how having a license in a gemspec is the easiest way for someone or a company
to audit the licenses of all the gems they'd like to use.

It turns out, there's a really great [command-line GitHub issues gem (ghi)](https://github.com/stephencelis/ghi).  With little fuss,
I was soon checking my downloaded gem stats for gems without licenses for links to a github account, if there was already an issue
for a license, and if not, create one.  My only false positive was the mysql2 gem which had the license in the gemspec, but hadn't
released that version of the gem, yet.

I watched for activity on these issues, answered any questions, and thanked anyone who added the license. The response rate was pretty
good and people seemed thankful. It felt good.

As I iterated on this, I added more text to the issues I was creating to answer, in advance, why have a license in the spec,
how to add it, and how I found them.  Since I now reference the [rubygems.org issue about surfacing gem licenses on the site](https://github.com/rubygems/rubygems.org/issues/363#issuecomment-5079786)
in my issue, you can [go there](https://github.com/rubygems/rubygems.org/issues/363#issuecomment-5079786) to see a list of all the issues
I've since created and their status.

I'm pretty happy about this, and  have [gotten some](https://groups.google.com/d/topic/license-finder/1h319JFT8bo/discussion)
[nice](https://github.com/warwickshire/remote_partial/issues/1) [positive feedback](https://github.com/rsslldnphy/either/issues/1).

Of the [92 issues I've created in the last day-and-a-half](https://gist.github.com/bf4/5952053#file-license_issues-txt),
 37 have closed the issue and added a license.
