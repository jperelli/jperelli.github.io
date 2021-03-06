---
layout: post
title: Tutorial Haskell
comments: true
category: post
---

Haskell es un lenguaje de programación de propósito general estáticamente tipado, con evaluación perezosa y **funcional puro**. Esto determina como característica particular que las funciones no tienen efectos secundarios y hacen al programa muy predecible, lo que permite hacer un análisis estático que puede predecir con poco margen de error al análisis dinámico.

El lenguaje tiene una especificación publicada abiertamente y varias implementaciones, entre ellas la más importante es GHC (Glaslow Haskell Compiler), un compilador de Haskell multplataforma de código abierto.

## Tutorial

Para éste tutorial voy a usar [ideone](https://ideone.com), una ide online que no necesita instalación de ninguna aplicación en la pc.

### Estructura básica

La estructura de un programa básico en Haskell para que pueda ejecutarse en ideone es la siguiente:

<div style="text-align:right"><a href="http://ideone.com/mD3KOU">ver en ideone</a></div>

{% highlight haskell linenos %}
main = do
  print( hola )
{% endhighlight %}

La línea 1 contiene el punto de entrada al programa, y la línea 2 es la forma de escribir en la salida estándar (pantalla). Es importante destacar la indentación (margen) que tiene la línea 2, ya que es obligatorio porque marca el inicio y fin del cuerpo del bloque contenido dentro del `do`.

### Funciones

#### Sin parámetros

Si sumamos una declaración de una función simple

<div style="text-align:right"><a href="http://ideone.com/4pqaWx">ver en ideone</a></div>

{% highlight haskell linenos %}
hola :: String
hola = "Hola mundo"

main = do
  print( hola )
{% endhighlight %}

La línea 1 declara la función y define el tipo (`String`) del valor de retorno. `hola` es el nombre de la función declarada.

En la línea 2 el símbolo `=` marca que lo que viene a continuación es el valor a ser retornado. Por lo tanto, el valor de retorno de la función `hola` es el `String` `"Hola mundo"`.

#### Con un parámetro

<div style="text-align:right"><a href="http://ideone.com/8Xv2ya">ver en ideone</a></div>

{% highlight haskell linenos %}
hola :: String -> String
hola x = "Hola " ++ x

main = do
  print( hola "Julian" )
{% endhighlight %}

Ahora en la declaración de la función (línea 1) vemos `String -> String`. El primer `String` define el tipo del primer (único) argumento de la función `hola`. El segundo `String` que aparece después de la "flecha" `->` define el tipo del valor de retorno de la función `hola`.

En la línea 2 aparece `x`: éste es el parámetro formal. Esto quiere decir que es el nombre de la variable que contiene el valor pasado como parámetro. Ésta variable `x` sólo puede ser usada en la línea 2, o sea, dentro del cuerpo de la función. El cuerpo de la función es la parte de la línea 2 que está despues del `=`.

El símbolo `++` concatena el string `"Hola "` con el valor que contiene la variable `x`, que debe ser de tipo `String`.

En la línea 5 vemos la llamada a la función hola con el parámetro actual, el `String` `"Julian"`. Este string se guardará como valor del parametro formal `x` durante la ejecución de la función `hola`.

#### Con más de un parámetro

<div style="text-align:right"><a href="http://ideone.com/1QObSv">ver en ideone</a></div>

{% highlight haskell linenos %}
suma :: Int -> Int -> Int
suma a b = a + b

main = do
  print( suma 2 3 )
{% endhighlight %}

Al utilizar más de un parámetro se puede ver cómo se declaran los tipos de las variables. En éste caso, en la línea 1 aparece `Int -> Int -> Int`. Los primeros dos `Int` se corresponden posicionalmente con el tipo de los dos parámetros formales (`a` y `b`) y el último `Int` se refiere al tipo del valor de retorno de la función `suma`.

En la línea 2 podemos ver antes del `=` a los dos argumentos (parámetros formales) y después del `=` se puede ver la operación `a + b`, que dará por resultado el valor de retorno de la función.

Luego en la línea 5 se observa una llamada a la función `suma`. Los valores de los parámetros reales enviados como argumento de la función se separan por coma. Los parámetros tienen una correspondencia posicional: ésto quiere decir que el parámetro real `2` se corresponde con el parámetro formal `a` y el segundo parámetro real (`3`) se corresponde con el parámetro formal `3`.

### Operaciones comunes simples

 * `+`, `-`, `*`, `/`: Suma, resta, multiplicación y división, admiten `Int` y `Float`.
 * `++`: Concatenación, para `String` o Listas
 * `mod`: Resto de la división. Ej `mod a b` es el resto de la división `a / b`

### Tipos de dato comunes

 * `String`: Cadena de caracteres
 * `Int`: Número entero
 * `Float`: Número decimal
 * `Bool`: Booleano
 * `[Int]`: Lista de enteros
 * `[[Int]]`: Lista de listas de enteros

### Estructuras de control

#### Condicional

Hay dos formas de estructura condicional en haskell. La primera es por búsqueda de "patrones" en los argumentos de la función

<div style="text-align:right"><a href="http://ideone.com/SvZzDT">ver en ideone</a></div>

{% highlight haskell linenos %}
undostres :: Int -> String
undostres 1 = "uno"
undostres 2 = "dos"
undostres 3 = "tres"
undostres x = "otro"

main = do
  print( undostres 2 )
{% endhighlight %}

Ésto funciona igual que un "case" o "switch" en otros lenguajes. Los patrones son los números que aparecen como argumentos `1`, `2`, `3`, `x`. El argumento de la función se compara por igualdad `=` con cada uno de los "patrones". Si el argumento es igual a algún patrón, ejecuta y retorna lo que aparece en esa línea después del `=`. Si no es igual a ningún patrón determinado (`1`, `2`, `3`) ejecuta y retorna lo que aparece con patrón `x`.

La segunda forma de estructura condicional se basa en utilizar "guardas", representadas por el símbolo `|`

<div style="text-align:right"><a href="http://ideone.com/Uzzwaw">ver en ideone</a></div>

{% highlight haskell linenos %}
positivoNegativo :: Int -> String
positivoNegativo a
  | a > 0        = "positivo"
  | a < 0        = "negativo"
  | otherwise    = "neutro"
 
main = do
  print( positivoNegativo 2 )
{% endhighlight %}

En las líneas 3 y 4 podemos ver cómo se definen 2 resultados para la función `positivoNegativo` basándose en condiciones. Los resultados son aquellos que están después del símbolo `=`. Las condiciones se encuentran previamente en cada línea, entre el símbolo `|` y el `=`. La palabra clave `otherwise` sirve para marcar lo que la función debe devolver en caso de que no se cumpla ninguna de las otras condiciones de las guardas previas.

#### Repetición

No existen estructuras de repetición. En su reemplazo, se utiliza el acercamiento más natural para el lenguaje funcional: la recursión.

<div style="text-align:right"><a href="http://ideone.com/Cv0J18">ver en ideone</a></div>

{% highlight haskell linenos %}
acumular :: [Int] -> Int
acumular [] = 0
acumular (x:xs) = x + acumular xs
 
main = do
  print( acumular [5,6,7] )
{% endhighlight %}

En la línea 2 se define el caso base: cuando se presenta una lista vacía, retorna `0`.

En la línea 3 se puede ver la llamada recursiva. Esta línea se ejecuta solamente cuando el parámetro es distinto a una lista vacía, o sea, cuando el parámetro contiene una lista con al menos un elemento. El formato `(x:xs)` siginifica que en la variable `x` se guarde la cabeza de la lista que está siendo pasada como argumento, y en la variable `xs` el resto de la lista (la cola). Esto quiere decir que para la primer llamada a la función `acumular` con `[5,6,7]`, `x` vale `5` (un `Int`) y `xs` vale `[6,7]` (una lista). Entonces se ejecuta `x + acumular xs` con esos valores, siendo así `5 + acumular [6,7]`. Se llamará a recursión hasta que `xs` sea igual a una lista vacía `[]` con lo que se llega al caso base.

### Funciones de primer orden

Son aquellas funciones cuyos parámetros son de cualquier tipo "común". Ejemplos:

{% highlight haskell linenos %}
hola = "Hola"
par x = x mod 2 == 0
suma a b = a + b
concat x xs = x ++ xs
first x:xs = x
{% endhighlight %}

### Funciones como "ciudadano de primera clase"

Esta es la característica mas importante del paradigma funcional. Significa que una función puede ser
 
 * asignada a una variable
 * pasada como parámetro
 * anónima (también llamada función lambda)

#### Ejemplo: asignar una función a una variable

Considerar la diferencia entre estos dos códigos

{% highlight haskell linenos %}
Codigo A:                      | Codigo B:
suma a b = a + b               |     suma a b = a + b
sumaEnteros a b = suma(a, b)   |     sumaEnteros = suma
                               |
main = do                      |     main = do
  print(sumaEnteros(2, 3))     |       print(sumaEnteros(2, 3))
{% endhighlight %}

El código `A` es lo que haríamos normalmente si quisieramos definir una función que lleva los mismos argumentos que otra. Si se sigue el flujo del programa, el orden de ejecución sería:

  1. `main`
  2. `sumaEnteros(2,3)`
  3. `suma a b`
  4. `a + b`

El código `B` utiliza el concepto de función de primera clase. En la línea 2 se asigna la función `suma` a la funcion `sumaEnteros`. Puede pensarse la asignación como si `sumaEnteros` fuera un puntero a la definición de la función `suma`. Entonces, `sumaEnteros` es ahora directamente `= a + b`. Por lo tanto si se sigue el flujo del programa, el orden sería:

  1. `main`
  2. `sumaEnteros(2,3)`
  3. `a + b`

#### Ejemplo: pasar una función como parámetro

<div style="text-align:right"><a href="http://ideone.com/9d4nbw">ver en ideone</a></div>

{% highlight haskell linenos %}
suma a b = a + b
resta a b = a - b
aplicar x a b = x(a,b)

main = do
  print(aplicar(suma, 10, 15))
  print(aplicar(resta, 10, 15))
{% endhighlight %}

La línea 6 envía la función `suma` como parámetro a la función aplicar, que recibe a la función `suma` en la variable `x`. Entonces `x` es la función `suma`, que se llama en la línea 3 con los argumentos `a` y `b`, correspondientes a los números `10` y `15`.

En este caso, la función `aplicar` es una **función de orden superior** (ver más adelante)

#### Ejemplo: función anónima o función lambda

<div style="text-align:right"><a href="http://ideone.com/F5zHX0">ver en ideone</a></div>

{% highlight haskell linenos %}
aplicar x a b = x(a, b)

main = do
  print(aplicar((\x y -> x + y), 10, 15))
  print(aplicar((\x y -> x - y), 10, 15))
{% endhighlight %}

La ejecución de este caso da el mismo resultado que el ejemplo anterior.

En la línea 4 se puede observar una función anónima `(\x y -> x + y)` que comienza con una barra invertida `\` y tiene 2 argumentos, que son los que aparecen separados por un espacio antes de la flecha `->`. Después de la flecha se escribe el cuerpo de la función `x + y`. Luego además esta función es enviada como parámetro a la función `aplicar` (como en el ejemplo anterior)

### Funciones de orden superior

Son aquellas funciones que reciben una función en alguno de sus argumentos.

Estas operaciones corresponden tradicionalmente al ámbito de la programación funcional, pero son comunes no sólo en Haskell sino también en la mayoría de lenguajes de que soportan funciones como "ciudadano de primer clase"

 * select:, collect:, inject:into: para OrderedCollection en SmallTalk (usa bloques como first-order functions)
 * List/Dict Comprehensions en Python
 * Array.map(), Array.filter() en javascript

#### filter

filter(fn, list): Devuelve una lista nueva que contiene los valores de la lista `list`, que hacen que la funcion `fn` devuelva true. Dicho de otra manera: Para cada elemento de la lista `list`, ejecuta la función `fn` con ese elemento como argumento. Si `fn` devuelve `true`, el elemento se añade a la lista resultante.

`fn` debe recibir un argumento y retornar un `Bool`.

<div style="text-align:right"><a href="http://ideone.com/DO8HzN">ver en ideone</a></div>

{% highlight haskell linenos %}
mayoresQue20 :: Int -> Bool
mayoresQue20 n = n > 20

main = do
  print( filter(mayoresQue20, [11, 22, 44, 88]) )
{% endhighlight %}

El ejemplo imprime `[22, 44, 88]`

#### map

map(fn, list): Devuelve una lista con el valor de retorno de `fn` aplicada a cada valor de `list`

`fn` debe recibir un argumento y retornar cualquier tipo.

<div style="text-align:right"><a href="http://ideone.com/1XbPGc">ver en ideone</a></div>

{% highlight haskell linenos %}
incrementar20 :: Int -> Int
incrementar20 n = n + 20

main = do
  print( map(incrementar20, [11, 22, 44, 88]) )
{% endhighlight %}

El ejemplo imprime `[31, 42, 64, 108]`

#### fold (reduce)

foldl(fn, init, list): aplica la funcion `fn` a cada par de valores recursivamente, y acumula todas las operaciones en un solo valor resultado.

`fn` es una función que debe recibir 2 argumentos (2 elementos de la lista) y retornar un valor del mismo tipo.
`init` es un valor de inicialización para el acumulador donde se agrega el resultado.
`list` es una lista.

Existen las versiones foldl (que reduce de derecha a izquierda) y foldr (que reduce de izquierda a derecha)

<div style="text-align:right"><a href="http://ideone.com/YKyp4k">ver en ideone</a></div>

{% highlight haskell linenos %}
suma a b = a + b

main = do
  print( foldl(suma, 0, [11, 22, 44, 88]) )
{% endhighlight %}

El ejemplo devuelve `165`