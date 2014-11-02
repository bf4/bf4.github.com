---
layout: post
title: "A RubyGems Adoption Center"
description: "How can we enable community maintenance of unmaintained/abandoned RubyGems?"
categories: [ 'ruby' ]
tags: [ 'ruby' , 'calltoaction', 'rubygems' ]
published: true
---
{% include JB/setup %}

## Summary

There is an [ongoing discussion on the RubyGems.org mailing list about the creation of a RubyGems Adoption Center](https://groups.google.com/d/msg/rubygems-org/niS5ZO9DNgk/5Fhg9Q3QR7YJ).

### Update 2014-10-24

I created a [GitHub issue to spec out the MVP](https://github.com/rubygems/rubygems.org/issues/725)

## Background

(you can skip to the call to action if this background doesn't interest you :)

The background for this is that I've, for whatever reasons, become involved in taking over maintenance of various gems or otherwise helping to revive stalled development.

In particular, I, quite accidentally, became a maintainer of ActsAsTaggableOn, a Rails tagging engine, after bumping a long-stale, minor, pull-request I had written.  There were already some second-generation maintainers on the project, but they had, apparently, burned out.  I started going through the issues, tests, and pull requests, got a few more collaborators added to the team, and got gem push so that I could release new updates. But, I was no longer using the gem, the issue activity was overwhelming, and the codebase in serious need of reworking.  One of the devs I brought on, [Abdelkader Boudih, @seuros](https://github.com/seuros) continued working on the codebase while I, guiltily, drifted on to other things.

At RailsConf 2014, I posted on the boards about creating a 'gem maintainers / developers support group', and prepared [a lightning talk, "The Open Source Junkyard"](https://speakerdeck.com/bf4/the-open-source-junkyard), which unfortunately too far down the list to make it into the alloted time slot.  I'm really passionate about the issue, and continued talking to people and looking around.  In particular, I talked to Nick Quaranto, so when I saw him [tweet in a thread about maintenance of the RSpec-Given library, after Jim Weirich's passing](https://twitter.com/qrush/status/463761602475335680), I responded "We really need to get better at making gem maintenance/abandonment easier." and he wrote back "agreed. maybe we need a RubyGems adoption center." and suggested I post to the RubyGems.org mailing list.

There was a bit of discussion, which petered out, then began again for a bit after [I posted a link to it in a discussion about reviving RMagick](https://github.com/rmagick/rmagick/issues/18#issuecomment-50158050).

## Call to Action: A RubyGems Adoption Center

### We really need to get better at making gem maintenance/abandonment easier

Maintainership nowadays requires giving commit/owner access on BOTH GitHub and rubygems.org

- If the original maintainer is non-responsive, one may submit a request to [http://help.rubygems.org](http://help.rubygems.org)/ but that's a lot of work for humans (@qrush) and requires a lot of judgement calls
- Maintainers might ask for help on public lists, private lists, twitter, in the repo, etc, but there's no 'clearinghouse'.
- [http://stillmaintained.com](http://stillmaintained.com)/ is unreliable and not well-integrated.  Maintainership-through-badges isn't the right approach

### Some possible implementations

- Through an endpoint on rubygems?
- A wiki?
- Issue tracker?
- Mailing list?
- We could make a new Category for "Adoption" in Tender (help.rubygems.org). If a gem is marked for adoption, we could just have a link on the page that pops up their embeddable widget: [https://help.tenderapp.com/kb/setup-installation/adding-and-customizing-the-tender-widget](https://help.tenderapp.com/kb/setup-installation/adding-and-customizing-the-tender-widget)
- RubyGem name ownership expires like the domain name subscription model
- RubyGems owners periodically confirm ownership, else the gem is listed as "available for adoption"  Humans review adoption requests to reject/accept any, maybe with an appeal process.
- Variation on the above where a trust-community is built and is self-policing.

And how integrated with RubyGems and/or RubyGems.org should the original source repo be, if at all? (Like a maintainership API via PGP, TUF))

### MY proposed MVP-- enabling communication dev-to-dev

A **logged in rubygems.org user** can

- set a 'looking for maintainers' flag on a gem they own
  - optionally with an abandonment date
    - ( note, this would likely be in the gem's metadata spec since that doesn't require any changes in the spec )
    - ( but it could be just part of rubygems.org as well and independent of the gemspec )
- request to be added as an owner of a registered gem
- apply to a 'looking for maintainers' request
  - maintainer can accept or reject the request

Nice to haves:

- having a gem maintainership badge that can communicate a need for adoption.
- making gems up for adoption searchable by logged in and anonymous users
- Adding copy to RubyGems guide somewhere and under the RubyGems GitHub org.  Perhaps even hosted on GitHub pages.

**Note what this does NOT do**:

- anything having to do with github or other repositories
- involve anyone except the gem owner, the application, and the rubygems.org code/data-base
- deal with gems whose owners are AWOL
  - e.g. a mechanism within the rubygems.org registered account or rubygem spec metadata to facilitate this in the absence of maintainer response. Like "I grant ownership to rubygems.org of any RubyGems registered to my name if I do not reply to requests for maintainership (TBD what this means) within some reasonable window"

#### Action Items:

  - Let's pick something from the MVP that we agree on and create a PR for further discussion.  It's time, I think, to move from discussion to action. Probably reference [https://github.com/rubygems/rubygems.org/issues/637](https://github.com/rubygems/rubygems.org/issues/637) and here's an example PR that modifies the user account page [https://github.com/rubygems/rubygems.org/pull/679](https://github.com/rubygems/rubygems.org/pull/679)

#### Other references

- Taking over and/or giving back Gems [https://github.com/rubygems/rubygems.org/issues/429](https://github.com/rubygems/rubygems.org/issues/429)
- Ernie Miller put some of his gems up for adoption at a new github org [http://erniemiller.org/2013/11/17/anyone-interested-in-activerecord-hackery](http://erniemiller.org/2013/11/17/anyone-interested-in-activerecord-hackery)/ [https://github.com/activerecord-hackery/squeel](https://github.com/activerecord-hackery/squeel)
- [https://speakerdeck.com/bf4/the-open-source-junkyard](https://speakerdeck.com/bf4/the-open-source-junkyard)
- [Nathaniel Talbott: Maintaining Sanity, RubyConf 2013](http://confreaks.com/videos/2901-rubyconf2013-maintaining-sanity)
- [Daniel Doubrovkine: Taking over Someone Else's Open-Source Projects,  GoGaRucCo 2014](https://www.youtube.com/watch?v=8ijzefV-B7U)
- Justin Searls: ["The Social Coding Contract"](https://gist.github.com/searls/eaf8dcdd4b3a10a97694), [Level Up Con 2014](http://levelupcon.com/), [RailsConf 2015](http://rubyconf.org/program)
- [Comic: The truth behind Open Source apps](http://www.commitstrip.com/en/2014/05/07/the-truth-behind-open-source-apps/)


## Experiences as unscientific case-studies

I've helped revive or take over a number of gems. Here's the results, thus far (*tl;dr some authors help pass on ownership, some don't, and sometimes the request results in renewed activity and adding more collaborators/maintainers*)

(I apologize that this isn't better written, but I had to stop writing and move on to other things at some point)

- MetricFu: original owner put up blog post and mailing list message looking for new maintainer. I applied, talked to him, and he gave me gem ownership, repo ownership, and rubyforge access.  He request that I continue work on a forked repo. Using an  GitHub orf 'metricfu' is much easier to manage owners than an individual user account. [http://jakescruggs.blogspot.com/2012/08/why-i-abandoned-metricfu.html](http://jakescruggs.blogspot.com/2012/08/why-i-abandoned-metricfu.html)

- Kaminari: I had a PR that was ignored, ( [https://github.com/amatsuda/kaminari/pull/374](https://github.com/amatsuda/kaminari/pull/374) )I emailed the maintainers and bumped to repo, but didn't get the PR merged until I sat down with Akira Matsuda at RailsConf 2013, and then subsequently created another issue to prompt a new release [https://github.com/amatsuda/kaminari/issues/412](https://github.com/amatsuda/kaminari/issues/412)

- ActsAsTaggableOn: bugged a PR [https://github.com/mbleigh/acts-as-taggable-on/pull/343](https://github.com/mbleigh/acts-as-taggable-on/pull/343) and then mbleigh on email and twitter till I got commit and gem push, then bugged again to add more collabs [https://github.com/mbleigh/acts-as-taggable-on/issues/441](https://github.com/mbleigh/acts-as-taggable-on/issues/441)  but have mostly dropped off and one of the collabs (seuros) basically maintains it now, but I pop in now and again

- SimpleCov: bugged a PR  [https://github.com/colszowka/simplecov/pull/245](https://github.com/colszowka/simplecov/pull/245) then offered to help out [https://github.com/colszowka/simplecov/issues/297](https://github.com/colszowka/simplecov/issues/297) and helped prove that the blocking issues in 0.8 were fixed, then helped add some  maintainers [https://github.com/colszowka/simplecov/pull/317#issuecomment-48905518](https://github.com/colszowka/simplecov/pull/317#issuecomment-48905518) Development has since picked up by both collabs and the colszowka

- RMagick: Joined a long-running thread about the need for a release and the absent maintainer [https://github.com/rmagick/rmagick/issues/18#issuecomment-50774623](https://github.com/rmagick/rmagick/issues/18#issuecomment-50774623) forked the repo [https://github.com/gemhome/rmagick](https://github.com/gemhome/rmagick) and got gem push and some help from one of the original maintainers, put out a new version,... looking like we might get access to the rmagick user soon.  Used [https://github.com/IQAndreas/github-issues-import](https://github.com/IQAndreas/github-issues-import) to import issues to the gemhome fork

- Mail: Helped loosen mime-types dependency which was locking any user of the gem (including anyone using actionmailer) to an older version  [https://github.com/mikel/mail/pull/713](https://github.com/mikel/mail/pull/713) which resulted in revived activity on the repo and some PRs to rails (that will be be in a release at some point) [https://github.com/rails/rails/pulls?q=is%3Apr+is%3Aclosed+author%3Abf4+mail](https://github.com/rails/rails/pulls?q=is%3Apr+is%3Aclosed+author%3Abf4+mail)

- Rails-ERD: is totally abandoned with no one interested in picking it up [https://github.com/gemhome/rails-erd/issues/30](https://github.com/gemhome/rails-erd/issues/30) so I made an issue I just point people to

- Fnordmetric: was abandoned but maintainer says he is now back [https://github.com/paulasmuth/fnordmetric/issues/177 [https://github.com/paulasmuth/fnordmetric/pull/178](https://github.com/paulasmuth/fnordmetric/pull/178)

- Saikuro: was abandoned and got buy-in from the original author but am slightly hamstringed by a gem of the same name, but lowercased, also being pushed to rubygems, and a non-responsive author of that fork [https://github.com/metricfu/Saikuro/issues/2](https://github.com/metricfu/Saikuro/issues/2)

- Roodi:  I maintained a fork until a new maintainer was found [https://github.com/roodi/roodi/pull/16](https://github.com/roodi/roodi/pull/16)

- TestConstruct: I bugged the original devs and they renamed and re-released it.  [https://github.com/metricfu/construct/issues/1](https://github.com/metricfu/construct/issues/1) [https://github.com/bhb/test_construct](https://github.com/bhb/test_construct) No activity on the repo, no work needed

- Jenkins-MetricFu-Plugin: Got the original author to transfer the repo to the metricfu org but no subsequent work has taken place [https://github.com/metricfu/jenkins-metricfu-plugin/issues/3](https://github.com/metricfu/jenkins-metricfu-plugin/issues/3)

- Bcrypt: prompted for renewed dev [https://github.com/codahale/bcrypt-ruby/issues/54](https://github.com/codahale/bcrypt-ruby/issues/54) after a languishing PR [https://github.com/codahale/bcrypt-ruby/pull/48](https://github.com/codahale/bcrypt-ruby/pull/48)  activity has since picked up

- YUI-Rails: Had a PR, original author gave me commit and push but no activity, issues, or PRs since [https://github.com/nextmat/yui-rails/pull/1#issuecomment-13896385](https://github.com/nextmat/yui-rails/pull/1#issuecomment-13896385)

- Recommendify: asked maintainer to specify an official fork.. responded with link to new project, but left issue open [https://github.com/paulasmuth/recommendify/issues/26](https://github.com/paulasmuth/recommendify/issues/26)
