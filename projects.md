---
layout: page
title: Projects
---

{% for post in site.posts %}
  {% if post.categories contains 'project' %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
  {% endif %}
{% endfor %}