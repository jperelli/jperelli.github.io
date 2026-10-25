---
layout: default
lang: es
i18n_key: case_claude_tracker
title: "De una hoja de compradores a un seguimiento en Claude que recuerda, y cuándo sacarlo de ahí"
description: "Un ejemplo inventado: una hoja de seguimiento de compradores rehecha como un artefacto de Claude con datos guardados, el prompt para copiar, qué sobrevive al cerrar la pestaña y qué no, y las razones por las que la gente acaba sacando estas herramientas de Claude."
image: /public/images/2026-10-15-claude-crm/cover.png
---

<link rel="stylesheet" href="/public/css/claude-crm-demo.css">

<article class="case" markdown="1">
<p class="case-kicker"><span class="case-badge case-badge-example">Ejemplo</span> Datos inventados · 2026</p>

<h1 class="case-title">De una hoja de compradores a un seguimiento en Claude que recuerda, y cuándo sacarlo de ahí</h1>

<p class="hero-lead">Esto no es un caso de cliente: es un ejemplo inventado, sobre una inmobiliaria que no existe, de una situación con la que me encuentro una y otra vez en eventos de empresa locales. Una pequeña empresa tiene una hoja de cálculo de clientes y un "pequeño CRM" que Claude le construyó en el chat, y mantiene los dos. El ejemplo muestra lo que la herramienta de Claude puede hacer hoy de verdad (guardar datos, con condiciones), da el prompt para llegar ahí en una tarde y marca el punto en que yo la sacaría de Claude, y por qué. Todo lo que hay aquí se puede hacer sin mí.</p>

El patrón es siempre el mismo. La hoja se queda porque es donde siempre ha estado la información; la herramienta de Claude se queda porque es más agradable de mirar. Cada pocos días el dueño pega la hoja en el chat y le pide a Claude que "actualice el CRM". Los correos que escribe Claude salen demasiado largos, así que se quedan en borradores y se reescriben a mano.

## La hoja de cálculo

Una pequeña inmobiliaria de dos personas, con unos treinta compradores activos en cualquier momento. La hoja tiene una fila por comprador y estas columnas. Los nombres son inventados.

<div class="crm-sheet">
<table>
<thead><tr><th class="corner"></th><th>Comprador</th><th>Busca</th><th>Presupuesto</th><th>Origen</th><th>Estado</th><th>Último contacto</th><th>Siguiente paso</th><th>Cuándo</th></tr></thead>
<tbody>
<tr><td class="corner">1</td><td>Marta R.</td><td>Piso de 3 habitaciones, centro</td><td>hasta 420k</td><td>Idealista</td><td><span class="crm-status crm-status-visit">Visita programada</span></td><td>12 oct</td><td>Visita Carrer Major 14</td><td>17 oct</td></tr>
<tr><td class="corner">2</td><td>Familia Puig</td><td>Casa con jardín, cerca de la playa</td><td>650k a 750k</td><td>Entró en la oficina</td><td><span class="crm-status crm-status-contacted">Contactado</span></td><td>9 oct</td><td>Enviar dos opciones</td><td>14 oct</td></tr>
<tr><td class="corner">3</td><td>Daniel K.</td><td>Piso cerca del tren, 2 habitaciones</td><td>300k</td><td>Recomendación</td><td><span class="crm-status crm-status-new">Nuevo</span></td><td>13 oct</td><td>Primera llamada</td><td>15 oct</td></tr>
<tr><td class="corner">4</td><td>Núria y Pau</td><td>Planta baja con terraza</td><td>350k</td><td>Formulario web</td><td><span class="crm-status crm-status-visit">Visitó</span></td><td>11 oct</td><td>Preguntar qué tal la visita</td><td>14 oct</td></tr>
<tr><td class="corner">5</td><td>Sr. Soler (inversor)</td><td>Dos o tres pisos pequeños para alquilar</td><td>200k cada uno</td><td>Cliente que vuelve</td><td><span class="crm-status crm-status-offer">Oferta hecha</span></td><td>10 oct</td><td>Esperar respuesta del propietario</td><td>16 oct</td></tr>
<tr><td class="corner">6</td><td>Laia M.</td><td>Estudio para una hija que estudia en Barcelona</td><td>180k</td><td>Instagram</td><td><span class="crm-status crm-status-lost">Perdido, compró en otro sitio</span></td><td>2 oct</td><td></td><td></td></tr>
</tbody>
</table>
</div>
<p class="crm-caption">Todo el negocio de hacer seguimiento a compradores cabe en nueve columnas. Las dos que más importan son las últimas: qué pasa ahora, y cuándo.</p>

