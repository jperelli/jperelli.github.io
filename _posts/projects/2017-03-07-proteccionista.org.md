---
layout: page
title: proteccionista.org 
comments: true 
category: project
---

## Problema

Hace tiempo que estamos notando la falta de control respecto del extravío, el avistaje, la castración y el rescate de animales domésticos en la ciudad de La Plata. Al mismo tiempo, hay mucha gente dispuesta a dar una ayuda a los animales que estan en problemas (perdidos, lastimados, hambrientos, en situación de calle, etc). Estos voluntarios (denominados comunmente proteccionistas), lograron establecer una forma de organización mediante grupos de facebook, que suelen sumar entre 20 a 60 posts diarios pidiendo ayuda para resolver el problema que puede tener algún animal.

El problema principal de los grupos de facebook es que los posts no pueden catalogarse, son simplemente foto y texto. Con respecto a la organización, los grupos terminan siendo un caos, en los cuales se complica mucho encontrar información dentro del mar de posts. Aparecen posts duplicados, con texto pero sin foto, con foto pero sin información, con información pero sin contacto, etc. A pesar de que en muchos grupos se establecen reglas para hacer un post (entre ellas usar tags o incluir determinados campos de información) los usuarios no leen las reglas, o las leen pero no las respetan. La falta de campos obligatorios a la hora de postear, permite que se puedan crear publicaciones incompletas, confusas e incluso engañosas.
De esa manera se hace muy engorroso acceder a la información de forma ordenada. La falta de organización sumada a la gran cantidad de grupos creados con la misma finalidad pone en relieve la necesidad de organizar, catalogar y centralizar la información.

Generalmente los problemas se pueden catalogar como:

 * **Posts de larga duración:** Requieren ser guardados un largo tiempo, y no se espera que la solución del post sea inmediata (puede solucionarse en dias, meses o años). Estos posts suelen perderse rápidamente en los grupos de facebook.

   * **Animal perdido:** Se perdió un animal. Se necesitan fotos, la última ubicación donde fué visto y caracteristicas del animal como color de pelo, tamaño, edad, raza y contacto del dueño. Teniendo toda esa información bien catalogada, puede realizarse una búsqueda sobre "animales encontrados" periódicamente y de esta forma encontrar al animal perdido.

   * **Animal encontrado:** Se encontró un animal en la calle que parece tener dueño (tiene collar, es dócil, come alimento para animales, etc). De éstos animales se requiere tener información bien catalogada como ubicación, color de pelo, tamaño, edad, raza y contacto de la persona que lo encontró. Esta información puede cruzarse con la de "animales perdidos" para ayudar a encontrar el dueño de un animal.

   * **Adopción:** Se da un animal en adopción. En éste caso es de gran ayuda contar con fotografías del animal, y es indispensable tener el contacto de la persona que tiene al animal para contactarla. El animal puede estar en esta situación por unos meses sin problema.

 * **Posts de urgencias:** Necesitan ser resueltos rápidamente, ya que la vida de un animal suele depender de la resolución

   * **Tránsito:** Se requiere que una persona cuide un animal por un tiempo determinado (algunos días, semanas e incluso meses) hasta su adopción, castración, etc. Por lo general suelen ser situaciones que requieren rápida resolución.

   * **Atención veterinaria:** Se necesita atención veterinaria de emergencia. Sucede en casos de animales que sufrieron accientes y requieren intervención quirúrgica o internación, o animales que fueron encontrados en estados de salud muy delicados.

 * **Otros:** Posts secundarios de pedidos de ayuda anexa a problemas principales

   * **Transporte:** Se requiere llevar animales de un lugar a otro, generalmente para terminar de resolver algún otro problema.
   * **Colaboración Económica:** Suelen necesitarse para animales que estan en situación de calle y requieren intervención quirúrgica, internación o atención veterinaria. Estos posts requieren un seguimiento adicional para hacer una recolección de dinero para pagar en la veterinaria con aportes de varias personas.
   * **Donaciones:** Donación de comida, medicamentos, etc. Suelen necesitarse para animales que estan en situación de calle o requieren atención veterinaria, pero la persona que se hace cargo no llega a pagar todo lo necesario.
   * **Madrinazgo:** Son ayudas económicas periódicas que se requieren para animales que están siendo transitados, que están pensionados, o que se encuentran en familias que tienen una situación económica precaria.

### En qué ayuda una aplicación?

La idea detrás de la aplicación es tomar toda esa colección de posts caóticos y organizarlos coherentemente para facilitar la búsqueda de información y ayudar a resolver rápidamente los problemas comentados anteriormente.

La mayor utilidad se puede ver en:

 * Animal encontrado + animal perdido: Con el sitio funcionando, los animales pueden buscarse por características que los definen y por ubicación. De esta forma, no se pierden en un mar de posts.

 * Colaboración económica:

   * Hay personas que muchas veces quieren colaborar, pero no pueden hacerlo por la complejidad de transferir dinero a un CBU, por falta de movilidad o por no contar con una cuenta bancaria. En este caso, una solución utilizando mercadopago o similar sería de gran ayuda para juntar dinero hasta llegar a una meta.

   * Algunas veterinarias suelen ser permisivas con respecto a los pagos cuando atienden un animal rescatado de la calle y ofecen pagos en cuotas. Suele suceder que no se logra recaudar la suma de dinero necesaria para el tratamiento y en ese caso la veterinaria no cobra lo que debería. Esto podría ser solucionado por la aplicación haciendo un seguimiento del caso, registrando donaciones hasta una meta, y manteniendo visibles los casos que aún no están resueltos.

   * Madrinazgo: En este caso la aplicación puede ayudar haciendo recaudaciones periódicas automáticas o enviando notificaciones para recordar pagos periódicos.

## Concepto

### Fuente de información

La aplicación debería tomar datos desde los grupos de facebook donde se publican este tipo de problemas, inicialmente de forma semiautomática, y luego utilizando técnicas de NLP + IA supervisada para catalogar casos y sacar características de animales del texto.

### Crowd Sourcing

Para lograr elevar la cantidad de contenido en la aplicación, deberían utilizarse técnicas comunes de crowd sourcing:

 * Video motivacional / Animación / GIF / merchandising para redes sociales.

 * Posts en revisión: Usuarios sin permisos podrían crear contenido a partir de posts sujetos a revisión. Así, los usuarios con permisos elevados revisarían el post para aprobar o rechazar ese contenido, acelerando la creación de contenido en el sitio.

 * Flagging: Se podría flaggear contenido para llamar la atención de admins de la app.

 * Gamificacion: Se basaría en ganar puntos por contribuír información útil al sitio (estilo waze), estimulando la participación mediante premios como objetos de merchandising / alimento / juguetes para animales al llegar a determinada cantidad de puntos.

## Tecnología

Aproveché para utilizar tecnología moderna (2016/2017)

### Backend

https://github.com/jperelli/proteccionista.org

 * API Nodejs + Expressjs
 * jwt auth
 * Sequelize
 * Postgresql 9.6 + postgis 2.3

### Frontend

https://github.com/jperelli/proteccionista-app

 * VueJS2 (ES6) + vuex
 * [quasar framework](http://quasar-framework.org/)
 * fb graph api
 * apache cordova

### Prototipo publicado

https://proteccionista.org/
