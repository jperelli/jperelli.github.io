---
layout: default
lang: en
i18n_key: case_claude_tracker
title: "From a buyer spreadsheet to a Claude tracker that remembers, and when to move it out"
description: "An invented example: a buyer-tracking spreadsheet rebuilt as a Claude artifact with saved data, the prompt to copy, what survives closing the tab and what does not, and the reasons people end up moving these tools out of Claude."
image: /public/images/2026-10-15-claude-crm/cover.png
---


<link rel="stylesheet" href="/public/css/claude-crm-demo.css">

<article class="case" markdown="1">
<p class="case-kicker"><span class="case-badge case-badge-example">Example</span> Invented data · 2026</p>

<h1 class="case-title">From a buyer spreadsheet to a Claude tracker that remembers, and when to move it out</h1>

<p class="hero-lead">This is not a client case: it is an invented example, built on a property agency that does not exist, of a situation I keep meeting at local business events. A small company has a spreadsheet of customers and a "small CRM" that Claude built in the chat, and keeps both. The example shows what the Claude tool can honestly do today (save data, with conditions), gives the prompt to get there in an afternoon, and marks the point where I would move it out of Claude and why. Everything in it can be done without me.</p>

The pattern is always the same. The sheet stays because it is where the information has always been; the Claude tool stays because it is nicer to look at. Every few days the owner pastes the sheet into the chat and asks Claude to "update the CRM". The emails Claude writes come out too long, so they stay in drafts and get rewritten by hand.

## The spreadsheet

A small agency with two people, around thirty active buyers at any time. The sheet has one row per buyer and these columns. Names are invented.

<div class="crm-sheet">
<table>
<thead><tr><th class="corner"></th><th>Buyer</th><th>Looking for</th><th>Budget</th><th>Source</th><th>Status</th><th>Last contact</th><th>Next step</th><th>When</th></tr></thead>
<tbody>
<tr><td class="corner">1</td><td>Marta R.</td><td>Flat, 3 bedrooms, town centre</td><td>up to 420k</td><td>Idealista</td><td><span class="crm-status crm-status-visit">Visit scheduled</span></td><td>12 Oct</td><td>Visit Carrer Major 14</td><td>17 Oct</td></tr>
<tr><td class="corner">2</td><td>Puig family</td><td>House with garden, near the beach</td><td>650k to 750k</td><td>Walked in</td><td><span class="crm-status crm-status-contacted">Contacted</span></td><td>9 Oct</td><td>Send two options</td><td>14 Oct</td></tr>
<tr><td class="corner">3</td><td>Daniel K.</td><td>Flat near the train, 2 bedrooms</td><td>300k</td><td>Referral</td><td><span class="crm-status crm-status-new">New</span></td><td>13 Oct</td><td>First call</td><td>15 Oct</td></tr>
<tr><td class="corner">4</td><td>Núria and Pau</td><td>Ground floor with terrace</td><td>350k</td><td>Website form</td><td><span class="crm-status crm-status-visit">Visited</span></td><td>11 Oct</td><td>Ask how the visit went</td><td>14 Oct</td></tr>
<tr><td class="corner">5</td><td>Mr Soler (investor)</td><td>Two or three small flats to rent</td><td>200k each</td><td>Returning client</td><td><span class="crm-status crm-status-offer">Offer made</span></td><td>10 Oct</td><td>Wait for the owner's answer</td><td>16 Oct</td></tr>
<tr><td class="corner">6</td><td>Laia M.</td><td>Studio for a daughter studying in Barcelona</td><td>180k</td><td>Instagram</td><td><span class="crm-status crm-status-lost">Lost, bought elsewhere</span></td><td>2 Oct</td><td></td><td></td></tr>
</tbody>
</table>
</div>
<p class="crm-caption">The whole business of following up buyers fits in nine columns. The two that matter most are the last two: what happens next, and when.</p>

The sheet is not the problem. The problem is the second copy. Once the same thirty rows also live inside a Claude tool, every call or visit has to be written down twice, and the day one of the two is not updated nobody knows which one is right. "Ask Claude to sync them" is a third job on top of the two.

