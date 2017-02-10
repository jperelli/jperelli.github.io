---
layout: post
title: SQL y mail injection
comments: true
category: post
---

## SQL Injection

### Intro

Variables vulnerables / sql injection
En PHP, al obtener el valor de una variable pasada por parámetro (POST o GET), esa variable puede contener cualquier valor. En el caso de que esa variable sea embebida directamente en una consulta SQL, se está ingresando directamente el contenido de la variable en la consulta.

Ejemplo de código PHP extremadamente vulnerable:

    mysql_query(“SELECT nombre FROM hospital WHERE zona=”.$_POST[‘var’]);

Otro ejemplo:

    $str = $_GET[‘var’]
    mysql_query(“SELECT nombre FROM hospital WHERE zona=’”.$str.”’”);

Cuando un usuario ingresa al formulario algo como Region I, la consulta SQL generada y enviada al servidor mysql desde PHP es: `SELECT nombre FROM hospital WHERE zona=’Region I’`.

Pero cuando un usuario ingresa al formulario algo como `’ or 1=1 -- -`, la consulta SQL generada y enviada al servidor mysql desde PHP es: `SELECT nombre FROM hospital WHERE zona=’’ or 1=1 -- -’`.
El `-- -` hace que el resto de la consulta sea ignorada por el servidor (comentario SQL), y el `or 1=1` hace que el where retorne verdadero para todas las tuplas de la tabla. Con esta consulta, se obtienen todas las tuplas de la tabla hospital.

Complicando más las consultas pueden encontrarse datos de todas las tablas visibles por el usuario mysql, insertarse datos en caso de que haya permisos, y efectuarse el resto de operaciones explicadas anteriormente.

### Permisos del usuario web excedidos

Si el usuario con el cual la web se conecta a la base de datos tiene permisos excedidos (CREATE, ALTER, DUMP), en caso de haber una vulnerabilidad, los daños pueden ser irreversibles.
Siempre se debe crear un usuario con la menor cantidad posible de permisos.

### Solución general

#### Filtrar parámetros

Siempre que se reciban parámetros via POST, GET o COOKIE, deben ser filtrados para no realizar la consulta SQL en caso de que se detecte que contienen una inyección SQL.
Hay varios métodos para realizar esta tarea manualmente (blacklist, whitelist, heurística, etc).
El filtrado es, en sí, aplicar al parámetro una función que devuelva si el parámetro es una posible inyección o no, o que limpie el parámetro de cualquier posible carácter que haga que el valor sea una inyección.
Luego de ese preproceso, se puede realizar la consulta SQL.
Posibles soluciones específicas:
La recomendación es utilizar funciones ya existentes para no reinventar la rueda (además, estas funciones están ya testeadas por desarrolladores expertos en seguridad).

Para parámetros que son números enteros, la idea es utilizar casteo para verificar que el string recibido sea un número. Luego de verificar eso, el número se pasa a SQL sin comillas.

    $num = (int)$_POST[‘entero’];
    mysql_query(“SELECT nombre FROM hospital WHERE id=”.$num);

Para parámetros que son cadenas de caracteres, se utiliza una función que limpia los strings para que no inyecten SQL.

    $zona = mysql_real_escape($_GET[‘zona’]);
    mysql_query(“SELECT nombre FROM hospital WHERE zona=’”.$zona.”’”);

## PHP mail() Injection

### Problema

Un usuario malicioso puede enviar e-mails a personas indeseadas a través del servidor de mail bajo el nombre de la organización.
El mayor problema es que se deja la puerta abierta a que un usuario envíe mails de spam utilizando el servidor ajeno.
El envío de spam tiene muchas desventajas, entre ellas algunas técnicas:
Los ISP pueden bloquear a la entidad para enviar e-mails regulares.
Puede aumentar drásticamente el trafico en la red.
Se puede generar un volumen de datos que sature la memoria de un servidor.
(Todo ésto sin contar las desventajas de imagen de una organización que envíe e-mails maliciosos (spam, scam) en cuanto al desprestigio generado).

Básicamente, el atacante puede tomar el control del envío de mails a discreción, lo cual presenta graves problemas.
Explicación técnica:
Siendo que la función de envío de mail utilizada tiene el siguiente formato:

    mail($recipiente, $asunto, $mensaje, $cabeceras_extra)

La vulnerabilidad se encuentra en $recipiente, $asunto y $cabeceras_extra. Si alguna de esas variables es completada directamente por un usuario y pasada a la función mail sin chequeos, un usuario malicioso puede introducir cabeceras indeseadas en el mail.

Dado que la función mail() traduce esos parámetros a un mail con el siguiente formato:

    To: $recipiente
    Subject: $asunto
    $cabeceras_extra
    $mensaje
    .
 
Si los valores de las variables son:

    $recipiente = “mail@server.com”;
    $asunto = “hola!”;
    $cabeceras_extra = “From: desde@otroserver.com”;
    $mensaje = “saludos!”

A través de la función mail() se genera el siguiente e-mail:

    To: mail@server.com
    Subject: hola!
    From: desde@otroserver.com
    saludos!
    .

El cual está bien formado y es lo esperado.

Pero considerando que las variables son obtenidas a través de la entrada de un usuario, los valores podrían ser:

    $recipiente = “mail@server.com”;
    $asunto = “hola!”;
    $cabeceras_extra = “From: desde@otroserver.com\nBcc: otradireccion@server2.com”;
    $mensaje = “visite www.sitiospammer.com”

Siendo \n el carácter de nueva línea o retorno de carro, a través de la función mail() se genera el siguiente e-mail:

    To: mail@server.com
    Subject: hola!
    From: From: desde@otroserver.com
    Bcc: otradireccion@server2.com
    visite www.sitiospammer.com!
    .

El cual se envía con copia a otradireccion@server2.com (destino no deseado). De la misma forma, podría agregarse una lista de direcciones Cc: o Bcc: (con copia o con copia oculta) para enviar copias a diferentes listas de e-mails en un solo ataque.

Realizando otro tipo de inyecciones mail() mas complejas, se puede también enviar archivos adjuntos, texto en formato html, suplantar identidad de otras personas fingiendo enviar mails desde autoridades de la organización, e incluso ejecutar programas en las pc que reciben los mensajes, para abrir algún puerto y robar información o tomar el control de algún servidor de la organización.
Solución recomendada:
Utilizar esta función para validar la entrada del usuario. 

    function isemail($input) {
      return strlen($input) < 256 && preg_match("/^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/", $input);
    }

Si la función devuelve true, es porque lo ingresado es un solo email.
Si la función devuelve false, el usuario no está ingresando un email válido, y lo ingresado es sospechoso como ataque.

La recomendación es la siguiente:
Asignar un valor fijo a $recipiente y a $asunto

> $recipiente = “autoridad@ms.gba.gob.ar”;
> $asunto = “Consulta web”

Utilizar $mensaje creado por el usuario
Utilizar la funcion isemail sobre el email del usuario que llena la consulta. Si da verdadero, se puede continuar asignando:

> $cabeceras_extra = "From: $email\n"

Código de ejemplo:

    if (isemail($_POST['email'])) {
      $cabeceras_extra = 'From: '.$_POST['email']."\n";
      $recipiente = 'webmaster@ms.gba.gov.ar';
      $asunto = 'Consulta web';
      $mensaje = $_POST['mensaje'];
      mail($recipiente, $asunto, $mensaje, $cabeceras_extra)
    }
    else
    	echo "error en el campo email";
