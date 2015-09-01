---
layout: post
title: "Backport ActiveRelation#or to Rails 4.2.3"
description: "Backport ActiveRelation#or to ActiveRecord in Rails 4.2.3"
permalink: "backport-activerelation-or"
categories: [ 'rails' ]
tags: [ 'rails' ]
published: true
---
{% include JB/setup %}

I've backported `ActiveRelation#or` from Rails master for use in our Rails 4.2.3 app.

It was non-trivial, so I thought I'd share.  Enjoy!

<script src="https://gist.github.com/bf4/84cff9cc6ac8489d769e.js"></script>
