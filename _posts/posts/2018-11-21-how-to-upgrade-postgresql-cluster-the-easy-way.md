---
layout: page
title: How to upgrade a postgresql cluster the easy way
comments: true
category: post
---

In [cualbondi](https://cualbondi.com.ar/) I was trying to upgrade the postgresql server to the latest version, but we also use postgis there and we wanted to upgrade it also.

 - Postgresql database had to be migrated from version 10 to 11
 - Postgis extension from 2.4 to 2.5

Our stack is in a Virtual Private Server in Hetzner and we use docker-compose with debian-based images.

## Upgrading postgis

First the easy one.

We are using custom postgres+postgis image, but it's really simple, it's based on postgres:10 with the package postgresql-10-postgis-2.4 installed

So step 1 is installing the new postgis version and step 2 is upgrading:

```
jperelli@coffee~/cualbondi $ docker-compose up db -d
jperelli@coffee~/cualbondi $ docker-compose exec db bash
root@bc406779da75:/# apt update && apt install postgresql-10-postgis-2.5
.......
root@bc406779da75:/# su postgres -c "psql $POSTGRES_DB"
cualbondidb=# ALTER EXTENSION postgis UPDATE
```
Done.

## Upgrading postgresql

I'll use a docker image that helps in the process of upgrading a postgresql data cluster

```
mkdir volume_dev_db_11
mkdir upgradepg-10-11
echo "FROM tianon/postgres-upgrade:10-to-11" > upgradepg-10-11/Dockerfile
echo "RUN apt update && apt install postgresql-10-postgis-2.5 postgresql-11-postgis-2.5 -yy" >> upgradepg-10-11/Dockerfile
docker build upgradepg-10-11 temp
```
here stop all docker-compose using the pg10 volume
```
docker run -v $(pwd)/volume_dev_db:/var/lib/postgresql/10/data -v $(pwd)/volume_dev_db_11:/var/lib/postgresql/11/data temp pg_upgrade
sudo cp volume_dev_db/pg_hba.conf volume_dev_db_11/pg_hba.conf
```

Now we have a functional postgresql10 database in `volume_dev_db` postgresql11 database in `volume_dev_db_11`, we only have to switch volumes when starting our new `postgres:11` image