## What Claude actually keeps today

Claude's side panel tools are called artifacts. For a long time an artifact was a page that forgot everything the moment the chat was closed: the code Claude wrote was saved with the conversation, but any row typed into it lived only in the open window. Anthropic added persistent storage to artifacts in October 2025, and since September 2026 new artifacts save data without any extra step. So the tool can remember. The conditions are in Anthropic's own help pages, and they matter:

<table class="crm-truth">
<thead><tr><th>Where the information is</th><th>After closing the tab</th><th>Source and conditions</th></tr></thead>
<tbody>
<tr><td>The artifact itself (the code, the page Claude wrote)</td><td class="crm-yes">Kept</td><td>Saved with the conversation and in the Artifacts tab.</td></tr>
<tr><td>Rows typed into an artifact that has no storage, or an older artifact that was never published</td><td class="crm-no">Gone</td><td>The help center is explicit: in artifacts made before 16 September 2026 "storage works only after you publish"; before that, saving "won't succeed". The page still looks like it saved.</td></tr>
<tr><td>Rows written to the artifact's storage</td><td class="crm-yes">Kept</td><td>Pro, Max, Team and Enterprise plans. Text only, no photos or files. 20 MB per artifact. Personal (each person sees their own rows) or shared (everyone sees the same rows).</td></tr>
<tr><td>Stored rows of an older artifact after clicking Unpublish</td><td class="crm-no">Deleted</td><td>"Unpublishing also permanently deletes any personal and shared storage data the artifact used", and it cannot be published again.</td></tr>
</tbody>
</table>

The demo below is the difference in one click. Both lists are the same tracker; one keeps its rows only while the window is open, the other writes them to storage.

<div id="crm-demo" class="crm-demo" data-lang="en"><noscript>The interactive demo needs JavaScript.</noscript></div>

The left column is what people hit when the tool "forgets": the artifact comes back exactly as Claude wrote it, with the sample rows, and everything typed since is gone. The right column is what a tracker with saved data does, and it is what the prompt below asks for.

Sources for the table: Anthropic's help center pages [What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) and [Share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts), read in October 2026; the October 2025 timeline is checked in [Can Claude Artifacts Save Data?](https://caipi.ai/blog/can-claude-artifacts-save-data). These rules have already changed once; if you read this months later, re-check the help pages.

## How to build it in an afternoon

This is the part that delivers the value. No code to write; the work is deciding what the tool should do before asking for it.

<ol class="crm-path">
<li><strong>Clean the sheet first.</strong> One row per buyer. One fixed list of statuses: New, Contacted, Visit scheduled, Visited, Offer made, Won, Lost. Two columns that are never empty for an active buyer: <em>Next step</em> and <em>When</em>. Delete the columns nobody has filled in for a year. Export it as CSV (File, Download, CSV in Google Sheets).</li>
<li><strong>Ask Claude for the tracker with the prompt below.</strong> It asks for saved data explicitly, for a way to import the CSV once and export it any time, and for short email drafts built from the row instead of written from scratch each time.</li>
<li><strong>Test that it remembers before trusting it.</strong> Add one buyer, close the tab, open the artifact again from the Artifacts tab in the sidebar. If the buyer is not there, paste the help-center note into the chat ("storage operations won't succeed until you publish") and ask Claude to fix it or publish. Do not import the real list until this test passes.</li>
<li><strong>Import the sheet once, then stop updating the sheet.</strong> One copy. The CSV export button is the backup: press it on Friday afternoon and keep the file. That also protects against the Unpublish trapdoor and against any future change in how Claude keeps data.</li>
<li><strong>Use the email drafts as they are.</strong> The tool fills a short fixed text with the buyer's name, the property and the next step. Six lines, same every time. The reason Claude's emails were too long is that each one was written from a blank page; a template has no blank page.</li>
</ol>

<div class="crm-prompt">
<button type="button" class="crm-copy">Copy the prompt</button>
<pre>Build me an interactive tracker (an artifact) to follow up potential property buyers. It replaces a spreadsheet, so it must keep its data: use the artifact's persistent storage, personal mode, and never browser localStorage. Save after every change and load everything when the tracker opens.

