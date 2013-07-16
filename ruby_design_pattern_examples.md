---
layout: page
title: "Ruby Domain / Design Pattern Examples"
description: "Practical examples of some design patterns in Ruby"
comments: false
---
{% include JB/setup %}

<section class="content">

## Thoughts on Object-Orientation vs. Ease-of-use

I was reading [Giles Bowkett's "Rails as she is spoke"](http://railsoopbook.com/)  and it really opened my eyes about 
how some of the ways that Rails diverges from OO orthodoxy make for a better user experience.

Interestingly, he gives the example of url_for being defined in 5 places that [Ernie Miller also discusses in his talk: An Intervention for ActiveRecord](https://speakerdeck.com/erniemiller/an-intervention-for-activerecord).  
Giles wants to point out how convenient url_for is to use, as opposed to an OO version 
e.g. Url.new(foo), that [it's more LISPy](https://speakerdeck.com/gilesbowkett/rails-as-she-is-spoke?slide=45).  
And I remember Ernie saying something similar, but that it really should be more OO under the covers.

Giles also notes [that the rails controller does an awful job at separation of concerns](https://speakerdeck.com/gilesbowkett/rails-as-she-is-spoke?slide=45), [talk by by Gary Bernhardt](https://www.youtube.com/watch?v=iUe6tacW3JE)

## General Advice

* [Consider an object's responsibilities.](http://www.benjaminfleischer.com/2013/03/20/letter-to-my-past-self/)
  * Can you describe what it does without an 'and'?
  * What would make it need to change?
  * Does any other object do the same thing?
  * Do its name and method names clearly express its intent?
* Does it have a clear interface on how to use it?
* Does it know too much about its collaborators?
* What does it need to know about? What role does it play?
* Is it tightly coupled with other objects or classes? 
* Is there a low cost to change? Is it open to extension? Can you close it to modification?

## General Advice for Rails ActiveRecord Models

* validates :uniqueness is broken, [do this](https://gist.github.com/bf4/5594532#file-validations-rb)
* default scope is broken, don't use it
* you can avoid a lot of callbacks by [calling super on :create_or_update](https://gist.github.com/bf4/5594532#file-callbacks-rb)
* when you make a relation, don't forget to consider [inverse_of](https://gist.github.com/bf4/5594532#file-associations-rb)

## Common Objects Patterns in web apps

* ValueObject e.g. Rating, PhoneNumber, that can be used as a hash key (requires implementing :hash, :eql?)
* FormObject/ViewModel/Presenter for your rails view/template
* Move constraints such as authorization to your router
* Use active support hooks e.g. ActiveSupport.on_load, 
* Make your own validations with ActiveModel::EachValidator
* It's better to use instance methods than class methods ([which resist refactoring](https://gist.github.com/bf4/5594532#file-callbacks-rb))
* [modularize domain roles](https://gist.github.com/bf4/5594532#file-callbacks-rb)
  * Service object, e.g. UserAuthenticator.new(user).authenticate(*args) to write data
  * Query object e.g. AbandonedTrialQuery.new(Account.scoped).find_each(&block) to read from db/sql
  * Policy object e.g. ActiveUserPolicy.new(user).active? to read state from objects in memory
  * Decorator e.g. FacebookCommentNotifier.new(comment).save to separate concerns
  * View object e.g. DonutChart.new(snapshot) that respond to #cache_key
* a Cache managing object
* Method Object: takes in args and has a method that does the work
* WIP: How to generate views templates for js or json, and how to serialize models 
* WIP: Logger or instrumentation stuff

References:

* [7 Patterns to Refactor Fat ActiveRecord Models](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)
* [Why Ruby Class Methods Resist Refactoring](http://blog.codeclimate.com/blog/2012/11/14/why-ruby-class-methods-resist-refactoring/)
* [Rails' Insecure Defaults: 13 Security Gotchas You Should Know About](http://blog.codeclimate.com/blog/2013/03/27/rails-insecure-defaults/)

## [Notes from An Intervention for ActiveRecord](https://gist.github.com/bf4/5594532)

<script src="https://gist.github.com/bf4/5594532.js"></script>

</section>
