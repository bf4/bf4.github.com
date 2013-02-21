---
comments: false
date: 2012-09-25 11:55:30
layout: post
slug: rails-validation-message-interpolation-arguments
title: Rails validation message interpolation arguments
wordpress_id: 650
categories:
- Code
- Ruby
tags:
- callbacks
- rails
- validations
---

In Rails, if I

`
VALID_LIST = %w(foo bar)
validates_inclusion_of :thing, :in => VALID_LIST, :message => "%{value} is not a valid %{attribute} for a %{model}", :allow_blank => true
`

Now when I set :thing to baz, My error message will say "baz is not a valid thing for (model name)"

I love doing this but I often forget how or what the interpolation arguments can be (value, attribute, or model).

And Yes, I know that I can also use

`
validate :thing, :inclusion => {:in => VALID_LIST}
`

but I thought this might be easier to search for.

Also, I'll note that I had to use the class constant VALID_LIST because ':in' doesn't accept a Proc / lambda like :if or :unless do, see [validates_inclusion_of in the api_doc](http://apidock.com/rails/ActiveModel/Validations/HelperMethods/validates_inclusion_of)
