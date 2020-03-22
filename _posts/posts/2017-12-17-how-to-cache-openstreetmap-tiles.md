---
layout: page
title: How to cache openstreetmap tiles
comments: true
category: post
---

I wanted to build an [openstreetmap](https://www.openstreetmap.org/) tile cache server to lower the impact of my application in openstreetmap servers. A motivation for this is a moral one and also the [limits they have to request their resources](https://operations.osmfoundation.org/policies/tiles/).

I have an [nginx server](https://www.nginx.com) with the following configuration in `nginx.conf`

```nginx
proxy_cache_path  /tmp/cache levels=1:2 keys_zone=openstreetmap-backend-cache:8$
proxy_temp_path   /tmp/cache/tmp;

upstream openstreetmap_backend {
  server  a.tile.openstreetmap.org;
  server  b.tile.openstreetmap.org;
  server  c.tile.openstreetmap.org;
}
```

Note that the directory `/tmp/cache` must exist and be writable by the nginx process user, usually `www-data`

And the following configuration in the server block

```nginx
location /osm_proxy/ {
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X_FORWARDED_PROTO http;
  proxy_set_header Host $http_host;
  proxy_cache openstreetmap-backend-cache;
  proxy_cache_valid  200 302  365d;
  proxy_cache_valid  404      1m;
  proxy_redirect off;
  if (!-f $request_filename) {
    rewrite ^/osm_proxy(/.*)$ $1 break;
    proxy_pass http://openstreetmap_backend;
    break;
  }
}
```

To use this server from leaflet, I configure leaflet tile layer [like this](https://github.com/cualbondi/old-mobile/blob/d4cc9cd27723c87dd68ac4ee38cf87ca938a14d6/www/js/app.ctrl.js#L88)

```javascript
L.tileLayer('https://my.tile-cache-server.com/osm_proxy/{z}/{x}/{y}.png')
```
