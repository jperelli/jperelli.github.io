---
layout: default
lang: es
i18n_key: case_stock_tracker
title: "De una hoja de cálculo a un sistema que dice cuándo pedir"
description: "Un caso real: una pequeña empresa que vende material médico por internet llevaba el stock en una hoja de cálculo. En dos semanas le entregamos un sistema que junta los datos de su contabilidad y de Amazon y dice qué pedir y cuándo, con inteligencia artificial donde ayuda."
image: /public/images/2026-10-09-stock-tracker/after-dashboard.png
---

<article class="case" markdown="1">
<p class="case-kicker">Un caso real · 2026 · con <a href="https://exentric.tech/">eXentric</a></p>

<h1 class="case-title">De una hoja de cálculo a un sistema que dice cuándo pedir</h1>

<p class="hero-lead">Una pequeña empresa que vende material médico por internet llevaba el stock en una hoja de cálculo que el fundador había montado él mismo. En dos semanas le entregamos un sistema que junta los datos de su contabilidad y de Amazon, muestra todos los productos en una pantalla y dice qué pedir y cuándo, con inteligencia artificial revisando cada producto cada día. Hoy el fundador lo mejora por su cuenta. La empresa no aparece con su nombre a petición suya; las capturas son reales, con los nombres de producto y los números tapados.</p>

<div class="case-facts">
  <div><span class="case-fact-num">2 días</span><span>hasta un prototipo funcionando con sus datos reales</span></div>
  <div><span class="case-fact-num">2 semanas</span><span>desde el primer mensaje hasta el sistema funcionando en sus propias cuentas</span></div>
  <div><span class="case-fact-num">3 fuentes</span><span>contabilidad, almacén de Amazon y ventas de Amazon, juntas en un sitio</span></div>
</div>

## El punto de partida

La empresa compra material médico a fabricantes de China y lo vende por internet en Australia y el Reino Unido, sobre todo por Amazon. El stock está en tres sitios: su propio almacén, los almacenes de Amazon y los contenedores que ya vienen de camino. Un pedido a la fábrica tarda semanas o meses en llegar, y las fábricas paran en las fiestas chinas. Si se pide tarde, el producto se acaba; si se pide pronto, el dinero se queda en cajas.

Para controlarlo, el fundador había montado una hoja de cálculo de Google con pequeños programas que sacaban los números del programa de contabilidad y de Amazon. Era una buena hoja de cálculo. También tenía los problemas que tienen todas las hojas de cálculo de este tipo:

- Las conexiones se rompían cada cierto tiempo y alguien tenía que volver a entrar y arreglarlas.
- El mismo producto tenía un código distinto en la contabilidad y en Amazon, así que las cifras no cuadraban.
- La columna de "semanas de stock que quedan" era una fórmula fija que no sabía nada de plazos de entrega ni de fiestas.
- Solo la entendía quien la había hecho, y el equipo tenía que hacer recuentos físicos para corregirla.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/before-spreadsheet.png" alt="La hoja de cálculo original: una pestaña de resumen con una fila por producto y columnas de stock en almacén, stock en Amazon, stock pedido y semanas de stock que quedan. Los nombres de producto están tapados." loading="lazy">
  <figcaption>Antes: la hoja de cálculo. Una fila por producto, columnas calculadas a mano, y una columna entera de "sin ventas en los últimos 30 días" donde la conexión había dejado de funcionar.</figcaption>
</figure>

## Qué hicimos

El fundador conoció a mis socios de <a href="https://exentric.tech/">eXentric</a> en un encuentro de emprendedores y preguntó si esto se podía hacer mejor. Propusimos algo sencillo: dos días de trabajo para enseñar qué se podía hacer con los datos reales. Si servía, entregábamos el código y hablábamos de los siguientes pasos.

**Día uno.** Nos conectamos al programa de contabilidad y a Amazon, la parte difícil, y al final del día había una primera versión de la pantalla con sus números reales. Mandamos un vídeo corto al equipo en Australia.

**Día dos.** Su responsable de operaciones nos explicó, en unos vídeos grabados, cómo decide de verdad qué pedir: plazos de entrega por fabricante, cantidades mínimas de pedido, las fiestas chinas, kits que se montan con otros productos. Los vimos varias veces y los convertimos en las reglas del sistema.

**Las dos semanas siguientes.** La empresa nos pidió dejarlo funcionando de verdad y no en un portátil: un usuario y contraseña, una base de datos, la actualización diaria sola, todo en cuentas que son suyas. En la última llamada el fundador conectó sus cuentas él mismo y el primer día de datos entró mientras mirábamos.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-dashboard.png" alt="El nuevo panel: una fila por producto con stock por sitio, stock pedido, ventas de los últimos 30 y 90 días con un pequeño gráfico, meses de stock que quedan y una señal de pedido que dice OK o Pedir ahora. Los nombres de producto están tapados." loading="lazy">
  <figcaption>Después: todos los productos en una pantalla. Stock en cada sitio, ventas con un gráfico pequeño, meses de cobertura que quedan y una señal clara, OK, pedir pronto o pedir ahora, revisada cada día por la inteligencia artificial.</figcaption>
