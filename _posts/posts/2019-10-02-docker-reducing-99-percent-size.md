---
layout: page
title: 'Reducing 99.5% docker push size'
comments: true
category: post
---

This applies if you have chown line like this

```dockerfile
...
COPY . /app
RUN chown -R django:django /app
...
```

When building, this always created a layer of like 250mb, then another of 250mb more (for the chown diff).
If that is changed to only this command

```dockerfile
...
COPY --chown=django:django . /app
...
```

then this generates only one layer of around 2.5mb

So the improvement here was on each deploy uploading around 500mb -> 2.5mb, this is a 99.5% improvement.

The morale of the story is that if you change one file in your app, just a few characters, and when building that generates hundreds of mb being moved, then you need to debug why docker layers are being created, and you might be rewarded with ~99 percent of improvements in your docker flow.

Bonus: A good tool I've used to debug docker image layer sizes is [dive](https://github.com/wagoodman/dive). Take a look into it, you won't regret it :)
