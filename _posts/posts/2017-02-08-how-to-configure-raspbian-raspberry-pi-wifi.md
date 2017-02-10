---
layout: page
title: How to configure wifi on the Raspberry Pi 
comments: true 
category: post
---

I'm making this simple tutorial because I have a Raspberry Pi 3 with integrated wifi, but I do not have an UTP cable. The idea is being able to connect to the Raspberry and using it without ever having to connect a network cable. Here are the steps:

1 - Insert an sd card into the PC > 1.6Gb

    wget https://downloads.raspberrypi.org/raspbian_lite_latest
    unzip it
    sudo dd bs=4M if=*****.img of=/dev/mmcblk0


2 - Gparted resize partition

    sudo gparted


3 - Configure Wifi to autoconnect

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

4 - Configure ssh to work

  sudo touch /media/jperelli/boot/ssh

5 - Unmount the sd

6 - Put the sd in your raspberrypi, and plug in the raspberrypi

7 - Connect via ssh from PC

  - 7a - Look for a new ip address in router's lan dhcp status

  - 7b - ssh pi@192.168.0.15 (pass: raspberry)