</figure>

## Qué hace el sistema

- **Junta las tres fuentes cada día, solo.** Se acabó volver a entrar para arreglar una conexión.
- **Sabe que dos códigos son el mismo producto.** Una lista corta de equivalencias, que mantiene el equipo, y las cifras cuadran.
- **Dice cuándo pedir, producto por producto.** Toma las ventas de las últimas semanas, el stock en los tres sitios, el plazo de entrega de cada fabricante y los meses de cobertura que la empresa quiere tener, y lo convierte en un semáforo: OK, pronto, ahora. Y una cantidad. Cada día la inteligencia artificial revisa esa señal con toda la historia del producto y añade al lado su propia recomendación y un stock mínimo.
- **Muestra la historia de cada producto.** El stock bajando, las ventas subiendo, los pedidos llegando, en un gráfico.

<figure>
  <img src="/public/images/2026-10-09-stock-tracker/after-product.png" alt="La página de un producto: un gráfico del stock total durante seis meses con las ventas diarias en barras, una tabla de stock por día y una tabla de ventas recientes. El nombre del producto y los números de pedido están tapados." loading="lazy">
  <figcaption>Un producto, seis meses. La línea morada es el stock; las barras son las ventas de cada día. Las barras grandes son pedidos al por mayor, que la hoja de cálculo antigua mezclaba con las ventas de Amazon.</figcaption>
</figure>

## Dónde está la inteligencia artificial, y dónde no

Esta es la parte que más me importa explicar, porque es donde suele estar el humo.

**No sustituye a las reglas principales.** Cuándo pedir empieza siendo aritmética: ventas, stock, plazo de entrega, meses de cobertura. La aritmética no necesita inteligencia artificial; necesita estar escrita una vez, bien, donde todos la vean.

**Está en dos sitios donde ayuda.** Primero, en cómo se construyó el sistema: la mayor parte del código la escribieron asistentes de inteligencia artificial, con mis socios y conmigo decidiendo qué construir y revisando el resultado. Por eso bastaron dos días. Segundo, encima de las reglas: cada día el sistema le pide a un modelo de lenguaje que mire cada producto, con su historia y las reglas, y escriba una recomendación corta y un stock mínimo, más un resumen de todo el catálogo. Ese mínimo alimenta la señal de pedido cuando un producto no tiene ventas recientes, y el resto es una segunda opinión, con palabras normales, al lado del número.

**Y la empresa puede bajarle el volumen.** Un mes después el fundador nos contó que las recomendaciones de la IA eran más de lo que necesitaban por ahora y las había simplificado. A mí me parece bien. El sistema es suyo y las reglas sencillas hacen la mayor parte del trabajo. Prefiero decirlo a hacer como que no.

## Qué pasó después

El fundador, que no es programador, cogió el código y siguió con un asistente de inteligencia artificial: cargó tres meses más de historia, arregló un fallo de tiempo de espera, cambió lo que no le gustaba. Un mes después de la entrega:

<blockquote class="case-quote">
  <p>«Me lo estoy pasando bien trasteando con el sistema de stock, he hecho bastantes cambios. Será más útil cuanta más información acumule con el tiempo. En general la organización y todo es mucho mejor para el equipo.»</p>
  <footer>El fundador, un mes después de la entrega (traducido del inglés)</footer>
</blockquote>

<blockquote class="case-quote">
  <p>«Parece que puede cambiarlo todo.»</p>
  <footer>El responsable de operaciones, al ver la demo del primer día (traducido del inglés)</footer>
</blockquote>

Ese es el resultado que busco: no un sistema que dependa de mí, sino uno que la empresa maneja y cambia por su cuenta.

<details class="case-tech">
  <summary>Para quien quiera los detalles técnicos</summary>
  <p>Aplicación Django; sincronización nocturna desde la API de Xero (stock, órdenes de compra, facturas) y la Selling Partner API de Amazon (stock FBA, envíos entrantes, pedidos); instantáneas de stock unificadas por lote de importación, historial de ventas completo guardado como cabeceras y líneas de pedido con ventanas móviles calculadas al consultar; alias de SKU para la identidad entre fuentes; señal de pedido a partir de las semanas de cobertura frente al plazo de entrega más la cobertura objetivo; recomendaciones por SKU y globales a través de LiteLLM para poder cambiar de proveedor de modelo; desplegado en Vercel con una base de datos Postgres en Neon y un endpoint de cron, todo en las cuentas del cliente.</p>
</details>

<section class="cta" id="contact">
  <h2>Hablemos</h2>
  <p>La mayoría de las empresas tienen una hoja de cálculo como esta. Dos líneas sobre a qué se dedica la empresa son suficientes; la primera conversación (30 minutos) es gratis y sin compromiso.</p>
  <p class="hero-actions">
    <a class="btn btn-primary" href="mailto:jperelli@gmail.com?subject=Inteligencia%20artificial%20en%20mi%20empresa">Escríbeme un correo</a>
    <a class="btn btn-ghost" href="/es/">Volver al inicio</a>
  </p>
</section>
</article>
