---
layout: post
title: "Journey of a media type in Rails"
description: "Part 1: rendering a JSON API resource"
permalink: "journey-of-a-media-type-in-rails-part-1"
categories: [ 'rails' ]
tags: [ 'jsonapi' ]
published: true
---
{% include JB/setup %}

# Setting up JSON API in Rails 5 beta

**Request:**

```curl
curl -X POST \
  -H "Content-Type: application/vnd.api+json" \
  -H "Accept: application/vnd.api+json" \
  -d '{
  "data": {
    "type": "sandwiches",
    "attributes":
    {
      "spreads": [ "jelly", "peanut_butter" ],
      "toasted": false,
      "customer_id": "42"
    }
  }
}' "https://site.dev/sandwiches?authToken=abcd1234"
```

**Response:**

```http
HTTP/1.1 201 Created
Content-Type: application/vnd.api+json

{
  "data": {
    "id":   "1337",
    "type": "sandwiches",
    "attributes": {
      "spreads": [ "jelly", "peanut_butter" ],
      "toasted": false
    },
    "relationships": {
      "customers": {
        "data": { "id": "42", "type": "customers" }
      }
    }
  }
}
```

or

```http
HTTP/1.1 400 Bad Request
Content-Type: application/vnd.api+json

{
  "errors": [
    {
      "source": {
        "pointer": "/data/attributes/customer_id"
      },
      "detail": "Customer with id 42 does not exist"
    },
    {
      "source": {
        "pointer": "/data/attributes/spreads"
      },
      "detail": "jelly is not a valid spread"
    }
  ]
}
```

## Content Negotiation

```curl
curl -X POST \
  -H "Content-Type: application/vnd.api+json" \
  -H "Accept: application/vnd.api+json"
```

Means that the media type of the request payload is JSON API and the client will only
Accept a JSON API response.

JSON API is not the same as JSON: [https://github.com/rails/rails/pull/21496](https://github.com/rails/rails/pull/21496)

## Handling a JSON API request


Rails returns `{}` for an unknown Content-Type:

```ruby
# actionpack/test/dispatch/request/json_params_parsing_test.rb

test "does not parse unregistered media types such as application/vnd.api+json" do
  assert_parses({}, "{\"person\": {\"name\": \"David\"}}", { 'CONTENT_TYPE' => 'application/vnd.api+json' })
end
```

So, we register the JSON API media type in an initializer:

```ruby
# actionpack/lib/action_dispatch/http/mime_types.rb

MEDIA_TYPE = 'application/vnd.api+json'.freeze
Mime::Type.register(MEDIA_TYPE, :jsonapi)
```

Now Rails knows about `Mime[:jsonapi]` but needs to learn how to parse params.

Where our payload:

```json
{
  "data": {
    "type": "sandwiches",
    "attributes":
    {
      "spreads": [ "jelly", "peanut_butter" ],
      "toasted": false,
      "customer_id": "42"
    }
  }
}
```

must be parsed to a format models and records can use.

```ruby
{ sandwiches: { spreads: ["jelly", "peanut_butter" ], toasted: false, customer_id: "42" }
```

Now configure JSON API request payloads to be parsed by the (currently) non-existent
JSONAPI gem.

```ruby
# actionpack/lib/action_dispatch/http/parameters.rb:79 in params_parsers

parsers = (Rails::VERSION::MAJOR >= 5 ? ActionDispatch::Http::Parameters : ActionDispatch::ParamsParser)::DEFAULT_PARSERS
parsers[Mime[:jsonapi]] = ->(body) { JSONAPI.parse(body).with_indifferent_access }
```

## Rendering a JSON API response

In our controller, we're going to have a create method that looks like:

```ruby
def create
  sandwich = Sandwich.new(create_params)
  if sandwich.save
    render jsonapi: sandwich, status: :created
  else
    render jsonapi: sandwich_errors, status: :bad_request
  end
```

Notice that `jsonapi`? That's a Renderer we need to add in order to render
our response in the JSONAPI format.


```ruby

# "rails-40f68f72fc11/actionpack/lib/action_controller/metal/renderers.rb
ActionController::Renderers.add :jsonapi do |json, options|
  json = json.is_a?(String) ? json : JSONAPI.dump(json, options)

  if options[:callback].present?
    if content_type.nil? || content_type == Mime[:jsonapi]
      self.content_type = Mime[:js]
    end

    "/**/#{options[:callback]}(#{json})"
  else
    self.content_type ||= Mime[:jsonapi]
    json
  end
end
```

**References:**

- [JSON API](http://jsonapi.org/format/)
  - [Content Negotiation](http://jsonapi.org/format/#content-negotiation)
  - [Query Parameters](http://jsonapi.org/format/#query-parameters)
  - [CRUD](http://jsonapi.org/format/#crud): [creating](http://jsonapi.org/format/#crud-creating)
  - [Errors](http://jsonapi.org/format/#errors)
  - [Resource vs. Entity](https://github.com/json-api/json-api/issues/966)
- HTTP
  - [JSON API IANA Registration](https://www.iana.org/assignments/media-types/application/vnd.api+json)
  - [Accept header](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.1)
  - [+json suffix](https://tools.ietf.org/html/rfc6839#section-3.1)
  - [vnd definition](https://tools.ietf.org/html/rfc4288#section-3.2)
- More
  - [Choosing a media type](https://github.com/json-api/json-api/issues/1020)
  - [API Versioning via URLs](https://github.com/json-api/json-api/issues/406#issuecomment-185761293)
