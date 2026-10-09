---
layout: default
lang: en
i18n_key: case_stock_tracker
title: "From a spreadsheet to a system that says when to reorder"
description: "A real case: a small online seller of medical supplies ran its stock on a spreadsheet. In two weeks we delivered a system that joins its accounting and Amazon data and says what to reorder and when, with artificial intelligence where it helps."
image: /public/images/2026-10-09-stock-tracker/after-dashboard.png
---

<article class="case" markdown="1">
<p class="case-kicker">A real case · 2026 · with <a href="https://exentric.tech/">eXentric</a></p>

<h1 class="case-title">From a spreadsheet to a system that says when to reorder</h1>

<p class="hero-lead">A small company that sells medical supplies online ran its stock on a spreadsheet the founder had built himself. In two weeks we delivered a system that joins the data from its accounting and from Amazon, shows every product on one screen and says what to reorder and when, with artificial intelligence checking every product each day. The founder now improves it himself. The company is not named here at its request; the screenshots are real, with product names and numbers hidden.</p>

<div class="case-facts">
  <div><span class="case-fact-num">2 days</span><span>to a working prototype with their real data</span></div>
  <div><span class="case-fact-num">2 weeks</span><span>from the first message to the system running in their own accounts</span></div>
  <div><span class="case-fact-num">3 sources</span><span>accounting, Amazon warehouse and Amazon sales, joined in one place</span></div>
</div>

## The starting point

The company buys medical supplies from manufacturers in China and sells them online in Australia and the United Kingdom, mostly through Amazon. Stock sits in three places: its own warehouse, Amazon's warehouses and containers already on the way. Orders to the factory take weeks or months to arrive, and the factories stop for the Chinese holidays. Order too late and the product runs out; order too early and the money sits in boxes.

To keep track of it, the founder had built a Google spreadsheet with small scripts that pulled numbers from the accounting program and from Amazon. It was a good spreadsheet. It also had the problems every spreadsheet of this kind has:

- The connections broke every so often, and someone had to log in again and fix them.
- The same product had a different code in the accounting program and in Amazon, so the figures did not add up.
- The "weeks of stock left" column was a fixed formula that did not know about delivery times or holidays.
- Only the person who built it understood it, and the team had to do physical counts to correct it.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/before-spreadsheet.png" alt="The original spreadsheet: a dashboard tab with one row per product and columns for warehouse stock, Amazon stock, stock on order and weeks of stock left. Product names are hidden." loading="lazy">
  <figcaption>Before: the spreadsheet. One row per product, columns calculated by hand, a line of "no sales in the last 30 days" where the connection had stopped working.</figcaption>
</figure>

## What we did

The founder met my partners at <a href="https://exentric.tech/">eXentric</a> at an entrepreneurs meetup and asked whether this could be done better. We proposed something simple: two days of work to show what could be done with the real data. If it was useful, we would hand over the code and talk about next steps.

**Day one.** We connected to the accounting program and to Amazon, the hard part, and had a first version of the screen with their real numbers by the end of the day. We sent a short video to the team in Australia.

**Day two.** Their operations manager explained, in a few recorded videos, how he actually decides what to order: delivery times per manufacturer, minimum order quantities, the Chinese holidays, kits assembled from other products. We watched them several times and turned them into the rules of the system.

**The next two weeks.** The company asked us to leave it running properly instead of on a laptop: a login, a database, the daily update running on its own, everything in accounts that belong to them. On the last call, the founder connected his accounts himself and the first day of data came in while we watched.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-dashboard.png" alt="The new dashboard: one row per product with stock on hand by location, stock on order, last 30 and 90 days of sales with a small sparkline, months of stock left, and an order signal that says OK or Order now. Product names are hidden." loading="lazy">
  <figcaption>After: every product on one screen. Stock in each place, sales with a small chart, months of cover left, and a clear signal, OK, order soon or order now, reviewed each day by the artificial intelligence.</figcaption>
</figure>

## What the system does

- **Joins the three sources every day on its own.** No more logging in again to fix a connection.
- **Knows that two codes are the same product.** A short list of equivalences, kept by the team, and the figures add up.
- **Says when to order, product by product.** It takes the sales of the last weeks, the stock in all three places, the delivery time of each manufacturer and the months of cover the company wants to hold, and turns that into a traffic light: OK, soon, now. And an amount. Each day the artificial intelligence reviews that signal with the full history of the product and adds its own recommendation and a minimum stock level next to it.
- **Shows the history of each product.** Stock going down, sales going up, orders arriving, in one chart.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-product.png" alt="A product page: a chart of total stock on hand over six months with daily sales as bars, a table of stock snapshots by day and a table of recent sales. Product name and order numbers are hidden." loading="lazy">
  <figcaption>One product, six months. The purple line is stock; the bars are daily sales. The big bars are wholesale orders, which the old spreadsheet mixed with Amazon sales.</figcaption>
</figure>

## Where artificial intelligence is, and where it is not

This is the part I care about explaining, because it is where the hot air usually is.

**It does not replace the core rules.** When to reorder starts as arithmetic: sales, stock, delivery time, months of cover. Arithmetic does not need artificial intelligence; it needs to be written down once, correctly, where everyone can see it.

**It is in two places where it helps.** First, in how the system was built: most of the code was written with artificial-intelligence assistants, with me and my partners deciding what to build and checking the result. That is why two days were enough. Second, on top of the rules: each day the system asks a language model to look at every product, with its history and the rules, and write a short recommendation and a minimum stock level, plus one summary of the whole catalogue. That minimum feeds the order signal when a product has no recent sales, and the rest is a second opinion, in plain words, next to the number.

**And the company can turn it down.** A month later the founder told us the AI recommendations were more than they needed for now and he had simplified them. That is fine with me. The system is theirs and the simple rules do most of the work. I would rather say so than pretend otherwise.

## What happened next

The founder, who is not a programmer, took the code and kept going with an artificial-intelligence assistant: he loaded three more months of history, fixed a timeout, changed what he did not like. A month after the handover:

<blockquote class="case-quote">
  <p>"Been having fun playing around with the stock tracker, made quite a few updates. It will become more useful the more data builds up in it over time. Overall the layout and everything is much better for the team."</p>
  <footer>The founder, a month after the handover</footer>
</blockquote>

<blockquote class="case-quote">
  <p>"Looks like it could be a game changer."</p>
  <footer>The operations manager, after seeing the first day's demo</footer>
</blockquote>

That is the outcome I look for: not a system that depends on me, but one the company runs and changes on its own.

<details class="case-tech">
  <summary>For the technical reader</summary>
  <p>Django application; nightly sync from the Xero API (stock, purchase orders, invoices) and the Amazon Selling Partner API (FBA stock, inbound shipments, orders); unified stock snapshots per import batch, full sales history kept as order headers and lines with rolling windows computed at query time; SKU aliases for cross-source identity; reorder signal from weeks of cover against lead time plus target cover; per-SKU and global recommendations through LiteLLM so the model provider can be swapped; deployed on Vercel with a Neon Postgres database and a cron endpoint, all in the client's own accounts.</p>
</details>

<section class="cta" id="contact">
  <h2>Let's talk</h2>
  <p>Most companies have a spreadsheet like this one. Two lines about what the company does are enough; the first conversation (30 minutes) is free and there is no commitment.</p>
  <p class="hero-actions">
    <a class="btn btn-primary" href="mailto:jperelli@gmail.com?subject=Artificial%20intelligence%20in%20my%20company">Email me</a>
    <a class="btn btn-ghost" href="/">Back to the home page</a>
  </p>
</section>
</article>
