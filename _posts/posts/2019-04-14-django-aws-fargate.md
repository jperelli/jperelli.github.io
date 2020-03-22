---
layout: page
title: Configure Django to run in AWS FARGATE ALLOWED_HOSTS
comments: true
category: post
---

In order to configure Django's ALLOWED_HOSTS when running behind a proxy in AWS FARGATE (or ECS), we need to use the ips found in AWS' special domain `http://169.254.170.2/v2/metadata`

This uses the following pypi modules:
 - [django-environ](https://github.com/joke2k/django-environ)
 - [requests](https://pypi.org/project/requests2/) (comes with [Django](https://pypi.org/project/Django/))

```python
ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=[
    'localhost',
    'example.com',
])

EC2_PRIVATE_IP = None
try:
    resp = requests.get('http://169.254.170.2/v2/metadata')
    data = resp.json()
    container_name = 'api'  # If stored in environment os.environ.get('DOCKER_CONTAINER_NAME', None)
    search_results = [x for x in data['Containers'] if x['Name'] == container_name]
    if len(search_results) > 0:
        container_meta = search_results[0]
    else:
        # Fall back to the pause container
        container_meta = data['Containers'][0]
    EC2_PRIVATE_IP = container_meta['Networks'][0]['IPv4Addresses'][0]
except Exception as e:
    # silently fail as we may not be in an ECS environment
    print('could not get EC2_PRIVATE_IP')
    print(str(e))
if EC2_PRIVATE_IP:
    ALLOWED_HOSTS.append(EC2_PRIVATE_IP)
```
