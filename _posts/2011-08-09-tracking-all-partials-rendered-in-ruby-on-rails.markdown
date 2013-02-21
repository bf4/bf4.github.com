---
comments: true
date: 2011-08-09 07:59:20
layout: post
slug: tracking-all-partials-rendered-in-ruby-on-rails
title: Tracking all partials rendered in Ruby on Rails
wordpress_id: 581
categories:
- Code
- Ruby
---

Put this little snippet in a file in your load path, e.g. [cci]config/initializers/render_watcher.rb[/cci] and tail and grep your log to see all the rendered partials:

[ccw_ruby tab_size="4"]
class ActionView::PartialTemplate

  alias_method :original_initialize, :initialize
  def initialize(view, partial_path, object = nil, locals = {})
    Rails.logger.debug RENDERED #{extract_partial_name_and_path(view, partial_path).inspect}
    original_initialize(view, partial_path, object, locals)
  end
end
[/ccw_ruby]

And heres code for just the higher level action calls (doesnt include every partial, but can still be useful).

[ccw_ruby tab_size="4"]
class ActionController::Base
  alias_method :original_render, :render

  def remove_unwanted_keys(options)
    options.delete(:locals) #hard to read otherwise
    options.inspect
  end

  def render(options = nil, extra_options = {}, block) #:doc:
    Rails.logger.debug ACTION RENDERED #{remove_unwanted_keys(options)}
    original_render(options, extra_options, block)
  end
end
[/ccw_ruby]

The tail command is below. Just load a local page.
`tail -f log/development.log | grep RENDER`
