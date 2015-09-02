---
layout: post
title: "Understanding Rails model serializers"
description: "How Rails serialzers work now (Rails 4.2), and a proposal for how they could be better"
categories: [ 'ruby', 'top' ]
tags: [ 'ruby' , 'rails' ]
published: true
---
{% include JB/setup %}

Since this post is long, I've divided it into sections:

1. How Serializers Work
1. How Renderers Work
1. Example code changing the renderer
1. Example code changing the serializer
1. Proposal

## How serializers work:

Right now (Rails 4.2), that interface has two private-looking methods
`:_render_with_renderer_json` or `:_render_option_json`

(for example usage, see [ActionController:: Serialization](https://github.com/rails-api/active_model_serializers/pull/675/files#diff-07e5a5aaa325f8dc2bcf944d12f0db83R9))

Such that creating a serializer is complicated and non-obvious:

{% highlight ruby %}
# When Rails renders JSON, it calls the json renderer method
# "_render_with_renderer_#{key = json}"
# https://github.com/rails/rails/blob/8c2c1bccccb3ea1f22503a184429d94193a1d9aa/actionpack/lib/action_controller/metal/renderers.rb#L44-L45
# which is defined in AMS https://github.com/rails-api/active_model_serializers/blob/1577969cb76309d1f48c68facc73e44c49489744/lib/action_controller/serialization.rb#L36-L37
    [:_render_option_json, :_render_with_renderer_json].each do |renderer_method|
      define_method renderer_method do |resource, options|
          super(adapter, options)
      end
    end
{% endhighlight %}


which is really hard to find in the source code, since it calls `"_render_with_renderer_#{key}"` where `key` is `json`.

{% highlight ruby %}
# https://github.com/rails/rails/blob/8c2c1bccccb3ea1f22503a184429d94193a1d9aa/actionpack/lib/action_controller/metal/renderers.rb#L44-L45
def _render_to_body_with_renderer(options)
  _renderers.each do |name|
    if options.key?(name)
      _process_options(options)
      method_name = Renderers._render_with_renderer_method_name(name)
      return send(method_name, options.delete(name), options)
    end
  end
  nil
end

# A Set containing renderer names that correspond to available renderer procs.
# Default values are <tt>:json</tt>, <tt>:js</tt>, <tt>:xml</tt>.
RENDERERS = Set.new

def self._render_with_renderer_method_name(key)
  "_render_with_renderer_#{key}"
end
{% endhighlight %}

that is, **it calls `"send(:render_with_renderer_json, @model, options)"` which is not greppable** in the code base

(`@model` is the argument to json: in the controller, for example `render json: @model`)

##  How renderers work:

How does the renderer fit into this?  Well, when a controller has

{% highlight ruby %}
render json: @model
{% endhighlight %}

the `@model`  is passed to the JSON Renderer (see [ActionController::Renderers default](https://github.com/rails/rails/blob/4-2-stable/actionpack/lib/action_controller/metal/renderers.rb#L66-L128))

which basically calls `json = @model.to_json(options)`

## Example code changing the renderer:

If, for example, I wanted to change how the JSON was rendered, to pretty print it,
I would just redefine the `:json` renderer as below

{% highlight ruby %}
# https://github.com/rails/rails/blob/4-2-stable/actionpack/lib/action_controller/metal/renderers.rb#L66-L128
# https://github.com/rails/rails/blob/4-2-stable//actionview/lib/action_view/renderer/renderer.rb#L32
 ActionController::Renderers.remove :json
 ActionController::Renderers.add :json do |json, options|
    if !json.is_a?(String)
      # changed from
      # json = json.to_json(options)
      # changed to
      json = json.as_json(options) if json.respond_to?(:as_json)
      json = JSON.pretty_generate(json, options)
    end

    if options[:callback].present?
      if content_type.nil? || content_type == Mime::JSON
        self.content_type = Mime::JS
      end

      "/**/#{options[:callback]}(#{json})"
    else
      self.content_type ||= Mime::JSON
      json
    end
  end
{% endhighlight %}

##  Example code changing the serializer:

But, to change how the `@model` is serialized, a library such as what ActiveModelSerializers
overrides `:_render_option_json` and `:_render_with_renderer_json`

to basically change `@model = ModelSerializer.new(@model)` so that the renderer is calling `:to_json/:as_json` on the serializer

I think this could be way better:

## PROPOSAL:

1) [Renderer](https://github.com/rails/rails/blob/8c2c1bccccb3ea1f22503a184429d94193a1d9aa/actionpack/lib/action_controller/metal/renderers.rb#L44-L45)
  could have a method `:serializer_for` that can by default returns its argument, but can be overridden in the controller

{% highlight diff %}
    add :json do |json, options|
-      json = json.to_json(options) unless json.kind_of?(String)
+      json = serializer_for(json).to_json(options) unless json.kind_of?(String)
{% endhighlight %}

example controller code:

{% highlight ruby %}
def serializer_for(model)
  ActiveModel::Serializer::Adapter.create(
    ActiveModel::Serializer.serializer_for(resource).new(resource, serializer_opts),
    adapter_opts
  )
end
{% endhighlight %}

or

2) have a serializer registry (like renderers and mime-types have), that may be called in a method just as in #1

{% highlight ruby %}
 ActionController::Serializers.register :user, UserSerializer, only: [:json]
{% endhighlight %}

## Benefits:

- Simple, clear, extendable interface for model serialization
- Less meta-programming
- I wouldn't have needed to spend hours in the debugger and rails source code trying
  to find out the path from `render json: @model` to `_render_with_renderer_json(@model, options)`

Thanks for reading this far! Let me know what you think!

Originally posted as an RFC to [rubyonrails-core mailing list](https://groups.google.com/d/topic/rubyonrails-core/K8t4-DZ_DkQ/discussion).

Follow any discussion of the RFC there.
