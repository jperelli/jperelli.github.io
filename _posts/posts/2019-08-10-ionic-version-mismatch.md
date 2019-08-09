---
layout: page
title: ionic version mismatch
comments: true
category: post
---

I'm having troubles with installing a newer ionic version using npm
```
jperelli@coffee~ $ ionic -v
3.20.0
```

and if I install a newer version I keep getting the old one
```
jperelli@coffee~ $ which ionic
/usr/bin/ionic
```

It seems like npm installed an old version in `/usr/bin/ionic` and the new version is being installed in `/usr/local/bin/ionic`

If I try to see which packages are installed globally, I see no ionic
```
jperelli@coffee~ $ npm -g ls --depth=0
/usr/local/lib
└── npm@6.4.1
```

The problem is that I have two different node_modules in the global path
```
jperelli@coffee~ $ ls /usr/local/lib/node_modules/
npm
jperelli@coffee~ $ ls /usr/lib/node_modules/
async             gulp-cli     leaflet-editablecirclemarker  rimraf
cherry-pick-tool  http-server  n                             @vue
commander         ionic        node-gyp                      vue2-leaflet-editablecirclemarker
git-stats         jj           npm                           winston
graphql-cli       jq           prisma                        yarn
```

This is controlled by npm `prefix`, it seems I changed it some time ago
```
jperelli@coffee~ $ npm prefix -g
/usr/local
```

And can be set to the other path so that npm uses it, then I can control what's installed there
```
jperelli@coffee~ $ sudo npm config set prefix /usr
```

now I can see all things installed there and can uninstall those old packages accordingly
```
jperelli@coffee~ $ npm -g ls --depth=0
/usr/lib
├── @vue/cli@3.0.1
├── async@2.6.1
├── cherry-pick-tool@1.0.6
├── commander@2.16.0
├── git-stats@2.10.9
├── graphql-cli@2.16.2
├── gulp-cli@1.4.0
├── http-server@0.11.1
├── ionic@3.20.0
├── jj@0.0.1-security
├── jq@1.7.2
├── UNMET PEER DEPENDENCY leaflet@^1.3.1
├── leaflet-editablecirclemarker@1.0.4 -> /home/jperelli/leaflet-editableCircleMarker
├── n@2.1.12
├── node-gyp@3.7.0
├──  error: ENOENT: no such file or directory, open '/usr/lib/node_modules/npm/package.json
├── prisma@1.9.0
├── rimraf@2.6.2
├── vue2-leaflet-editablecirclemarker@1.0.5 -> /home/jperelli/vue2-leaflet-editablecirclemarker
├── winston@3.0.0
└── yarn@1.3.2
```
