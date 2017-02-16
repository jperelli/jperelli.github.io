---
layout: post
title: Tutorial Prolog
comments: true
category: post
---

Prolog es un lenguaje que utiliza los paradigmas lógico y declarativo de programación. Del paradigma lógico toma la llamada lógica de primer orden, la cual describe hechos (proposiciones), valores de verdad (verdadero/falso) y operaciones como la conjunción, disjunción y la implicación. Al ser declarativo, se posiciona opuesto a paradigmas más conocidos como el imperativo+procedural. Ésta característica hace que la escritura de un programa sea dada en dos fases bien separadas: definición de proposiciones y reglas, y construcción de consultas.

## Tutorial

Para este tutorial voy a usar [ideone](https://ideone.com), una ide online que no necesita instalación de ninguna aplicación en la pc.

### Estructura básica

Primero hay que comprender que en prolog existe la separación entre escritura de reglas y consultas.

#### Hechos y Reglas

Los "hechos" son proposiciones que tienen un "valor de verdad" (true o false) explícitamente definido. Las "reglas" son relaciones que pueden darse entre diferentes hechos a través de operaciones como conjunción, disjunción e implicación.

Ejemplo de dos hechos y una regla

{% highlight prolog linenos %}
hermano(Juan, Pedro).
hijo(Juancito, Juan).
tio(X, Y) :- hermano(X, Z), hijo(Y, Z).
{% endhighlight %}


Las primer línea define que `hermano(Juan, Pedro)` es `verdadero`. De ésto podemos entender que Juan es hermano de Pedro o que la relación `hermano` entre las "constantes" `Juan` y `Pedro` es y debe ser siempre `verdadero`.

Idem en la segunda línea.

Ahora, en la tercer línea definimos de forma genérica como es la relación `tio` entre dos personas `X` `Y` cualquiera sean. Esto se entiende o se lee de la siguiente forma:
Para que `tio(X,Y)` sea verdadero, deben ser verdaderos al mismo tiempo `hermano(X, Z)` e `hijo(Y, Z)`. En términos de lógica proposicional es muy sencillo: en esta tercera línea hay una implicación de derecha a izquierda, y hay una conjunción entre hermano e hijo.

Como proposicion: **si** ( `X es hermano de Z` **y** `Y es hijo de Z` )  **entonces** `X es tio de Y`. Esto es una conjunción y una implicación.

De ésto se desprende que el carácter `:-` define una implicación de derecha a izquierda (if then) y el carácter `,` define una conjunción (and booleano/lógico).

#### Consultas

Las consultas pueden considerarse como análogas a la "invocación a un procedimiento" en el paradigma imperativo+procedural. Son las consultas las que inician la ejecución de un programa, pero en ellas no se define ninguna lógica de programación.

{% highlight prolog linenos %}
?- tio(Pedro, Juancito)
?- tio(Pedro, X)
?- tio(Juancito, X)
{% endhighlight %}

El símbolo `?-` marca el comienzo de una consulta sobre la base de reglas definidas previamente.

La primer consulta pregunta si es verdadero o falso que Pedro es tío de Juancito. Ésto dispara el motor de inferencias de prolog, que encuentra el valor de verdad para esa proposicion, y termina por devolver `true`

La segunda consulta pregunta qué valor de X hace verdadera la proposición "Pedro es tio de X". Ésto devuelve `true`, porque existen valores que pueden cumplir esa proposición y ademaás guarda en la variable X el valor que hace verdadera esa proposición. Entonces, devuelve `true` y guarda `Juancito` en `X`. Se imprime por pantalla `true` y `X=Juancito`.

La tercer línea es análoga a la segunda, pero con la diferencia de que ningún valor de X puede hacer que esa proposición sea verdadera, por lo tanto, la consulta devolverá `false` y el valor de X quedará indefinido.

#### Estructura en ideone

La estructura de un programa básico en Prolog para que pueda ejecutarse en ideone es la siguiente

<div style="text-align:right"><a href="http://ideone.com/fW63DL">ver en ideone</a></div>

{% highlight prolog linenos %}
% clausulas
hermano("juan", "pedro").
hijo("juancito", "juan").
tio(X, Y) :- hermano(Z, X), hijo(Y, Z).

% consultas
?- tio("pedro", "juancito"), writeln('Pedro es tio de Juancito').
?- tio("pedro", A), write('Pedro es tio de '), writeln(A).
?- tio("juancito", B), write('Juancito es tio de '), writeln(B).
{% endhighlight %}

En ésta estructura de programa deben estar definidas primero las cláusulas (Hechos y Reglas), y luego pueden hacerse consultas sobre las cláusulas previamente definidas.

Las consultas son, en sí mismas, proposiciones que el motor de inferencias de prolog debe contrastar con la base de cláusulas definida previamente, para responder para cada una si es verdadera o falsa. En este caso, cada consulta tiene la estructura `A , B`, donde `A` es la consulta real que se quiere hacer, `,` es el operador de conjuncion y `B` es la cláusula `write` que devuelve siempre `true`, pero tiene como **efecto secundario** imprimir por la salida estándar (stdout o la pantalla).

Prolog utiliza el método de **cortocircuito** o **evaluacion perezosa** para la evaluación de las conjunciones. Ésto significa que para la expresión `A , B`, prolog evaluá primero `A` y si el valor es `false`, devuelve `false` y termina la ejecución (no imprime nada por pantalla). Si el valor de la expresión `A` es `true`, entonces evalúa la expresión `B` (que en este caso es write que genera el efecto secundario de escribir por pantalla) y computa la conjunción booleana para devolver el valor final de la expresión total.

### Trabajar con listas

Para trabajar con listas en prolog, tomemos el problema de contar la cantidad de elementos de una lista. La forma de encarar estos problemas es análoga a un algoritmo recursivo. De hecho, definiremos cláusulas de manera recursiva directamente. Para poder resolverlo, necesitamos definir de alguna manera una división de la lista, o quitar un elemento de la lista cada vez que se invoca la recursión.

<div style="text-align:right"><a href="http://ideone.com/HSpo4r">ver en ideone</a></div>

{% highlight prolog linenos %}
longitud([], 0).
longitud([X|Xs], N) :- longitud(Xs, N1), N is N1 + 1.

?- longitud([2,4,6,8], X), write('longitud: '), writeln(X).
{% endhighlight %}

En la línea 1 se define lo que sería el caso base de una recursión. Para una lista que está vacía, la "longitud" es `0`. Eso es verdadero siempre.

`[X|Xs]` significa que se guarde en la variable `X` la cabeza de la lista y en la variable `Xs`, la cola de la lista. Por ejemplo, si pasamos como primer argumento a esa proposición la lista `[3, 6, 9]`, entonces `X = 3` y `Xs = [6, 9]`.

`N is N1 + 1` significa que el valor de `N` debe ser igual a `N1 + 1`. En el caso de que `N` no esté definido, se fuerza a que su valor sea igual a `N1 + 1`. Si hacemos una analogía con algún lenguaje imperativo, esto sería similar a hacer la **asignación** `N := N1 + 1` si `N` no tiene ningún valor, pero sería equivalente a hacer la **comparación** `N == N1 + 1` si `N` tiene un valor, que devuelve true o false.

En la línea 2 podemos ver una definición recursiva: la longitud de una lista separada entre cabeza y cola es `N` si y solo si la longitud de la sublista cola es `N1` y ademas `N = N1 + 1`. una definición recursiva.

#### Filtrar elementos en listas

<div style="text-align:right"><a href="http://ideone.com/brKoTe">ver en ideone</a></div>

{% highlight prolog linenos %}
pares([], []).
pares([X|Xs], L) :- X mod 2 =:= 0, pares(Xs, Laux), append([X], Laux, L).
pares([X|Xs], L) :- X mod 2 =\= 0, pares(Xs, Laux), L = Laux.

?- pares([1,2,3,4], L), write(L).
{% endhighlight %}

#### Eliminar un elemento de una lista

<div style="text-align:right"><a href="http://ideone.com/8QXGKg">ver en ideone</a></div>

{% highlight prolog linenos %}
eliminar([], E, []).
eliminar([X|Xs], N, [X|Laux]) :- N =\= X, eliminar(Xs, N, Laux).
eliminar([X|Xs], N, Laux) :- N =:= X, eliminar(Xs, N, Laux).
 
?- eliminar([2,4,6,8,4,5], 4, L), write(L).
{% endhighlight %}

