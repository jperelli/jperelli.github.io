---
layout: page
title: Talks
---

{% for post in site.posts %}
  {% if post.categories contains 'talk' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}