---
layout: page
title: osm-static-maps
comments: true
category: project
image: /public/images/2019-10-01-osm-static-maps/main.jpg
---

This is a tool made to create static images from dynamic maps. It has multiple interfaces: a nodejs lib, a CLI and a server via GET or POST. It can be used as a replacement of google static maps.

## Design

The project started in 2013 as a simple express server that created a webpage with a leaflet map and send it to webshot (phantomjs) to take a screenshot of the map webpage. Then the express server returned that image.
![flow 1](/public/images/2019-10-01-osm-static-maps/flow-1.jpg)

Then in 2019 evolved by converting it to a library. This made it possible to create different interfaces around the same library: a CLI and a server. Also enables it to be used as a dependency for other packages, so I published it in npm. A few years have passed so phantomjs was replaced by puppeteer.
![flow 2](/public/images/2019-10-01-osm-static-maps/flow-2.jpg)

Also the interfaces are being shipped in the npm package when installing it with `sudo npm i -g osm-static-maps`

 - cli executable: `osmsm`
 - server run: `osmsm server`

The options that can be used in the cli and server are directly the ones that are in the library, they all share the same. You can see the full list of options in the [README.md](https://github.com/jperelli/osm-static-maps#api-reference)

## Addons

There are some options in the library that depend on other libraries installed in the system like imageoptim and oxipng. You need to have some dependencies for those to work (optipng/jpegtran/oxipng). You can see the [dockerfile](https://github.com/jperelli/osm-static-maps/blob/master/Dockerfile) for a reference on how to install them.

## Demo

There is a heroku server that runs `osmsm server` on the latest version. It autodeploys on every git master branch push.

[![San Clemente demo](/public/images/2019-10-01-osm-static-maps/main.jpg)](http://osm-static-maps.herokuapp.com/?height=630&width=1200&arrows=true&vectorserverUrl=https://tiles.cualbondi.com.ar/styles/osm-bright/style.json&geojson={"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-56.69889450073242,-36.4139611380895],[-56.71606063842773,-36.34831486064301],[-56.73992156982421,-36.3111137664176],[-56.78764343261719,-36.28565743639243],[-56.780433654785156,-36.30668717537415],[-56.78266525268554,-36.319689571410905],[-56.730995178222656,-36.366148488398295],[-56.712112426757805,-36.41810535807877],[-56.69889450073242,-36.4139611380895]]]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-56.739234924316406,-36.38922936340127]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-56.76412582397461,-36.35813077373459]}},{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[-56.98402404785156,-36.37706783983681]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-57.02384948730469,-36.34306076488325],[-57.002906799316406,-36.359374956015856],[-56.95415496826171,-36.36462795081728],[-56.916046142578125,-36.33752975478557],[-56.92256927490234,-36.35965143826625],[-56.920509338378906,-36.36877480150696],[-56.93183898925781,-36.386741933771155],[-56.95037841796874,-36.4008363160513]]}}]})

## Repository and package

[Github Repo](https://github.com/jperelli/osm-static-maps)

Package in npm is [osm-static-maps](https://www.npmjs.com/package/osm-static-maps)
