---
layout: page
title: The most useful python class of all time
comments: true
category: post
---

If you work with javascript and python, you probably hate that the dicts in python are not accesible by dot-notation `dict.prop`, well you can fix that python bug easily by using the next class

```python
class Bunch(dict):
    """Util class to have a hashable dictionary accesible by dot-notation."""

    __getattr__ = dict.get
    __setattr__ = dict.__setitem__

    def __hash__(self):
        return hash(tuple(sorted(self.items())))
```

You can use it like this

```python
dic = {
    'pepe': 1,
    'foo': 'dsa',
    'bar': 2.0,
}
obj = Bunch(dic)
print(obj.pepe)
>>> 1
```

or (the same)

```python
obj = Bunch({
    'pepe': 1,
    'foo': 'dsa',
    'bar': 2.0,
})
print(obj.pepe)
>>> 1
```

and by being hashable, you can even use it together with [`@lru_cache`](https://docs.python.org/3/library/functools.html#functools.lru_cache)

```python
from functools import lru_cache

@lru_cache()
def inc_pepe(dic):
    print(dic.pepe)
    return dic.pepe + 1

obj = Bunch({
    'pepe': 1,
    'foo': 'dsa',
    'bar': 2.0,
})

print(inc_pepe(obj))
>>> 1
>>> 2
print(inc_pepe(obj))
>>> 2
```

Disclaimer: I might have exaggerated with the title for clickbait purposes.
