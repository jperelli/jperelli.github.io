---
layout: page
title: Redmine Periodic Task
comments: true
category: project
image: /public/images/2026-06-29-redmine-periodic-task/main.png
---

In a lot of projects there are tasks that need to be done over and over on a schedule. Renew the SSL certificate once per year, run a security check every 3 months, do the backup review every week. Redmine is great to track issues, but it has no built-in way to create an issue automatically every X time. So back in 2011 I wrote a plugin to do exactly that, and I have been maintaining it ever since.

![Periodic task list view](/public/images/2026-06-29-redmine-periodic-task/main.png)

## How it works

You enable the plugin as a module in a project and a new tab named "Periodic Task" appears. There you define a task once: the interval (every 2 weeks, every 3 months, ...) and a template with all the fields a normal issue has, tracker, priority, assignee, watchers, custom fields, etc.

![Create / edit a periodic task](/public/images/2026-06-29-redmine-periodic-task/create_update.png)

Then a rake task takes care of the rest. You run it from cron, and every time it runs it checks which periodic tasks are due and creates the corresponding issue from the template.

```bash
bundle exec rake redmine:check_periodictasks RAILS_ENV=production
```

A typical crontab entry that checks once per day looks like this:

```
0 6 * * * cd /path/to/redmine && bundle exec rake redmine:check_periodictasks RAILS_ENV=production
```

Each periodic task keeps the history of the issues it generated, so you can open one and see every issue that was created from it and when.

![Periodic task detail](/public/images/2026-06-29-redmine-periodic-task/detail.png)

## A bit more technical

The core idea is simple: a periodic task is basically an issue template plus an interval. The `Periodictask` model stores all the fields a Redmine issue has (tracker, priority, assignee, category, custom fields, watchers, ...) and two extra things, the interval and a `next_run_date`.

The scheduler itself has no state and no daemon. The rake task just calls one method that asks the database for the tasks that are due:

```ruby
Periodictask.where('next_run_date <= ?', now).each do |task|
  issue = task.generate_issue(now)
  issue.save!
  task.next_run_date = task.get_next_run_date(now)
  task.save
end
```

The part I like the most is how the next run date is calculated. A naive version would do `next_run_date += interval`, but then if cron didn't run for a while (the server was down, the database was being migrated, you forgot to set up the cron, ...) you would get a burst of old issues created all at once when it comes back. Instead it jumps straight to the next slot in the future:

```ruby
interval_steps = ((now - val) / interval_number.send(units)).ceil
val += (interval_number * interval_steps).send(units)
```

So a task that should run "every month" creates exactly one issue when cron wakes up after a long pause, not twelve. Business days are handled separately with the `business_time` gem so weekends don't count.

The subject and description support a few variables that get replaced when the issue is created, so the generated issues are not all identical. For example a subject like `Monthly report **MONTHNAME** **YEAR**` becomes `Monthly report June 2026`. There are variables for day, week, month, quarter, year and also the previous month, which is handy for "send last month's report" kind of tasks.

If anything goes wrong while creating an issue (a validation fails, the project was closed), the error is stored in the task's `last_error` field and shown in the interface, instead of breaking the whole run for the other tasks. And if you happen to also use the [redmine_checklists](https://www.redmine.org/plugins/redmine_checklists) plugin, a checklist template can be attached to the generated issues, but the dependency is optional and the plugin works fine without it.

## 15 years of Redmine versions

The interesting part of maintaining a plugin for this long is following all the versions of the host application. This plugin has gone through Redmine 1.x all the way to 6.1, and Redmine internals change a lot between major versions. The way issues are built, the helpers available in the views, the permissions system, all of it moves.

Because of that the repository keeps one branch per supported Redmine version, so if you are stuck in an old Redmine you can still grab a branch that works for you. If you are on a recent Redmine, just use the main branch.

## Maintenance, and a bit of AI

I have been maintaining this plugin since 2011. If you look at the commits over the years you can see the typical life of a side project: an active start, some bursts of work whenever I needed a new feature or a new Redmine version came out, and then a long quiet period where it kind of just worked and I barely touched it.

![Commits per year](/public/images/2026-06-29-redmine-periodic-task/commits-timeline.svg)

Counting lines changed instead of commits tells almost the same story, with one extra detail: the small spike in 2024 was a single commit that ported the plugin to Redmine 5, a lot of lines moved in one go but not much new functionality.

![Lines changed per year](/public/images/2026-06-29-redmine-periodic-task/lines-timeline.svg)

And then there is 2026. What changed is that AI agents finally got good enough to be genuinely useful on a real, old codebase.

The first thing I did was go through the GitHub issues that had been sitting there for years. Things like [next run date constantly increasing (#79)](https://github.com/jperelli/Redmine-Periodic-Task/issues/79) or [timezones other than UTC (#25)](https://github.com/jperelli/Redmine-Periodic-Task/issues/25), the kind of bugs that needed a focused afternoon I never had. With an agent helping me read the code and try fixes, I finally closed the important ones, and on top of that added the first real test suite and CI, which the plugin never had in 15 years.

A bit more than a month later (now) I did a second pass, this time more about polishing: the list, the detail page and the form were rewritten to look like Redmine's native issue screens, an empty state, a "run now" button, the activity log integration, linting, and even the screenshots and this very blog post. A lot of that came out of just brainstorming ideas with the AI and then implementing them together.

So I am clearly in the camp that thinks AI is great. It is an enormous force multiplier, it let me revive in a few weeks a project that had been mostly frozen for years.

But here is the part I want to be honest about. The agent did not decide that the timezone bug was more important than a cosmetic change. It did not decide to keep one branch per Redmine version, or that the form should mirror Redmine's instead of inventing its own style, or that a checklist integration should stay optional so it doesn't become a hard dependency. It did not decide what *not* to build. Every time, I was the one choosing the direction, and the agent was very good at executing it.

That, I think, is the thing that stays in the hands of the engineer: the taste, the judgement, deciding what matters and what to leave out. The LLM makes you much faster at building things, but it does not tell you which things are worth building. At least for now, that part is still ours.

## Repository

The code is on github: [Redmine-Periodic-Task](https://github.com/jperelli/Redmine-Periodic-Task)

If you use Redmine and you have these "I have to remember to do this every month" kind of tasks, give it a try. And if you need it ported to an old Redmine version or some custom behavior, you can [contact me](https://jperelli.com.ar/).
