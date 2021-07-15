---
layout: page
title: How to code vue2-leaflet plugins
comments: true
category: post
---

I got the following question via email:

> Hello Julián,
>
> I found your repository on github for the vue-2-leaflet polyline decorator and I just wanted to ask, how did you code it? I saw that you coded 3 wrappers for different libraries so I'm assuming that there's some template that you have to follow. Thanks in advance,
>
> Jason

## I'll try to answer here

I just read through a lot of documentation and source code from leaflet, leaflet-markercluster, vue and vue2-leaflet and started adding those to my application.

Then as my application grow, I took some time to refactor and move the leaflet-markercluster plugin into its own vue file.

I saw that it was pretty self contained and moved it to its own project (vue-leaflet-markercluster)

Then I wrote a README.md with the information on how I used it in my application and I published it in a github repo and in npm.

As I saw people had some interest, I took the time to do the same for 3 other leaflet packages I was using: polyline-decorator, googlemutant, circlemarker, I copied most parts of boilerplate and readme file. Then other people added more plugins to vue2-leaflet by copying the boilerplate I did. I noticed this easily by seeing the READMEs, those are mostly just copies of my original readme file

So there's no documentation to follow, if you want to make your own vue2-leaflet plugin, just grab one of the other plugins, copy it and modify the relevant parts to match what you want to integrate.

## Technically

I think the only thing you need to setup is

1. a working vue2-leaflet project
2. then git clone one of these packages, for example `vue2-leaflet-markercluster` into another directory in your pc, change the name to your new plugin to `yournewplugin`
3. run `npm link /path/to/local/vue2-leaflet-yournewplugin`    (instead of npm install), this is so that you can work with a separate npm package and build your own
4. modify your local copy of  `/path/to/local/vue2-leaflet-yournewplugin`  as you wish
5. change the git name and remote of your new local plugin, `git push` and `npm publish` it
