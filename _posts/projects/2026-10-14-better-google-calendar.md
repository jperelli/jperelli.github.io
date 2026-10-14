---
layout: page
title: Better Google Calendar
description: "A Chrome extension that adds the things I kept missing in Google Calendar: drop an .ics to add it, create events by typing plain English or Spanish, a command palette, working-hours shading, totals and text export. No OAuth, no server."
comments: true
category: project
image: /public/images/better-google-calendar/grid-now-bar.png
---

<link rel="stylesheet" href="/public/css/argocd-demo.css">
<link rel="stylesheet" href="/public/css/bgc-demo.css">

Google Calendar is good and I use it all day, but a handful of small things kept annoying me: an invite arrives as an `.ics` attachment and there is no way to just drop it on the calendar; creating an event with a guest, a place and a repeat rule takes six clicks through the form; the settings I touch twice a year are buried three menus deep. Better Google Calendar is a Chrome extension that fixes those from the page itself. It never asks for access to the Google account: everything works through the page already open and through Google's own event-form URLs.

<div class="project-links">
  <a class="primary" href="https://chromewebstore.google.com/detail/better-google-calendar/jnmneemlkehjkaaelbidgapibfkjekoh">Install from the Chrome Web Store</a>
  <a href="https://github.com/jperelli/better-google-calendar">Source on GitHub</a>
</div>

<video class="project-video" controls muted playsinline preload="metadata" poster="/public/images/better-google-calendar/poster.jpg">
  <source src="/public/videos/better-google-calendar.mp4" type="video/mp4">
</video>

## Try the Quick Add parser <span class="try-badge">interactive</span>

In the calendar, pressing `q` opens a box where an event is typed in one line. This is the parser that reads that line, running here in the page, plus the URL it builds for Google's event form. Edit the text or pick an example.

<div id="bgc-demo"><noscript>The interactive demo needs JavaScript.</noscript></div>

<script src="/public/js/better-google-calendar/ics.js"></script>
<script src="/public/js/better-google-calendar/quickadd.js"></script>
<script src="/public/js/better-google-calendar/gcal-url.js"></script>
<script src="/public/js/better-google-calendar/demo.js" defer></script>

## What it adds

<ul class="feature-list">
  <li><b>Drop an .ics on the calendar</b> Invites from any mail client, with one or many events, time zones (including Windows names) and recurrences. Each event opens Google's pre-filled form; nothing is written behind your back.</li>
  <li><b>Quick Add in plain words</b> English and Spanish: <code>tomorrow 1-2pm</code>, <code>next friday</code>, <code>14 nov</code>, <code>a las 17</code>, <code>for 45 min</code>, <code>every weekday</code>, <code>cada último viernes</code>, e-mails as guests, <code>at Bar Lobo</code> as place.</li>
  <li><b>Templates</b> Save what was typed (title, length, place, guests, repeat) and reuse it with a new date.</li>
  <li><b>Command palette</b> <kbd>Ctrl</kbd>+<kbd>K</kbd> to jump to a date, to a settings section, or to run any of the extension's commands.</li>
  <li><b>Grid helpers</b> Working-hours shading and weekend colours, dim past and declined events, a "now" bar with the current and next meeting and a join link.</li>
  <li><b>Totals by colour</b> Hours in view grouped by event colour, so a week of meetings becomes a number.</li>
  <li><b>Share free times</b> The gaps of the visible week as text, ready to paste in an email.</li>
  <li><b>Export</b> The visible events as text, Markdown, CSV or .ics.</li>
</ul>

<div class="project-gallery">
  <figure><img src="/public/images/better-google-calendar/ics-drop.png" alt="Drop overlay when dragging an .ics file over Google Calendar" loading="lazy"><figcaption>Drag an .ics over the calendar.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/popover-ics.png" alt="List of events found in the dropped .ics file" loading="lazy"><figcaption>Every event in the file, each with an "Open to add" button.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/quick-add.png" alt="Quick add panel with a parsed event preview" loading="lazy"><figcaption>Quick Add with the live preview of what was understood.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/templates.png" alt="Templates saved from Quick Add" loading="lazy"><figcaption>Templates saved from Quick Add.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/palette.png" alt="Command palette" loading="lazy"><figcaption>Command palette (Ctrl+K).</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/palette-date.png" alt="Command palette jumping to a date" loading="lazy"><figcaption>Jump to a date by typing it.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/grid-now-bar.png" alt="Calendar grid with working-hours shading, now bar and totals" loading="lazy"><figcaption>Shading, now bar and totals on the real Google Calendar.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/free-times.png" alt="Share free times dialog" loading="lazy"><figcaption>Free times of the week as text.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/palette-export.png" alt="Export commands in the palette" loading="lazy"><figcaption>Export the visible events.</figcaption></figure>
  <figure><img src="/public/images/better-google-calendar/dim-past.png" alt="Past events dimmed" loading="lazy"><figcaption>Past events dimmed.</figcaption></figure>
</div>

## How it works

The whole extension is plain JavaScript, Manifest V3, no bundler and no dependencies. The pure parts (the `.ics` parser, the Quick Add parser, the Google URL builder, the grid model) are small modules tested with `node --test`; the two running in the demo above are the exact files shipped in the extension.

Adding an event never touches an API. The extension builds a `calendar.google.com/.../eventedit?text=...&dates=...&location=...&recur=RRULE:...&add=...` URL and opens it, so Google's own form appears with everything filled in and the user presses Save. That is why it needs no OAuth scope and no server, and why it works with any Google Workspace policy.

The grid features read Google's DOM: the `data-datekey` attribute on day columns (a packed year/month/day integer), the hour gutter, and the `data-eventid` chips. The layout is re-scanned on every mutation, and if Google changes the markup so that the scan no longer finds a grid, those features pause themselves and say so, instead of painting in the wrong place.
