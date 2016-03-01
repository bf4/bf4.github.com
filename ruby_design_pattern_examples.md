---
layout: page
title: "Ruby Domain / Design Pattern Examples"
description: "Practical examples of some design patterns in Ruby"
comments: false
date: 2013-07-16
---

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

* Move constraints such as authorization to your router
* Use active support hooks e.g. ActiveSupport.on_load,
* Make your own validations with ActiveModel::EachValidator
* It's better to use instance methods than class methods ([which resist refactoring](http://blog.codeclimate.com/blog/2012/11/14/why-ruby-class-methods-resist-refactoring/))
* [Domain object that often appear](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)
  * ValueObject e.g. Rating, PhoneNumber, that can be used as a hash key (requires implementing :hash, :eql?). [virtus](https://github.com/solnic/virtus) is a good gem for this.
  * Service object, e.g. UserAuthenticator.new(user).authenticate(*args) to write data
  * Query object e.g. AbandonedTrialQuery.new(Account.scoped).find_each(&block) to read from db/sql
  * Policy object e.g. ActiveUserPolicy.new(user).active? to read state from objects in memory
  * Decorator e.g. FacebookCommentNotifier.new(comment).save to separate concerns, by layering on functionality to existing operations. e.g. instead of a callback
    * [prefer](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/#comment-686256657):
      * decorators when
        * The additional behavior only runs sometimes -- for example only posting to Facebook for users who signed up with Facebook Connect.
        * The additional behavior makes the objects harder to test. The smell here is that you need to stub out the callback or disable the decorator in wholly unrelated test cases.
      * callbacks if the behavior runs all the time and is simple enough to never feel the urge to stub it. Observers don't fit in well to that ruleset.
    * see [review of decorator facilities in ruby](http://robots.thoughtbot.com/post/14825364877/evaluating-alternative-decorator-implementations-in)
  * FormObject/ViewModel/Presenter e.g. Signup.new(company_name, user_email, user_name).save to signup a user and add to a company, and also determines
    whether to show specific content and present notification
    In brief, '[is a representation of the state of the view](http://blog.jayfields.com/2007/03/rails-presenter-pattern.html)'. used for your rails view/template
  * View object e.g. DonutChart.new(snapshot) that respond to #cache_key
    * [Leads to objects that tend to correspond to partials](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/#comment-685500569), e.g.
      * organise these class-partial pairs into app/widgets and invoke them in templates via something like Widgets::CommentBox.new(current_user).render(self)
      * or use a [two-step view pattern](http://martinfowler.com/eaaCatalog/twoStepView.html) and put erb/haml/slim templates in app/templates and put the view object classes in app/views
  * WIP: [Command](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)
* [Cache managing object](http://hawkins.io/2012/07/advanced_caching_revised/)
* Method Object: takes in args and has a method that does the work
* WIP: How to generate views templates for js or json, and how to serialize models
* WIP: Logger or instrumentation stuff

References:

* [7 Patterns to Refactor Fat ActiveRecord Models](http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/)
* [Why Ruby Class Methods Resist Refactoring](http://blog.codeclimate.com/blog/2012/11/14/why-ruby-class-methods-resist-refactoring/)
* [Rails' Insecure Defaults: 13 Security Gotchas You Should Know About](http://blog.codeclimate.com/blog/2013/03/27/rails-insecure-defaults/)

## [Notes from An Intervention for ActiveRecord](https://gist.github.com/bf4/5594532)

<script src="https://gist.github.com/bf4/5594532.js"></script>
