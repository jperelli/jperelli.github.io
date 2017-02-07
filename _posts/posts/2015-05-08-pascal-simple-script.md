---
layout: post
title: Pascal simple script stream editor
comments: true
category: post
---

# Pascal simple script

Hoy estuve jugando un poco con el viejo amigo Pascal, y encontré [InstantFPC](http://wiki.freepascal.org/InstantFPC/), que se autodenomina: _una herramienta para correr programas como scripts_.

InstantFPC se instala junto a free-pascal-compiler, en distribuciones linux basadas en debian, se puede instalar con `sudo apt-get install fpc`

Me puse manos a la obra y en un ratito armé un script en Pascal para leer la entrada estándar (stdin), transformarla y enviarla a la salida estándar (stdout).

<script src="https://gist.github.com/jperelli/297ae7a994c97ab736cf.js"></script>

Después le di permiso de ejecución con `chmod +x mayusculizar` y lo probé de la siguiente manera:

    jperelli@jperelli-awesome:~ $ ls -l /var | ./mayusculizar
    TOTAL 3652
    DRWXR-XR-X   2 ROOT     ROOT        4096 MAY  5 08:14 BACKUPS
    DRWXR-XR-X  31 ROOT     ROOT        4096 FEB 12 22:27 CACHE
    DRWXRWSRWT   2 ROOT     WHOOPSIE    4096 FEB 24 00:14 CRASH
    DRWXR-XR-X   2 ROOT     ROOT        4096 DIC 12  2012 GAMES
    DRWXR-XR-X 114 ROOT     ROOT        4096 MAR 25 09:12 LIB
    DRWXRWSR-X   2 ROOT     STAFF       4096 OCT  9  2011 LOCAL
    LRWXRWXRWX   1 ROOT     ROOT           9 FEB  4  2014 LOCK -> /RUN/LOCK
    DRWXRWXR-X  32 ROOT     SYSLOG      4096 MAY  8 08:07 LOG
    DRWXRWSR-X   2 ROOT     MAIL        4096 JUN  7  2013 MAIL
    DRWXRWSRWT   2 ROOT     WHOOPSIE    4096 OCT 21  2012 METRICS
    -RW-R--R--   1 ROOT     ROOT     3685369 MAR 27  2012 NULL
    DRWXR-XR-X   2 ROOT     ROOT        4096 OCT 12  2011 OPT
    LRWXRWXRWX   1 ROOT     ROOT           4 FEB  4  2014 RUN -> /RUN
    DRWXR-XR-X  12 ROOT     ROOT        4096 ABR 21 12:35 SPOOL
    DRWXRWXRWT   5 ROOT     ROOT        4096 MAY  8 23:21 TMP
    DRWXR-XR-X   5 WWW-DATA WWW-DATA    4096 JUL  4  2014 WWW

Este programa bastante simple, se puede utilizar para transformar cualquier comando en mayúsculas. Es una aplicación trivial, pero sirve para ejemplificar la potencia de lo que se puede realizar utilizando InstantFPC.

## Discusión recurrente

Una vieja disputa en la [facultad](http://www.frlp.utn.edu.ar/) es sobre qué lenguaje se debería usar para enseñar a programar. Rápidamente la discusión deriva en que deberíamos estar utilizando lenguajes "mejores" o "más potentes" que Pascal, como C, Python, Java.

Tomando este ejemplo y otros como [HDCT](https://github.com/mxlian/hdct), donde se ven llamadas a interrupciones [directamente desde un .pas](https://github.com/mxlian/hdct/blob/master/CTFINAL.PAS#L340), se ve que Pascal tiene un tremendo potencial, que puede asemejarse bastante a C en con la gran diferencia de agregar el tipo String.

La idea no es decir que Pascal es el mejor lenguaje, sino simplemente que no es un lenguaje malo. Creo que la discusión pasa por qué cosas se enseñan y no por el lenguaje en sí. Podría utilizarse C o python, pero si se sigue enseñando de la misma manera, cambiar el lenguaje no va a ayudar.

Para la discusión si Pascal sirve o no hoy en día, no me quedan dudas que sirve. Que la industria de software no lo haya elegido para desarrollar, es otro tema.