One row per buyer with these fields: name, phone, email, looking for (free text), budget, source (Idealista, Fotocasa, website form, walked in, referral, Instagram, returning client, other), status (New, Contacted, Visit scheduled, Visited, Offer made, Won, Lost), last contact date, next step (free text), next step date, notes.

Screens:
1. "Today": buyers whose next step date is today or earlier, sorted by date, oldest first. This is the screen that opens by default.
2. "All buyers": a table I can sort by status and by next step date, with a search box, and a button to add a buyer. Clicking a row opens it to edit any field. Changing the status asks for the new next step and its date.
3. "Import / export": a text box where I paste the CSV from my spreadsheet (first line = column names), with a preview before importing, and an "Export CSV" button that downloads every buyer.

Email drafts: on each buyer, a "Draft email" button that fills ONE of these fixed templates with the buyer's fields and shows it with a "Copy" button. Do not generate new text with AI; only fill in the template. Maximum six lines each.
- After first contact: thank them, repeat in one line what they are looking for and the budget, say I will send options by [next step date].
- Before a visit: confirm the address, date and time, and what to bring.
- After a visit: ask in one line what they thought and whether they want a second visit.
- Offer made: say the offer has been passed to the owner and when I expect an answer.

Keep it simple and readable on a phone. Language of the interface: Spanish. Use the sample data below until I import my own.
Marta R., 600000000, marta@example.com, flat with 3 bedrooms in the town centre, up to 420000, Idealista, Visit scheduled, 2026-10-12, Visit Carrer Major 14, 2026-10-17
Puig family, 600000001, puig@example.com, house with garden near the beach, 650000-750000, walked in, Contacted, 2026-10-09, Send two options, 2026-10-14</pre>
</div>

Two notes on the prompt. "Personal mode" means the rows are visible only to the account that opens the tracker; if two people in the agency need the same list, ask for shared mode instead, and know that then everyone with access sees and edits the same rows. And the email part deliberately turns the AI off: the fixed templates are the fix for drafts that come out too long.

For the agency in the example this is a real improvement over the spreadsheet plus chat: one copy of the data, a "Today" list that says who to call, emails in ten seconds. It costs the Claude plan they already pay for. For many small businesses this is where it should stop, and that is a fine outcome.

## When I would move it out of Claude

The tracker inside Claude is one person's tool that happens to be shareable. The business will outgrow it at a predictable set of points, and people who built real tools on artifacts have written about reaching them:

<ul class="crm-stories">
<li><p>A Reddit user in May 2026: "I build a lot of HTML apps in Claude and love how fast it is, but actually using them is frustrating. Artifact storage resets between sessions, so data never persists." The top answer: "Artifacts are like previews… they are not intended for real use."</p><p><a href="https://www.reddit.com/comments/1t5mtge/">Is there an app launcher for artifacts?</a>, r/Anthropic</p></li>
<li><p>A tool connected to Slack and Trello, built and tested for a week, lost every stored record because the team never clicked Publish; in the older artifacts, saving silently did nothing until then.</p><p>Reported on <a href="https://www.linkedin.com/posts/zebra-techies-solution_claudeartifacts-claudeai-anthropic-activity-7503391787538046976-UtCO">LinkedIn</a>, September 2026</p></li>
<li><p>A developer on a personal plan found two artifacts, one holding "months of live launch-planning state", returning "artifact not found" with no action on his side, no retention setting and no recovery path.</p><p><a href="https://github.com/anthropics/claude-code/issues/90395">anthropics/claude-code issue #90395</a>, August 2026</p></li>
<li><p>A consultant who keeps client quotes and pricing sheets as artifacts: after a couple of weeks "a client quote sat next to a video script", the chats they came from were closed, and he sometimes "just asked Claude to make the thing again". He ended up building a catalogue outside Claude to find them.</p><p><a href="https://dev.to/amsyeung/i-kept-losing-my-claude-artifacts-so-i-made-a-mod-3bph">I kept losing my Claude artifacts, so I made a mod</a>, October 2026</p></li>
<li><p>Two tool vendors who compared artifacts with hosted apps agree on the structural wall: an artifact "cannot tell two people apart", so "anything involving names, roles, private rows or files hits a wall that no prompt can move"; and the store "is a key-value box, not a database", with no custom domain and no way to export the code and leave.</p><p><a href="https://homespun.dev/guides/claude-artifacts-alternative">Homespun</a> and <a href="https://www.totalum.app/blog/claude-artifacts-alternative-2026">Totalum</a>, 2026. Both sell the alternative, so read them as interested parties; their factual claims match Anthropic's pages.</p></li>
</ul>

