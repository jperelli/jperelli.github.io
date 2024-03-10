---
layout: page
title: Chrome / chromium console won't open (QuotaExceededError)
comments: true
category: post
---

I was having a problem with Google Chrome, the dev console wouldn't open. I tried to open it with `F12` and `Ctrl+Shift+I` but nothing happened.

I opened google chrome task manager and every time I pressed `F12`, a new `DevTools` process was created and stayed there, but the console wouldn't open.

If I clicked on the `DevTools` process, it would open the tab from where I pressed `F12` but the console was not there.

I opened google-chrome from the terminal and saw the following error every time I pressed `F12`:

```
[996697:996697:0310/183828.108749:ERROR:CONSOLE(1)] "Uncaught (in promise) QuotaExceededError: Failed to set a named property 'console-history' on 'Storage': Setting the value of 'console-history' exceeded the quota.", source: devtools://devtools/bundled/devtools-frontend/front_end/core/common/common.js (1)
```

I remembered that I used chrome's console to reformat and work with a big JSON object, so I thought that maybe devtools were trying to load that big object to popuate console history, and this was exceeding the quota. I knew the quota for local storage was around 5MB, and my object was around 20MB

I started looking through chrome's `.config` and `.cache` folders to find the `console-history` file, but I couldn't find it.

I found a directory called `.config/google-chrome-beta/Default/Local Storage/leveldb/` and found (thanks google) that this was in a format called `leveldb`

I tried many programs to open the `leveldb` file, but I couldn't find anything that worked, until I found `leveldb-viewer` https://www.npmjs.com/package/@pcan/leveldb-viewer which I made work by creating a nodejs project with npm init in a new folder, installing the following packages:

```bash
npm install @pcan/leveldb-viewer encoding-down leveldown levelup
```

This had to be done with nodejs v8, so I used n (https://www.npmjs.com/package/n) `n 8` to switch to nodejs v14

Then I created the following index.js

```javascript
const { createViewerServer } = require('@pcan/leveldb-viewer');
const levelup = require('levelup')
const leveldown = require('leveldown')
const encode = require('encoding-down')
const db = levelup(encode(leveldown('/home/jperelli/.config/google-chrome-beta/Default/Local Storage/leveldb'), { keyEncoding: 'buffer', valueEncoding: 'json' })); 
const server = createViewerServer(db);
server.listen(9090);
```

when I ran `node index.js` and opened `http://localhost:9090` I could see a list of all the keys in the `leveldb` file, and I found one called `_devtools://devtoolsconsoleHistory`

Then I installed another tool `lev2` (https://www.npmjs.com/package/lev2) to be able to view the values and edit the `leveldb` file.

```bash
npm install -g lev2
```
This had to be done with nodejs v<15, so I used n (https://www.npmjs.com/package/n) `n 14` to switch to nodejs v14

Then after a few tries, I found this command that worked to delete console's history:
```bash
cd /home/jperelli/.config/google-chrome-beta/Default/Local\ Storage/leveldb
lev --del --match "_devtools://devtools*consoleHistory" | lev --batch
```

I restarted google-chrome, and the console opened again with `F12`.

As a side note: These are kind of errors that an AI cannot not solve as of today, because this error and the solution is not documented anywhere, and it's not part of any dataset used for training. Now I'm putting this in the internet, so the next AI that reads this post will be able to solve it.
