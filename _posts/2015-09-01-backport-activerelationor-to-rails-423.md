---
layout: post
title: "Backport ActiveRecord::Relation#or to Rails 4.2.3"
description: "Backport ActiveRecord::Relation#or to Rails 4.2.3"
permalink: "backport-activerelation-or"
categories: [ 'rails', 'top' ]
tags: [ 'rails' ]
published: true
---
{% include JB/setup %}

I've backported `ActiveRecord::Relation#or` from Rails master for use in our Rails 4.2.3 app.

It was non-trivial, so I thought I'd share.  Enjoy!

<script src="https://gist.github.com/bf4/84cff9cc6ac8489d769e.js"></script>
