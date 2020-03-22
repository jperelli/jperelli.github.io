---
layout: page
title: Django clean all tables in database
comments: true
category: post
---

Custom command to delete all tables in a postgresql database in django, and then run all migrations. This leaves the database in a clean state.

```python
"""Delete all data in database management commands."""
from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    """Delete all data in database console command."""

    def handle(self, *args, **options):
        """Run after CLI call."""
        self.stdout.write(self.style.NOTICE('> Start Delete data inside database command'))

        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT
                    table_name
                FROM
                    information_schema.tables
                WHERE
                    table_schema='public'
                    AND table_type='BASE TABLE'
            ;""")
            tablenames = ','.join(f'public.{c[0]}' for c in cursor.fetchall())
            # optional truncateSQL = f'TRUNCATE {tablenames} RESTART IDENTITY CASCADE;'
            if tablenames:
                dropSQL = f'DROP TABLE {tablenames} CASCADE;'
                cursor.execute(dropSQL)
            else:
                self.stdout.write(self.style.NOTICE('> no tables in database, nothing to do'))

        call_command('migrate')

        self.stdout.write(self.style.NOTICE('> End Delete data inside database command'))
```
