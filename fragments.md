---
title: Fragments
header: Fragments
group: navigation
---
{% include JB/setup %}

<section class="content">
  <ul class="listing">
    {% for item in site.fragments %}
      {% if item.title != null %}
        <li>
          <a href="{{ BASE_PATH }}{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endif %}
    {% endfor %}
  </ul>
</section>
