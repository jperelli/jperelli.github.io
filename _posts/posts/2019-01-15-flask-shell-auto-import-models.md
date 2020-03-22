---
layout: page
title: Flask Shell auto import all SQLAlchemy models
comments: true
category: post
---

I'm working in a project made in flask and I was trying to achieve the same funcionality as django-extensions where the shell command for manage.py auto imports all models of your application.

Although is not exactly the same, I'm pretty happy with the results, now I can drop `flask shell` in the terminal and I get all the models autoloaded and I'm ready to roll thanks to the following small snippet.

```python
import importlib

...

def create_application(info):
    app = create_app(cli=True)

    # import all models, magic happens here
    @app.shell_context_processor
    def make_shell_context():
        modules = dict(app=app)
        modelsmodule = importlib.import_module('application.models')
        for modulename in modelsmodule.__dict__["__all__"]:
            modules[modulename] = getattr(modelsmodule, modulename)
        print('Auto imported ', [i[0] for i in modules.items()])
        return modules

    return app
```
