---
layout: page
title: osmptparser
comments: true
category: project
image: /public/images/2019-08-12-oxidizing-cualbondi/relation-broken.png
---

A tool to parse and autofix public transportation information from openstreetmap data. It tries to fix broken data whenever possible. It's made in [Rust](https://www.rust-lang.org/) so it's really really fast.

All the information about this project is actually [in this post here](/post/2019/08/12/oxidizing-cualbondi/). And the [source code is here](https://github.com/cualbondi/osmptparser)

The library is published in a [rust crate here](https://crates.io/crates/osmptparser)

Also I made a python package to use it in the backend of cualbondi (that uses django). The python package was made [using pyo3](https://jperelli.com.ar/post/2019/08/12/oxidizing-cualbondi/#python-rust). The [source code is here](https://github.com/cualbondi/pyosmptparser), and it's [published in pypi here](https://pypi.org/project/pyosmptparser/).
