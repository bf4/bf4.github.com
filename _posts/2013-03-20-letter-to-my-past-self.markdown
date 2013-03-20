---
comments: false
date: 2013-03-20 00:00:00Z
layout: post
slug: letter-to-my-past-self
title: Letter to my past self
---

I really enjoyed reading John Barker's [Letter to myself as as junior developer](http://pivotallabs.com/letter-to-myself-as-a-junior-developer/), and had some followup thoughts I'd like to share-- some important advices not specific to reading/writing/understanding/reviewing code. (or as Dave Copeland put it ["Be kind to future you"](https://github.com/davetron5000/awesome-cli-ruby/blob/master/intro/01_intro.md) [slides](https://speakerdeck.com/davetron5000/build-awesome-command-line-applications-with-ruby) )

I would include 'find a mentor' or 'find a community'.

I would also add, be aware of fads and trends for languages, software, and techniques.   Some ideas that are all the rage now will cause you pain if you try to apply them 'just because everyone is now saying you're doing it wrong'.  I often this of this [Pragmatic Programmer Magazine article on Shu-ha-ri](http://pivotallabs.com/letter-to-myself-as-a-junior-developer/).

Don't over-engineer. Don't problems you don't have.  e.g. Maybe this app will need a SOA in 6 months, but right now it will work fine as a vanilla Rails app.  [Start with the golden/happy path, and move outwards](http://evan.tiggerpalace.com/articles/2012/11/21/use-rails-until-it-hurts/). Of course, be open to extension.

Don't use DRY (Don't repeat yourself) as a verb.  DRY means that each concept should live in one place.  Kind of like the single responsibility concept. [It does not mean avoid text duplication in your code at the cost of ease of comprehension](https://groups.google.com/forum/#!topic/software_craftsmanship/XdgkE31HGI0).  And yes, keep distinct concepts separate.  But, don't separate into new objects until you feel pain or discomfort with the current arrangement.

Ask yourself what problems you're solving, if you're solving it, and what are the possible outcomes of mistakes. e.g. Not testing everything is okay.
