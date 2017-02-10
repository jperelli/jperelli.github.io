---
layout: post
title: mod_security
comments: true
category: post
---

## Introducción: ¿qué es mod_security?

modSecurity es un firewall de aplicaciones Web que se ejecuta como módulo del servidor web Apache, provee protección contra diversos ataques hacia aplicaciones Web y permite monitorear tráfico HTTP, así como realizar análisis en tiempo real sin necesidad de hacer cambios a la infraestructura existente.

El módulo de apache es una parte de mod_security. La otra parte es el conjunto de reglas para las cuales el módulo actúa: filtra, deniega, modifica requests realizadas al Server apache.

Uno de los aspectos más importantes es que mod_security actúa antes de que un ataque llegue a la aplicación, por lo cual, si una aplicación es vulnerable a cierto ataque, la seguridad nunca se verá comprometida. Esto es interesante desde el punto de vista de que un desarrollador puede crear una aplicación insegura, cuya mala programación comprometa a todo el sistema, pero mod_security puede bloquear cualquier intento de ataque que surja desde o hacia esa aplicación, que produciría un vector de ataque muy fuerte.

Para el funcionamiento de ésta herramienta, se requieren 2 partes:

### Módulo de apache
Es quien ejecuta la lógica de interrelacionar las posibilidades de ataques y obtener un diagnóstico para cada uno de los requests que recibe el servidor web.

En caso de que considere mediante diversos mecanismos que el request es un ataque, puede realizar 2 acciones:
Bloquear el ataque y devolver un estado HTTP 403 al cliente.
Modificar el request para que no comprometa posibles vulnerabilidades.

A partir de la versión 2, mod_security incorpora una nueva técnica que puede ser usada para el bloqueo de requests, mediante la cual disminuye la cantidad de falsos positivos, se agrega un método heurístico y de correlación de reglas y de requests pertenecientes a una misma sesión.

### Reglas
Para que mod_security funcione correctamente, se debe proveer un set de Reglas. Las mismas son las que identifican a diferentes requests o responses ante los cuales mod_security debe reaccionar.

Hay reglas disponibles desde diferentes fuentes. La mas importante de ellas es OWASP (The Open Web Application Security Proyect). Provee protección para:

 - HTTP Protección – detector violaciones del protocolo HTTP y definir una política de uso HTTP local.
 - Real-time Blacklist Lookups – utiliza Reputación de ip de terceros.
 - Web-based Malware Detection - identifica contenido web malicioso chequeando contra Google Safe Browsing API.
 - HTTP Denial of Service Protections – defensa ante HTTP Flooding y Slow HTTP DoS.
 - Protección de ataques web comunes (SQL injection, XSS, CSRF.
 - Detección de herramientas automatizadas - bots, crawlers, scanners, etc.
 - Integración con escaneo antivirus de archivos subidos.
 - Trojan Protection - Detecting access to Trojans horses.
 - Oculta y disfraza mensajes de error enviados por el servidor.

A partir de la versión 2, las reglas añaden soporte para Anomaly Scoring Mode, con lo cual ninguna regla es bloqueante, sino que suma un puntaje que al finalizar se evalúa: si supera cierto límite, la acción puede ser bloquear.

Esto da como resultado un manejo mejor, casi heurístico de detección de ataques. Elimina mayor cantidad de falsos positivos, y hace que el sistema funcione mejor en su totalidad.

En caso de que alguna regla interrumpa el funcionamiento normal de un sistema, siempre puede deshabilitarse la regla, aunque se recomienda reparar la aplicación, ya que es altamente probable que contenga una vulnerabilidad.

## Instalación

Los clientes y posibles atacantes deben pasar a través de mod_security para llegar a los servidores de aplicaciones.

### Proxy reverso apache
El Proxy es un servidor Debian GNU/Linux 6.0. El mismo tiene en sus repositorios un paquete precompilado de mod_security cuyas versiones pueden verse aquí http://qa.debian.org/developer.php?login=agi@inittab.org

    apt-get install libapache-mod-security

descargar reglas de owasp

    wget

instalar reglas

    cp /reglas/* /etc/apache2/
    ln –s /reglas/ /reglas-enabled/

configurar apache

    a2enmod security #ya lo hace apt-conf
    vi/nano crs_10
    apache2ctl graceful

### Información adicional

Comando para ver los ataques bloqueados

    tail -f /var/log/apache2/*/mod_security_audit.log | grep --color -e "Exceeded\|correlation\|blocking\|HTTP/\|Z--"