La hoja no es el problema. El problema es la segunda copia. En cuanto las mismas treinta filas viven también dentro de una herramienta de Claude, cada llamada o visita hay que apuntarla dos veces, y el día que una de las dos no se actualiza nadie sabe cuál es la buena. "Pedirle a Claude que las sincronice" es un tercer trabajo encima de los dos.

## Lo que Claude guarda hoy de verdad

Las herramientas del panel lateral de Claude se llaman artefactos. Durante mucho tiempo un artefacto era una página que olvidaba todo en el momento en que se cerraba el chat: el código que escribía Claude se guardaba con la conversación, pero cualquier fila que se escribiera dentro vivía solo en la ventana abierta. Anthropic añadió almacenamiento persistente a los artefactos en octubre de 2025, y desde septiembre de 2026 los artefactos nuevos guardan datos sin ningún paso extra. Así que la herramienta puede recordar. Las condiciones están en las páginas de ayuda de la propia Anthropic, y importan:

<table class="crm-truth">
<thead><tr><th>Dónde está la información</th><th>Al cerrar la pestaña</th><th>Fuente y condiciones</th></tr></thead>
<tbody>
<tr><td>El artefacto en sí (el código, la página que escribió Claude)</td><td class="crm-yes">Se conserva</td><td>Se guarda con la conversación y en la pestaña Artefactos.</td></tr>
<tr><td>Filas escritas en un artefacto sin almacenamiento, o en un artefacto antiguo que nunca se publicó</td><td class="crm-no">Se pierden</td><td>El centro de ayuda es explícito: en los artefactos creados antes del 16 de septiembre de 2026 "el almacenamiento solo funciona después de publicar"; antes de eso, guardar "no tendrá éxito". La página sigue pareciendo que guardó.</td></tr>
<tr><td>Filas escritas en el almacenamiento del artefacto</td><td class="crm-yes">Se conservan</td><td>Planes Pro, Max, Team y Enterprise. Solo texto, sin fotos ni archivos. 20 MB por artefacto. Personal (cada persona ve sus propias filas) o compartido (todos ven las mismas filas).</td></tr>
<tr><td>Filas guardadas de un artefacto antiguo después de pulsar Despublicar</td><td class="crm-no">Se borran</td><td>"Despublicar también borra permanentemente cualquier dato de almacenamiento personal y compartido que usara el artefacto", y no se puede volver a publicar.</td></tr>
</tbody>
</table>

La demo de abajo es la diferencia en un clic. Las dos listas son el mismo seguimiento; una guarda sus filas solo mientras la ventana está abierta, la otra las escribe en el almacenamiento.

<div id="crm-demo" class="crm-demo" data-lang="es"><noscript>La demo interactiva necesita JavaScript.</noscript></div>

La columna izquierda es con lo que se topa la gente cuando la herramienta "olvida": el artefacto vuelve exactamente como lo escribió Claude, con las filas de muestra, y todo lo escrito desde entonces ha desaparecido. La columna derecha es lo que hace un seguimiento con datos guardados, y es lo que pide el prompt de abajo.

