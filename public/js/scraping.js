var input = document.getElementById('busqueda');
var elementoCreable = 'h3';
var contenedor = document.getElementById('wrap');
var etiquetaPrecio = ' = $';

function crearCuadrito(nombreCelular, precio) {
    'use strict';
    var titulo = document.createElement(elementoCreable);
    contenedor.appendChild(titulo);
    titulo.innerHTML = nombreCelular + etiquetaPrecio + precio;
}
function existeEnDOM(nombreCelular, precio) {
    'use strict';
    var titulos = contenedor.getElementsByTagName(elementoCreable), i, largo, banderita, valor = nombreCelular + etiquetaPrecio + precio;
    largo = titulos.length;
    banderita = false;
    for (i = 0; i < largo; i = i + 1) {
        if (titulos[i].innerHTML === valor) {
            banderita = true;
        }
    }
    return banderita;
}
function borrarElementos() {
    'use strict';
    var titulosx = document.getElementsByTagName(elementoCreable), ix;
    for (ix = titulosx.length; ix > 0; ix = ix - 1) {
        contenedor.removeChild(titulosx[ix - 1]);
    }
}
function ajaxable() {
    'use strict';
    var x, myOBJ;
    if (this.readyState === 4 && this.status === 200) {
        myOBJ = JSON.parse(this.responseText);
        for (x in myOBJ) {
            if (myOBJ.hasOwnProperty(x)) {
                if (!existeEnDOM(myOBJ[x].nombre, myOBJ[x].precio)) {
                    crearCuadrito(myOBJ[x].nombre, myOBJ[x].precio);
                }
            }
        }
    }
}
function configurarAJAX() {
    'use strict';
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange', ajaxable);
    xhttp.open('GET', "http://localhost/wsleo/php/scrap.php?nombre=" + input.value, true);
    xhttp.send();
}
function buscar() {
    'use strict';
    if (input.value !== '' && input.value.length > 2) {
        configurarAJAX();
    } else {
        borrarElementos();
    }
}

input.addEventListener('keydown', buscar);
