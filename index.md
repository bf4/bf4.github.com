---
layout: page
title: "Pages"
tagline: My Space
---
{% include JB/setup %}

<section class="content">
<ul class="listing">
  {% for post in site.posts %}
    <li>
      <span>{{ post.date | date_to_string }}</span> <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
</section>
