---
layout: page
title: How to configure wifi on the Raspberry Pi 
comments: true 
category: project
---

## Problema

Hace tiempo que estamos notando la falta de control de animales domésticos en la ciudad de La Plata. Al mismo tiempo, hay mucha gente dispuesta a dar una ayuda a los animales que estan en problemas (perdidos, lastimados, hambrientos, en situación de calle). Estos voluntarios, denominados comunmente proteccionistas, lograron mantener una forma de organización dentro de grupos de facebook. Estos grupos suelen sumar entre 20 a 60 posts diarios pidiendo ayuda para resolver el problema que puede tener algun animal.

El problema principal de los grupos de facebook es que los posts no pueden catalogarse, son simplemente foto y texto. Con respecto a la organización, los grupos terminan siendo un caos, en los cuales se complica mucho encontrar información dentro del mar de posts.

Generalmente los problemas se pueden catalogar como:

 * **Posts de larga duración:** Requieren ser guardados un largo tiempo, y no se espera que la solución del post sea inmediata (puede solucionarse en dias, meses o años). Estos posts suelen perderse rápidamente en los grupos de facebook.

   * **Animal perdido:** Se perdió un animal. Se necesitan fotos, la última ubicación donde fué visto y caracteristicas del animal como color de pelo, tamaño, edad, raza. Teniendo toda esa información bien catalogada, puede realizarse una búsqueda sobre "animales encontrados" periódicamente y de esta forma encontrar al animal perdido.

   * **Animal encontrado:** Se encontró un animal en la calle que parece tener dueño (tiene collar, es dócil, come alimento para animales, etc). De estos animales se requiere tener información bien catalogada como ubicación, color de pelo, tamaño, edad, raza. Esta información puede cruzarse con la de "animales perdidos", para ayudar a encontrar el dueño de un animal

   * **Adopción:** Se da un animal en adopción. Puede estar en esta situación por unos meses sin problema.

   * **Tránsito:** Se requiere que una persona cuide un animal por un tiempo determinado (algunos días). Posiblemente porque el animal está bajo tratamiento, o por alguna mudanza o problema familiar, las personas no pueden tener el animal durante un lapso de tiempo corto.

 * **Posts de emergencias:** Necesitan ser resueltos rápidamente, ya que la vida de un animal suele depender de la resolución

   * **Operación urgente:** Por algún accidente, un animal requiere una intervención quirúrgica o internación.

 * **Otros:** Posts secundarios de pedidos de ayuda anexa a problemas principales

   * **Transporte:** Se requiere llevar animales de un lugar a otro, generalmente para terminar de resolver algún otro problema.
   * **Colaboración Económica:** Suelen necesitarse para animales que estan en situación de calle y requieren intervención quirúrgica. Estos posts requieren un seguimiento adicional para hacer una recolección de dinero para pagar en la veterinaria con aportes de varias personas.
   * **Donaciones:** Donación de comida, medicamentos, etc. Suelen necesitarse para animales que estan en situación de calle o requieren operación, pero la persona que se hace cargo, no llega a pagar todo lo necesario.

### En qué ayuda una aplicación?

La idea detrás de la aplicación es tomar toda esa colección de posts caóticos y organizarlos coherentemente, para facilitar la búsqueda de información y ayudar a resolver rápidamente los problemas comentados anteriormente.

La mayor utilidad se puede ver en

 * Animal encontrado + animal perdido: Con el sitio funcionando, los animales pueden buscarse por características que los definen y por ubicación, de esta forma, no se pierden en un mar de posts.

 * Colaboración económica:

   * Hay personas que muchas veces quieren colaborar, pero no pueden hacerlo por la complejidad de transferir dinero a un CBU, o si no tienen cuenta bancaria ni movilidad es difícil donar dinero. En este caso, una solución utilizando mercadopago o similar sería de gran ayuda para juntar dinero hasta llegar a una meta.

   * Las veterinarias suelen ser permisivas con respecto a los pagos cuando atienden un animal rescatado de la calle, dejan que les paguen por el tratamiento necesario en cuotas o lo que se pueda juntar de dinero. Suele suceder que no se pueda llegar a la suma de dinero para el tratamiento y la veterinaria no cobra lo que debería. Esto podría ser solucionado por la aplicación haciendo un seguimiento del caso, registrando donaciones hasta una meta.

## Concepto

### Fuente de información

La aplicación debería tomar datos desde los grupos de facebook donde se publican este tipo de problemas, inicialmente de forma semiautomática, luego podría ser utilizando técnicas de NLP + IA supervisada para catalogar casos y sacar características de animales del texto.

### Crowd Sourcing

Para lograr elevar la cantidad de contenido en la aplicación, deberían utilizarse técnicas comunes de crowd sourcing:

 * Video motivacional: Animación / GIF / merchandising para redes sociales.

 * Posts en revisión: Usuarios sin permisos podrían crear contenido desde posts que irían a revisión. Luego usuarios con permisos elevados aceptarían ese contenido o no, con lo cual aceleraría la creación de contenido en el sitio.

 * Flagging: Para llamar la atención de admins de la app.

 * Gamificacion: ganar puntos por contribuír información útil al sitio (estilo waze). Tal vez regalar objetos de merchandising / alimento / juguetes para animales al llegar a determinada cantidad de puntos.

## Tecnología

Aproveché para utilizar tecnología moderna (2016/2017)

### Backend

https://github.com/jperelli/proteccionista.org

 * Nodejs + Expressjs
 * Sequelize
 * Postgresql 9.6 + postgis

### Frontend

https://github.com/jperelli/proteccionista-app

 * VueJS2 (ES6) + vuex
 * [quasar-framework.org](http://quasar-framework.org/)
 * fb graph api
 * apache-cordova