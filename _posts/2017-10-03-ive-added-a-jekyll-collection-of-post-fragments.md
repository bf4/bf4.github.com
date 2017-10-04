---
layout: post
title: "I've added a Jekyll collection of post fragments"
description: ""
permalink: "ive-added-a-jekyll-collection-of-post-fragments"
categories: [ "top" ]
tags: ["jekyll"]
date: 2017-10-03
published: true
---
{% include JB/setup %}

I often have little techie things I want to share that don't merit full posts.

I like [Brandur's Fragments](https://brandur.org/fragments) section and
[Thoughtbot's TIL (Today I Learned)](https://github.com/thoughtbot/til) and
have wanted to add this capability to my blog for a while.

I've been doing [some](https://github.com/bf4/bf4.github.com/commit/891d407fe30855bd5b69080954ff200a2a08b828)
[cleanup](https://github.com/bf4/bf4.github.com/pull/14)
[in](https://github.com/bf4/bf4.github.com/pull/15)
[my](https://github.com/bf4/bf4.github.com/pull/17)
[blog](https://github.com/bf4/bf4.github.com/pull/18)
and came across [Jekyll Collection](https://jekyllrb.com/docs/collections/).

<blockquote>
 Not everything is a post or a page.<br>
 Collections allow you to define a new type of document that behave like Pages or Posts do normally,
 but also have their own unique properties and namespace.
</blockquote>

So, I did the [work](https://github.com/bf4/bf4.github.com/pull/19/files)
to add a <a href="{{ BASE_PATH }}fragments">Fragments</a> section.

In `_config.yml` I configured a collection `fragments` which specified that every file in the
`_fragments` directory would be copied over.

```plain
collections:
 fragments:
    output: true
```

This makes available a `site.fragments` variable.

By default, the `permalink` for any posts in there will be in `/fragments`, which is what I want.

I created a `fragments.md` page for listing the fragments as something like:

{% raw %}
```plain
<section class="content">
  <ul class="listing">
    {% for item in site.fragments %}
      {% if item.title != null %}
        <li>
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
```
{% endraw %}
