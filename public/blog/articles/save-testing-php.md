# Creando un "Test on Save" para PHP

Estoy comenzando, en el mundo del testing. Mi primer experiencia fue realizando test con [Jest](https://jestjs.io/es-ES/) en VSCode. Previamente lei, un poco sobre TDD, por ejemplo de las ideas que expone Carlos Blé. Adicional a esto tambien me tome mi tiempo para aprender a usar NPM y tambien ha abrir la consola en VSCode.

El mundo de JS, es un mundo muy actual donde casi todo se puede hacer en tiempo real (el verbo conocido para esto es `--watch`), por lo cual luego de un par de `npm instal zaraza` ya tenia instalado jest y con un par de clicks mas ya tenia los comandos basicos para hacer un flujo de testing rapido, de la misma forma que con `live-server` nos puede ayudar a trabajar mas rapido con HTML y CSS.

El lenguaje de programacion al que mas le tengo cariño es, el viejo y querido, __PHP__. En este lenguaje comenzé mis primeras andanzas, ohh aquellos viejos tiempos con Wordpress y los cambios __en vivo__ en el servidor.. (da para otro blogpost completo).

En el ultimo lugar donde trabajé intente implementar algo de testing sobre el codigo que teniamos pero mi falta de conocimiento me lo impidió. Con sed de revancha y luego de pensar el funcionamiento de los frameworks de testing, pense para mis adentros .. *esto del testing para PHP debe tener algo parecido* , dado a la busqueda en Google, no pude encontrar un articulo muy claro para este tema (quiza he estado utilizando las *keywords* equivocadas). 

Acompañado de la falta de un *programa/boton/plugin/loquesea* facil de implementar o por lo menos que no implicara aprender muchas cosas nuevas (vi algo de gulp, pero me parecia *too much* para esto), tambien me encuentro sin mucho poder computacional (me encuentro bajo una PC con 2GB de RAM y un procesador Celeron de 2010) por lo tanto el hecho de abrir Chorme basicamente consume un 50% del poder de procesamiento de la PC, estoy seriamente considerando aprender __Vim__. 

**PHPUnit** es el framework de testing principal para PHP, y como casi todo lo común en PHP funciona en un formato __comando/respueta__ pero lo que busco es que sea un _evento de sistema_ el cual dispare el comando de PHPUnit, definiendo mi necesidad, ya tenia la mitad de la tarea hecha solo bastaba incorporar ese __dedo del sistema__ que ejecutaria los test por mi. 
En esta parte de la historia entra un poco de javascript/node que me sirvio de ayuda.
En **npm** existe... _bah, que no existe ahi!!_ , existe un paquete que proporciona la habilidad de ejecutar un comando cuando se guardan archivos dentro del directorio de trabajo. [run-when-changed](https://www.npmjs.com/package/run-when-changed) es el paquete en cuestion el cual proporciona una api, programble y otra de consola.

Entonces con todos los ingredientes listos intenté armar el truco.

Primero cree una carpeta para albergar el proyecto.
```
mkdir pepito
cd pepito
```
Luego, me dispuse a crear un proyecto de composer (Aya! aca quiza pierda a muchos que no manejan a __composer__. [Aca, opcion 3](https://www.hostinger.com.ar/tutoriales/como-instalar-composer/#Paso-1-Instalar-Composer))

```bash
composer init  
composer require --dev phpunit/phpunit
```
Cree mi carpeta de `test/`
```
mkdir test
```
Cree mi codigo de testing de ejemplo
```
touch test/EjemploTest.php
```
```
<?php

use PHPUnit\Framework\TestCase;

class EjemploTest extends TestCase
{

    public function test_algo()
    {
        $this->assertEquals(true, true);
    }
}

```
Luego definí en mi `packge.json`

```
    "scripts": {
        "test": " ./vendor/bin/phpunit test/"
    }
```
Hasta aca nada fuera de lo común, luego aca donde empieza el engendro, me dispuse a iniciar un proyecto **npm**. Igual que recien [Aca te enseñan a instalarlo](https://nodejs.org/es/download/package-manager/#windows) , de paso lo enseñan a hacer con __chocolatey__ , una joyita.

```
npm init
```
Y instalé la dependencia _run-when-changed_
```
npm i run-when-changed
```
Por ultimo en la parte de `scripts` puse lo siguiente
```
"scripts": {
    "test": "run-when-changed --watch '**/*.php' --exec 'composer test'"
  },
```
Esto ultimo, aunque medio criptico, mira los cambios en los archivos que terminen en .php y ejecuta un comando en consecuencia.

* `run-when-changed --watch` es el comando basico para 'wacthear' archivos

* `'**/*.php'` es un patron **glob** para filtrar solo los archivos .php
* `--exec 'composer test'` si prestaste antecion anteriomente al script que escribi en el packge.json hice un comando que se llama test, `--exec` llama al siguiente comando que escribas en este caso `composer test`

and.. that's it!

![pantalla](articles/ejemplo.gif)