Translated to the agency, these are the moments:

- **A second person needs to work on the list** with their own login, seeing the same buyers but not able to delete everything by mistake. Shared storage is all or nothing; there are no roles.
- **A buyer who is not a Claude user needs to see something.** Since September 2026 "everyone needs a Claude account" to open a shared artifact. A link to a property shortlist for a buyer is not possible from inside.
- **Photos and documents.** Storage is text only, 20 MB. A property has photos, a buyer has a pre-approval letter, a deal has a signed offer. None of it fits.
- **It has to talk to the rest of the business.** New enquiries arriving by email or from a portal, visits going into the calendar, a message sent when the owner answers. Artifacts can connect to some apps, but each person connects their own accounts, and nothing runs when nobody has the tab open.
- **The data has to survive the tool.** The rows live under Claude's URL, for as long as Claude keeps the artifact. An agency's buyer history is the business; it should be in a database the agency owns, with backups it did not have to remember to press.
- **Changes are made by re-prompting.** Every edit means asking Claude to rewrite the page, and the only guidance on what happens to existing rows across rewrites is "export first". A tool people rely on needs changes that cannot wipe the data.

None of these are bugs Anthropic will fix next month; they follow from what an artifact is, a page next to a chat. They are also exactly the list of things the artifact phase was useful for finding out: by the time an agency hits them, it knows which columns it uses, which statuses are real, what the "Today" list should show and which four emails it sends. That is the specification, and it is worth more than the code.

## What the step out looks like

The path I follow with companies in this situation is short, because the thinking is already done:

<ol class="crm-path">
<li><strong>Export the CSV</strong> from the artifact while it still works. Nothing else is needed from Claude.</li>
<li><strong>Build the same tracker as a small web application</strong> with a real database (one table per thing: buyers, properties, visits, offers), a login per person, and the "Today" screen and the four emails exactly as the artifact had them. Most of the code is written with AI assistants, which is why this takes days, not months; the decisions are the part a person makes.</li>
<li><strong>Put it in the company's own accounts</strong>: its own address, its own database with automatic backups, its own email sending. The company can leave me and keep everything.</li>
<li><strong>Then connect it</strong>: enquiries from the portals and the website straight into the list, visits into the calendar, follow-up reminders that fire whether or not anyone opened a tab.</li>
<li><strong>Add AI only where it earns its place</strong>: reading an incoming enquiry and filling the row, or suggesting which stale buyers to call this week. The core, who to call and when, stays as rules anyone can read.</li>
</ol>

I did this for real with a medical-supplies seller whose stock lived in a spreadsheet; the result and what the founder did with it afterwards is in [From a spreadsheet to a system that says when to reorder](/cases/stock-tracker/). The pattern is the same: the spreadsheet proved what the business needed; the system made it something the team does not have to maintain by hand.

<section class="cta" id="contact">
<h2>Let's talk</h2>
<p>If a spreadsheet and a Claude tool in your company are describing the same customers, I am happy to look at it. The first conversation (30 minutes) is free and there is no commitment; two lines about what the company does are enough.</p>
<p class="hero-actions">
<a class="btn btn-primary" href="mailto:jperelli@gmail.com?subject=Spreadsheet%20and%20Claude%20tracker">Email me</a>
<a class="btn btn-ghost" href="/">Back to the home page</a>
</p>
</section>

</article>

<script src="/public/js/claude-crm-demo/demo.js" defer></script>
