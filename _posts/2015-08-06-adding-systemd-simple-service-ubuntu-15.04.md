---
layout: post
title: Adding systemd simple service in ubuntu 15.04
comments: true
---

I was trying to add a simple service to run just one time at boot, it was a little difficult and I couldn't find the information easily, so I'll share the commands here


Create file *`/etc/systemd/system/startallvagrant.service`* with this contents
<pre>
[Unit]
Description=Start all vagrant machines

[Service]
Type=oneshot
ExecStart=/vagrant_vm/start-all-2015.sh

[Install]
WantedBy=multi-user.target
</pre>

Create symlink from *multi-user.target.wants*:

    ln -s /etc/systemd/system/startallvagrant.service /etc/systemd/system/multi-user.target.wants/startallvagrant.service

Enable/activate the service in systemd

    systemctl enable startallvagrant.service

Check if configuration is working

<pre>
root@breadboard:~# systemctl list-unit-files

UNIT FILE                              STATE   
proc-sys-fs-binfmt_misc.automount      static  
dev-hugepages.mount                    static  
dev-mqueue.mount                       static  
proc-sys-fs-binfmt_misc.mount          static  
sys-fs-fuse-connections.mount          static  
sys-kernel-config.mount                static  
sys-kernel-debug.mount                 static  
tmp.mount                              disabled
systemd-ask-password-console.path      static  
systemd-ask-password-plymouth.path     static  
systemd-ask-password-wall.path         static  
session-1.scope                        static  
session-2.scope                        static  
accounts-daemon.service                enabled 
acpid.service                          disabled
atd.service                            enabled 
autovt@.service                        disabled
bootlogd.service                       masked  
bootlogs.service                       masked  
bootmisc.service                       masked  
checkfs.service                        masked  
checkroot-bootclean.service            masked  
checkroot.service                      masked  
console-getty.service                  disabled
console-setup.service                  static  
console-shell.service                  disabled
container-getty@.service               static  
cron.service                           enabled 
cryptdisks-early.service               masked  
cryptdisks.service                     masked  
dbus-org.freedesktop.hostname1.service static  
dbus-org.freedesktop.locale1.service   static  
dbus-org.freedesktop.login1.service    static  
dbus-org.freedesktop.machine1.service  static  
dbus-org.freedesktop.network1.service  disabled
dbus-org.freedesktop.resolve1.service  disabled
dbus-org.freedesktop.timedate1.service static  
dbus.service                           static  
debian-fixup.service                   static  
...skipping...
startallvagrant.service                enabled
stop-bootlogd-single.service           masked  
stop-bootlogd.service                  masked  
sudo.service                           disabled
syslog.service                         enabled 
systemd-ask-password-console.service   static  
systemd-ask-password-plymouth.service  static  
</pre>

Check if the service worked / started ok

<pre>
root@breadboard:~# systemctl status startallvagrant.service 

● startallvagrant.service - Start all vagrant machines
   Loaded: loaded (/etc/systemd/system/startallvagrant.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Thu 2015-08-06 18:30:11 CEST; 6min ago
  Process: 854 ExecStart=/vagrant-vm/start-all-2015.sh (code=exited, status=203/EXEC)
 Main PID: 854 (code=exited, status=203/EXEC)

Aug 06 18:30:11 breadboard systemd[1]: Starting Start all vagrant machines...
Aug 06 18:30:11 breadboard systemd[1]: startallvagrant.service: main process exited, code=exited, status=203/EXEC
Aug 06 18:30:11 breadboard systemd[1]: Failed to start Start all vagrant machines.
Aug 06 18:30:11 breadboard systemd[1]: Unit startallvagrant.service entered failed state.
Aug 06 18:30:11 breadboard systemd[1]: startallvagrant.service failed.
root@breadboard:~# journalctl _PID=854
-- Logs begin at Thu 2015-08-06 18:30:08 CEST, end at Thu 2015-08-06 18:33:40 CEST. --
Aug 06 18:30:11 breadboard systemd[854]: Failed at step EXEC spawning /vagrant-vm/start-all-2015.sh: No such file or directory
</pre>

See if something else has failed

<pre>
root@breadboard:~# systemctl --failed --all

  UNIT                    LOAD   ACTIVE SUB    DESCRIPTION
● startallvagrant.service loaded failed failed Start all vagrant machines

LOAD   = Reflects whether the unit definition was properly loaded.
ACTIVE = The high-level unit activation state, i.e. generalization of SUB.
SUB    = The low-level unit activation state, values depend on unit type.

1 loaded units listed.
To show all installed unit files use 'systemctl list-unit-files'.
</pre>