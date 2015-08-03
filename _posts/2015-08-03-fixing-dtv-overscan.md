---
layout: post
title: Fixing digital television HDMI overscan
comments: true
---

My TV: NOBLEX 24LD839FT

Other equivalent models: 

- JVC LT24DR530
- SANYO LCE24XF9T
- PHILCO PLD2412FT

## Issue description

It seems like (cheap?) Digital TVs try to "fix" the screen size problems when connecting using HDMI to the computer.

The TV "fix" consists on adjust the the projected image in the TV screen to a bigger size than it should be. This as I read, comes from issues with analog TVs, and with digital connections it should not be an issue.

I wanted to have pixel perfect resolution on my TV, but this was not being possible because of this issue:

 1. The PC sends an image of 1920x1080 (1080p) through HDMI
 2. The TV receives a 1920x1080 image
 3. The TV stretches the image to a bigger extent, say 2000x1150
 4. The TV shows a fraction of the image of 1920x1080, centered.

There are actually two issues involved:

 - In step 3. the image suffers a [rescaling](https://en.wikipedia.org/wiki/Image_scaling), probably with bilinear interpolation, this reduces image quality.
 - In step 4. the image loses borders, so you cannot see window close buttons or taskbar.

This is entirely a TV issue, called overscan. You can find a lot of people struggling with this in internet forums.

## How to test it

To test if this is happening to the TV, [images published here](http://www.fossiltoys.com/monitor.html) can be used. This images can easily be used to detect rescaling. Just see them in the TV with in 1:1 resolution (i.e. no zoom on web page).

## How to fix it

The only real fix for this, is to tell the TV to stop trying to fix the image if the image does not need to be fixed. That is, mark an option in the TV menu so it does not do overscan.

The next ocassional problem is that the (cheap?) TVs don't have that option in the menu.

There are many alternative solutions that you can find all scattered through internet forums. Those can all be found [compiled in this great post](http://ralsina.me/weblog/posts/overscan-fix-for-intel-on-a-cheap-tv.html). The problem is that none of this solutions are perfect.

I found another one, not mentioned anywhere.

## My solution (Pixel perfect 1:1)

The TVs have a hidden menu that you can access pressing a combination of buttons. Loads of settings can be found here. This is called service menu, and [google helps to find](https://www.google.com.ar/webhp#q=service+menu+tv) the button combination to enter the menu.

I found this in [a forum](http://www.tdtlatinoamerica.com.ar/forotdt/viewtopic.php?f=29&t=1253), but actually I never found it linked to the overscan issue.

So in my TV's menu, I didn't have an overscan option, but in the hidden menu, there was it. To enter to the hidden menu, I took the remote control and pressed `source` `2` `5` `4` `8`  in order.

In the `Factory setting` menu I went to the `Panel Control` submenu, and there to the `overscan` option. I found the overscaling option and inside I juggled around the `OVERSCAN-HSIZE` and `OVERSCAN-VSIZE` values until I found the pixel perfect ones (500 and 500, they where in 548 and 530 or so) using the test images.

The result is a pixel perfect image, without rescaling interpolation, and with all the image complete on screen.

