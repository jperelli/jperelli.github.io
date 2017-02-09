---
layout: page
title: How to configure raspberry pi wifi
comments: true 
category: post
---

I'm making this simple tutorial because I have Raspberry pi 3 with wifi integrated, but I do not have an UTP cable. The idea is to be able to connect to the raspberry and use it without ever having to connect a network cable. Here are the steps:

1 - Insert sd card into PC > 1.6Gb

    wget https://downloads.raspberrypi.org/raspbian_lite_latest
    unzip it
    sudo dd bs=4M if=*****.img of=/dev/mmcblk0


2 - gparted resize partition

    sudo gparted


3 - configure wifi to autoconnect

  mount the ssd and:

```
  sudo nano /media/jperelli/0aed834e-8c8f-412d-a276-a265dc676112/etc/network/interfaces

      auto wlan0
      allow-hotplug wlan0
      iface wlan0 inet dhcp  
        wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

  sudo nano /media/jperelli/0aed834e-8c8f-412d-a276-a265dc676112/etc/wpa_supplicant/wpa_supplicant.conf

      network={
        ssid="[put here your ssid]"
        psk="[put here your wifi password in plain text]"
        proto=RSN
        key_mgmt=WPA-PSK
        pairwise=CCMP
        auth_alg=OPEN
      }
```

4 - configure ssh to work

  sudo touch /media/jperelli/boot/ssh

5 - unmount sd

6 - put sd in your raspberrypi, and plug in the raspberrypi

7 - connect via ssh from pc

  - 7a - look for a new ip address in router's lan dhcp status

  - 7b - ssh pi@192.168.0.15 (pass: raspberry)
