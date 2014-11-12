---
comments: false
date: 2013-03-20 00:00:00Z
layout: post
slug: letter-to-my-past-self
title: Letter to my past self
categories: [ 'top' ]
---

I really enjoyed reading John Barker's [Letter to myself as as junior developer](http://pivotallabs.com/letter-to-myself-as-a-junior-developer/), and had some followup thoughts I'd like to share-- some important advices not specific to reading/writing/understanding/reviewing code. (or as Dave Copeland put it ["Be kind to future you"](https://github.com/davetron5000/awesome-cli-ruby/blob/master/intro/01_intro.md) [slides](https://speakerdeck.com/davetron5000/build-awesome-command-line-applications-with-ruby) )

I would include 'find a mentor' or 'find a community'.

I would also add, be aware of fads and trends for languages, software, and techniques.   Some ideas that are all the rage now will cause you pain if you try to apply them 'just because everyone is now saying you're doing it wrong'.  I often think of this [Pragmatic Programmer Magazine article on Shu-ha-ri](http://pivotallabs.com/letter-to-myself-as-a-junior-developer/).

Don't over-engineer. Don't solve problems you don't have.  e.g. Maybe this app will need a SOA in 6 months, but right now it will work fine as a vanilla Rails app.  [Start with the golden/happy path, and move outwards](http://evan.tiggerpalace.com/articles/2012/11/21/use-rails-until-it-hurts/). Of course, be open to extension.

Don't use DRY (Don't repeat yourself) as a verb.  DRY means that each concept should live in one place.  Kind of like the single responsibility concept. [It does not mean avoid text duplication in your code at the cost of ease of comprehension](https://groups.google.com/forum/#!topic/software_craftsmanship/XdgkE31HGI0).  And yes, keep related ideas together and distinct concepts separate.  But, don't separate into new objects until you feel pain or discomfort with the current arrangement.  Constantly ask yourself if this class or method really needs to know about another class, or other domain concepts.

Keep each class's public interface clearly marked, not over-complicated to use, and narrow.  This will save you a lot of pain when you need to make a change, and you know that of the maybe 30 methods in the class, only 2 of the are called externally and their inputs are relatively stable.

Class, method, and variable names should be clear enough to read and understand how the code works without diving into the details of each part. Design for behavior (e.g. duck-typing) rather than caring how it behaves that way or what it is. Try not to do anything unexpected.

Ask yourself what problems you're solving, if you're solving it, and what are the possible outcomes of mistakes. e.g. Not testing everything is okay.

If you need rules, use [rules that aren't rules](http://gist.io/4567190)

## Sandi Metz’ rules for developers

1. Your class can be no longer than a hundred lines of code.
2. Your methods can be no longer than five lines of code
3. You can pass no more than four parameters and you can't just make it one big hash.
4. In your controller, you can only instantiate one object, to do whatever it is that needs to be done.
5. Your view can only know about one instance variable.
6. Your Rails view should only send messages to that object i.e., no Demeter violations. [ "thunder dome principal". Translated: one model in, one model out! ]
7. Rules are meant to be broken if by breaking them you produce better code. [ ...where "better code" is validated by explaining why you want to break the rule to someone else. ]

## Sandi Metz' rules of testing

1. Make assertions about state for incoming messages.
2. Make assertions that you send outgoing messages. [Only do #2 for outgoing /command/ messages.  Don't bother testing query methods at all, though you may need to stub those to make your tests work right.]
3. Ignore private methods.
4. Test roles. Make tests prove they are playing the correct role (and not just testing the mock / double)

## [Kent Beck's 4 Rules of Simple Design](http://c2.com/cgi/wiki?XpSimplicityRules)

1. Runs all the tests.
2. Expresses every idea that we need to express. / [No duplication of implementation (SRP)](http://theholyjava.wordpress.com/2011/02/14/clean-code-four-simple-design-rules/)
3. Says everything OnceAndOnlyOnce / Has high cohesion (clarity) / Expresses the intent of the programmers
4. Has no superfluous parts / Has loose coupling / Minimizes the number of classes and methods
