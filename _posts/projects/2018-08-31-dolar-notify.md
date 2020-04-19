---
layout: page
title: Dolar Notify
comments: true
category: project
image: /public/images/2018-08-31-dolar-notify/main.png
---

In Argentina, as we had some important [financial crisis](https://en.wikipedia.org/wiki/Corralito) in the past related with the exchange price of the ARS/USD, any time that price changes, people tend to be alert of it in order to check if they need to go to the bank, buy/sell, move the money away from insitutions or some other thing.

In August 2018, there were a few days of bonanza in the news

![bonanza](/public/images/2018-08-31-dolar-notify/news.png)

The panic and worry got to me, and I started to open the webpage of my bank to see the price of USD/ARS every 5 minutes. So I took the opportunity to learn desktop notifications and made this little application/bot that every few seconds

  1. Enters to my bank's home web page
  2. Parses the html and finds ARS/USD exchange rate
  3. If the price is different from the previous check, it shows a desktop notification

[Here is a link to the repository with the code](https://github.com/jperelli/dolar-notify)

## Notifications were good for once

Contrary to what I might have thought, keeping this program running actually made me less anxious about this issue, because I could be thinking other things knowing that there was this application that it was going to let me know about any change in the rate and I didn't need to be checking on the website every five minutes.

This is the rare case where notifications were good to my health.

This made me think that the real purpose of a notification is not to receive spam (as they 99% of the time do in my phone), but to let you stop wasting time waiting for something to happen or by stop having to interrupt your work to check into something.
