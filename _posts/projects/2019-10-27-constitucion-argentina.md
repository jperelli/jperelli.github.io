---
layout: page
title: Constitucion Argentina en git
description: The Argentine Constitution tracked in git, so every reform can be diffed and analyzed objectively.
comments: true
category: project
image: /public/images/2019-10-27-constitucion-argentina/main.jpg
---

Estaba mirando los proyectos trending de github como hago cuando estoy aburrido y encontre [este](https://github.com/JesseKPhillips/USA-Constitution), me pareció un proyecto interesante para **ver que impactos tuvo cada reforma que se hizo en la constitución, y analizar OBJETIVAMENTE distintos tipos de gobierno qué cambios realizaron en las normas fundamentales de la sociedad en un país**, mas allá de cualquier otra norma, los cambios en la constitución deberían reflejar fuertemente las intenciones de los gobernantes.

Pensé hacer lo mismo para la constitución argentina, y me puse manos a la obra.

Antes de seguir leyendo, podes ver el [repositorio con el resultado aca](https://github.com/jperelli/Constitucion_Argentina)

## Problemas

### 0. Dónde está la constitución

Primero que nada no sabía de dónde sacar la constitución históricamente con todas sus reformas. Al buscar las primeras, me encontraba con escritos que tenían el valor de 'constitución' pero no lo eran. Así que llegué a [esta categoría de wikisource](https://es.wikisource.org/wiki/Categor%C3%ADa:Constituciones_nacionales_de_Argentina), y en base a eso mas otra investigación de fuentes online, pude ir haciéndome una idea de cómo se fue generando el texto de la constitución y qué modificaciones fue teniendo durante los años.

### 1. Lógica de add/remove en cada diff

Comencé a darme cuenta que en algunas reformas se anulaban partes enteras de la constitución con otro texto nuevo. Para poder tener diff que tuvieran sentido, me puse a leer todos los textos para generar commits que borraran pedazos enteros cuando hiciera falta.

Se da una situación particular de lógica bastante compleja con un texto que se añade en 1972 que tiene validez temporal hasta 1981, pero entre esos años sucede que termina la revolución libertadora y se da todo el proceso de reorganizacion nacional, invalidando parte de la constitucion hasta 1983.

```md
Este Estatuto regirá hasta el 24 de mayo de 1977. Si una Convención Constituyente no decidiere acerca de la incorporación definitiva al texto constitucional, o su derogación total o parcial, antes del 25 de agosto de 1976, su vigencia quedará prorrogada hasta el 24 de mayo de 1981.
```

Esto quiere decir que en 1981 hay un "rollback" automático de la constitución, mientras parte de ella no era válida. Por suerte igualmente, pude mostrar ese diff (del rollback), porque la dictadura del 74 no enmendó la constitución sino que creo una 'norma supra constitucional'

Este tipo de incongruencias se dan varias veces, pero esta de tener un cambio automático es la mas rara.

### 2. Diff de escritos legales

Los políticos no son programadores, y en general son mas cercanos a doctrinas humanísticas que exactas. A eso se suma que estos documentos son muy antiguos y se ve que no se respetaban (o no se conocían) demasiadas estructuras de formato al escribir, como una división en párrafos por tipo de contenido bien catalogado y numerado.

Encontré que los textos escritos de la constitución varían de estructura fuertemente en cada modificación y eso hizo bastante difícil que queden diff generados que tuvieran sentido para tener la información de qué cosas cambiaron en cada reforma de la constitución.

Así que por cada reforma de la constitución le di un formato en markdown que fuera siempre igual, usé las mismas palabas y puntuación, por ej, en vez de usar

```md
 -Art 32: asdasdad
```

siempre usé el siguiente formato, respetando cada espacio, guión, signo de puntuación

```md
 - Artículo 32.- asdasdasd
```

No importa demasiado cual es el formato, sino mas bien que siempre sea el mismo, para poder hacer buenos diff.

### 3. Git no sirve para esto

#### Fechas

Git no puede representar fechas menores a la unix epoch 1-1-1971. Esto hace que no pueda generar un repositorio con las fechas reales de cuando sucedieron las modificaciones.

Si, hay algunos workaround, pero ninguno es realmente soportado por git ni tampoco por github, y quiero poder ver estos cambios bien en la interfaz web de github.

#### Autores

Es difícil (mas bien imposible) saber quién escribió cada línea de la constitución. Pero hay 2 alternativas que se pueden usar

 - Identificar quienes escribieron una reforma: En algunos casos las reformas llevan las firmas de todas las personas que estuvieron involucradas en escribirla o que la apoyaron. En otras no hay registro que haya podido encontrar. Se podría poner como autor de un commit al Presidente de cada asamblea y como co-autor al resto de las personas que firmaron.

 - Ponerle un nombre al grupo de personas que la modificaron y usarla como autor: Esto es mas sencillo, casi siempre es algo asi como 'Asamblea constituyente del año 1994'

No me termino gustando ninguna de las dos, asi que le puse jperelli como autor 😅. Esto es algo que me gustaría mejorar.

## Resultados

Bueno, ya va quedando claro que los textos legales no parecen ser muy faciles de representar en git como diff de caracteres perfectos en el tiempo, pero igual queria intentarlo y se generaron algunos resultados interesantes:

### Un fragmento de blame

![Un blame](/public/images/2019-10-27-constitucion-argentina/blame.jpg)

El blame quedo bastante malo, pero hay lugar para mejoras del history.

### Modificaciones en gobiernos democráticos vs defacto

![Una atrocidad](/public/images/2019-10-27-constitucion-argentina/main.jpg)

Queda claro que la mayoría de los cambios en la constitución no fueron democráticos

### Varios diff quedaron buenos

![1898](/public/images/2019-10-27-constitucion-argentina/1898.jpg)

Cambio completo de 1898

![Nacion](/public/images/2019-10-27-constitucion-argentina/nacion.jpg)

Cambio de Confederación a Nación

![defacto](/public/images/2019-10-27-constitucion-argentina/prn.jpg)

Agregados documentos de poder defacto
