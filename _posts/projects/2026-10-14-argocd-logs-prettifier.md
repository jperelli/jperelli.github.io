---
layout: page
title: Argo CD Logs Prettifier
description: A Chrome extension that turns the JSON and logfmt lines in the Argo CD pod Logs tab into structured, filterable rows, with a level timeline and expandable records.
comments: true
category: project
image: /public/images/argocd-logs-prettifier/after.png
---

<link rel="stylesheet" href="/public/css/argocd-demo.css">

Argo CD is where I end up looking at pod logs most of the time, and most of those logs are one JSON object per line. The Logs tab shows them as plain text, so finding the one error in a stream of .NET, pino and Dapr lines means scrolling and squinting. This extension reads the lines Argo already rendered and shows them as a table instead: time, level, logger, message and the extra fields, with filters on top. Nothing leaves the browser.

<div class="project-links">
  <a class="primary" href="https://chromewebstore.google.com/detail/argo-cd-logs-prettifier/nlccbcoeofgifpifelblbkgohacabpkg">Install from the Chrome Web Store</a>
  <a href="https://github.com/jperelli/argocd-logs-prettifier">Source on GitHub</a>
</div>

<video class="project-video" controls muted playsinline preload="metadata" poster="/public/images/argocd-logs-prettifier/poster.jpg">
  <source src="/public/videos/argocd-logs-prettifier.mp4" type="video/mp4">
</video>

## Try it <span class="try-badge">interactive</span>

This is a copy of an Argo CD Logs tab with a live stream of synthetic logs in the same formats I deal with at work (ASP.NET JSON, pino, Dapr logfmt and a few raw lines). The `{ } JSON` button is the one the extension adds to Argo's toolbar. Press it, then filter by text or by level, and click a row to see the whole record.

<div id="ajl-demo"><noscript>The interactive demo needs JavaScript.</noscript></div>

<script src="/public/js/argocd-logs-prettifier/parser.js"></script>
<script src="/public/js/argocd-logs-prettifier/demo.js" defer></script>

## What it does

The extension works on top of the page Argo CD already shows. It does not call the Argo API and it does not need a token: it parses the text of each rendered line and swaps the plain view for a structured one, keeping Argo's own controls (container selector, follow, tail, since, filter, dark mode) untouched.

<div class="project-gallery">
  <figure><img src="/public/images/argocd-logs-prettifier/before.png" alt="Argo CD Logs tab before: raw JSON lines" loading="lazy"><figcaption>Before: one JSON object per line.</figcaption></figure>
  <figure><img src="/public/images/argocd-logs-prettifier/after.png" alt="Argo CD Logs tab with the extension: structured rows" loading="lazy"><figcaption>After: level badge, time, logger, message, extra fields and a per-second timeline.</figcaption></figure>
  <figure><img src="/public/images/argocd-logs-prettifier/expanded.png" alt="Only error rows shown, one expanded as coloured JSON" loading="lazy"><figcaption>Ctrl-click a level chip to show only that level; click a row to expand the full record.</figcaption></figure>
  <figure><img src="/public/images/argocd-logs-prettifier/timeline.png" alt="Timeline with a selected time range" loading="lazy"><figcaption>Drag on the timeline to keep only a time range.</figcaption></figure>
</div>

- **Formats**: JSON (.NET `LogLevel`/`Category`, pino numeric levels, Serilog, generic `level`/`msg`), logfmt (Dapr, Go), and raw text with a best-effort level guess.
- **Filters**: free text over message, logger and fields; level chips with counts (click toggles, Ctrl-click solos); a time range selected on the timeline.
- **Rows**: expand one record as coloured JSON, copy it as JSON or as the original line, expand or collapse all, wrap long lines.
- **Live**: follow mode keeps working while Argo streams; lines are keyed by content so expanded rows stay open when the tail rolls.
- **Dark mode**: follows Argo's own dark toggle.

## How it works

Argo renders each log line as a `div.noscroll` inside `.pod-logs-viewer`, with the pod name in the first child and the text in the last one. A content script watches that container with a `MutationObserver`, parses every new line and keeps a record per line. Only the last few hundred visible rows are mounted in the DOM, because laying out 10k rows is what made the first version crawl on busy pods.

The parser is the interesting part and it is the same file running in the demo above ([`parser.js`](https://github.com/jperelli/argocd-logs-prettifier/blob/main/extension/parser.js)). It strips Argo's timestamp prefix, tries `JSON.parse` on the first `{...}` it finds, falls back to logfmt, and otherwise returns a raw record. Level names are normalised (`Information`, `warning`, `30`, `CRITICAL`...) into six buckets so the chips and the timeline work across libraries that disagree on naming.

The extension asks for no host permission up front. The first time it runs on an Argo CD host it requests access to that origin only, through the `optional_host_permissions` API, so it stays dormant everywhere else.