Fuentes de la tabla: las páginas del centro de ayuda de Anthropic [What are artifacts and how do I use them?](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them) y [Share artifacts](https://support.claude.com/en/articles/9547008-share-artifacts), leídas en octubre de 2026 (citas traducidas del inglés); la cronología de octubre de 2025 está comprobada en [Can Claude Artifacts Save Data?](https://caipi.ai/blog/can-claude-artifacts-save-data). Estas reglas ya han cambiado una vez; si lees esto meses después, vuelve a mirar las páginas de ayuda.

## Cómo construirlo en una tarde

Esta es la parte que da el valor. No hay código que escribir; el trabajo es decidir qué debe hacer la herramienta antes de pedirla.

<ol class="crm-path">
<li><strong>Primero, limpiar la hoja.</strong> Una fila por comprador. Una lista fija de estados: Nuevo, Contactado, Visita programada, Visitó, Oferta hecha, Ganado, Perdido. Dos columnas que nunca están vacías para un comprador activo: <em>Siguiente paso</em> y <em>Cuándo</em>. Borrar las columnas que nadie ha rellenado en un año. Exportarla como CSV (Archivo, Descargar, CSV en Google Sheets).</li>
<li><strong>Pedirle a Claude el seguimiento con el prompt de abajo.</strong> Pide datos guardados de forma explícita, una manera de importar el CSV una vez y exportarlo en cualquier momento, y borradores de correo cortos construidos a partir de la fila en vez de escritos de cero cada vez.</li>
<li><strong>Comprobar que recuerda antes de confiar en él.</strong> Añadir un comprador, cerrar la pestaña, volver a abrir el artefacto desde la pestaña Artefactos de la barra lateral. Si el comprador no está, pegar la nota del centro de ayuda en el chat ("storage operations won't succeed until you publish") y pedirle a Claude que lo arregle o publicar. No importar la lista real hasta que esta prueba pase.</li>
<li><strong>Importar la hoja una vez y dejar de actualizar la hoja.</strong> Una sola copia. El botón de exportar CSV es la copia de seguridad: pulsarlo el viernes por la tarde y guardar el archivo. Eso también protege de la trampa de Despublicar y de cualquier cambio futuro en cómo Claude guarda los datos.</li>
<li><strong>Usar los borradores de correo tal cual.</strong> La herramienta rellena un texto corto y fijo con el nombre del comprador, el inmueble y el siguiente paso. Seis líneas, siempre las mismas. La razón por la que los correos de Claude salían demasiado largos es que cada uno se escribía desde una página en blanco; una plantilla no tiene página en blanco.</li>
</ol>

<div class="crm-prompt">
<button type="button" class="crm-copy">Copiar el prompt</button>
<pre>Hazme una herramienta interactiva (un artefacto) para hacer seguimiento de posibles compradores de inmuebles. Sustituye a una hoja de cálculo, así que tiene que conservar sus datos: usa el almacenamiento persistente del artefacto, en modo personal, y nunca localStorage del navegador. Guarda después de cada cambio y carga todo cuando se abre.

Una fila por comprador con estos campos: nombre, teléfono, correo, busca (texto libre), presupuesto, origen (Idealista, Fotocasa, formulario web, entró en la oficina, recomendación, Instagram, cliente que vuelve, otro), estado (Nuevo, Contactado, Visita programada, Visitó, Oferta hecha, Ganado, Perdido), fecha del último contacto, siguiente paso (texto libre), fecha del siguiente paso, notas.

Pantallas:
1. "Hoy": compradores cuya fecha de siguiente paso es hoy o anterior, ordenados por fecha, el más antiguo primero. Es la pantalla que se abre por defecto.
2. "Todos los compradores": una tabla que pueda ordenar por estado y por fecha de siguiente paso, con un buscador y un botón para añadir un comprador. Al hacer clic en una fila se abre para editar cualquier campo. Al cambiar el estado, pregunta el nuevo siguiente paso y su fecha.
3. "Importar / exportar": un cuadro de texto donde pego el CSV de mi hoja de cálculo (primera línea = nombres de columna), con una vista previa antes de importar, y un botón "Exportar CSV" que descarga todos los compradores.

Borradores de correo: en cada comprador, un botón "Redactar correo" que rellena UNA de estas plantillas fijas con los campos del comprador y la muestra con un botón "Copiar". No generes texto nuevo con IA; solo rellena la plantilla. Máximo seis líneas cada una.
- Tras el primer contacto: dar las gracias, repetir en una línea qué busca y el presupuesto, decir que enviaré opciones antes del [fecha del siguiente paso].
- Antes de una visita: confirmar dirección, día y hora, y qué traer.
- Después de una visita: preguntar en una línea qué le pareció y si quiere una segunda visita.
- Oferta hecha: decir que la oferta se ha pasado al propietario y cuándo espero respuesta.

Que sea simple y legible en el móvil. Idioma de la interfaz: español. Usa los datos de muestra de abajo hasta que importe los míos.
Marta R., 600000000, marta@example.com, piso de 3 habitaciones en el centro, hasta 420000, Idealista, Visita programada, 2026-10-12, Visita Carrer Major 14, 2026-10-17
Familia Puig, 600000001, puig@example.com, casa con jardín cerca de la playa, 650000-750000, entró en la oficina, Contactado, 2026-10-09, Enviar dos opciones, 2026-10-14</pre>
</div>

Dos notas sobre el prompt. "Modo personal" significa que las filas solo las ve la cuenta que abre el seguimiento; si dos personas de la inmobiliaria necesitan la misma lista, hay que pedir modo compartido, sabiendo que entonces todos los que tienen acceso ven y editan las mismas filas. Y la parte de los correos apaga la IA a propósito: las plantillas fijas son el arreglo para los borradores que salen demasiado largos.

Para la inmobiliaria del ejemplo esto es una mejora real frente a la hoja más el chat: una sola copia de los datos, una lista "Hoy" que dice a quién llamar, correos en diez segundos. Cuesta el plan de Claude que ya pagan. Para muchas empresas pequeñas aquí es donde debería parar, y es un buen resultado.

## Cuándo lo sacaría de Claude

El seguimiento dentro de Claude es la herramienta de una persona que resulta ser compartible. El negocio se le quedará pequeño en un conjunto predecible de puntos, y la gente que ha construido herramientas reales sobre artefactos ha escrito sobre el momento de llegar a ellos (citas traducidas del inglés):

<ul class="crm-stories">
<li><p>Un usuario de Reddit en mayo de 2026: "Construyo muchas apps HTML en Claude y me encanta lo rápido que es, pero usarlas de verdad es frustrante. El almacenamiento de los artefactos se reinicia entre sesiones, así que los datos nunca persisten." La respuesta más votada: "Los artefactos son como vistas previas… no están pensados para uso real."</p><p><a href="https://www.reddit.com/comments/1t5mtge/">Is there an app launcher for artifacts?</a>, r/Anthropic</p></li>
<li><p>Una herramienta conectada a Slack y Trello, construida y probada durante una semana, perdió todos los registros guardados porque el equipo nunca pulsó Publicar; en los artefactos antiguos, guardar no hacía nada en silencio hasta entonces.</p><p>Contado en <a href="https://www.linkedin.com/posts/zebra-techies-solution_claudeartifacts-claudeai-anthropic-activity-7503391787538046976-UtCO">LinkedIn</a>, septiembre de 2026</p></li>
<li><p>Un desarrollador con plan personal encontró dos artefactos, uno con "meses de estado de planificación de lanzamiento en vivo", devolviendo "artifact not found" sin ninguna acción por su parte, sin ajuste de retención y sin camino de recuperación.</p><p><a href="https://github.com/anthropics/claude-code/issues/90395">anthropics/claude-code, issue #90395</a>, agosto de 2026</p></li>
<li><p>Un consultor que guarda presupuestos de clientes y hojas de precios como artefactos: al cabo de un par de semanas "un presupuesto de cliente estaba al lado de un guion de vídeo", los chats de los que salieron estaban cerrados, y a veces "simplemente le pedía a Claude que volviera a hacer la cosa". Acabó construyendo un catálogo fuera de Claude para encontrarlos.</p><p><a href="https://dev.to/amsyeung/i-kept-losing-my-claude-artifacts-so-i-made-a-mod-3bph">I kept losing my Claude artifacts, so I made a mod</a>, octubre de 2026</p></li>
<li><p>Dos proveedores de herramientas que compararon artefactos con aplicaciones alojadas coinciden en el muro estructural: un artefacto "no puede distinguir a dos personas", así que "cualquier cosa con nombres, roles, filas privadas o archivos choca con un muro que ningún prompt puede mover"; y el almacén "es una caja clave-valor, no una base de datos", sin dominio propio y sin manera de exportar el código e irse.</p><p><a href="https://homespun.dev/guides/claude-artifacts-alternative">Homespun</a> y <a href="https://www.totalum.app/blog/claude-artifacts-alternative-2026">Totalum</a>, 2026. Los dos venden la alternativa, así que hay que leerlos como partes interesadas; sus afirmaciones de hecho coinciden con las páginas de Anthropic.</p></li>
</ul>

Traducido a la inmobiliaria, estos son los momentos:

- **Una segunda persona tiene que trabajar en la lista** con su propio acceso, viendo los mismos compradores pero sin poder borrarlo todo por error. El almacenamiento compartido es todo o nada; no hay roles.
- **Un comprador que no usa Claude tiene que ver algo.** Desde septiembre de 2026 "todo el mundo necesita una cuenta de Claude" para abrir un artefacto compartido. Un enlace con una selección de inmuebles para un comprador no es posible desde dentro.
- **Fotos y documentos.** El almacenamiento es solo texto, 20 MB. Un inmueble tiene fotos, un comprador tiene una carta de preaprobación, una operación tiene una oferta firmada. Nada de eso cabe.
- **Tiene que hablar con el resto del negocio.** Consultas nuevas que llegan por correo o desde un portal, visitas que van al calendario, un mensaje que se envía cuando el propietario responde. Los artefactos pueden conectarse a algunas apps, pero cada persona conecta sus propias cuentas, y nada se ejecuta cuando nadie tiene la pestaña abierta.
- **Los datos tienen que sobrevivir a la herramienta.** Las filas viven bajo la URL de Claude, mientras Claude conserve el artefacto. El historial de compradores de una inmobiliaria es el negocio; debería estar en una base de datos que la inmobiliaria posea, con copias de seguridad que no haya tenido que acordarse de pulsar.
- **Los cambios se hacen volviendo a pedir.** Cada edición significa pedirle a Claude que reescriba la página, y la única guía sobre qué pasa con las filas existentes entre reescrituras es "exporta primero". Una herramienta de la que la gente depende necesita cambios que no puedan borrar los datos.

Ninguna de estas cosas es un fallo que Anthropic vaya a arreglar el mes que viene; se derivan de lo que es un artefacto, una página al lado de un chat. Son también exactamente la lista de cosas para las que la fase de artefacto fue útil: para cuando una inmobiliaria se topa con ellas, ya sabe qué columnas usa, qué estados son reales, qué debe mostrar la lista "Hoy" y qué cuatro correos envía. Eso es la especificación, y vale más que el código.

## Cómo es el paso de salida

El camino que sigo con empresas en esta situación es corto, porque el pensamiento ya está hecho:

<ol class="crm-path">
<li><strong>Exportar el CSV</strong> desde el artefacto mientras todavía funciona. No hace falta nada más de Claude.</li>
<li><strong>Construir el mismo seguimiento como una pequeña aplicación web</strong> con una base de datos de verdad (una tabla por cosa: compradores, inmuebles, visitas, ofertas), un acceso por persona, y la pantalla "Hoy" y los cuatro correos exactamente como los tenía el artefacto. La mayor parte del código se escribe con asistentes de IA, y por eso lleva días y no meses; las decisiones son la parte que toma una persona.</li>
<li><strong>Ponerlo en las cuentas de la propia empresa</strong>: su propia dirección, su propia base de datos con copias de seguridad automáticas, su propio envío de correo. La empresa puede prescindir de mí y quedarse con todo.</li>
<li><strong>Después, conectarlo</strong>: consultas de los portales y de la web directas a la lista, visitas al calendario, recordatorios de seguimiento que saltan tenga alguien la pestaña abierta o no.</li>
<li><strong>Añadir IA solo donde se gana el sitio</strong>: leer una consulta entrante y rellenar la fila, o sugerir a qué compradores parados llamar esta semana. El núcleo, a quién llamar y cuándo, se queda como reglas que cualquiera puede leer.</li>
</ol>

Esto lo hice de verdad con un vendedor de material médico que llevaba el stock en una hoja de cálculo; el resultado y lo que el fundador hizo con él después está en [De una hoja de cálculo a un sistema que dice cuándo pedir](/es/casos/stock-tracker/). El patrón es el mismo: la hoja demostró lo que el negocio necesitaba; el sistema lo convirtió en algo que el equipo no tiene que mantener a mano.

<section class="cta" id="contact">
<h2>Hablemos</h2>
<p>Si en tu empresa una hoja de cálculo y una herramienta de Claude describen a los mismos clientes, lo miro con gusto. La primera conversación (30 minutos) es gratis y sin compromiso; dos líneas sobre a qué se dedica la empresa son suficientes.</p>
<p class="hero-actions">
{% include email.html class="btn btn-primary" text="Escríbeme un correo" subject="Hoja%20de%20c%C3%A1lculo%20y%20herramienta%20de%20Claude" %}
<a class="btn btn-ghost" href="/es/">Volver al inicio</a>
</p>
</section>

</article>

<script src="/public/js/claude-crm-demo/demo.js" defer></script>
