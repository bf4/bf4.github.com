---
layout: page
title: "Benjamin Fleischer"
tagline: "Benjamin Fleischer"
header: Headlines
---
{% include JB/setup %}

<section class="content">

<ul class="listing">
{% assign recent_posts_count = 0 %}
{% for post in site.posts %}
  {% comment %}always returns first 10 posts, then only 'top' posts after that'{% endcomment %}
  {% if recent_posts_count < 10 or post.categories != null and post.categories contains 'top' %}
    <li>
      <span>{{ post.date | date_to_string }}</span> <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endif %}
  {% assign recent_posts_count = recent_posts_count | plus: 1 %}
{% endfor %}
</ul>

</section>
