---
layout: page
title: Amazon Prime Now - Refresher
comments: true
category: project
image: /public/images/2020-04-15-amazonprimenow-refresher/main.png
---

Estamos usando mucho amazon prime now para comprar provisiones de supermercado. En el lugar que estamos ahora, a través de este servicio se pueden comprar productos de DIA% y los envian al hogar. El servicio es bueno, sencillo y cumple con lo que necesitamos.

El problema surgió cuando comenzó la pandemia de covid-19. Amazon prime now se saturó de repente

Inicialmente empezaron a usar un cartel que decía "vuelve a las 12 de la noche que se abrirán mas turnos", el sitio se caía a las 12 de la noche (error 500) y si no conseguíamos el turno ahí, nos quedábamos sin envío.

Luego modificaron el sitio para empezar a liberar turnos durante el día de a poco, entonces la única forma que teníamos de comprar es quedándonos frente a la pantalla refrescando, esperando a que se libere un turno de envío

![no hay mas turnos](/public/images/2020-04-15-amazonprimenow-refresher/main.png)

A los 10 minutos de estar perdiendo tiempo frente a la pantalla, me puse a investigar como hacer una extension de chrome que hiciera esto por mi. Pense que lo iba a poder hacer en menos de una hora, pero no fue así, resultó ser mas complejo de lo que creía y tarde unas 4hs. Eventualmente funcionó y [comparto el codigo aqui](https://github.com/jperelli/amazonprimenow-refresher)

## Funcionamiento

Básicamente el funcionamiento es sencillo:

1. La extensión instala un boton arriba a la derecha en el browser.
2. Cuando estoy en la pagina del carrito de amazon, cliqueo en el boton y esto dispara el "bot"
3. El código busca un string que diga "Actualmente no hay ventanas"

    a. si ese string esta presente en el html, quiere decir que no hay turnos, entonces refresca la pantalla y vuelve a intentar 3.

    b. si ese string no esta presente en el html, quiere decir que hay turnos, envía una desktop notificacion y deja de refrescar la pantalla.

## Implementación

### Estructura de una extension de chrome

Fragmento de manifest.json
```json
{
    "browser_action": {
        "default_popup": "popup.html",
    },
    "content_scripts": [
        {
            "matches": [
                "https://primenow.amazon.es/*"
            ],
            "js": [
                "contentScript.js"
            ]
        }
    ],
    "background": {
        "scripts": [
            "background.js"
        ],
    }
}
```

Esto nos deja con 3 archivos importantes:

 - popup.html: es el html que se renderiza al clickear el boton de la extensión en la topbar de chrome, dentro del popdown(?) que se despliega
 - contentScript.js: este html se inyecta dentro de cualquier pagina cuya url matchee con la expresion regular de "matches"
 - background.js: es un js que esta siempre activo mientras chrome este abierto (aca podria haber un miner de monero)

### Funcionamiento interno

Cada script tiene acceso a diferentes funcionalidades o partes de chrome:
  - popup: interacción entre el usuario de chrome y la extensión
  - contentscript: acceso al dom dentro de un tab (puede haber multiples instancias)
  - background: ejecucion en el entorno de todo el browser, puede sincronizar la info entre scripts

La comunicación entre scripts se debe hacer siempre utilizando 2 event emmiter que chrome ofrece:
 - tab
 - global

![flow](/public/images/2020-04-15-amazonprimenow-refresher/flow.png)

 1. cuando el user clickea el boton start en el popup, se envía un mensaje de start al background.js
 2. el background.js lanza un "bucle" con un settimeout donde:
    1. lanza un settimeout a 10 segundos al 2.
    2. lanza refresh en el tab donde esta el carrito de compra
    3. envia un mensaje de "start" al tab
        1. el contentscript recibe el mensaje de start de 2.2.
        2. el contentscript chequea si el document contiene el string "Actualmente no hay ventanas"
        3. si contiene el string, envia un mensaje al background.js diciendo "notification"
    1. el background.js recibe el mensaje "notification"
    2. el background.js limpia el settimeout, para no refrescar mas la pagina
    3. el background.js envia una notification al user para avisar que hay turno

### Código fuente

[comparto el codigo aqui](https://github.com/jperelli/amazonprimenow-refresher)
