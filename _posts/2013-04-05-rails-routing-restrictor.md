---
comments: false
layout: post
title: Rails Routing Restrictor
description: "How I set up a restricted access subdomain"
categories: ['Code' , 'top']
tags: [rails, subdomain, routes]
---
{% include JB/setup %}

I've been refining lately how to use the rails router to define
different behaviors depending on a user's IP.

Here's a gist [where I demonstrate how you can create routes
that are only available within whitelisted ip ranges or
subdomains, in addition to redirects.](https://gist.github.com/bf4/5320631)

The use case for this is that we have multiple servers for
our site, but we want certain things to only happen on one of
them.  This server serves up our 'admin' subdomain.  Because
of certain things that this server can do, all in-house users
are redirected to the 'admin' subdomain if they are not already
on it. It just makes things simpler.

We can also specify certain routes that are only available to
users on the admin subdomain (which may be irrelevant
given the automatic redirect, but nonetheless).

We can have routes that only local services
can hit, e.g. to prime the app (on JRuby) or check its 
health, etc.

Another advantage of this setup is that it makes it very easy to
release locally (via capistrano multistage deployment) as a 
quasi-staging (dog-fooding) environment before releasing 
to the general public.

Note that the '/restricted' route comes before the redirect, such
that it is only available to internal requests, but does not
redirect to the subdomain. Thus, it is available to any internal
user or service on any of the servers.

I've also included some lessons learned for setting up subdomains
in Rails.

<script src="https://gist.github.com/bf4/5320631.js"></script>

An alternative to using the Rails router would be to use
Rack Middleware.  Here's an [example middleware redirector](https://github.com/rubygems/rubygems.org/blob/4c8d57f8ba5c248a6cbc030e6493cdf6c38e5892/app/middleware/redirector.rb) and [how it is inserted into the middleware stack for rubygems.org](https://github.com/rubygems/rubygems.org/blob/5edbc44beb0ba99f9212b48d2a1efe307b613c27/config/application.rb#L27)
